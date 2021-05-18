import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import {auth} from "../firebase";
const ProfilePage = () => {
  const user = useContext(UserContext);
  const {email, displayName, uid, usertype} = user;
  //const photoURL = "https://drive.google.com/file/d/1dMkRxu6DY4SceVogbIcU1f_4SdZiTwEQ/view";
  return (
    <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        {/* <div
          style={{
            background: `url(${photoURL})  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px"
          }}
          className="border border-blue-300"
        ></div> */}
        <div className = "md:pl-4">
        {/* <img src = {photoURL}></img> */}
        <h2 className = "text-2xl font-semibold">{displayName}</h2>
        <h2 className = "text-2xl font-semibold">{uid}</h2>
        <h2 className = "text-2xl font-semibold">{usertype+":userType"}</h2>
        <h3 className = "italic">{email}</h3>
        </div>
      </div>
      <button className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {auth.signOut()}}>Sign out</button>
    </div>
  ) 
};
export default ProfilePage;