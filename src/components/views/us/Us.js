import React from "react";
import { Link } from "react-router-dom";
import imgWomen from "./../../../assets/img/us/women-office.jpg";
import imgOffice from "./../../../assets/img/us/black-man-office.jpg";
import yuliana from "../../../assets/img/us/yuliana.png";
import mariano from "../../../assets/img/us/mariano.png";
import luciano from "../../../assets/img/us/luciano.png";
import erick from "../../../assets/img/us/erick.png";
import "./Us.css";
function Us() {
  return (
    <>
      <section className="container p-2 text-center text-secondary">
        <div className="d-flex row ">
          <div className="col-md-12 col-lg-6">
            <h1 className="p-1 diplay-1">WorldSurveys</h1>
            <p className="letter-first space-letter">
              WorldSurveys es una empresa de gestión de experiencias ágil creada
              para lo que viene. Brindamos soluciones intuitivas y centradas en
              las personas que ayudan a los líderes de la industria a tomar
              decisiones importantes, actuar y lograr resultados tangibles de
              manera rápida y segura. Nuestra plataforma impulsada por IA está
              construida con un equilibrio intencionado de humanidad y
              tecnología, uniendo más de 20 años de experiencia con datos
              derivados de miles de millones de preguntas y respuestas reales.
              En la actualidad, ofrecemos soluciones empresariales para la
              gestión ágil de la experiencia y los conocimientos de nuestras
              marcas de productos.
            </p>
          </div>
          <div className="col-md-12 col-lg-6 p-2">
            <img
              src={imgOffice}
              className="w-75"
              alt="Trabajando en la oficina"
            />
          </div>
                  <div className="d-flex flex-lg-row-reverse flex-md-column">
            <div className="col-md-12 col-lg-6">
              <h1 className="p-1 diplay-1">
                Nuestras creencias y principios rectores
              </h1>
              <p className="letter-first space-letter">
                Nuestra visión, misión y valores reflejan los mejores intereses
                de nuestros clientes, empleados y comunidad. Ellos inspiran
                nuestro crecimiento. Ayudan a dar forma a nuestras decisiones
                comerciales, definen nuestra cultura y miden nuestro éxito. A
                través de nuestras elecciones, palabras y acciones, nos
                esforzamos por vivir nuestros valores todos los días.
              </p>
            </div>
            <div className="col-md-12 col-lg-6 p-2 ">
              <img
                src={imgWomen}
                className="w-75 rounded"
                alt="Trabajando en la oficina"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container-fluid">
        <div className="container">
          <div className="row text-center py-5">
            <h2 className="diplay-2 text-center text-light my-5 fst-italic">
              Conoce a algunos miembros de nuestro equipo
            </h2>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="bg-gradient bg-light bg-opacity-10 border mb-3 card-wrapper">
                <div className="text-bg-light pt-3">
                  <figure className="w-75 mx-auto  rounded contenedor-img">
                    <img
                      src={luciano}
                      className="img-fluid imagen-filter rounded"
                      alt="Luciano Dannert"
                    />
                  </figure>
                </div>
                <div className="card-body text-light pb-3">
                  <h4 className="card-title display-5">Luciano</h4>
                  <h5 className="mt-2">"Lider de equipo"</h5>
                  <Link type="button" className="btn btn-primary" to="/error">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="bg-gradient bg-light bg-opacity-10 border mb-3 card-wrapper">
                <div className="text-bg-light pt-3">
                  <figure className="w-75 mx-auto  rounded contenedor-img">
                    <img
                      src={yuliana}
                      className="img-fluid imagen-filter"
                      alt="Yuliana Mallorga"
                    />
                  </figure>
                </div>
                <div className="card-body text-light pb-3">
                  <h4 className="card-title display-5">Yuliana</h4>
                  <h5 className="mt-2">"Desarrolladora web"</h5>
                  <Link type="button" className="btn btn-primary" to="/error">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="bg-gradient bg-light bg-opacity-10 border mb-3 card-wrapper">
                <div className="text-bg-light pt-3">
                  <figure className="w-75 mx-auto  rounded contenedor-img">
                    <img
                      src={mariano}
                      className="img-fluid imagen-filter"
                      alt="Mariano Colombotto"
                    />
                  </figure>
                </div>
                <div className="card-body text-light pb-3">
                  <h4 className="card-title display-5">Mariano</h4>
                  <h5 className="mt-2">"Desarrollador web"</h5>
                  <Link type="button" className="btn btn-primary" to="/error">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="bg-gradient bg-light bg-opacity-10 border mb-3 card-wrapper">
                <div className="text-bg-light pt-3">
                  <figure className="w-75 mx-auto  rounded contenedor-img">
                    <img
                      src={erick}
                      className="img-fluid imagen-filter"
                      alt="Erick Pipke"
                    />
                  </figure>
                </div>
                <div className="card-body text-light pb-3">
                  <h4 className="card-title display-5">Erick</h4>
                  <h5 className="mt-2">"Desarrollador web"</h5>
                  <Link type="button" className="btn btn-primary" to="/error">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Us;
