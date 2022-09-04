import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthAPI } from "../../apis/AuthAPI";

import PageTitle from "../../components/Typography/PageTitle";
import { Input, HelperText, Label, Textarea, Button } from "@windmill/react-ui";

function Add() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    await AuthAPI.register({ ...user, password_confirmation: user.password });
    history.push("/app/team");
  };

  return (
    <>
      <PageTitle>Add User</PageTitle>

      <form
        className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
        onSubmit={handleSubmit}
      >
        <Label>
          <span>Name</span>
          <Input
            className="mt-1"
            placeholder="Username"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </Label>
        <Label className="mt-3">
          <span>Email</span>
          <Input
            className="mt-1"
            type="email"
            placeholder="ridho@gmail.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Label>
        <Label className="mt-3">
          <span>Password</span>
          <Input
            className="mt-1"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Label>

        <Button className="mt-6 w-auto" size="large" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

export default Add;
