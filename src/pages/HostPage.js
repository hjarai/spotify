
import React from 'react';
import { useState } from 'react';
import styles from '../styles/Host.module.css';
import Home from './index.js'; 
import { 
   
    signOut,
    useSession
  } from 'next-auth/client'
 // import { useRouter } from 'next/router'; 

/* eslint-disable no-undef, no-unused-vars */

//assume setMode is what changes state to OneList page and Home page
//OneList is an object {title: , description:, image: , playlist:{}}
export default function HostPage(){
    const defaultImage = "./OnelistLogo.png";
    const [eventTitle, setEventTitle] = useState();
    const [eventDescription, setEventDescription] = useState();
    const [eventDate, setEventDate] = useState('2020-12-25');
    const [eventImage, setEventImage] = useState(defaultImage);
    const [session, loading] = useSession();
    //const router = useRouter(); 
   
  
      function makeEventID(){
        const S4 = function() {
          return ((Math.floor(Math.random()*10).toString())); 
        };
       return (S4()+S4()+S4()+S4()+S4()+S4());
      }
    
    const [currentID, setID] = useState(makeEventID());

    

    
    const OneList = {
        id : currentID,
        title : eventTitle,
        description : eventDescription,
        image_path: eventImage,
        playlist: [],
        date : eventDate,   
    }

    const setMode = function (item){
        console.log(item); 
    }

    return(
        <div>
            <div>
            <div>
                <div className="EventID">
                    <p className="EventText"> Event ID:</p>
                    <p className="ID">{currentID}</p>     
                </div>
            </div>
            <div className="leftcolumn">

                <img
                    src= {eventImage} width="200" height="200"/>
                
                <label className = "photoLabel" htmlFor= "userImage"></label>
                <input className = "photoLabel" id="userImage" name="userImage" aria-label = "Import Image" type="file" accept="image/*" multiple = {false} 
                    onChange={()=>setEventImage( URL.createObjectURL(event.target.files[0]))}/>  
           
            
            </div>
            </div>
            <div className="rightcolumn">
            <div>
                <textarea 
                    id = "eventTitle"
                    aria-label = "Title"
                    name = "Title"
                    placeholder = "Enter your event title"
                    value={eventTitle} 
                    onChange={(event)=>setEventTitle(event.target.value)}
                    />
            </div>

            <div>

                <textarea 
                    id = "eventDescription"
                    name = "Description"
                    aria-label = "Description"
                    placeholder = "Enter your event description"
                    value={eventDescription} 
                    onChange={(event)=>setEventDescription(event.target.value)}
                    />

            </div>

            <div>
                <label htmlFor="Date" />
                <input type="date" value = {eventDate} name = "Date" aria-label = "Date"
                    onChange={(event) => setEventDate(event.target.value)} />
            </div>

        {/* //all the buttons here */}
        <button disabled={!eventTitle} onClick={() => setMode(OneList)}>Create</button>
        <button onClick={() => setMode()}>Cancel</button>
        </div>
        <div>
        <p>
        {session && <>
            <span >
              <small>Signed in as</small><br/>
              <strong>{session.user.email || session.user.name}</strong>
              </span>
            <a
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
          </>}

          {!session && <>
         {`/index`}
          </>}
        </p>
        </div>
        </div>
    );
}

