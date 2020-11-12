
import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

/* eslint-disable no-undef, no-unused-vars */

//assume setMode is what changes state to OneList page and Home page
export default function AttendeeSignInPage({ setMode, user, setUser }){
    const [eventId, seteventId] = useState();
    
    return(
        <div>
            <h1> Sign in to your OneList! </h1>
            <div>
                <h2> Event ID </h2>
                <textarea 
                    aria-label = "EventId"
                    placeholder = "Enter 6-digit Event ID"
                    value={eventId} 
                    onChange={(event)=>seteventId(event.target.value)}
                    />
            </div>
            <div>
                <h2> Username </h2>
                <textarea 
                    aria-label = "User"
                    placeholder = "Enter a username"
                    value={user} 
                    onChange={(event)=>setUser(event.target.value)}
                    />
            </div>

        {/* //all the buttons here */}
        <button
            disabled={!eventId || eventId.length!==6} 
            onClick={() => setMode(eventId)}>
                Sign In
            </button>
        <button 
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

