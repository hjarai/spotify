/* eslint-disable no-undef, no-unused-vars, no-use-before-define, prefer-const*/

import PlayListSongDetail from './PlayListSongDetail';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { render } from 'react-dom';
import {getSession} from 'next-auth/client';
import {addSongToPlaylist} from '../pages/api/Export.js';

//displays the Playlist Page, takes one parameter, the OneList to be displayed

export default function PlaylistPage({ setMode, OneList, setSongDetails, user}) {
    const [session, setSession] = useState();
    useEffect(() => {
        const checkSession = async ()=>{
            const newSession = await getSession();
            setSession(newSession)
        }
        if (!session){
        checkSession();
                }
            });
    //const [songsAdded, setSongsAdded] = useState(); songs added will hold list of songs added by the user 
    const currentOneList = {...OneList};

    let currentPlaylistView;
    if (currentOneList.playlist === undefined){
        currentPlaylistView = <></>
    }
    else{
        currentPlaylistView = currentOneList.playlist.map((song) => {
            return ( 
            <PlayListSongDetail key = {song.title} songDetails = {song} setSongDetails = {setSongDetails} removeSong = {removeSong}/> 
        )});
    }
    function removeSong(removedSongTitle){
        const updatedPlaylist = currentOneList.playlist.filter((song)=> {
            return song.title !== removedSongTitle;
        });
        currentOneList.playlist = updatedPlaylist
        setMode(currentOneList);
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
    const handleClickExport = () => {
        exporter.id = session.user.id;
        exporter.token = session.user.accessToken;
        addSongToPlaylist(exporter);
    }
    
    return(
        //ADD LABELS TO EACH COMPONENT
        <div> 
            <h1 className="titlePlaylistPage"> Make Your Playlist Here </h1>
            <h4 aria-label = "Event ID" className="EventID">Event ID: {OneList.id}</h4>
        <div className = "rightcolumn">
            <h1 aria-label = "Title">{OneList.title}</h1>
            <h2 aria-label = "Description">{OneList.description}</h2>
            <h3 aria-label = "Date">{OneList.date}</h3>
         </div>
        <div className = "leftcolumn">
            <img src = {OneList.image_path} width="200" height="200" />
        </div>
            <div className="PlaylistButtons">
            <button id = "AddSongsButton" onClick={() => setMode('AddPage')}>Add Songs </button>
            <button id = "ExportSongsButton" onClick = {handleClickExport}> Export</button>
            <button id = "InvitationLinkButton" onClick={() => share()}>Invite friends!</button>
            </div>
            <ul aria-label = "Playlist" id = "Playlist">{currentPlaylistView}</ul>
        </div>

    );

}

PlaylistPage.propTypes = {
    setMode : PropTypes.func,
    OneList : PropTypes.object.isRequired,
    setSongDetails: PropTypes.func, 
    user: PropTypes.string
}
