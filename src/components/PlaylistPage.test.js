import { render, screen, fireEvent } from '@testing-library/react';
import PlaylistPage from './PlaylistPage';
/* eslint-disable no-undef, no-unused-vars */
const mockOneList = {
    id: 135397,
    title: 'Mo Bamba',
    description: 'One of the worst songs in existence',
    image_path: 'http://localhost/defaultImage.png',
    playlist: [{title: 'Hello', artist: 'Adele', upvote: '10'}],
    date: '2020-12-25'
  };

describe('PlayList Page tests', () => {
    const handler = jest.fn();

    beforeEach(() => {
        handler.mockReset();
    });

    test('playlist page is rendered with all the components', () => {
        //event id, title, description, image, current playlist, date, add song button, 
        render(<PlaylistPage setMode= {handler} OneList= {mockOneList}/>);

        //check if title is rendered
        const displayTitle = screen.getByLabelText('Title');
        expect(displayTitle).toBeInTheDocument();
        expect(displayTitle).toBeVisible();

        //check that event id is rendered
        const displayEventID = screen.getByLabelText('Event ID');
        expect(displayEventID).toBeInTheDocument();
        expect(displayEventID).toBeVisible();

        //check that description is rendered
        const displayDescription = screen.getByLabelText('Description');
        expect(displayDescription).toBeInTheDocument();
        expect(displayDescription).toBeVisible();

        //check that image is rendered
        const displayImage = screen.getByRole('img'); 
        expect(displayImage).toBeVisible();
        expect(displayImage.src).toBe('http://localhost/defaultImage.png')


        //check that the playlist is rendered
        const displayPlaylist = screen.getByLabelText('Playlist');
        expect(displayPlaylist).toBeInTheDocument();
        expect(displayPlaylist).toBeVisible();

        //check that the date is rendered
        const displayDate = screen.getByLabelText('Date');
        expect(displayDate).toBeInTheDocument();
        expect(displayDate).toBeVisible();

        //check that the add song button is rendered
        const addSongsButton = screen.getByRole('button', { name: 'Add Songs' });
        expect(addSongsButton).toBeVisible();
    });

    test('when add song is clicked, set mode is called with "AddPage"', () => {
        render(<PlaylistPage setMode={handler} OneList={mockOneList}/>);
        const addSongsButton = screen.getByRole('button', { name: 'Add Songs'});
        fireEvent.click(addSongsButton);
        expect(handler).toHaveBeenCalled();
        expect(handler).toHaveBeenCalledWith("AddPage");

    });

});

