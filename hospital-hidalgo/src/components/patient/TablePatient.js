import React, { Component } from 'react';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import url from '../../constans';


class TablePatient extends Component {

    constructor() {
        super();
        this.state = {
            load: 0,
        }
    }

    getUsers = () => {
        fetch(url['patients']).then( resolve => {
            return resolve.json();
        }).then(data => {
            this.setState({
                users: data,
                load: 1,
            })
            return data;
        });
    }

    delete = (id) => {
        fetch(url['patients'] + id , {method: 'delete'}).then( resolve => {
            this.setState({
                load: 0,
            })
        });
    }

    format_birthdate = (cell, row) => {
        return cell === null ? cell : cell.substring(0,10);
    }

    format_sex = (cell, row) => {
        return cell === 'male' ? 'Hombre' : 'Mujer';
    }

    edit_button = (cell, row) => {
        return <Button variant="primary" block href={"http://localhost:3000/paciente/editar/" + cell}>Editar</Button>;
    }

    delete_button = (cell, row) => {
        return  <Button variant="danger" block onClick={this.delete.bind(this, cell)}>Eliminar</Button>;
    }

    render() {
        const {load, users} = this.state;
        if (load === 0) this.getUsers();

        return (
            <Jumbotron>
                <Container>
                    <BootstrapTable data={users} pagination striped hover search>
                        <TableHeaderColumn          dataField='first_name'  dataSort={ true }>                                      Nombres</TableHeaderColumn>
                        <TableHeaderColumn          dataField='birthdate'   dataSort={ true }   dataFormat={this.format_birthdate}> Fecha de nacimiento</TableHeaderColumn>
                        <TableHeaderColumn          dataField='last_name'   dataSort={ true }>                                      Apellidos</TableHeaderColumn>
                        <TableHeaderColumn          dataField='curp'        dataSort={ true }>                                      Curp</TableHeaderColumn>
                        <TableHeaderColumn          dataField='sex'         dataSort={ true }   dataFormat={this.format_sex}>       Sexo</TableHeaderColumn>
                        <TableHeaderColumn          dataField='address'     dataSort={ true }>                                      Dirección</TableHeaderColumn>
                        <TableHeaderColumn isKey    dataField='id'                              dataFormat={this.edit_button}>      Editar</TableHeaderColumn>
                        <TableHeaderColumn          dataField='id'                              dataFormat={this.delete_button}>    Eliminar</TableHeaderColumn>
                    </BootstrapTable>
                </Container>
            </Jumbotron>
        );
    }
};

export default TablePatient;