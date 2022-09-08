import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ProductAPI } from "../../apis/ProductAPI";

import PageTitle from "../../components/Typography/PageTitle";
import { Input, Label, Button, Select, HelperText } from "@windmill/react-ui";
import { useSelector } from "react-redux";
import { CategoryAPI } from "../../apis/CategoryAPI";
import { IncomeAPI } from "../../apis/IncomeAPI";

function Add() {
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  const [income, setIncome] = useState({
    product_id: null,
    price: null,
    quantity: null,
  });
  const [error, setError] = useState({ quantity: "" });
  const [products, setProducts] = useState();
  const [product, setProduct] = useState();

  useEffect(() => {
    const getProducts = async () => {
      const res = await ProductAPI.getAll(user.token);
      setProducts(res);
    };
    getProducts();
  }, []);

  const getProductCategory = async (productId) => {
    const resProduct = await ProductAPI.get(user.token, productId);
    setProduct(resProduct);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (income.quantity > product.stock) {
      setError({ ...error, quantity: "Stock Produk Tidak Cukup" });
      return;
    }
    await IncomeAPI.create(user.token, { ...income, price: product.price });
    history.push("/app/income");
  };

  return (
    <>
      <PageTitle>Add Income</PageTitle>

      <form
        className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
        onSubmit={handleSubmit}
      >
        <Label className="mt-3 flex flex-col gap-1 relative">
          <span>Product</span>
          <Select
            className="mt-1"
            value={income.product_id}
            onChange={(e) => {
              setIncome({ ...income, product_id: e.target.value });
              getProductCategory(e.target.value);
            }}
          >
            <option defaultValue hidden>
              Choose Product
            </option>
            {products &&
              products.map((p) => {
                return (
                  <option value={p.id} key={p.id}>
                    {p.name}
                  </option>
                );
              })}
          </Select>
        </Label>

        <Label className="mt-3 flex flex-col gap-1 relative">
          <span>Category</span>
          <Input
            className="mt-1"
            type="text"
            value={product?.category.name}
            readOnly
          />
        </Label>

        <div className="block w-full text-sm dark:text-gray-300 focus:outline-none rounded-md focus:border-purple-400 border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring focus:ring-purple-300 dark:focus:ring-gray-300 dark:focus:border-gray-600"></div>
        <Label className="mt-3">
          <span>Price</span>
          <Input
            className="mt-1"
            type="number"
            value={product?.price}
            readOnly
          />
        </Label>
        <Label className="mt-3">
          <span>Quantity</span>
          <Input
            className="mt-1"
            type="number"
            value={income.quantity}
            onChange={(e) => setIncome({ ...income, quantity: e.target.value })}
          />
          <HelperText valid={!error.quantity}>{error.quantity}</HelperText>
        </Label>
        <Button className="mt-6 w-auto" size="large" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

export default Add;
