import React from 'react'
import "./Google.css"
import { useNavigate } from 'react-router-dom'

function Google() {
    const navigate = useNavigate()
    document.addEventListener("click", (event) => {
        if (event.target?.id == "Google-header" || event.target?.className == "Google-letter") {
            navigate("/")
        }
    })
  return (
    <div id="Google-header">
        <div id="big-g-letter" className="Google-letter">G</div>
        <div id="first-o-letter" className="Google-letter">o</div>
        <div id="second-o-letter" className="Google-letter">o</div>
        <div id="little-g-letter" className="Google-letter">g</div>
        <div id="l-letter" className="Google-letter">l</div>
        <div id="e-letter" className="Google-letter">e</div>
    </div>
  )
}

export default Google