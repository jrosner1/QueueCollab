import React, {useState, useEffect} from  'react'
import * as ROUTES from '../../constants/routes';
import QueuePage from './QueuePage';
import {
    Link
  } from "react-router-dom";

function SpotifyLanding () {
    const [sessionId, setSessionId] = useState('');
    const [hasSession, setHasSession] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('session_code')){
            setHasSession(true);
        }else{
            setHasSession(false)
        }
    })
    

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            fetch(('/Session/' + sessionId), {
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        }
    }

    return (
        hasSession ? 
        <QueuePage session={localStorage.getItem('session_code')} />
        :
        <div>
            <h1>Logged Into Spotify</h1>
            <p>Enter Session ID to Join!</p>
            <input type="text" 
                id="myInput" 
                placeholder="Search for a Session..." 
                onChange = {e => setSessionId(e.target.value) }
                onKeyDown={handleKeyDown}/>
            <p>Don't have a Session? Create a new one Here!</p>
            
            <Link to={ROUTES.NEW_SESSION}>Create New Session</Link>
        </div>
    )
}
export default SpotifyLanding