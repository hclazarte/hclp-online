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
            <h3>Purificador de Aire</h3>
            <p>Potente filtración: el filtro PuroAir HEPA captura todo lo que no quieres respirar. Filtra el polvo, el polen, el humo, los compuestos orgánicos volátiles y todo lo que no quieres respirar. Se muestra que captura hasta el 99% de partículas que se encuentran...</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/image2.png"
            alt="Imagen 2"
          />
          <div className="carousel-text">
            <h3>Licuadora de Alta Potencia</h3>
            <p>Mezclador de encimera de cocina: la licuadora de grado profesional utiliza botones de 1 toque para controlar los 6 ciclos preprogramados, la opción de pulso y el control manual de 10 velocidades...</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/image3.png"
            alt="Imagen 3"
          />
          <div className="carousel-text">
            <h3>Set de Cuchillos de Cocina</h3>
            <p>Juego de cuchillos de cocina de Damasco de 18 piezas, 8 cuchillos de carne, mango ergonómico de ABS antideslizante triple remache para tenedor de carne, afilador de cuchillos y tijeras, bloque de...</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/image4.png"
            alt="Imagen 4"
          />
          <div className="carousel-text">
            <h3>Robot Aspirador</h3>
            <p>Aspirador robot con succión de 3000 Pa, ajustes de limpieza personalizados, aspiradora robótica de carga automática, refuerzo de alfombras, aplicación/Alexa/control remoto...</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/image5.png"
            alt="Imagen 5"
          />
          <div className="carousel-text">
            <h3>Funda de Almohada de Seda</h3>
            <p>Zimasilk - Funda de almohada de seda 100% morera para la salud del cabello y la piel, seda de ambos lados de 19 mommes, 1 pieza (King 20” x 36”, verde menta)...</p>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Home;
