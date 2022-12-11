import "./App.css";
// import Footer from "./components/Footer";
import Header from "./components/Header";
import OrderStatus from "./pages/OrderStatus";
import Restaurant from "./pages/RestaurantSelection";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestaurantLandingPage from "./pages/RestaurantLandingPage";
import AdminLogin from "./components/AdminLogin";
import OperatorPage from "./pages/OperatorPage";
import ChefPage from "./pages/ChefPage";
import Test from "./pages/Test";

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
        <Route path="/OperatorPage" element={<OperatorPage />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/chefPage" element={<ChefPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
