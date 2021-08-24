import React from 'react';
import ReactPlayer from 'react-player'


/**
 * WHY: I am given the task to figure out if it is possible to make a video add auto-player using react.
 *      And since I am using this as a dumping-playground, I've decided to try to implement the task on this project.
 */

const VIDEOS = [
    "http://www.youtube.com/watch?v=zmr2I8caF0c",
    "http://www.youtube.com/watch?v=UO_QuXr521I",
    "http://www.youtube.com/watch?v=PCicKydX5GE"    //,    "https://vimeo.com/211243613",    "http://vimeo.com/61060547",    "https://vimeo.com/681254",    "https://vimeo.com/395909713",    "http://vimeo.com/568018248"
];


// Chrome disables autoplay without muting
class Video extends React.Component {

    constructor(props){
        super(props);
        this.nextVideo = this.nextVideo.bind(this);
    }

    state = {
        'index': 0
    }

    nextVideo() {
        this.setState({'index': (this.state.index + 1) % VIDEOS.length});
    }

    // Not needed:    componentDidUpdate(prevState){        // API can only be initiated by a user gesture        //        let element = document.getElementById("video"); //id="video"        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;        if (requestMethod) { // Native full screen.            requestMethod.call(element);        }        console.log("requested fullscreen: " + requestMethod);    }

    render() {
        return(
            <div>
                {VIDEOS.map((value, index) => {
                    return(
                        <span>
                            {(this.state.index === index) ?
                                <ReactPlayer
                                    url={value}
                                    width="100vw"
                                    height="100vh"
                                    playing={true}
                                    onEnded={this.nextVideo}
                                    config={{
                                        youtube: {
                                            playerVars: {
                                                rel: 0,
                                                autohide: 1,
                                                showinfo: 0,
                                                playsinline: 0,
                                                modestbranding: 1,
                                                controls: 0
                                            }
                                        },
                                        vimeo: {
                                            playerVars: {
                                                
                                            }
                                        }
                                    }}
                                ></ReactPlayer>
                            :
                                <span> </span>
                            }
                        </span>
                    )
                })}
            </div>
        );
    }
}

export default Video