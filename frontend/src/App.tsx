import React from "react";
import { hot } from "react-hot-loader";
import Auth from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";

import config from "config.json";

Auth.configure({
  storage: sessionStorage,
  ...config.amp_auth,
});

Hub.listen("auth", (data) => {
  console.log("Got data:", data);
});

const App = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <h1>React AWS Boilerplate</h1>
    </div>
  );
};

export default hot(module)(App);
