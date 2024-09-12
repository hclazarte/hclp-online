import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <div>
      <div className="content">
        <Router>
          <div>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
      </Router>
      </div>
    </div>
  );
}

export default App;
