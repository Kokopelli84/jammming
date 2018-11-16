import React from 'react';
import './Track.css';

const Track = (props) => {
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p>Elton John | Madman Across The Water</p>
            </div>
            <a className="Track-action">+</a>
        </div>
    );
}

export default Track;

/* Replace live variables according to code below
<div class="Track">
  <div class="Track-information">
    <h3><!-- track name will go here --></h3>
    <p><!-- track artist will go here--> | <!-- track album will go here --></p>
  </div>
  <a class="Track-action"><!-- + or - will go here --></a>
</div>
*/