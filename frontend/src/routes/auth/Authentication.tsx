import React from "react";
import Auth from "@aws-amplify/auth";

import Register from "./components/Register";
import SignIn from "./components/SignIn";

interface Props {
  onToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

const Authentication = (props: Props) => {
  const [showRegister, setShowRegister] = React.useState<boolean>(true);
  const togglePage = () => setShowRegister(!showRegister);

  React.useEffect(() => {
    Auth.currentUserPoolUser()
      .then((user) => {
        console.log(user);
        const token = user?.signInUserSession?.accessToken?.jwtToken;
        if (!token) return;
        const userAttributes: IUser = {
          user_id: user.attributes.sub,
          username: user.attributes.preferred_username,
          email: user.attributes.email,
        };
        console.log("Got token!", token);
        props.onToken(token);
        props.setUser(userAttributes);
      })
      .catch(() => console.log("No current user"));
  }, []);

  return (
    <div className="w-full">
      <div className="min-h-screen flex items-start mt-20">
        <div className="grid grid-rows-5 w-full">
          <div className="grid row-span-5 w-full">
            {showRegister ? (
              <Register handleAuthError={handleAuthError} togglePage={togglePage} />
            ) : (
              <SignIn
                handleAuthError={handleAuthError}
                togglePage={togglePage}
                onToken={props.onToken}
                setUser={props.setUser}
              />
            )}
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
};

const handleAuthError = (err: Record<"code" | "name" | "message", string>) => {
  console.log("An error occured while trying to perform an auth function!", err);
  if (!err.code || !err.name) {
    console.log("Unable to handle auth error!", err);
    return;
  }

  if (err.code === "InvalidPasswordException") {
    console.log("Invalid password detected:", err.message);
    return {
      type: "Authorization",
      message: err.message ?? "Password is not strong enough.",
    };
  }

  console.log("Unable to handle auth error!:", err);
  return {
    type: "Authorization",
    message: "An unexpected error has occured, please try again later.",
  };
};

export default Authentication;
