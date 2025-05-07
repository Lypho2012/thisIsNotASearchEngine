import './App.css';
import Home from './pages/Home'
import WhySkyBlue from './pages/WhySkyBlue'
import ImHappy from './pages/ImHappy'
import Crowdstrike from './pages/Crowdstrike'
import Poem from './pages/whyskybluepages/Poem'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import { useState } from 'react';
import About from './pages/About';
import Emoji from './pages/happypages/Emoji';
import WhatDay from './pages/WhatDay';
import DisplayDay from './pages/whatdaypages/DisplayDay';
import Virus from './pages/Virus';
import Calculations from './pages/Calculations';
import PleaseContext from './pages/contexts/please_context';
import Disguise from './pages/Disguise';
import VSCode from './pages/disguisepages/VSCode';
import ScrapedContext from './pages/contexts/scraped_context';
import ChristmasThreeD from './pages/ChristmasThreeD';
import Youtube from './pages/youtubepages/Youtube';
import ImageComposition from './pages/ImageComposition';
import Collage from './pages/Collage';

function App() {
  const [learned, setLearned] = useState(false)

  return (
    <PleaseContext.Provider value={{learned,setLearned}}>
    <ScrapedContext.Provider value={{data: [], setData: () => {}}}>
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
          <Route path="/help+me+do+some+calculations" element={<Calculations/>}/>
          <Route path="/disguise+my+website" element={<Disguise/>}/>
          <Route path="/disguise+my+website/vscode" element={<VSCode/>}/>
          <Route path="/show+me+some+christmas+magic" element={<ChristmasThreeD/>}/>
          <Route path="/youtube" element={<Youtube/>}/>
          <Route path="/image-composition" element={<ImageComposition/>}/>
          <Route path="/collage-generator" element={<Collage/>}/>
        </Routes>
    </div>
    </BrowserRouter>
    </ScrapedContext.Provider>
    </PleaseContext.Provider>
  );
}

export default App;
