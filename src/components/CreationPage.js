
import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

/* eslint-disable no-undef, no-unused-vars */

//assume setMode is what changes state to OneList page and Home page
//OneList is an object {title: , description:, image: , playlist:{}}
export default function CreationPage({ setMode }){
    const defaultImage = "/OnelistLogo.png";
    const [eventTitle, setEventTitle] = useState();
    const [eventDescription, setEventDescription] = useState();
    const [eventDate, setEventDate] = useState(new Date());
    const [eventImage, setEventImage] = useState(defaultImage);
   
  
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
                
                <label className = "photoLabel" htmlFor= "userImage" />
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

            <div >
                <label htmlFor="Date" />
                <input type="date" id ="eventDate" value = {eventDate} name = "Date" aria-label = "Date"
                    onChange={(event) => setEventDate(event.target.value)} />
            </div>

        {/* //all the buttons here */}
        <button id = "CreateDateButton" disabled={!eventTitle} onClick={() => setMode(OneList)}>Create</button>
        <button id = "CancelDateButton" onClick={() => setMode()}>Cancel</button>
        </div>
        </div>
    );
}  

CreationPage.propTypes = {
    setMode : PropTypes.func
}

