import React from 'react';
import Appbar from './Appbar';

const productos = [
  { descripcion: "Camiseta Amarilla", codigo: "0001", precio: "$19.99", imagen: "camisaAmarilla.jpg" },
  { descripcion: "Camiseta Negra", codigo: "0002", precio: "$14.99", imagen: "camisaNegra.jpg" },
  { descripcion: "Camiseta Amarilla", codigo: "0003", precio: "$16.99", imagen: "camisaAmarilla.jpg" },
  { descripcion: "Camiseta Amarilla", codigo: "0004", precio: "$19.99", imagen: "camisaAmarilla.jpg" },
  { descripcion: "Camiseta Negra", codigo: "0005", precio: "$14.99", imagen: "camisaNegra.jpg" },
  { descripcion: "Camiseta Amarilla", codigo: "0006", precio: "$16.99", imagen: "camisaAmarilla.jpg" },
];

const buttonStyle = { 
  backgroundColor:'#007bff', 
  color:'white', 
  border:'none', 
  padding:'10px', 
  borderRadius:'5px', 
  cursor:'pointer'
}; 

const ProductItem = ({ producto, index }) => {
  const productImageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '5px 5px 0 0',
  };

  const productItemStyle = {
    width: '60%',
    margin: '20px',
    border: '1px solid #ccc',
    padding: '0px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f8f9fa',
  };

  return (
    <div key={index} style={productItemStyle}>
      <img src={producto.imagen} alt={producto.descripcion} style={productImageStyle} />
      <p>{producto.descripcion}</p>
      <p>{producto.codigo}</p>
      <p>{producto.precio}</p>
      <button style={buttonStyle}>Agregar Producto</button>
    </div>
  );
};

function Products() {
  const titleStyle = {
    textAlign: 'left',
    fontSize: '1.8em',
    fontWeight: 'regular',
    color: '#000',
    padding: '20px 0',
    paddingLeft: '73px',
  };

  const filterStyle = {
    backgroundColor: '#e9ecef',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Appbar />
      <div style={titleStyle}> Productos </div>
      <div style={{ display: 'flex' }}>
        <div style={filterStyle}>
          <h2>Filtros</h2>
          <ul>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum dolor sit</li>
          </ul>
          <button style={buttonStyle}>Agregar producto</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {productos.map((producto, index) => (
            <ProductItem key={index} producto={producto} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;

