import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import PageTitle from "../../components/Typography/PageTitle";
import { Input, HelperText, Label, Textarea, Button } from "@windmill/react-ui";
import response from "../../utils/demo/userData";


const Edit = () => {
  const id = useLocation().pathname.split("/")[4];

  return (
    <>
      <PageTitle>Edit User</PageTitle>

      <div className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Name</span>
          <Input className="mt-1" value={response[id].name} />
        </Label>
        <Label className="mt-3">
          <span>Email</span>
          <Input className="mt-1" type="email" value={response[id].email} />
        </Label>
        <Label className="mt-3">
          <span>Password</span>
          <Input className="mt-1" type="password" value={response[id].password} />
        </Label>
        <Label className="mt-3">
          <span>Confrim Password</span>
          <Input className="mt-1" type="password" value={response[id].password} />
        </Label>


        <Button
          className="mt-6 w-auto"
          size="large"
          tag={Link}
          to="/app/team"
        >
          Submit
        </Button>
      </div>
    </>
  )
}

export default Edit