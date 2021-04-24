import './App.css';
import { NavLink, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import React, { useState, useEffect } from 'react';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem('user-token');
    if (token) {
      setToken(token);
    }
  }, [])

  return (
    <div className="App">
      <div id="head-nav">
        <NavLink to="/" >Home</NavLink><br />
        {token && token !== '' ? <NavLink to="/dashboard">Dashboard</NavLink> : ''}
        {token && token !== '' ? <NavLink to="/logout">Logout</NavLink> : <NavLink to="/login">Login</NavLink>}
        <br />
      </div>

      <div id="body">
        <Switch>
          <Route path="/" exact>
            <h1>Welcome to home</h1>
          </Route>
          <Route path="/login" render={(props) => (
            <Login {...props} updateToken={setToken} />
          )}>
          </Route>
          <Route path="/dashboard">
            <Dashboard token={token} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
