import nc from 'next-connect'; 
import { addHost } from '../../../lib/backend-utils'; 
import { onError, cors } from '../../../lib/middleware'; 

const handler = nc ({onError})
.use(cors)
.post(async (req, res) => { // creates a new host 
    const newhost = req.body; 
    const host = await addHost(newhost); 
    res.status(200).json(host); 
});

export default handler; 
