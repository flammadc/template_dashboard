import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PageTitle from "../../components/Typography/PageTitle";
import { IncomeAPI } from "../../apis/IncomeAPI";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableContainer,
  Button,
} from "@windmill/react-ui";

import DataTable from "./DataTable";
import { useSelector } from "react-redux";
// make a copy of the data, for the second table

const Income = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [incomes, setIncomes] = useState();

  useEffect(() => {
    const getIncomes = async () => {
      const res = await IncomeAPI.getAll(user.token);
      setIncomes(res);
    };
    getIncomes();
  }, []);

  return (
    <>
      <PageTitle className="bg-white">Income</PageTitle>
      <div className="grid gap-6 mb-8 grid-cols-3">
        <Button className="col-span-1" tag={Link} to="/app/income/add">
          Add Income
        </Button>
        <TableContainer className="col-span-3">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {incomes &&
                incomes.map((income) => (
                  <DataTable income={income} key={income.id} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Income;
