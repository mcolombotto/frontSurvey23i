import Figure from "react-bootstrap/Figure";

function surveyImage({ source }) {
  return (
    <Figure>
      <Figure.Image width={171} height={180} alt="180x180" src={source} />
    </Figure>
  );
}

export default surveyImage;
