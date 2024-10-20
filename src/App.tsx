import './App.css';
import Home from './pages/Home.tsx'
import WhySkyBlue from './pages/WhySkyBlue.tsx'
import ImHappy from './pages/ImHappy.tsx'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path={"/"+encodeURIComponent("why is the sky blue")} element={<WhySkyBlue/>}></Route>
          <Route path={"/"+encodeURIComponent("i think i'm happy")} element={<ImHappy/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
