import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { styled } from '@mui/material/styles';
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";
import Appbar from "./Appbar";

const Root = styled('div')(({ theme }) => ({
    '& .List': {
        backgroundColor: '#9EB9CA',
    },
}));

const data = [
    { id: 1, personaje: "Naruto", anime: "Naruto" },
    { id: 2, personaje: "Goku", anime: "Dragon Ball" },
    { id: 3, personaje: "Kenshin Himura", anime: "Rurouni Kenshin" },
    { id: 4, personaje: "Monkey D. Luffy", anime: "One Piece" },
    { id: 5, personaje: "Edward Elric", anime: "Fullmetal Alchemist: Brotherhood" },
    { id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi-Oh!" },
];



class Customers extends React.Component {


    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            id: "",
            personaje: "",
            anime: "",
        },
    };

    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });
    };

    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };

    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
        });
    };

    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.id == registro.id) {
                arreglo[contador].personaje = dato.personaje;
                arreglo[contador].anime = dato.anime;
            }
            contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
    };

    eliminar = (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
        if (opcion == true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
                if (dato.id == registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: arreglo, modalActualizar: false });
        }
    };

    insertar = () => {
        var valorNuevo = { ...this.state.form };
        valorNuevo.id = this.state.data.length + 1;
        var lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
    }

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    render() {

        return (
            <>
                <div style={{ backgroundColor: 'white' }}>
                    <Root>
                        <Appbar />
                        <Container >

                            <br />
                            <Table >
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: '#B4D2DC' }}>ID</th>
                                        <th style={{ backgroundColor: '#B4D2DC' }}>Personaje</th>
                                        <th style={{ backgroundColor: '#B4D2DC' }}>Anime</th>

                                        <Button style={{ backgroundColor: '#015B8E', width: 170, color: '#FFFFFF' }} onClick={() => this.mostrarModalInsertar()}>Añadir cliente</Button>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.data.map((dato) => (
                                        <tr key={dato.id}>
                                            <td className="List">{dato.id}</td>
                                            <td className="List">{dato.personaje}</td>
                                            <td className="List">{dato.anime}</td>
                                            <td>
                                                <Button
                                                    style={{width:80}}
                                                    color="primary"
                                                    onClick={() => this.mostrarModalActualizar(dato)}
                                                >
                                                    Editar
                                                </Button>{" "}
                                                <Button style={{width:80}} color="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Container>

                        <Modal isOpen={this.state.modalActualizar}>
                        <div style={{ margin: 50 }}>
                            <ModalHeader>
                                <div><h3>Editar Registro</h3></div>
                            </ModalHeader>

                            <ModalBody >

                                <FormGroup>
                                    <label>
                                        Id:
                                    </label>

                                    <input
                                        className="form-control"
                                        style={{ backgroundColor: '#CDDEE5' }}
                                        readOnly
                                        type="text"
                                        value={this.state.form.id}
                                        />
                                </FormGroup>

                                <FormGroup>
                                    <label>
                                        Personaje:
                                    </label>
                                    <input
                                        className="form-control"
                                        style={{ backgroundColor: '#CDDEE5' }}
                                        name="personaje"
                                        type="text"
                                        onChange={this.handleChange}
                                        value={this.state.form.personaje}
                                        />
                                </FormGroup>

                                <FormGroup>
                                    <label>
                                        Anime:
                                    </label>
                                    <input
                                        className="form-control"
                                        style={{ backgroundColor: '#CDDEE5' }}
                                        name="anime"
                                        type="text"
                                        onChange={this.handleChange}
                                        value={this.state.form.anime}
                                        />
                                </FormGroup>
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    color="primary"
                                    onClick={() => this.editar(this.state.form)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    color="danger"
                                    onClick={() => this.cerrarModalActualizar()}
                                    >
                                    Cancelar
                                </Button>
                            </ModalFooter>
                                    </div>
                        </Modal>


                        <Modal isOpen={this.state.modalInsertar}>
                            <div style={{ margin: 50 }}>
                                <ModalHeader >
                                    <div><h3>Insertar Personaje</h3></div>
                                </ModalHeader>

                                <ModalBody>
                                    <FormGroup>
                                        <label>
                                            Id:
                                        </label>

                                        <input
                                            className="form-control"
                                            style={{ backgroundColor: '#CDDEE5' }}
                                            readOnly
                                            type="text"
                                            value={this.state.data.length + 1}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <label>
                                            Personaje:
                                        </label>
                                        <input
                                            className="form-control"
                                            style={{ backgroundColor: '#CDDEE5' }}
                                            name="personaje"
                                            type="text"
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <label>
                                            Anime:
                                        </label>
                                        <input
                                            className="form-control"
                                            style={{ backgroundColor: '#CDDEE5' }}
                                            name="anime"
                                            type="text"
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </ModalBody>

                                <ModalFooter>


                                    <Button
                                        color="primary"
                                        onClick={() => this.insertar()}
                                    >
                                        Insertar
                                    </Button>
                                    <Button
                                        className="btn btn-danger"
                                        onClick={() => this.cerrarModalInsertar()}
                                    >
                                        Cancelar
                                    </Button>
                                </ModalFooter>

                            </div>
                        </Modal>
                    </Root>
                </div>
            </>
        );
    }
}

export default Customers;