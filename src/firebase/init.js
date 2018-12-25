import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBgDayvbVq8q4XGPpf8UFRa6kuMGCOgkKA",
  authDomain: "user-manager-54d29.firebaseapp.com",
  databaseURL: "https://user-manager-54d29.firebaseio.com",
  projectId: "user-manager-54d29",
  storageBucket: "user-manager-54d29.appspot.com",
  messagingSenderId: "313167113934"
};

const firebaseApp= firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots:true})

export default firebaseApp.firestore()