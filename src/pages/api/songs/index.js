import nc from 'next-connect'; 
import { addSong } from '../../../lib/backend-utils'; 
import { onError, cors } from '../../../lib/middleware'; 

const handler = nc ({onError})
.use(cors)
.post(async (req, res) => { // creates a new song
    const newsong = req.body; 
    const addedsong = await addSong(newsong); 
    res.status(200).json(addedsong); 
});

export default handler; 