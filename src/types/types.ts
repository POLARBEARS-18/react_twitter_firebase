import firebase from 'firebase/app'
import Timestamp = firebase.firestore.Timestamp

export interface Posts {
  id: string
  avatar: string
  image: string
  text: string
  timestamp: Timestamp | null
  username: string
}
