import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Checkout from "./checkout.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Order from "./order.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/checkout" element={<Checkout />} />
    <Route path="/orders/:id" element={<Order />} />
    </Routes>
  </BrowserRouter>
);
