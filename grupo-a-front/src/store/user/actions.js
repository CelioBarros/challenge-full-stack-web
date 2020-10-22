import axios from "@/axios";

export default {
  getUsers(context, params) {
    return axios.get(`users`, { params });
  },
  saveUser(context, user) {
    return axios.post(`users`, user);
  },
  editUser(context, user) {
    return axios.put(`users/${user.ra}`, user);
  },
  deleteUser(context, ra) {
    return axios.delete(`users/${ra}`);
  }
};
