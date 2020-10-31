import React from "react";
import { Col, Nav, Row, Container } from "react-bootstrap";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Categories from "../categories";
import OpeningHours from "../openingHours";
import General from "./general";

const CustomNav = styled(Nav)`
  background-color: #e9ebee;
`;

const CustomNavItem = styled(Nav.Item)`
  background-color: ${(props) => (props.active ? "#fff" : "transparent")};
`;

const CustomNavLink = ({ to, children }) => {
  const match = useRouteMatch({
    path: to,
    exact: true,
  });

  return (
    <CustomNavItem className="rounded" active={match}>
      <Nav.Link as={Link} to={to}>
        {children}
      </Nav.Link>
    </CustomNavItem>
  );
};

function Settings() {
  const { path, url } = useRouteMatch();

  return (
    <Container className="my-3">
      <Row className="justify-content-center">
        <Col lg="7">
          <CustomNav variant="pills" className="rounded p-2" fill>
            <CustomNavLink to={`${url}/opening-hours`}>
              Godziny otwarcia
            </CustomNavLink>
            <CustomNavLink to={`${url}/categories`}>Kategorie</CustomNavLink>
            <CustomNavLink to={`${url}/general`}>Ogólne</CustomNavLink>
          </CustomNav>
        </Col>
      </Row>
      <div style={{ height: "20px" }}></div>
      <Switch>
        <Route path={`${path}/opening-hours`}>
          <OpeningHours />
        </Route>
        <Route path={`${path}/categories`}>
          <Categories />
        </Route>
        <Route path={`${path}/general`}>
          <General />
        </Route>
      </Switch>
    </Container>
  );
}

export default Settings;
