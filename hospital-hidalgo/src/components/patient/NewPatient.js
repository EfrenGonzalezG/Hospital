import React, { Component } from 'react';

import { Col, Form, Button, Jumbotron, Container, Alert } from "react-bootstrap";
import url from "../../constans";

class NewPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert_message: '',
            alert_type: '',
            //Form data
            first_name: '',
            last_name: '',
            file: '',
            curp: '',
            birthdate: '',
            sex: 'male',
            address: '',
            floor: '',
            bed: '',
            diagnostic: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit(event) {
        fetch(url['patients'], {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
              'Content-Type': 'application/json'
            }
        });
        this.setState({
            alert_message: "Usuario Agregado Exitosamente",
            alert_type: "success",
        });
        event.preventDefault();
    }
  
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
                            Agregar Paciente
                        </Button>
                    </Form>
                    <br></br>
                    <Alert variant={this.state.alert_type}>{this.state.alert_message}</Alert>
                </Container>
            </Jumbotron>
        );
    }
}

export default NewPatient;