import Head from 'next/head'
import Image from 'next/image'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import Recenter from './Recenter'

import { Sidebar_props } from "../context/context";
import { useContext } from "react";
import { useRouter } from "next/router";

import { getEvents } from '@/Services/DailyEventsFetch'


import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const MBC = {
    type: "Feature",
    geometry: {
        type: "point",
        coordinates: [-33.91318, 151.17835]
    },
    properties: {
        venue_name: 'House of Music and Booze',
        event_name: 'Event name',
        artists: 'band 1, band 2, band 3',
        genre: 'pop',
        price: 'Free',
        time: '7:30',
        bio: 'A good band playing in sydney pub'
    }

}





export default function Map() {

  

    const {sidebarprops, setSidebarprops} = useContext(Sidebar_props)
    const [filter, setFilter] = useState("Rock")
    const [eventsArray, setEventsArray] = useState([])

    const [Position, setPosition] = useState([-33.8832, 151.2070])
    const [zoom, setZoom] = useState(13)

    const geolocationAPI = navigator.geolocation;
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    
// render markers for each GEOJSON object in fetched array 
    const renderVenues = function() {
        console.log(JSON.stringify(filter))
        
        eventsArray.map(venue => {if (JSON.stringify(venue.properties.genre) == JSON.stringify(filter)) 
                                    
                                       
                                            return 
                                            <div>hello</div>
                                        // <Marker onClick={() => console.log("hello")} position={venue.geometry.coordinates} icon={new Icon({iconUrl: '/favicon.ico', iconSize: [20, 20], iconAnchor: [12, 41]})} >  
                                        //     <Popup>
                                        //         {venue.properties.venue_name} <br /> [Picture here]  <br /> <strong><a target="_blank" href={`https://www.google.com/maps/search/${venue.properties.venue_name}`}>Get directions</a></strong> 
                                        //     </Popup>
                                        // </Marker>
                                            
        
                                
                                    
    })
    }
                                        
                                
    

    useEffect(() => {

    // getEvents().then((data) => {setEventsArray(data)})
    
    
        if (!geolocationAPI) {
          alert('Turn location on')
        } else {
          geolocationAPI.getCurrentPosition((position) => {
            const { coords } = position;
            setLat(coords.latitude);
            setLong(coords.longitude);
          }, (error) => {
            setError('Something went wrong getting your position!')
          })
        }
    },[])

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
        
        <div className={styles.myLocation} onClick={() => {setPosition([lat, long]); setZoom(17)}}><Image src='/location.png' height={30} width={30} /></div>

        <div className={styles.mainLogo} onClick={() => {setPosition([-33.8832, 151.2070]); setZoom(13)}}><Image src='/dayof_logo.png' height={50} width={100}/></div>

        <MapContainer attributionControl={false}  center={Position || [lat, long]} zoom={zoom} scrollWheelZoom={false}>
            <Recenter center={Position} zoom={zoom}/>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* display user location if switched */}
            <Marker position={[lat, long]} icon={new Icon({iconUrl: '/location2.png', iconSize: [25, 25], iconAnchor: [12, 25]})}>

            </Marker>

            <Marker 
                eventHandlers={{click: (e) => 
                    {setSidebarprops({venue: MBC.properties.venue_name, 
                                    name: MBC.properties.event_name,
                                    artist: MBC.properties.artists,
                                    time: MBC.properties.time,
                                    price: MBC.properties.price,
                                    bio: MBC.properties.bio,
                                    link: 'https://oztix.com.au'});
                    setPosition(MBC.geometry.coordinates)}
                                
                                }
                    } 
                position={MBC.geometry.coordinates} icon={new Icon({iconUrl: '/favicon.ico', iconSize: [20, 20], iconAnchor: [10, 20]})} >  
                    <Popup>
                        <div className={styles.popupTitle}>{MBC.properties.venue_name}</div> <br /> <div> <Image src='/mbc_image.jpeg' height={120} width={300}/> </div> <br /> <strong><a className={styles.popupLink} target="_blank" href={`https://www.google.com/maps/search/${MBC.properties.venue_name}`}>Get directions</a></strong> 
                    </Popup>
            </Marker>
            {eventsArray.map(venue => {if (JSON.stringify(venue.properties.genre) == JSON.stringify(filter)) 
                                    
                                       
                              
                                return <Marker onClick={() => console.log("hello")} position={venue.geometry.coordinates} icon={new Icon({iconUrl: '/favicon.ico', iconSize: [20, 20], iconAnchor: [10, 20]})} >  
                                //     <Popup>
                                //         <div className={styles.popupTitle}>{venue.properties.venue_name}</div> <br /> [Picture here]  <br /> <strong><a target="_blank" href={`https://www.google.com/maps/search/${venue.properties.venue_name}`}>Get directions</a></strong> 
                                //     </Popup>
                                // </Marker>
                                    

                        
                            
})}
            
        </MapContainer>


    </div>
) 
}
const styles = {
    filterReel: " font-text flex gap-2 no-scrollbar absolute bg-transparent bottom-10 left-0 right-0 z-50 overflow-x-scroll md:justify-center items-center px-2",
    logo: "cursor-pointer text-md w-fit rounded-full bg-white px-5 py-1 border-1 shadow-md my-2 border-black",
    mainLogo: "bg-transparent absolute top-5 right-10 md:right-16 z-50 h-contain w-contain",
    pageContainer: "relative h-contain lg:w-[75vw] sm:w-[100vw]",
    popupTitle: "text-xl",
    popupLink: "text-md pt-5",
    myLocation: "rounded-full p-1 absolute z-50 bottom-24 right-8 md:right-20 bg-white cursor-pointer",
}

