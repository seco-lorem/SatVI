import SigninForm from '../containers/signed-in_user';
import NavBar from './nav_bar';
import Footer from './footer';
import React from 'react';
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux';


function Signin_screen(props) {

    // Redirect to signout page if already logged in
    let history = useHistory();
    if(props.userAndtoken.userAndtoken != null)
        history.push("/signout");

    return (
        <div>
            <NavBar/>
            <SigninForm/>
            <Footer/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userAndtoken: state.userAndtoken
});
export default connect(mapStateToProps)(Signin_screen);