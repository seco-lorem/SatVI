import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import {GET_ITEMS} from './home_screen';
import ItemCard from './item_card';
import Carousel from './carousel';
import {connect} from 'react-redux';


const ITEMS_PER_PAGE = 4;

function Subscribed(props) {
    
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);   // to be used for smarter screen-fitting

    // Fetch items
    const { loading, error, data } = useQuery(GET_ITEMS, {variables:{
        is_book: props.searchCriteria.filters[0],
        brand_new: false,
        free_delivery: false,
        search: "",
        max_price: -1,
        min_price: -1
    }});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    // Display them in a carousel
    let itemCards = data.getItems.map(({
        title,
        userId,
        price,
        timeCreated,
        imageLink
    }) => {
        return (
            <ItemCard title={title} userId={userId} price={price} 
                            timeCreated={timeCreated} imageLink={imageLink} />
        )
    })
    
    return (
        <Carousel items={itemCards} itemsPerPage={itemsPerPage} id="carousel" />
    );
}

const mapStateToProps = (state) => ({
    searchCriteria: state.searchCriteria
});
export default connect(mapStateToProps)(Subscribed);