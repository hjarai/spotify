

import nc from 'next-connect';
import { onError, cors } from '../../../lib/middleware'; 
import { getOneList } from '../../../lib/backend-utils'; 

       //gets onelist matching oneList ID 
const handler = nc({ onError }).use(cors)
.get(async (req, res) => {
    const { onelistid } = req.query;
    const data = await getOneList(onelistid);
    if(data === undefined){
      res.status(404).end(`There is no OneList associated with OneList ID  ${ onelistid }`);  
    }
    else{

      //return the onelist iD 
      res.status(200).json(data); 
    }
}); 

export default handler; 
/*


Sample usage index.js (Home)

    const onelistID  = 1
     const getOneList = async ( someID ) => {
     const response = await fetch(
       `/api/onelists/${someID}`,
     );
     if (!response.ok) {
       throw new Error(response.statusText);
     }
     const myOneList = await response.json();
     setOneList(myOneList); 
   
   }

   getOneList(onelistID);


*/











//The commented out code is what a playlist is, I got confused distinguishing a 
// onelist from a playlist
/*
import nc from 'next-connect';
import { onError, cors } from '../../../lib/middleware'; 
import { getPlaylist } from '../../../lib/backend-utils'; 

       //gets the host's onelists, returns in form of an array containing oneList IDs 
const handler = nc({ onError }).use(cors)
.get(async (req, res) => {
    const { onelistid } = req.query;
    console.log("This is onelist ID  " + onelistid);
    const data = await getPlaylist(onelistid);
    if(data.length === 0){
        console.log("In if ");
        res.status(404).end(`There are no songs associated with OneList ${ onelistid }`);  
    }
    else{
        console.log("In else ");
        console.log(data[0]);
       res.status(200).json(data); 
    }
}); 

export default handler; 

*/


/* 

Sample usage index.js (Home)

    const onelistID  = 1
     const getOneList = async ( someID ) => {
     const response = await fetch(
       `/api/onelists/${someID}`,
     );
     if (!response.ok) {
       throw new Error(response.statusText);
     }
     const myOneList = await response.json();
     setOneList(myOneList); 
   
   }

   getOneList(onelistID);


*/