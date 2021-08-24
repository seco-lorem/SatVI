import SignupForm from './signup_box';
import NavBar from './nav_bar';
import Footer from './footer';
import React from 'react';
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux';


function Signup_screen(props) {

    // Redirect to signout page if already logged in
    let history = useHistory();
    if(props.userAndtoken.userAndtoken != null)
        history.push("/signout");

    return (
        <div>
            <NavBar/>
            <SignupForm/>
            <Footer/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userAndtoken: state.userAndtoken
});
export default connect(mapStateToProps)(Signup_screen);