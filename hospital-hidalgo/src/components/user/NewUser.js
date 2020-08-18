import React, { Component } from 'react';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Col, Form, Button, Jumbotron, Container, Alert } from "react-bootstrap";
import url from "../../constans/url";
import global_role from "../../constans/rol";

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert_message: '',
            alert_type: '',
            /*Datos de los usuarios en la db, 
            licenses aún no es funcional, se puede eliminar de esta pagina y agregar en una sección solo de medicos 
            existe un campo por cada posible rol*/
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            admin: '0',
            reception: '0',
            medic: '0',
            service: '0',
            healt: '0',
            bar: '0',
            shift: 'morning',
            salt: 'AB26F26B6B21D90114531897F3A4ACBC',
            hash: 'C2BCDCE3382372140C4E0F7517DA2D43BBE39F60C3DED98B2EDB3FB0231EB58E3F8BE82ADBD4C84813DA9A756BDE968DC4C77D23508FCB78D7ABA10CDC4D7E67',
            licenses : [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    //Cambia los valores de state según el campo que se modifique
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    //Regresa un campo de opciones que se puede modificar si el rol de medico es seleccionado, en caso contrario lo regresa deshabilitado
    ShiftForm = () => {
        if (this.state.medic === '0') return(
            <Form.Control as={"select"} name="shift" value={this.state.shift} onChange={this.handleChange} disabled>
                <option value='morning'>Mañana</option>
                <option value='afternoon'>Tarde</option>
                <option value='night'>Noche</option>
                <option value='accumulate'>Acumulado</option>
            </Form.Control>
        );
        return(
            <Form.Control as={"select"} name="shift" value={this.state.shift} onChange={this.handleChange}>
                <option value='morning'>Mañana</option>
                <option value='afternoon'>Tarde</option>
                <option value='night'>Noche</option>
                <option value='accumulate'>Acumulado</option>
            </Form.Control>
        );
    }

    //Metodo asincrono que agregar un nuevo usuario, busca el id del nuevo usuario y agrega una relacion por cada rol elegido
    async handleSubmit(event) {
        event.preventDefault();
        //Insertar usuario
        await fetch(url['users'], {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
              'Content-Type': 'application/json'
            }
        });
        //Busca ultimo usuario insertado, puede evitarse gestionando los retornos de la api
        await fetch(url['users']).then( resolve => {
            return resolve.json();
        }).then(async users => {
            var lastId = 0;
            for (var user in users){
                lastId = users[user].id > lastId ? users[user].id : lastId;
            }
            var data = {
                user: lastId,
                role: 0,
            };
            //Por cada rol seleccionado se hace un insert en la tabla de relacion userRoles
            for (var role in global_role){
                if (this.state[global_role[role]] === '1'){
                    data.role = role;
                    fetch(url['userRoles'], {method: 'POST', body: JSON.stringify(data),headers:{'Content-Type': 'application/json'}});
                }
            }
        });
        this.setState({
            alert_message: "Usuario Agregado Exitosamente",
            alert_type: "success",
        });
    }
  

    /*
    Formulario para crear usuarios
    Se cargan por defecto los valores de state en cada campo, al inicio son vacios
    Existen campos para cada posible rol
    La tabla de licenses aún no tiene funcionalidad
    Existe un campo de alerta que puede mostrar diferentes mensajes según los resultados del post
    */
    render() {
        return (
            <Jumbotron fluid>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Administrador</Form.Label>
                                <Form.Control as={"select"} name="admin" value={this.state.admin} onChange={this.handleChange}>
                                    <option value='0'>No</option>
                                    <option value='1'>Sí</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Recepción</Form.Label>
                                <Form.Control as={"select"} name="reception" value={this.state.reception} onChange={this.handleChange}>
                                    <option value='0'>No</option>
                                    <option value='1'>Sí</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Médico</Form.Label>
                                <Form.Control as={"select"} name="medic" value={this.state.medic} onChange={this.handleChange}>
                                    <option value='0'>No</option>
                                    <option value='1'>Sí</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Jefe de Servicio</Form.Label>
                                <Form.Control as={"select"} name="service" value={this.state.service} onChange={this.handleChange}>
                                    <option value='0'>No</option>
                                    <option value='1'>Sí</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Responsable Sanitario</Form.Label>
                                <Form.Control as={"select"} name="health" value={this.state.healt} onChange={this.handleChange}>
                                    <option value='0'>No</option>
                                    <option value='1'>Sí</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Mostrador</Form.Label>
                                <Form.Control as={"select"} name="bar" value={this.state.bar} onChange={this.handleChange}>
                                    <option value='0'>No</option>
                                    <option value='1'>Sí</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Horario</Form.Label>
                                <this.ShiftForm></this.ShiftForm>
                            </Form.Group>
                        </Form.Row>
                        <BootstrapTable data={this.state.licenses} striped hover options={ {noDataText: "No hay datos"} }>
                            <TableHeaderColumn isKey    dataField='username'    dataSort={ true }>                                      Grado</TableHeaderColumn>
                            <TableHeaderColumn          dataField='username'    dataSort={ true }>                                      Titulo</TableHeaderColumn>
                            <TableHeaderColumn          dataField='username'    dataSort={ true }>                                      Cédula</TableHeaderColumn>
                            <TableHeaderColumn          dataField='username'    dataSort={ true }>                                      Universidad</TableHeaderColumn>
                        </BootstrapTable>
                        <Button variant="success" type="submit" block>
                            Agregar Usuario
                        </Button>
                    </Form>
                    <br></br>
                    <Alert variant={this.state.alert_type}>{this.state.alert_message}</Alert>
                </Container>
            </Jumbotron>
        );
    }
}

export default NewUser;