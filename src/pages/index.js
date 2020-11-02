//import { useEffect, useState } from 'react';
import CreationPage from '../components/CreationPage';

import Head from 'next/head';

import {useState} from 'react';

import styles from '../styles/Home.module.css';

export default function Home() {
  
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
        <CreationPage/>
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}
