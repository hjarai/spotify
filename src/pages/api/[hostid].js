import nc from 'next-connect';
import { getSession } from 'next-auth/client';

const handler = nc().get(async (req, res) => {
    const { hostid } = req.query; 
    const session = await getSession({ req }); 
    if(session){
        res.statusCode(200).json(getHostOneList(hostid)); // get all onelists
       
    }
    else{
        res.status(401)// not signed in, reject
    }
    res.end(); 

}); 

export default handler; 