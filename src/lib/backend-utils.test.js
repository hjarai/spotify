
import sampleOneLists from "../../data/onelists.json";

import {
    getOneList,
    addOneList,
    addSong,
    upvoteSong,
    downvoteSong,
    removeUpvoteSong,
    removeDownvoteSong,
    deleteSong,
    addHost,
    getHostOneList,
    getPlaylist,
    knex,
  } from "./backend-utils";
  
describe.skip("Tests of the database functions", () => {

    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
      });

    test("getOneList, gets OneList based on id", async () => {
        const sampleOneList = sampleOneLists[0];
        const returnedOneList = await getOneList(sampleOneLists.id);
        expect(returnedOneList.id).toBe(sampleOneList.id);
        expect(returnedOneList.title).toBe(sampleOneList.title);
        expect(returnedOneList.description).toBe(sampleOneList.description);
        expect(returnedOneList.image_path).toBe(sampleOneList.image_path);
        expect(returnedOneList.playlist).toBe(sampleOneList.playlist);
        expect(returnedOneList.date).toBe(sampleOneList.date);

    });

    test("add new OneList to database and return newly added OneList with new id", async () => {
        const sampleOneList = {
            "title":"Fall Road Trip",
            "description":"Some pop jams for the roadtrip to Florida",
            "image_path":"../../public/defaultimage",
            "date": "2020-10-05"};
        
        const returnedOneList = await addOneList(sampleOneList);

        expect(returnedOneList.title).toBe(sampleOneList.title);
        expect(returnedOneList.description).toBe(sampleOneList.description);
        expect(returnedOneList.image_path).toBe(sampleOneList.image_path);
        expect(returnedOneList.date).toBe(sampleOneList.date);
        expect(returnedOneList.id).toBeGreaterThanOrEqual(0);
    })

    test("add song to OneList", async () => {
        // addsong(song), takes a song as the only argument
        const sampleSong = {
            "title":"Heartless",
        "artist":["The Weeknd"]}
        const returnedSong = await addSong(sampleSong);
        expect(returnedSong.title).toBe(sampleSong.title);
        expect(returnedSong.artist).toBe(sampleSong.artist);
        expect(returnedSong.id).tobBeGreaterThanOrEqual(0);
    })

    test("remove and upvote song associated with given song ID and return updated song object", async () => {
        const samplePlaylist = sampleOneLists[0].playlist;
        expect(samplePlaylist[0].upvote).toBe(0);

        const returnedSong = await upvoteSong(samplePlaylist[0].id);      
        expect(returnedSong.upvote).toBe(1);

        const removedUpvoteSong = await removeUpvoteSong(samplePlaylist[0].id);
        expect(removedUpvoteSong.upvote).toBe(0);
    })

    test("remove downvote and downvote song associated with given song ID", async () => {
        const samplePlaylist= sampleOneLists[0].playlist;
        expect(samplePlaylist[0].downvote).toBe(0);

        const returnedSong = await downvoteSong(samplePlaylist[0].id);      
        expect(returnedSong.downvote).toBe(-1);

        const removedDownvoteSong = await removeDownvoteSong(samplePlaylist[0].id);
        expect(removedDownvoteSong.downvote).toBe(0);
    })

    test("delete song functionality", async () => {
        const sampleSong = sampleOneLists[0].playlist[0];
        const count = await deleteSong(sampleSong.id);
        expect(count).toBe(1);
        const rows = await knex('Song').where({title:sampleSong.title}).select();
        expect(rows).toHaveLength(0);


    });

    test("add host functionality", async () => {
        //what does the host data entry look like? 
        const sampleHost = {
            "id" : 5678,
            "spotify" : "arbitraryUsernameOrToken"
        }
        const returnedHost = await addHost(sampleHost);
        expect(returnedHost.id).toBe(sampleHost.id);
        expect(returnedHost.spotify).toBe(sampleHost.spotify);
       
    }); 

    test("get OneList host functionality", async () => {
        const sampleOneListHost = sampleOneLists[0].host;
        const returnedHost = await getHostOneList(sampleOneListHost.id)
        expect(returnedHost.id).toBe(sampleOneListHost.id);
        expect(returnedHost.spotify).toBe(sampleOneListHost.spotify);
    });

    test("getPlaylist functionality", async () => {
        const samplePlaylist= sampleOneLists[0].playlist;
        const returnedPlaylist = await getPlaylist(sampleOneLists[0].id);
        expect(returnedPlaylist[0]).toBe(samplePlaylist[0]);
    })

});