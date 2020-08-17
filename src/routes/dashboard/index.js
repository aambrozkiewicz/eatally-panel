import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import Graph from "../../components/graph";
import { useApi } from "../../hooks";
import { NiceButton } from "../../styles";
import { Lines } from "../orders/styles";
import { RippedPaper } from "./styles";

const Dashboard = () => {
  const { url } = useRouteMatch();
  const { loading, data: { meals = [], byDay = [] } = {} } = useApi(
    "meal/summary"
  );

  return (
    <Row className="justify-content-center">
      <Col lg="7">
        <h4 className="mb-4 display-4">Dzień dobry!</h4>
        <hr />
        {loading && (
          <Spinner animation="border" variant="primary" className="mb-3" />
        )}
        {!loading && meals.length === 0 && (
          <div className="ml-1">Brak dań na dzisiaj</div>
        )}
        {meals.length > 0 && (
          <>
            <p className="lead">Dzisiaj do przygotowania</p>
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
            {/* <div className="mt-4 text-right">
              <Link to={`${url}/orders`}>
                <NiceButton className="bg-white text-dark">
                  Przejdź do zamówień <FontAwesomeIcon icon={faArrowRight} />
                </NiceButton>
              </Link>
            </div> */}
          </>
        )}
        <p className="mt-4 lead">Ilość zamówień na dzień tygodnia</p>
        <div className="bg-white p-2 shadow rounded d-flex justify-content-center">
          <Graph bars={byDay} />
        </div>
      </Col>
    </Row>
  );
};

export default Dashboard;
