import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Brand as={Link} to="/" className="custom-brand">Tu Tienda en Línea</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/products">Productos</Nav.Link>
          <Nav.Link as={Link} to="/cart">Carrito</Nav.Link>
          <Nav.Link as={Link} to="/profile">Perfil</Nav.Link>
          <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
