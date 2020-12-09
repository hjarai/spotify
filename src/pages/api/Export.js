

const makePlaylist = async (exporter, oneListID) => {
    console.log(oneListID);
    const getOneList = async ( someID ) => {
        const response = await fetch(`api/onelists/${someID}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const myOneList = await response.json();
        return myOneList;
    };
    const oneList = await getOneList(oneListID);
    console.log(oneList);
    const titles = oneList.title;
    console.log(titles);
    const descriptions = oneList.description;
    console.log(descriptions);
    const response = await fetch(`https://api.spotify.com/v1/users/${exporter.id}/playlists`,{
        method: 'POST',
        headers: {
            Authorization: `Bearer ${exporter.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'name': titles,
            'description': descriptions,
            'public': false,
        }),
});
    if (!response.ok) {
        throw new Error(response.statusText);
  }
    const {id} = await response.json();
    console.log(id);
    return id;
}

export const addSongToPlaylist = async (exporter, oneListID) => {
    console.log(oneListID);
    const playlistID = await makePlaylist(exporter, oneListID);
    const getPlaylist = async ( someID ) => {
        const response = await fetch(
            `api/playlist/${someID}`, );
        if (!response.ok) {
        throw new Error(response.statusText);
        }
        const myPlaylist = await response.json();
        return myPlaylist;
    };
    const urishelper = await getPlaylist(oneListID); 
    const uris = [];
    for(let i = 0; i < urishelper.length; i++){
        uris.push(urishelper[i].uri);
    }
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,{
        method: 'POST',
        headers: {
            Authorization: `Bearer ${exporter.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'uris': uris,
        }),
    })
    if (!response.ok) {
        throw new Error(response.statusText);
  }
  return ;
}
