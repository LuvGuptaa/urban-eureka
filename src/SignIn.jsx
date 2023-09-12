import React from "react";

const SignIn = ({ handleSignIn, loading }) => {
  return (
    <div className="sign-in">
      <h1>ChronoView</h1>
      <p>Get started by entering signing-in with your Google account</p>
      <button onClick={handleSignIn}>Sign In</button>
      {loading && (
        <div className="loading">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
