import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import AudioPlayer from 'react-modern-audio-player';
import "./ChristmasThreeD.css"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ChristmasThreeD() {
    /*// setting up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // loading in the 3d model
    const loader = new GLTFLoader();

    loader.load( 'christmas_snow_globe.glb', function ( gltf ) {

        scene.add( gltf.scene );

    }, function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	}, function ( error ) {
        console.error( error );
    } );

    function animate() {
        renderer.render( scene, camera ); 
    }
    
    renderer.setAnimationLoop( animate );*/
    const playList = [
        {
          name: 'name',
          writer: 'writer',
          img: 'logo192.png',
          src: 'test.mov',
          id: 1,
        },
      ]

    const navigate = useNavigate();

    const calculateTimeLeft = () => {
        const now = new Date();
        const newYear = new Date(now.getFullYear() + 1, 0, 1);
        const timeDifference = newYear.getTime() - now.getTime();

        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
            navigate("/what+day+is+it+today/1+1+2025")
        }

        let dd = ""+days;
        if (days < 10) {
            dd = "0"+days;
        }
        let hh = ""+hours
        if (hours < 10) {
            hh = "0"+hours;
        }
        let mm = ""+minutes
        if (minutes < 10) {
            mm = "0"+minutes;
        }
        let ss = ""+seconds
        if (seconds < 10) {
            ss = "0"+seconds;
        }

        return { dd, hh, mm, ss };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div id='spotify-div'>
            <div id="playlist-header"> 
                <iframe id="model" title="Snow Globe" allow="autoplay; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share width="640" height="480" src="https://sketchfab.com/models/2a1d3a693c054d6483557b0bf54746e3/embed?transparent=1&autospin=1&autostart=1&camera=0&preload=1&ui_hint=0&dnt=1&ui_stop=0&annotation_tooltip_visible=0&annotations_visible=0"> </iframe>
                <div id="playlist-title-countdown">
                    <div id="playlist-title">
                        2025 Countdown
                    </div>
                    <div id="playlist-countdown">
                        {timeLeft.dd}:{timeLeft.hh}:{timeLeft.mm}:{timeLeft.ss}
                    </div>
                </div>
            </div>
            <AudioPlayer 
                playList={playList}
                audioInitialState={{
                    curPlayId: 1,
                }}
                activeUI={{
                    playButton: true,
                    prevNnext: true,
                    volume: true,
                    volumeSlider: true,
                    repeatType: true,
                    trackTime: true,
                    trackInfo: true,
                    artwork: false,
                    progress:"bar"}}
                rootContainerProps={{
                    colorScheme: "dark"
                }} />
        </div>
    )
}

export default ChristmasThreeD