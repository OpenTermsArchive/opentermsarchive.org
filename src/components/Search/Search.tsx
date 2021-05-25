import Button from 'modules/Common/components/Button';
import React from 'react';
import classNames from 'classnames';
import s from './Search.module.css';

export interface SearchProps {
  label?: React.ReactNode;
  className?: string;
  placeholder?: string;
  buttonLabel: string;
  onSearchSubmit: (searchString: string) => any;
}

// https://gouvfr.atlassian.net/wiki/spaces/DB/pages/217186376/Barre+de+recherche+-+Search+bar

const Search = ({
  label,
  className,
  placeholder,
  buttonLabel,
  onSearchSubmit,
  ...props
}: SearchProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [search, setSearch] = React.useState('');
  const handleChange = (event: any) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    onSearchSubmit(search);
  };

  return (
    <div className={classNames(s.search, className)} {...props}>
      <div className={classNames('formfield')}>
        {label && <label htmlFor="url">{label}</label>}
        <input
          placeholder={placeholder}
          type="search"
          name="search-input-input"
          onChange={handleChange}
          id="url"
        />
      </div>
      <div className={classNames('formfield', 'formfield__alignRight')}>
        <Button onClick={handleSubmit}>{buttonLabel}</Button>
      </div>
    </div>
  );
};

export default Search;
