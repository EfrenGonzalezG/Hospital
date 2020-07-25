import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import TablePatient from './patient/TablePatient';
import NewPatient from './patient/NewPatient';
import EditPatient from './patient/EditPatient';

import 'bootstrap/dist/css/bootstrap.min.css';

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/paciente/" component={TablePatient}/>
          <Route exact path="/paciente/agregar" component={NewPatient}/>
          <Route path="/paciente/editar/:id" component={EditPatient}/>
        </Switch>
      </div>
    );
  }
}

export default Main;