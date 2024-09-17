import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import fetch from "node-fetch";

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  pages: {
    signIn: '/signin',
    signOut: '/auth/signout',
    error: './error',
    verifyRequest: '/auth/verify-request',
    newUser: '/signup'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signin function called");
      console.log("user: ", user);

      if (user.email) {
        console.log("email: ", user.email);
        const token = account?.id_token
        console.log(token)

        const body = JSON.stringify({ 
          email: user.email, 
          token: token
        });
       
        console.log(token)


        // Make a POST request to backend (change route)
        try {
          const response = await fetch('https://artist-hub-405321.uc.r.appspot.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
          });
          const data = await response.json();
          console.log(body)

          // Handle the responseconsole.log(response.status);
          if (response.status == 404) {
            return `/signup?email=${encodeURIComponent(user.email)}`;
          } else if(response.status == 500){
            console.log('there is an internal server error hereeee')
            return '/error'
          }
          else {
            if(data.artist_uid) {
              return true;
            }
            else {
              return false;
            }    
          }
        } catch (error) {
          console.error("Error calling Flask API:", error);
          return false;
        }
      } else {
        return false;
      }
    }
  }
};