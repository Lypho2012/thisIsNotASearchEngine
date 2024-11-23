import './App.css';
import Home from './pages/Home'
import WhySkyBlue from './pages/WhySkyBlue'
import ImHappy from './pages/ImHappy'
import Crowdstrike from './pages/Crowdstrike'
import Poem from './pages/whyskybluepages/Poem'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import React from 'react';
import About from './pages/About';
import Emoji from './pages/happypages/Emoji';
import WhatDay from './pages/WhatDay';
import DisplayDay from './pages/whatdaypages/DisplayDay';
import Virus from './pages/Virus';
import Birthday from './pages/whatdaypages/Birthday';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/why+is+the+sky+blue" element={<WhySkyBlue/>}/>
          <Route path="/why+is+the+sky+blue/poem" element={<Poem/>}/>
          <Route path="/i+think+im+happy" element={<ImHappy/>}/>
          <Route path="/i+think+im+happy/:emoji" element={<Emoji/>}/>
          <Route path="/crowdstrike" element={<Crowdstrike/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/what+day+is+it+today" element={<WhatDay/>}/>
          <Route path="/what+day+is+it+today/:date" element={<DisplayDay/>}/>
          <Route path="/virus" element={<Virus/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
