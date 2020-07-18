import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';
import DailyMenu from '../../routes/dailyMenu';
import Dashboard from '../../routes/dashboard';
import { removeToken } from '../../utils/auth';

import "./app.css";

function App() {
  const history = useHistory();
  const { path, url } = useRouteMatch();

  const logout = () => {
    removeToken(null);
    history.push("/login");
  };

  return (
    <Router>
      <div className="wrapper">
        <Navbar bg="dark" variant="dark" expand="lg" className="sidebar">
          <Navbar.Brand as={Link} to="/">eatally</Navbar.Brand>
          <Navbar.Toggle aria-controls="sidebar-navbar-nav" />
          <Navbar.Collapse id="sidebar-navbar-nav">
            <Nav className="sidebar-nav">
              <Nav.Link as={Link} to={`${url}`}>
                Początek
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/daily-menu`}>
                Menu codzienne
              </Nav.Link>
              <Nav.Link href="#" onClick={logout} className="d-lg-none">Wyloguj</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Nav className="d-none d-lg-block">
            <Nav.Link href="#" onClick={logout}>Wyloguj</Nav.Link>
          </Nav>
        </Navbar>
        <div className="main-container">
          <Container className="pt-2">
            <Switch>
              <Route path={`${path}/daily-menu`}>
                <DailyMenu />
              </Route>
              <Route path={`${path}`}>
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
