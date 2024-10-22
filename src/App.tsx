import './App.css';
import Home from './pages/Home.tsx'
import WhySkyBlue from './pages/WhySkyBlue.tsx'
import ImHappy from './pages/ImHappy.tsx'
import Crowdstrike from './pages/Crowdstrike.tsx'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import React from 'react';
import About from './pages/About.tsx';

function App() {
  return (
    <BrowserRouter >
    <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/why+is+the+sky+blue" element={<WhySkyBlue/>}/>
          <Route path="/i+think+im+happy" element={<ImHappy/>}/>
          <Route path="/crowdstrike" element={<Crowdstrike/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
