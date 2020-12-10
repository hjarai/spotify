/*
  fetcher.js

  Function used by TopTracks to asychronously fetch Spotify search results.
*/

export default async function Fetcher(...args) {
      const res = await fetch(...args);
      return res.json();
}