import React from "react";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


/*Contiene el navbar que cargaran todas las paginas

Cosas por hacer:
-- Cambiar la url por constantes
-- Agregar todas las paginas
-- Crear el navbar de forma dinamica para que muestre según los permisos del usuario
*/

const HeaderComponent = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="http://localhost:3000">Hospital Hidalgo</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        {/* Ejemplo sencillo de navbar dinamico: si se cambia la condición de abajo no se cargaran las opciones de pacientes*/
        1 === 1 ?
          <NavDropdown title="Pacientes" id="collasible-nav-dropdown">
            <NavDropdown.Item href="http://localhost:3000/paciente/">Lista</NavDropdown.Item>
            <NavDropdown.Item href="http://localhost:3000/paciente/agregar">Nuevo</NavDropdown.Item>
          </NavDropdown> : ''
        }
        <NavDropdown title="Usuarios" id="collasible-nav-dropdown">
          <NavDropdown.Item href="http://localhost:3000/usuario/">Lista</NavDropdown.Item>
          <NavDropdown.Item href="http://localhost:3000/usuario/agregar">Nuevo</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
export default HeaderComponent;