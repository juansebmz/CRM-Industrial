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

const Sale = () => {
  const [data, setData] = useState([]);
  const [modalActualizar, setModalActualizar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    can: "",
    total: "",
  });

  const obtenerClientes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3001/sales");
      console.log(response)
      setData(response.data.sale ?? []);
    } catch (error) {
      console.error("Error al obtener la lista de ventas:", error);
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
      await axios.put(`http://127.0.0.1:3001/sales/${dato._id}`, dato);
      cerrarModalActualizar();
      obtenerClientes();
    } catch (error) {
      console.error("Error al editar Venta:", error);
    }
  };

  const eliminar = async (dato) => {
    try {
      const opcion = window.confirm("¿Estás seguro que deseas eliminar la venta" + dato._id + "?");
      if (opcion) {
        await axios.delete(`http://127.0.0.1:3001/sales/${dato._id}`, {});
        obtenerClientes();
      }
    } catch (error) {
      console.error("Error al eliminar la venta:", error);
    }
  };

  const insertar = async () => {
    try {
      console.log(form);
      await axios({
        method: 'post',
        url: 'http://127.0.0.1:3001/sales',
        data: form
      });
      setModalInsertar(false);
      obtenerClientes();
    } catch (error) {
      console.error("Error al insertar la venta:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    
    
    if (name === "price" || name === "can") {
      const price = parseFloat(updatedForm.price) || 0;
      const can = parseFloat(updatedForm.can) || 0;
      updatedForm.total = (price * can).toFixed(2);
    }

    setForm(updatedForm);
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
                  <th style={{ backgroundColor: '#B4D2DC' }}>Precio</th>
                  <th style={{ backgroundColor: '#B4D2DC' }}>Cantidad</th>
                  <th style={{ backgroundColor: '#B4D2DC' }}>Total</th>
                  <th>
                    <Button style={{ backgroundColor: '#015B8E', width: 170, color: '#FFFFFF' }} onClick={mostrarModalInsertar}>Añadir Venta</Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 && data.map((dato) => (
                  <tr key={dato.id}>
                    <td className="List">{dato.name}</td>
                    <td className="List">{dato.price}</td>
                    <td className="List">{dato.can}</td>
                    <td className="List">{dato.total}</td>
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
                  <label>Precio:</label>
                  <input className="form-control" style={{ backgroundColor: '#CDDEE5' }} name="price" type="text" onChange={handleChange} value={form.price} />
                </FormGroup>
                <FormGroup>
                  <label>Cantidad:</label>
                  <input className="form-control" style={{ backgroundColor: '#CDDEE5' }} name="can" type="text" onChange={handleChange} value={form.can} />
                </FormGroup>
                <FormGroup>
                  <label>Total:</label>
                  <input className="form-control" style={{ backgroundColor: '#CDDEE5' }} name="total" type="text" value={form.total} readOnly />
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
                <div><h3>Insertar Venta</h3></div>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <label>Nombre:</label>
                  <input className="form-control" style={{ backgroundColor: '#CDDEE5' }} name="name" type="text" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <label>Precio:</label>
                  <input className="form-control" style={{ backgroundColor: '#CDDEE5' }} name="price" type="text" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <label>Cantidad:</label>
                  <input className="form-control" style={{ backgroundColor: '#CDDEE5' }} name="can" type="text" onChange={handleChange} />
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

export default Sale;
