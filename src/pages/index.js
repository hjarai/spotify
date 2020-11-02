//import { useEffect, useState } from 'react';
import CreationPage from '../components/CreationPage';

import Head from 'next/head';

import {useState} from 'react';

import styles from '../styles/Home.module.css';

/* eslint-disable no-undef, no-unused-vars */

export default function Home() {
  const [view, setView] = useState('home');
  const [oneList, setOneList] = useState();


  const setMode = (OneList) => {
    //need another if statement to transition from home component to creation page
    if (OneList === undefined) {
      setView('home')
      }
    else {
      setView('OneList'); 
      setOneList(OneList);
        }
    };

  return (
    <div className={styles.container}>
      <Head>
        <title>Final Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Final Project</h1>
        <p>Hooray, you got the project deployed!</p>
        <p>Now go and give it some content...</p>
        <CreationPage setMode={setMode}/>
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}
