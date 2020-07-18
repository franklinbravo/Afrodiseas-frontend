import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
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
