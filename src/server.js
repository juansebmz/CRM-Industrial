//server.js
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
   const newCustomer = new Customer({ name, lastName, email, phone });
   await newCustomer.save();
   res.status(201).json({ message: 'Cliente creado exitosamente', customer: newCustomer });
 } catch (error) {
   console.error("Error al crear cliente:", error);
   res.status(500).json({ error: 'Error del servidor al crear cliente' });
 }
});

// Ruta para obtener todos los clientes
app.get('/customers', async (req, res) => {
 try {
  const customer =  await Customer.find({}).exec();
   res.status(201).json({ message: 'todos los clientes', customer });
 } catch (error) {
   console.error("Error al obtener clientes:", error);
   res.status(500).json({ error: 'Error del servidor al obtener clientes' });
 }
});

// Ruta para editar un cliente existente
app.put('/customers/:id', async (req, res) => {
  try {
    const { name, lastName, email, phone } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, { name, lastName, email, phone }, { new: true });
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json({ message: 'Cliente actualizado exitosamente', customer: updatedCustomer });
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ error: 'Error del servidor al actualizar cliente' });
  }
});

// Ruta para eliminar un cliente
app.delete('/customers/:id', async (req, res) => {
  try {
    const deletedCustomer = await Customer.deleteOne({_id:req.params.id}).exec()
    
  console.log(deletedCustomer)
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json({ message: 'Cliente eliminado exitosamente', customer: deletedCustomer });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ error: 'Error del servidor al eliminar cliente' });
  }
});

app.listen(port, () => {
 console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});
