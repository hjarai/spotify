import nc from 'next-connect';
import { onError, cors } from '../../../lib/middleware'; 
import { getPlaylist } from '../../../lib/backend-utils'; 

//gets the host's onelists, returns in form of an array containing oneList IDs 
const handler = nc({ onError }).use(cors)
.get(async (req, res) => {
    const { playlistonelist } = req.query;
    const data = await getPlaylist(playlistonelist);
       res.status(200).json(data); 
}); 

export default handler; 
