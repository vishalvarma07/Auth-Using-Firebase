import React, { useState } from "react";
import { Link } from "@reach/router";
import {generateStudentUserDocument, generateTeacherUserDocument} from "../firebase";
import {auth, addStudentToSection, addTeacherToCollection} from "../firebase";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState(null);
  const [className, setClass] = useState("");

  const addStudent = (studentID,className) => {
    addStudentToSection(studentID,className);
  }

  const produceRandom = (x) => {
    let rand1 = Math.floor(Math.random() * (x));
    let rand2 = -1;
    while(rand2 === -1 || rand2 === rand1){
      rand2 = Math.floor(Math.random() * (x));
    }
    return [rand1,rand2];
  }

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      //console.log(user.data()+"user")
      if(userType === "S"){
        generateStudentUserDocument(user, displayName, userType, rollNo, profileLink, className);
        console.log(userType+displayName+"signup");
        //console.log({displayName});
        addStudent(user.uid,className);
      }
      else if(userType === "T"){
        let exams= [];
        let timeTable = [1,1,1,1,1,1];
        let locs = produceRandom(6);
        console.log(locs);
        timeTable[locs[0]] = 0;
        timeTable[locs[1]] = 0;
        console.log(timeTable);
        generateTeacherUserDocument(user, displayName, userType, rollNo, profileLink, exams);
        console.log(userType, displayName);
        addTeacherToCollection(user.uid,displayName,timeTable);
      } 
    }
    catch(error){
      setError('Error Signing up with email and password');
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
    setUserType("");
  };
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    } else if (name=== "userType"){
      setUserType(value);
    } else if (name=== "rollNo"){
      setRollNo(value);
    } else if (name=== "profileLink"){
      setProfileLink("https://firebasestorage.googleapis.com/v0/b/invigilator-82e71.appspot.com/o/images%2Fdefault.jpeg?alt=media&token=ed45c73d-8a81-43ed-8465-6268302d4d12");
    } else if (name=== "className"){
      setClass(value);
    }    
  };
  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form className="">
          <label htmlFor="displayName" className="block">
            Display Name:
          </label>
          <input
            type="text"
            className="my-1 p-1 w-full "
            name="displayName"
            value={displayName}
            placeholder="E.g: Faruq"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userType" className="block">
            UserType
          </label>
          <input
            type="text"
            className="my-1 p-1 w-full"
            name="userType"
            value={userType}
            placeholder="UserType(S/T)"
            id="userType"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userType" className="block">
            RollNo
          </label>
          <input
            type="text"
            className="my-1 p-1 w-full"
            name="rollNo"
            value={rollNo}
            placeholder="RollNo"
            id="rollNo"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userType" className="block">
            ClassName
          </label>
          <input
            type="text"
            className="my-1 p-1 w-full"
            name="className"
            value={className}
            placeholder="className"
            id="className"
            onChange={event => onChangeHandler(event)}
          />
          <button
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
        </form>
        <p className="text-center my-3">or</p>
        <button
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
        >
          Sign In with Google
        </button>
        <p className="text-center my-3">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;