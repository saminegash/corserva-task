import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { NavBar } from "./components/NavBar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ItemCreate from "./pages/ItemCreate";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <ShoppingCartProvider>
        <NavBar />
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/store/new" element={<ItemCreate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </UserProvider>
  );
}

export default App;
