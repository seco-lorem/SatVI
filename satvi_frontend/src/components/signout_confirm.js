import React from 'react';
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux';

/**
 * To ask the user if they are sure to sign out
 */
function ConfirmSignout(props) {

    let history = useHistory();
    
    const confirm = () => {
        props.dispatch({type: "SIGNOUT"});
        history.push("/signin");
    }

    const cancel = () => {
        history.goBack();
    }

    return (
        <div>
            <div class="App">
                <div class="box">
                    Are sure you want to sign out?                              <div class="bodge-div"></div>
                    <input type="positive" value="Yes" onClick={confirm}/>      <div class="bodge-div"></div>
                    <input type="negative" value="No" onClick={cancel}/>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userAndtoken: state.userAndtoken
});
export default connect(mapStateToProps)(ConfirmSignout);