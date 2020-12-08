

const makePlaylist = async (exporter) => {
    console.log(exporter.token);
    console.log(exporter.id);
    const response = await fetch(`https://api.spotify.com/v1/users/${exporter.id}/playlists`,{
        method: 'POST',
        headers: {
            Authorization: `Bearer ${exporter.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'name': 'Name from database',
            'description': 'Description from database',
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
    console.log(exporter);
    
    const playlistID = await makePlaylist(exporter, oneListID);
    console.log
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,{
        method: 'POST',
        headers: {
            Authorization: `Bearer ${exporter.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'uris': ['spotify:track:7lEptt4wbM0yJTvSG5EBof'],
        }),
    })
    if (!response.ok) {
        throw new Error(response.statusText);
  }
  return ;
}
