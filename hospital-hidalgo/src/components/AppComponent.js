import React, { Component } from 'react';

import HeaderComponent from './HeaderComponent';
import Main from './Main';

/* Componente principal cargado por la app
HeaderComponent -> Navbar
Main -> Contenido
Footer -> Por agregar
*/

class AppComponent extends Component {
  render() {
    return (
      <div>
          <HeaderComponent></HeaderComponent>
          <Main></Main>
      </div>
    );
  }
}

export default AppComponent;