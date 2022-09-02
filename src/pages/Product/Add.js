import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import PageTitle from "../../components/Typography/PageTitle";
import { Input, Label, Button, Select } from "@windmill/react-ui";
import { CategoryAPI } from "../../apis/CategoryAPI";
import { ProductAPI } from "../../apis/ProductAPI";

function Add() {
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const [product, setProduct] = useState({
    name: "",
    category_id: "",
    stock: null,
    price: null,
  });

  useEffect(() => {
    const getCategories = async () => {
      const category = await CategoryAPI.getAll();
      setCategories(category);
    };
    getCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    ProductAPI.create(product).then(() => {
      history.push("/app/product");
    });
  };

  return (
    <>
      <PageTitle>Add Product</PageTitle>

      <form
        className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
        onSubmit={handleSubmit}
      >
        <Label>
          <span>Name</span>
          <Input
            className="mt-1"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </Label>

        <Label className="mt-3 flex flex-col gap-1 relative">
          <span>Category</span>
          <Select
            className="mt-1"
            value={product.category_id}
            onChange={(e) =>
              setProduct({ ...product, category_id: e.target.value })
            }
          >
            <option defaultValue hidden>
              Choose Category
            </option>
            {categories &&
              categories.map((c) => {
                return (
                  <option value={c.id} key={c.id}>
                    {c.name}
                  </option>
                );
              })}
          </Select>
        </Label>
        <div className="block w-full text-sm dark:text-gray-300 focus:outline-none rounded-md focus:border-purple-400 border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring focus:ring-purple-300 dark:focus:ring-gray-300 dark:focus:border-gray-600"></div>
        <Label className="mt-3">
          <span>Stock</span>
          <Input
            className="mt-1"
            type="number"
            placeholder="Product Stock"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          />
        </Label>
        <Label className="mt-3">
          <span>Price</span>
          <Input
            className="mt-1"
            type="number"
            placeholder="Product Price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </Label>
        <Button
          className="mt-6 w-aut
          o"
          size="large"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
}

export default Add;
