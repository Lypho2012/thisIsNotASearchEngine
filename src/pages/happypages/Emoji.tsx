import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "./Emoji.css"

function Emoji() {
    const screen_width = window.innerWidth
    const screen_height = window.innerHeight
    const emoji_width = 100
    const emoji_height = 100
    const emoji_rows = Math.floor(screen_height/emoji_height)
    const emoji_cols = Math.floor(screen_width/emoji_width)
    const {emoji} = useParams()
    useEffect(() => {
        if (emoji == "❄️") {
            const emojidiv = document.getElementById("emoji-div")
            if (emojidiv) {
                emojidiv.style.backgroundColor = "rgb(89, 187, 255)"
            }
        } else if (emoji == "🪷") {
            const emojidiv = document.getElementById("emoji-div")
            if (emojidiv) {
                emojidiv.style.backgroundColor = "rgb(255, 207, 225)"
            }
        } else if (emoji == "🍗") {
            const emojidiv = document.getElementById("emoji-div")
            if (emojidiv) {
                emojidiv.style.backgroundColor = "rgb(0, 105, 56)"
            }
        }
    })
    return (
        <div id="emoji-div">
            {[...Array(emoji_rows)].map((x) =>
                <div className='emoji-row'>
                    {[...Array(emoji_cols)].map((y) =>
                        <div className='emoji-element'>{emoji}</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Emoji