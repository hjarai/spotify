
import PlayListSongDetail from '../components/PlayListSongDetail.js';
import { render, screen} from '@testing-library/react';


const remove = () => {
    return true;
}
const updating = () =>{
    return true;
}
describe('PlayListSongDetail tests', () => {
    const handler = jest.fn();

    beforeEach(() => {
        handler.mockReset();

    });

    test('PlayListSongDetail displays song correctly ', () => {

        render(< PlayListSongDetail 
            songDetails ={{title:"Intentions", artist:"Justin Bieber", id: 3,vote:4,username:"laurie"}}
             removeSong = {remove}
             songsAdded = {[3]}
            setUpdate={updating}  /> );
            
            const song = "Intentions by Justin Bieber added by laurie";
            expect(screen.getByText(song)).toBeInTheDocument();
            expect(screen.getByText(song)).toBeVisible();          
    });

    test('PlayListSongDetail displays remove button for user that added song ', () => {

        render(< PlayListSongDetail 
            songDetails ={{title:"Intentions", artist:"Justin Bieber", id: 3,vote:4,username:"laurie"}}
             removeSong = {remove}
             songsAdded = {[3]}
            setUpdate={updating}  /> );
            
            const removeButton =  screen.getByRole('button', { name: 'Remove' });
            expect(removeButton).toBeVisible();
         
    });

    test('PlayListSongDetail DOES NOT show remove button for user that did not added song ', () => {

        render(< PlayListSongDetail 
            songDetails ={{title:"Intentions", artist:"Justin Bieber", id: 3,vote:4,username:"laurie"}}
             removeSong = {remove}
             songsAdded = {[1]}
            setUpdate={updating}  /> );
            
            expect(screen.queryByRole('button', { name: 'Remove' })).not.toBeInTheDocument();
         
    });

});

