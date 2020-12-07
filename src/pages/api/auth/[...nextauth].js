import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

 // scopes get permission to modify user playlist ( we will use to export songs)

const options = {
  providers: [

    Providers.Spotify({
      scope: 'user-read-email playlist-modify-public playlist-modify-private',
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      debug: true,
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images.length > 0 ? profile.images[0].url : undefined
        }
      }
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks:{
    jwt: async ( token, profile) => {
      if(profile){
        token.uid = profile.id;
      }
      return Promise.resolve(token);
    },
    session: async (session, profile) => {
      session.user.id = profile.id;
      return Promise.resolve(session);
    }
  }
};



export default (req, res) => NextAuth(req, res, options);