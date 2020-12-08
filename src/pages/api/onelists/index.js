import nc from 'next-connect'; 
import { addOneList } from '../../../lib/backend-utils'; 
import { onError, cors } from '../../../lib/middleware'; 

const handler = nc ({onError})
.use(cors)
.post(async (req, res) => { // creates a new OneList 
    const newOneList = req.body; 
    const aOneList = await addOneList(newOneList);
    console.log("Just added " + aOneList.id)
    res.status(200).json(aOneList); 
});

export default handler; 

/* 
Sample Method in index.js Home()


   const sample = { 
     host_id: 1, 
     title: "Yellow Yabby",
     description: "Testing database",
     date : "12/07/2020",
     imagesrc: "someUrl", 
     spotify: "yellow@middlebury.edu",
   }

const addOneList = async (newlist) => {
 const response = await fetch(`/api/onelists`,{
   method:'POST',
   body: JSON.stringify(newlist),
   headers: new Headers({'Content-type': 'application/json'}),
   });
 //error handling 
 if(!response.ok){
   throw new Error(response.statusText);
   }
  }

  addOneList(sample); 
*/