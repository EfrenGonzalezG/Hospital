import React from "react";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


const HeaderComponent = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="http://localhost:3000">Hospital Hidalgo</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavDropdown title="Pacientes" id="collasible-nav-dropdown">
          <NavDropdown.Item href="http://localhost:3000/paciente/">Lista</NavDropdown.Item>
          <NavDropdown.Item href="http://localhost:3000/paciente/agregar">Nuevo</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
export default HeaderComponent;