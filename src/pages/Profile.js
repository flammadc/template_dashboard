import React from "react";
import { Link, useLocation } from "react-router-dom";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import { EditIcon } from "../icons";
import { Card, CardBody, Label } from "@windmill/react-ui";
import {
  Avatar,
  Badge,
  Button,
  Input,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";

const Profile = () => {
  return (
    <>
      <PageTitle>Profile</PageTitle>

      <Card>
        <div className="flex flex-col items-center pt-5">
          <button
            className="w-40 rounded-full focus:shadow-outline-purple focus:outline-none relative"
            aria-label="Profile"
            aria-haspopup="true"
          >
            <Avatar
              className="w-40 h-40 align-middle"
              src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt=""
              aria-hidden="true"
            />
            <EditIcon className="p-1 absolute w-10 h-10 bottom-0 right-0 text-white bg-purple-600 border border-transparent rounded-full active:bg-purple-600 hover:bg-purple-700 focus:ring focus:ring-purple-300 " />
          </button>

        </div>


        <div className="mt-4 p-4 mb-5">
          <SectionTitle>Information</SectionTitle>
          <Label className="mt-3">
            <span>Email</span>
            <Input className="mt-1" type="email" value="ridho@gmail.com" />
          </Label>
          <Label className="mt-3">
            <span>Password</span>
            <Input className="mt-1" type="password" value="12345" />
          </Label>
          <Button
            className="mt-6 w-auto"
            size="large"
            tag={Link}
            to="/app/profile"
          >
            Submit
          </Button>

        </div>
      </Card>


    </>
  );
};

export default Profile;
