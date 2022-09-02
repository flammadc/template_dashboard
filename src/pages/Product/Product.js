import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PageTitle from "../../components/Typography/PageTitle";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
} from "@windmill/react-ui";

import response from "../../utils/demo/tableData";
import { ProductAPI } from "../../apis/ProductAPI";
import DataTable from "./DataTable";
// make a copy of the data, for the second table

const Product = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      const res = await ProductAPI.getAll();
      setProducts(res);
    };
    getProducts();
  }, []);

  return (
    <>
      <PageTitle className="bg-white">Product</PageTitle>
      <div className="grid gap-6 mb-8 grid-cols-3">
        <Button className="col-span-1" tag={Link} to="/app/product/add">
          Add Product
        </Button>
        <TableContainer className="col-span-3">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Product</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {products &&
                products.map((product) => (
                  <DataTable
                    product={product}
                    categoryId={product.categoryId}
                    key={product.id}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Product;
