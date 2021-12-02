import React, {useState, useEffect} from 'react'
import * as ROUTES from '../../constants/routes';
import { useHistory } from 'react-router';



const LibraryHome = () => {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        setLoading(true)
        if(isLoggedIn || localStorage.getItem('spotifyLoggedIn')){
            setLoggedIn(true)
        }else{
            history.push(ROUTES.SPOTIFY)
        }
        fetch(('/spotify-profile/'), {
            method: 'GET',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if(response.ok){
                response.json().then((user) => {
                    setUser(user);
                    setLoading(false)
                })
            }else{
                console.log('error');
            }
        })
    }, [])


        

    return (
        <div>
            {loading? <h1>Loading</h1> : <h1>{user.display_name}</h1>}
        </div>
    )
}

export default LibraryHome;