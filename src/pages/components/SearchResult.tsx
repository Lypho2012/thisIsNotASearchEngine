import React from 'react'
import { Link } from 'react-router-dom'
import "./SearchResult.css"

function SearchResult({link,link_name,summary}) {
  return (
    <div className="search-result">
        <Link className="search-result-link" to={link}>{link_name}</Link>
        <p className="search-result-summary">{summary}</p>
    </div>
  )
}

export default SearchResult