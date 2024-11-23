import React from 'react'
import Typewriter from "typewriter-effect"
import "./Birthday.css"

function Birthday() {
  return (
    <div id="birthday-div">
        <Typewriter 
            options = {{
                autoStart: true,
                loop: true,
                delay: 140,
                strings: ["Happy Birthday!"]
            }}
        />
    </div>
  )
}

export default Birthday