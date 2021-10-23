import React, { useState } from "react";
import { AiOutlineBug } from "react-icons/ai";
import AuthForm from "../components/auth/AuthForm";
const AuthPage = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-page__left">
        <div>
          <AiOutlineBug className="logo-auth" />
          <h1 className="heading-1">Bug Tracker</h1>
        </div>
      </div>
      <div className="auth-page__right">
        <div>
          <div className="auth-page__actions">
            <button
              onClick={setSignIn.bind(null, true)}
              className={`btn btn--light ${
                signIn ? "btn--active" : "btn--inactive"
              }`}
            >
              Sign in
            </button>
            <button
              onClick={setSignIn.bind(null, false)}
              className={`btn btn--light ${
                !signIn ? "btn--active" : "btn--inactive"
              }`}
            >
              Sign up
            </button>
          </div>
          <AuthForm signIn={signIn} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
