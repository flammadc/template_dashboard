import { api } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const ProductAPI = {
  get: async function (token, id, cancel = false) {
    const response = await api.request({
      url: `/products/${id}`,
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
      url: "/products/",
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
  create: async function (token, product, cancel = false) {
    await api.request({
      url: `/products`,
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
const cancelApiObject = defineCancelApiObject(ProductAPI);
