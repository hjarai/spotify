/*
  backend-utils.js

  Functions to initialize the database and add OneList and Song tables. 
*/

import knexConfig from '../../knexfile';
import knexInitializer from 'knex';
import { Model } from 'objection';
import OneList from '../../models/OneList';
import Song from '../../models/Song';

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