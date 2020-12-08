import { fireEvent, render, screen } from '@testing-library/react';
import AttendeeSignInPage from './AttendeeSignInPage.js';
/* eslint-disable no-undef, no-unused-vars */

const mockEventId = '123456';
const mockuser = 'pam';

describe('Attendee Sign in Page Tests', () => {
    const handler = jest.fn();

    beforeEach(() => {
        handler.mockReset();
    });

    //sign in page components rendered
    test('playlist is rendered with all the components', () => {
        render(<AttendeeSignInPage setMode={handler} user={mockuser} />);
        
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
          

    //Sign In button disabled unless 6 digit eventId, not necessary if database gives unique smaller ID
    test.skip('Sign in button is disabled without event id', () => {
        render(<AttendeeSignInPage setMode={handler} />);
      
        const eventIdInput = screen.getByRole('textbox', { name: 'EventId' }); 
        expect(eventIdInput).toHaveValue('');
        const SignInButton = screen.getByRole('button', { name: 'Sign In' });
        expect(SignInButton).toBeDisabled();

        fireEvent.change(eventIdInput, { target: { value: '12345' } });
        expect(eventIdInput).toHaveValue('12345');
        expect(SignInButton).toBeDisabled();

        fireEvent.change(eventIdInput, { target: { value: '123456' } });
        expect(eventIdInput).toHaveValue('123456');
        expect(SignInButton).toBeEnabled();

        fireEvent.change(eventIdInput, { target: { value: '1234567' } });
        expect(eventIdInput).toHaveValue('1234567');
        expect(SignInButton).toBeDisabled();
    });

    //Sign in button calls setmode with eventID
    test('Sign in button is disabled without 6 digit event id', () => {
        render(<AttendeeSignInPage setMode={handler} user={mockuser}/>);
      
        const eventIdInput = screen.getByRole('textbox', { name: 'EventId' }); 
        const SignInButton = screen.getByRole('button', { name: 'Sign In' });

        fireEvent.change(eventIdInput, { target: { value: '123456' } });
        expect(eventIdInput).toHaveValue('123456');

        fireEvent.click(SignInButton);
        expect(handler).toHaveBeenCalledWith(mockEventId);
    });

    //Invalid eventID brings user back to sign in page
});
