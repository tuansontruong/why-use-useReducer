type LoginAction =
  | { type: LOGIN_ACTIONS.LOGIN }
  | { type: LOGIN_ACTIONS.SUCCESS }
  | { type: LOGIN_ACTIONS.ERROR }
  | { type: LOGIN_ACTIONS.LOGOUT }
  | { type: LOGIN_ACTIONS.FIELD; fieldName: string; payload: string };

enum LOGIN_ACTIONS {
  LOGIN,
  SUCCESS,
  ERROR,
  LOGOUT,
  FIELD,
}
