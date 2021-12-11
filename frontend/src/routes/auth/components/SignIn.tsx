import React from "react";
import Form from "../utils/Form";

import Auth from "@aws-amplify/auth";

interface ISigninProps {
  handleAuthError: (err: Record<"code" | "name" | "message", string>) =>
    | {
        type: string;
        message: string;
      }
    | undefined;
  togglePage: () => void;
  onToken: React.Dispatch<React.SetStateAction<string>>;
}

const SignIn = (props: ISigninProps) => {
  const fields: IFieldType[] = [
    {
      name: "email",
      type: "text",
      placeholder: "Email",
      value: "",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      value: "",
    },
  ];

  const onSubmit = (fields: TSigninValues) => {
    const signinErros = [];
    if (!fields.email) {
      signinErros.push({
        type: "Authorization",
        message: "Please enter an email",
      });
    }
    if (!fields.password) {
      signinErros.push({
        type: "Authorization",
        message: "Please enter a password",
      });
    }
    // TODO: Add error prompts if signinErros contains any items

    const user = Auth.signIn(fields.email, fields.password)
      .then((resp) => {
        console.log("Sign in successful", resp);
        const token = resp?.signInUserSession?.accessToken?.jwtToken;
        props.onToken(token);
      })
      .catch(props.handleAuthError);
  };

  return (
    <div className="flex justify-center flex-col xl:w-1/5 md:w-1/3 sm:w-11/12 place-self-center">
      <Form formHeader="Register" fields={fields} onSubmit={onSubmit} />
      <div>
        <div className="flex justify-center mt-2">
          <p className="mx-1 test-gray-200">Don't have an account?</p>
          <button className="text-blue-500 hover:text-blue-700" onClick={props.togglePage}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;