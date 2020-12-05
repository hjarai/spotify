import nc from 'next-connect';
import { getSession } from 'next-auth/client';
import { onError, cors } from '../../../lib/middleware'; 
import { getHostOneList, 
         getPlaylist, 
         addHost, 
         addOneList, 
         addSong
       } from '../../../lib/backend-utils'; 

       // get the host's user name from the data base with all its associated data, the onelists. 
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




/*
    if(session){
        const host = await getHostOneList()
        res.statusCode(200).json(getHostOneList(hostid)); // get all onelists
       
    }
    else{
        res.status(401)// not signed in, reject
    }
    res.end(); 

*/

export default handler; 