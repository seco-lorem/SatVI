import React, { useState , useRef, useEffect} from 'react';


const HELP = ["<",">"];


/**
 * A carousel with next-prev buttons, index buttons.
 * @param props: Json object that that should contain:
 *                  1- items: A JSON Array of React components
 *                  2- itemsPerPage: The number of items to be displayed in the carousel
 * 
 * I(seco) did not like the first few carousels that I've browsed so I decided to implement one as an exercise.
 */
const Carousel = (props) => {

    const [index, setIndex] = useState(0);
    const [animation, setAnimation] = useState(0);      // 0: no animation, negative: slide from left, positive: slide from right. Integer: how many indexes to slide from
    const [timeout, setTimeoutState] = useState(null);
    const [className, setClassName] = useState("");

    const prevNext = (event) => {
        if (event.target.id === "next"){
            setIndex((index + 1) % props.items.length);
            setAnimation(1);
        }
        else{
            let tmp = (index - 1) % props.items.length;
            if (tmp < 0)
                setIndex(tmp + props.items.length);
            else
                setIndex(tmp);
            setAnimation(-1);
        }
    }

    /**
     * When clicked on indexchart buttons (○○○○●○)
     * calculate from where the sliding animation stats.
     * I.E. Chose the smallest possible sliding path
     */
    const changeIndex = (event) => {
        let newIndex = parseInt(event.target.id);
        setAnimation(function () {      // to understand this algorithm read following on the right:  Let indexchart be (x○○○●○). ● is the current index and x is the chosen index.
            let jumps = [                                                                           // Imagine 3 copies of it placed consecutively x○○○●○x○○○●○x○○○●○
                newIndex - index - props.items.length,                                             // Let three variables be the jump from the current index of middle to
                newIndex - index,                                                                  // chosen from at left, chosen at middle, and chosen at right.
                newIndex - index + props.items.length                                              // Then chose the smallest possible sliding path.
            ];  // 0: left, 1: middle, 2: right ind the explanation.
            let smallest = props.items.length;
            for(var i = 0; i < jumps.length; i++){
                if (Math.abs(jumps[i]) < Math.abs(smallest))
                    smallest = jumps[i];
            }
            return smallest;
        });
        setIndex(newIndex);
    }

    /**
     * Slide next every 5 seconds 
     */
    const indexRef = useRef(index);
    indexRef.current = index;
    const startSliding = () => {
        const slide = () => {
            setIndex((indexRef.current + 1) % props.items.length);
            setAnimation(1);
        }
        setTimeoutState(setTimeout(function(){
            startSliding();
            slide();
        }, 5000));
    }

    const startTimeout = () => {
        if (timeout == null)        // Condition check is not to be placed in startSliding() without a container because: https://github.com/facebook/react/issues/14010
            startSliding();
    }
    
    const pauseTimeout = () => {
        clearTimeout(timeout);
    }
    
    const animate = () => {
        document.documentElement.style.setProperty("--slide-amount", (animation / props.itemsPerPage) + "");
        setClassName("carousel-row");
        setTimeout(function(){
            setClassName("");
            setAnimation(0);
        }, 100);
    }

    useEffect(() => {
        animate();
    }, [animation]);
    
    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    startTimeout();

    // create an array that contains only the items to be shown.
    let activeitems = [];
    for(var i = 0; i < props.itemsPerPage; i++)
        activeitems[i] = props.items[(index + i) % props.items.length];

    // And an array of integers each corresponding to a button
    let buttons = [];
    for (var i = 0; i < props.items.length; i++)
        buttons[i] = i;
    
    return (
        <div id="carousel" onMouseOver={pauseTimeout} onMouseOut={startSliding}>
            <span className="carousel-button" id="prev" onClick={prevNext}> {HELP[0]} </span>
            <span className="carousel-button" id="next" type="right" onClick={prevNext}> {HELP[1]} </span>
            <div className={className} id="bodyrow">
                {activeitems}
            </div>
            <div className="App">
                {buttons.map((value) => {
                    return(
                        <span>
                            {(value === index) ?
                                <span id={value} className="carousel-indexbtn" onClick={pauseTimeout} >○</span>
                            :
                                <span id={value} className="active-indexbtn" onClick={changeIndex}>●</span>
                            }
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

export default Carousel;