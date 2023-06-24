import React, { FC, useEffect } from 'react'
import './App.css'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from 'features/userSlice'
import { auth } from 'lib/firebase/firebase'
import Feed from 'components/Feed'
import Auth from 'components/Auth'

const App: FC = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        )
      } else {
        dispatch(logout())
      }
    })
    return () => {
      unSub()
    }
  }, [dispatch])

  return (
    <>
      {user.uid ? (
        <div css={SApp}>
          <Feed />
        </div>
      ) : (
        <Auth />
      )}
    </>
  )
}

export default App

const SApp = css`
  display: flex;
  height: 100vh;
  padding: 30px 80px;
  background-color: #444447;
`
