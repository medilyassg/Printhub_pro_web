import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";
import { post } from "helpers/api_helper";

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  try {   
    const response = yield call(post, 'http://127.0.0.1:8000/api/login', {
      email: user.email,
      password: user.password
    });
    const token=response.data.token ? response.data.token : null
    const authUser=response.data ? response.data : null

      localStorage.setItem('token', token);
      localStorage.setItem("authUser", JSON.stringify(authUser));
      yield put(loginSuccess(response));
      history("/dashboard");
  } catch (error) {
    yield put(apiError(error.response.data.message));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    yield post('http://127.0.0.1:8000/api/logout');

    localStorage.removeItem("authUser");
    localStorage.removeItem("token");

    history("/login");    
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
