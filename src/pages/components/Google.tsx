import React, { useEffect, useState } from 'react'
import "./Google.css"
import { useNavigate } from 'react-router-dom'
import axios from "axios";

function Google() {
    const navigate = useNavigate()
    document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement
        if (target?.id == "Google-header" || target?.className == "Google-letter") {
            navigate("/")
        }
    })
    useEffect(() => {
        axios.post('http://localhost:8000/create-today-google-banner');
    })
    return (
        <div id="Google-header">
            <img id="banner" src={require("./banner.png")}/>
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