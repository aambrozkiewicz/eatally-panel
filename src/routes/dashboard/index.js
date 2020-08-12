import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { useApi } from "../../hooks";
import { NiceButton } from "../../styles";
import { Lines } from "../orders/styles";
import { RippedPaper } from "./styles";

const Dashboard = () => {
  const { url } = useRouteMatch();
  const { loading, data: meals = [] } = useApi("meal/summary");

  return (
    <Row className="justify-content-center">
      <Col lg="7">
        <h4 className="display-4 mb-4">Dzisiaj do przygotowania</h4>
        {loading && (
          <Spinner animation="border" variant="primary" className="mb-3" />
        )}
        {!loading && meals.length === 0 && (
          <div className="ml-1">Brak dań na dzisiaj</div>
        )}
        {meals.length > 0 && (
          <>
            <RippedPaper className="shadow border">
              <Lines>
                {meals.map((meal, i) => (
                  <div key={i} className="d-flex justify-content-between">
                    <div>{meal.name}</div>
                    <div style={{ whiteSpace: "nowrap" }}>{meal.qty}</div>
                  </div>
                ))}
              </Lines>
            </RippedPaper>
            <div className="mt-4 text-right">
              <Link to={`${url}/orders`}>
                <NiceButton className="bg-white text-dark">
                  Przejdź do zamówień <FontAwesomeIcon icon={faArrowRight} />
                </NiceButton>
              </Link>
            </div>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Dashboard;
