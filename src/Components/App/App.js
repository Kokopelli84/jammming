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
      ],
      playlistName: "Rock N' Rolla",
      playlistTracks: [
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
        }
      ]
    }
  }

  addTrack = (newTrack) => {

    const songExists = this.state.playlistTracks.find(track => track.id === newTrack.id)
    if (!songExists) {
      this.setState(prevState => {
        return {
          playlistTracks: [
            ...prevState.playlistTracks,
            {
              name: newTrack.name,
              artist: newTrack.artist,
              album: newTrack.album,
              id: newTrack.id
            }
          ]
        }
      });
    }
  }

  removeTrack = (toRemove) => {

    const newPlaylist = this.state.playlistTracks.filter(track => toRemove.id !== track.id)

    this.setState({
      playlistTracks: newPlaylist
    });
  }

  updatePlaylistName = (name) => {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist = () => {
    return this.state.playlistTracks.map( track => track.uri );
  }

  search = (searchTerm) => {
    console.log(searchTerm)
  }

  render() {

    const { searchResults, playlistName, playlistTracks } = this.state;

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={searchResults} onAdd={this.addTrack} />
            <Playlist 
              name={playlistName} 
              tracks={playlistTracks} 
              onAdd={this.addTrack} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
