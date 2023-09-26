import React, { useReducer } from "react";
import { login } from "../utils";
import { Else, If, Then } from "react-if";

const initialState: LoginState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
};

export default function LoginUseReducer() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { username, password, isLoading, error, isLoggedIn } = state;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({ type: LOGIN_ACTIONS.LOGIN });

    try {
      await login({ username, password });
      dispatch({ type: LOGIN_ACTIONS.SUCCESS });
    } catch (error) {
      dispatch({ type: LOGIN_ACTIONS.ERROR });
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <If condition={isLoggedIn}>
          <Then>
            <h1>Welcome {username}!</h1>
            <button onClick={() => dispatch({ type: LOGIN_ACTIONS.LOGOUT })}>
              Log Out
            </button>
          </Then>
          <Else>
            <form className="form" onSubmit={onSubmit}>
              {error && <p className="error">{error}</p>}
              <p>Please Login!</p>
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) =>
                  dispatch({
                    type: LOGIN_ACTIONS.FIELD,
                    fieldName: "username",
                    payload: e.currentTarget.value,
                  })
                }
              />
              <input
                type="password"
                placeholder="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) =>
                  dispatch({
                    type: LOGIN_ACTIONS.FIELD,
                    fieldName: "password",
                    payload: e.currentTarget.value,
                  })
                }
              />
              <button className="submit" type="submit" disabled={isLoading}>
                <If condition={isLoading}>
                  <Then>Logging in...</Then>
                  <Else>Log In</Else>
                </If>
              </button>
            </form>
          </Else>
        </If>
      </div>
    </div>
  );
}
