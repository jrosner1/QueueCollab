
import React, {useState} from 'react';
import * as ROUTES from '../../constants/routes';
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
import newSession from "./NewSession";
import SpotifyLanding from './SpotifyLanding';
function SpotifyHome(){
    

    //let { path, url } = useRouteMatch();

    return (
        <Router>
            <div>
                <Route exact path={ROUTES.SPOTIFY} component={SpotifyLanding}></Route>
                <Route path={ROUTES.NEW_SESSION} component={newSession} />
            </div>
        </Router>

    );
}

export default SpotifyHome;