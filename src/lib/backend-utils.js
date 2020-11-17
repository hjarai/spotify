import knexConfig from '../../knexfile';
import knexInitializer from 'knex';

export const knex = knexInitializer(
  knexConfig[process.env.TESTING || process.env.NODE_ENV || 'development']
);

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



/**
 * Find relevant OneList with user id
 *
 * returns relevant OneList
 */
export async function getOneList(OneList_id) {
  const OneList = await knex('OneList').select(OneList_id);
  return(OneList);
}
