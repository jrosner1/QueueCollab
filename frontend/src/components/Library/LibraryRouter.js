import React, {useState, useEffect} from 'react';
import * as ROUTES from '../../constants/routes';
import LibraryHome from './LibraryHome';
import Playlists from './Playlists';
import LibraryNav from './LibraryNav';
import {
    BrowserRouter as Router,
    Route, useHistory
  } from "react-router-dom";


  function LibraryRouter(){
    const history = useHistory();
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        if(localStorage.getItem('spotifyLoggedIn')){
            setLoggedIn(true)
        }else{
            history.push(ROUTES.SPOTIFY)
        }
        setLoading(false)
    })

    return (
        <Router>
            <div>
                {loading && <div>Loading ...</div>}
                <LibraryNav ></LibraryNav>
                <Route exact path={ROUTES.LIBRARY_HOME} component={LibraryHome}></Route>
                <Route path={ROUTES.LIBRARY_PLAYLIST} component={Playlists}></Route>
                
            </div>
        </Router>
    )
  }

  export default LibraryRouter;
