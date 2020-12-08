import nc from 'next-connect';
//import { getSession } from 'next-auth/client';
import { onError, cors } from '../../../lib/middleware'; 
import { getPlaylist } from '../../../lib/backend-utils'; 

       //gets the host's onelists, returns in form of an array containing oneList IDs 
const handler = nc({ onError }).use(cors)
.get(async (req, res) => {
    const { playlistonelist } = req.query;
    //console.log("This is onelist ID  " + playlistonelist);
    const data = await getPlaylist(playlistonelist);
    if(data.length === 0){
        //console.log("In if ");
        res.status(404).end(`There are no songs associated with OneList ${ playlistonelist }`);  
    }
    else{
        //console.log("In else ");
        //console.log(data[0]);
       res.status(200).json(data); 
    }
}); 

export default handler; 


/* 

Sample usage index.js (Home)

const onelistID = 1; 
     const getOneList = async ( someID ) => {
     const response = await fetch(
       `/api/playlistonelist/${someID}`,
     );
     if (!response.ok) {
       throw new Error(response.statusText);
     }
     const myOneList = await response.json();
     setOneList(myOneList); 
   
   }

   getOneList(onelistID);


*/