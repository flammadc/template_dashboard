import { api } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const CategoryAPI = {
  get: async function (token, id, cancel = false) {
    const response = await api.request({
      url: `/categories/${id}`,
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
  getAll: async function (token, cancel = false) {
    const response = await api.request({
      url: "/categories/",
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
  create: async function (token, data, cancel = false) {
    await api.request({
      url: `/categories`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
      signal: cancel
        ? cancelApiObject[this.create.name].handleRequestCancellation().signal
        : undefined,
    });
  },
  update: async function (token, id, data, cancel = false) {
    await api.request({
      url: `/categories/${id}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
      signal: cancel
        ? cancelApiObject[this.create.name].handleRequestCancellation().signal
        : undefined,
    });
  },

  delete: async function (token, id, cancel = false) {
    await api.request({
      url: `/categories/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: cancel
        ? cancelApiObject[this.create.name].handleRequestCancellation().signal
        : undefined,
    });
  },
};

// defining the cancel API object for CategoryAPI
const cancelApiObject = defineCancelApiObject(CategoryAPI);
