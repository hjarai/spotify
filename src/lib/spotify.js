import querystring from 'querystring';

/*const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token
} = process.env;*/

const basic = Buffer.from(`${'abbf0ae2d23e4358aa7b6b26d83a4656'}:${'167511ce082643c69e3b4a02dd85112d'}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      grant_type: 'client_credentials',
  }),
})

  return response.json();
}

const getSearch = async () => {
    const  access_token  = await getAccessToken();
    return await fetch(`https://api.spotify.com/v1/search?q=mo%20bamba&type=track`, {
        method:'GET',
      headers: {
        Authorization: `Bearer ${access_token.access_token}`
      }
    });
};

export default async (_, res) => {
  const response = await getSearch();
  const { tracks } = await response.json();
  const { items } = tracks;
  const track = items.slice(0, 10).map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
    id: track.id
  }));
  return res.status(200).json( track );
};