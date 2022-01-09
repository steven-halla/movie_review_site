import axios, {AxiosResponse} from "axios";
import {SignInRequest, User} from "model/User";
import {authHeader} from "./authHeader";
import {API_URL} from "./Constants";

export const signup = (email: string, password: string, displayName: string): Promise<AxiosResponse<User>> => {
  return axios
    .post(API_URL + "/auth/signup", {
      // displayName,
      email,
      password,
      displayName
    })
};

export const signin = (signInRequest: SignInRequest) => {
  return axios
    .post(API_URL + "/auth/signin", signInRequest, {headers: authHeader()})
    .then((response) => {
      if (response.data.accessToken) {
        const userAuth = JSON.stringify(response.data) as any;
        console.log(`userAuth: ${userAuth}`);
        localStorage.setItem("userAuth", userAuth);
      }
      return response.data
    });
};

export const signout = () => {
  localStorage.removeItem("userAuth");
}

export const isLoggedIn = () => {
  return localStorage.getItem("userAuth") != null;
}

