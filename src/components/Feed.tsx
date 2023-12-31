import { db } from 'lib/firebase/firebase'
import { FC, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { bookConverter } from 'lib/firebase/converter'
import { Posts } from 'types/types'
import TweetInput from './TweetInput'
import Post from './Post'

const Feed: FC = () => {
  const [posts, setPosts] = useState<Posts[]>([
    {
      id: '',
      avatar: '',
      image: '',
      text: '',
      timestamp: null,
      username: '',
    },
  ])

  useEffect(() => {
    const unSub = db
      .collection('posts')
      .withConverter(bookConverter)
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            image: doc.data().image,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
          }))
        )
      )

    return () => {
      unSub()
    }
  }, [])

  return (
    <div css={SFeed}>
      <TweetInput />
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          avatar={post.avatar}
          image={post.image}
          text={post.text}
          timestamp={post.timestamp}
          username={post.username}
        />
      ))}
    </div>
  )
}
export default Feed

const SFeed = css`
  flex: 1;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`
