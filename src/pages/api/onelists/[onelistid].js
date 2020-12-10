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