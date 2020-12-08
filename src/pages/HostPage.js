
import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Host.module.css';
//import Home from './index.js'; 
import Head from 'next/head';

import { 
   
    signOut,
    useSession
  } from 'next-auth/client'
 // import { useRouter } from 'next/router'; 

/* eslint-disable no-undef, no-unused-vars, react/self-closing-comp */

//assume setMode is what changes state to OneList page and Home page
//OneList is an object {title: , description:, image: , playlist:{}}
export default function HostPage({setMode}){
    const defaultImage = "./OnelistLogo.png";
    const [eventTitle, setEventTitle] = useState();
    const [eventDescription, setEventDescription] = useState();
    const [eventDate, setEventDate] = useState(new Date());
    const [eventImage, setEventImage] = useState(defaultImage);
    const [session, loading] = useSession();
    const [currentID, setID] = useState();
       
    const OneList = {
        id : currentID,
        title : eventTitle,
//      hostid : host should be logged in
        description : eventDescription,
        imagesrc: eventImage,
        //playlist: [],
        date : eventDate,   
//      spotify : spotify playlist id
    }

    const addOneList = async (newlist) => {
      const response = await fetch(`/api/onelists`,{
        method:'POST',
        body: JSON.stringify(newlist),
        headers: new Headers({'Content-type': 'application/json'}),
        });
      //error handling 
      if(!response.ok){
        throw new Error(response.statusText);
        }

        const onelistwithid = await response.json();
        setID(onelistwithid.id);
      }

    const complete = function (){
      addOneList(OneList);
      setMode(currentID); 
    }

    return(
     <div className={styles}>
          <Head>
            <title>Event Creation Page</title>
          </Head>
          <main>
            <div className="mainHeader">
              <img className = "headerLogo" src= "OnelistLogoSmall.png"/>
           </div>
               <h1 className="titleCreationPage">Create Your Event Here</h1>
            
          </main>
            <div className={styles.leftcolumn}>
                  <div id={styles.eventImage}>
                    <img src= {eventImage} width="200" height="200"/>
                    <label className = "photoLabel" htmlFor= "userImage"></label>
                    <input className = {styles.photoLabel} id="userImage" name="userImage" aria-label = "Import Image" type="file" accept="image/*" multiple = {false} 
                         onChange={()=>setEventImage( URL.createObjectURL(event.target.files[0]))} /> 
                  </div>

                  <div className={styles.currentUser}>
                  <p> {session && <>
                <span>
                 <small>Signed in as</small><br/>
                 <strong>{session.user.email || session.user.name}</strong>
                </span>
                <a
                  href={`/api/auth/signout`}
                  onClick={(e) => {
                  e.preventDefault()
                  signOut()
                  }} > Sign out 
                  </a>
                </>}
                  {!session && <>
                  {`/index`}
                </>}
              </p>
          </div>

            </div>
          
            <div className={styles.rightcolumn}>
                <textarea 
                    id = {styles.eventTitle}
                    aria-label = "Title"
                    name = "Title"
                    placeholder = "Enter your event title"
                    value={eventTitle} 
                    onChange={(event)=>setEventTitle(event.target.value)}
                    />
                <div>
                  <textarea 
                    id = {styles.eventDescription}
                    name = "Description"
                    aria-label = "Description"
                    placeholder = "Enter your event description"
                    value={eventDescription} 
                    onChange={(event)=>setEventDescription(event.target.value)}
                    />
                </div>

                  <div>
                    <label htmlFor="Date" />
                    <input type="date" id = {styles.eventDate} value = {eventDate} name = "Date" aria-label = "Date"
                      onChange={(event) => setEventDate(event.target.value)} />
                  </div>

                  {/* //all the buttons here */}
                  <button className={styles.EventButton} disabled={!eventTitle} onClick={() => complete()}>Create Event</button>
                  <button className={styles.EventButton} onClick={() => setMode()}>Cancel</button>
              </div>
          <footer className={styles.footer}> CS 312 Final Project: OneList</footer>
    </div>
    );
}

HostPage.propTypes = {
  setMode : PropTypes.func
}

