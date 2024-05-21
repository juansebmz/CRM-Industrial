// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

// Esquema del cliente
const customerSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  phone: String
});

// Modelo del cliente
const Customer = mongoose.model('Customer', customerSchema);

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.p5in1at.mongodb.net/customers?retryWrites=true&w=majority').then(() => {
  console.log("Conectado a MongoDB");
}).catch(err => {
  console.error("Error de conexión a MongoDB:", err);
});

// Middleware para procesar body JSON
app.use(bodyParser.json());

app.use(cors());


// Ruta para crear un nuevo cliente
app.post('/customers', async (req, res) => {
  try {
    const { name, lastName, email, phone } = req.body;
    console.log(req.body)
    const newCustomer = new Customer({ name, lastName, email, phone });
    await newCustomer.save();
    res.status(201).json({ message: 'Cliente creado exitosamente', customer: newCustomer });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ error: 'Error del servidor al crear cliente' });
  }
});
app.get('/customers', async (req, res) => {
  try {
   const customer =  await Customer.find({}).exec();
    res.status(201).json({ message: 'todos los clientes', customer });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ error: 'Error del servidor al crear cliente' });
  }
});

// Resto del código del servidor (rutas CRUD, etc.)

app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});
