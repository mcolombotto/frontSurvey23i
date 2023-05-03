import React from "react";
import { FormControl, Form } from "react-bootstrap";

const AnswerItem = ({ type, onChange }) => {
  switch (type) {
    case "Texto Libre":
      return (
        <Form className="m-3">
          <FormControl onChange={onChange} as="textarea" required maxlength="500" rows={3} />
        </Form>
      );
    case "Numerica":
      return (
        <Form onChange={onChange} required className="text-light m-3">
          <Form.Check inline value="0" label="0" name="group1" type="radio" />
          <Form.Check inline value="1" label="1" name="group1" type="radio" />
          <Form.Check inline value="2" label="2" name="group1" type="radio" />
          <Form.Check inline value="3" label="3" name="group1" type="radio" />
          <Form.Check inline value="4" label="4" name="group1" type="radio" />
          <Form.Check inline value="5" label="5" name="group1" type="radio" />
          <Form.Check inline value="6" label="6" name="group1" type="radio" />
          <Form.Check inline value="7" label="7" name="group1" type="radio" />
          <Form.Check inline value="8" label="8" name="group1" type="radio" />
          <Form.Check inline value="9" label="9" name="group1" type="radio" />
        </Form>
      );
    case "Cualitativa":
      return (
        <Form onChange={onChange} required className="m-3 text-light">
          <Form.Check inline value="Malo" label="Malo" name="group1" type="radio" />
          <Form.Check inline value="Regular" label="Regular" name="group1" type="radio" />
          <Form.Check inline value="Bueno" label="Bueno" name="group1" type="radio" />
          <Form.Check inline value="Muy Bueno" label="Muy Bueno" name="group1" type="radio" />
          <Form.Check inline value="Excelente" label="Excelente" name="group1" type="radio" />
        </Form>
      );
    case "Booleana":
      return (
        <Form required onChange={onChange} className="m-3 text-light">
          <Form.Check inline value="Si" label="Si" name="group1" type="radio" />
          <Form.Check inline value="No" label="No" name="group1" type="radio" />
        </Form>
      );
  }
};

export default AnswerItem;
