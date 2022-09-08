import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../utils/function/auth";
import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineLogoutIcon,
} from "../icons";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";
import { TeamAPI } from "../apis/TeamAPI";

function Header() {
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  const [profile, setProfile] = useState();
  const dispatch = useDispatch();
  const BASE_URL = "http://localhost:8000/files/";
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  const handleLogout = () => {
    logout(dispatch, user.user.id, history);
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await TeamAPI.get(user.token, user.user.id);
      setProfile(res.profile);
    };
    getUser();
  });

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2"></div>
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === "dark" ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          {/* <!-- Notifications menu --> */}

          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src={
                  profile ? BASE_URL + profile : BASE_URL + "profiles/user.png"
                }
                alt=""
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem tag={Link} to="/app/profile">
                <OutlinePersonIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Profile</span>
              </DropdownItem>

              <DropdownItem onClick={handleLogout}>
                <OutlineLogoutIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
