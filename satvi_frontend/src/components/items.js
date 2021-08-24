import React from 'react';
import {connect} from 'react-redux';
import {GET_ITEMS} from './home_screen';
import { useQuery } from "@apollo/client";
import { Container, Row, Col } from 'reactstrap';
import ItemCard from './item_card';


function Items(props) {
    // Fetch items
    const { loading, error, data } = useQuery(GET_ITEMS, {variables:{   // Sorting Options argument is Missing on Backend side. 
        is_book: props.searchCriteria.filters[0],
        brand_new: props.searchCriteria.filters[1],
        free_delivery: props.searchCriteria.filters[2],
        search: props.searchCriteria.searchKey,
        max_price: props.searchCriteria.interval[1],
        min_price: props.searchCriteria.interval[0]
    }});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    // Display them in a grid
    let itemCards = data.getItems.map(({
        title,
        userId,
        price,
        timeCreated,
        imageLink
    }) => {
        return (
            <Col sm="6" md="3">
                <ItemCard title={title} userId={userId} price={price} 
                                timeCreated={timeCreated} imageLink={imageLink} />
            </Col>
        )
    })

    return (
        <Container fluid>
            <Row>
                {itemCards}
            </Row>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    searchCriteria: state.searchCriteria
});
export default connect(mapStateToProps)(Items);