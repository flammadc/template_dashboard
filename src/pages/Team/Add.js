import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PageTitle from "../../components/Typography/PageTitle";
import { Input, HelperText, Label, Textarea, Button } from "@windmill/react-ui";

function Add() {
  return (
    <>
      <PageTitle>Add User</PageTitle>

      <div className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Name</span>
          <Input className="mt-1" placeholder="Username" />
        </Label>
        <Label className="mt-3">
          <span>Email</span>
          <Input className="mt-1" type="email" placeholder="ridho@gmail.com" />
        </Label>
        <Label className="mt-3">
          <span>Password</span>
          <Input className="mt-1" type="password" placeholder="Password" />
        </Label>
        <Label className="mt-3">
          <span>Confrim Password</span>
          <Input className="mt-1" type="password" placeholder="Password" />
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
  );
}

export default Add;
