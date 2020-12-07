import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

 // scopes get permission to modify user playlist ( we will use to export songs)

 // The code is updated according to the new changes in nextauth to enable us get access to a user's spotify account and add
 // a new playlist, specifically, the access Token. 

const options = {
  providers: [

    Providers.Spotify({
      scope: ' user-read-private user-read-email playlist-modify-public playlist-modify-private',
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    }),
  ],
  session:{
    jwt: true,
  }, 
  callbacks: {
    async jwt(token, _, account) {
      if(account){
        token.id = account.id;
        token.accessToken = account.accessToken;   // get access token to modify user's playlist 
        //console.log("This is token.accessToken" +   token.accessToken );
      }
      return token 
    },
    async session(session, user) {
      session.user = user;  // get user information i.e id, email, name and profile picture
      //console.log("This is user" +   user); 
     
      return session 
    }
  }, 
};




export default (req, res) => NextAuth(req, res, options);