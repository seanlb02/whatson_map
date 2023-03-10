import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../Components/Sidebar'
import Info from '../Components/Info'

import { Sidebar_props } from "../context/context";
import { useContext } from "react";
import { useRouter } from "next/router";


const Map = dynamic(
  () => import('Components/Map'), // replace '@components/map' with your component's location
  { ssr: false } // This line is important. It's what prevents server-side render
)


export default function Home() {  

  const {sidebarprops} = useContext(Sidebar_props)

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Setlist App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap" rel="stylesheet"></link>
      </Head>


      <Map className={styles.map}/>
      <div className={styles.sidebarContainer}>
          <Sidebar className={styles.sidebar} venue={sidebarprops.venue} name={sidebarprops.name} artist={sidebarprops.artist} time={sidebarprops.time} price={sidebarprops.price} bio={sidebarprops.bio} link={sidebarprops.link}/>
      </div>
    </div>
  )
} 

const styles = {
  pageContainer: "flex flex-col lg:flex lg:flex-row w-[100vw] h-[100vh]",
  map: "flex lg:w-[100vw] lg:h-[100vh]",
  sidebar: "flex",
  sidebarContainer: "flex flex-col",
}
