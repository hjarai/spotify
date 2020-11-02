/* eslint-disable no-undef, no-unused-vars */
import Head from 'next/head';
import { useState } from 'react';
import CreationPage from '../components/CreationPage.js'
import styles from '../styles/Home.module.css';


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
  
  let pageContent;

  if (view === 'createOneList') {
    pageContent = (<CreationPage setMode = {setMode}/>);

  }  else {

    pageContent = (<>
      <h1 className="title">Welcome to OneList</h1>
      <button className="CreateOneListButton" onClick = {() => {setView('createOneList')}}>Create OneList</button> </>)
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
