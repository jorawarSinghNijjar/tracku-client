import AsyncStorage from "@react-native-async-storage/async-storage";
import tracker from "../api/tracker";
import { navigate } from "../navigationRef";
import createDataContext from "./createDataContext";

const SIGN_UP = "SIGN_UP";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const ADD_ERROR = "ADD_ERROR";
const CLEAR_ERROR = "CLEAR_ERROR";

const authReducer = (state, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return { ...state, errorMessage: action.payload };
    case CLEAR_ERROR:
      return { ...state, errorMessage: "" };
    case SIGN_UP:
      return { token: action.payload, errorMessage: "" };
    case SIGN_IN:
      return { token: action.payload, errorMessage: "" };
    case SIGN_OUT:
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "SIGN_IN", payload: token });
    navigate("TrackList");
  } else {
    navigate("SignIn");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: CLEAR_ERROR });
};

const signUp =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await tracker.post("/signup", { email, password });
      //   console.log(response.data)
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: SIGN_UP, payload: response.data.token });
      navigate("TrackList");
    } catch (error) {
      dispatch({
        type: ADD_ERROR,
        payload: "Something went wrong with sign up",
      });
    }
  };

const signIn = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await tracker.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: SIGN_IN, payload: response.data.token });
      navigate("TrackList");
    } catch (error) {
      dispatch({
        type: ADD_ERROR,
        payload: "Something went wrong with sign in",
      });
    }
  };
};

const signOut = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem("token");
    dispatch({ type: SIGN_OUT });
    navigate("loginFlow");
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signUp, signIn, signOut, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: "" }
);
