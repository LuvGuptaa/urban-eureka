import React from "react";

const SignIn = ({ handleSignIn }) => {
  return (
    <div className="sign-in">
        <h1>urban-eureka</h1>
        <p>Get started by entering signing-in with your Google account</p>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;
