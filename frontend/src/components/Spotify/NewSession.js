import React, {useState} from 'react'
import { AuthUserContext } from '../Session';
import { withAuthorization } from '../Session';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'



const newSession = () => {
    const [sessionName, setSessionName] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();

    const generate_playlist_uuid = () =>{
        const characters = "abcdefghijklmnopqrstuvwxyz"
        const length = 7
        let randomStr = '';
        for (let i = 0; i < length; i++){
          const randNum = Math.floor(Math.random() * characters.length)
          randomStr += characters[randNum]
        }
        return randomStr
      }

    const onSubmit = authUser => event => {
        const sessionId = generate_playlist_uuid();
        event.preventDefault();
        
        fetch(('/Session/' + sessionId), {
            method: 'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "home_user": authUser.uid,
                "playlist_id": sessionId,
                "session_name": sessionName
            })
        }).then(() => {
            localStorage.setItem('session_code', sessionId)
            history.push(ROUTES.SPOTIFY)

        })
        
    }

    return (
        <AuthUserContext.Consumer>
            {authUser => (
                <form onSubmit={onSubmit(authUser)}>
                    <label>
                        <input type="text" placeholder="Session Name..." onChange = {e => setSessionName(e.target.value)}/>
                        <br />
                        <button type="submit">
                            Create new session
                        </button>
                    </label>
                </form>
            )
            }
        </AuthUserContext.Consumer>
    )
}

const condition = authUser => !! authUser;
export default withAuthorization(condition)(newSession);