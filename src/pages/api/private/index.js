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


/*
Sample Code index.js Home()

const host = { 
    host_id: 2000, // this was meant for testing, otherwise ID should self increment
    spotify: "trial3@middlebury.edu"}; 



const addition = async (newhost) => {
 const response = await fetch(`/api/private`,{
   method:'POST',
   body: JSON.stringify(newhost),
   headers: new Headers({'Content-type': 'application/json'}),
   });
 //error handling 
 if(!response.ok){
   throw new Error(response.statusText);
   }
  }

  addition(host); 



*/