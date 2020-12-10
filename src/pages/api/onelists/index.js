import nc from 'next-connect'; 
import { addOneList } from '../../../lib/backend-utils'; 
import { onError, cors } from '../../../lib/middleware'; 

const handler = nc ({onError})
.use(cors)
.post(async (req, res) => { // creates a new OneList 
    const newOneList = req.body; 
    const aOneList = await addOneList(newOneList);
    res.status(200).json(aOneList); 
});

export default handler; 