import React, { useEffect, useState } from 'react';
import { Collapse, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Link, Route, Switch, useHistory, useRouteMatch
} from "react-router-dom";
import styled from 'styled-components';
import { fetchMe } from '../../modules/user/actions';
import Dashboard from '../../routes/dashboard';
import DailyMenu from '../../routes/menu';
import Orders from '../../routes/orders';
import { removeToken } from '../../utils/auth';
import "./app.css";

const Circle = styled.span`
  display: inline-block;
  background-color: #fff;
  color: #000;
  padding: 10px;
  width: 30px;
  line-height: 10px;
  height: 30px;
  border-radius: 50%;
  text-transform: uppercase;
  margin-right: 10px;
`;

function App() {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { username } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  const logout = () => {
    removeToken();
    history.push("/login");
  };

  return (
    <Router>
      <div className="wrapper">
        <Navbar bg="dark" variant="dark" expand="lg" className="sidebar">
          <Navbar.Brand as={Link} to={url} className="ml-lg-2">eatally</Navbar.Brand>
          <Navbar.Toggle aria-controls="sidebar-navbar-nav" />
          <Navbar.Collapse id="sidebar-navbar-nav" className="align-items-start w-100">
            <Nav className="sidebar-nav w-100">
              <Nav.Link as={Link} to={`${url}`}>
                Początek
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/orders`}>
                Zamówienia
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/menu`}>
                Menu
              </Nav.Link>
              <Nav.Item>
                <Nav.Link onClick={() => setOpen(!open)}
                  data-toggle="collapse"
                  aria-controls="more-menu"
                  aria-expanded={open}
                  className="dropdown-toggle">
                  Więcej
                </Nav.Link>
                <Collapse in={open}>
                  <div id="more-menu">
                    <Nav.Link>Hello</Nav.Link>
                  </div>
                </Collapse>
              </Nav.Item>
              <Nav.Link href="#" onClick={logout} className="d-lg-none">Wyloguj ({username})</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Nav className="d-none d-lg-block">
            <Nav.Link href="#" onClick={logout}>
              <Circle>{username && username[0]}</Circle>
              Wyloguj ({username})
            </Nav.Link>
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
