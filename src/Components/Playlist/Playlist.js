import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList'

const Playlist = (props) => {

    const { name, tracks, onAdd, onRemove, onSave } = props;

    const handleNameChange = (e) => {
        console.log(e.target.value);
        props.onNameChange(e.target.value)
    }

    return (
        <div className="Playlist">
            <input
                defaultValue={name}
                onChange={handleNameChange}
            />
            <TrackList
                tracks={tracks}
                onAdd={onAdd}
                onRemove={onRemove}
                isRemoval={true}
            />
            <a className="Playlist-save" onClick={onSave} >SAVE TO SPOTIFY</a>
        </div>
    );
}

export default Playlist;