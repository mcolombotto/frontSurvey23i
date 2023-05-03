import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { BsTelephoneFill } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-style p-3 w-100 bg-gradient text-second">
      <Navbar variant="dark">
        <Container>
          <div className="row w-100 d-flex justify-content-center m-auto text-center">
            <Navbar.Brand className="col-sm-12 col-lg-2  d-flex mb-3">
                <div className="m-auto">
                    <Logo />
                </div>
            </Navbar.Brand>
            <Nav className="row d-flex justify-content-center col-12">
              <div className="row justify-content-around mb-3">
                <Link
                  className="nav-link col-2"
                  to="https://www.twitter.com/"
                  target="_blank"
                >
                  <BsTwitter style={{ fontSize: "30px" }} />
                </Link>
                <Link
                  className="nav-link col-2"
                  to="https://www.instagram.com/"
                  target="_blank"
                >
                  <AiFillInstagram style={{ fontSize: "30px" }} />
                </Link>
                <Link
                  className="nav-link col-2"
                  to="https://www.facebook.com/"
                  target="_blank"
                >
                  <BsFacebook style={{ fontSize: "30px" }} />
                </Link>
                <Link
                  className="nav-link col-2"
                  to="https://discord.com/"
                  target="_blank"
                >
                  <BsDiscord style={{ fontSize: "30px" }} />
                </Link>
              </div>
              <div className="row text-center text-secondary">
                <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                  <h5 className="p-1">WorldSurveys</h5>
                  <Link className="nav-link" to="/error">
                    Términos
                  </Link>
                  <Link className="nav-link" to="/error">
                    {" "}
                    Política de privacidad / GDPR
                  </Link>
                  <Link className="nav-link" to="/error">
                    Créditos
                  </Link>
                  <Link className="nav-link" to="/error">
                    Blog
                  </Link>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                  <h5 className="p-1">Enlaces útiles</h5>
                  <Link className="nav-link" to="/error">
                    Cómo funciona
                  </Link>
                  <Link className="nav-link" to="/error">
                    Productos y precios
                  </Link>
                  <Link className="nav-link" to="/error">
                    Características
                  </Link>
                  <Link className="nav-link" to="/error">
                    Ejemplos
                  </Link>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                  <h5 className="p-1">Más información</h5>
                  <Link className="nav-link" to="/us">
                    Nosotros
                  </Link>
                  <Link className="nav-link" to="/error">
                    Privacidad
                  </Link>
                  <Link className="nav-link" to="/error">
                    Condiciones generales
                  </Link>
                  <Link className="nav-link" to="/error">
                    Aviso legal
                  </Link>
                  <Link className="nav-link" to="/error">
                    Política de cookies
                  </Link>
                  <Link className="nav-link" to="/error">
                    Soporte
                  </Link>
                </div>
                <div className="d-none d-md-block col-md-6 col-lg-3">
                  <h5 className="p-1">Teléfonos de contacto</h5>
                  <Link className="nav-link" to="/error">
                    <BsTelephoneFill /> 91 564 34 18
                  </Link>
                  <p>España</p>
                  <Link className="nav-link" to="/error">
                    <BsTelephoneFill /> (55) 8421 4155
                  </Link>
                  <p>México</p>
                  <Link className="nav-link" to="/error">
                    <BsTelephoneFill /> (57) 300 929 5074
                  </Link>
                  <p>Colombia</p>
                </div>
              </div>
            </Nav>
            <div className="col-12 text-secondary mt-3">
              <p className="text-center font small ">
                &copy; 2023 WorldSurveys - Todos los derechos reservados.
              </p>
            </div>
          </div>
        </Container>
      </Navbar>
    </footer>
  );
};

export default Footer;
