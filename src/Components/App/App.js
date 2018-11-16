import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
          name: 'Crosstown Traffic',
          artist: 'Jimi Hendrix',
          album: 'Electric Ladyland',
          id: 1
        },
        {
          name: 'Cocaine',
          artist: 'Eric Clapton',
          album: 'Slowhands',
          id: 2
        },
        {
          name: 'Killer Queen',
          artist: 'Queen',
          album: 'Sheer Heart Attack',
          id: 3
        } 
      ]
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} />
          <Playlist />
        </div>
        </div>
      </div>
    );
  }
}

export default App;
