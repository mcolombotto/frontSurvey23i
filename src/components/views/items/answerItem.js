import React from "react";
import { FormControl, Form } from "react-bootstrap";

const AnswerItem = ({ type, onChange }) => {
  switch (type) {
    case "Texto Libre":
      return (
        <Form className="my-2">
          <FormControl as="textarea" rows={2} onChange={onChange} />
        </Form>
      );
      case "Numerica":
        return (
          <Form className="my-2">
            <Form.Check inline label="0" name="group1" type="radio" value={0} onChange={onChange} />
            <Form.Check inline label="1" name="group1" type="radio" value={1} onChange={onChange} />
            <Form.Check inline label="2" name="group1" type="radio" value={2} onChange={onChange} />
            <Form.Check inline label="3" name="group1" type="radio" value={3} onChange={onChange} />
            <Form.Check inline label="4" name="group1" type="radio" value={4} onChange={onChange}/>
            <Form.Check inline label="5" name="group1" type="radio" value={5} onChange={onChange}/>
            <Form.Check inline label="6" name="group1" type="radio" value={6} onChange={onChange}/>
            <Form.Check inline label="7" name="group1" type="radio" value={7} onChange={onChange}/>
            <Form.Check inline label="8" name="group1" type="radio" value={8} onChange={onChange}/>
            <Form.Check inline label="9" name="group1" type="radio" value={9} onChange={onChange}/>
            <Form.Check inline label="10" name="group1" type="radio" value={10} onChange={onChange}/>
          </Form>
        );
      case "Cualitativa":
        return (
          <Form className="my-2">
            <Form.Check inline label="Malo" name="group1" type="radio" value="Malo" onChange={onChange} />
            <Form.Check inline label="Regular" name="group1" type="radio" value="Regular" onChange={onChange}/>
            <Form.Check inline label="Bueno" name="group1" type="radio" value="Bueno" onChange={onChange} />
            <Form.Check inline label="Muy Bueno" name="group1" type="radio" value="Muy Bueno" onChange={onChange}/>
            <Form.Check inline label="Excelente" name="group1" type="radio" value="Excelente" onChange={onChange} />
          </Form>
        );
      case "Booleana":
        return (
          <Form className="my-2">
            <Form.Check inline label="Si" name="group1" type="radio" value="Si" onChange={onChange} />
            <Form.Check inline label="No" name="group1" type="radio" value="No" onChange={onChange} />
          </Form>
        );
      default:
        return null;
    }
  };
  
  export default AnswerItem;
