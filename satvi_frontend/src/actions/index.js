
/**
 * I(seco) created this file in hopes of properly structuring redux in this project
 * I had failed that time and this is not in use.
 * Even though I understad it now, I haven't bothered to change it to this way.
 */


export const user_signin = (obtainJSONWebToken) => {
    console.log('User signed in: ', obtainJSONWebToken.tokenAuth.token)
    return {
        type: 'USER_SIGNED_IN',
        payload: obtainJSONWebToken
    }
}