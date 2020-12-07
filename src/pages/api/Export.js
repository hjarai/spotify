import { useSession } from 'next-auth/client'
import React from 'react';

const makePlaylist = async () => {
    const [session] = useSession();
    const response = await fetch(`https://api.spotify.com/v1/users/${session.user.id}/playlists`,{
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.token}`,
            'Content-Type': 'application/json',
        },
        data: {
            'name': 'Name from database',
            'description': 'Description from database',
            'public': false,
        },
});
    if (!response.ok) {
        throw new Error(response.statusText);
  }
    const playlistID = response.json()['id'];
    return playlistID;
}

export const addSongToPlaylist = async () => {
    const playlistID = makePlaylist();
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,{
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
        data:{
            'uris': urisFromDatabase,
        },
    })
    if (!response.ok) {
        throw new Error(response.statusText);
  }
  return ;
}