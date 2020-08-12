import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { client } from "../../utils/api";

const weekdays = {
  Mon: "Poniedziałek",
  Tue: "Wtorek",
  Wed: "Środa",
  Thu: "Czwartek",
  Fri: "Piątek",
  Sat: "Sobota",
  Sun: "Niedziela",
};

function OpeningHours() {
  const { register, handleSubmit, setValue } = useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function data() {
      const response = await client("opening-hours");
      response.forEach((hour) => {
        setValue(`${hour.weekday}.from`, hour.from);
        setValue(`${hour.weekday}.to`, hour.to);
      });
    }

    data();
  }, [setValue]);

  async function submit(data) {
    setSaving(true);
    await client("opening-hours", {
      method: "POST",
      body: { hours: data },
    });
    setSaving(false);
  }

  return (
    <Row className="justify-content-center">
      <Col lg="7">
        <h2 style={{ margin: 0 }}>Godziny otwarcia</h2>
        <p>W tych godzinach będzie można zamawiać jedzenie</p>
        <hr />
        <div className="bg-white p-3 shadow-sm rounded">
          <Form onSubmit={handleSubmit(submit)}>
            {Object.entries(weekdays).map(([weekday, weekdayName], i) => (
              <Form.Group as={Row} key={i}>
                <Form.Label column>{weekdayName}</Form.Label>
                <Col>
                  <Form.Control
                    type="time"
                    ref={register()}
                    name={`${weekday}.from`}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="time"
                    ref={register()}
                    name={`${weekday}.to`}
                  />
                </Col>
              </Form.Group>
            ))}
            <div className="text-right">
              <Button type="submit" disabled={saving}>
                {saving && <Spinner animation="border" size="sm" />} Zapisz
              </Button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default OpeningHours;
