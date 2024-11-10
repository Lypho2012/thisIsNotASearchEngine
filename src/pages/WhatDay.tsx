import React, { useEffect, useState } from 'react'
import Google from './components/Google'
import SearchBar from './components/SearchBar'
import SearchCategories from './components/SearchCategories'
import SearchResult from './components/SearchResult'
import "./WhatDay.css"

function WhatDay() {
    const [today, setToday] = useState(new Date())
    const [yesterday, setYesterday] = useState(new Date())
    const [tomorrow, setTomorrow] = useState(new Date())
    const weeklySchedule: Record<number,Record<string,string>> = {
        0:{},
        1:{
            "9:30am":"ICS 32 Lab",
            "12:00pm":"ICS 6B Lec",
            "2:00pm":"ICS 6N Dis",
            "3:00pm":"ICS 6N Lec",
            "6:00pm":"ACM"
        },
        2:{
            "11:00am":"PHY 20E Lec",
            "12:30pm":"ICS 32 Lec",
            "3:30pm":"WRI 60 Sem",
            "6:00pm":"Badminton Club"
        },
        3:{
            "9:30am":"ICS 32 Lab",
            "12:00pm":"ICS 6B Lec",
            "3:00pm":"ICS 6N Lec",
            "6:00pm":"ACM"
        },
        4:{
            "11:00am":"PHY 20E Lec",
            "12:30pm":"ICS 32 Lec",
            "3:30pm":"WRI 60 Sem",
            "5:00pm":"PHY 20E Dis",
            "6:00pm":"Badminton Club"
        },
        5:{
            "9:30am":"ICS 32 Lab",
            "12:00pm":"ICS 6B Lec",
            "3:00pm":"ICS 6N Lec"
        },
        6:{}
    }
    // today.getDay() return 0 to 6 for sunday through saturday
    useEffect(() => {
        const intervalId = setInterval(() => {
            setToday(new Date())
            yesterday.setDate(today.getDate()-1)
            tomorrow.setDate(today.getDate()+1)
        }, 10);
    
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
            const google_letter_element = google_letter as HTMLElement
            google_letter_element.style.fontSize = "30px"
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
        <div className='horizontal'>
            <div id="what-day-search-result-list-div">
                {search_results.map((search_result) => {
                return (<SearchResult link={search_result.link} link_name={search_result.link_name} summary={search_result.summary}/>)
                })}
            </div>
            <div id="schedule-div">
                <h1>Schedule</h1>
                <div id="schedule-images-div">
                    
                </div>
                <div>
                    {Object.keys(weeklySchedule[today.getDay()] as Record<string,string>).length == 0 ? (
                        <div>Looks like nothing much is happening today!</div>
                    ): (
                        Object.entries(weeklySchedule[today.getDay()]).map(([key,value]) => {
                            return <div className='schedule-item'>
                                <div className='schedule-time'>{key}</div>
                                <div className='schedule-event'>{value}</div>
                            </div>
                        })
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default WhatDay