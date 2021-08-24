import React from 'react';
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";
import NavBar from './nav_bar';
import SideBar from './side_bar';
import Subscribed from './subscribed';
import Items from './items';
import { gql } from "@apollo/client";


export const GET_ITEMS = gql`
    query getItems($is_book: Boolean, $brand_new: Boolean, $free_delivery: Boolean, $search: String, $max_price: Int, $min_price: Int) {
        getItems(
            isBook: $is_book,
            brandNew: $brand_new,
            freeDelivery: $free_delivery,
            search: $search,
            maxPrice: $max_price,
            minPrice: $min_price
        ) {
            title
            imageLink
            price
            userId
            timeCreated
        }
    }
`;

function Home_screen(props) {
    // Redirect to signin page if not logged in
/*    let history = useHistory();
    if(props.userAndtoken.userAndtoken == null)
        history.push("/signin");*/

    return (
        <div className="grey">
            <NavBar/>
            <SideBar/>
            <div className="home-main">
                <h5>Subscribed sellers</h5>
                <Subscribed/>
                <h5>Results</h5>
                <Items/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userAndtoken: state.userAndtoken
});

export default connect(mapStateToProps)(Home_screen);