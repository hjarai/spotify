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

describe.skip('Home Page Tests', () => {
  /*
  beforeEach(async () => {
    fetchMock.get('/api/${...nextauth}',()=>{
        return null
    });
    */

  test('Initially renders home view', ()=>{

    render(<Home />);
    expect(screen.queryByText("Welcome to OneList")).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Create OneList' })).toBeInTheDocument(); 
    expect(screen.queryByRole('button', { name: 'Join OneList' })).toBeInTheDocument(); 
   });

  test('Clicking button functionality for creating OneList', () =>{
      render(<Home/>);
      let homePage = screen.queryByText("Welcome to OneList");
      fireEvent.click(screen.queryByText('Create OneList'));
      expect(homePage).not.toBeInTheDocument();
      expect(screen.queryByText("Event ID:")).toBeInTheDocument();
      

  });

});
