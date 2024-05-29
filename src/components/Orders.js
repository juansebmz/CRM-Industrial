//Orders.js
import React, { useState } from 'react';
import AppBar from './Appbar'; 
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const titleStyle = {
  textAlign: 'left',
  fontSize: '1.8em',
  fontWeight: 'regular',
  color: '#000',
  padding: '20px 0',
  paddingLeft: '73px',
};

const products = [
  { id: '0000', name: 'Camisa Amarilla', price: '$6', image: '/camisaAmarilla.jpg'  },
  { id: '0001', name: 'Camisa Negra', price: '$15', image: '/camisaNegra.jpg' },
  { id: '0002', name: 'Camisa Roja', price: '$8', image: '/camisaRoja.jpg' },
  { id: '0003', name: 'Camisa Azul', price: '$10', image: '/camisaAzul.jpg' },
  { id: '0004', name: 'Camisa Verde', price: '$7', image: '/camisaVerde.jpg'  },
  { id: '0005', name: 'Camisa Blanca', price: '$5', image: '/camisaBlanca.jpg'  },
  { id: '0006', name: 'Camisa Café', price: '$15', image: '/camisaCafe.jpg'  },
  { id: '0007', name: 'Camisa Gris', price: '$11', image: '/camisaGris.jpg'  },
  { id: '0008', name: 'Pantalon Negro', price: '$28', image: '/pantalonNegro.jpg'  },
  { id: '0009', name: 'Camisa Morada', price: '$20', image: '/camisaMorada.jpg'  },
  { id: '0010', name: 'Camisa Naranja', price: '$13', image: '/camisaNaranja.jpg'  },
  { id: '0011', name: 'Camisa Beige', price: '$25', image: '/camisaBeige.jpg'  },
];

function Orders() {
  const [quantity, setQuantity] = useState({});
  const [orders, setOrders] = useState([]);

  const handleOrder = (product) => {
    setOrders(prevOrders => [...prevOrders, {product, quantity: quantity[product.id] || 0}]);
    setQuantity(prevQuantity => ({ ...prevQuantity, [product.id]: 0 }));
  };

  const handleCancel = (id) => {
    setQuantity(prevQuantity => ({ ...prevQuantity, [id]: 0 }));
  };

  const handleQuantityChange = (id, value) => {
    setQuantity(prevQuantity => ({ ...prevQuantity, [id]: value }));
  };

  const handleFinalOrder = () => {
    alert(`Pedido finalizado: ${orders.map(order => `${order.product.name}, Cantidad: ${order.quantity}`).join(', ')}`);
    setOrders([]); // limpia el cuadro de orden de pedidos
  };

  const handleFinalCancel = () => {
    setOrders([]); // limpia el cuadro de orden de pedidos
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
                          <TextField
                            type="number"
                            value={quantity[product.id] || 0}
                            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                            label="Cantidad"
                          />
                          <Button onClick={() => handleOrder(product)}>Pedir</Button> {/* Cambiado a "Pedir" */}
                          <Button onClick={() => handleCancel(product.id)}>Cancelar</Button>
                        </Grid>
                        <Grid item>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" component="div">
                          {product.price}
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
                        {order.product.price}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
          <Button onClick={handleFinalOrder}>Realizar Pedido</Button> {/* Nuevo botón para realizar el pedido final */}
          <Button onClick={handleFinalCancel}>Cancelar Pedido</Button> {/* Nuevo botón para cancelar el pedido final */}
        </Grid>
      </Grid>
    </div>
  );
}

export default Orders;