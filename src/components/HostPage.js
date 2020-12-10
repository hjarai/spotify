/*
  HostPage.js

  Host page component that users with Spotify accounts can use to create a new OneList
  by providing a title, description (optional), date (optional), and image (optional)
  and generates a new default playlist and unique Event ID. 
*/

import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Host.module.css';
import Head from 'next/head';
import FileBase64 from 'react-file-base64';
import { signIn, useSession} from 'next-auth/client'

export default function HostPage({setMode, setUser}){
  const defaultImage = "./OneListLogo.png"; 
  const [eventTitle, setEventTitle] = useState();
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(new Date().toDateString());
  const [eventImage, setEventImage] = useState(defaultImage);
  const [session] = useSession();
  const [currentID] = useState();
  const [dateChanged, setDateChanged]  = useState(false); 
  const [userID, setUserID] = useState("anonymous"); 
  const [fileData, setFileData] = useState();
    
  useEffect(()=>{
    const getSession = () =>{
      const userSession = session ? session.user.id : "anonymous";
      setUserID(userSession); 
    };
    getSession(); 
  }, [session]);

  const OneList = {
      id : currentID,
      title : eventTitle,
      description : eventDescription,
      imagesrc: eventImage,
      date : eventDate, 
      host_spotify : userID
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
 
  const handleImage = async () => {
    // make sure we have an image file
    if (fileData===undefined) {
      alert('Please select a file.');
    } else if (/\.(jpe?g|png)$/i.test(fileData.name)) {
      // create our payload 
      const imageData = {
        name:fileData.name,
        image:fileData.base64,
        id:Date.now()
      }

      //figure out suffix
      const header = (imageData.image.split(","))[0];
      const suffix = header.slice(11,header.indexOf(';'));

      // send it to the server
      const response = await fetch('/api/image',{
        method:'POST',
        body:JSON.stringify(imageData),
          headers: new Headers({ 'Content-type': 'application/json' }),
      });

      if (response.ok){
        setEventImage(`./uploads/${imageData.id}.${suffix}`);
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
                  <label className = "photoLabel" htmlFor= "userImage"/>
                  <input className = {styles.photoLabel} id="userImage" name="userImage" 
                      aria-label = "Import Image" type="button" value="Upload Image" onClick={handleImage} />
                  <FileBase64 multiple={false} onDone={setFileData} />
                </div>
                <div className={styles.currentUser}>
                <p> {session && (<>
                <small>Signed in as</small><br/>
                <strong>{session.user.email || session.user.name}</strong><br/>
                </>)}
                  {!session && (<>
                  {`Not signed in`} <br/>
                  <a href={`/api/auth/signin`}
                    className = {styles.currentUser}
                    onClick={(e) => {
                    e.preventDefault()
                    signIn() }} >
                    Sign in
                </a>  
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

              <button className={styles.EventButton} disabled={!eventTitle || !session} onClick={() => addOneList()}>Create Event</button>
              <button className={styles.EventButton} onClick={() => setMode()}>Cancel</button>
          </div>
    </div>
  );
}

HostPage.propTypes = {
  setMode : PropTypes.func,
  setUser: PropTypes.func,
}

