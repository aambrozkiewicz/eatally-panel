import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import MealForm from "../../components/mealForm";
import MealList from "../../components/mealList";
import Drawer from "../../components/drawer";
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
      <Row className="justify-content-center">
        <Col md="7">
          <div className="d-flex justify-content-between">
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
              <NiceButton className="ml-2" onClick={() => setShowDrawer(true)}>
                Dodaj
              </NiceButton>
            </div>
          </div>
          <hr />
          <MealList
            meals={meals}
            onEdit={(meal) => {
              edit(meal);
            }}
            onDelete={destroy}
          />
        </Col>
      </Row>
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
