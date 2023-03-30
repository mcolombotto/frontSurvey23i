import React from 'react';
import { FormControl } from 'react-bootstrap';

const AnswerItem = (props) => {

    switch(props.type){
    case "text" : return (<FormControl as="textarea" rows={1} /> );
    case "number" : return (<div>Texto Libre </div> );
    case "word" : return (<div>Texto Libre </div> );

}
return (

    <div>
        
    </div>
);


};

export default AnswerItem;