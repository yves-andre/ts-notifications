import { httpGet } from "./_http-client";
const sessionStorageKey = 'notification_login_usernames';

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

export const getRawUserLogin = async () => {
  const login = await httpGet(process.env.REACT_APP_API_AUTH_URL as string, {
    headers: {
      Accept: "application/json;odata=verbose",
    },
  })
  .then((response) => {
    return response.d.LoginName;
  });
  return login;
};

export const getUserNameFromLogin = async (login: string) => {
  let savedUsernames = {} as any;

  try {
    savedUsernames = sessionStorage.getItem(sessionStorageKey)
      ? JSON.parse(sessionStorage.getItem(sessionStorageKey) as string)
      : {};
  } catch (error) {
    console.error('Error parsing usernames from sessionStorage:', error);
  }

  if (savedUsernames[login]) {
    return savedUsernames[login];
  }

  const loginEncoded = encodeURIComponent(login).replace('%5C', '\\');
  const url = `${process.env.REACT_APP_API_URL}/Web/siteusers(@v)?@v='${loginEncoded}'`;
  const config = {
    contentType: "application/json",
    headers: {
      Accept: 'application/json;odata=verbose'
    }
  }
  const username = await httpGet(url, config).then((response) => {
    return response?.d?.Title;
  }).catch(error => {
    console.error(`Error when fetching username from login : ${login}`, error);
    saveUsername(login, login);
  })

  if (username) {
    saveUsername(login, username);
  }

  return username;
}

const saveUsername = (login: string, username: string | null) => {
  let savedUsernames = {} as any;

  try {
    savedUsernames = sessionStorage.getItem(sessionStorageKey)
      ? JSON.parse(sessionStorage.getItem(sessionStorageKey) as string)
      : {};
  } catch (error) {
    console.error('Error parsing usernames from sessionStorage:', error);
  }
  
  savedUsernames[login] = username;
  sessionStorage.setItem(sessionStorageKey, JSON.stringify(savedUsernames));
}