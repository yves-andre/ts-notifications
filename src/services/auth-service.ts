import { httpGet } from "./_http-client";

export const getUserLogin = async () => {
  const login = httpGet("user-login.json")
  return login;
};