import * as actionTypes from "../actions/types";
import * as actions from "../actions";

function fetchGif(apiKey) {
    return fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`
    ).then(response => response.json()).catch(error=>{
        throw new Error("Giphy API key is invalid or exceeded its daily / hourly limit.");
    });
}

const mainSaga = function*(effects, apiKey) {
    try{
        while(true){
            /**
             * Dedicated LOADING_START action to notify interested components outside
             * This component will not use it in any way
             */
            yield effects.put(actions.loadingStart(), "../../../*");

            // --- create an effect of taking an `REQUEST_NEW_GIF` action from this Component's action channel
            // --- Until an action is available for being taken, this saga will not resume its execution.
            const action = yield effects.take(actionTypes.REQUEST_NEW_GIF);
            const response = yield effects.call(fetchGif, apiKey);
            const imgUrl = response.data.fixed_width_small_url;
            yield effects.put(actions.receiveNewGif(imgUrl));

             /**
             * The optional second `relativeDispatchPath` parameter defines
             * the relative (from current component full namespace path) namespace dispatch path.
             * i.e. suppose the current component full namespace path is:
             *  namespacePrefix        namespace                  random component ID
             *    `xxxxxx`   /  `io.github.t83714/RandomGif`  /        `cx`
             * e.g. `exampleApp/Gifs/io.github.t83714/RandomGif/c0`
             * If `relativeDispatchPath` is `../../../*`, the effective dispatch path is `exampleApp/Gifs/*`.
             * Although, theoretically, you could use `relativeDispatchPath` & ".." to dispatch the action
             * into any namespace, you should throw the action just out of the your component 
             * as you are supposed to know nothing about outside world as a component author.
             */
            //--- optional second `relativeDispatchPath` parameter
            //--- specify the action dispatch path
            yield effects.put(actions.newGif(), "../../../*");

            /**
             * Dedicated LOADING_COMPLETE action to notify interested components outside
             */
            yield effects.put(actions.loadingComplete(), "../../../*");
        }
    }catch(e){
        yield effects.put(actions.requestNewGifError(e));
        /**
         * Dedicated LOADING_COMPLETE action to notify interested components outside
         * This component will not use it in any way
         */
        yield effects.put(actions.loadingComplete(e), "../../../*");
    }
};
export default mainSaga;
