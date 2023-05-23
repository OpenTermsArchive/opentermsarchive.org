import { Column, Row, TableOptions, UseSortByState, useSortBy, useTable } from 'react-table';
import React, { PropsWithChildren, ReactElement } from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import styles from './Table.module.css';

// https://codesandbox.io/s/github/ggascoigne/react-table-example?file=/src/Table/Table.tsx

const getAlignClass = (alignment: string) => {
  if (!alignment) {
    return '';
  }
  if (alignment === 'left') return `justify-start text-left`;
  if (alignment === 'right') return `justify-end text-right`;
  return `justify-${alignment} text-${alignment}`;
};

const getSizeClass = (size: number) => {
  if (!size) {
    return '';
  }
  return `flex-${size}`;
};

const scrollbarWidth = () => {
  if (typeof document === 'undefined') {
    return 0;
  }
  // thanks too https://davidwalsh.name/detect-scrollbar-width
  const scrollDiv = document.createElement('div');
  scrollDiv.setAttribute(
    'style',
    'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;'
  );
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

export interface VirtualizeProps {
  height: number;
  itemSize: number;
}

export interface TableProps<T extends Record<string, unknown>> extends TableOptions<T> {
  title: string;
  bordered?: boolean;
  noScroll?: boolean;
  layoutFixed?: boolean;
  exportable?: false | { name: string };
  hideTitle?: boolean; // only use title for accessibility
  sortBy?: UseSortByState<T>['sortBy'];
  virtualize?: VirtualizeProps;
}

const hooks = [useSortBy];

const downloadCSVData =
  <T extends object>({
    name,
    columns,
    data,
  }: {
    name: string;
    columns: Column<T>[];
    data: T[];
  }): any =>
  () => {
    const headerNames = [columns.map((c) => c.Header)];
    const accessors = columns.map((c) => c.accessor);
    const tableRows = data.map((dataRow) =>
      accessors.map((accessor) => (dataRow as any)[accessor])
    );
    const footerColumns = [columns.map((c) => (c as any).footerValue)];

    const rows = headerNames.concat(tableRows).concat(footerColumns);

    const csvContent = rows.map((row) => row.join(';')).join('\n');
    const link = document.createElement('a');
    link.href = `data:text/csv;charset=utf-8,${encodeURI(csvContent)}`;
    link.download = `${name.toLowerCase()}.csv`;
    link.click();
  };

export default function Table<T extends Record<string, unknown>>({
  columns,
  data,
  title,
  sortBy: initialSortBy,
  bordered = false,
  noScroll = false,
  layoutFixed = false,
  hideTitle = false,
  exportable = false,
  virtualize,
}: PropsWithChildren<TableProps<T>>): ReactElement {
  const initialState: any = React.useMemo(
    () => (initialSortBy ? { sortBy: initialSortBy } : {}),
    [initialSortBy]
  );
  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState,
    },
    ...hooks
  );
  const InsideRow = ({ row, style = {} }: { row: Row<T>; style?: React.CSSProperties }) => {
    return (
      <div
        {...row.getRowProps({
          style,
        })}
        className="tr"
      >
        {row.cells.map((cell) => {
          let { className = '', ...cellProps } = cell.getCellProps();
          className = `${className} ${
            //@ts-ignore
            getAlignClass(cell.column.align)
          } ${
            //@ts-ignore
            getSizeClass(cell.column.size)
          }`;
          return (
            <div className={`td ${className}`} {...cellProps}>
              {cell.render('Cell')}
            </div>
          );
        })}
      </div>
    );
  };

  const RenderVirtualizedRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return <InsideRow row={row} style={style} />;
    },
    [prepareRow, rows]
  );

  const RenderNormalRow = React.useCallback(
    ({ row }) => {
      prepareRow(row);
      return <InsideRow row={row} style={{}} />;
    },
    [prepareRow, rows]
  );

  const shouldVirtualize = !!virtualize && rows.length > 100;

  return (
    <div
      className={`rf-table
        ${styles.table}
        ${hideTitle ? 'rf-table--no-caption' : ''}
        ${bordered ? 'rf-table--bordered' : ''}
        ${layoutFixed ? 'rf-table--layout-fixed' : ''}
        ${noScroll ? 'rf-table--no-scroll' : ''}`}
      {...getTableProps()}
    >
      <div className="table">
        <div className={`caption ${styles.caption}`} role="caption">
          <span>{title}</span>
          {!!exportable && (
            <button
              className="rf-btn rf-btn--sm rf-fi-download-line rf-btn--icon-left rf-btn--secondary"
              title="Download data as CSV"
              onClick={downloadCSVData<T>({ columns, data, name: exportable.name })}
            >
              CSV
            </button>
          )}
        </div>
        <div className="thead">
          {headerGroups.map((headerGroup) => (
            <div className="tr" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                // @ts-ignore
                const sortByProps = column.getSortByToggleProps();
                // @ts-ignore
                const { isSorted, isSortedDesc, headerClassName } = column;
                const headerProps = column.getHeaderProps(sortByProps);

                return (
                  <div
                    {...headerProps}
                    className={`th ${
                      isSorted
                        ? isSortedDesc
                          ? 'react-table--sorted-down'
                          : 'react-table--sorted-up'
                        : ''
                    } ${headerClassName || ''} ${
                      //@ts-ignore
                      getAlignClass(column.align)
                    } ${
                      //@ts-ignore
                      getSizeClass(column.size)
                    }`}
                  >
                    {column.render('Header')}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="tbody" {...getTableBodyProps()}>
          {!shouldVirtualize && rows.map((row) => <RenderNormalRow row={row} />)}
          {shouldVirtualize && (
            <div style={{ height: virtualize?.height || 500 }}>
              <AutoSizer>
                {({ width }) => (
                  <FixedSizeList
                    height={virtualize?.height || 500}
                    itemCount={rows.length}
                    itemSize={virtualize?.itemSize || 56}
                    // @ts-ignore
                    width={width - scrollBarSize}
                  >
                    {RenderVirtualizedRow}
                  </FixedSizeList>
                )}
              </AutoSizer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
