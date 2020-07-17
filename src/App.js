import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';
import DailyMenu from './routes/dailyMenu';
import Dashboard from './routes/dashboard';

import "./App.css";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Navbar bg="dark" variant="dark" expand="lg" className="sidebar">
          <Navbar.Brand as={Link} to="/">eatally</Navbar.Brand>
          <Navbar.Toggle aria-controls="sidebar-navbar-nav" />
          <Navbar.Collapse id="sidebar-navbar-nav">
            <Nav className="sidebar-nav">
              <Nav.Link as={Link} to="/">
                Początek
              </Nav.Link>
              <Nav.Link as={Link} to="/daily-menu">
                Menu codzienne
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="main-container">
          <Container className="pt-2">
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
