
import { signIn, signOut, useSession } from 'next-auth/client'

import styles from './login.module.css'

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Login () {
  const [ session] = useSession()
  
  return (

      <div >
        <p >
          {!session && <>
            <span className={styles.notSignedInText}>You are not signed in</span>
            <a
                href={`/api/auth/signin`}
                className = {styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
          </>}
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
        </p>
      </div>

  )
}
