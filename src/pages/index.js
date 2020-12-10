
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import HostPage from './HostPage.js';
import PlaylistPage from '../components/PlaylistPage.js';
import Login from '../components/login.js'
import styles from '../styles/Home.module.css';
import AttendeeSignInPage from '../components/AttendeeSignInPage.js';

export default function Home() {
  const [view, setView] = useState('home');
  const [oneListID, setOneListID] = useState();
  const [user, setUser] = useState();
  
  const setMode = (param) => {
    //need another if statement to transition from home component to creation page
    if (param === undefined) {
      setView('home')
      }
    else if (param === 'AddPage') {
      setView('AddPage');
    } else {
      //param is OneListID
      setOneListID(param);
      setView('OneList');    
    }
  };

  const goHome = () => {
    setUser();
    setView('home');
  }
  
  const pageContent = (view === 'createOneList')? <HostPage setMode = {setMode} setUser={setUser}/>
    :(view === 'attendeeSignIn')? <AttendeeSignInPage setMode = {setMode} user={user} setUser={setUser}/>
    :(view === 'OneList')? <PlaylistPage OneListID = {oneListID} user={user} goHome={goHome}/>
    :<div> 
      <div className="mainDescriptionAndButtonsHome">

        <h1 className="title">Welcome to OneList: The Perfect Playlist For Social Events</h1>
        <h1 className="description"> Need music for an event?</h1>
        <p className="description"> Your friends and guests can collaborate with you.</p>
        <p className="description"> Create a OneList where everyone can add songs and choose the best ones!</p>
        <button className="CreateOneListButton" onClick = {() => {setView('createOneList')}}>Create OneList</button> 
        <h1 className="description"> Invited to an event?</h1>
        <p className="description">  Add your own music to the OneList of that event using your EventID.</p>
        <button className="JoinOneListButton" onClick = {() => {setView('attendeeSignIn')}}>Join OneList</button> 
        <h1 className="description"> Already a host?</h1>
        <Link href="./onelists">
        <button className="CreateOneListButton" >View your current OneLists</button>
        </Link>
        <Login Host Login/>
        
      </div>
    </div>

  return (
    <div className={styles.container}>
      <Head>
        <title>OneList Home</title>
        <link rel="icon" href="/defaultImage.png" />
      </Head>
      <main>
      <div className="mainHeader">
        <img className = "headerLogo" src= "OnelistLogoSmall.png"/>
        </div>

      <div>
      {pageContent}
      </div>
         
      </main>
      <footer> CS 312 Final Project: OneList</footer>
    </div>
  );
}
