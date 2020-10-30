import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

//assume setMode is what changes state to OneList page and Home page
//OneList is an object {title: , description:, image: , playlist:{}}
export default function CreationPage({ setMode }){
    const [eventTitle, setEventTitle] = useState('Default title');
    const [eventDescription, setEventDescription] = useState('Default descrip');
    const [eventDate, setEventDate] = useState();
    const [eventImage, setEventImage] = useState(/*defaultImage*/);
    const [eventId] = useState('5678');

    const OneList = {
        id : eventId,
        title : eventTitle,
        description : eventDescription,
        image_path: ``,
        playlist: [],
        date : eventDate,   
    }
    
    //put image in correct server folder using put 
    
    return(
        <div>
        <textarea 
            id = 'eventTitle'
            placeholder = 'Enter your event title'
            value={eventTitle} 
            onChange={(event)=>setEventTitle(event.target.value)}
            />

        <textarea 
            id = 'eventDescription'
            placeholder = 'Enter your event description'
            value={eventDescription} 
            onChange={(event)=>setEventDescription(event.target.value)}
            />
        
        <input type='date' value = {eventDate} 
            onChange={(event) => setEventDate(event.target.value)} />

        {/* // this doesnt work */}
        <img
            src={setEventImage.src} />

        <input type="file" accept="image/*" multiple = "false" />

        {/* //all the buttons here */}
        <button disabled={!eventTitle} onClick={() => setMode(OneList)}>Create</button>
        <button onClick={() => setMode()}>Cancel</button>
        </div>
    );
}  

CreationPage.propTypes = {
    setMode : PropTypes.func
}
