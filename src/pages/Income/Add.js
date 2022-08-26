import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PageTitle from "../../components/Typography/PageTitle";
import { Input, HelperText, Label, Textarea, Button } from "@windmill/react-ui";
import CustomCreatable from "../../components/Creatable";

function Add() {
  return (
    <>
      <PageTitle>Add Income</PageTitle>

      <div className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Name</span>
          <Input className="mt-1" placeholder="Product Name" />
        </Label>

        <Label className="mt-3 flex flex-col gap-1">
          <span>Category</span>
          <Input className="mt-1" placeholder="Product Category" />
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
          className="mt-6 w-auto"
          size="large"
          tag={Link}
          to="/app/income"
        >
          Submit
        </Button>
      </div>
    </>
  );
}

export default Add;
