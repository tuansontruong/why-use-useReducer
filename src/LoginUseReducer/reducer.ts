function loginReducer(state: LoginState, action: LoginAction) {
  switch (action.type) {
    case LOGIN_ACTIONS.FIELD: {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case LOGIN_ACTIONS.LOGIN: {
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    }
    case LOGIN_ACTIONS.SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
      };
    }
    case LOGIN_ACTIONS.ERROR: {
      return {
        ...state,
        error: "Incorrect username or password!",
        isLoggedIn: false,
        isLoading: false,
        username: "",
        password: "",
      };
    }
    case LOGIN_ACTIONS.LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
}
