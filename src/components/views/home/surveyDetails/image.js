import Figure from 'react-bootstrap/Figure';

function surveyImage({source}) {
  return (
    <Figure>
      <Figure.Image
        width={171}
        height={180}
        alt="180x180"
        src= {source}
      />
{/*       <Figure.Caption>
        Nulla vitae elit libero, a pharetra augue mollis interdum.
      </Figure.Caption> */}
    </Figure>
  );
}

export default surveyImage;