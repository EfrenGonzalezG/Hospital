import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import TablePatient from './patient/TablePatient';
import NewPatient from './patient/NewPatient';
import EditPatient from './patient/EditPatient';
import TableUser from './user/TableUser';
import NewUser from './user/NewUser';

import 'bootstrap/dist/css/bootstrap.min.css';

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/*Switch controla el cambio entre las diferentes rutas para cada pagina, https://reactrouter.com/web/api/Route*/}
          <Route exact path="/paciente/" component={TablePatient}/>
          <Route exact path="/paciente/agregar" component={NewPatient}/>
          <Route path="/paciente/editar/:id" component={EditPatient}/>
          <Route exact path="/usuario/" component={TableUser}/>
          <Route exact path="/usuario/agregar" component={NewUser}/>
        </Switch>
      </div>
    );
  }
}

export default Main;