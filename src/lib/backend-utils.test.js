
import data from "../../data/onelists.json";

import {
    getOneList,
    addOneList,
    addSong,
    //removeSong,
    upvoteSong,
    downvoteSong,
    knex,
  } from "./backend-utils";
  
describe.skip("Tests of the database functions", () => {

    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
      });

    // this test asssumes that the database is seeded with the default two onelists in data
    test("retrieve OneList associated with given ID", async () => {
        const returnedList = await getOneList('123456');
        expect(returnedList).toEqual(data[0]);

        const returnedList2 = await getOneList('000000');
        expect(returnedList2).toEqual(data[1]);

        const returnedList3 = await getOneList('111111');
        expect(returnedList3).toEqual(false);
    })

    test("add new OneList to database and return newly added OneList", async () => {
        const sampleOneList = {
            "id":"111111",
            "title":"Fall Road Trip",
            "description":"Some pop jams for the roadtrip to Florida",
            "image_path":"../../public/defaultimage",
            "playlist" : [{
                "title":"boyfriend",
                "artist":["Ariana Grande","Social House"],
                "id":4,
                "upvote":0,
                "downvote":0,
                "user": "scrum master"
               },
               {
               "title":"Better",
               "artist":["Khalid"],
               "id":5,
               "upvote":0,
               "downvote":0,
               "user": "product owner"
               }],
            "date": "2020-10-05"};
        
        const returnedOneList = await addOneList(sampleOneList);

        expect(returnedOneList.id).toBe(sampleOneList.id);
        expect(returnedOneList.title).toBe(sampleOneList.title);
        expect(returnedOneList.description).toBe(sampleOneList.description);
        expect(returnedOneList.image_path).toBe(sampleOneList.image_path);
        expect(returnedOneList.playlist).toBe(sampleOneList.playlist);
        expect(returnedOneList.date).toBe(sampleOneList.date);
    })

    test("add song to OneList and return newly updated OneList", async () => {
        // first arg is OneList id, second arg is song id
        const returnedOneList = await addSong("123456", 5);
        expect(returnedOneList.playlist[2].title).toBe("Better");
        expect(returnedOneList.playlist[2].artist).toBe(["Khalid"]);
        expect(returnedOneList.playlist[2].id).toBe(5);
    })

    test("remove song from OneList and return newly updated OneList", async () => {
        // not sure how to implement this test ??
        //const returnedOneList = await removeSong('000000', 6);

        return true;
    })

    test("upvote song associated with given song ID and return updated song object", async () => {
        const samplePlaylist = data[0].playlist;
        expect(samplePlaylist[0].upvote).toBe(0);

        const returnedSong = upvoteSong(samplePlaylist[0].id);      
        expect(returnedSong.upvote).toBe(1);
    })

    test("downvote song associated with given song ID", async () => {
        const samplePlaylist= data[0].playlist;
        expect(samplePlaylist[0].downvote).toBe(0);

        const returnedSong = downvoteSong(samplePlaylist[0].id);      
        expect(returnedSong.downvote).toBe(-1);
    })
});