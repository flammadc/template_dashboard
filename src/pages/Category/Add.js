import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import PageTitle from "../../components/Typography/PageTitle";
import { Input, Label, Button } from "@windmill/react-ui";
import { CategoryAPI } from "../../apis/CategoryAPI";
import { useSelector } from "react-redux";

const Add = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user.currentUser);
  const [category, setCategory] = useState({ name: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await CategoryAPI.create(user.token, category);
    history.push("/app/category");
  };

  return (
    <>
      <PageTitle>Add Category</PageTitle>

      <form
        className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
        onSubmit={handleSubmit}
      >
        <Label>
          <span>Name</span>
          <Input
            className="mt-1"
            placeholder="Category Name"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
        </Label>

        <Button className="mt-6 w-auto" size="large" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default Add;
