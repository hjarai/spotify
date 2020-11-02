

import Head from 'next/head';
import { useState } from 'react';
import CreationPage from '../components/CreationPage.js'
import styles from '../styles/Home.module.css';
//import { createEvent } from '@testing-library/react';

export default function Home() {

  const [currentMode, setMode] = useState("");

  let pageContent;

  if (currentMode === 'createOneList') {
    pageContent = (<CreationPage />);

  }  else {

    pageContent = (<>
      <h1 className="title">Welcome to OneList</h1>
      <button className="CreateOneListButton" onClick = {() => {setMode('createOneList')}}>Create OneList</button> </>)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome Page</title>
      </Head>
      <main>
        {pageContent}
      </main>
      <footer> CS 312 Final Project: OneList</footer>
    </div>
  );
}
