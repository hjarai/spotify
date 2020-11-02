
import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

/* eslint-disable no-undef, no-unused-vars */

//assume setMode is what changes state to OneList page and Home page
//OneList is an object {title: , description:, image: , playlist:{}}
export default function CreationPage({ setMode }){
    const defaultImage = "/defaultImage.png";
    const [eventTitle, setEventTitle] = useState();
    const [eventDescription, setEventDescription] = useState();
    const [eventDate, setEventDate] = useState('2020-12-25');
    const [eventImage, setEventImage] = useState(defaultImage);
    const [currentID, setID] = useState(makeEventID());
  
      function makeEventID(){
        const S4 = function() {
          return ((Math.floor(Math.random()*10).toString())); 
        };
       return (S4()+S4()+S4()+S4()+S4()+S4());
      }

    
    const OneList = {
        id : currentID,
        title : eventTitle,
        description : eventDescription,
        image_path: ``,
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

                <img
                    src= {eventImage} width="150" height="150"/>
                
                <label htmlFor= "userImage">Choose a picture for your event: </label>
                <input id="userImage" name="userImage" aria-label = "Import Image" type="file" accept="image/*" multiple = {false} 
                    onChange={()=>setEventImage(document.getElementById('userImage'))}/> 
                    
            
            </div>

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
    );
}  

CreationPage.propTypes = {
    setMode : PropTypes.func
}

