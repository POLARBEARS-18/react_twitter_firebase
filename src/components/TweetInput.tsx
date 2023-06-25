import { css } from '@emotion/react'
import { Avatar, Button, IconButton } from '@mui/material'
import { selectUser } from 'features/userSlice'
import { auth, db, storage } from 'lib/firebase/firebase'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import firebase from 'firebase/app'
import { AddAPhoto } from '@mui/icons-material'

const TweetInput: FC = () => {
  const user = useSelector(selectUser)
  const [tweetImage, setTweetImage] = useState<File | null>(null)
  const [tweetMsg, setTweetMsg] = useState('')

  const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setTweetImage(e.target.files![0])
      const targetEvent = e
      targetEvent.target.value = ''
    }
  }
  const sendTweet = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (tweetImage) {
      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const N = 16
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('')
      const fileName = `${randomChar}_${tweetImage.name}`
      const uploadTweetImg = storage.ref(`images/${fileName}`).put(tweetImage)
      uploadTweetImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => undefined,
        (err) => {
          alert(err.message)
        },
        () => {
          void storage
            .ref('images')
            .child(fileName)
            .getDownloadURL()
            .then((url: string) => {
              void db.collection('posts').add({
                avatar: user.photoUrl,
                image: url,
                text: tweetMsg,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                username: user.displayName,
              })
            })
        }
      )
    } else {
      void db.collection('posts').add({
        avatar: user.photoUrl,
        image: '',
        text: tweetMsg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: user.displayName,
      })
    }
    setTweetImage(null)
    setTweetMsg('')
  }

  return (
    <>
      <form onSubmit={sendTweet}>
        <div css={STweetForm}>
          <Avatar
            src={user.photoUrl ? user.photoUrl : ''}
            onClick={async () => {
              await auth.signOut()
            }}
            css={STweetAvatar}
          />
          <input
            type="text"
            placeholder="What‘s happening?"
            autoFocus
            value={tweetMsg}
            onChange={(e) => setTweetMsg(e.target.value)}
            css={StweetInput}
          />
          <IconButton>
            <label htmlFor="tweetHiddenIcon">
              <AddAPhoto css={tweetImage ? STweetAddIconLoaded : STweetAddIcon} />
              <input type="file" onChange={onChangeImageHandler} css={STweetHiddenIcon} id="tweetHiddenIcon" />
            </label>
          </IconButton>
        </div>

        <Button type="submit" disabled={!tweetMsg} css={tweetMsg ? STweetSendBtn : STweetSendDisableBtn}>
          Tweet
        </Button>
      </form>
    </>
  )
}

export default TweetInput

const STweetForm = css`
  margin: 40px;
  position: relative;
  display: flex;
`

const STweetAvatar = css`
  cursor: pointer;
  margin-top: 2px;
`

const StweetInput = css`
  margin-left: 40px;
  width: 90%;
  background-color: #e1e1e1;
  padding: 15px;
  border-radius: 30px;
  outline: none;
  border: none;
  color: #333333;
  font-size: 18px;
`

const STweetAddIcon = css`
  cursor: pointer;
  color: white;
`

const STweetAddIconLoaded = css`
  cursor: pointer;
  color: dimgray;
`

const STweetHiddenIcon = css`
  display: none;
`

const STweetSendBtn = css`
  background-color: #00bfff !important;
  border: none !important;
  color: white !important;
  font-weight: 800 !important;
  text-transform: inherit !important;
  border-radius: 20px !important;
  width: 80px;
  height: 40px !important;
  margin-left: 80% !important;
`

const STweetSendDisableBtn = css`
  background-color: gray !important;
  border: none !important;
  color: white !important;
  font-weight: 900 !important;
  text-transform: inherit !important;
  border-radius: 30px !important;
  width: 80px;
  height: 40px !important;
  margin-left: 80% !important;
  cursor: none !important;
`
