import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import PageTitle from "../../components/Typography/PageTitle";
import { Input, Label, Button } from "@windmill/react-ui";
import { useSelector } from "react-redux";
import { CategoryAPI } from "../../apis/CategoryAPI";

const Edit = () => {
  const user = useSelector((state) => state.user.currentUser);
  const id = useLocation().pathname.split("/")[4];

  const history = useHistory();
  const [category, setCategory] = useState({ name: "" });

  useState(() => {
    const getCategory = async () => {
      const res = await CategoryAPI.get(user.token, id);
      setCategory(res);
    };
    getCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await CategoryAPI.update(user.token, id, category);
    history.push("/app/category");
  };

  return (
    <>
      <PageTitle>Edit Category</PageTitle>

      <form
        className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
        onSubmit={handleSubmit}
      >
        <Label>
          <span>Name</span>
          <Input
            className="mt-1"
            value={category?.name}
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

export default Edit;
