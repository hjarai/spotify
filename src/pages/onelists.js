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
                <main>
                    <div className="mainHeader">
                        <img className = "headerLogo" src= "OnelistLogoSmall.png"/>
                     </div>     
                    <h4> Please login to view your OneLists </h4>
                    <Link href="./">
                    <button className="CreateOneListButton">Back</button>
                    </Link>
                </main>
            </div>
        );
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
        {` OneList ID: ${   onelist.id  }  Title: ${  onelist.title}`} </li>)

if(onelists!==0){ // return onelists
    return (
        <div className={styles}>
            <Head>
                <title>
                    Your OneLists
                </title>
            </Head>
            <main>
                    <div className="mainHeader">
                        <img className = "headerLogo" src= "OnelistLogoSmall.png"/>
                     </div>     
            
                <h1 > Your OneLists </h1>
                <p> {onelists}</p>
                <Link href="./">
                <button className="CreateOneListButton">Back</button>
                </Link>
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
                <h1 > There are no OneLists to display </h1>
            </main>
        </div>
    );
}   }