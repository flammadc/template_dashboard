import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PageTitle from "../../components/Typography/PageTitle";
import { Input, Label, Button, Select } from "@windmill/react-ui";

function Add() {
  const [category, setCategory] = useState(["Fruit", "Spice", "Food"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dropdownData, setDropdownData] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    stock: null,
    price: null,
  });
  const [showCategory, setShowCategory] = useState(false);

  const handleCategoryChange = (keyword) => {
    var search = new RegExp(keyword, "i"); // prepare a regex object
    let filteredCategory = category.filter((item) => search.test(item));
    setDropdownData(filteredCategory);
    setShowCategory(true);
  };

  return (
    <>
      <PageTitle>Add Product</PageTitle>

      <div className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
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
          <Select className="mt-1">
            <option selected hidden>
              Choose Category
            </option>
            {category &&
              category.map((c, i) => {
                return <option value={i}>{c}</option>;
              })}
          </Select>
        </Label>
        <div className="block w-full text-sm dark:text-gray-300 focus:outline-none rounded-md focus:border-purple-400 border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring focus:ring-purple-300 dark:focus:ring-gray-300 dark:focus:border-gray-600"></div>
        <Label className="mt-3">
          <span>Stock</span>
          <Input className="mt-1" type="number" placeholder="Product Stock" />
        </Label>
        <Label className="mt-3">
          <span>Price</span>
          <Input className="mt-1" placeholder="Product Price" />
        </Label>
        <Button
          className="mt-6 w-aut
          o"
          size="large"
          tag={Link}
          to="/app/product"
        >
          Submit
        </Button>
      </div>
    </>
  );
}

export default Add;
