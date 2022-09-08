import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";

import { EditIcon } from "../icons";
import { Card, Label } from "@windmill/react-ui";
import { Avatar, Button, Input } from "@windmill/react-ui";
import { TeamAPI } from "../apis/TeamAPI";

import ThemedSuspense from "../components/ThemedSuspense";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState({ page: false, button: false });
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [newProfile, setNewProfile] = useState();
  const BASE_URL = "http://localhost:8000/files/";

  useEffect(() => {
    setLoading({ ...loading, page: true });
    const getUser = async () => {
      const res = await TeamAPI.get(currentUser.token, currentUser.user.id);
      setUser(res);
    };
    getUser();
    setLoading({ ...loading, page: false });
  }, [currentUser.user.id, loading.button]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, button: true });

    const data = new FormData();
    data.append("profile", newProfile);
    // console.log(data.get("profile"));
    await TeamAPI.update(currentUser.token, currentUser.user.id, {
      ...user,
      password: newPassword,
      profile: data.get("profile"),
    });
    setLoading({ ...loading, button: false });
  };

  return loading.page ? (
    <ThemedSuspense />
  ) : (
    <form onSubmit={handleSubmit}>
      <PageTitle>Profile</PageTitle>

      <Card>
        <div className="flex flex-col items-center pt-5">
          <button
            className="w-40 rounded-full focus:shadow-outline-purple focus:outline-none relative"
            aria-label="Profile"
            aria-haspopup="true"
            type="button"
          >
            <Avatar
              className="w-40 h-40 align-middle"
              src={
                newProfile
                  ? URL.createObjectURL(newProfile)
                  : user.profile
                  ? BASE_URL + user.profile
                  : BASE_URL + "profiles/user.png"
              }
              alt=""
              aria-hidden="true"
            />
            <label htmlFor="profile">
              <Input
                type="file"
                id="profile"
                className="hidden"
                onChange={(e) => setNewProfile(e.target.files[0])}
              />
              <EditIcon className="p-1 absolute w-10 h-10 bottom-0 right-0 text-white bg-purple-600 border border-transparent rounded-full active:bg-purple-600 hover:bg-purple-700 focus:ring focus:ring-purple-300 cursor-pointer" />
            </label>
          </button>
        </div>

        <div className="mt-4 p-4 mb-5">
          <SectionTitle>Information</SectionTitle>
          <Label className="mt-3">
            <span>Name</span>
            <Input
              className="mt-1"
              type="text"
              value={user?.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </Label>
          <SectionTitle>Information</SectionTitle>
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Label>
          <Button className="mt-6 w-auto" size="large" type="submit">
            {loading.button ? (
              <TailSpin
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default Profile;
