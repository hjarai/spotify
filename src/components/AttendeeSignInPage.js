/*
  AttendeeSignInPage.js

  Attendee page component that allows users without Spotify accounts to enter a username and 
  Event ID to contribute to a OneList. setMode is the arg that changes state to 
  OneList page and Home page. 
*/

import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function AttendeeSignInPage({ setMode, user, setUser }){
    const [eventId, seteventId] = useState();
    
    return(
        <div className="AttendeeMain">
            <h1 className="AttendeePageTitle"> Sign in to your OneList! </h1>
            
                <h2> Event ID </h2>
                <textarea 
                    className= "Attendee"
                    aria-label = "EventId"
                    placeholder = "Enter Event ID"
                    value={eventId} 
                    onChange={(event)=>seteventId(event.target.value)}
                    />
                <h2> Username </h2>
                <textarea 
                    className= "Attendee"
                    aria-label = "User"
                    placeholder = "Enter a username"
                    value={user} 
                    onChange={(event)=>setUser(event.target.value)}
                    />
        
        {/* //all the buttons here */}
        <button className="AttendeeButton"
            disabled={!eventId} 
            onClick={() => setMode(eventId)}>
                Sign In
            </button>
        <button className="AttendeeButton"
            onClick={() => setMode()}>
                Cancel
            </button>
        </div>
    );
}  

AttendeeSignInPage.propTypes = {
    setMode : PropTypes.func.isRequired,
    user : PropTypes.string,
    setUser : PropTypes.func
}

