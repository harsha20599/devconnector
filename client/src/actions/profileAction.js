import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(function (error) {
        console.log(error);
        dispatch({
          type: GET_PROFILE,
          payload: {}
        });
    });
};

// Proifle loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// clear Proifle
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
