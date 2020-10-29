/* eslint-disable no-unused-vars, prefer-const */
/*
 Tests of our top-level component. 
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import Home from '../pages/index';


describe('Top level integration tests', () => {
  test('First test', () => {
      return undefined;
  });
});

describe.skip('Home Page Tests', () => {

  test('Initially renders home view', ()=>{

    render(<Home />);
    expect(screen.queryByText("Welcome to OneList")).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'CreateOneListButton' })).toBeInTheDocument(); 
   });

  test('Clicking button functionality for creating OneList', () =>{
      render(<Home />);
      fireEvent.click(screen.queryByText('Create OneList'));
      let homePage = screen.queryByText("Welcome to OneList");
      expect(homePage).not.toBeInTheDocument();
      expect(screen.queryByText("Unique ID:")).toBeInTheDocument();
      

  });

});
