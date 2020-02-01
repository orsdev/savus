import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/firebase-storage";


const config = {
 apiKey: "AIzaSyBlkBa4RPp7HmaderBNl8N_UK_25pmilb8",
 authDomain: "savus-83fa1.firebaseapp.com",
 databaseURL: "https://savus-83fa1.firebaseio.com",
 projectId: "savus-83fa1",
 storageBucket: "savus-83fa1.appspot.com",
 messagingSenderId: "651325845589",
 appId: "1:651325845589:web:4e9321a56de720ea7264dc"
};


class Firebase {
 constructor() {
  firebase.initializeApp(config);
  this.auth = firebase.auth();
  this.db = firebase.firestore();
 }

 //firebase login function
 async login(email, password) {
  const user = await
   this.auth.signInWithEmailAndPassword(email, password)
  return user;
 }

 //firebase signup function
 async signUp(email, password) {
  const user = await
   this.auth.createUserWithEmailAndPassword(email, password)
  return user;
 }

 //firebase logout function
 logout() {
  return this.auth.signOut();
 }

 getUserState() {
  return new Promise(resolve => {
   this.auth.onAuthStateChanged(resolve)
  })
 }

 //upload additional info to firebase
 async userInfo(info, file) {
  const storageRef = firebase.storage().ref();
  const storageChild = storageRef.child(file.name);
  const image = await storageChild.put(file);
  const downloadUrl = await storageChild.getDownloadURL();
  const imageRef = image.ref.location.path;

  const data = {
   Email: info.email,
   Phone: info.tel,
   Address: info.address,
   DOB: info.dob,
   ['Childhood Nickname']: info.security_one,
   ['Best Friend Middle Name']: info.security_two,
   ['Favorite Song Title']: info.security_three,
   media: {
    picture: downloadUrl,
    imageRef: imageRef,
   }

  }

  const firestoreInfo = await firebase.firestore()
   .collection('user').add(data)
   .catch((error) => {
    return error;
   });

  return firestoreInfo;

 }

 async getUserInfo() {
  let userArray = [];

  const user = await firebase.firestore().collection('user').get();

  user.forEach(doc => {
   userArray.push({ id: doc.id, data: doc.data() });
  });

  return userArray;
 }

 async getUser(userId) {

  const user = await firebase.firestore().collection('user').doc(userId).get();

  const userData = user.data();

  return userData;
 }

 getCurrentUsername() {
  return this.auth.currentUser;
 }

}


export default new Firebase(); 