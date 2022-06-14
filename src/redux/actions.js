// General
const setDisplayBar = (value) => {
  return { type: "SET_DISPLAY_BAR", value };
};

const setClickAll = (value) => {
  return { type: "SET_CLICK_ALL", value };
};

const setCrossFind = (value) => {
  return { type: "SET_CROSS_FIND", value };
};

// Users actions
const setValidLogin = (value) => {
  return { type: "SET_VALID_LOGIN", value };
};

const setUserData = (userId, userName, firstName, lastName) => {
  return { type: "SET_USER_DATA", userId, userName, firstName, lastName };
};

const setUserPermissions = (permissions) => {
  return { type: "SET_USER_PERMISSIONS", permissions };
};

const setEditUserId = (userId) => {
  return { type: "SET_EDIT_USER_ID", userId };
};

const setInitPermissionsList = () => {
  return { type: "SET_INIT_PERMISSIONS_LIST" };
};

const setEditPermissionsList = (permission, checked) => {
  return { type: "SET_EDIT_PERMISSIONS_LIST", permission, checked };
};

const setEditPermission = (index, checked) => {
  return { type: "SET_EDIT_PERMISSION", index, checked };
};

// Movies actions
const setEditMovieId = (movieId) => {
  return { type: "SET_EDIT_MOVIE_ID", movieId };
};

const setDisplayFind = (value) => {
  return { type: "SET_DISPLAY_FIND", value };
};

const setSort = (value) => {
  return { type: "SET_SORT", value };
};

// Subscriptions actions
const setEditMemberId = (memberId) => {
  return { type: "SET_EDIT_MEMBER_ID", memberId };
};

const increaseCounter = () => {
  return { type: "INCREASE_COUNTER" };
};

export {
  setDisplayBar,
  setClickAll,
  setCrossFind,
  setValidLogin,
  setUserData,
  setUserPermissions,
  setEditUserId,
  setInitPermissionsList,
  setEditPermissionsList,
  setEditPermission,
  setEditMovieId,
  setDisplayFind,
  setSort,
  setEditMemberId,
  increaseCounter,
};
