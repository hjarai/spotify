
<<<<<<< HEAD
// import sampleOneLists from "../../data/onelists.json";

// import {
//     getOneList,
//     addOneList,
//     addSong,
//     deleteSong,
//     addHost,
//     getHostOneList,
//     getPlaylist,
//     knex,
//     updateSong,
//   } from "./backend-utils";

// //create sample one list and host data that matches the migration tables!
// const sampleHost = {
 
//     "spotify" : "yellow@yabby.com"
// }
// const sampleOnelist = {
//     "id" : 5678,
//     "title" : "Halloween",
//     "description":"Some spooky halloween jams for hall 203's party",
//     "imagesrc":"../public/defaultimage",
//     "host_spotify" : "yellow@yabby.com"
=======
import sampleOneLists from "../../data/onelists.json";

import {
    getOneList,
    addOneList,
    addSong,
    deleteSong,
    getPlaylist,
    knex,
    updateSong,
  } from "./backend-utils";

//create sample one list and host data that matches the migration tables!

const sampleOnelist = {
    "id" : 5678,
    "title" : "Halloween",
    "description":"Some spooky halloween jams for hall 203's party",
    "imagesrc":"../public/defaultimage",
    "host_spotify" : "yellow@yabby.com"
>>>>>>> main
    
// }
  
// describe("Tests of the database functions", () => {
    

//     beforeEach(async () => {
//         await knex.migrate.rollback();
//         await knex.migrate.latest();
       
        
//       });

//     test("getOneList, gets OneList based on id", async () => {
//         const addedList = await addOneList(sampleOnelist);
        
//         const returnedOneList = await getOneList(addedList.id);
        
//         expect(returnedOneList.title).toBe(sampleOnelist.title);
//         expect(returnedOneList.description).toBe(sampleOnelist.description);
      

//     });

//     test("add new OneList to database and return newly added OneList with new id", async () => {
       
        
//         const returnedOneList = await addOneList(sampleOnelist);

//         expect(returnedOneList.title).toBe(sampleOnelist.title);
//         expect(returnedOneList.description).toBe(sampleOnelist.description);
//         expect(returnedOneList.imagesrc).toBe(sampleOnelist.imagesrc);
       
<<<<<<< HEAD
//         expect(returnedOneList.id).toBeGreaterThanOrEqual(0);
//     })

//     test("add song to OneList", async () => {
//         // addsong(song), takes a song as the only argument
//         const sampleSong = {
//             "title":"Heartless",
//         "artist": "The Weeknd"}
//         const returnedSong = await addSong(sampleSong);
//         expect(returnedSong.title).toBe(sampleSong.title);
//         expect(returnedSong.artist).toBe(sampleSong.artist);
//         expect(returnedSong.id).toBeGreaterThanOrEqual(0);
//     })

//     test("update song functionality", async () => {
//         const sampleSong = sampleOneLists[0].playlist[0];
//         addSong(sampleSong);
//         const count = await updateSong(sampleSong);
//         expect(count).toBe(1);

//     });

//     test("delete song functionality", async () => {
//         const sampleSong = sampleOneLists[0].playlist[0];
//         addSong(sampleSong);
//         const count = await deleteSong(sampleSong.id);
//         expect(count).toBe(1);
//         const rows = await knex('Song').where({title:sampleSong.title}).select();
//         expect(rows).toHaveLength(0);


//     });

//     // test("add host functionality", async () => {
//     //     //what does the host data entry look like? 
       
//     //     const returnedHost = await addHost(sampleHost);
        
//     //     expect(returnedHost.spotify).toBe(sampleHost.spotify);
       
//     // }); 

//     // test("get Host OneList functionality", async () => {
        
//     //     const currentHost = await addHost(sampleHost);
//     //     await addOneList(sampleOnelist);
//     //     const returnedOneLists = await getHostOneList(currentHost.spotify);
//     //     expect(returnedOneLists[0].host_spotify).toBe(currentHost.spotify);
        
//     // });

//     test("getPlaylist functionality", async () => {
//         const currentOneList = await addOneList(sampleOnelist);
=======
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

    test("update song functionality", async () => {
        const sampleSong = sampleOneLists[0].playlist[0];
        addSong(sampleSong);
        const count = await updateSong(sampleSong);
        expect(count).toBe(1);

    });

    test("delete song functionality", async () => {
        const sampleSong = sampleOneLists[0].playlist[0];
        addSong(sampleSong);
        const count = await deleteSong(sampleSong.id);
        expect(count).toBe(1);
        const rows = await knex('Song').where({title:sampleSong.title}).select();
        expect(rows).toHaveLength(0);


    });

    test("getPlaylist functionality", async () => {
        const currentOneList = await addOneList(sampleOnelist);
>>>>>>> main
       
//         const returnedPlaylist = await getPlaylist(currentOneList.id);
//         expect(returnedPlaylist).toBeDefined();
//     })

// });