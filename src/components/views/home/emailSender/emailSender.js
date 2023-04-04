import { useEffect, useState } from 'react';
import axios from 'axios';

const Survey = () => {
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch('/survey.json')
      .then(response => response.json())
      .then(data => {
        const activeSurvey = data.find(survey => survey.status === true);
        setSurvey(activeSurvey);
      });
  }, []);

  const handleAnswerChange = (question, answer) => {
    const newAnswers = [...answers];
    const answerIndex = newAnswers.findIndex(a => a.question === question);
    if (answerIndex > -1) {
      newAnswers[answerIndex].answer = answer;
    } else {
      newAnswers.push({ question, answer });
    }

    console.log('New answers:', newAnswers);
    // If the question is a boolean question, set the answer to true/false
    if (question === "Recomendaría este lugar para trabajar?") {
      newAnswers[newAnswers.length - 1].answer = answer === "Si" ? "true" : "false";
    }
    setAnswers(newAnswers);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const surveyResponses = answers.map(answer => `[${answer.question}]: ${answer.answer}`).join('\n');
    const emailBody = `Survey Responses for ${survey.surveyName}\n\n${surveyResponses}`;
    axios({
      method: 'post',
      url: 'https://api.mailgun.net/v3/sandboxc0abb916a40847678bfc04dd19fb3b45.mailgun.org/messages',
      auth: {
        username: 'api',
        password: '4ee837c8e612285a12e7bff2fd45331d-81bd92f8-88017272'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        from: 'example@example.com',
        to: 'mailgunjstestreact@gmail.com',
        subject: 'Survey Response from ' + survey.surveyName,
        text: emailBody
      }
    })
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.data.message);
    })
    .catch(function(error) {
      console.log('FAILED...', error.response.status, error.response.data.message);
    });
  };

  if (!survey) {
    return <p>Loading survey...</p>;
  }

    return (
      <div>
        <h1>{survey.surveyName}</h1>
        <form onSubmit={handleSubmit}>
          {survey.surveyItemList.map(item => (
            <div key={item.question}>
              <label>{item.question}</label>
              {item.responseType === 'Booleana' && (
                <>
                    <input
                    type="radio"
                    name={item.question}
                    value="Si"
                    onChange={() => handleAnswerChange(item.question, "Si")}
                    />
                    <label>Sí</label>
                    <input
                    type="radio"
                    name={item.question}
                    value="No"
                    onChange={() => handleAnswerChange(item.question, "No")}
                    />
                    <label>No</label>
                </>
              )}
              {item.responseType === 'Numerica' && (
                <input
                  type="number"
                  name={item.question}
                  onChange={e =>
                    handleAnswerChange(item.question, parseInt(e.target.value))
                  }
                />
              )}
              {item.responseType === 'Cualitativa' && (
                <select
                  name={item.question}
                  onChange={e =>
                    handleAnswerChange(item.question, e.target.value)
                  }
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Mala">Mala</option>
                  <option value="Regular">Regular</option>
                  <option value="Buena">Buena</option>
                  <option value="Excelente">Excelente</option>
                </select>
              )}
              {item.responseType === 'Texto Libre' && (
                <textarea
                  name={item.question}
                  onChange={e =>
                    handleAnswerChange(item.question, e.target.value)
                  }
                />
              )}
            </div>
          ))}
          <button type="submit">Enviar respuestas</button>
        </form>
      </div>
    );
  };
  
  export default Survey;
  