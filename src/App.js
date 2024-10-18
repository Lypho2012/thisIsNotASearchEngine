import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.js'
import WhySkyBlue from './pages/WhySkyBlue.js';
import ImHappy from './pages/ImHappy.js';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Home/>
      <Routes>
        <Route path={"/"+encodeURIComponent("Why is the sky blue")} element={<WhySkyBlue/>}></Route>
        <Route path={"/"+encodeURIComponent("I think I'm happy")} element={<ImHappy/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
