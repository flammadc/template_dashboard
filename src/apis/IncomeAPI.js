import { api } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const IncomeAPI = {
  get: async function (token, id, cancel = false) {
    const response = await api.request({
      url: `/incomes/${id}`,
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
  stats: async function (token, cancel = false) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.request({
          url: `/incomes/stats`,
          method: "GET",
          // retrieving the signal value by using the property name
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: cancel
            ? cancelApiObject[this.get.name].handleRequestCancellation().signal
            : undefined,
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  total: function (token, cancel = false) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.request({
          url: `/incomes/total`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // retrieving the signal value by using the property name
          signal: cancel
            ? cancelApiObject[this.get.name].handleRequestCancellation().signal
            : undefined,
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });

    // returning the product returned by the API
  },
  getAll: async function (token, cancel = false) {
    const response = await api.request({
      url: "/incomes/",
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
      url: `/incomes`,
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
      url: `/incomes/${id}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { _method: "PUT", ...data },
      signal: cancel
        ? cancelApiObject[this.create.name].handleRequestCancellation().signal
        : undefined,
    });
  },
  delete: async function (token, id, cancel = false) {
    await api.request({
      url: `/incomes/${id}`,
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

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(IncomeAPI);
