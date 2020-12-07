
import sampleOneLists from "../../data/onelists.json";

import {
    getOneList,
    addOneList,
    addSong,
    changeupvote,
    changedownvote,
    deleteSong,
    addHost,
    getHostOneList,
    getPlaylist,
    knex,
  } from "./backend-utils";

//create sample one list and host data that matches the migration tables!
const sampleHost = {
 
    "spotify" : "yellow@yabby.com"
}
const sampleOnelist = {
    "id" : 5678,
    "title" : "Halloween",
    "description":"Some spooky halloween jams for hall 203's party",
    "imagesrc":"../public/defaultimage",
    
}
  
describe("Tests of the database functions", () => {
    

    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
       
        
      });

    test("getOneList, gets OneList based on id", async () => {
        const addedList = await addOneList(sampleOnelist);
        
        const returnedOneList = await getOneList(addedList.id);
        
        expect(returnedOneList.title).toBe(sampleOnelist.title);
        expect(returnedOneList.description).toBe(sampleOnelist.description);
      

    });

    test("add new OneList to database and return newly added OneList with new id", async () => {
       
        
        const returnedOneList = await addOneList(sampleOnelist);

        expect(returnedOneList.title).toBe(sampleOnelist.title);
        expect(returnedOneList.description).toBe(sampleOnelist.description);
        expect(returnedOneList.imagesrc).toBe(sampleOnelist.imagesrc);
       
        expect(returnedOneList.id).toBeGreaterThanOrEqual(0);
    })

    test("add song to OneList", async () => {
        // addsong(song), takes a song as the only argument
        const sampleSong = {
            "title":"Heartless",
        "artist": "The Weeknd"}
        const returnedSong = await addSong(sampleSong);
        expect(returnedSong.title).toBe(sampleSong.title);
        expect(returnedSong.artist).toBe(sampleSong.artist);
        expect(returnedSong.id).toBeGreaterThanOrEqual(0);
    })

    test("upvote functionality", async () => {
        const samplePlaylist = sampleOneLists[0].playlist;
        const sampleSong = samplePlaylist[0];
        expect(sampleSong.up).toBe(0);
        addSong(sampleSong);

        const returnedSong = await changeupvote(sampleSong.id, 1);      
        expect(returnedSong.up).toBe(1);

    })

    test("downvote functionality", async () => {
        const samplePlaylist= sampleOneLists[0].playlist;
        const sampleSong = samplePlaylist[0];
        expect(sampleSong.down).toBe(0);
        addSong(sampleSong);

        const returnedSong = await changedownvote(sampleSong.id, -1);      
        expect(returnedSong.down).toBe(-1);
    })

    test("delete song functionality", async () => {
        const sampleSong = sampleOneLists[0].playlist[0];
        addSong(sampleSong);
        const count = await deleteSong(sampleSong.id);
        expect(count).toBe(1);
        const rows = await knex('Song').where({title:sampleSong.title}).select();
        expect(rows).toHaveLength(0);


    });

    test("add host functionality", async () => {
        //what does the host data entry look like? 
       
        const returnedHost = await addHost(sampleHost);
        
        expect(returnedHost.spotify).toBe(sampleHost.spotify);
       
    }); 

    test("get OneList host functionality", async () => {
        
        const currentHost = await addHost(sampleHost);
        const returnedHost = await getHostOneList(currentHost.spotify);
        expect(returnedHost.spotify).toBe(currentHost.spotify);
        
    });

    test("getPlaylist functionality", async () => {
        const samplePlaylist= sampleOneLists[0].playlist;
        addOneList(sampleOneLists[0]);
        const returnedPlaylist = await getPlaylist(sampleOneLists[0].id);
        expect(returnedPlaylist[0]).toBe(samplePlaylist[0]);
    })

});