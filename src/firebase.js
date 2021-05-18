import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//var userRef = db.collection("users").doc("users");

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

//const userRef = firestore.doc(`users/${user.uid}`);
//const snapshot = await userRef.get();

export const addStudentToSection = (studentID,section) => {
  let sectionRef = db.collection("classes").doc(section);
  sectionRef.update({
    students : firebase.firestore.FieldValue.arrayUnion(studentID),
  })
}

export const addTeacherToCollection = (userID,name,timeTable) => {
  db.collection("teachers").doc(userID).set({
    name : name,
    timeTable : timeTable,
    dateSlot : [],
  })
}

export const generateTeacherUserDocument = async (user, displayName, userType, rollNo, profileLink, exams) => {
  console.log(userType+displayName+"signup");
  if (!user) return;
  let userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = user;
    //const {displayName} = additionalData;
    try {
      await userRef.set({
        displayName:displayName, 
        email:email,
        usertype:userType,
        rollNo: rollNo,
        profileLink: "https://firebasestorage.googleapis.com/v0/b/invigilator-82e71.appspot.com/o/images%2Fdefault.jpeg?alt=media&token=ed45c73d-8a81-43ed-8465-6268302d4d12",
        exams: exams, 
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid,userType);
};

export const generateStudentUserDocument = async (user, displayName, userType, rollNo, profileLink, className) => {
    console.log(userType+displayName+"signup");
    if (!user) return;
    let userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email } = user;
      //const {displayName} = additionalData;
      try {
        await userRef.set({
          displayName:displayName, 
          email:email,
          usertype:userType,
          rollNo: rollNo,
          profileLink: "https://firebasestorage.googleapis.com/v0/b/invigilator-82e71.appspot.com/o/images%2Fdefault.jpeg?alt=media&token=ed45c73d-8a81-43ed-8465-6268302d4d12",
          section: className, 
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid,userType);
};
const getUserDocument = async (uid,userType) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyAaSpS4ffmmwTrJtIiT1XOWxa2tqHc4wY8",
  authDomain: "invigilator-82e71.firebaseapp.com",
  projectId: "invigilator-82e71",
  storageBucket: "invigilator-82e71.appspot.com",
  messagingSenderId: "492381439153",
  appId: "1:492381439153:web:11142a78601b195dc4ce90",
  measurementId: "G-Q94DPT1TMW"
}

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

var db = firebase.firestore();