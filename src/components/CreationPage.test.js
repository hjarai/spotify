import { render, screen, fireEvent } from '@testing-library/react';
import CreationPage from './CreationPage';

describe('Creation Page Tests', () => {
    const handler = jest.fn();

    beforeEach(() => {
        handler.mockReset();
    });

    test('creation page is rendered with all the components', () => {
        //title input, description, default image, create/cancel/import image buttons
    });

    test('clicking on upload/import brings user to option to import from file', () => {
        
    });

    test('image is saved and displayed when user clicks save button', () => {

    });

    test('Create button is disabled without title', () => {

    });

    test('Clicking create will change state to OneList page', () => {

    });

    test('CreationPage returns a new OneList', () => {
        //check variable of returned function (set of (image, title, description), equivalent to "newArticle" in assignment 3)
    });
    
    test('Cancel button returns user to Home Page', () => {
        
    });


});