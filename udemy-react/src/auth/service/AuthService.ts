import axios from "axios";
import type { AuthDto } from "../dto/AuthDto";


const AUTH_URL = 'http://localhost:8080/api/auth';

export const registerApiCall = (auth:AuthDto)=>
    axios.post(`${AUTH_URL}/register`,auth);

export const loginApiCall = (auth:AuthDto)=>
    axios.post(`${AUTH_URL}/login`,auth);

export const setToken = (token:string) =>
    localStorage.setItem("token",token);

export const getToken = () =>
    localStorage.getItem("token");

export const setLoggedInUsername = (username:string) =>
    sessionStorage.setItem("loggedInUsername",username);
export const getLoggedInUsername = () =>
    sessionStorage.getItem("loggedInUsername");
export const setRoleName = (roleName:string) =>
    sessionStorage.setItem("RoleName",roleName);
export const getRoleName = () =>
    sessionStorage.getItem("RoleName");
export const isStudent = () =>
    getRoleName() === "ROLE_STUDENT";

export const isLoggedIn = () => 
    getToken() !== null;

export const logout = () =>{
    localStorage.clear();
    sessionStorage.clear();
}