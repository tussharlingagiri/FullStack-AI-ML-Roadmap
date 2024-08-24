import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; 
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>                       
      <div style={{ padding: '20px' }}> 
        <h1>Multi-Page React App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="route-content">
          <Routes> 
            <Route path="/about" element={<About />} /> 
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


// Router: This is the root component that wraps your entire application and provides routing functionality.
// Route: This component is used to define a route and the component to render when the route matches.
// Routes component is used to define a set of routes for your application

