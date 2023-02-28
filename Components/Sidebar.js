import Head from 'next/head'
import Image from 'next/image'

import React, { useState, useEffect, useRef } from 'react';
import Info from './Info'



export default function Sidebar({venue, name, artist, time, price, bio, link}) {

    const [showEvent, setShowEvent] = useState(true)
    const [showPlaylist, setShowPlaylist] = useState(false)

    return (
        <div  className={styles.pageContainer}>
            {venue ? <div className={styles.Title}><h5>{venue}</h5></div> : <div>Click a venue on the map to start</div>}
            
            <div className={styles.buttonContainer}>
                <button className={styles.button}>Event</button>
                <button className={styles.button}>Live playlist</button>
            </div>

            <section className={styles.infoContainer}>
                <div className={styles.eventName}>{name}</div>
                <div className={styles.artists}>{artist}</div>
                    <div>
                        {time ? <div className={styles.span}>{price} | {time}</div> : <></>}
                    </div>
                <div className={styles.eventBio}>{bio}</div>
                {link ? <div className={styles.link}><Image src='/link_icon.png' height={20} width={25}/><a href={link}>More Info</a></div> : <></>}
            </section>
           
            
            {/* info component is conditionally rendered to be passed dynamic props set by state with event/playlist 'onClicks' */}
            {/* <Info venue ="MBC" name="Event name here" event="something somethig " /> */}
         
        </div>
    )
}

const styles = {
    pageContainer: "flex flex-col h-auto border-l-2 lg:w-[25vw] lg:h-contain text-center p-5",
    Title: "w-full h-auto text-2xl",
    buttonContainer: "flex items-center justify-center gap-8 mt-8 pb-8 border-b-2", 
    button: "rounded-full bg-blue-300 text-white p-2 px-5 items-center align-center text-center pb-2",
    infoContainer: "flex flex-col pt-3 px-2 text-left",
    eventName: "text-3xl py-3 mb-1",
    eventBio: "text-justify",
    artists: "text-2xl italic font-bold",
    span: "flex text-lg text-slate-400 my-6",
    link: "text-md font-bold text-black mt-12 flex gap-1"
}


