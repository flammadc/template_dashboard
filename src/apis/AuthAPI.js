import { api } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const AuthAPI = {
  login: async function (cancel = false) {
    const response = await api.request({
      url: `/auth/login`,
      method: "POST",
      data: { email: "andi@gmail.com", password: "12345" },
      headers: {
        "Access-Control-Allow-Origin": true,
      },
      // retrieving the signal value by using the property name
      signal: cancel
        ? cancelApiObject[this.get.name].handleRequestCancellation().signal
        : undefined,
    });

    // returning the user data returned by the API
    return response.data;
  },
  register: async function (user, cancel = false) {
    await api.request({
      url: `/auth/register`,
      method: "POST",
      data: user,
      signal: cancel
        ? cancelApiObject[this.create.name].handleRequestCancellation().signal
        : undefined,
    });
  },
  logout: async function (id, cancel = false) {
    const response = await api.request({
      url: `/auth/logout/:id`,
      method: "POST",
      // retrieving the signal value by using the property name
      signal: cancel
        ? cancelApiObject[this.get.name].handleRequestCancellation().signal
        : undefined,
    });

    return response.data;
  },
};

// defining the cancel API object for AuthAPI
const cancelApiObject = defineCancelApiObject(AuthAPI);
