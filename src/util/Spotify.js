let accessToken;
let expiresIn;

const clientId = '2fd6b89a38eb4785b4178749b9eef147';
const redirectURI = 'kokopelli84-jammmin.surge.sh';

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return;
        } else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
            accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
            expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
    },
    search(term) {
        this.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse) {
                    return jsonResponse.tracks.items.map(track => {
                        return {
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri

                        }
                    })
                } else {
                    return {}
                }
            })
    },
    savePlaylist(playlistName, trackURIs) {
        if (playlistName && trackURIs) {
            const headers = {
                Authorization: `Bearer ${accessToken}`
            }
            let userId;
            let playlistId;
            return fetch(`https://api.spotify.com/v1/me`,
                { headers: headers },
            ).then(response => response.json())
                .then(jsonResponse => {
                    if (jsonResponse) {
                        userId = jsonResponse.id
                    }
                })
                .then(() =>
                    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
                        {
                            method: 'POST',
                            headers: {
                                ...headers,
                                "Content-Type": 'application/json'
                            },
                            body: JSON.stringify({ name: playlistName })
                        }
                    )
                        .then(response => response.json())
                        .then(jsonResponse => {
                            if (jsonResponse) {
                                playlistId = jsonResponse.id
                            }
                        })
                        .then(() => {
                            fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                                {
                                    method: 'POST',
                                    headers: {
                                        ...headers,
                                        "Content-Type": 'application/json'
                                    },
                                    body: JSON.stringify({ uris: trackURIs })
                                }
                            ).then(response => response.json())
                                .then(jsonResponse => {
                                    if (jsonResponse) {
                                        console.log("Playlist saved successfully")
                                    }
                                })
                        })
                )
        } else {
            return;
        }
    }
}


export default Spotify;