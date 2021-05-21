import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDGc1yOau8koRrocY4VhGxN2v6rKzeXC1U",
    authDomain: "fir-sample-da2d7.firebaseapp.com",
    projectId: "fir-sample-da2d7",
    storageBucket: "fir-sample-da2d7.appspot.com",
    messagingSenderId: "704554063752",
    appId: "1:704554063752:web:31d269bb31bc47275ecc3d"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};