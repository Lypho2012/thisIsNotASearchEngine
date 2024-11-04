import React, { useEffect } from 'react'
import Google from './components/Google.tsx'
import SearchBar from './components/SearchBar.tsx'
import SearchCategories from './components/SearchCategories.tsx'
import SearchResult from './components/SearchResult.tsx'
import "./ImHappy.css"

function ImHappy() {
  const search_results = [
    {
      link_name:"😁",
      link:"😁",
      summary:"😁😁😁"
    },
    {
      link_name:"🤩",
      link:"🤩",
      summary:"🤩🤩🤩"
    },
    {
      link_name:"🤣",
      link:"🤣",
      summary:"🤣🤣🤣"
    },
    {
      link_name:"😾",
      link:"😾",
      summary:"😾😾😾"
    },
    {
      link_name:"🤓",
      link:"🤓",
      summary:"🤓🤓🤓"
    },
    {
      link_name:"🪷",
      link:"🪷",
      summary:"🪷🪷🪷"
    },
    {
      link_name:"❄️",
      link:"❄️",
      summary:"❄️❄️❄️"
    },
  ]
  useEffect(() => {
    let google_letters = document.getElementsByClassName("Google-letter")
    for (let google_letter of google_letters) {
      google_letter.style.fontSize = "30px"
    }
  })
  return (
    <div id="happy-div">
      <div className="search-result-searchbar-div">
        <div className="search-result-google-div">
          <Google/>
        </div>
        <SearchBar prevSearchTerm="i think im happy"/>
      </div>
      <SearchCategories/>
      <div id="happy-search-result-list-div">
        {search_results.map((search_result) => {
          return (<SearchResult link={search_result.link} link_name={search_result.link_name} summary={search_result.summary}/>)
        })}
      </div>
    </div>
  )
}

export default ImHappy