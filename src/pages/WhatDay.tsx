import React, { useEffect, useState } from 'react'
import Google from './components/Google.tsx'
import SearchBar from './components/SearchBar.tsx'
import SearchCategories from './components/SearchCategories.tsx'
import SearchResult from './components/SearchResult.tsx'
import "./WhatDay.css"

function WhatDay() {
    const [today, setToday] = useState(new Date())
    const [yesterday, setYesterday] = useState(new Date())
    const [tomorrow, setTomorrow] = useState(new Date())
    useEffect(() => {
        const intervalId = setInterval(() => {
            setToday(new Date());
            yesterday.setDate(today.getDate()-1)
            tomorrow.setDate(today.getDate()+1)
        }, 1000);
    
        return () => clearInterval(intervalId);
    }, [])
    const search_results = [
      {
        link_name:"Yesterday",
        link:yesterday.toLocaleDateString().split("/").join("+"),
        summary:yesterday.toLocaleDateString()
      },
      {
        link_name:"Today",
        link:today.toLocaleDateString().split("/").join("+"),
        summary:today.toLocaleDateString()
      },
      {
        link_name:"Tomorrow",
        link:tomorrow.toLocaleDateString().split("/").join("+"),
        summary:tomorrow.toLocaleDateString()
      },
    ]
    useEffect(() => {
      let google_letters = document.getElementsByClassName("Google-letter")
      for (let google_letter of google_letters) {
        google_letter.style.fontSize = "30px"
      }
    })
  return (
    <div id="what-day-div">
      <div className="search-result-searchbar-div">
        <div className="search-result-google-div">
          <Google/>
        </div>
        <SearchBar prevSearchTerm="what day is it today"/>
      </div>
      <SearchCategories/>
      <div id="what-day-search-result-list-div">
        {search_results.map((search_result) => {
          return (<SearchResult link={search_result.link} link_name={search_result.link_name} summary={search_result.summary}/>)
        })}
      </div>
    </div>
  )
}

export default WhatDay