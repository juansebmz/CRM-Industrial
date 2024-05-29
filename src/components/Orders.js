import React, { useState } from 'react';
import AppBar from './Appbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Button } from '@mui/material';
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from 'reactstrap';
import axios from 'axios'; // Añade axios para manejar solicitudes HTTP

const titleStyle = {
  textAlign: 'left',
  fontSize: '1.8em',
  fontWeight: 'regular',
  color: '#000',
  padding: '20px 0',
  paddingLeft: '73px',
};

const products = [
  { id: '0000', name: 'Camisa Amarilla', price: 6, image: '/camisaAmarilla.jpg' },
  { id: '0001', name: 'Camisa Negra', price: 15, image: '/camisaNegra.jpg' },
  { id: '0002', name: 'Camisa Roja', price: 8, image: '/camisaRoja.jpg' },
  { id: '0003', name: 'Camisa Azul', price: 10, image: '/camisaAzul.jpg' },
  { id: '0004', name: 'Camisa Verde', price: 7, image: '/camisaVerde.jpg' },
  { id: '0005', name: 'Camisa Blanca', price: 5, image: '/camisaBlanca.jpg' },
  { id: '0006', name: 'Camisa Café', price: 15, image: '/camisaCafe.jpg' },
  { id: '0007', name: 'Camisa Gris', price: 11, image: '/camisaGris.jpg' },
  { id: '0008', name: 'Pantalon Negro', price: 28, image: '/pantalonNegro.jpg' },
  { id: '0009', name: 'Camisa Morada', price: 20, image: '/camisaMorada.jpg' },
  { id: '0010', name: 'Camisa Naranja', price: 13, image: '/camisaNaranja.jpg' },
  { id: '0011', name: 'Camisa Beige', price: 25, image: '/camisaBeige.jpg' },
];

function Orders() {
  const [quantity, setQuantity] = useState({});
  const [modalInsertar, setModalInsertar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orders, setOrders] = useState([]);

  const mostrarModalInsertar = (product) => {
    setSelectedProduct(product);
    setQuantity(prevQuantity => ({ ...prevQuantity, [product.id]: 1 }));
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
    setSelectedProduct(null);
  };

  const handleQuantityChange = (id, value) => {
    const updatedValue = Number(value) > 0 ? Number(value) : 1; // Asegurar que la cantidad sea al menos 1
    setQuantity(prevQuantity => ({ ...prevQuantity, [id]: updatedValue }));
  };

  const handleAddOrder = () => {
    setOrders(prevOrders => [...prevOrders, { product: selectedProduct, quantity: quantity[selectedProduct.id] || 1 }]);
    cerrarModalInsertar();
  };


  const handleFinalOrder = async () => {
    const salesData = orders.map(order => ({
      name: order.product.name,
      price: order.product.price,
      total: order.product.price * order.quantity,
      can: order.quantity,
    }))[0];

    try {
      console.log(salesData);
      await axios({
        method: 'post',
        url: 'http://127.0.0.1:3001/sales',
        data: salesData
      });
      setModalInsertar(false)
      setOrders([]);
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
      alert('Error al enviar el pedido al servidor.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuantity(prevQuantity => ({ ...prevQuantity, [selectedProduct.id]: Number(value) }));
  };

  const handleFinalCancel = () => {
    setOrders([]);
  };

  return (
    <div>
      <AppBar />
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={8}>
          <div style={titleStyle}>Pedidos</div>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={6} key={product.id}>
                <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase sx={{ width: 128, height: 128 }}>
                        <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1" component="div">
                            {product.name}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            ID: {product.id}
                          </Typography>
                          <Button onClick={() => mostrarModalInsertar(product)}>Pedir</Button>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" component="div">
                          ${product.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <div style={titleStyle}>Orden de Pedidos</div>
          {orders.map((order, index) => (
            <Grid item key={index}>
              <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                          {order.product.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          ID: {order.product.id}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Cantidad: {order.quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        ${order.product.price}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
          <Button onClick={handleFinalOrder}>Realizar Pedido</Button>
          <Button onClick={handleFinalCancel}>Cancelar Pedido</Button>
        </Grid>
      </Grid>

      <Modal isOpen={modalInsertar} toggle={cerrarModalInsertar}>
        <div style={{ margin: 50 }}>
          <ModalHeader toggle={cerrarModalInsertar}>
            <div><h3>Insertar Venta</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control" name='name' value={selectedProduct?.name} readOnly onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Precio:</label>
              <input className="form-control" name='price' value={selectedProduct?.price} readOnly onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Cantidad:</label>
              <input
                className="form-control"
                name='can'
                type="number"
                value={quantity[selectedProduct?.id] || 1}
                onChange={(e) => handleQuantityChange(selectedProduct.id, e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Total</label>
              <input
                className="form-control"
                name='total'
                value={selectedProduct ? (quantity[selectedProduct.id] || 1) * selectedProduct.price : 0}
                readOnly
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleAddOrder}>Insertar</Button>
            <Button color="secondary" onClick={cerrarModalInsertar}>Cancelar</Button>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
}

export default Orders;