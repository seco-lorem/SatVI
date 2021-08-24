import React from 'react';
import {
    CardImg,
    CardText,
    CardBody
} from 'reactstrap';
import logo from '../res/3.png';


/**
 * Cards to display items on sale.
 */
function ItemCard(props) {
    const changeSrc = (event) => {
        event.target.src = logo
    }

    return (
        <div className="box" type="item-card">
            <CardImg top width="100%" height="150px" src={props.imageLink} onError={changeSrc} alt={props.title + " logo"} />
            <CardBody className="px-md-0 py-0">
                <h6>{props.title}</h6>
                <CardText className="small-font" type="right">{props.price}€</CardText>
                <CardText className="small-font">user: {props.userId}</CardText>
                <CardText className="small-font" type="right">{props.timeCreated}</CardText>
            </CardBody>
        </div>
    )
}

export default ItemCard;
