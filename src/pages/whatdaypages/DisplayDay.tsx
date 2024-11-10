import React from 'react'
import { useParams } from 'react-router-dom'
import "./DisplayDay.css"
import Typewriter from "typewriter-effect"

function DisplayDay() {
    const {date} = useParams()
    const specialDates: Record<string,string> = {"11+10":"birthday","12+10":"birthday"}
    const month = date?.split("+")[0]
    const day = date?.split("+")[1]
    if (month+"+"+day in specialDates && specialDates[month+"+"+day] as string == "birthday") {
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
            <div id="unknown-day-div">
                <div className='thinking-emoji x'>
                <div className='thinking-emoji y'>🤔</div>
                </div>
                <div>Was there something happening today? <br/> I don't have information on that</div>
            </div>
        )
    }
}

export default DisplayDay