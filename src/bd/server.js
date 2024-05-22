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
const saleSchema = new mongoose.Schema({
 name: String,
 price: Number,
 total: Number,
 can: Number
});

// Modelo del cliente
const Customer = mongoose.model('Customer', customerSchema);
const SaleModel = mongoose.model('Sale', saleSchema);

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

app.get('/sales', async (req, res) => {
  try {
    const sale = await SaleModel.find({}).exec();
    res.status(201).json({ message: 'Listado de ventas', sale });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({ error: 'Error del servidor' });
  }
 });

 app.post('/sales', async (req, res) => {
  try {
    const { name, price, total, can } = req.body;
    const newSale = new SaleModel({ name, price, total, can });
    await newSale.save();
    res.status(201).json({ message: 'Venta creada exitosamente', data: newSale });
  } catch (error) {
    console.error("Error al crear Venta:", error);
    res.status(500).json({ error: 'Error del servidor al crear' });
  }
 });

 app.put('/sales/:id', async (req, res) => {
  try {
    const { name, price, total, can } = req.body;
    const updatedSale = await SaleModel.findByIdAndUpdate(req.params.id, { name, price, total, can }, { new: true });
    if (!updatedSale) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.status(200).json({ message: 'Venta actualizada exitosamente', data: updatedSale });
  } catch (error) {
    console.error("Error al actualizar venta:", error);
    res.status(500).json({ error: 'Error del servidor al actualizar' });
  }
});

app.delete('/sales/:id', async (req, res) => {
  try {
    const deletedSale = await SaleModel.deleteOne({_id:req.params.id}).exec()
    
  console.log(deletedSale)
    if (!deletedSale) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.status(200).json({ message: 'Venta eliminada exitosamente', data: deletedSale });
  } catch (error) {
    console.error("Error al eliminar la venta:", error);
    res.status(500).json({ error: 'Error del servidor al eliminar' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});

