import { faClock, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatISO } from "date-fns";
import React, { useState } from "react";
import { Button, Col, Row, Spinner, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import PaymentStatus from "../../components/paymentStatus";
import { useApi } from "../../hooks";
import { NiceButton } from "../../styles";
import { formatDate, formatPrice } from "../../utils/format";
import { HooverBox, Lines, Paper } from "./styles";

const Orders = () => {
  const [date, setDate] = useState(new Date());
  const today = formatISO(date, { representation: "date" });
  const { reload, loading, data: orders = [] } = useApi(
    `orders?today=${today}`
  );
  const total = orders.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <>
      <div className="bg-white border-bottom py-4 mb-4">
        <Container>
          <Row className="justify-content-center">
            <Col lg="7">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-inline-block">
                  <DatePicker
                    customInput={
                      <NiceButton className="bg-white text-dark">
                        {formatDate(date, "iiii, d MMM")}
                      </NiceButton>
                    }
                    popperPlacement="bottom-start"
                    onChange={setDate}
                  />
                </div>
                <NiceButton onClick={() => reload()}>
                  <FontAwesomeIcon icon={faSync} /> Odśwież
                </NiceButton>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col lg="7">
            <p>
              Zamówienia na łączną sumę <strong>{formatPrice(total)}</strong> zł
            </p>

            {loading && <Spinner animation="border" variant="primary" />}

            {!loading &&
              orders.map((order) => (
                <HooverBox className="my-3 border rounded p-2" key={order.id}>
                  <div className="d-flex justify-content-between border-bottom py-2">
                    <div>
                      {order.name}{" "}
                      <span className="d-block d-lg-inline">
                        tel. {order.phone}
                      </span>
                    </div>
                    <div className="text-right">
                      <PaymentStatus
                        type={order.payment_type}
                        payments={order.payments}
                      />
                      <span style={{ display: "inline-block" }}>
                        <FontAwesomeIcon icon={faClock} className="mx-1" />
                        {formatDate(
                          new Date(order.created_at.replace(/-/g, "/")),
                          "HH:mm"
                        )}
                      </span>
                    </div>
                  </div>

                  <Paper>
                    <Lines>
                      {order.meals.map((meal, i) => (
                        <div key={i} className="d-flex justify-content-between">
                          <div>
                            {meal.qty} x {meal.name}
                          </div>
                          <div style={{ whiteSpace: "nowrap" }}>
                            {meal.price} zł
                          </div>
                        </div>
                      ))}
                      {order.promo_code && (
                        <div className="d-flex justify-content-between">
                          <div>Kod rabatowy "{order.promo_code.code}"</div>
                          <div>
                            {order.promo_code.value}{" "}
                            {order.promo_code.type === "percent" ? "%" : "zł"}{" "}
                          </div>
                        </div>
                      )}
                      <div className="d-flex justify-content-between font-weight-bold">
                        <div>Razem</div>
                        <div>{order.total} zł</div>
                      </div>
                    </Lines>
                  </Paper>

                  <div className="py-2 border-top d-flex justify-content-between align-items-center">
                    {!order.pickup_location_id && (
                      <>
                        <div>
                          <div>{order.address}</div>
                          <div>{order.address_line_2}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          href={`https://www.google.com/maps/search/?api=1&query=${order.address}`}
                          target="_blank"
                        >
                          Mapa
                        </Button>
                      </>
                    )}
                    {order.pickup_location_id && (
                      <div className="bg-warning px-2">
                        Odbiór {order.pickup_location_name} o {order.pick_up_at}
                      </div>
                    )}
                  </div>
                  {order.comment && (
                    <div className="py-2 border-top">{order.comment}</div>
                  )}
                </HooverBox>
              ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Orders;
