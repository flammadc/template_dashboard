import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IncomeAPI } from "../../apis/IncomeAPI";
import { CategoryAPI } from "../../apis/CategoryAPI";

import PageTitle from "../../components/Typography/PageTitle";
import { Input, Label, Button } from "@windmill/react-ui";
import { OutcomeAPI } from "../../apis/OutcomeAPI";

const Edit = () => {
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  const id = useLocation().pathname.split("/")[4];
  const [outcome, setOutcome] = useState({});
  const [category, setCategory] = useState();

  useEffect(() => {
    const getOutcome = async () => {
      const res = await OutcomeAPI.get(user.token, id);
      setOutcome(res);
    };
    getOutcome();
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      const res = await CategoryAPI.get(
        user.token,
        outcome.product?.category_id
      );
      setCategory(res);
    };
    getCategory();
  }, [outcome]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await OutcomeAPI.update(user.token, id, {
      quantity: outcome.quantity,
      amount: outcome.amount,
    });

    history.push("/app/outcome");
  };

  return (
    <>
      <PageTitle>Edit Income</PageTitle>

      <form
        className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
        onSubmit={handleSubmit}
      >
        <Label>
          <span>Product Name</span>
          <Input className="mt-1" value={outcome.product?.name} readOnly />
        </Label>

        <Label className="mt-3 flex flex-col gap-1">
          <span>Category</span>
          <Input className="mt-1" value={category?.name} readOnly />
        </Label>
        <div className="block w-full text-sm dark:text-gray-300 focus:outline-none rounded-md focus:border-purple-400 border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring focus:ring-purple-300 dark:focus:ring-gray-300 dark:focus:border-gray-600"></div>
        <Label className="mt-3">
          <span>Price</span>
          <Input
            className="mt-1"
            type="number"
            value={outcome?.price}
            readOnly
          />
        </Label>
        <Label className="mt-3">
          <span>Quantity</span>
          <Input
            className="mt-1"
            type="number"
            value={outcome?.quantity}
            onChange={(e) =>
              setOutcome({
                ...outcome,
                quantity: e.target.value,
                amount: outcome.price * e.target.value,
              })
            }
          />
        </Label>
        <Label className="mt-3">
          <span>Amount</span>
          <Input
            className="mt-1"
            type="number"
            value={outcome?.amount}
            readOnly
          />
        </Label>
        <Button className="mt-6 w-auto" size="large" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default Edit;
