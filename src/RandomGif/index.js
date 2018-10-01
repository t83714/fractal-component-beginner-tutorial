import React from "react";
import { AppContainerUtils } from "fractal-component";
import * as actionTypes from "./actions/types";
import reducer from "./reducers";
import * as actions from "./actions";
import saga from "./sagas";

class RandomGif extends React.Component {
    constructor(props) {
        super(props);
        // --- initialise component state
        this.state = {
            isLoading: false,
            imageUrl: null,
            error: null
        };
        this.componentManager = AppContainerUtils.registerComponent(this, {
            namespace: "io.github.t83714/RandomGif",
            // --- register all action types so that actions are serialisable
            actionTypes,
            reducer,
            saga
        });
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.imageUrl &&
                        !this.state.isLoading &&
                        !this.state.error && (
                            <img
                                src={this.state.imageUrl}
                                width="250px"
                                height="250px"
                            />
                        )}
                    {(!this.state.imageUrl || this.state.isLoading) &&
                        !this.state.error && (
                            <p>
                                {this.state.isLoading
                                    ? "Requesting API..."
                                    : "No GIF loaded yet!"}
                            </p>
                        )}
                    {this.state.error && (
                        <p>{`Failed to request API: ${this.state.error}`}</p>
                    )}
                </div>
                <div>
                    <button
                        onClick={() => {
                            this.componentManager.dispatch(
                                actions.requestNewGif()
                            );
                        }}
                        disabled={this.state.isLoading}
                    >
                        {this.state.isLoading ? "Requesting API..." : "Get Gif"}
                    </button>
                </div>
            </div>
        );
    }
}

export default RandomGif;
