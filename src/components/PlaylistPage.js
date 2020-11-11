import PlayListSongDetail from './PlayListSongDetail';

import PropTypes from 'prop-types';
/* eslint-disable no-undef, no-unused-vars */

//displays the Playlist Page, takes one parameter, the OneList to be displayed
export default function PlaylistPage({ setMode, OneList }) {
    let currentPlaylist;
    if (OneList.playlist===undefined){
        currentPlaylist = <li></li>
    }
    else{
        currentPlaylist = OneList.playlist.map((song) => {
            console.log(song.title)
            return (
            <PlayListSongDetail key = {song.id} songDetails = {song}/>
        )});
    }
    //console.log(currentPlaylist);
    //console.log(OneList.playlist);

    return(
        //ADD LABELS TO EACH COMPONENT
        <div> 
            <h6 aria-label = "Event ID">{OneList.id}</h6>
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
    OneList : PropTypes.object.isRequired
}
