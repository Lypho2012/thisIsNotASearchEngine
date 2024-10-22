import './App.css';
import Home from './pages/Home.tsx'
import WhySkyBlue from './pages/WhySkyBlue.tsx'
import ImHappy from './pages/ImHappy.tsx'
import Crowdstrike from './pages/Crowdstrike.tsx'
import { Routes, Route} from 'react-router-dom'
import React from 'react';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/why+is+the+sky+blue" element={<WhySkyBlue/>}/>
          <Route path="/i+think+im+happy" element={<ImHappy/>}/>
          <Route path="/crowdstrike" element={<Crowdstrike/>}/>
        </Routes>
    </div>
  );
}

export default App;
