import { api } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";
import Cookies from "universal-cookie";

export const TeamAPI = {
  getAll: async function (token, cancel = false) {
    const response = await api.request({
      url: "/teams/",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: cancel
        ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal
        : undefined,
    });

    return response.data;
  },
  get: async function (token, id, cancel = false) {
    const response = await api.request({
      url: `/teams/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // retrieving the signal value by using the property name
      signal: cancel
        ? cancelApiObject[this.get.name].handleRequestCancellation().signal
        : undefined,
    });

    // returning the product returned by the API
    return response.data;
  },
  update: async function (token, id, user, cancel = false) {
    const response = await api.request({
      url: `/teams/${id}`,
      method: "POST",
      data: { _method: "PUT", ...user },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      // retrieving the signal value by using the property name
      signal: cancel
        ? cancelApiObject[this.get.name].handleRequestCancellation().signal
        : undefined,
    });

    // returning the product returned by the API
    return response.data;
  },
  delete: async function (token, id, cancel = false) {
    const response = await api.request({
      url: `/teams/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // retrieving the signal value by using the property name
      signal: cancel
        ? cancelApiObject[this.get.name].handleRequestCancellation().signal
        : undefined,
    });

    // returning the product returned by the API
    return response.data;
  },
};

// defining the cancel API object for TeamAPI
const cancelApiObject = defineCancelApiObject(TeamAPI);
