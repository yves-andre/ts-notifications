import { httpGet } from "./_http-client";
const sessionStorageKey = 'notification_login_usernames';
let usernamePromise: { [key: string]: Promise<string> | null } = {};

export const getUserLogin = async () => {
  const url = `${window.location.protocol}${process.env.REACT_APP_API_AUTH_URL}`;
  const login = await httpGet(url, {
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
  const url = `${window.location.protocol}${process.env.REACT_APP_API_AUTH_URL}`;
  const login = await httpGet(url, {
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

  if (usernamePromise[login]) {
    // If there's an ongoing username request for this login, wait for it
    return await usernamePromise[login];
  }

  // Start a new username request for this login and store the promise
  usernamePromise[login] = (async () => {
    const loginEncoded = encodeURIComponent(login).replace('%5C', '\\');
    const url = `${window.location.protocol}${process.env.REACT_APP_API_URL}/Web/siteusers(@v)?@v='${loginEncoded}'`;
    const config = {
      contentType: "application/json",
      headers: {
        Accept: 'application/json;odata=verbose'
      }
    };
    
    try {
      const response = await httpGet(url, config);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const username = response?.d?.Title;
      saveUsername(login, username); // Save the username immediately after retrieving it
      return username;
    } catch (error) {
      console.error(`Error when fetching username from login : ${login}`, error);
      saveUsername(login, login);
      return login || "";
    }
  })();

  try {
    // Wait for the username request to finish
    const username = await usernamePromise[login];
    return username;
  } finally {
    // Clear the username promise for this login after the request is done
    usernamePromise[login] = null;
  }
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
