import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {user_signin} from '../actions/index';
import SigninForm from '../components/signin_box';

/**
 * I(seco) created this file in hopes of properly structuring redux in this project
 * I had failed that time and this is not in use.
 * Even though I understad it now, I haven't bothered to change it to this way.
 */


function mapStateToProps (state) {
  return {
    user: state.activeUser
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators({user_signin: user_signin}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SigninForm)