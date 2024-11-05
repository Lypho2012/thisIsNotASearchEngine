import React from 'react'
import { useParams } from 'react-router-dom'
import "./DisplayDay.css"
import Typewriter from "typewriter-effect"

function DisplayDay() {
    const {date} = useParams()
    const specialDates = {"11+2":{}}
    const month = date?.split("+")[0]
    const day = date?.split("+")[1]
    if (month+"+"+day in specialDates) {
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
    } else {
        return (
            <div>DisplayDay</div>
        )
    }
}

export default DisplayDay