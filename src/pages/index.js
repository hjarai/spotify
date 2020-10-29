import { useEffect, useState } from 'react';

import Head from 'next/head';

import styles from '../styles/Home.module.css';
import { createEvent } from '@testing-library/react';

export default function Home() {
  //useState to switch pages ?
  /*
  const[] = useState();


  */
  
  function createEvent(){

  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Welcome to OneList</h1>
        <p>Hooray, you got the project deployed!</p>
        <p>Now go and give it some content...</p>
        <button className="CreateOneListButton" onClick = {() => {createEvent()}} >Create OneList</button>
      </main>

      <footer> CS 312 Final Project: OneList</footer>
    </div>
  );
}
