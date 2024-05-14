import React from 'react';
import Appbar from './Appbar';

let productos = [
  { descripcion: "Lorem ipsum dolor sit amet", codigo: "0000", precio: "$0", imagen: "" },

];

function Products() {
  const titleStyle = {
    textAlign: 'left', 
    fontSize: '1.8em', 
    fontWeight: 'regular', 
    color: '#000', 
    padding: '20px 0',
    paddingLeft: '73px',
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Appbar/>
      <div style={titleStyle}> Productos </div>
      <div style={{  display: 'flex' }}>
      
        <div style={{ margin: '35px', paddingLeft: '73px', width: '20%', backgroundColor: 'lightblue',  flexWrap: 'wrap' }}>
          <h2>Filtros</h2>
          <p>  Lorem ipsum dolor sit amet</p>
          <p>Lorem ipsum </p>
          <p>Lorem ipsum dolor sit </p>
          <p>.... </p>
          <p>.... </p>
          <p>.... </p>
          <p>.... </p>
          
        </div>
        <div style={{ width: '80%', display: 'flex', flexWrap: 'wrap' }}>
          {productos.map((producto, index) => (
            <div key={index} style={{ width: '30%', margin: '10px', border: '1px solid black', padding: '10px' }}>
              <img src={producto.imagen} alt={producto.descripcion} style={{ width: '100%' }} />
              <p>{producto.descripcion}</p>
              <p>{producto.codigo}</p>
              <p>{producto.precio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
