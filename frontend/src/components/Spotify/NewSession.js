import React, {useState} from 'react'

const newSession = () => {
    const [sessionName, setSessionName] = useState('');
    const [error, setError] = useState(null);

    const onSubmit = event => {
        event.preventDefault();
        
    }

    return (

        <form onSubmit={onSubmit}>
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


export default newSession;