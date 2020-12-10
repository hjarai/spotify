/*
  login.js

  Login component using NextAuth for users to access Spotify. 
*/

import { signIn, signOut, useSession } from 'next-auth/client'
import styles from '../styles/login.module.css'

export default function Login () {
  const [session] = useSession();
  
  return (
      <div >
       <p>
          {session && <>
            <span className={styles.signedInText}>
              <small>Signed in as</small><br/>
              <strong>{session.user.email || session.user.name}</strong>
              </span>
            <a
                href={`/api/auth/signout`}
                className = {styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
          </>}
          {!session && <>
            <span className={styles.notSignedInText}>You are not signed in</span>
            <a href={`/api/auth/signin`}
              className = {styles.button}
              onClick={(e) => {
              e.preventDefault()
              signIn() }} >
              Sign in
              </a>
          </>}
          </p>

      </div>

  )
}
