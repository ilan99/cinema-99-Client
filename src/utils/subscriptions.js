import axios from "axios";

// const urlSubscriptions = "http://localhost:8000/subscriptions";

const urlSubscriptions = "https://cinema-99.up.railway.app/subscriptions";

const getSubscriptionById = (subscriptionId) => {
  return axios.get(`${urlSubscriptions}/${subscriptionId}`);
};

const getAllSubscriptions = () => {
  return axios.get(urlSubscriptions);
};

const getAllSubscriptionsByRef = () => {
  return axios.get(`${urlSubscriptions}/ref`);
};

const updateSubscription = (id, subscription) => {
  return axios.put(`${urlSubscriptions}/${id}`, subscription);
};

const addSubscription = (subscription) => {
  return axios.post(urlSubscriptions, subscription);
};

const deleteSubscription = (subscriptionId) => {
  return axios.delete(`${urlSubscriptions}/${subscriptionId}`);
};

export {
  getSubscriptionById,
  getAllSubscriptions,
  getAllSubscriptionsByRef,
  updateSubscription,
  addSubscription,
  deleteSubscription,
};
