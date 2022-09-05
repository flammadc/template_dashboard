import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PageTitle from "../../components/Typography/PageTitle";
import { OutcomeAPI } from "../../apis/OutcomeAPI";
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

const Outcome = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [outcomes, setOutcomes] = useState();

  useEffect(() => {
    const getIncomes = async () => {
      const res = await OutcomeAPI.getAll(user.token);
      setOutcomes(res);
    };
    getIncomes();
  }, []);

  return (
    <>
      <PageTitle className="bg-white">Outcome</PageTitle>
      <div className="grid gap-6 mb-8 grid-cols-3">
        <Button className="col-span-1" tag={Link} to="/app/outcome/add">
          Add Outcome
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
              {outcomes &&
                outcomes.map((outcome) => (
                  <DataTable outcome={outcome} key={outcome.id} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Outcome;
