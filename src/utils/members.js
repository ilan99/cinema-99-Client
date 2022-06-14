import axios from "axios";

// const urlMembers = "http://localhost:8000/members";

const urlMembers = "https://cinema-999.herokuapp.com/members";

const getMemberById = (memberId) => {
  return axios.get(`${urlMembers}/${memberId}`);
};

const getAllMembers = () => {
  return axios.get(urlMembers);
};

const updateMember = (id, member) => {
  return axios.put(`${urlMembers}/${id}`, member);
};

const addMember = (member) => {
  return axios.post(urlMembers, member);
};

const deleteMember = (memberId) => {
  return axios.delete(`${urlMembers}/${memberId}`);
};

export { getMemberById, getAllMembers, updateMember, addMember, deleteMember };
