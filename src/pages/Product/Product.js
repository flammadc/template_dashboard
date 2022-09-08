import React, { useState, useEffect } from "react";

import PageTitle from "../../components/Typography/PageTitle";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableContainer,
} from "@windmill/react-ui";

import { ProductAPI } from "../../apis/ProductAPI";
import DataTable from "./DataTable";
import { useSelector } from "react-redux";
// make a copy of the data, for the second table

const Product = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [products, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      const res = await ProductAPI.getAll(user.token);
      setProducts(res);
    };
    getProducts();
  }, []);

  return (
    <>
      <PageTitle className="bg-white">Product</PageTitle>
      <div className="grid gap-6 mb-8 grid-cols-3">
        <TableContainer className="col-span-3">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Product Change</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {products &&
                products.map((product) => (
                  <DataTable product={product} key={product.id} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Product;
