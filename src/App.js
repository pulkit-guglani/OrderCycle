import "./App.css";
// import Footer from "./components/Footer";
import Header from "./components/Header";
import OrderStatus from "./pages/OrderStatus";
import Restaurant from "./pages/RestaurantSelection";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import RestaurantLandingPage from "./pages/RestaurantLandingPage";
import AdminLogin from "./components/AdminLogin";
import OperatorPage from "./pages/OperatorPage";
import ChefPage from "./pages/ChefPage";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { themeOptions } from "./components/Theme";
import { ThemeProvider } from "@mui/material";
import { connectToIOServer } from "./sockets/socketsHandler";

function App() {
  connectToIOServer();
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeOptions}>
        <Header />
        <Routes>
          <Route path="/" element={<Restaurant />} />
          <Route path="/order/:resId/:id" element={<OrderStatus />} />
          <Route
            path="/restaurantLandingPage/:resId"
            element={<RestaurantLandingPage />}
          />
          <Route
            path="/OperatorPage/:resId"
            element={
              <ProtectedRoute Component={OperatorPage} pageType="Operator" />
            }
          />
          <Route path="/login" element={<AdminLogin />} />
          <Route
            path="/chefPage/:resId"
            element={<ProtectedRoute Component={ChefPage} pageType="Chef" />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ThemeProvider>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
