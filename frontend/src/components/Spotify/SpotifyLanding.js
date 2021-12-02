import React, {useState, useEffect} from  'react'
import * as ROUTES from '../../constants/routes';
import QueuePage from './QueuePage';
import {
    useHistory,
    Link
  } from "react-router-dom";

function SpotifyLanding () {
    const [sessionId, setSessionId] = useState('');
    const [hasSession, setHasSession] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();

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
            }).then(response => {
                if(response.ok){
                    localStorage.setItem('session_code', sessionId)
                    history.push(ROUTES.SPOTIFY)
                }else{
                    setError('No session exists with this ID')
                }
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
            {error && <p>{error}</p>}
            <p>Don't have a Session? Create a new one Here!</p>
            
            <Link to={ROUTES.NEW_SESSION}>Create New Session</Link>
        </div>
    )
}
export default SpotifyLanding