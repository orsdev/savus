import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/firebase-storage";


const config = {
 apiKey: "AIzaSyDXkMUQGBmeFs-aA_a5f0GNQ8vEPfoBT9E",
 authDomain: "savus-5386a.firebaseapp.com",
 databaseURL: "https://savus-5386a.firebaseio.com",
 projectId: "savus-5386a",
 storageBucket: "savus-5386a.appspot.com",
 messagingSenderId: "922344981204",
 appId: "1:922344981204:web:87748cda41af5c54627141"
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

  //get current user id
  const uid = await this.auth.currentUser.uid;

  const firestoreInfo = await firebase.firestore()
   .collection('user').doc(uid).set(data)
   .catch((error) => {
    return error;
   });

  return firestoreInfo;

 }

 async updateUserPicture(dataId, userPicture) {
  if (userPicture.name) {

   const storageRef = firebase.storage().ref();
   const storageChild = storageRef.child(userPicture.name);
   const image = await storageChild.put(userPicture);
   const downloadUrl = await storageChild.getDownloadURL();
   const imageRef = image.ref.location.path;

   const data = {
    media: {
     picture: downloadUrl,
     imageRef: imageRef,
    }
   }

   const updateData = await firebase.firestore()
    .collection('user')
    .doc(dataId).set(data, { merge: true });

   return updateData;
  }

 }

 //update phone number
 async updatePhone(dataId, phone) {

  const data = {
   Phone: phone
  }

  const updateData = await firebase.firestore()
   .collection('user')
   .doc(dataId).set(data, { merge: true });

  return updateData;
 }

 //update address
 async updateAddress(dataId, address) {

  const data = {
   Address: address
  }

  const updateData = await firebase.firestore()
   .collection('user')
   .doc(dataId).set(data, { merge: true });

  return updateData;
 }

 //update date of birth
 async updateDob(dataId, dob) {

  const data = {
   DOB: dob
  }

  const updateData = await firebase.firestore()
   .collection('user')
   .doc(dataId).set(data, { merge: true });

  return updateData;
 }

 //update first security question
 async updateSecurityOne(dataId, secOne) {

  const data = {
   ['Childhood Nickname']: secOne
  }

  const updateData = await firebase.firestore()
   .collection('user')
   .doc(dataId).set(data, { merge: true });

  return updateData;
 }

 //update second security question
 async updateSecurityTwo(dataId, secTwo) {

  const data = {
   ['Best Friend Middle Name']: secTwo
  }

  const updateData = await firebase.firestore()
   .collection('user')
   .doc(dataId).set(data, { merge: true });

  return updateData;
 }

 //update third security question
 async updateSecurityThree(dataId, secThree) {

  const data = {
   ['Favorite Song Title']: secThree
  }

  const updateData = await firebase.firestore()
   .collection('user')
   .doc(dataId).set(data, { merge: true });

  return updateData;
 }

 //update user email address
 async emailUpdate(dataId, email) {

  const user = this.auth.currentUser;

  user.updateEmail(email)
   .then(function () {
    const data = {
     Email: email
    }

    //update email in database
    firebase.firestore()
     .collection('user')
     .doc(dataId).set(data, { merge: true });

   }).catch(function (err) {
    alert('Logout and re-login to change email address');
   })
 }


 async getUserInfo() {
  let userArray = [];

  //get current user id
  const uid = await this.auth.currentUser.uid;

  await firebase.firestore().collection('user').doc(uid).get().

   then(function (doc) {
    if (doc.exists) {
     userArray.push({ id: doc.id, data: doc.data() });
    } else {
     alert('document not found!');
    }
   }).catch(function (error) {
    alert("Error getting document:", error);
   });

  return userArray;
 }


 getCurrentUsername() {
  return this.auth.currentUser;
 }
}


export default new Firebase(); 