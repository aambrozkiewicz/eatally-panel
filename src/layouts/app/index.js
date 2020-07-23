import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Link, Route, Switch, useHistory, useRouteMatch
} from "react-router-dom";
import Dashboard from '../../routes/dashboard';
import DailyMenu from '../../routes/menu';
import Orders from '../../routes/orders';
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
          <Navbar.Brand as={Link} to={url}>eatally</Navbar.Brand>
          <Navbar.Toggle aria-controls="sidebar-navbar-nav" />
          <Navbar.Collapse id="sidebar-navbar-nav">
            <Nav className="sidebar-nav">
              <Nav.Link as={Link} to={`${url}`}>
                Początek
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/orders`}>
                Zamówienia
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/menu`}>
                Menu
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
              <Route path={`${path}/orders`}>
                <Orders />
              </Route>
              <Route path={`${path}/menu`}>
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
