import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Container, Navbar } from 'react-bootstrap';
import DailyMenu from './routes/dailyMenu';
import Dashboard from './routes/dashboard';

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App d-flex">
        <Navbar bg="dark" variant="dark" className="flex-column">
          <Link to="/" className="navbar-brand">eatally</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto flex-column">
              <li className="nav-item">
                <Link to="/" className="nav-link">Początek</Link>
              </li>
              <li className="nav-item">
                <Link to="/daily-menu" className="nav-link">Menu codzienne</Link>
              </li>
            </ul>
          </div>
        </Navbar>
        <div className="main-container">
          <Container>
            <Switch>
              <Route path="/daily-menu">
                <DailyMenu />
              </Route>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
