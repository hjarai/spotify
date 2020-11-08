import { render, screen, fireEvent } from '@testing-library/react';
import Playlist from './PlaylistPage';

const mockOneList = {
    id: 135397,
    title: 'Mo Bamba',
    description: 'One of the worst songs in existence',
    image_path: 'http://localhost/defaultImage.png',
    playlist: [{title: 'Hello', artist: 'Adele', upvote: '10'}],
    date: '2020-12-25'
  };

describe.skip('PlayList Page tests', () => {
    const handler = jest.fn();

    beforeEach(() => {
        handler.mockReset();
    });

    test('playlist page is rendered with all the components', () => {
        //event id, title, description, image, current playlist, date, add song button, 
        render(<PlaylistPage setMode= {handler} OneList= {mockOneList}/>);

        //check if title is rendered

        //check that event id is rendered

        //check that description is rendered

        //check that image is rendered

        //check that the playlist is rendered

        //check that the date is rendered

        //check that the add song button is rendered
    });

    test('when add song is clicked, set mode is called with "AddPage"', () => {
        render(<PlaylistPage setMode={handler} OneList={mockOneList}/>);
        const addSongsButton = screen.getByRole('button', { name: 'Add Songs'});
        fireEvent.click(addSongsButton);
        expect(handler).toHaveBeenCalled();
        expect(handler).toHaveBeenCalledWith("AddPage");

    });

});

