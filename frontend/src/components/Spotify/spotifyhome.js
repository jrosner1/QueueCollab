
import React from 'react';
import * as ROUTES from '../../constants/routes';
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
import LibraryRouter from '../Library/LibraryHome';
import newSession from "./NewSession";
import SpotifyLanding from './SpotifyLanding';
function SpotifyHome(){


    return (
        <Router>
            <div>
                <Route exact path={ROUTES.SPOTIFY} component={SpotifyLanding}></Route>
                <Route path={ROUTES.NEW_SESSION} component={newSession} />
                <Route path={ROUTES.LIBRARY_HOME} component={LibraryRouter}></Route>
            </div>
        </Router>

    );
}

export default SpotifyHome;