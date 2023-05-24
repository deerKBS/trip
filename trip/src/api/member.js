import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  console.log("jwt로그인: " + JSON.stringify(user));

  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userEmail, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userEmail}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userEmail, success, fail) {
  await api.get(`/user/logout/${userEmail}`).then(success).catch(fail);
}

export { login, findById, tokenRegeneration, logout };
