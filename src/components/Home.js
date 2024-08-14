import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
  return (
    <div className="container centered-content">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/image1.png" 
            alt="Imagen 1"
          />
          <div className="carousel-text">
            <h3>Primera Imagen</h3>
            <p>Paquete de 2 organizadores y almacenamiento para debajo del fregadero, organizador deslizante de 2 niveles con...</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/image2.png"
            alt="Imagen 2"
          />
          <div className="carousel-text">
            <h3>Segunda Imagen</h3>
            <p>Paquete de 2 organizadores y almacenamiento para debajo del fregadero, organizador deslizante de 2 niveles con...</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/image3.png"
            alt="Imagen 3"
          />
          <div className="carousel-text">
            <h3>Tercera Imagen</h3>
            <p>Paquete de 2 organizadores y almacenamiento para debajo del fregadero, organizador deslizante de 2 niveles con...</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/image4.png"
            alt="Imagen 4"
          />
          <div className="carousel-text">
            <h3>Cuarta Imagen</h3>
            <p>Paquete de 2 organizadores y almacenamiento para debajo del fregadero, organizador deslizante de 2 niveles con...</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/image5.png"
            alt="Imagen 5"
          />
          <div className="carousel-text">
            <h3>Quinta Imagen</h3>
            <p>Paquete de 2 organizadores y almacenamiento para debajo del fregadero, organizador deslizante de 2 niveles con...</p>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Home;
