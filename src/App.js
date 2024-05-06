
import Home from "./components/Home";
import Orders from "./components/Orders";
import Sale from "./components/Sale";
import Products from "./components/products";
import Customers from "./components/Customers";
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Sale" element={<Sale />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Customers" element={<Customers />} />
      </Routes>
    </div>
  );
}

export default App;
