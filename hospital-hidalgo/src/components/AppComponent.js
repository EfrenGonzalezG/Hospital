import React, { Component } from 'react';

import HeaderComponent from './HeaderComponent';
import Main from './Main';


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