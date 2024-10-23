import React from 'react'
import './About.css'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div id="about-page">
        <div id="about-heading">This is NOT a search engine!</div>
        <div id="about-body">Were you fooled? This was just a project that I took on for fun to fill up with some silly ideas.</div>
        <Link to="/" id="about-back-link">Back</Link>
    </div>
  )
}

export default About