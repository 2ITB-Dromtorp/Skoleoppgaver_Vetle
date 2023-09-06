import React, { useState, useEffect } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';


export default function DigitalClock(){

    const [isExploding, setIsExploding] = React.useState(false);

    const[time, setTime] = useState(new Date)
    
    let hh = time.getHours()
    let mm = time.getMinutes()
    let ss = time.getSeconds()

    if (hh < 10){
        hh = "0" + time.getHours()
    } else {
        hh = time.getHours()
    }
    if (mm < 10){
        mm = "0" + time.getMinutes()
    } else {
        mm = time.getMinutes()
    }
    if (ss < 10){
        ss = "0" + time.getSeconds()
    } else {
        ss = time.getSeconds()
    }
    if (ss == 0){
        setIsExploding(true);
    }
    else {
        setIsExploding(false);
    }

    useEffect(() => {
        const myInterval = setInterval(() =>{
            setTime(new Date)
        }, 250)
        return () =>  clearInterval(myInterval);
    })

    return(
        <div className="App">
            <header className="App-header">
                <h1>Klokke</h1>
                <p>{hh}:{mm}:{ss}</p>
                {isExploding && <ConfettiExplosion />}
            </header>
        </div>
    )
}