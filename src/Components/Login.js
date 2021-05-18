import '../App.css'
import React, { Component  } from "react"
import { Link } from "@reach/router"
import { Form, Button, Card, Container } from "react-bootstrap"
import ReactSnackBar from "react-js-snackbar"
import {auth} from "../firebase";

class Login extends Component {

  constructor(){
    super();
    this.state = {
      Show : false,
      Showing : false,
      Value : "Hello, there"
    };
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  signInWithEmailAndPasswordHandler(email, password){
    console.log("here");
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      this.setState({Value:"Error signing in with password and email!"});
      this.show();
      console.error("Error signing in with password and email", error);
    });
  };
  

  show = () =>{
    if(this.state.showing) return;

    this.setState({Show:true, Showing:true, Value:this.emailRef.current.value});
    setTimeout(()=>{
      this.setState({Show:false, Showing:false, Value: ""});
    },2000)
  };

  onSubmitHandler = (e) =>{
    e.preventDefault()
    console.log(this.emailRef.current)
    console.log(this.passwordRef.current)
    if(this.emailRef.current && this.passwordRef.current){
      this.setState({Value:this.emailRef.current})
      this.signInWithEmailAndPasswordHandler(this.emailRef.current, this.passwordRef.current)
      this.show()
    }
  };

  render(){
    return (
      <>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                <Card.Body>
                    <h2 className="test-center mb-4"> Login </h2>
                    <Form onSubmit={this.onSubmitHandler}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={this.emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={this.passwordRef} required />
                    </Form.Group>
                    <Button className="w-100" type="submit" > Login </Button>
                    </Form>
                    <Link to="signUp" className="text-blue-500 hover:text-blue-600">
                        Sign up here
                    </Link>
                </Card.Body>
                </Card>
                <ReactSnackBar Show={this.state.Show}>
                {this.state.Value}
                </ReactSnackBar>
            </div>
        </Container>
    </>
    );
  }
}

export default Login;
