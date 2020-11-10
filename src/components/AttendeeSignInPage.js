
import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

/* eslint-disable no-undef, no-unused-vars */

//assume setMode is what changes state to OneList page and Home page
export default function AttendeeSignInPage({ setMode }){
    const [eventId, seteventId] = useState();
    const [user, setUser] = useState();
    
    
    return(
        <div>
            <div>
                <textarea 
                    placeholder = "Enter Event ID"
                    value={eventId} 
                    onChange={(event)=>seteventId(event.target.value)}
                    />
            </div>
            <div>
                <textarea 
                    placeholder = "Enter a username"
                    value={user} 
                    onChange={(event)=>setUser(event.target.value)}
                    />
            </div>

        {/* //all the buttons here */}
        <button disabled={!eventId} onClick={() => setMode(eventId)}>Sign in</button>
        <button onClick={() => setMode()}>Cancel</button>
        </div>
    );
}  

AttendeeSignInPage.propTypes = {
    setMode : PropTypes.func
}

