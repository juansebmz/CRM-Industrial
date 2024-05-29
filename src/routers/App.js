// App.js
import Home from "../components/Home";
import Sale from "../components/Sale";
import Products from "../components/products";
import Customers from "../components/Customers";
import Orders from "../components/Orders"; // Asegúrate de que la ruta sea correcta
import { Route, Routes } from "react-router-dom";
import Signup from "../components/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/Sale" element={<Sale />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/Orders" element={<Orders />} /> {/* Agrega esta línea */}
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;