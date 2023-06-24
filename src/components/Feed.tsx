import { auth } from 'lib/firebase/firebase'
import { FC } from 'react'

const Feed: FC = () => {
  const a = 'a'
  return (
    <div>
      Feed
      <button type="button" onClick={() => auth.signOut()}>
        Logout
      </button>
    </div>
  )
}
export default Feed
