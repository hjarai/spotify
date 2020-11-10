import { render, screen, fireEvent } from '@testing-library/react';
import AttendeeSignInPage from './AttendeeSignInPage.js';
/* eslint-disable no-undef, no-unused-vars */

const mockEventId = '123456';
const user = 'pam';

describe.skip('Attendee Sign in Page Tests', () => {
    const handler = jest.fn();

    beforeEach(() => {
        handler.mockReset();
    });

    //sign in page components rendered
    test('playlist is rendered with all the components', () => {
        render(<AttendeeSignInPage setMode={handler} />);
        
        //check if eventId input is rendered
        const eventIdInput = screen.getByRole('textbox', { name: 'EventId' }); 
        expect(eventIdInput).toBeInTheDocument();
        expect(eventIdInput).toBeVisible();

        //check if eventId input is rendered
        const userInput = screen.getByRole('textbox', { name: 'User' }); 
        expect(userInput).toBeInTheDocument();
        expect(userInput).toBeVisible(); 

        //sign in button 
        const SignInButton = screen.getByRole('button', { name: 'Sign In' });
        expect(SignInButton).toBeDisabled();
        
        //cancel button (need test for each song????)
        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        expect(cancelButton).toBeEnabled();
    });
          

    //Sign In button disabled unless 6 digit eventId & unique username is enetered

    //Sign in button calls setmode with eventID & username

    //Invalid eventID brings user back to sign in page
});
