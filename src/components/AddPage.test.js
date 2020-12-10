/*
  AddPage.test.js

  Collection of tests for all functionalities of AddPage.
*/

import AddPage from './AddPage.js';
import { render, screen, fireEvent } from '@testing-library/react';

const song = {title: "Mo Bamba", artist:["Sheck Wes"]};

describe('Top level integration tests', () => {

  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
  });

  test("Search bar is visible and empty when rendered", ()=>{
    render(<AddPage OneListID="0"/>);
    const searchInput = screen.getByRole('textbox', { name: 'title' });
    expect(searchInput).toHaveValue("");
  });

  test("Search Bar displays song when given keywords by title",()=>{
    render(<AddPage OneListID="0"/>);
    const searchInput = screen.getByRole('textbox', { name: 'title' });
    expect(searchInput).toHaveValue("");
    fireEvent.change(searchInput, { target: { value: "Mo Bamba" } });
    expect(screen.getByDisplayValue(song.title)).toBeInTheDocument();
  });
  
  test("Search Bar displays song when given keywords by artist",()=>{
    render(<AddPage OneListID="0" />);
    const searchInput = screen.getByRole('textbox', { name: 'title' });
    const dropdownInput = screen.getByRole('combobox', { name: 'dropdown' });
    //grab the selct itself like the above, and then change the value like above
    expect(searchInput).toHaveValue("");
    expect(dropdownInput).toHaveValue("track");

    fireEvent.change(dropdownInput, { target: { value: "artist" } });  
    fireEvent.change(searchInput, { target: { value: "Sheck Wes" } });
      
    expect(dropdownInput).toHaveValue("artist");
  });
  
  test("When Search Bar is non-matching term, output is 'No Results Found'", async()=>{
    render(<AddPage OneListID="0"/>);
    const searchInput = screen.getByRole('textbox', { name: 'title' });
    expect(searchInput).toHaveValue("");
    fireEvent.change(searchInput, { target: { value: "pppqqq" } });
    setTimeout(() => {
      expect(screen.getByText("No Results Found")).toBeInTheDocument();}, 1000);
  });

  test("When Search Bar looking up results, output is 'Searching. . .'", ()=>{
    render(<AddPage OneListID="0" />);
    const searchInput = screen.getByRole('textbox', { name: 'title' });
    expect(searchInput).toHaveValue("");
    fireEvent.change(searchInput, { target: { value: "Mo Bamb" } });
    expect(screen.getByText('Searching. . .')).toBeInTheDocument();
  });
});
