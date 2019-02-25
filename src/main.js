import "@babel/polyfill";

import React from "react";
import ReactDOM from "react-dom";
import RandomGif from "./RandomGif";
import RandomGifPair from "./RandomGifPair";
import { AppContainer, AppContainerContext } from "fractal-component";

const appContainer = new AppContainer();

ReactDOM.render(
    <AppContainerContext.Provider value={appContainer}>
        <div>
            <div>
                <RandomGif />
            </div>
            <div>
                <RandomGifPair />
            </div>
        </div>
    </AppContainerContext.Provider>,
    document.getElementById("root")
);
