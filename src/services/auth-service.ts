import { httpGet } from "./_http-client";

export const getUserLogin = async () => {
  const login = await httpGet(process.env.REACT_APP_API_AUTH_URL as string, {
    headers: {
      Accept: "application/json;odata=verbose",
    },
  })
  .then((response) => {
    // remove domain name fron login string
    return response.d.LoginName.substr(
      response.d.LoginName.lastIndexOf("\\") + 1
    )
  });
  return login;
};
