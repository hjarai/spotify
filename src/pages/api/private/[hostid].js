

import nc from 'next-connect';
//import { getSession } from 'next-auth/client';
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




/*
Sample Code index.js Home()

const hostid = 1; 
 
  const gethost = async ( someID ) => {
  const response = await fetch(
    `/api/private/${someID}`,
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const newhost = await response.json();

}

gethost(hostid);

*/

export default handler; 