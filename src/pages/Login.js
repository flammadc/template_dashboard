import React from "react";
import { Link } from "react-router-dom";

import ImageLight from "../assets/img/login-office.jpeg";
import ImageDark from "../assets/img/login-office-dark.jpeg";
import { GithubIcon, TwitterIcon } from "../icons";
import { Label, Input, Button } from "@windmill/react-ui";

function Login() {
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="https://media.istockphoto.com/photos/paper-bag-with-different-food-on-white-background-picture-id1265063603?k=20&m=1265063603&s=612x612&w=0&h=Ah_BHqzVvqg7bsqAmvg1ADYrH0szCoTXy_sdooxghKM="
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="https://images.unsplash.com/photo-1587384178911-b70b8df870a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHwzNzQyNDU4fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  className="mt-1"
                  type="email"
                  placeholder="ridho@gmail.com"
                />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                />
              </Label>

              <Button className="mt-4" block tag={Link} to="/app">
                Log in
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
