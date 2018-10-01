import * as actionTypes from "../actions/types";
import * as actions from "../actions";

function fetchGif(apiKey) {
    return fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`
    ).then(response => response.json()).catch(error=>{
        throw new Error("Giphy API key is invalid or exceeded its daily / hourly limit.");
    });
}

const mainSaga = function*(effects) {
    try{
        while(true){
            // --- create an effect of taking an `REQUEST_NEW_GIF` action from this Component's action channel
            // --- Until an action is available for being taken, this saga will not resume its execution.
            const action = yield effects.take(actionTypes.REQUEST_NEW_GIF);
            const response = yield effects.call(fetchGif, "Y4P38sTJAgEBOHP1B3sVs0Jtk01tb6fA");
            const imgUrl = response.data.fixed_width_small_url;
            yield effects.put(actions.receiveNewGif(imgUrl));
        }
    }catch(e){
        yield effects.put(actions.requestNewGifError(e));
    }
};
export default mainSaga;
