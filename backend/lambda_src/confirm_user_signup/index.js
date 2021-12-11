const AWS = require("aws-sdk");

const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: "2016-04-18" });

exports.handler = async (event) => {
  console.log("Event dump:", JSON.stringify(event));

  const body = JSON.parse(event.body);
  console.log("Request body:", body);

  // TODO: fill these in
  var params = {
    ClientId: body.user.pool.clientId,
    ConfirmationCode: body.verificationCode,
    Username: body.user.username,
    // SecretHash: "STRING_VALUE",
    UserContextData: {
      EncodedData: new Buffer.from(
        JSON.stringify({
          userSub: body.user.userSub,
          userDataKey: body.user.userDataKey,
        })
      ).toString("base64"),
    },
  };

  try {
    const resp = await cognito.confirmSignUp(params).promise();
    console.log("Confirm sign up response:", JSON.stringify(resp));

    return JSON.stringify({
      statusCode: 200,
    });
  } catch (err) {
    console.log("An error occured:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ err }),
    };
  }
};
