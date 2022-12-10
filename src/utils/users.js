import axios from "axios";

// const urlUsers = "http://localhost:8000/users";
// const urlPermissions = "http://localhost:8000/permissions";

const urlUsers = "https://cinema-99.up.railway.app/users";
const urlPermissions = "https://cinema-99.up.railway.app/permissions";

// Users
const getAllUsers = () => {
  return axios.get(urlUsers);
};

const getUserById = (userId) => {
  return axios.get(`${urlUsers}/${userId}`);
};

const getUserByName = (username) => {
  return axios.get(`${urlUsers}/un/${username}`);
};

const addUser = (user) => {
  return axios.post(urlUsers, user);
};

const updateUser = (id, user) => {
  return axios.put(`${urlUsers}/${id}`, user);
};

const deleteUser = (userId) => {
  return axios.delete(`${urlUsers}/${userId}`);
};

// Permissions
const getAllUsersPermissions = () => {
  return axios.get(urlPermissions);
};

const getUserPermissions = (id) => {
  return axios.get(`${urlPermissions}/${id}`);
};

const updateUserPermissions = (id, permissions) => {
  return axios.put(`${urlPermissions}/${id}`, permissions);
};

const addUserPermissions = (permissions) => {
  return axios.post(urlPermissions, permissions);
};

const deleteUserPermissions = (id) => {
  return axios.delete(`${urlPermissions}/${id}`);
};

export {
  getUserById,
  getUserByName,
  getAllUsers,
  getUserPermissions,
  getAllUsersPermissions,
  updateUser,
  updateUserPermissions,
  addUser,
  addUserPermissions,
  deleteUser,
  deleteUserPermissions,
};
