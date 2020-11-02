
import { useState } from 'react';


export default function CreationPage() {

    const [currentID, setID] = useState(makeEventID());

    function makeEventID(){
        var S4 = function() {
          return ((Math.floor(Math.random()*10).toString())); 
        };
       return (S4()+S4()+S4()+S4()+S4()+S4());
      }
    return( 
        <div >
            <div className="EventID">
                <p className="EventText"> Event ID:</p>
                <p className="ID">{currentID}</p>     
            </div>
        </div>


    );
}