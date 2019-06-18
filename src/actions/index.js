import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";
/* 
//========== bad approach ==========
export const fetchPosts = async () => {
  const response = await jsonPlaceholder.get('/posts');

  return {
    type: 'FETCH_POSTS',
    payload: response,
  };
};
//========== bad approach ==========
*/
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  console.log("loading...");
  await dispatch(fetchPosts());

  /*   
  //origin
  const userIds = _.uniq(_.map(getState().posts, "userId"));
  userIds.forEach(id => dispatch(fetchUser(id)));
   */

  //same shit with _.chain()
  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
  console.log("loaded!");
};

//now with redux-thunk && applyMiddleware we return a func
export const fetchPosts = () => {
  return async dispatch => {
    const response = await jsonPlaceholder.get("/posts");

    dispatch({ type: "FETCH_POSTS", payload: response.data });
  };
};

/* //pizdec with lodash memoize
export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
}); */

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};
