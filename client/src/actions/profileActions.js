import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  PROFILE_NOT_FOUND,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILE_BY_HANDLE,
  VIEW_DEVELOPER_PROFILE,
  INVALID_GITHUB_USERNAME
} from "./types";

//Get current user profile

export const getCurrentProfile = () => dispatch => {
  dispatch(profileLoading());
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: PROFILE_NOT_FOUND,
        payload: {}
      });
    });
};

export const profileLoading = () => {
  return {
    type: PROFILE_LOADING,
    payload: { loading: true }
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
    payload: {
      profile: null
    }
  };
};

//Create Profile

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteAccount = () => dispatch => {
  if (
    window.confirm(
      "Are you sure you want to delete your account? This cannot be reverted!"
    )
  ) {
    axios
      .delete("/api/profile")
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteExperience = expId => dispatch => {
  axios
    .delete(`/api/profile/experience/${expId}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { delete: "Error deleting experience" }
      })
    );
};

export const deleteEducation = eduId => dispatch => {
  axios
    .delete(`/api/profile/education/${eduId}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { delete: "Error deleting education" }
      })
    );
};

export const getProfiles = () => dispatch => {
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { delete: "Error fetching profiles" }
      })
    );
};

export const getProfileByHandle = handle => dispatch => {
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => {
      console.log(res.data);

      //we also want to view get developer repos
      let clientId = "b40ad624918b8a03149c",
        clientSecret = "dd820583d9cf0dc59f86840fba5270a4c516698c",
        count = 5,
        sort = "created: asc";

      fetch(
        `https://api.github.com/users/${
          res.data.githubusername
        }/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
      )
        .then(resp => resp.json())
        .then(data => {
          if (Array.isArray(data)) {
            dispatch({
              type: VIEW_DEVELOPER_PROFILE,
              payload: {
                repos: data,
                gitHubErrorOcurred: false
              }
            });
            dispatch({
              type: GET_PROFILE_BY_HANDLE,
              payload: res.data
            });
          } else {
            dispatch({
              type: INVALID_GITHUB_USERNAME,
              payload: {
                repos: [],
                gitHubErrorOcurred: true
              }
            });

            dispatch({
              type: GET_PROFILE_BY_HANDLE,
              payload: res.data
            });
          }
        });
    })
    .catch(err =>
      dispatch({
        type: PROFILE_NOT_FOUND,
        payload: {}
      })
    );
};
