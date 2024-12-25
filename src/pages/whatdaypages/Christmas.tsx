import React, { useEffect } from 'react'
import "./Christmas.css"

function Christmas() {
    let image_left = window.innerWidth/2
    let img = document.getElementById("christmas-img")
    if (img) {
        image_left -= img.clientWidth/2
    }

    let sparkle1 = document.createElement("img")
    sparkle1.src = require("./sparkle.webp")
    sparkle1.className = "sparkle-big"
    sparkle1.style.left = (image_left-147)+"px"
    sparkle1.style.top = "-38px"
    setTimeout(() => {
        document.body.appendChild(sparkle1)
    }, 0);

    // let sparkle2 = document.createElement("img")
    // sparkle2.src = require("./sparkle.webp")
    // sparkle2.className = "sparkle"
    // sparkle2.style.left = (image_left-388)+"px"
    // sparkle2.style.top = "117px"
    // setTimeout(() => {
    //     document.body.appendChild(sparkle2)
    // }, 500);

    let sparkle3 = document.createElement("img")
    sparkle3.src = require("./sparkle.webp")
    sparkle3.className = "sparkle"
    sparkle3.style.left = (image_left-330)+"px"
    sparkle3.style.top = "215px"
    setTimeout(() => {
        document.body.appendChild(sparkle3)
    }, 100);

    let sparkle4 = document.createElement("img")
    sparkle4.src = require("./sparkle.webp")
    sparkle4.className = "sparkle"
    sparkle4.style.left = (image_left+33)+"px"
    sparkle4.style.top = "253px"
    setTimeout(() => {
        document.body.appendChild(sparkle4)
    }, 200);

    let sparkle5 = document.createElement("img")
    sparkle5.src = require("./sparkle.webp")
    sparkle5.className = "sparkle"
    sparkle5.style.left = (image_left+43)+"px"
    sparkle5.style.top = "405px"
    setTimeout(() => {
        document.body.appendChild(sparkle5)
    }, 300);

    let sparkle6 = document.createElement("img")
    sparkle6.src = require("./sparkle.webp")
    sparkle6.className = "sparkle"
    sparkle6.style.left = (image_left-178)+"px"
    sparkle6.style.top = "395px"
    setTimeout(() => {
        document.body.appendChild(sparkle6)
    }, 400);

    let sparkle7 = document.createElement("img")
    sparkle7.src = require("./sparkle.webp")
    sparkle7.className = "sparkle"
    sparkle7.style.left = (image_left-404)+"px"
    sparkle7.style.top = "563px"
    setTimeout(() => {
        document.body.appendChild(sparkle7)
    }, 500);

    let sparkle8 = document.createElement("img")
    sparkle8.src = require("./sparkle.webp")
    sparkle8.className = "sparkle"
    sparkle8.style.left = (image_left+149)+"px"
    sparkle8.style.top = "560px"
    setTimeout(() => {
        document.body.appendChild(sparkle8)
    }, 600);

    let sparkle9 = document.createElement("img")
    sparkle9.src = require("./sparkle.webp")
    sparkle9.className = "sparkle"
    sparkle9.style.left = (image_left+182)+"px"
    sparkle9.style.top = "701px"
    setTimeout(() => {
        document.body.appendChild(sparkle9)
    }, 700);

    let sparkle10 = document.createElement("img")
    sparkle10.src = require("./sparkle.webp")
    sparkle10.className = "sparkle"
    sparkle10.style.left = (image_left+62)+"px"
    sparkle10.style.top = "779px"
    setTimeout(() => {
        document.body.appendChild(sparkle10)
    }, 800);

    let sparkle11 = document.createElement("img")
    sparkle11.src = require("./sparkle.webp")
    sparkle11.className = "sparkle"
    sparkle11.style.left = (image_left-327)+"px"
    sparkle11.style.top = "792px"
    setTimeout(() => {
        document.body.appendChild(sparkle11)
    }, 900);

    return (
        <div id="christmas-div">
            <img id="christmas-img" src={require('./merry-christmas.jpg')}/>
        </div>
    )
}

export default Christmas