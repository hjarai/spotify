
/* eslint-disable no-undef, no-unused-vars */
import Head from 'next/head';
import { useState } from 'react';

//import CreationPage from '../components/CreationPage.js';
//changed from CreationPage to Host Page
import HostPage from './HostPage.js';
//import AddPage from '../components/AddPage.js'
import PlaylistPage from '../components/PlaylistPage.js';
import Login from '../components/login.js'
import styles from '../styles/Home.module.css';
//import data from '../../data/songs.json';
//import onelistData from '../../data/onelists.json';
import AttendeeSignInPage from '../components/AttendeeSignInPage.js';
//import OneList from '../../models/OneList.js';

export default function Home() {
  const [view, setView] = useState('home');
  const [oneListID, setOneListID] = useState();
  // const [searchTerm, setSearchTerm] = useState('');
  // const [sortType, setSortType] = useState('title');
  // const [songs] = useState(data);
  // const [queue,setQueue] = useState([]);
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

  // const setSongDetails = (voteA) => {
  //   const currentPlaylist = oneList.playlist.map((song) => 
  //     {
  //       if (song.id===voteA[0]){
  //         song.upvote += voteA[1];
  //         song.downvote += voteA[2];
  //         return song;
  //       }
  //       else{
  //         return song;
  //       } 
  //     }
  //   );
  //   const currentOneList = {...oneList};
  //   currentOneList.playlist = currentPlaylist;
  //   currentOneList.playlist = currentOneList.playlist.sort((song1,song2)=>{
  //     const song1sum = (song1.upvote) + (song1.downvote);
  //     const song2sum = (song2.upvote) + (song2.downvote);
  //     if (song1sum > song2sum){
  //       return -1;
  //     }
  //     else if (song1sum === song2sum){
  //       return 0;
  //     }
  //     else{
  //       return 1;
  //     }
  //   })
  //   setOneList(currentOneList);
  // }
  
  const pageContent = (view === 'createOneList')? <HostPage setMode = {setMode} setUser={setUser}/>
    :(view === 'attendeeSignIn')? <AttendeeSignInPage setMode = {setMode} user={user} setUser={setUser}/>
    :(view === 'OneList')? <PlaylistPage setMode = {setMode} OneListID = {oneListID} user={user}/>
    // :(view === 'AddPage')? <AddPage setMode = {setMode} OneListID={oneListID} user={user}/>
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
        <p className="description">  Continue modifying your OneLists for your events.</p>
        <Login Host Login/>
        
      </div>
    </div>

  return (
    <div className={styles.container}>
      <Head>
        <title>OneList Home</title>
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
