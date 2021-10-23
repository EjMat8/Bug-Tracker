import { authActions } from "./authSlice";

export const signIn =
  (signIn, { email, password, name = "", passwordConfirm = "" }) =>
  async (dispatch) => {
    const input = signIn
      ? { email, password }
      : { email, password, name, passwordConfirm };
    const url = `/api/users/${signIn ? "login" : "signup"}`;
    dispatch(authActions.setLoading(true));
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error.message);
      console.log(data.data);
      dispatch(
        authActions.signIn({
          id: data.data.user._id,
          name: data.data.user.name,
          role: data.data.user.role,
        })
      );
    } catch (err) {
      console.log(err.message);
    }
    dispatch(authActions.setLoading(false));
  };

export const logout = () => async (dispatch) => {
  try {
    await fetch("/api/users/logout");
    dispatch(authActions.signOut());
  } catch (err) {
    console.log(err);
  }
};

export const persistLogin = () => async (dispatch) => {
  dispatch(authActions.setLoading(true));
  try {
    const res = await fetch("/api/users/stayLoggedIn");
    const data = await res.json();
    if (!res.ok) throw new Error(data.error.message);
    if (!data.data) return dispatch(authActions.setLoading(false));
    dispatch(
      authActions.signIn({
        id: data.data.user._id,
        name: data.data.user.name,
        role: data.data.user.role,
      })
    );
  } catch (err) {
    console.log(err);
  }
  dispatch(authActions.setLoading(false));
};
