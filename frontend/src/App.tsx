import React from "react";
import { hot } from "react-hot-loader";
import Auth from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";

import config from "config.json";

const Authentication = React.lazy(() => import("./routes/auth/Authentication"));

Auth.configure({
  storage: sessionStorage,
  ...config.amp_auth,
});

Hub.listen("auth", (data) => {
  console.log("Got data:", data);
});

const App = () => {
  const [token, setToken] = React.useState<string>("");

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-200">
      <h1></h1>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Authentication onToken={setToken} />
      </React.Suspense>
    </div>
  );
};

export default hot(module)(App);
