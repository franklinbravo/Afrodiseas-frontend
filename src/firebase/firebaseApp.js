import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyB3I6Y0NJknaUJzpBhmcEBqKvltL_FaUe8",
  authDomain: "afrodiseas-77e4b.firebaseapp.com",
  databaseURL: "https://afrodiseas-77e4b.firebaseio.com",
  projectId: "afrodiseas-77e4b",
  storageBucket: "afrodiseas-77e4b.appspot.com",
  messagingSenderId: "78912330611",
  appId: "1:78912330611:web:f56c4fc961a974627dc306",
  measurementId: "G-NB8TLRSWB1"
};

const app = firebase.initializeApp(firebaseConfig)

const G_provider = new firebase.auth.GoogleAuthProvider();
export const auth = app.auth();
export const firestore = app.firestore();
export const RegisterLoginWithGoogle = async () => {
  try {
    const { user: {
      displayName,
      email,
      uid
    } } = await auth.signInWithPopup(G_provider)
    const doc = await firestore.collection('users').doc(uid).get()
    if (!doc.exists) {
      await firestore.collection('users').doc(uid).set({
        displayName,
        email
      })
      return {
        code: 'LOGIN_SUCCESS',
        displayName
      }
    } else {
      return {
        code: 'LOGIN_SUCCESS',
        displayName
      }
    }
  } catch (err) {
    await auth.signOut()
    return {
      code: 'LOGIN_FAILED',
      err,
      displayName:null
    }

  }
}
