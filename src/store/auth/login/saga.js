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
import useSweetAlert from "helpers/notifications";

const fireBaseBackend = getFirebaseBackend();
const {  showSuccessAlert, showErrorAlert } = useSweetAlert();

function* loginUser({ payload: { user, history } }) {
  try {   
    const response = yield call(post, 'http://127.0.0.1:8000/api/login', {
      email: user.email,
      password: user.password
    });
    const token = response.data.token ? response.data.token : null;
    const authUser = response.data ? response.data : null;

    localStorage.setItem('token', token);
    localStorage.setItem("authUser", JSON.stringify(authUser));

    // Dispatch the loginSuccess action with the response data
    yield put(loginSuccess(response.data));

    // Navigate to the dashboard
    history("/dashboard");
  } catch (error) {
    showErrorAlert('Login', error.response.data.message);
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
