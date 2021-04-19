import React from 'react';

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
    <div className={`rf-search-bar ${className || ''}`} {...props}>
      {label && <label className="rf-label">{label}</label>}
      <input
        className="rf-input"
        placeholder={placeholder}
        type="search"
        name="search-input-input"
        onChange={handleChange}
      />
      <button className="rf-btn" title={buttonLabel} onClick={handleSubmit}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default Search;
