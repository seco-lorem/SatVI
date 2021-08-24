import React from 'react';
import { useLocation, Link} from "react-router-dom";
import {connect} from 'react-redux';
import logo from '../res/0.png';
import leftimg from '../res/1.png';
import rightimg from '../res/2.png';
import SearchBar from './search_bar';


/**
 * Navigation bar at the top
 * TODO: Fix design
 */
function NavBar(props) {
    console.log(props, props.searchoptions);

    const bookOrNot = (event) => {
        let book = (event.target.id === "book");
        let otherway = book ? "not" : "book";
        
        var filters = props.searchCriteria.filters;
        filters[0] = book;
        props.dispatch({ type: "UPDATE_FILTERS", data: filters});

        document.getElementById(otherway).classList.replace('inactive-btn', 'active-btn');
        document.getElementById(event.target.id).classList.replace('active-btn', 'inactive-btn');
    }

    let signed_in = (props.userAndtoken.userAndtoken == null);
    let signInOut = signed_in ? "Sign In" : "Sign Out";

    let location = useLocation();
    
    return (
        <div className="header-bar">
            <img className="leftImg" src={leftimg} />
            <img className="logo" src={logo} />
            <span className="buttons">
                <Link to="/" id="/" className="bar-element" type="right">Home</Link>
                <Link to="/favorites" id="/favorites" className="bar-element" type="right">Favorites</Link>
                <Link to="/sales" id="/sales" className="bar-element" type="right">My Sales</Link>
                {location.pathname === "/" ?
                    <span>
                        <Link to="/signout" id="/signout" className="bar-element" type="right">{signInOut}</Link>
                        <div/>
                    </span>
                :
                    <Link to="/signin" id="/signin" className="bar-element" type="right">{signInOut}</Link>
                }
            </span>
            {location.pathname === "/" ?
                <span>
                    <span className="inactive-btn" id="book" onClick={bookOrNot}>Book</span>
                    <span className="active-btn" id="not" onClick={bookOrNot}>Else</span>
                    <SearchBar/>
                </span>
            :
                <span/>
            }
            <img className="rightImg" src={rightimg} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    userAndtoken: state.userAndtoken,
    searchCriteria: state.searchCriteria
});
export default connect(mapStateToProps)(NavBar);