import React from "react";
import { FormControl, Form } from "react-bootstrap";

const AnswerItem = ({ type, onChange }) => {
  switch (type) {
    case "Texto Libre":
      return (
        <Form className="my-2">
          <FormControl as="textarea" required maxlength="500" rows={3} />
        </Form>)
    case "Numerica":
        return (
            <Form required className="text-light my-2">
              <Form.Check inline label="0" name="group1" type="radio" />
              <Form.Check inline label="1" name="group1" type="radio" />
              <Form.Check inline label="2" name="group1" type="radio" />
              <Form.Check inline label="3" name="group1" type="radio" />
              <Form.Check inline label="4" name="group1" type="radio" />
              <Form.Check inline label="5" name="group1" type="radio" />
              <Form.Check inline label="6" name="group1" type="radio" />
              <Form.Check inline label="7" name="group1" type="radio" />
              <Form.Check inline label="8" name="group1" type="radio" />
              <Form.Check inline label="9" name="group1" type="radio" />
              <Form.Check inline label="10" name="group1" type="radio" />
            </Form>
          );
    case "Cualitativa":
      return (
        <Form required className="my-2 text-light">
          <Form.Check inline label="Malo" name="group1" type="radio" />
          <Form.Check inline label="Regular" name="group1" type="radio" />
          <Form.Check inline label="Bueno" name="group1" type="radio" />
          <Form.Check inline label="Muy Bueno" name="group1" type="radio" />
          <Form.Check inline label="Excelente" name="group1" type="radio" />
        </Form>
      );
    case "Booleana":
      return (
        <Form required className="my-2 text-light">
          <Form.Check inline label="Si" name="group1" type="radio" />
          <Form.Check inline label="No" name="group1" type="radio" />
        </Form>
      );
  }
};

export default AnswerItem;
