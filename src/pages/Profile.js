import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import InfoCard from "../components/Cards/InfoCard";
import { Card, CardBody } from "@windmill/react-ui";
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import {
  Avatar,
  Badge,
  Input,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";

const Profile = () => {
  return (
    <>
      <PageTitle>Profile</PageTitle>

      <Card className="flex flex-col items-center py-5">
        <button
          className="w-40 rounded-full focus:shadow-outline-purple focus:outline-none"
          aria-label="Profile"
          aria-haspopup="true"
        >
          <Avatar
            className="w-40 h-40 align-middle"
            src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt=""
            aria-hidden="true"
          />
        </button>
        <CardBody>
          <p className="flex items-center justify-center font-semibold text-gray-600 dark:text-gray-300">
            Ridho Mustaqim
          </p>
          <p className="flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 ">
            Employee
          </p>
        </CardBody>
      </Card>

      
    </>
  );
};

export default Profile;
