import {
  USER_LOADING,
  USER_SUCCESS,
  USER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  LOGOUT,
  CLEAR_ERROR,
} from "../types/authTypes";

export const loadUser = () => async (dispatch, getState) => {
  dispatch(userLoading());
  const token = getState().auth.refreshToken;
  console.log("tokenIS:",token);
  if (token) {
    const result = await doRequestAndParse("/users/info/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: token }),
    });

    const { hasError, data } = result;

    console.log("result:", result);

    if (hasError) {
      const { detail } = data;
      dispatch(userFail(detail || "Что-то пошло не так"));
    } else {
      const { user, access } = data;
      dispatch(userSuccess(user, access));
    }
  } else {
    dispatch(loginFail(""));
  }
};

export const login = (username, password) => async (dispatch) => {
  console.log("dataaa: ", username, password);

  const result = await doRequestAndParse("/users/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const { hasError, data } = result;

  console.log("dataaa: ", data);

  if (hasError) {
    const { detail } = data;
    dispatch(loginFail(detail || "Что-то пошло не так"));
  } else {
    const { user, access, refresh } = data;
    dispatch(loginSuccess(user, access, refresh));
  }
};


const doRequestAndParse = async (url, options) => {
  try {
    let hasError = false;
    const res = await fetch(url, options);
    if (!res.ok) {
      hasError = true;
    }
    const data = await res.json();
    return { hasError, data };
  } catch (err) {
    return { hasError: true, data: { detail: err.message.toString() } };
  }
};

export const loginLoading = () => ({ type: LOGIN_LOADING });
export const loginSuccess = (user, accessToken, refreshToken) => ({
  type: LOGIN_SUCCESS,
  payload: { user, accessToken, refreshToken },
});
export const loginFail = (error) => ({ type: LOGIN_FAIL, payload: error });

export const userLoading = () => ({ type: USER_LOADING });
export const userSuccess = (user, accessToken) => ({
  type: USER_SUCCESS,
  payload: { user, accessToken },
});
export const userFail = (error) => ({ type: USER_FAIL, payload: error });

export const logout = () => ({ type: LOGOUT });

export const clearError = () => ({ type: CLEAR_ERROR });
