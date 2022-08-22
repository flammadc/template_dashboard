import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PageTitle from "../../components/Typography/PageTitle";
import { Input, HelperText, Label, Textarea, Button } from "@windmill/react-ui";
import CustomCreatable from "../../components/Creatable";
import response from "../../utils/demo/tableData";

function Edit() {
  const response2 = response.concat([]);

  /**
   * DISCLAIMER: This code could be badly improved, but for the sake of the example
   * and readability, all the logic for both table are here.
   * You would be better served by dividing each table in its own
   * component, like Table(?) and TableWithActions(?) hiding the
   * presentation details away from the page view.
   */

  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1);
  const [pageTable2, setPageTable2] = useState(1);

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([]);
  const [dataTable2, setDataTable2] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p);
  }

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable1(
      response.slice(
        (pageTable1 - 1) * resultsPerPage,
        pageTable1 * resultsPerPage
      )
    );
  }, [pageTable1]);

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable2(
      response2.slice(
        (pageTable2 - 1) * resultsPerPage,
        pageTable2 * resultsPerPage
      )
    );
  }, [pageTable2]);
  return (
    <>
      <PageTitle>Edit Product</PageTitle>

      <div className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div>
          {dataTable2.map((product, i) => (
            <Label>
              <span>Name</span>
              <Input className="mt-1" value={product.name} />
            </Label>
          ))}
        </div>
        {/* <Label>
          <span>Name</span>
          <Input className="mt-1" placeholder="Product Name" />
        </Label>

        <Label className="mt-3 flex flex-col gap-1">
          <span>Category</span>
          <CustomCreatable></CustomCreatable>
        </Label>
        <div className="block w-full text-sm dark:text-gray-300 focus:outline-none rounded-md focus:border-purple-400 border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring focus:ring-purple-300 dark:focus:ring-gray-300 dark:focus:border-gray-600"></div>
        <Label className="mt-3">
          <span>Stock</span>
          <Input className="mt-1" type="number" placeholder="Product Stock" />
        </Label>
        <Label className="mt-3">
          <span>Price</span>
          <Input className="mt-1" placeholder="Product Price" />
        </Label> */}
        <Button
          className="mt-6 w-auto"
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

export default Edit;
