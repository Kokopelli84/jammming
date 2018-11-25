import React from 'react';
import './TrackList.css';

import Track from '../Track/Track'

const TrackList = (props) => {
    if (props.tracks.length) {
        return (
            <div className="TrackList">
                {props.tracks.map(track =>
                    <Track track={track} key={track.id} onAdd={props.onAdd} onRemove={props.onRemove} isRemoval={props.isRemoval} />
                )}
            </div>
        )
    } else {
        return (
            <div className="TrackList">

            </div>
        )
    }
}

export default TrackList;
