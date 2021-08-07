import React, { useEffect, useState } from 'react'
import { withAuthorization } from '../Session';

const Spotify = () => {
    const [url, setUrl] = useState('')


    useEffect(() => {
        var urlParams = new URLSearchParams(window.location.search);
        if(urlParams.has("code") && urlParams.has("state")){
            //This means the page is being called back to by the spotify login, so now we pass the code and state to backend
            fetch('/callback/', {
                method: 'post',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    "code":urlParams.get("code"),
                    "state":urlParams.get("state")
                }
            })
        }else {
            fetch('/Spotify/', {
                credentials:'include',
            })
            .then(response => response.json())
            .then(data => setUrl(data['url']))
        }
    }, [])


    
    


    return (
        <div>    
            <a href={url}>Connect To Spotify</a>
        </div>
    
    );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Spotify);