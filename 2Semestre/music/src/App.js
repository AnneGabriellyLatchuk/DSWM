import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './styles/styles.css'; // Importe o arquivo de estilos

function Home() {
  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>Home Page, bla bla bla.</p>
    </div>
  );
}

function Artista() {
  return (
    <div className="container">
      <h1>Artista Page</h1>
      <p>Artista Page, bla bla bla.</p>
    </div>
  );
}

function RouteApp() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/artista">Artista</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artista" element={<Artista />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteApp;
