import { Posts } from 'types/types'
import firebase from 'firebase/app'
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter
import DocumentData = firebase.firestore.DocumentData
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
import SnapshotOptions = firebase.firestore.SnapshotOptions

export const bookConverter: FirestoreDataConverter<Posts> = {
  /**
   * Posts オブジェクトを Firestore ドキュメントデータへ変換。
   */
  toFirestore(posts: Posts): DocumentData {
    // id は Firestore のパスで表現されるのでドキュメントデータには含めない。
    // 下記の updatedAt のように、自動で更新時刻のフィールドを追加することも可能。
    return {
      avatar: posts.avatar,
      image: posts.image,
      text: posts.text,
      timestamp: posts.timestamp?.toDate(),
      username: posts.username,
    }
  },

  /**
   * Firestore ドキュメントデータを Book オブジェクトへ変換します。
   */
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Posts {
    const data = snapshot.data(options) as Posts
    // Posts オブジェクトの id プロパティには Firestore ドキュメントの id を入れる。
    return {
      id: snapshot.id,
      avatar: data.avatar,
      image: data.image,
      text: data.text,
      timestamp: data.timestamp,
      username: data.username,
    }
  },
}
