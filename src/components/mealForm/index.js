import { formatISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setMeal } from "../../modules/meals/actions";
import { client } from "../../utils/api";

const MealForm = ({ className, ...props }) => {
  const { onSuccess } = props;
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.panel.categories);

  useEffect(() => {
    reset(props.meal);
  }, [reset, props.meal]);

  const onSubmit = async ({ name, category_id, price }) => {
    setLoading(true);

    let response;
    if (props.meal && props.meal.id) {
      response = await client(`meal/${props.meal.id}`, {
        method: "PATCH",
        body: { name, category_id, price },
      });
    } else {
      response = await client("meal", {
        method: "POST",
        body: {
          name,
          price,
          category_id: category_id || null,
          date: props.date
            ? formatISO(props.date, { representation: "date" })
            : null,
        },
      });
    }

    dispatch(setMeal(response));
    setLoading(false);
    onSuccess && onSuccess();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...{ className }}>
      <FormGroup>
        <Form.Label>Nazwa</Form.Label>
        <Form.Control
          type="text"
          placeholder="Pierś z kurczaka w sosie własnym 👨‍🍳"
          name="name"
          ref={register({ required: true })}
          isInvalid={errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name && "Pole wymagane"}
        </Form.Control.Feedback>
      </FormGroup>
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label>Kategoria</Form.Label>
        <Form.Control as="select" name="category_id" ref={register()}>
          <option value="">Bez kategorii</option>
          {Object.values(categories).map((category, i) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formPrice">
        <Form.Label>Cena</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="price"
          ref={register({ required: "Cena jest wymagana" })}
          isInvalid={errors.price}
          placeholder="np. 10,99 PLN"
        />
        <Form.Control.Feedback type="invalid">
          {errors.price && errors.price.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="outline-primary" disabled={loading}>
        Zapisz
        {loading && (
          <Spinner
            className="ml-1"
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
      </Button>
    </Form>
  );
};

export default MealForm;
