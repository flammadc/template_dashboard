import { api } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";
import Cookies from "universal-cookie";

const token = new Cookies().get("user_token");

export const OutcomeAPI = {
  get: async function (id, cancel = false) {
    const response = await api.request({
      url: `/outcomes/:id`,
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
  stats: async function (cancel = false) {
    const response = await api.request({
      url: `/outcomes/stats`,
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

  total: async function (cancel = false) {
    const response = await api.request({
      url: `/outcomes/total`,
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
  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/outcomes/",
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
  search: async function (name, cancel = false) {
    const response = await api.request({
      url: "/outcomes/search",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        name: name,
      },
      signal: cancel
        ? cancelApiObject[this.search.name].handleRequestCancellation().signal
        : undefined,
    });

    return response.data.products;
  },
  create: async function (product, cancel = false) {
    await api.request({
      url: `/outcomes`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: product,
      signal: cancel
        ? cancelApiObject[this.create.name].handleRequestCancellation().signal
        : undefined,
    });
  },
};

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(OutcomeAPI);
