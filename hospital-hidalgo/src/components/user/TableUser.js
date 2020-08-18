import React, { Component } from 'react';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import url from '../../constans/url';
import global_role from '../../constans/rol';

class TableUser extends Component {

    constructor() {
        super();
        this.state = {
            load: 0,
        }
    }

    /*
    Para cada usuario se buscar en userRoles todas las relaciones en userRoles, se agregan luego a role{} usando los global_role como id
    Se puede obtimizar agregando a la api la opción get userRoleByUserId
    */
    getUsers = async() => {
        await fetch(url['users']).then( resolve => {
            return resolve.json();
        }).then(async data => {
            //Se genera una lista de usuarios
            var users  = [];
            for (var user in data){
                var role = {}
                //Se genera una lista de roles todos asignados en 0
                for (var _role in global_role){
                    role[global_role[_role]] = 0;
                }
                //Se buscan todos los userRoles que tengan el mismo id de user
                await fetch(url['userRoles']).then( resolve_user_role => {
                    return resolve_user_role.json();
                }).then(data_user_role =>{
                    for (var user_role in data_user_role){
                        if (data_user_role[user_role].user === data[user].id){
                            role[global_role[data_user_role[user_role].role]] = 1;
                        }
                    }
                });
                //Se crea el objeto data_user
                var data_user = {
                    id: data[user].id,
                    username: data[user].username,
                    first_name: data[user].first_name,
                    last_name: data[user].last_name,                    
                }
                //Se agregan los roles a data_user
                for (_role in global_role){
                    data_user[global_role[_role]] = role[global_role[_role]];
                }
                //data_user se inserta en users
                users.push(data_user);
            }
            this.setState({
                users: users,
                load: 1,
            })
            return data;
        });
    }


    //Elimina un usuario por id
    delete = (id) => {
        fetch(url['users'] + id , {method: 'delete'}).then( resolve => {
            this.setState({
                load: 0,
            })
        });
        /*Elimina todas las relaciones en userRoles,
        Se puede obtimizar agregando a la api la opcion de get userRolesByUserId
        */
        fetch(url['userRoles']).then( resolve_user_role => {
            return resolve_user_role.json();
        }).then(data_user_role =>{
            for (var user_role in data_user_role){
                if (data_user_role[user_role].user === id){
                    fetch(url['userRoles'] + data_user_role[user_role].id , {method: 'delete'}).then( resolve => {});
                }
            }
        });
    }

    format_role = (cell, row) => {
        return cell === 1 ? " " : "✗";
    }

    edit_button = (cell, row) => {
        return <Button variant="primary" block href={"http://localhost:3000/user/editar/" + cell}>Editar</Button>;
    }

    delete_button = (cell, row) => {
        return  <Button variant="danger" block onClick={this.delete.bind(this, cell)}>Eliminar</Button>;
    }


    //Ver patient/TablePatient.js como ejemplo
    render() {
        const {load, users} = this.state;
        if (load === 0) this.getUsers();
        return (
            <Jumbotron>
                <Container>
                    <BootstrapTable data={users} pagination striped hover search>
                        <TableHeaderColumn          dataField='username'    dataSort={ true }>                                      Usuario</TableHeaderColumn>
                        <TableHeaderColumn          dataField='first_name'  dataSort={ true }>                                      Nombres</TableHeaderColumn>
                        <TableHeaderColumn          dataField='last_name'   dataSort={ true }>                                      Apellidos</TableHeaderColumn>
                        <TableHeaderColumn          dataField='admin'       dataSort={ true }   dataFormat={this.format_role}>      Administrador</TableHeaderColumn>
                        <TableHeaderColumn          dataField='reception'   dataSort={ true }   dataFormat={this.format_role}>      Recepcion</TableHeaderColumn>
                        <TableHeaderColumn          dataField='medic'       dataSort={ true }   dataFormat={this.format_role}>      Médico</TableHeaderColumn>
                        <TableHeaderColumn          dataField='service'     dataSort={ true }   dataFormat={this.format_role}>      J de Servicio</TableHeaderColumn>
                        <TableHeaderColumn          dataField='healt'       dataSort={ true }   dataFormat={this.format_role}>      R Sanitario</TableHeaderColumn>
                        <TableHeaderColumn          dataField='bar'         dataSort={ true }   dataFormat={this.format_role}>      Mostrador</TableHeaderColumn>
                        <TableHeaderColumn isKey    dataField='id'                              dataFormat={this.edit_button}>      Editar</TableHeaderColumn>
                        <TableHeaderColumn          dataField='id'                              dataFormat={this.delete_button}>    Eliminar</TableHeaderColumn>
                    </BootstrapTable>
                </Container>
            </Jumbotron>
        );
    }
};

export default TableUser;