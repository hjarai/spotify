/* eslint-disable no-unused-vars */
import { useState } from 'react';


export default function CreationPage() {

    function makeEventID(){
        const S4 = function() {
          return ((Math.floor(Math.random()*10).toString())); 
        };
       return (S4()+S4()+S4()+S4()+S4()+S4());
      }

      const [currentID, setID] = useState(makeEventID());
    return( 
        <div >
            <div className="EventID">
                <p className="EventText"> Event ID:</p>
                <p className="ID">{currentID}</p>     
            </div>
        </div>


    );
}