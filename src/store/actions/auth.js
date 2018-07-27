import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START,
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    }
}

export const authFail = (err) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: err,
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken: true,
        }
        let url= 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBCMhSmLY8Cja8Jb0sfBvoE-OBskYV775c';
        if(!isSignup){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBCMhSmLY8Cja8Jb0sfBvoE-OBskYV775c'
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
        })
        .catch(err=>{
            console.log(err)
            dispatch(authFail(err));
        })
    }
}