import React, { Component } from 'react';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import url from '../../constans/url';


class TablePatient extends Component {

    constructor() {
        super();
        this.state = {
            load: 0,
        }
    }

    /*Obtiene una lista de todos los pacientes, la almacena en state.data y una vez almacenada cambia load a 1 indicando que la lista ha sido cargada*/
    getPatients = () => {
        fetch(url['patients']).then( resolve => {
            return resolve.json();
        }).then(data => {
            this.setState({
                patients: data,
                load: 1,
            })
            return data;
        });
    }

    /*Elimina un paciente por id, cambia load a 0 para que la lista vuelva a ser cargada*/
    delete = (id) => {
        fetch(url['patients'] + id , {method: 'delete'}).then( resolve => {
            this.setState({
                load: 0,
            })
        });
    }

    /*Formato de celda para mostrar fecha*/
    format_birthdate = (cell, row) => {
        return cell === null ? cell : cell.substring(0,10);
    }

    /*Formato de celda para mostrar sexo*/
    format_sex = (cell, row) => {
        return cell === 'male' ? 'Hombre' : 'Mujer';
    }

    /*Formato de celda para los botones editar,
    es necesario cambiar la url por una constante*/
    edit_button = (cell, row) => {
        return <Button variant="primary" block href={"http://localhost:3000/paciente/editar/" + cell}>Editar</Button>;
    }

    /*Formato de celda para eliminar paciente*/
    delete_button = (cell, row) => {
        return  <Button variant="danger" block onClick={this.delete.bind(this, cell)}>Eliminar</Button>;
    }

    render() {
        const {load, patients} = this.state;
        /*Carga la base de datos si load es 0*/
        if (load === 0) this.getPatients();
        /*Regresa un tabla con paginación, con la opción de ordenar y buscar,
        siempre debe existir una columna con la propiedad isKey, dataSort es para permitir ordenar según un campo,
        sin dataFormat se carga la información exacta que tiene el dataField de la columna, cell es la información del dataField para una sola celda
        */
        return (
            <Jumbotron>
                <Container>
                    <BootstrapTable data={patients} pagination striped hover search>
                        <TableHeaderColumn          dataField='first_name'  dataSort={ true }>                                      Nombres</TableHeaderColumn>
                        <TableHeaderColumn          dataField='last_name'   dataSort={ true }>                                      Apellidos</TableHeaderColumn>
                        <TableHeaderColumn          dataField='birthdate'   dataSort={ true }   dataFormat={this.format_birthdate}> Fecha de nacimiento</TableHeaderColumn>
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