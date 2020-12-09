
import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Host.module.css';
//import Home from './index.js'; 
import Head from 'next/head';
import FileBase64 from 'react-file-base64';

import { 
    useSession
  } from 'next-auth/client'
 // import { useRouter } from 'next/router'; 

/* eslint-disable no-undef, no-unused-vars, react/self-closing-comp */

//assume setMode is what changes state to OneList page and Home page
//OneList is an object {title: , description:, image: , playlist:{}}
export default function HostPage({setMode, setUser, setOneListID}){
    const defaultImage = "./OneListLogo.png"; 
    const [eventTitle, setEventTitle] = useState();
    const [eventDescription, setEventDescription] = useState();
    const [eventDate, setEventDate] = useState(new Date().toDateString());
    const [eventImage, setEventImage] = useState(defaultImage);
    const [session, loading] = useSession();
    const [currentID] = useState();
    const [dateChanged, setDateChanged]  = useState(false); 
    const [userData, setUserData] = useState(); 
    
/*
    useEffect(()=>{
      const getOneLists = async() =>{
          const response = await fetch(`api/private/${session.user.email}`);
          if(response.ok){
              const data = await response.json();
              setUserData(data);
          }
      };
      getOneLists();
  }, [session]);

  */

// this prints a user's onelists if the user is in session. 
  
 if(session){
    const getOneLists = async() =>{
        const response = await fetch(`api/private/${session.user.email}`); // access the user spotify email. probably chage to spotify id. 
        if(response.ok){
            const data = await response.json();
            setUserData(data);
        }
    };
    getOneLists();
  }
 if(session){
   console.log(session.user.id); 
 }


    const OneList = {
        id : currentID,
        title : eventTitle,
        description : eventDescription,
        imagesrc: eventImage,
        date : eventDate, 
        host_spotify : userData
    }

    const addOneList = async () => {
      if (dateChanged) {
        const dates = eventDate.split('-');
        const formattedD = new Date(dates[0], dates[1] - 1, dates[2]).toDateString(); 
        OneList.date = formattedD;
      }

      const response = await fetch(`/api/onelists`,{
        method:'POST',
        body: JSON.stringify(OneList),
        headers: new Headers({'Content-type': 'application/json'}),
        });
      //error handling 
      if(!response.ok){
        throw new Error(response.statusText);
      }
      const onelistwithid = await response.json();
      // sets user with Spotify name if logged in or Host if not
      setUser(session ? session.user.name : 'Host');
      setMode((onelistwithid.id.toString()));
      }

      //trying out some image functionality
      const [fileData, setFileData] = useState();
      const [image, setImage] = useState();
    
      const handleImage = async () => {
        // make sure we have an image file
        if (/\.(jpe?g|png)$/i.test(fileData.name)) {
          // create our payload 
          const imageData = {
            name:fileData.name,
            image:fileData.base64
          }
    
          // send it to the server
          const response = await fetch('/api/image',{
            method:'POST',
            body:JSON.stringify(imageData),
              headers: new Headers({ 'Content-type': 'application/json' }),
          });
    
          if (response.ok){
            const data = await response.json();
            setImage(data.image);
            setEventImage('./uploads/'+imageData.name)
          }
        }
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
                    <input className = {styles.photoLabel} id="userImage" name="userImage" 
                        aria-label = "Import Image" type="button" value="Submit" onClick={handleImage} />
                     <FileBase64 multiple={false} onDone={setFileData} />

                  </div>
                  <div className={styles.currentUser}>
                  <p> {session && (<>
                 <small>Signed in as</small><br/>
                 <strong>{session.user.email || session.user.name}</strong><br/>
                 <small>Your oneLists</small><br/>
                 <small>{userData}</small>
                </>)}
                {!session && (<>
                {`Not signed in`}
              </>)}
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
                      onChange={(event) => {setEventDate(event.target.value); setDateChanged(true);}} />
                  </div>

                  {/* //all the buttons here */}
                  <button className={styles.EventButton} disabled={!eventTitle} onClick={() => addOneList()}>Create Event</button>
                  <button className={styles.EventButton} onClick={() => setMode()}>Cancel</button>
              </div>
    </div>
    );
}

HostPage.propTypes = {
  setMode : PropTypes.func,
  setUser: PropTypes.func,
  setOneListID: PropTypes.func
}

