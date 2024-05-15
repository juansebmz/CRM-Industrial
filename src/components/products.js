import React from 'react';
import Appbar from './Appbar';

const productos = [
  { descripcion: "Camiseta Amarilla", codigo: "0001", precio: "$19.99", imagen: "camisaAmarilla.jpg" },
  { descripcion: "Camiseta Negra", codigo: "0002", precio: "$14.99", imagen: "camisaNegra.jpg" },
  { descripcion: "Camiseta Amarilla", codigo: "0003", precio: "$16.99", imagen: "camisaAmarilla.jpg" },
  { descripcion: "Camiseta Amarilla", codigo: "0004", precio: "$19.99", imagen: "camisaAmarilla.jpg" },
  { descripcion: "Camiseta Negra", codigo: "0005", precio: "$14.99", imagen: "camisaNegra.jpg" },
  { descripcion: "Camiseta Amarilla", codigo: "0006", precio: "$16.99", imagen: "camisaAmarilla.jpg" },
  { descripcion: "Camiseta Negra", codigo: "0007", precio: "$14.99", imagen: "camisaNegra.jpg" },
  { descripcion: "Camiseta Amarilla", codigo: "0008", precio: "$16.99", imagen: "camisaAmarilla.jpg" },
];

const buttonStyle = { 
  backgroundColor:'#0000FF',
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
    width: '70%',
    margin: '20px',
    border: '1px solid #ccc',
    padding: '0px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f8f9fa',
  };

  const infoStyle = {
    backgroundColor: 'lightblue ',
    padding: '10px',
    borderRadius: ' 5px 5px',
  };

  return (
    <div key={index} style={productItemStyle}>
      <img src={producto.imagen} alt={producto.descripcion} style={productImageStyle} />
      <div style={infoStyle}>
        <p>{producto.descripcion}</p>
        <p>{producto.codigo}</p>
        <p>{producto.precio}</p>
      </div>
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
    backgroundColor: '#ADD8E6', // Cambiado a azul claro
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Appbar />
      <div style={titleStyle}> Productos </div>
      <div style={{ display: 'flex' }}>
        <div>
        <div style={filterStyle}>
          <h2>Filtros</h2>
          <ul>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum dolor sit</li>
          </ul>
        </div>
        <div style={{backgroundColor:''}}>
        <button style={ buttonStyle}>
          Agregar producto</button> 
        </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {productos.map((producto, index) => (
            <ProductItem key={index} producto={producto} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
