import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import ConfirmButton from "../../components/confirmButton";
import Drawer from "../../components/drawer";
import { client } from "../../utils/api";
import { NiceButton } from "../../styles";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [show, setShow] = useState(false);
  const [alertId, setAlertId] = useState(null);
  const { register, handleSubmit, errors, reset } = useForm();

  useEffect(() => {
    fetchAlerts();
  }, []);

  async function fetchAlerts() {
    const response = await client("alert");
    setAlerts(response);
  }

  async function submit({ body }) {
    await client("alert", { method: "POST", body: { body, id: alertId } });
    close();
    fetchAlerts();
  }

  async function destroy(mealId) {
    await client(`alert/${mealId}`, { method: "DELETE" });
    fetchAlerts();
  }

  function close() {
    setAlertId(null);
    reset({ body: "" });
    setShow(false);
  }

  function edit({ id, body }) {
    setAlertId(id);
    reset({ body });
    setShow(true);
  }

  return (
    <>
      <Row className="justify-content-center">
        <Col lg="7">
          <div className="d-flex justify-content-between align-items-center">
            <h2 style={{ margin: 0 }}>Komunikaty</h2>
            <NiceButton onClick={() => setShow(true)} variant="outline-primary">
              Nowy
            </NiceButton>
          </div>
          <hr />
          <ListGroup>
            {alerts.map((alert) => (
              <ListGroup.Item
                key={alert.id}
                className="d-flex justify-content-between align-items-lg-center flex-column flex-lg-row"
              >
                <div className="mb-2 mb-lg-0">{alert.body}</div>
                <ButtonGroup>
                  <Button
                    size="sm"
                    variant="outline-dark"
                    onClick={() => edit(alert)}
                  >
                    Edycja
                  </Button>
                  <ConfirmButton
                    onClick={() => destroy(alert.id)}
                    size="sm"
                    variant="danger"
                  >
                    Usuń
                  </ConfirmButton>
                </ButtonGroup>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Drawer open={show} onClose={close}>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group>
            <Form.Label>Treść komunikatu</Form.Label>
            <Form.Control
              tabIndex="1"
              as="textarea"
              rows="6"
              name="body"
              ref={register({ required: true })}
              isInvalid={errors.body}
            />
          </Form.Group>
          <Button
            tabIndex="2"
            variant="primary"
            type="submit"
            className="float-right"
          >
            Zapisz
          </Button>
        </Form>
      </Drawer>
    </>
  );
}

export default Alerts;
