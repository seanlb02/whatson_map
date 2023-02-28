import Head from 'next/head'
import Image from 'next/image'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

import { Sidebar_props } from "../context/context";
import { useContext } from "react";
import { useRouter } from "next/router";


import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const MBC = {
    type: "Feature",
    geometry: {
        type: "point",
        coordinates: [-33.91264495487523, 151.17839381534336]
    },
    properties: {
        venue_name: 'House of Music and Booze',
        event_name: 'charli cxc',
        genre: 'pop',
        price: 'Free',
        bio: 'good singer playing in sydney pub'
    }

}

const initialPosition = [-33.8832, 151.2070]



export default function Map() {

    const {sidebarprops, setSidebarprops} = useContext(Sidebar_props)
    const [filter, setFilter] = useState("")
    const [eventsArray, setEventsArray] = useState([])
    
// render markers for each GEOJSON object in fetched array 
    const renderVenues = function() {
        eventsArray.map(venue => {if(venue.properties.genre == `${filter}`)
                                    {
                                        return(
                                        <Marker onClick={() => console.log("hello")} position={venue.geometry.coordinates} icon={new Icon({iconUrl: '/favicon.ico', iconSize: [20, 20], iconAnchor: [12, 41]})} >  
                                            <Popup>
                                                {venue.properties.venue_name} <br /> [Picture here]  <br /> <strong><a target="_blank" href={`https://www.google.com/maps/search/${venue.properties.venue_name}`}>Get directions</a></strong> 
                                            </Popup>
                                        </Marker>
                                        )
                                    }})
    }

    // useEffect(() => {

    // getEvents().then((data) => {setEventsArray(data)})

    // },[])

return (
    <div className={styles.pageContainer}>
        <div className={styles.filterReel}>
            <div className={styles.logo} onClick={() => setFilter("Rock")}>Rock</div>
            <div className={styles.logo} onClick={() => setFilter("Pop")}>Pop</div>
            <div className={styles.logo} onClick={() => setFilter("Rap")}>Rap</div>
            <div className={styles.logo} onClick={() => setFilter("Dance")}>Dance</div>
            <div className={styles.logo} onClick={() => setFilter("Indie")}>Indie</div>
            <div className={styles.logo} onClick={() => setFilter("Country")}>Country</div>
            <div className={styles.logo} onClick={() => setFilter("Soul")}>Soul/Funk</div>
            <div className={styles.logo} onClick={() => setFilter("Comedy")}>Comedy</div>
        </div>

        <div className={styles.mainLogo}><Image src='/dayof_logo.png' height={50} width={100}/></div>

        <MapContainer attributionControl={false}  center={initialPosition} zoom={13} scrollWheelZoom={false}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            <Marker 
                eventHandlers={{click: (e) => 
                    {setSidebarprops({venue: MBC.properties.venue_name, 
                                    name: MBC.properties.event_name,
                                    bio: MBC.properties.bio,
                                    link: 'https://oztix.com.au'})}}
                    } 
                position={MBC.geometry.coordinates} icon={new Icon({iconUrl: '/favicon.ico', iconSize: [20, 20], iconAnchor: [12, 41]})} >  
                    <Popup>
                        <div className={styles.popupTitle}>{MBC.properties.venue_name}</div> <br /> <div> <Image src='/mbc_image.jpeg' height={120} width={300}/> </div> <br /> <strong><a className={styles.popupLink} target="_blank" href={`https://www.google.com/maps/search/${MBC.properties.venue_name}`}>Get directions</a></strong> 
                    </Popup>
            </Marker>
            {renderVenues}
        </MapContainer>


    </div>
)
}
const styles = {
    filterReel: "flex gap-2 no-scrollbar absolute bg-transparent bottom-10 left-0 right-0 z-50 overflow-x-scroll md:justify-center items-center",
    logo: "cursor-pointer text-md w-fit rounded-full bg-white px-5 py-1 pb-2 border-1 shadow-md my-2 border-black",
    mainLogo: "bg-transparent absolute top-5 right-16 z-50 h-contain w-contain",
    pageContainer: "relative h-contain lg:w-[75vw] sm:w-[100vw]",
    popupTitle: "text-xl",
    popupLink: "text-md pt-5"
}

