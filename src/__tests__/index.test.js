/* eslint-disable no-unused-vars, prefer-const */
/*
 Tests of our top-level component. 
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreationPage from '../components/CreationPage';
import fetchMock from "fetch-mock-jest";

import Home from '../pages/index';


describe('Top level integration tests', () => {
  test('First test', () => {
      return undefined;
  });
});

describe('Home Page Tests', () => {
  /*
  beforeEach(async () => {
    fetchMock.get('/api/${...nextauth}',()=>{
        return null
    });
    */

  test('Initially renders home view', ()=>{

    render(<Home />);
    expect(screen.queryByText("Welcome to OneList: The Perfect Playlist For Social Events")).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Create OneList' })).toBeInTheDocument(); 
    expect(screen.queryByRole('button', { name: 'Join OneList' })).toBeInTheDocument(); 
   });

  

});
