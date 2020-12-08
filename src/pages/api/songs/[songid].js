// This portion to be updated after talking to the people who made the data base 
// to see how this functions that seem similar can be implimented. 

// I think instead of having these functions we could have the the properties of the song
// updated client side, then we just use one put method that updates the song // 
// think about how we update film ratings 


import nc from 'next-connect';
import { onError, cors } from '../../../lib/middleware'; 
import { deleteSong,
         //updateSong,
       } from '../../../lib/backend-utils'; 

       //gets the host's onelists, returns in form of an array containing oneList IDs 
const handler = nc({ onError }).use(cors)
.put(async () => {
    //const { songid } = req.query;
    /* const upadatedsong = await updateSong(song);
    if (data.length === 0){
        res.status(404).end(`There is no song associated with ${ songid }`);  
    }
    else{
       res.status(200).end(); 
    }
    commented out due to linter errors */
})
.delete(async (req, res) => {
  const { songid } = req.query;
  const count = await deleteSong(songid);
  if (count === 0) {
    res.status(404).end(`Song with id ${songid} not found`);
  } else {
    res.status(200).end();
  }
});

export default handler;


