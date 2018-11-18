import React, { Component } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {

    const handlTermChange = (e) => {
        onSearch(e.target.value);
    }

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={handlTermChange} />
            <a>SEARCH</a>
        </div>
    );
}

export default SearchBar;