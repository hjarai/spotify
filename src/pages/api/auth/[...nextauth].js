import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

 // scopes get permission to modify user playlist ( we will use to export songs)

const options = {
  providers: [

    Providers.Spotify({
      scope: 'user-read-email playlist-modify-public playlist-modify-private',
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    }),
  ],
};



export default (req, res) => NextAuth(req, res, options);