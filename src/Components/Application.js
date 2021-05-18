import React,{ useContext} from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";
import { UserContext } from "../providers/UserProvider";
function Application() {
  var user = null;
  var user = useContext(UserContext);
  //const {displayName, email} = user;
  if (!user){
    user = null;
  }
  return (
        user ?
        <ProfilePage />
      :
        <Router>
          <SignUp path="signUp" />
          <SignIn path="/" />
          <PasswordReset path = "passwordReset" />
        </Router>

  );
}
export default Application;