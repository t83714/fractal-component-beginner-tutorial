import React from "react";
import { AppContainerUtils } from "fractal-component";
import reducer from "./reducers";
import { click } from "./actions";

class RandomGif extends React.Component {
    constructor(props) {
        super(props);
        // --- initialise component state
        this.state = {
            isSwitchOn: false
        };
        this.componentManager = AppContainerUtils.registerComponent(this, {
            namespace: "io.github.t83714/RandomGif",
            reducer
        });
    }

    render() {
        return (
            <button onClick={() => {
                this.componentManager.dispatch(click());
            }}>
                {this.state.isSwitchOn ? "Switch ON" : "Switch OFF"}
            </button>
        );
    }
}

export default RandomGif;
