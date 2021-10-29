import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { signIn as signInAction } from "../../store/authActions";

const AuthForm = ({ signIn }) => {
  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();

  const signInHandler = (e) => {
    e.preventDefault();
    const { value: email } = emailRef.current;
    const { value: pass } = passRef.current;
    if (signIn) {
      if (!email.trim() || !pass.trim()) return;
      dispatch(
        signInAction(signIn, {
          email: email,
          password: pass,
        })
      );
    }

    if (!signIn) {
      const { value: name } = nameRef.current;
      const { value: confPass } = confirmPassRef.current;
      if (!email.trim() || !pass.trim() || !confPass.trim() || !name.trim())
        return;
      dispatch(
        signInAction(signIn, {
          email,
          name,
          password: pass,
          passwordConfirm: confPass,
        })
      );
    }
  };
  return (
    <form className="form" autoComplete="off" onSubmit={signInHandler}>
      {!signIn && (
        <input
          type="text"
          placeholder="Name"
          ref={nameRef}
          className="form__auth-input"
        />
      )}
      <input
        type="email"
        placeholder="Email"
        ref={emailRef}
        className="form__auth-input"
      />
      <input
        type="password"
        placeholder="Password"
        ref={passRef}
        className="form__auth-input"
      />
      {!signIn && (
        <input
          className="form__auth-input"
          type="password"
          placeholder="Confirm Password"
          ref={confirmPassRef}
        />
      )}
      <button
        type="submit"
        className="btn form__auth-button"
        style={{ marginTop: "10px" }}
      >
        {signIn ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default AuthForm;
