import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setCatering } from "../../modules/catering/actions";
import { client } from "../../utils/api";

const Logo = styled.div`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  background: url(${(props) => props.bg});
  background-position: center center;
  background-size: cover;
  margin: 0 0 0 auto;
`;

function General() {
  const catering = useSelector((state) => state.catering);
  const [logoSrc, setLogoSrc] = useState();
  const { handleSubmit, reset, register } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    reset(catering);
    setLogoSrc(catering.logo_path);
  }, [catering, reset]);

  function logoChange(e) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoSrc(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  async function submit(data) {
    const response = await client("catering", {
      method: "PATCH",
      body: {
        b64image: logoSrc,
        ...data,
      },
    });

    dispatch(setCatering(response));
  }

  return (
    <Row className="justify-content-center">
      <Col lg="7">
        <h2 style={{ margin: 0 }}>Ustawienia ogólne</h2>
        <hr />
        <div className="bg-white p-3 shadow-sm rounded">
          <Form onSubmit={handleSubmit(submit)}>
            <Form.Group as={Row} className="align-items-center">
              <Col className="text-right" sm={5}>
                <Logo bg={logoSrc} className="border shadow" />
              </Col>
              <Col>
                <Form.File name="logo" onChange={logoChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={5} className="text-right">
                Pełna nazwa
              </Form.Label>
              <Col>
                <Form.Control type="text" name="name" ref={register()} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={5} className="text-right">
                Numer telefonu
              </Form.Label>
              <Col>
                <Form.Control type="phone" name="phone" ref={register()} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={5} className="text-right">
                E-mail kontaktowy
              </Form.Label>
              <Col>
                <Form.Control type="email" name="email" ref={register()} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={5} className="text-right">
                Pełny adres
              </Form.Label>
              <Col>
                <Form.Control type="text" name="origin" ref={register()} />
                <Form.Text muted>
                  Adres początkowy, dla którego wyliczany jest koszt dostawy.
                  Np. Nowowiejskiego 54 Poznań.
                </Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={5} className="text-right">
                E-mail do powiadomień
              </Form.Label>
              <Col>
                <Form.Control
                  type="email"
                  name="notification_email"
                  ref={register()}
                />
                <Form.Check
                  type="switch"
                  label="Aktywne"
                  className="mt-1"
                  id="notification-check"
                  name="order_notification_enabled"
                  ref={register()}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 5 }}>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="mt-2"
                >
                  Zapisz
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default General;
