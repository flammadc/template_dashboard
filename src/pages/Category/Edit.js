import React from "react";
import { Link, useLocation } from "react-router-dom";

import PageTitle from "../../components/Typography/PageTitle";
import { Input, HelperText, Label, Textarea, Button } from "@windmill/react-ui";
import response from "../../utils/demo/tableData";

const Edit = () => {
  const id = useLocation().pathname.split("/")[4];

  return (
    <>
      <PageTitle>Edit Category</PageTitle>

      <div className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Name</span>
          <Input className="mt-1" value={response[id].category} />
        </Label>

        <Button
          className="mt-6 w-auto"
          size="large"
          tag={Link}
          to="/app/category"
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default Edit;
