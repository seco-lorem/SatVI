import React, { useState } from 'react';
import {connect} from 'react-redux';


function SearchBar(props) {
    // Store the typing in local state
    const [key,setKey] = useState("");

    const handleChange = (event) => {
        setKey(event.target.value);
    }

    // Dispatch local state to the store
    const search = (event) => {
        event.preventDefault();
        console.log("Search request sent")
        props.dispatch({type: "UPDATE_KEY", data: key});
    }

    return (
        <span>
            <form onSubmit={search}>
                <input id="keyfield" class="form_input" type="searchbar" value={key} onChange={handleChange}  placeholder="Search an item"/>
            </form>
            <span id="active-btn" class="form_input" type="submit" value="🔍" />
        </span>
    );
}

const mapStateToProps = (state) => ({
    searchCriteria: state.searchCriteria
});
export default connect(mapStateToProps)(SearchBar);