import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function NavBar() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);
  const handleSelect = () => setExpanded(false);

  return (
    <Navbar className="navbar" expand="lg" expanded={expanded}>
      <Navbar.Brand as={Link} to="/" className="custom-brand">Tu Tienda en Línea</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" onClick={handleToggle} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" onClick={handleSelect}>
          <Nav.Link as={Link} to="/" className="custom-nav-link">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/products" className="custom-nav-link">Productos</Nav.Link>
          <Nav.Link as={Link} to="/cart" className="custom-nav-link">Carrito</Nav.Link>
          <Nav.Link as={Link} to="/profile" className="custom-nav-link">Perfil</Nav.Link>
          <Nav.Link as={Link} to="/login" className="custom-nav-link">Iniciar Sesión</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
