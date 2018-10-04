import "@babel/polyfill";

import React from "react";
import ReactDOM from "react-dom";
import RandomGif from "./RandomGif";
import RandomGifPair from "./RandomGifPair";

ReactDOM.render(
    <div>
        <div>
            <RandomGif />
        </div>
        <div>
            <RandomGifPair />
        </div>
    </div>,
    document.getElementById("root")
);
