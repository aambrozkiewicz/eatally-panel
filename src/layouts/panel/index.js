import { faAsterisk, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Collapse, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import styled from "styled-components";
import { fetchMe } from "../../modules/user/actions";
import Alerts from "../../routes/alerts";
import Dashboard from "../../routes/dashboard";
import DailyMenu from "../../routes/menu/daily";
import FixedMenu from "../../routes/menu/fixed";
import Orders from "../../routes/orders";
import Settings from "../../routes/settings";
import { removeToken } from "../../utils/auth";
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
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { username, catering: { name: cateringName } = {} } = useSelector(
    (state) => state.panel.user
  );

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
          <Navbar.Brand as={Link} to="/" className="ml-lg-2 mb-lg-5">
            eatally
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="sidebar-navbar-nav" />
          <Navbar.Collapse
            id="sidebar-navbar-nav"
            className="align-items-start w-100"
          >
            <Nav className="sidebar-nav w-100">
              <Nav.Link as={Link} to="/">
                <FontAwesomeIcon icon={faAsterisk} /> Początek
              </Nav.Link>
              <Nav.Link as={Link} to="/orders">
                Zamówienia
              </Nav.Link>
              <Nav.Item>
                <Nav.Link
                  onClick={() => setOpen(!open)}
                  data-toggle="collapse"
                  aria-controls="more-menu"
                  aria-expanded={open}
                  className="dropdown-toggle"
                >
                  Menu
                </Nav.Link>
                <Collapse in={open}>
                  <div className="sub-nav">
                    <Nav className="flex-column">
                      <Nav.Link as={Link} to="/daily-menu">
                        Codzienne
                      </Nav.Link>
                      <Nav.Link as={Link} to="/fixed-menu">
                        Stałe
                      </Nav.Link>
                    </Nav>
                  </div>
                </Collapse>
              </Nav.Item>
              <Nav.Link as={Link} to="/alerts">
                Komunikaty
              </Nav.Link>
              <Nav.Link as={Link} to="/settings/opening-hours">
                <FontAwesomeIcon icon={faCog} /> Ustawienia
              </Nav.Link>
              <hr />
              <div className="text-small text-muted ml-lg-2">
                {cateringName}
              </div>
              <Nav.Link href="#" onClick={logout} className="d-lg-none">
                Wyloguj ({username})
              </Nav.Link>
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
          {/* <Container className="py-3"> */}
          <Switch>
            <Route path="/orders">
              <Orders />
            </Route>
            <Route path="/daily-menu">
              <DailyMenu />
            </Route>
            <Route path="/fixed-menu">
              <FixedMenu />
            </Route>
            <Route path="/alerts">
              <Alerts />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
          {/* </Container> */}
        </div>
      </div>
    </Router>
  );
}

export default App;