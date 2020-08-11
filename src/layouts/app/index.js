import { faAsterisk, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Collapse, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Link, Route, Switch, useHistory, useRouteMatch
} from "react-router-dom";
import styled from 'styled-components';
import { fetchMe } from '../../modules/user/actions';
import Alerts from '../../routes/alerts';
import Dashboard from '../../routes/dashboard';
import DailyMenu from '../../routes/menu/daily';
import FixedMenu from '../../routes/menu/fixed';
import Orders from '../../routes/orders';
import Settings from '../../routes/settings';
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
  const { username, catering: { name: cateringName } = {} } = useSelector(state => state.user);

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
          <Navbar.Brand as={Link} to={url} className="ml-lg-2 mb-lg-5">eatally</Navbar.Brand>
          <Navbar.Toggle aria-controls="sidebar-navbar-nav" />
          <Navbar.Collapse id="sidebar-navbar-nav" className="align-items-start w-100">
            <Nav className="sidebar-nav w-100">
              <Nav.Link as={Link} to={`${url}`}>
                <FontAwesomeIcon icon={faAsterisk} /> Początek
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/orders`}>
                Zamówienia
              </Nav.Link>
              <Nav.Item>
                <Nav.Link onClick={() => setOpen(!open)}
                  data-toggle="collapse"
                  aria-controls="more-menu"
                  aria-expanded={open}
                  className="dropdown-toggle">
                  Menu
                </Nav.Link>
                <Collapse in={open}>
                  <div className="sub-nav">
                    <Nav className="flex-column">
                      <Nav.Link as={Link} to={`${url}/daily-menu`}>Codzienne</Nav.Link>
                      <Nav.Link as={Link} to={`${url}/fixed-menu`}>Stałe</Nav.Link>
                    </Nav>
                  </div>
                </Collapse>
              </Nav.Item>
              <Nav.Link as={Link} to={`${url}/alerts`}>
                Komunikaty
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/settings/opening-hours`}>
                <FontAwesomeIcon icon={faCog} /> Ustawienia
              </Nav.Link>
              <hr />
              <div className="text-small text-muted ml-lg-2">
                {cateringName}
              </div>
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
          <Container className="py-3">
            <Switch>
              <Route path={`${path}/orders`}>
                <Orders />
              </Route>
              <Route path={`${path}/daily-menu`}>
                <DailyMenu />
              </Route>
              <Route path={`${path}/fixed-menu`}>
                <FixedMenu />
              </Route>
              <Route path={`${path}/alerts`}>
                <Alerts />
              </Route>
              <Route path={`${path}/settings`}>
                <Settings />
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
