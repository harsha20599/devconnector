import axios from "axios";
import setAuthToken from '../utils/setAuthToken';

import jwt_decode from 'jwt-decode';

import { GET_ERRORS,SET_CURRENT_USER } from "./types";
// import { decode } from "punycode";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
        // Save to localstorage
        const { token } = res.data;
        //Set token to local storage
        localStorage.setItem('jwtToken', token);
        // Set token to authHeader
        setAuthToken(token);
        //Decode the token to get the user data
        const decoded = jwt_decode(token);
        // set current user 
        dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type : SET_CURRENT_USER,
        payload : decoded
    }
}

// log user out
export const logoutUser = () => dispatch => {
  // remove the token from localstorage
  localStorage.removeItem('jwtToken');
  // Remove the auth header for future requests
  setAuthToken(false);
  //set current user to empty object which will also set authenticated to false
  dispatch(setCurrentUser({}));
}