/*

  backend-utils.js

  This is a collection of utility functions to be called on the server backend. These functions
  interact directly with the database.
  
all the functions needed
    getOneList(onelistid) - returns onelist associated with given id
    addOneList(onelist)
    addSong(song) - adds song to list of songs, adds song id to associated onelist
    removeSong(songid) - removes song associated with onelist id
    changeupvote(songid, value) - change upvote count to value
    changedownvote(songid, value) - change downvote count to value
    addHost(host) - adds new host
    getHostOneList(email) - returns onelist id associated with given host id
    getPlaylist(onelistid) - returns all the songs with the same OneList id
  
*/

import knexConfig from '../../knexfile';
import knexInitializer from 'knex';
import { Model } from 'objection';
import OneList from '../../models/OneList';
import Song from '../../models/Song';
// import Host from '../../models/Host';

export const knex = knexInitializer(
  knexConfig[process.env.TESTING || process.env.NODE_ENV || 'development']
);

// Bind all Models to a knex instance.
Model.knex(knex);


/**
 * Find relevant OneList with user id
 *
 * returns relevant OneList
 */
export async function getOneList(onelistid) {
  const onelistdata = await OneList.query().findById(onelistid); 
  return onelistdata;
}

/**
 * Add new onelist to data store
 *
 * returns OneList with a new id attached
 */
export async function addOneList(onelist) {
  const onelistdata = await OneList.query().insertAndFetch(onelist); 
  return onelistdata;
}

/**
 * Add new song to onelist in data store
 * 
 * returns song with new id attatched
 */
export async function addSong(song) {
  const songdata = await Song.query().insertAndFetch(song); 
  return songdata;
}

// /**
//  * Change value of upvote to onelist in data store
//  * 
//  * returns new upvote count
//  */
// export async function changeupvote(songid, value) {
//   const votedata = await Song.query().patchAndFetchById(songid, {up: value});
//   return votedata;
// }

// /**
//  * Change value of downvote to onelist in data store
//  * 
//  * returns new downvote count
//  */
// export async function changedownvote(songid, value) {
//   const votedata = await Song.query().patchAndFetchById(songid, {down: value});
//   return votedata;
// }

/**
 * Change song value with songid
 * 
 * returns number of changed songs
 */
export async function updateSong(song) {
  const newsong = await Song.query().patch(song).findById(song.id);
  return newsong;
}


/**
 * delete song in a onelist in data store
 * 
 * returns new playlist
 */
export async function deleteSong(songid) {
  const songdata = await Song.query().deleteById(songid);
  return songdata;
}


/**
 * add new host to data store
 * 
 * returns host with new id attached
 */
export async function addHost(host) {
  const hostdata = await Host.query().insertAndFetch(host); 
  return hostdata;
}


/**
 * get onelist ids associated with hostid
 * 
 * returns array of onelist ids
 */
/*
export async function getHostOneList(hostid) {
  const hostdata = await OneList.query().where({host_id: hostid}).select('id');
  return hostdata;
} */

/**
 * get onelist ids associated with host emai;
 * 
 * returns array of onelist ids
 */
// export async function getHostOneList(email) {
//   //const hostemail = await Host.query().where({spotify: email});
//   const hostdata = await OneList.query().where({host_spotify: email});
//   return hostdata;
// }

/**
 * get songs associated with a single OneList
 * 
 * returns array of songs
 */
export async function getPlaylist(onelistid) {
  const playlistdata = await Song.query().where({onelist_id: onelistid});
  return playlistdata;
}


/**
 * get onelist ids associated with host hostSpotifyID;
 * 
 * returns array of onelist ids
 */
export async function getHostOneList(hostSpotifyID) {
//const hostemail = await Host.query().where({spotify: email});
const hostdata = await OneList.query().where({host_spotify: hostSpotifyID});
 return hostdata;
 }