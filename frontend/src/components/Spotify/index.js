import React, { useEffect, useState } from 'react'
import { withAuthorization } from '../Session';
import SpotifyHome from './spotifyhome';

const Spotify = Component => {
    const [url, setUrl] = useState('')
    const [isLoggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('spotifyLoggedIn')){
            setLoggedIn(true)
        }else{
            var urlParams = new URLSearchParams(window.location.search); 
            if(urlParams.has("code") && urlParams.has("state")){
                //This means the page is being called back to by the spotify login, so now we pass the code and state to backend
                fetch('/callback/', {
                    method: 'POST',
                    credentials:'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "code":urlParams.get("code"),
                        "state":urlParams.get("state")
                    })
                }).then(() => {
                    setLoggedIn(true);
                    localStorage.setItem('spotifyLoggedIn', 'True')
                })
            }else {
                fetch('/Spotify/', {
                    credentials:'include',
                })
                .then(response => response.json())
                .then(data => setUrl(data['url']))
            }
        }
    }, [])
    return (
        isLoggedIn ? 
        <SpotifyHome />
        :
        (<div>    
            <a href={url}>Connect To Spotify</a>
        </div>)
    );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Spotify);