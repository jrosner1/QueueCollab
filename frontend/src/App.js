import React, {useState} from 'react';
import DashBoard from './components/DashBoard/DashBoard';
import './App.css';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  const [token, setToken] = useState();
  if(!token){
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <DashBoard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
 