import React, {useState} from  'react'
import * as ROUTES from '../../constants/routes';
import {
    Link
  } from "react-router-dom";

function SpotifyLanding () {
    const [sessionId, setSessionId] = useState('');
    return (
        <div>
            <h1>Logged Into Spotify</h1>
            <p>Search for a Session to Join!</p>
            <input type="text" id="myInput" placeholder="Search for a Session..." onChange = {e => setSessionId(e.target.value)}/>
            <p>Don't have a Session? Create a new one Here!</p>
            
            <Link to={ROUTES.NEW_SESSION}>Create New Session</Link>
        </div>
    )
}
export default SpotifyLanding