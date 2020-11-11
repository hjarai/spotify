
/* eslint-disable no-undef, no-unused-vars */
import Head from 'next/head';
import { useState } from 'react';
import CreationPage from '../components/CreationPage.js'
import AddPage from '../components/AddPage.js'
import PlaylistPage from '../components/PlaylistPage.js';
import Login from '../components/login.js'

import styles from '../styles/Home.module.css';

import SearchBar from '../components/SearchBar.js';

import data from '../../data/songs.json';

import SongResults from '../components/SongResults.js';

import Queue from '../components/Queue.js';

export default function Home() {
  const [view, setView] = useState('home');
  const [oneList, setOneList] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('title');
  const [songs] = useState(data);
  const [queue,setQueue] = useState([]);

  const setMode = (OneList) => {
    //need another if statement to transition from home component to creation page
    if (OneList === undefined) {
      setView('home')
      }
    
    else if (OneList === OneList) {
      setView('OneList'); 
      setOneList(OneList);
        }
    else if (OneList === 'AddPage') {
      setView('AddPage')
      }
    };
  
  let pageContent;

  if (view === 'createOneList') {
    pageContent = (<CreationPage setMode = {setMode}/>);

  }  else if (view === 'OneList') {
    pageContent = (<PlaylistPage setMode = {setMode} OneList = {oneList} />)

  } else if (view === 'AddPage'){

    pageContent = (<AddPage />);
  } else {

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
      <div>
      {pageContent}
      </div>
      <div>
        <Login>
          Host Login
        </Login>
      </div>
        
      </main>
      <footer> CS 312 Final Project: OneList</footer>
    </div>
  );
}
