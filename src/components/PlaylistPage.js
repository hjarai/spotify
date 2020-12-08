/* eslint-disable no-undef, no-unused-vars, no-use-before-define, prefer-const*/

import PlayListSongDetail from './PlayListSongDetail';
import AddPage from './AddPage.js'
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { render } from 'react-dom';
import {useSession} from 'next-auth/client';
import {addSongToPlaylist} from '../pages/api/Export.js';


//displays the Playlist Page, takes one parameter, the OneList to be displayed

export default function PlaylistPage({ OneListID, user}) {
    const [session] = useSession();
    const [OneList, setOneList] = useState({id:'', title:'', date: undefined, image_path:"/OnelistLogo.png"});
    const [playlist, setPlaylist] = useState();
    const [songsAdded, setSongsAdded] = useState([]); //songs added will hold list of songs added by the user 
    const [addMode, setAddMode] = useState(false);
    
    /* causing lots of errors in test
    //session management
    useEffect(() => {
        const checkSession = async ()=>{
            const newSession = await getSession();
            setSession(newSession)
        }
        if (!session){
        checkSession();
        }
    });
    */

   //fetch OneList details         
   useEffect(() => {
    const getOneList = async ( someID ) => {
        const response = await fetch(`/api/onelists/${someID}`);
        if (!response.ok) {
          throw new Error(response.statusText);
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
            setPlaylist(myPlaylist); 
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



    /* 
    const setSongDetails = (voteA) => {
        const currentPlaylist = oneList.playlist.map((song) => 
        {
            if (song.id===voteA[0]){
            song.upvote += voteA[1];
            song.downvote += voteA[2];
            return song;
            }
            else{
            return song;
            } 
        }
        );
        const currentOneList = {...oneList};
        currentOneList.playlist = currentPlaylist;
        currentOneList.playlist = currentOneList.playlist.sort((song1,song2)=>{
        const song1sum = (song1.upvote) + (song1.downvote);
        const song2sum = (song2.upvote) + (song2.downvote);
        if (song1sum > song2sum){
            return -1;
        }
        else if (song1sum === song2sum){
            return 0;
        }
        else{
            return 1;
        }
        })
        setOneList(currentOneList);
    } */

    const currentPlaylistView = (playlist)? 
        playlist.map((song) => {
            return (<PlayListSongDetail key = {song.spotify_id} 
                                        songDetails = {song} 
                                        removeSong = {removeSong}
                                        songsAdded = {songsAdded}/> )})
        :<></>;


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
            <img src = {OneList.image_path} width="200" height="200" />
        </div>
            <div className="PlaylistButtons">
            <button id = "AddSongsButton" onClick={() => setAddMode(true)}>Add Songs </button>
            <button id = "ExportSongsButton" onClick = {handleClickExport}> Export</button>
            <button id = "InvitationLinkButton" onClick={() => share()}>Invite friends!</button>
            </div>
            <ul aria-label = "Playlist" id = "Playlist">{currentPlaylistView}</ul>
            </div>
        }
        </div>

    );

}

PlaylistPage.propTypes = {
    setMode : PropTypes.func,
    OneListID : PropTypes.string.isRequired,
    setSongDetails: PropTypes.func, 
    user: PropTypes.string
}
