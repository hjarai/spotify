// uncomment to enable routing 

import { signIn, signOut, useSession } from 'next-auth/client'

import styles from './login.module.css'
import { useRouter } from 'next/router'; 
export default function Login () {

  const [session, loading] = useSession();
  const router = useRouter(); 
  /*
  if(session){
 router.push('./HostPage')
  }
  */

  return (

      <div >
       <p>
          {session && <>
            <span className={styles.signedInText}>
              <small>Signed in as</small><br/>
              <strong>{session.user.email || session.user.name}</strong>
              </span>
            <a
                href={`/api/auth/signout`}
                className = {styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
          </>}
          {!session && <>
            <span className={styles.notSignedInText}>You are not signed in</span>
            <a href={`/api/auth/signin`}
              className = {styles.button}
              onClick={(e) => {
              e.preventDefault()
              signIn() }} >
              Sign in
              </a>
          </>}
          </p>

      </div>

  )
}









/*
// wihout routing 

import { signIn, signOut, useSession } from 'next-auth/client'
import {useState} from 'react'; 

import styles from './login.module.css'

export default function Login () {

  const [session] = useSession();
  const  [member, setMember] = useState(false); 


// this functions checks whether a user has already signed up for oneList. 
// sets member to true if the person has used oneList before, false otherwise. 


  const gethost = async ( hostEmail ) => {
    const response = await fetch(
      `/api/existinghost/${hostEmail}`,
    );
    if (!response.ok) {
      throw new Error(response.statusText); // means the member does not exist 
    
    }
    const newhost = await response.json(); // member exists 
    if (newhost.length !==0){
      setMember(true); 
    }
    }
  
  
// creates a new host using the email/spotify email the user used to login. SHould be spotify ID I guess cos we now have it 
  const addHost = async (newhost) => { 
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

  if (session){
    const host = { spotify: session.user.email};  // sample data 

    const name = session.user.email;
    
    const host2 = { spotify: "yellow@midd.edu" }
    const name2 = "yellow@midd.edu"; 

    gethost(name.spotify);

    if(!member){
      addHost(host); // adds the host if the host does not exist yet 
    }

  }

  




 
  return (

      <div >
        <p >
          {!session && <>
           
            <a href={`/api/auth/signin`}
              className = {styles.button}
              onClick={(e) => {
              e.preventDefault()
              signIn() }} >
              Sign in
              </a>
          </>}
          {session && <>

            <span className={styles.signedInText}>
              <small>Signed in as</small><br/>
              <strong>{session.user.email || session.user.name}</strong>
              </span>
            <a
                href={`/api/auth/signout`}
                className = {styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
          </>}
        </p>
      </div>

  )
}



 



*/












/*
import nc from 'next-connect';
//import { getSession } from 'next-auth/client';
import { onError, cors } from '../../../lib/middleware'; 
import { getHost } from '../../../lib/backend-utils'; 

       //gets the host's onelists, returns in form of an array containing oneList IDs 
const handler = nc({ onError }).use(cors)
.get(async (req, res) => {
    const { hostemail } = req.query;
   // console.log("This is email" + hostemail);
    const data = await getHost(hostemail);
    if(data.length === 0){

        //res.status(200).json(data); 
        res.status(404).end(`There is no onelit associated with OneList ID  ${ hostemail }`);  
    }
    else{
       // console.log("The  name spotify " + data[0].spotify); 
       res.status(200).json(data); 
    }
}); 

export default handler; 

*/