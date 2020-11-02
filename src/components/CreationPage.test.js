import { render, screen, fireEvent } from '@testing-library/react';
import CreationPage from './CreationPage';
/* eslint-disable no-undef, no-unused-vars */
// fake testing onelist
const mockOneList = {
    id: 135397,
    title: 'Mo Bamba',
    description: 'One of the worst songs in existence',
    image_path: '/testimage.jpg',
    playlist: [{title: 'Hello', artist: 'Adele', upvote: '10'}],
    date: '2020-12-25'
  };

describe('Creation Page Tests', () => {
    const handler = jest.fn();

    beforeEach(() => {
        handler.mockReset();
    });

    test('creation page is rendered with all the components', () => {
        //title input, description, default image, create/cancel/import image buttons
        render(<CreationPage setMode={handler} />);
        
        //check if title input is rendered
        const titleInput = screen.getByRole('textbox', { name: 'Title' }); 
        expect(titleInput).toBeInTheDocument();
        expect(titleInput).toBeVisible();

        //check if description input is rendered
        const descriptionInput = screen.getByRole('textbox', { name: 'Description' });
        expect(descriptionInput).toBeInTheDocument();
        expect(descriptionInput).toBeVisible();

        //check if date input is rendered
        const dateInput = screen.getByLabelText('Date');
        expect(dateInput).toBeInTheDocument();
        expect(dateInput).toBeVisible();
        
        //check if default image is rendered
        const defaultImage = screen.getByRole('img'); 
        expect(defaultImage).toBeVisible();
        expect(defaultImage.src).toBe('http://localhost/defaultImage.png')

        //check that create button is rendered
        const createButton = screen.getByRole('button', { name: 'Create' });
        expect(createButton).toBeVisible();
        
        //check that cancel button is rendered
        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        expect(cancelButton).toBeVisible();

        //check that import (image) button is rendered
        const importButton = screen.getByLabelText('Import Image');
        expect(importButton).toBeVisible();
    });

    test.skip('clicking on import image brings user to option to import from file', () => {
        render(<CreationPage setMode={handler} />);
    
        const defaultImage = screen.getByRole('img'); 
        expect(defaultImage).toBeVisible();
        expect(defaultImage.src).toBe('http://localhost/defaultImage.png');

        
        const file = new File(['dummy image'], 'exampleImage.png', {type: 'image/png'})
        const imageInput = screen.getByRole('img')
        fireEvent.change(imageInput, {target: {files: [file]}}) 

        expect(defaultImage).not.toBeVisible();
    });

  

    test('Create button is disabled without title', () => {
        render(<CreationPage setMode={handler} />);

        const titleInput = screen.getByRole('textbox', { name: 'Title' });
        expect(titleInput).toHaveValue('');
        const createButton = screen.getByRole('button', { name: 'Create' });
        expect(createButton).toBeDisabled();

        fireEvent.change(titleInput, { target: { value: 'Some Title' } });
        expect(titleInput).toHaveValue('Some Title');
        expect(createButton).toBeEnabled();

        fireEvent.change(titleInput, { target: { value: '' } });
        expect(titleInput).toHaveValue('');
        expect(createButton).toBeDisabled();
    });

    /*test('Clicking create will change state to OneList page', () => {
        return undefined;
    });*/

    test('CreationPage returns a new OneList', () => {
        //check setMode is called &  its variables are (set of (image, title, description), equivalent to "newArticle" in assignment 3)
        render(<CreationPage setMode={handler} />);
        const titleInput = screen.getByRole('textbox', { name: 'Title' });
        const descriptionInput = screen.getByRole('textbox', { name: 'Description' });
        const dateInput = screen.getByLabelText('Date');
        const createButton = screen.getByRole('button', { name: 'Create' });

        fireEvent.change(titleInput, { target: { value: mockOneList.title } });
        fireEvent.change(descriptionInput, { target: { value: mockOneList.description } });
        fireEvent.change(dateInput, { target: { value: mockOneList.date } });
        fireEvent.click(createButton);

        expect(handler).toHaveBeenCalled();

        const newOneList = handler.mock.calls[0][0]; // value the handler was called with

        expect(newOneList.title).toEqual(mockOneList.title);
        expect(newOneList.description).toEqual(mockOneList.description);
        expect(newOneList.date).toEqual(mockOneList.date);
    });
    
   /* test('Cancel button returns user to Home Page', () => {
        return undefined;        
    });*/
    
    test('Cancel button is called with an empty parameter ', () => {
        render(<CreationPage setMode={handler} />);
        const cancelButton = screen.getByRole('button', { name: 'Cancel'});
        fireEvent.click(cancelButton);
        expect(handler).toHaveBeenCalled();
        expect(handler).toHaveBeenCalledWith();
        //setMode is called with an empty prarameter
    });

});