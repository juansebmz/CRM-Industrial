import React, { useState } from 'react';
import Appbar from './Appbar';

const initialProducts = [
  { descripcion: "Camisa Amarilla", codigo: "0000", precio: "$6", imagen: "camisaAmarilla.jpg", disponible: true },
  { descripcion: "Camisa Negra", codigo: "0001", precio: "$5", imagen: "camisaNegra.jpg", disponible: true },
  { descripcion: "Camisa Amarilla", codigo: "0002", precio: "$6", imagen: "camisaAmarilla.jpg", disponible: true },
  { descripcion: "Camisa Negra", codigo: "0003", precio: "$5", imagen: "camisaNegra.jpg", disponible: true },
  { descripcion: "Camisa Amarilla", codigo: "0002", precio: "$6", imagen: "camisaAmarilla.jpg", disponible: true },
  { descripcion: "Camisa Negra", codigo: "0003", precio: "$5", imagen: "camisaNegra.jpg", disponible: true },
  { descripcion: "Camisa Amarilla", codigo: "0002", precio: "$6", imagen: "camisaAmarilla.jpg", disponible: true },
  { descripcion: "Camisa Negra", codigo: "0003", precio: "$5", imagen: "camisaNegra.jpg", disponible: true },
  
];

const buttonStyle = {
  backgroundColor: '#0000FF',
  color: 'white',
  border: 'none',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px',
};

const ProductItem = ({ producto }) => {
  const productImageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '5px 5px 0 0',
  };

  const productItemStyle = {
    width: '200px',
    margin: '10px',
    border: '1px solid #ccc',
    padding: '0px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f8f9fa',
  };

  const infoStyle = {
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '0 0 5px 5px',
    textAlign: 'center',
  };

  return (
    <div style={productItemStyle}>
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
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState(initialProducts);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    descripcion: '',
    codigo: '',
    precio: '',
    imagen: 'camisaAmarilla.jpg',
    disponible: true,
  });

  const titleStyle = {
    textAlign: 'left',
    fontSize: '1.8em',
    fontWeight: 'regular',
    color: '#000',
    padding: '20px 0',
    paddingLeft: '73px',
  };



  const productosFilter = filtro === 'todos'
    ? productos.filter(producto => producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
    : filtro === 'disponibles'
      ? productos.filter(producto => producto.disponible && producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
      : productos.filter(producto => !producto.disponible && producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()));

  const handleAddProduct = () => {
    setProductos([...productos, newProduct]);
    setNewProduct({
      descripcion: '',
      codigo: '',
      precio: '',
      imagen: 'camisaNegra.jpg',
      disponible: true,
    });
    setShowAddProduct(false);
  };
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Appbar />
      <div style={titleStyle}>Productos</div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', paddingLeft: '73px' }}>
        <button style={buttonStyle} onClick={() => setShowAddProduct(true)}>
          Agregar producto
        </button>
        <button style={buttonStyle} onClick={() => setFiltro('todos')}>Todos los productos</button>
        <button style={buttonStyle} onClick={() => setFiltro('disponibles')}>Productos disponibles</button>
        <button style={buttonStyle} onClick={() => setFiltro('agotados')}>Productos agotados</button>
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ marginRight: 'auto', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>
      <div style={{ margin:'auto',display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {productosFilter.map((producto, index) => (
          <ProductItem key={index} producto={producto} />
        ))}
      </div>
      {showAddProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
            <h2>Agregar producto</h2>
            <input
              type="text"
              placeholder="Descripción"
              value={newProduct.descripcion}
              onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
              style={{ marginBottom: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              placeholder="Código"
              value={newProduct.codigo}
              onChange={(e) => setNewProduct({ ...newProduct, codigo: e.target.value })}
              style={{ marginBottom: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              placeholder="Precio"
              value={newProduct.precio}
              onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
              style={{ marginBottom: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ ...buttonStyle, marginRight: '10px' }} onClick={() => setShowAddProduct(false)}>
                Cancelar
              </button>
              <button style={buttonStyle} onClick={handleAddProduct}>
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default Products;