import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

 // scopes get permission to modify user playlist ( we will use to export songs)

const options = {
  providers: [

    Providers.Spotify({
<<<<<<< HEAD
     
=======
      scope: 'user-read-email playlist-modify-public playlist-modify-private',
>>>>>>> 40830b3b9d1c722ebe3827acb8ed231e35438ccc
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    }),
  ],
};



export default (req, res) => NextAuth(req, res, options);