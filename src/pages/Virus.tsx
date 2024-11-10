import React, { useState } from 'react'
import "./Virus.css"
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';

function Virus() {
    const [showMessage, setShowMessage] = useState(false)
    const navigate = useNavigate()
    const handleVirusClick = () => {
        setShowMessage(true)
        const timeId = setTimeout(() => {
            navigate("/")
        }, 3000)
    }
    return (
        <div id="virus-div">
            <div id="virus-header">
                <svg fill="red" height="90px" width="90px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" > <path d="M256,34.297L0,477.703h512L256,34.297z M256,422.05c-9.22,0-16.696-7.475-16.696-16.696s7.475-16.696,16.696-16.696 c9.22,0,16.696,7.475,16.696,16.696S265.22,422.05,256,422.05z M239.304,344.137V177.181h33.391v166.956H239.304z"></path> </svg>
                <div>Warning!</div>
            </div>
            <div id="virus-warning">Your computer has been infected with a virus!</div>
            <button id="virus-button" onClick={handleVirusClick}>Click here to purge the virus</button>
            {showMessage ? <div id="purged-message">
                Congrats! Your computer is safe now
            </div> : null}
        </div>
    )
}

export default Virus