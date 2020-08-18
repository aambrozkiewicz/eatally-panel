import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "../../components/drawer";
import MealForm from "../../components/mealForm";
import MealList from "../../components/mealList";
import { fetchCategories } from "../../modules/categories/actions";
import { deleteMeal, fetchMeals } from "../../modules/meals/actions";
import { NiceButton } from "../../styles";
import { formatDate } from "../../utils/format";

function Menu() {
  const [editing, setEditing] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const meals = useSelector((state) =>
    Object.values(state.panel.meals).filter((m) => m.date !== null)
  );

  useEffect(() => {
    date && dispatch(fetchMeals(date));
  }, [date, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function destroy(meal) {
    dispatch(deleteMeal(meal));
  }

  function edit(meal) {
    setEditing(meal);
    setShowDrawer(true);
  }

  function close() {
    setEditing(false);
    setShowDrawer(false);
  }

  return (
    <>
      <div className="bg-white border-bottom py-4 mb-4">
        <Container>
          <Row className="justify-content-center">
            <Col
              lg="7"
              className="d-flex justify-content-between align-items-center"
            >
              <h2 style={{ margin: 0 }}>
                Menu na {formatDate(date, "iiii, d MMM")}
              </h2>
              <div style={{ whiteSpace: "nowrap" }}>
                <div className="d-inline-block">
                  <DatePicker
                    customInput={
                      <NiceButton className="bg-white text-dark">
                        Zmień
                      </NiceButton>
                    }
                    popperPlacement="bottom-end"
                    onChange={setDate}
                  />
                </div>
                <NiceButton
                  className="ml-2"
                  onClick={() => setShowDrawer(true)}
                >
                  Dodaj
                </NiceButton>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col md="7">
            <MealList
              meals={meals}
              onEdit={(meal) => {
                edit(meal);
              }}
              onDelete={destroy}
            />
          </Col>
        </Row>
      </Container>
      <Drawer open={showDrawer} onClose={close}>
        {editing ? (
          <>
            <h3>Edycja</h3>
            <MealForm
              className="pt-2"
              meal={editing}
              onSuccess={close}
            ></MealForm>
          </>
        ) : (
          <div>
            <h3>Nowa pozycja</h3>
            <MealForm className="pt-2" date={date} onSuccess={close}></MealForm>
          </div>
        )}
      </Drawer>
    </>
  );
}

export default Menu;
