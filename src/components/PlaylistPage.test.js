import { render, screen, fireEvent } from '@testing-library/react';
import AddPage from './AddPage';
import PlaylistPage from './PlaylistPage';

const mockOneList = {
    id: '135397',
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

    test('Playlist page is rendered with all the components', () => {
        //event id, title, description, image, current playlist, date, add song button, 
        render(<PlaylistPage setMode= {handler} OneList= {mockOneList} OneListID="0"/>);

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
        expect(displayImage.src).toBe('http://localhost/OnelistLogo.png');


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

        //check that the Export songs button is rendered
        const ExportSongsButton = screen.getByRole('button', { name: 'Export' });
        expect(ExportSongsButton).toBeVisible();

        //check that the Invite friends button is rendered
        const InviteButton = screen.getByRole('button', { name: 'Invite friends!' });
        expect(InviteButton).toBeVisible();

    });

    test.skip('When add song is clicked, set mode is called with "AddPage"', () => {
        render(<PlaylistPage setMode={handler} OneList={mockOneList}/>);
        const addSongsButton = screen.getByRole('button', { name: 'Add Songs'});
        fireEvent.click(addSongsButton);
        expect(handler).toHaveBeenCalled();
        expect(handler).toHaveBeenCalledWith("AddPage");

    });

});

describe.skip('Delete song button inside song component', () => {

    test('User can remove a song that they added previously',() => {


        render(<AddPage 
           // setAddMode = {setAddMode(true)}
            OneListID={mockOneList.id} 
            playlist={mockOneList.playlist} 
            SongsAdded={[{title: 'ROCKSTAR (feat. Roddy Ricch)', artist: 'DaBaby,Roddy Ricch', upvote: '1'}]} 
            //setSongsAdded = {setSongsAdded["ROCKSTAR (feat. Roddy Ricch) by DaBaby, Roddy Ricch"]} 
            user={"John"}/>);

        render(<PlaylistPage /* setMode={"AddPage"} */ user = "John" OneList={mockOneList.id}/>);
        const song = 'ROCKSTAR (feat. Roddy Ricch) by DaBaby, Roddy Ricch added by John';
        expect(screen.getByText(song)).toBeVisible();  
        const removeSongButton =  screen.getByRole('button', { name: 'Remove'});
        expect(screen.getByRole(removeSongButton)).toBeVisible(); 
        fireEvent.click(removeSongButton);
        expect(screen.getByText(song)).not.toBeVisible();    
    });

    test("User can't remove a song that they did not add",() => {

        render(<AddPage 
           // setAddMode = {true}
            OneListID={mockOneList.id} 
            playlist={mockOneList.playlist} 
            SongsAdded={[{title: 'ROCKSTAR (feat. Roddy Ricch)', artist: 'DaBaby,Roddy Ricch', upvote: '1'}]} 

          //  setSongsAdded = {["ROCKSTAR (feat. Roddy Ricch) by DaBaby, Roddy Ricch"]} 
            user={"John"}/>);

        render(<PlaylistPage /* setMode={"AddPage"} */ user = "Michaelangelo" OneList={mockOneList} OneListID={mockOneList.id}/>);
        const removeButton = screen.queryByText('Remove');
        expect(removeButton).not.toBeInTheDocument();  
        const song = 'ROCKSTAR (feat. Roddy Ricch) by DaBaby, Roddy Ricch added by John';
        expect(screen.getByText(song)).toBeVisible();       
    
    });
});

