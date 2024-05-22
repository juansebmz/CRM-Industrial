//customers.js
import React, { useState, useEffect } from "react";
import axios from "axios";
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

const Customers = () => {
  const [data, setData] = useState([]);
  const [modalActualizar, setModalActualizar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const obtenerClientes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3001/customers");
      setData(response.data.customer);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  const mostrarModalActualizar = (dato) => {
    setForm(dato);
    setModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const editar = async (dato) => {
    try {
      await axios.put(`http://127.0.0.1:3001/customers/${dato._id}`, dato);
      cerrarModalActualizar();
      obtenerClientes();
    } catch (error) {
      console.error("Error al editar cliente:", error);
    }
  };
  //eliminar cliente
const eliminar = async (dato) => {
  try {
    const opcion = window.confirm("¿Estás seguro que deseas eliminar el cliente " + dato._id + "?");
    if (opcion) {
      await axios.delete(`http://127.0.0.1:3001/customers/${dato._id}`,{});
      obtenerClientes();
    }
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
  }
};

  const insertar = async () => {
    try {
      console.log(form)
     await axios({
        method: 'post',
        url: 'http://127.0.0.1:3001/customers',
        data: form
      });
      setModalInsertar(false);
      obtenerClientes();
    } catch (error) {
      console.error("Error al insertar cliente:", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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
                  <th style={{ backgroundColor: '#B4D2DC' }}>Nombre</th>
                  <th style={{ backgroundColor: '#B4D2DC' }}>Correo</th>
                  <th style={{ backgroundColor: '#B4D2DC' }}>Teléfono</th>
                  <th>
                    <Button style={{ backgroundColor: '#015B8E', width: 170, color: '#FFFFFF' }} onClick={mostrarModalInsertar}>Añadir cliente</Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 && data.map((dato) => (
                  <tr key={dato.id}>
                    <td className="List">{dato.name}</td>
                    <td className="List">{dato.email}</td>
                    <td className="List">{dato.phone}</td>
                    <td>
                      <Button style={{ width: 80 }} color="primary" onClick={() => mostrarModalActualizar(dato)}>Editar</Button>{" "}
                      <Button style={{ width: 80 }} color="danger" onClick={() => eliminar(dato)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          <Modal isOpen={modalActualizar}>
            <div style={{ margin: 50 }}>
              <ModalHeader>
                <div><h3>Editar Registro</h3></div>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <label>Nombre:</label>
                  <input className="form-control" style={{ backgroundColor: '#CDDEE5' }} name="name" type="text" onChange={handleChange} value={form.name} />
                </FormGroup>
                <FormGroup>
                  <label>Apellido:</label>
                  <input className="form-control" style={{ backgroundColor: '#CDDEE5' }} name="lastName" type="text" onChange={handleChange} value={form.lastName} />
                </FormGroup>
                <FormGroup>
                  <label>Correo:</label>
                  <input className="form-control" style={{ backgroundColor: '#CDDEE5' }} name="email" type="text" onChange={handleChange} value={form.email} />
                </FormGroup>
                <FormGroup>
                  <label>Teléfono:</label>
                  <input className="form-control" style={{ backgroundColor: '#CDDEE5' }} name="phone" type="text" onChange={handleChange} value={form.phone} />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => editar(form)}>Editar</Button>
                <Button backgroundColor="black" onClick={cerrarModalActualizar}>Cancelar</Button>
              </ModalFooter>
            </div>
          </Modal>
          <Modal isOpen={modalInsertar}>
            <div style={{ margin: 50 }}>
              <ModalHeader >
                <div><h3>Insertar Cliente</h3></div>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <label>Nombre:</label>
                  <input className="form-control" style={{ backgroundColor: '#CDDEE5' }} name="name" type="text" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <label>Apellido:</label>
                  <input className="form-control" style={{ backgroundColor: '#CDDEE5' }} name="lastName" type="text" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <label>Correo:</label>
                  <input className="form-control" style={{ backgroundColor: '#CDDEE5' }} name="email" type="text" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <label>Teléfono:</label>
                  <input className="form-control" style={{ backgroundColor: '#CDDEE5' }} name="phone" type="text" onChange={handleChange} />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={insertar}>Insertar</Button>
                <Button className="btn btn-danger" onClick={cerrarModalInsertar}>Cancelar</Button>
              </ModalFooter>
            </div>
          </Modal>
        </Root>
      </div>
    </>
  );
};

export default Customers;