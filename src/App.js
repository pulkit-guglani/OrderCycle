import "./App.css";
// import Footer from "./components/Footer";
import Header from "./components/Header";
import OrderStatus from "./pages/OrderStatus";
import Restaurant from "./pages/RestaurantSelection";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestaurantLandingPage from "./pages/RestaurantLandingPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Restaurant />} />
        <Route path="/order/:id" element={<OrderStatus />} />
        <Route
          path="/restaurantLandingPage"
          element={<RestaurantLandingPage />}
        />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
