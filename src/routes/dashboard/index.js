import React from "react";
import { Col, Row, Spinner, Container } from "react-bootstrap";
import Graph from "../../components/graph";
import { useApi } from "../../hooks";
import { Lines } from "../orders/styles";
import { RippedPaper } from "./styles";

const Dashboard = () => {
  const { loading, data: { meals = [], byDay = [] } = {} } = useApi(
    "meal/summary"
  );

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col lg="7">
          <h4 className="mb-4 display-4">Dzień dobry!</h4>
          <hr />
          {loading && (
            <Spinner animation="border" variant="primary" className="mb-3" />
          )}
          {!loading && meals.length === 0 && (
            <p className="lead">
              Na tę chwilę nie ma żadnych zamówień na dzisiaj
            </p>
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
            </>
          )}
          <p className="mt-4 lead">Ilość zamówień na dzień tygodnia</p>
          <div className="bg-white p-2 shadow rounded d-flex justify-content-center">
            <Graph bars={byDay} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
