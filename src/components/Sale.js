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
  { id: 1, name: "Andres", lastname: "Rodriguez", correo: "andres12@gmail.com", telefono: "3053867421" },
  { id: 2, name: "Camilo", lastname: "Sanchez", correo: "Camilo12342@gmail.com", telefono: "3208691424" },
  { id: 3, name: "Julian", lastname: "Zapata", correo: "JulianC2560@gmail.com", telefono: "3053564280" },
  { id: 4, name: "Mariana", lastname: "Moncada", correo: "MarianaMoncada1995@gmail.com", telefono: "3148694270" },
  { id: 5, name: "Carlos", lastname: "Cabrera", correo: "CarlosCabrera1014@gmail.com", telefono: "3057561230" },
  { id: 6, name: "esneider", lastname: "Bravo", correo: "Eneider781216@gmail.com", telefono: "3225567548" },
];



class Sale extends React.Component {


  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      name: "",
      lastname: "",
      correo: "",
      telefono: ""

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
        arreglo[contador].name = dato.name;
        arreglo[contador].correo = dato.correo;
        arreglo[contador].telefono = dato.telefono;
        arreglo[contador].lastname = dato.lastname;
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
                    <th style={{ backgroundColor: '#B4D2DC' }}>nombre</th>
                    <th style={{ backgroundColor: '#B4D2DC' }}>correo</th>
                    <th style={{ backgroundColor: '#B4D2DC' }}>telefono</th>

                    <Button style={{ backgroundColor: '#015B8E', width: 170, color: '#FFFFFF' }} onClick={() => this.mostrarModalInsertar()}>Añadir cliente</Button>
                  </tr>
                </thead>

                <tbody>
                  {this.state.data.map((dato) => (
                    <tr key={dato.id}>
                      <td className="List">{dato.name}</td>
                      <td className="List">{dato.correo}</td>
                      <td className="List">{dato.telefono}</td>
                      <td>
                        <Button
                          style={{ width: 80 }}
                          color="primary"
                          onClick={() => this.mostrarModalActualizar(dato)}
                        >
                          Editar
                        </Button>{" "}
                        <Button style={{ width: 80 }} color="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
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
                      name:
                    </label>
                    <input
                      className="form-control"
                      style={{ backgroundColor: '#CDDEE5' }}
                      name="nombre"
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.form.name}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>
                      lastname:
                    </label>
                    <input
                      className="form-control"
                      style={{ backgroundColor: '#CDDEE5' }}
                      name="lastname"
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.form.lastname}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>
                      correo:
                    </label>
                    <input
                      className="form-control"
                      style={{ backgroundColor: '#CDDEE5' }}
                      name="correo"
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.form.correo}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>
                      telefono:
                    </label>
                    <input
                      className="form-control"
                      style={{ backgroundColor: '#CDDEE5' }}
                      name="telefono"
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.form.telefono}
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
                    backgroundColor="black"
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
                  <div><h3>Insertar Cliente</h3></div>
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
                      name:
                    </label>
                    <input
                      className="form-control"
                      style={{ backgroundColor: '#CDDEE5' }}
                      name="name"
                      type="text"
                      onChange={this.handleChange}
                    />
                  </FormGroup>


                  <FormGroup>
                    <label>
                      lastname:
                    </label>
                    <input
                      className="form-control"
                      style={{ backgroundColor: '#CDDEE5' }}
                      name="lastname"
                      type="text"
                      onChange={this.handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>
                      correo:
                    </label>
                    <input
                      className="form-control"
                      style={{ backgroundColor: '#CDDEE5' }}
                      name="correo"
                      type="text"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>
                      telefono:
                    </label>
                    <input
                      className="form-control"
                      style={{ backgroundColor: '#CDDEE5' }}
                      name="telefono"
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

export default Sale;