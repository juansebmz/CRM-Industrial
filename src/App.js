
import Home from "./components/Home";
import Sale from "./components/Sale";
import Products from "./components/products";

import Customers from "./components/Customers";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";


function App() {

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/Sale" element={<Sale />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
