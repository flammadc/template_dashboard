import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ProductAPI } from "../../apis/ProductAPI";

import PageTitle from "../../components/Typography/PageTitle";
import { Input, Label, Button, Select } from "@windmill/react-ui";
import { useSelector } from "react-redux";
import { CategoryAPI } from "../../apis/CategoryAPI";
import { IncomeAPI } from "../../apis/IncomeAPI";
import { OutcomeAPI } from "../../apis/OutcomeAPI";

function Add() {
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  const [outcome, setOutcome] = useState({
    product_id: null,
    price: null,
    quantity: null,
  });
  const [newProduct, setNewProduct] = useState({
    status: false,
    name: "",
    category_id: null,
  });
  const [categories, setCategories] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [dataDropdown, setDataDropdown] = useState();
  const [products, setProducts] = useState();
  const [product, setProduct] = useState();
  const [selectedProduct, setSelectedProduct] = useState();

  useEffect(() => {
    const getProducts = async () => {
      const res = await ProductAPI.getAll(user.token);
      setProducts(res);
      setDataDropdown(res);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const res = await CategoryAPI.getAll(user.token);
      setCategories(res);
    };
    getCategories();
  }, []);

  const getSelectedProduct = async (id) => {
    const res = await ProductAPI.get(user.token, id);
    setSelectedProduct(res);
    setOutcome({
      ...outcome,
      product_id: res.id,
      price: res.price,
    });
  };

  const handleProductChange = (e) => {
    setProduct(e.target.value);
    setShowDropdown(true);
    const search = new RegExp(product, "i"); // prepare a regex object
    setDataDropdown(products.filter((item) => search.test(item.name)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newProduct.status) {
      const res = await ProductAPI.create(user.token, {
        ...newProduct,
        price: outcome.price,
      });
      await OutcomeAPI.create(user.token, {
        ...outcome,
        product_id: res.id,
      });
    } else {
      await OutcomeAPI.create(user.token, outcome);
    }

    history.push("/app/outcome");
  };

  return (
    <>
      <PageTitle>Add Outcome</PageTitle>

      <form
        className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
        onSubmit={handleSubmit}
      >
        <Label className="relative">
          <span>Product</span>
          <Input
            className="mt-1"
            placeholder="Product Name"
            value={product}
            onChange={handleProductChange}
          />
          {showDropdown && (
            <div
              className="absolute w-full h-auto overflow-y-auto bg-white dark:bg-gray-700 border border-purple-400 dark:border-gray-600 z-20"
              style={{ top: "100%", maxHeight: "120px" }}
            >
              {dataDropdown &&
                dataDropdown.map((data) => (
                  <p
                    key={data.id}
                    className="pl-3 bg-white dark:bg-gray-700 hover:text-white py-2 dark:text-gray-300 hover:bg-purple-400 dark:hover:bg-gray-500 cursor-pointer"
                    onClick={() => {
                      setShowDropdown(false);
                      setProduct(data.name);
                      getSelectedProduct(data.id);
                      setNewProduct({ ...newProduct, status: false });
                    }}
                  >
                    {data.name}
                  </p>
                ))}
              <p
                className="pl-3 hover:text-white py-2 dark:text-gray-300 hover:bg-purple-400 dark:hover:bg-gray-500 cursor-pointer"
                onClick={(e) => {
                  setShowDropdown(false);
                  setNewProduct({ ...newProduct, status: true, name: product });
                  setSelectedProduct(null);
                  setOutcome({ ...outcome, product_id: null });
                }}
              >
                Tambah Produk Baru {`( ${product} )`}
              </p>
            </div>
          )}
        </Label>

        <Label className="mt-3 flex flex-col gap-1 relative">
          <span>Category</span>
          <Select
            className="mt-1"
            value={selectedProduct && selectedProduct.category_id}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category_id: e.target.value })
            }
            readOnly={selectedProduct}
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
          <span>Price</span>
          <Input
            className="mt-1"
            type="number"
            value={selectedProduct && selectedProduct.price}
            onChange={(e) =>
              setOutcome({
                ...outcome,
                price: e.target.value,
              })
            }
            readOnly={selectedProduct}
          />
        </Label>
        <Label className="mt-3">
          <span>Quantity</span>
          <Input
            className="mt-1"
            type="number"
            value={outcome.quantity}
            onChange={(e) =>
              setOutcome({ ...outcome, quantity: e.target.value })
            }
          />
        </Label>
        <Button className="mt-6 w-auto" size="large" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

export default Add;
