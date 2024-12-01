import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import { Product } from "./pages/Product";

import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { ProductModal } from "./pages/ProductModal";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <ShoppingCartProvider>
          {/* wrap multiple elements or components within a React Fragment <> */}
          <Navbar />
          <Container className="mb-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product2" element={<ProductModal />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </Container>
        </ShoppingCartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
export default App;
