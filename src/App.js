import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './Pages/About';
import Addedit from './Pages/Addedit';
import Home from './Pages/Home';
import View from './Pages/View';
import Search from './Pages/Search';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/add" element={<Addedit/>} />
          <Route path="/update/:id" element={<Addedit/>}/>
          <Route path="/view/:id" element={<View/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/search" element={<Search/>} />
         </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
