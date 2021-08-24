import React from 'react';
import ConfirmSignout from './signout_confirm';
import NavBar from './nav_bar';
import Footer from './footer';


function Signout_screen(props) {
    return (
        <div>
            <NavBar/>
            <ConfirmSignout/>
            <Footer/>
        </div>
    );
}

export default Signout_screen;