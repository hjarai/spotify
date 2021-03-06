

import nc from 'next-connect';
import { onError, cors } from '../../../lib/middleware'; 
import { getHostOneList
       } from '../../../lib/backend-utils'; 

       //gets the host's onelists, returns in form of an array containing oneList IDs 
const handler = nc({ onError }).use(cors)
.get(async (req, res) => {
    const { hostid } = req.query;
    const data = await getHostOneList(hostid);
    if(data.length === 0){
        res.status(404).end(`There are no onelists associated with host ${ hostid }`);  
    }
    else{
       res.status(200).json(data); 
    }
}); 

export default handler; 