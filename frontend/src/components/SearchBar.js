import React, { useRef } from 'react';

function SearchBar({ handleSearch }) {
  const searchInputRef = useRef(null);

  const handleClick = () => {
    const input = searchInputRef.current.value.toLowerCase();
    handleSearch(input);
  };

  return (
    <div className="searchbar">
      <input type="text" placeholder="Search..." ref={searchInputRef} />
      <button className="btn btn-danger" onClick={handleClick}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
