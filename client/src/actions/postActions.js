import axios from "axios";
import { set } from "mongoose";
import { setProfileLoading } from "./profileActions";

import {
  ADD_POST,
  DELETE_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  GET_POST
} from "./types";

/// add post

export const addPost = (postData) => (dispatch) => {
  axios
    .post("/api/posts", postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

///delete post////////

export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`/api/posts/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

///get posts

export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};
///get post by id

export const getPost = (id) => (dispatch) => {
    dispatch(setPostLoading());
    axios
      .get(`/api/posts/${id}`)
      .then((res) =>
        dispatch({
          type: GET_POST,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_POST,
          payload: null,
        })
      );
  };

// add like to post
export const addLike = (id) => (dispatch) => {
  axios
    .post(`/api/posts/like/${id}`)
    .then((res) => dispatch(getPost()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// remove like to post
export const removeLike = (id) => (dispatch) => {
    axios
      .post(`/api/posts/unlike/${id}`)
      .then((res) => dispatch(getPost()))
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };

//set loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};
