import React, {useEffect, useState} from 'react'
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {
    Link,
    useHistory
  } from "react-router-dom";

const QueuePage = (props) => {
    const [loading, setLoading] = useState(false);
    const [sessionName, setSessionName] = useState('')
    const history = useHistory();
    const [songs, setSongs] = useState([])
    

    useEffect(() => {
        setLoading(true);
        const unsubscribe = props.firebase.session(props.session).child('session_name')
        .on('value', function (dataSnapshot){
            console.log(dataSnapshot.val())
            setSessionName(dataSnapshot.val())
        }, function(error) {
            localStorage.removeItem('session_code');
            history.push(ROUTES.SPOTIFY)
        });
        const unsub_children = props.firebase.songs(props.session)
        .on('child_added', (snapshot, prevChildKey) => {
            console.log(snapshot.val());
        })
        setLoading(false);
        return () => {
            props.firebase.session(props.session).child('session_name').off()
            props.firebase.songs(props.session).off()

        };
    }, [])




    return (
        <div>
            {loading && <div>Loading ... </div>}
       <Header sessionName={sessionName} />
       <SongList songs={songs} />

        </div>
    )
}

const Header = ({sessionName}) => {
    const history = useHistory();
    const leaveSession = () => {
        localStorage.removeItem('session_code')
        window.location.reload();
    }
    return (
        <div>
            <h1>{sessionName}</h1>
            <Link to={ROUTES.LIBRARY_HOME}>Add Song to Session</Link>
            <button onClick={leaveSession}>Leave Session</button>
        </div>
    )
}

const SongList = ({songs}) => {
    return (
        <h1>List of songs</h1>
    )
}

export default withFirebase(QueuePage);