import Navbar from "./Components/Navbar";
import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Todos from "./Pages/Todos";
import Home from "./Pages/Home";
export const store = createContext();
function App() {
  const [token, setToken] = useState(localStorage.getItem("token")); // Get token from localStorage

  // Add this effect to update token state when it changes
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return (
    <div className="App">
      <store.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Todos" element={<Todos />} />
          </Routes>
        </BrowserRouter>
      </store.Provider>
    </div>
  );
}

export default App;
