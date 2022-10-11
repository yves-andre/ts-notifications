import { httpGet } from "./_http-client";

export const getUserLogin = async () => {
  const login = await httpGet(
    "http://home-dev.dts.corp.local/_api/web/currentuser/LoginName",
    {
      headers: {
        Accept: "application/json;odata=verbose",
      },
    }
  ).then((response) => {
    // remove domain name fron login string
    return response.d.LoginName.substr(
      response.d.LoginName.lastIndexOf("\\") + 1
    )
  } 
  );
  return login;
};
