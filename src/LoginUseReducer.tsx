import React, { useReducer } from "react";
import { login } from "./utils";

const defaultStates = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
};

function statesManagement(state, action) {
  switch (action.type) {
    case "updateField": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case "startlogin": {
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    }
    case "loginSuccess": {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
      };
    }
    case "showError": {
      return {
        ...state,
        error: "Incorrect username or password!",
        isLoggedIn: false,
        isLoading: false,
        username: "",
        password: "",
      };
    }
    case "logOut": {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
}


export default function LoginUseReducer() {
  const [state, dispatch] = useReducer(statesManagement, defaultStates);
  const { username, password, isLoading, error, isLoggedIn } = state;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({ type: "startlogin" });

    try {
      await login({ username, password });
      dispatch({ type: "loginSuccess" });
    } catch (error) {
      dispatch({ type: "showError" });
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>Welcome {username}!</h1>
            <button onClick={() => dispatch({ type: "logOut" })}>
              Log Out
            </button>
          </>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {error && <p className="error">{error}</p>}
            <p>Please Login!</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) =>
                dispatch({
                  type: "updateField",
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
                  type: "updateField",
                  fieldName: "password",
                  payload: e.currentTarget.value,
                })
              }
            />
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
