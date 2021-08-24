import React, { useState } from 'react';
import {
  useMutation,
  gql
} from "@apollo/client";
import { useHistory, Link } from "react-router-dom";
import {connect} from 'react-redux';


const AUTH = gql`
    mutation tokenAuth($email: String!, $password: String!) {
        tokenAuth(email: $email, password: $password) {
            token
        }
    }
`;


/**
 * Some of the very first pieces of react I've written. I am opposite of proud of this spaghetti.
 */
function SigninForm(props) {

    const [tokenAuth, { loading, error, data }] = useMutation(AUTH, { errorPolicy: 'all' });

    const [id,setId] = useState("");
    const [password,setPw] = useState("");
    const [remember_me,setRemember_me] = useState(false);
    const [accept_conditions,setAccept_conditions] = useState(false);
    const [waiting, setWaiting] = useState(false);   // Waiting for mutation response

    let history = useHistory();
  
    const toggleCheckBox = (event) => {
        if(event.target.id === "remember_box")
            setRemember_me(!remember_me);
        
        else if(event.target.id === "conditions_box"){
            setAccept_conditions(!accept_conditions);
            if(accept_conditions) {
                document.getElementById("signinbtn").style.backgroundColor = "#6fa58c";
                document.getElementById("signinbtn").style.cursor = "context-menu";
            }
            else{
                document.getElementById("signinbtn").style.backgroundColor = "#30f58d";
                document.getElementById("signinbtn").style.cursor = "pointer";
            }
        }
    }

    const handleChange = (event) => {
        if(event.target.id === "idfield")      setId(event.target.value);
        else if(event.target.id === "pwfield") setPw(event.target.value);
    }

    const handleSubmit = (event) => {
        if (accept_conditions) {
            setWaiting(true);
            
            tokenAuth({ variables: {
                "email": id,
                "password": password
            } });
        }
        else
            alert('You have to accept the terms & conditions.');
        
        event.preventDefault();
    }

    const facebookLogin = () => {}
    const googleLogin = () => {}

    if (waiting && error){
        setWaiting(false);
        document.getElementById("signinbtn").style.cursor = "pointer";
        alert(error.message + "For now, use e-mail: guest@deneme.son , password: guest");
    }
    else{
        if (loading){
            document.getElementById("signinbtn").style.cursor = "progress";
        }
        else if(waiting){
            document.getElementById("signinbtn").style.cursor = "pointer";
            setWaiting(false);
            if(!error){
                props.dispatch({type: "SIGNIN", data: data});
                history.push("/");
            }
        }
    }

    return (
        <div class="App" id="app">
            <div class="box">
                <form onSubmit={handleSubmit}>
                    <div className="form-button" type="fblogin" onClick={facebookLogin}>Continue with Facebook</div>
                    <div class="bodge-div"></div>
                    <div className="form-button" type="googlelogin" onClick={googleLogin}>Continue with Google</div>
                    <div class="bodge-div"></div>
                    <input id="idfield" class="form_input" type="text" value={id} onChange={handleChange}  placeholder="e-mail"/>
                    <div class="bodge-div"></div>
                    <input type="checkbox" id="remember_box" onClick={toggleCheckBox}/>
                    <label class="in-form_text"> Remember me</label>
                    <div class="bodge-div"></div>
                    <input id="pwfield" class="form_input" type="password" value={password} onChange={handleChange} placeholder="Password"/>
                    <div class="bodge-div"></div>
                    <div className="form-button" id="signinbtn" type="submit" onClick={handleSubmit}>Sign in</div>
                    <div class="bodge-div"></div>
                    <input type="checkbox" id="conditions_box" onClick={toggleCheckBox}/>
                    <label class="in-form_text"> I accept the </label> <a class="link" href="https://www.google.com">terms & conditions</a>
                    <div class="bodge-div"></div>
                    <Link to="/signup" class="link">Sign up</Link>
                </form>
            </div>
        </div>
    );
    
}

const mapStateToProps = (state) => ({
    userAndtoken: state.userAndtoken
});
export default connect(mapStateToProps)(SigninForm);