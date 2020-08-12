import React from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Categories from "../categories";
import OpeningHours from "../openingHours";

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
    <>
      <Row className="justify-content-center">
        <Col lg="7">
          <CustomNav variant="pills" className="rounded p-2" fill>
            <CustomNavLink to={`${url}/opening-hours`}>
              Godziny otwarcia
            </CustomNavLink>
            <CustomNavLink to={`${url}/categories`}>Kategorie</CustomNavLink>
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
      </Switch>
    </>
  );
}

export default Settings;
