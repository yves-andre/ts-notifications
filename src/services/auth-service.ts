import { httpGet } from "./_http-client";
let usernamePromise: { [key: string]: Promise<string> | null } = {};
const SESSION_STORAGE_KEY = 'notification_login_usernames';

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

/**
 * Attempt to retrieve saved usernames from session storage.
 */
 const getSavedUsernames = (): Record<string, string> => {
  try {
    const savedData = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {};
  } catch (error) {
    console.error('Error parsing usernames from sessionStorage:', error);
    return {};
  }
};

/**
 * Save username in session storage.
 */
const saveUsername = (login: string, username: string): void => {
  const usernames = getSavedUsernames();
  usernames[login] = username;
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(usernames));
};

/**
 * Make HTTP request to get username from a given login.
 */
const fetchUsernameFromAPI = async (login: string): Promise<string> => {
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
    if (typeof response === "number") {
      throw new Error('Network response was not ok');
    }
    return response?.d?.Title || "";
  } catch (error) {
    console.error(`Error when fetching username from login: ${login}`, error);
    return login || "";
  }
};

export const getUserNameFromLogin = async (login: string): Promise<string> => {
  const savedUsernames = getSavedUsernames();

  // Check if we already have the username saved
  if (savedUsernames[login]) {
    return savedUsernames[login];
  }

  // Check for ongoing username requests to avoid duplicate calls
  if (usernamePromise[login]) {
    const result = await usernamePromise[login];
    if (result) {
      return result;
    }
  }

  // Make the API request and cache the promise to avoid duplicate calls
  usernamePromise[login] = fetchUsernameFromAPI(login);
  // use nullish coalescing (returns login if await usernamePromise[login] is null or undefined)
  const fetchedUsername = await usernamePromise[login] ?? login;
  saveUsername(login, fetchedUsername);

  try {
    return fetchedUsername;
  } finally {
    usernamePromise[login] = null; // Actually clear the username promise
  }
};