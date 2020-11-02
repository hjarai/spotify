import { render, screen, fireEvent } from '@testing-library/react';
import Queue from '../components/Queue';

const song = {title: "Mo Bamba", artist:["Sheck Wes"]};
describe('Queue Tests', () => {
  let queue;
  const handler = jest.fn();
  

  beforeEach(() => {
    queue = [song];
    render(<Queue queue={queue} deleteSong = {handler}/>)
  });

  test("Delete button is displayed next to each song",()=>{
    const button = screen.getByRole('button', { name: '-' });
    expect(button).toBeInTheDocument();

    //const {getByTestId} = render(<Queue queue={queue} deleteSong = {handler}/>);
    //const {getByDisplayValue} = within(getByTestId('myQueue'));
    //expect(getByDisplayValue("Mo Bamba")).toBeInTheDocument();
    //expect(screen.getByText("QUEUE")).toBeInTheDocument();
  });

  test("When delete button is pressed, song is removed from queue",()=>{
    const button = screen.getByRole('button', { name: '-' });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handler).toHaveBeenCalled();
  });
});

