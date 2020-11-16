/* eslint-disable no-undef, no-unused-vars */

import PlayListSongDetail from './PlayListSongDetail';

import PropTypes from 'prop-types';
import { useState } from 'react';



//displays the Playlist Page, takes one parameter, the OneList to be displayed
export default function PlaylistPage({ setMode, OneList, setSongDetails, user}) {

    //const [songsAdded, setSongsAdded] = useState(); songs added will hold list of songs added by the user 
   
    function removeSong(){
        // deletes song from database   
    }

    let currentPlaylist;
    if (OneList.playlist === undefined){
        currentPlaylist = <></>
    }
    else{
        currentPlaylist = OneList.playlist.map((song) => {
            return ( 
            <PlayListSongDetail key = {song.title} songDetails = {song} setSongDetails = {setSongDetails} removeSong = {removeSong}/> 
        )});
    }
    
    return(
        //ADD LABELS TO EACH COMPONENT
        <div> 
            <h6 aria-label = "Event ID">Event ID: {OneList.id}</h6>
            <h6> Signed in as: {user} </h6>
            <h1 aria-label = "Title">{OneList.title}</h1>
            <h2 aria-label = "Description">{OneList.description}</h2>
            <h3 aria-label = "Date">{OneList.date}</h3>
            <img src = {OneList.image_path} width="150" height="150" />
            <ul aria-label = "Playlist">{currentPlaylist}</ul>
            <button onClick={() => setMode('AddPage')}>Add Songs </button>
            <button>Export</button>
        </div>

    );

}

PlaylistPage.propTypes = {
    setMode : PropTypes.func,
    OneList : PropTypes.object.isRequired,
    setSongDetails: PropTypes.func, 
    user: PropTypes.string
}
