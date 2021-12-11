import React from "react";
import Auth from "@aws-amplify/auth";

interface IVerificationProps {
  registerInfo: any;
}

const VerificationModal = (props: IVerificationProps) => {
  const [verificationCode, setVerificationCode] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleOnSubmit = (
    event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    fetch("https://40kvgarww5.execute-api.us-east-1.amazonaws.com/user/confirmSignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify({
        verificationCode,
        ...props.registerInfo,
      }),
    })
      .then((resp) => {
        if (resp.ok) return resp.json();
        throw new Error("Non 200 response!");
      })
      .then((json) => {
        console.log("Confirm Signup response:", json);
      })
      .catch((err) => {
        console.log("An error occured while trying to confirm user signup:", err);
      });
    setLoading(false);
  };

  const resendConfirmationCode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      Auth.resendSignUp(props.registerInfo.user.username);
      console.log("code resent successfully");
    } catch (err) {
      console.log("error resending code: ", err);
    }
  };

  return (
    <div>
      <div className="rounded-sm border-2 border-black bg-gray-100 shadow-lg">
        <h1 className="text-center font-0bold text-white text-4xl bg-black w-full py-2">
          Verify Email
        </h1>
        <form action="" id="Verification-form">
          <input
            className="my-2 mx-8 py-1 px-2 border-2 border-gray-200 shadow-md"
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <div>
            <p>Didn't receive a code?</p>
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={(e) => resendConfirmationCode(e)}
            >
              Resend
            </button>
          </div>
          <div className="flex justify-center mt-8 py-2">
            {loading ? (
              <div>...loading</div>
            ) : (
              <button
                type="submit"
                onClick={handleOnSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-sm shadow-lg focus:outline-none border-2 border-black"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationModal;
