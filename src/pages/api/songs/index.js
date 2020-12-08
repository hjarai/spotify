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


/*
sample code in index.js Home()

const sampleSong = {
    onelist_id: 1;,
    title: "My song",
    artist: "Me",
    up: "0",
    down: "0", 
    username: "user", 
    spotify: "yellow@middlebury.edu" if this fails try : spotify: "song @middlebury.edu"
                                    cos the way the model it implimented it wants a unique spotify 

}


const addSong = async (newSong) => {
  const response = await fetch(`/api/songs`,{
    method:'POST',
    body: JSON.stringify(newSong),
    headers: new Headers({'Content-type': 'application/json'}),
    });
  //error handling 
  if(!response.ok){
    throw new Error(response.statusText);
    }
   }

   addSong(sampleSong); 

*/