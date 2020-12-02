/* eslint-disable no-undef, no-unused-vars, no-use-before-define, prefer-const*/

import PlayListSongDetail from './PlayListSongDetail';

import PropTypes from 'prop-types';
import { useState } from 'react';
import { render } from 'react-dom';



//displays the Playlist Page, takes one parameter, the OneList to be displayed

export default function PlaylistPage({ setMode, OneList, setSongDetails, user}) {


    //const [songsAdded, setSongsAdded] = useState(); songs added will hold list of songs added by the user 
   
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
    function removeSong(songToRemoveTitle){

        // console.log("hey im about to do stuff in removeSong");
        // console.log("song to remove --> ", songToRemoveTitle);
       
        // console.log("CURRENT  ", currentPlaylist);
        
        //let element = OneList.playlist.indexOf(songToRemoveTitle);
        // console.log("index --> ", OneList.playlist.indexOf((song) => {song.songToRemoveTitle}));
        // const updatedList = currentPlaylist.filter((song)=>{
        //     return song.key !== songToRemoveTitle;
        // });
        
        // console.log("UPDATED LIST ->  ", updatedList);

        // currentPlaylist = [...updatedList];
        let list = document.getElementById("Playlist");
            list.removeChild(list.childNodes[0]);
            
          
    }

    const share = () => {
        const shareText = `You are being invited to collaborate in the 
            ${OneList.title} OneList! Use this link onelist.herokuapp.com with ID
            ${OneList.id}`

        if (confirm(shareText)){
            const component = document.createElement('textarea');
            component.value = shareText;
            document.body.appendChild(component);
            component.select();
            document.execCommand('copy');
            document.body.removeChild(component);
        }
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

            <ul aria-label = "Playlist" id = "Playlist">{currentPlaylist}</ul>

            <button onClick={() => setMode('AddPage')}>Add Songs </button>
            <button>Export</button>
            <button onClick={() => share()}>Copy Invitation Link</button>
        </div>

    );

}

PlaylistPage.propTypes = {
    setMode : PropTypes.func,
    OneList : PropTypes.object.isRequired,
    setSongDetails: PropTypes.func, 
    user: PropTypes.string
}
