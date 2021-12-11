import React from "react";
import Form from "../utils/Form";
import VerificationModal from "./VerificationModal";

import Auth from "@aws-amplify/auth";

interface Props {
  handleAuthError: (err: Record<"code" | "name" | "message", string>) =>
    | {
        type: string;
        message: string;
      }
    | undefined;
  togglePage: () => void;
}

const Register = (props: Props) => {
  // amplify has sorta bad types here...
  const [registerInfo, setRegisterInfo] = React.useState<any>({});
  const [showVerification, setShowVerification] = React.useState<boolean>(false);
  const fields: IFieldType[] = [
    {
      name: "username",
      type: "text",
      placeholder: "Username",
      value: "",
    },
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
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      value: "",
    },
  ];

  const onSubmit = (fields: TRegisterValues) => {
    const registerErrors = [];
    console.log("Submitting registration request");
    if (!fields.username) {
      registerErrors.push({
        type: "Authorization",
        message: "Please enter a username",
      });
    }
    if (!fields.email) {
      registerErrors.push({
        type: "Authorization",
        message: "Please enter an email",
      });
    }
    if (!fields.password) {
      registerErrors.push({
        type: "Authorization",
        message: "Please enter a password",
      });
    }
    if (!fields.repeatPassword) {
      registerErrors.push({
        type: "Authorization",
        message: "Please confirm your password",
      });
    }
    if (fields.password !== fields.confirmPassword) {
      registerErrors.push({
        type: "Authorization",
        message: "You passwords do not match",
      });
    }
    // TODO: Add error prompts if registerErrors contains any items

    const register = Auth.signUp({
      username: fields.username,
      password: fields.password,
      attributes: {
        email: fields.email,
        preferred_username: fields.username,
      },
    })
      .then((resp) => {
        console.log("Registration successful", resp);
        setRegisterInfo(resp);
        setShowVerification(true);
      })
      .catch(props.handleAuthError);
  };

  return (
    <>
      <div
        className={`absolute w-full max-h-screen flex items-center justify-center ${
          !showVerification && "hidden"
        }`}
      >
        <VerificationModal registerInfo={registerInfo} />
      </div>
      <div
        className={`flex justify-center flex-col xl:w-1/5 md:w-1/3 sm:w-11/12 place-self-center ${
          showVerification && "hidden"
        }`}
      >
        <Form formHeader="Register" fields={fields} onSubmit={onSubmit} />
        <div>
          <div className="flex justify-center mt-2">
            <p className="mx-1 test-gray-200">Already have an account?</p>
            <button className="text-blue-500 hover:text-blue-700" onClick={props.togglePage}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
