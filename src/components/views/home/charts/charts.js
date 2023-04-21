import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import randomColor from "randomcolor";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

const Charts = ({ statSurvey }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const data = (responseType, index) => {
    switch (responseType) {
      case "Booleana":
        var data = [
          statSurvey.surveyAnswerList[index].filter((x) => x == "Si").length,
          statSurvey.surveyAnswerList[index].filter((x) => x == "No").length,
        ];
        break;
      case "Cualitativa":
        var data = [
          statSurvey.surveyAnswerList[index].filter((x) => x == "Malo").length,
          statSurvey.surveyAnswerList[index].filter((x) => x == "Regular")
            .length,
          statSurvey.surveyAnswerList[index].filter((x) => x == "Bueno").length,
          statSurvey.surveyAnswerList[index].filter((x) => x == "Muy Bueno")
            .length,
          statSurvey.surveyAnswerList[index].filter((x) => x == "Excelente")
            .length,
        ];
        break;
      case "Numerica":
        var data = [
          statSurvey.surveyAnswerList[index].filter((x) => x == "1").length,
          statSurvey.surveyAnswerList[index].filter((x) => x == "2").length,
          statSurvey.surveyAnswerList[index].filter((x) => x == "3").length,
          statSurvey.surveyAnswerList[index].filter((x) => x == "4").length,
          statSurvey.surveyAnswerList[index].filter((x) => x == "5").length,
          statSurvey.surveyAnswerList[index].filter((x) => x == "6").length,
          statSurvey.surveyAnswerList[index].filter((x) => x == "7").length,
          statSurvey.surveyAnswerList[index].filter((x) => x == "8").length,
          statSurvey.surveyAnswerList[index].filter((x) => x == "9").length,
          statSurvey.surveyAnswerList[index].filter((x) => x == "10").length,
        ];
        break;
    }
    return data;
  };

  const labels = (item) => {
    switch (item) {
      case "Booleana":
        return ["Si", "No"];
      case "Numerica":
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      case "Cualitativa":
        return ["Malo", "Regular", "Bueno", "Muy Bueno", "Excelente"];
      default:
        return [];
    }
  };

  return (
    <Container className="text-light">
      <Link to="/survey/table" className="m-5 text-decoration-none text-center">
        <Button variant="outline-light">Volver </Button>
      </Link>
      {statSurvey.surveyAnswerList.length !== 0 ? (
        <div className="text-center">
          <h2 className="mb-5">Nombre de encuesta : {statSurvey.surveyName}</h2>
          <h3 className="my-5">Categoría : {statSurvey.category}</h3>
          <hr></hr>
          <div className="row">
            {statSurvey.surveyItemList.map((item, index) => {
              let misoptions = {
                responsive: true,
                animation: true,
                borderWidth: 3,
                borderColor: "rgba(54, 162, 235,0.9)",
                borderRadius: 5,
                borderSkipped: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    stacked: false,
                    visible: false,
                    min: 0,
                    max: Math.max(...data(item.responseType, index)),
                    ticks: { color: "rgba(255, 255, 255)" },
                  },
                  x: {
                    ticks: { color: "rgba(255, 255, 255)" },
                  },
                },
              };
              let mydata = {
                labels: labels(item.responseType),
                datasets: [
                  {
                    data: data(item.responseType, index),
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                  },
                ],
              };

              return (
                <div className=" my-4 col-lg-4 col-sm-12 col-md-6">
                  <p>
                    {index + 1} . {item.question}
                  </p>

                  <Bar data={mydata} options={misoptions} />
                </div>
              );
            })}
          </div>
          <hr></hr>
          <p>
            Gráficos realizados sobre un total de{" "}
            {statSurvey.surveyAnswerList[0].length} personas encuestadas
          </p>
        </div>
      ) : (
        <div className=" text-center">
          <h2>Sin datos para mostrar</h2>
          <hr></hr>
        </div>
      )}
    </Container>
  );
};

export default Charts;
