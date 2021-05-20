import Button from 'modules/Common/components/Button';
import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';

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
    <div className={classNames(className)} {...props}>
      <p>{label && <label>{label}</label>}</p>
      <input
        placeholder={placeholder}
        type="search"
        name="search-input-input"
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>{buttonLabel}</Button>
    </div>
  );
};

export default Search;
