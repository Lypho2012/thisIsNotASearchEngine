import React from 'react'
import { useParams } from 'react-router-dom'
import "./DisplayDay.css"
import Birthday from './Birthday'
import Thanksgiving from './Thanksgiving'
import Halloween from './Halloween'

function DisplayDay() {
    const {date} = useParams()
    const specialDates: Record<string,string> = {
        "8+25":"birthday",
        "10+31":"halloween",
        "11+10":"birthday",
        "11+28":"thanksgiving",
        "11+29":"black friday",
        "12+10":"birthday",
        "12+25":"christmas",
        "12+31":"new years eve",
        "1+1":"new years"
    }
    const month = date?.split("+")[0]
    const day = date?.split("+")[1]
    const occasion = month+"+"+day in specialDates ? specialDates[month+"+"+day] : ""
    if (occasion == "birthday") {
        return <Birthday/>
    } else if (occasion == "thanksgiving") {
        return <Thanksgiving/>
    } else if (occasion == "halloween") {
        return <Halloween/>
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