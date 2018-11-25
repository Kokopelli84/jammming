import React, { Component } from 'react';
import './App.css';

import Spotify from '../../util/Spotify';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "Rock N' Rolla",
      playlistTracks: []
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
              id: newTrack.id,
              uri: newTrack.uri
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
    console.log('saving playlist')
    const trackUris = this.state.playlistTracks.map(track => track.uri)
    const playlistName = this.state.playlistName;
    Spotify.savePlaylist(playlistName, trackUris);
  }

  search = (searchTerm) => {
    console.log(`Search Spotify for "${searchTerm}"`);
    Spotify.getAccessToken()
    Spotify.search(searchTerm).then(tracks => {
      this.setState({
        searchResults: tracks
      });
    })
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
