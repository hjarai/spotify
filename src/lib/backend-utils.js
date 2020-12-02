/*

  backend-utils.js

  This is a collection of utility functions to be called on the server backend. These functions
  interact directly with the database.
  
all the functions needed
    getOneList(onelistid) - returns onelist associated with given id
    addOneList(onelist)
    addSong(song) - adds song to list of songs, adds song id to associated onelist
    removeSong(songid) - removes song associated with onelist id
    upvoteSong(songid) - adds upvote
    removeUpvoteSong(songid) - removes upvote
    downvoteSong(songid) - adds downvote
    removeUpvoteSong(songid) - removes downvote
    addHost(host) - adds new host
    getHostOneList - returns onelist id associated with given host id
    getPlaylist(onelistid) - returns all the songs with the same OneList id
  
*/

import knexConfig from '../../knexfile';
import knexInitializer from 'knex';
import { Model } from 'objection';
import OneList from '../../models/OneList';
import Song from '../../models/Song';
import Host from '../../models/Host';

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


/**
 * Add new upvote to onelist in data store
 * 
 * returns new upvote count
 */
export async function upvoteSong(songid) {
  const songdata = await Song.query().findById(songid); 
  const votedata = await Song.query().patchAndFetchById(songid, {up: 1+(songdata.up)});
  return votedata;
}

/**
 * Add new downvote to onelist in data store
 * 
 * returns new downvote count
 */
export async function downvoteSong(songid) {
  const songdata = await Song.query().findById(songid); 
  const votedata = await Song.query().patchAndFetchById(songid, {down: 1+(songdata.down)});
  return votedata;
}


/**
 * Remove one upvote to onelist in data store
 * 
 * returns new of upvote count
 */
export async function removeUpvoteSong(songid) {
  const songdata = await Song.query().findById(songid); 
  const votedata = await Song.query().patchAndFetchById(songid, {up: 0+(songdata.up)-1});
  return votedata;
}

/**
 * Remove one downvote to onelist in data store
 * 
 * returns new of downvote count
 */
export async function removeDownvoteSong(songid) {
  const songdata = await Song.query().findById(songid); 
  const votedata = await Song.query().patchAndFetchById(songid, {down: 0+(songdata.down)-1});
  return votedata;
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
export async function getHostOneList(hostid) {
  const hostdata = await OneList.query().where({host_id: hostid}).select('id');
  return hostdata;
}

/**
 * get songs associated with a single OneList
 * 
 * returns array of songs
 */
export async function getPlaylist(onelistid) {
  const playlistdata = await Song.query().where({onelist_id: onelistid});
  return playlistdata;
}