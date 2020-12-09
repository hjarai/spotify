import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useSession } from 'next-auth/client';
import { useState, useEffect } from 'react';
import Link from 'next/link';



export default function OneLists(){
    const [session, loading] = useSession();
    const [userData, setUserData] = useState([]); 
    if(loading){
        return null; 
    }

    // renders if the user is not logged in
    if(!loading && !session){

        return (
            <div>
            
            <div>
            You must login to view onelists

            </div>
            <div>
            <Link href="./">
            <a>Link to homepage</a>
          </Link>
            </div>
            
            </div>
            
        )

    }

    // this is only executed when the user is logged in

    useEffect(()=>{
        const getOneLists = async() =>{
            const response = await fetch(`api/private/${session.user.id}`);
            if(response.ok){
                const data = await response.json();
                setUserData(data);
            }
        };
        getOneLists();
    }, [session]);
    // prints the lists of onelists with their IDs
   const onelists =  userData.map((onelist) => <li key={onelist.id}>
   
   {" OneList ID: " +  onelist.id + "  Title: " + onelist.title}</li>)




if(onelists !==0){ // return onelists
    return (
        <div >
            <Head>
                <title>
                    Your OneLists
                </title>
            </Head>

            <main className = {styles.main}>
                <h1 > Your oneLists </h1>
               
                <p> 
                     {onelists}
                </p>

                <div>         
                <Link href="./">
            <a>Link to homepage</a>
          </Link>
          </div>

            </main>
        </div>
    );
}
else{ // return message if no section is selected
    return (
        <div >
            <Head>
                <title>
                    Your OneLists
                </title>
            </Head>

            <main className = {styles.main}>
                <h1 > There are no onelists to display </h1>

            </main>
        </div>
    );
}
        
}