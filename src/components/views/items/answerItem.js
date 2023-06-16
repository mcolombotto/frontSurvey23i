import React from "react";
import { FormControl, Form } from "react-bootstrap";

const AnswerItem = ({ type, onChange,name }) => {
  switch (type) {
    case "Texto Libre":
      return (
        <div className="m-3">
          <FormControl name={name} onChange={onChange} as="textarea" required maxlength="500" rows={3} />
        </div>
      );
    case "Numerica":
      return (
        <div onChange={onChange} required className="text-light m-3">
          <Form.Check name={name} inline value="0" label="0"  type="radio" />
          <Form.Check name={name} inline value="1" label="1"  type="radio" />
          <Form.Check name={name} inline value="2" label="2"  type="radio" />
          <Form.Check name={name} inline value="3" label="3"  type="radio" />
          <Form.Check name={name} inline value="4" label="4"  type="radio" />
          <Form.Check name={name} inline value="5" label="5"  type="radio" />
          <Form.Check name={name} inline value="6" label="6"  type="radio" />
          <Form.Check name={name} inline value="7" label="7"  type="radio" />
          <Form.Check name={name} inline value="8" label="8"  type="radio" />
          <Form.Check name={name} inline value="9" label="9"  type="radio" />
        </div>
      );
    case "Cualitativa":
      return (
        <div onChange={onChange} required className="m-3 text-light">
          <Form.Check name={name} inline value="Malo" label="Malo"  type="radio" />
          <Form.Check name={name} inline value="Regular" label="Regular"  type="radio" />
          <Form.Check name={name} inline value="Bueno" label="Bueno"  type="radio" />
          <Form.Check name={name} inline value="Muy Bueno" label="Muy Bueno"  type="radio" />
          <Form.Check name={name} inline value="Excelente" label="Excelente"  type="radio" />
        </div>
      );
    case "Booleana":
      return (
        <div required onChange={onChange} className="m-3 text-light">
          <Form.Check name={name} inline value="Si" label="Si"  type="radio" />
          <Form.Check name={name} inline value="No" label="No"  type="radio" />
        </div>
      );
  }
};

export default AnswerItem;
