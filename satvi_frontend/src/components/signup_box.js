import React, { useState } from 'react';
import {
  useMutation,
  gql
} from "@apollo/client";
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux';


const CREATE = gql`
    mutation createUser($email: String!, $password: String!, $name: String!) {
        createUser(email: $email, password: $password, name: $name) {
            success
        }
    }
`;

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
function SignupForm(props) {

    const [createUser, { loading, error, data }] = useMutation(CREATE, { errorPolicy: 'all' });
    const [tokenAuth, { loadingt, errort, datat }] = useMutation(AUTH, { errorPolicy: 'all' });

    // TODO ? Use an array
    const [nameF,setnameF] = useState("");
    const [nameL,setnameL] = useState("");
    const [id,setId] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPw] = useState("");
    const [password2,setPw2] = useState("");
    const [remember_me,setRemember_me] = useState(false);
    const [accept_conditions,setAccept_conditions] = useState(false);
    const [waiting, setWaiting] = useState(false);      // Waiting for create mutation response
    const [waitingt, setWaitingt] = useState(false);    // Waiting for signin mutation response

    let history = useHistory();
  
    const toggleCheckBox = (event) => {
        if(event.target.id === "remember_box")
            setRemember_me(!remember_me);
        
        else if(event.target.id === "conditions_box"){
            setAccept_conditions(!accept_conditions);
            if(accept_conditions) {
                document.getElementById("signinbtn").style.backgroundColor = "#6fa58c";
                document.getElementById("signinbtn").style.cursor = "auto";
            }
            else{
                document.getElementById("signinbtn").style.backgroundColor = "#30f58d";
                document.getElementById("signinbtn").style.cursor = "pointer";
            }
        }
    }

    const handleChange = (event) => {
        if(event.target.id === "idfield")       setId(event.target.value);
        else if(event.target.id === "pwfield")  setPw(event.target.value);
        else if(event.target.id === "pwfield2") setPw2(event.target.value);
        else if(event.target.id === "nameF")    setnameF(event.target.value);
        else if(event.target.id === "nameL")    setnameL(event.target.value);
        else if(event.target.id === "phone")    setPhone(event.target.value);
    }

    const isFormValid = () => {
        let errormessages = "";
        if (!accept_conditions)
            errormessages+= "You have to accept the terms & conditions.\n";
        if (password !== password2)
            errormessages+= "Password fields do not match.\n";
        return errormessages;
    }

    const handleSubmit = (event) => {
        let errormessages = isFormValid();
        if(errormessages === ""){
            setWaiting(true);
            createUser({ variables: {
                "email": id,
                "password": password,
                "name": nameF + nameL,
            }});
        }
        else
            alert(errormessages);
        
        event.preventDefault();
    }

    const facebookLogin = () => {}

    const googleLogin = () => {}

    if (error && waiting){
        setWaiting(false);
        document.getElementById("signinbtn").style.cursor = "pointer";
        alert(error.message + "For now, use e-mail: guest@deneme.son , password: guest");
    }
    else{
        if (loading){
            document.getElementById("signinbtn").style.cursor = "progress";
        }
        else if(waiting){
            setWaiting(false);
            document.getElementById("signinbtn").style.cursor = "pointer";
            setWaitingt(true);
            tokenAuth({ variables: {
                "email": id,
                "password": password
            } });
        }
    }
    
    if (errort && waitingt){
        setWaitingt(false);
        document.getElementById("signinbtn").style.cursor = "pointer";
        alert(error.message + "For now, use e-mail: guest@deneme.son , password: guest");
    }
    else {
        if (loadingt){
            document.getElementById("signinbtn").style.cursor = "progress";
        }
        else if(waitingt){
            setWaitingt(false);
            document.getElementById("signinbtn").style.cursor = "pointer";
            if(!errort){
                props.dispatch({type: "SIGNIN", data: datat});
                history.push("/");
            }
        }
    }
    
    return (
        <span class="App" id="app">
            <div >
                <form onSubmit={handleSubmit} class="box" type="two">
                    <div class="parent">
                        <div class="div1">
                            <div className="form-button" type="fblogin" onClick={facebookLogin}>Continue with Facebook</div>
                        </div>
                        <div class="div2">
                            <div className="form-button" type="googlelogin" onClick={googleLogin}>Continue with Google</div>
                        </div>
                        <div class="div3">
                            <input id="idfield" class="form_input" type="text" value={id} onChange={handleChange} placeholder="e-mail"/>
                        </div>
                        <div class="div4">
                            <input id="nameF" class="form_input" type="text" value={nameF} onChange={handleChange} placeholder="First Name"/>
                        </div>
                        <div class="div5">
                            <input id="pwfield" class="form_input" type="password" value={password} onChange={handleChange} placeholder="Password"/>
                        </div>
                        <div class="div6">
                            <input id="nameL" class="form_input" type="text" value={nameL} onChange={handleChange} placeholder="Last Name"/>
                        </div>
                        <div class="div7">
                            <input id="pwfield2" class="form_input" type="password" value={password2} onChange={handleChange}  placeholder="Password Again"/>
                        </div>
                        <div class="div8">
                            <input id="phone" class="form_input" type="text" value={phone} onChange={handleChange}  placeholder="Phone number(optional)"/>
                        </div>
                        <div class="div9">
                            <input type="checkbox" id="conditions_box" onClick={toggleCheckBox}/>
                            <label class="in-form_text"> I accept the </label>
                            <a class="link" href="https://www.google.com">terms & conditions</a>
                        </div>
                        <div class="div10">
                            <input type="checkbox" id="remember_box" onClick={toggleCheckBox}/>
                            <label class="in-form_text"> Remember me</label>
                        </div>
                        <div class="div11">
                            <div className="form-button" id="signinbtn" type="submit" onClick={handleSubmit} >Sign up</div>
                        </div>
                    </div>
                </form>
            </div>
      </span>
    );
}

const mapStateToProps = (state) => ({
    userAndtoken: state.userAndtoken
});
export default connect(mapStateToProps)(SignupForm);