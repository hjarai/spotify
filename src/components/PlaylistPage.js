/*
  PlaylistPage.js

  Playlist Page component allows users to view the OneList of their event, votes on songs,
  and remove songs if they added them.  
*/

import PlayListSongDetail from './PlayListSongDetail';
import AddPage from './AddPage.js'
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {useSession} from 'next-auth/client';
import {addSongToPlaylist} from '../pages/api/Export.js';

//displays the Playlist Page, takes one parameter, the OneList to be displayed

export default function PlaylistPage({ OneListID, user, goHome}) {
    const [session] = useSession();
    const [OneList, setOneList] = useState({id:'', title:'', date: undefined, imagesrc:"/OnelistLogo.png"});
    const [playlist, setPlaylist] = useState();
    const [songsAdded, setSongsAdded] = useState([]); //songs added will hold list of songs added by the user 
    const [addMode, setAddMode] = useState(false);
    const [update, setUpdate] = useState(false);

   //fetch OneList details         
   useEffect(() => {
    const getOneList = async ( someID ) => {
        const response = await fetch(`/api/onelists/${someID}`);
        if (!response.ok) {
          //throw new Error(response.statusText);
          goHome();
          return setTimeout(() => {alert('Incorrect Event ID! Please try again.');}, 300);
        }
        const myOneList = await response.json();
        setOneList(myOneList); 
    };
    getOneList(OneListID); 
    }, [addMode, songsAdded]);

    //fetch playlist content
    useEffect(() => {
        const getPlaylist = async ( someID ) => {
            const response = await fetch(
                `/api/playlist/${someID}`, );
            if (!response.ok) {
            throw new Error(response.statusText);
            }
            const myPlaylist = await response.json();
            const sortedPlaylist = myPlaylist.sort((song1, song2) => (song2.vote - song1.vote)); 
            setPlaylist(sortedPlaylist);
            //if user is a host, make remove button appear on every song
            //if(user is a host){setSongsAdded(sortedPlaylist.map((song) => song.id))};
        };
        getPlaylist(OneListID);
    }, [addMode, songsAdded]);


    const removeSong = async ( someID ) => {
        const response = await fetch(
            `/api/songs/${someID}`,{method: 'DELETE'});
        if (!response.ok) {
        throw new Error(response.statusText);
        }
        const updatedPlaylist = songsAdded.filter(id=> id !== someID);
        setSongsAdded(updatedPlaylist);
    };

    //most updated version of the votes and rankings stored in the playlist state,
    // since the info in the db (what getplaylist returns) is asynchronous
    useEffect(()=>{
        if(playlist){
        const updated = playlist.map((song) => (song.id === update.id? update:song));
        setPlaylist(updated.sort((song1, song2) => (song2.vote - song1.vote)));
    }}, [update]);

    const currentPlaylistView = (playlist)? 
        playlist.map((song) => {
            return (<PlayListSongDetail key = {song.spotify_id} 
                                        songDetails = {song} 
                                        removeSong = {removeSong}
                                        songsAdded = {songsAdded}
                                        update = {update}
                                        setUpdate = {setUpdate}
                                        /> )})
        :<>Add some songs to get started on your OneList!</>;


    const share = () => {
        const shareText = `You are being invited to collaborate in the ${OneList.title} OneList!
    Use this link onelist.herokuapp.com with ID ${OneList.id}. Click OK to copy to your clipboard.`

        if (confirm(shareText)){
            const component = document.createElement('textarea');
            component.value = shareText;
            document.body.appendChild(component);
            component.select();
            document.execCommand('copy');
            document.body.removeChild(component);
        }
    }
    const exporter = {};
    const handleClickExport = () => {
        exporter.id = session.user.id;
        exporter.token = session.user.accessToken;
        addSongToPlaylist(exporter, OneListID);
    }
    
    return(
        //ADD LABELS TO EACH COMPONENT
        <div> 
            {(addMode)?
            <AddPage    setAddMode = {setAddMode} 
                        OneListID={OneListID} 
                        playlist={playlist} 
                        SongsAdded={songsAdded} 
                        setSongsAdded = {setSongsAdded} 
                        user={user}/>:
            <div>
            <h1 className="titlePlaylistPage"> Make Your Playlist Here </h1>
            <h4 aria-label = "Event ID" className="EventID">Event ID: {OneList.id}</h4>
            <h4 className="EventID">Signed in as: {user}</h4>
        <div className = "rightcolumn">
            <h1 aria-label = "Title">{OneList.title}</h1>
            <h2 aria-label = "Description">{OneList.description}</h2>
            <h3 aria-label = "Date">{OneList.date}</h3>
         </div>
        <div className = "leftcolumn">
            <img src = {OneList.imagesrc} width="200" height="200" />
        </div>
            <div className="PlaylistButtons">
            <button id = "AddSongsButton" onClick={() => setAddMode(true)}>Add Songs </button>
            <button id = "ExportSongsButton" onClick = { () => {
                handleClickExport();
                alert(`${OneList.title} was successfully exported to your Spotify!`);
            }} disabled = {!session}> Export</button>
            <button id = "InvitationLinkButton" onClick={() => share()}>Invite friends!</button>
            </div>
            <ul aria-label = "Playlist" id = "Playlist" className="playlistView">{currentPlaylistView}</ul>
            </div>
            
        }
        <button className="backButton" onClick = {() => goHome()}>Return to Home</button>
        </div>

    );

}

PlaylistPage.propTypes = {
    setMode : PropTypes.func,
    OneListID : PropTypes.string.isRequired,
    setSongDetails: PropTypes.func, 
    user: PropTypes.string, 
    goHome: PropTypes.func
}
