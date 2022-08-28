import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ForbiddenIcon } from "../icons";

function Page404() {
  const history = useHistory();

  return (
    <div className="flex flex-col items-center">
      <ForbiddenIcon
        className="w-12 h-12 mt-8 text-purple-200"
        aria-hidden="true"
      />
      <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200">
        404
      </h1>
      <p className="text-gray-700 dark:text-gray-300">Page not found</p>
    </div>
  );
}

export default Page404;
