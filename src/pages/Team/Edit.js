import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import PageTitle from "../../components/Typography/PageTitle";
import { Input, Label, Button } from "@windmill/react-ui";

import { TeamAPI } from "../../apis/TeamAPI";

const Edit = () => {
  const { currentUser } = useSelector((state) => state.user);
  const id = useLocation().pathname.split("/")[4];
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const res = await TeamAPI.get(currentUser.token, id);
      setUser(res);
    };
    getUser();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await TeamAPI.update(currentUser.token, id, user);
    history.push("/app/team");
  };

  return (
    <>
      <PageTitle>Edit User</PageTitle>

      <form
        className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
        onSubmit={handleSubmit}
      >
        <Label>
          <span>Name</span>
          <Input
            className="mt-1"
            value={user?.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </Label>
        <Label className="mt-3">
          <span>Email</span>
          <Input
            className="mt-1"
            type="email"
            value={user?.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Label>
        <Label className="mt-3">
          <span>Password</span>
          <Input
            className="mt-1"
            type="password"
            value={user?.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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
