/*

  backend-utils.js

  This is a collection of utility functions to be called on the server backend. These functions
  interact directly with the database.
  
all the functions needed
    getOneList(OneList_id) - returns onelist associated with given id
    addOneList(OneList)
    addSong(song) - adds song
    removeSong(song_id) - removes song associated with onelist id
    upvoteSong(song_id) - 
    downvoteSong(song_id) -
  
*/

import knexConfig from '../../knexfile';
import knexInitializer from 'knex';
import { Model } from 'objection';
import OneList from '../../models/OneList';
//import Song from '../../models/Song';
//import Host from '../../models/Host';

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
export async function getOneList(OneList_id) {
  const OneList_data = await OneList.query(OneList_id); //maybe??

  return OneList_data;
}