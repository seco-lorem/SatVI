import React from 'react';
import {connect} from 'react-redux';

// To easily change the elements displayed, use these consts
const SORT_OPTIONS = [
    "Distance",
    "Recommended",
    "Top rated"
];

const FILTERS = [
    "Brand New",
    "Free Delivery",
    "Verified Seller",  // Not implemented in the backend
    "Near My City"      // Not implemented in the backend
];


function SideBar(props) {

    // When user scrolls down the screen, close the sidebar
    window.onscroll = function() {slideSideBar()};
    const slideSideBar = () => {
        if ( document.documentElement.scrollTop === 0) {
            document.getElementById("sidebar").style.height = "calc(100% - " +
            getComputedStyle(document.documentElement).getPropertyValue('--bar_height') + ")";
        } else {
            document.getElementById("sidebar").style.height = "400px";
        }
    }

    // Called when a change occurs
    const updateStore = () => {
        var filters = [props.searchCriteria.filters[0]];
        for (var i = 0; i < FILTERS.length; i++)
            filters[i + 1] = document.getElementById(FILTERS[i]).checked;
        props.dispatch({ type: "UPDATE_FILTERS", data: filters});
    }

    // De-check rest of the sorting option boxes
    const choseSorting = (event) => {   // Not implemented in the backend
        if (event.target.checked){
            for (var i = 0; i < SORT_OPTIONS.length; i++){
                if(event.target.id !== SORT_OPTIONS[i])
                    document.getElementById(SORT_OPTIONS[i]).checked = false;
            }
        }
        else
            event.target.checked = true;
    }

    // reset filters
    const reset = () => {
        for (var i = 0; i < FILTERS.length; i++)
            document.getElementById(FILTERS[i]).checked = false;
        updateStore();
        props.dispatch({ type: "UPDATE_INTERVAL", data: [0, 0]});
    }

    const handleIntervalChange = (event) => {
        let interval = props.searchCriteria.interval;
        let index = "max_price" ===  event.target.id ? 1 : 0;
        interval[index] = event.target.value;
        props.dispatch({ type: "UPDATE_INTERVAL", data: interval});
    }

    return (
        <div className="side-bar" id="sidebar">
            <div className="footerhead">Sort by</div>
            {SORT_OPTIONS.map((value) => {
                return(
                    <div>
                        <input type="checkbox" id={value} onClick={choseSorting}/>
                        <label class="in-form_text"> {value}</label>
                        <div class="bodge-div"></div>
                    </div>
                )
            })}
            <span className="footerhead">Filters</span>
            <p className="greyright" onClick={reset} > Reset </p>
            {FILTERS.map((value) => {
                return(
                    <div>
                        <input type="checkbox" id={value} onClick={updateStore}/>
                        <label class="in-form_text"> {value}</label>
                        <div class="bodge-div"></div>
                    </div>
                )
            })}
            <span className="footerhead">Minimum price</span>
            <input class="form_input" type="interval" 
                value={props.searchCriteria.interval[0]}
                onChange={handleIntervalChange}
                placeholder="min" id="min_price"/>
            
            <span className="footerhead">Maximum price</span>
            <input class="form_input" type="interval" 
                value={props.searchCriteria.interval[1]}
                onChange={handleIntervalChange}
                placeholder="max" id="max_price"/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    searchCriteria: state.searchCriteria
});
export default connect(mapStateToProps)(SideBar);