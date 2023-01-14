import React, { useState } from 'react';
import { useGlobalContext } from '../store';

const Search = () => {
  const [text, setText] = useState('');
  const { setSearchTerm, randomMeal } = useGlobalContext();

  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (text) {
      setSearchTerm(text);
    }
  };

  return (
    <header className="search-container">
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search favorite meal"
          value={text}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="btn">
          search
        </button>
        <button type="button" onClick={randomMeal} className="btn btn-hipster">
          Random Pick!
        </button>
      </form>
    </header>
  );
};

export default Search;
