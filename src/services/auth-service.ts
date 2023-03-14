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

export const getUserNameFromLogin = async (login: string) => {
  const loginEncoded = encodeURIComponent(login).replace('%5C', '\\');
  const url = `${process.env.REACT_APP_API_URL}/Web/siteusers(@v)?@v='${loginEncoded}'`;
  const config = {
    contentType: "application/json",
    headers: {
      Accept: 'application/json;odata=verbose'
    }
  }
  const username =  await httpGet(url, config).then((response) => {
    return response?.d?.Title;
  })
  return username;
}