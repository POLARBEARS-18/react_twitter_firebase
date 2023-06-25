import { css } from '@emotion/react'
import { Avatar } from '@mui/material'
import { FC } from 'react'
import { Posts } from 'types/types'

const Post: FC<Posts> = ({ id, avatar, image, text, timestamp, username }) => {
  const a = 'a'

  return (
    <div css={SPost}>
      <div>
        <Avatar src={avatar} />
      </div>
      <div css={SPostBody}>
        <div>
          <div css={SPostHeader}>
            <h3>
              <span css={SPostHeaderUser}>@{username}</span>
              <span css={SPostHeaderTime}>{new Date(timestamp?.toDate() as Date).toLocaleString()}</span>
            </h3>
          </div>
        </div>
        <div css={SPostTweet}>
          <p>{text}</p>
        </div>
        {image && (
          <div css={SPostTweetImage}>
            <img src={image} alt="tweet" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Post

const SPost = css`
  display: flex;
  align-items: flex-start;
  padding-bottom: 10px;
`

const SPostAvatar = css`
  padding: 20px;
`

const SPostBody = css`
  flex: 1;
  padding: 10px;
`

const SPostHeader = css`
  > h3 {
    font-size: 15px;
    margin-bottom: 5px;
  }
`

const SPostHeaderUser = css`
  font-weight: 600;
  font-size: 18px;
  color: white;
  margin-right: 12px;
`

const SPostHeaderTime = css`
  font-size: 14px;
  color: gray;
`

const SPostTweet = css`
  margin-bottom: 10px;
  font-size: 15px;

  > p {
    color: whitesmoke;
    font-size: 20px;
  }
`

const SPostTweetImage = css`
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    object-fit: contain;
    border-radius: 20px;
    max-height: 250px;
  }
`

const SPostCommentIcon = css`
  margin-top: 15px;
  color: whitesmoke;
  cursor: pointer;
`

const SPostComment = css`
  display: flex;
  align-items: center;
  word-break: break-all;
  margin: 12px;
`

const SPostCommentUser = css`
  font-weight: 600;
  font-size: 16px;
  color: white;
  margin-right: 12px;
`

const SPostCommentText = css`
  font-size: 15px;
  color: whitesmoke;
  margin-right: 10px;
`

const SPostFrom = css`
  margin: 40px;
  position: relative;
  display: flex;
`

const SPostInput = css`
  padding: 10px;
  outline: none;
  border: none;
  border-radius: 10px;
  margin-right: 10px;
`

const SPostButton = css`
  border: none;
  color: whitesmoke;
  background-color: transparent;
  cursor: pointer;
`

const SPostButtonDisable = css`
  display: none;
`
