
/**
 * I(seco) created this file in hopes of properly structuring redux in this project
 * I had failed that time and this is not in use.
 * Even though I understad it now, I haven't bothered to change it to this way.
 */

export default function (state = null, action) {
    switch (action.type) {
        case 'USER_SIGNED_IN': {
            console.log("AAAA",action.payload);
            return action.payload;
        }
        default: {
            break;
        }
    }
    return state;
}