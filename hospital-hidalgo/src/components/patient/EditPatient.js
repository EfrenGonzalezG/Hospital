import React, { Component } from 'react';

import { Col, Form, Button, Jumbotron, Container, Alert } from "react-bootstrap";
import url from "../../constans/url";

class EditPatient extends Component {
    constructor(props) {
        super(props);
        //Se obtiene el valor de id en la url
        const id = this.props.match.params.id;
        this.state = {
            //Campos para mostrar mensajes de error o de exito
            alert_message: '',
            alert_type: '',
        };
        /*Carga los datos del paciente en state
        Falta gestionar que el usuario exista o no en la db
        */
        fetch(url['patients'] + id).then( resolve => {
            return resolve.json();
        }).then(data => {
            this.setState({
                alert_message: '',
                alert_type: '',
                //Datos de los pacientes en la db
                id: id,
                first_name: data.first_name,
                last_name: data.last_name,
                file: data.file,
                curp: data.curp,
                birthdate: data.birthdate === null ? '' : data.birthdate.substring(0,10), //Si el usuario tiene fecha de nacimiento, solo se carga una substring
                sex: data.sex,
                address: data.address,
                floor: data.floor,
                bed: data.bed,
                diagnostic: data.diagnostic,
            });
            return data;
        });
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Cambia los valores de state según el campo que se modifique
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    /*
    Hace un PUT a la api para editar un usuario
    Es necesario verificar el retorno de la api de la funcion PUT, en caso de error se puede modificar alert_message y alert_type
    */
    handleSubmit(event) {
        fetch(url['patients'], {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers:{
              'Content-Type': 'application/json'
            }
        });
        this.setState({
            alert_message: "Paciente Editado Exitosamente",
            alert_type: "success",
        });
        //Previene que se recarge la pagina al entrar a la función
        event.preventDefault();
    }

    /*
    Formulario para crear pacientes
    Se cargan por defecto los valores de state en cada campo, deben ser los valores dentro de la db
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
                                <Form.Label>Expediente</Form.Label>
                                <Form.Control type="text" name="file" value={this.state.file} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Curp</Form.Label>
                                <Form.Control type="text" name="curp" value={this.state.curp} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <Form.Control type="date" name="birthdate" value={this.state.birthdate} onChange={this.handleChange}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Sexo</Form.Label>
                                <Form.Control as={"select"} name="sex" value={this.state.sex} onChange={this.handleChange}>
                                    <option value='male'>Hombre</option>
                                    <option value='female'>Mujer</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control type="text" name="address" value={this.state.address} onChange={this.handleChange}>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Piso</Form.Label>
                                <Form.Control type="text" name="floor" value={this.state.floor} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Cama</Form.Label>
                                <Form.Control type="text" name="bed" value={this.state.bed} onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Diagnostico</Form.Label>
                                <Form.Control as={"textarea"} name="diagnostic" value={this.state.diagnostic} onChange={this.handleChange}>{this.state.diagnostic}</Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Button variant="success" type="submit" block>
                            Editar Paciente
                        </Button>
                    </Form>
                    <Alert variant={this.state.alert_type}>{this.state.alert_message}</Alert>
                </Container>
            </Jumbotron>
        );
    }
}

export default EditPatient;