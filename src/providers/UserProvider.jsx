import React, { Component, createContext } from "react";
import { auth } from "../firebase";
import {generateStudentUserDocument} from "../firebase";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: null
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      console.log(userAuth+"provider")
      const user = await generateStudentUserDocument(userAuth);
      this.setState({ user });
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;