import React from "react";
import { hot } from "react-hot-loader";
import Auth from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import config from "config.json";
import { useApi, ApiProvider } from "./api/ApiContext";

const Authentication = React.lazy(() => import("./routes/auth/Authentication"));
const Profile = React.lazy(() => import("./routes/profile/Profile"));
const Viewport = React.lazy(() => import("./routes/ArtViewport/Viewport"));

Auth.configure({
  storage: sessionStorage,
  ...config.amp_auth,
});

Hub.listen("auth", (data) => {
  console.log("Got data:", data);
});

const AppProvider = () => {
  return (
    <ApiProvider>
      <App />
    </ApiProvider>
  );
};

const App = () => {
  const { dispatch } = useApi();
  const [token, setToken] = React.useState<string | undefined>("");

  React.useEffect(() => {
    token &&
      dispatch({
        type: "SET_TOKEN",
        payload: {
          token,
        },
      });
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-200">
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          {token ? (
            <Switch>
              <Route exact path="/">
                <Profile />
              </Route>
              <Route path="/art/*">
                <Viewport />
              </Route>
            </Switch>
          ) : (
            <Authentication onToken={setToken} />
          )}
        </React.Suspense>
      </Router>
    </div>
  );
};

export default hot(module)(App);
