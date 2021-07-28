import React, { useEffect, useState } from 'react'
import { withAuthorization } from '../Session';

const Spotify = () => {
    const [signInLink, setSignInLink] = useState('')


    useEffect(() => {
        fetch('http://127.0.0.1:5000/Spotify', {method: 'GET'})
            .then(response => response.json())
            .then(
                data => {
                    setSignInLink(data["link_url"])
                }
            )
    }
    , [])
    
    

    return (
        <div>
            <a href={signInLink}>Connect To Spotify</a>
        </div>
    );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Spotify);