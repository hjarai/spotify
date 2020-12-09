// This portion to be updated after talking to the people who made the data base 
// to see how this functions that seem similar can be implimented. 

// I think instead of having these functions we could have the the properties of the song
// updated client side, then we just use one put method that updates the song // 
// think about how we update film ratings 


import nc from 'next-connect';
import { onError, cors } from '../../../lib/middleware'; 
import { deleteSong,
         updateSong,
       } from '../../../lib/backend-utils'; 
 
const handler = nc({ onError }).use(cors)
.put(async (req, res) => {
    const { id } = req.query;
    const newSong = req.body;
    const count = await updateSong(newSong);
    if (count === 0) {
      res.status(404).end(`song with id ${id} not found`);
    } else {
      res.status(200).json(count);
    }
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


