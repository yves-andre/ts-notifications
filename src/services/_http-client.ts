const getNewToken = async () => {
  const url = process.env.REACT_APP_API_DWP_AUTH as string;
  const authResponse = await fetch(url, {
    credentials: "include"
  });
  const authData = await authResponse.json();
  return authData.token;
};

export const httpGetAuth = async (
  route: string,
  config: object = {},
  authRequired: boolean = false
) => {
  if (!route) throw new Error("a route must be provided");
  let GETConfig = {
    headers: {
      Accept: "application/json",
    } as any,
    ...config,
  };

  // If authRequired is true, add the Authorization header
  if (authRequired) {
    let access_token = window.localStorage.getItem("token");
    if (!access_token) {
      access_token = await getNewToken();
      window.localStorage.setItem("token", access_token as string);
    }
    GETConfig.headers.Authorization = `Bearer ${access_token}`;
  }

  // Try the GET request
  let response = await fetch(route, GETConfig);

  // If the response is a 401, try to get a new token and retry the request
  while (response.status === 401 && authRequired) {
    // Get a new token
    const newToken = await getNewToken();

    // Update the Authorization header and retry the request
    GETConfig.headers.Authorization = `Bearer ${newToken}`;
    window.localStorage.setItem("token", newToken);
    response = await fetch(route, GETConfig);
  }

  if (!response.ok) throw new Error(`could not fetch data for url ${route}`);
  return await response.json();
};

export const httpPutAuth = async (
  route: string,
  payload: object = {},
  config: object = {},
  authRequired: boolean = false
) => {
  if (!route) throw new Error("a route must be provided");
  const PUTConfig = {
    method: "PUT",
    headers: {
      Accept: "application/json",
    } as any,
    ...config,
    body: JSON.stringify(payload),
  };

  // If authRequired is true, add the Authorization header
  if (authRequired) {
    const access_token = window.localStorage.getItem("token");
    if (access_token) {
      PUTConfig.headers.Authorization = `Bearer ${access_token}`;
    }
  }

  // Try the GET request
  let response = await fetch(route, PUTConfig);

  // If the response is a 401, try to get a new token and retry the request
  while (response.status === 401 && authRequired) {
    // Get a new token
    const newToken = await getNewToken();

    // Update the Authorization header and retry the request
    PUTConfig.headers.Authorization = `Bearer ${newToken}`;
    window.localStorage.setItem("token", newToken);
    response = await fetch(route, PUTConfig);
  }

  if (!response.ok) throw new Error(`could not fetch data for url ${route}`);
  return await response.json();
};


const getVersion: any = async () => {
  const versionResponse = await fetch("http://www.dpw-notifier.com/version");
  const version = await versionResponse.text();
  if (version === "old") {
    return {
      httpGet: async (route: string, config: object = {}) => {
        if (!route) throw new Error("a route must be provided");
        const response = await fetch(route, config);
        if (!response.ok) throw new Error(`could not fetch data for url ${route}`);
        return await response.json();
      },
      httpPut: async (route: string, payload: object = {}, config: object = {}) => {
        if (!route) throw new Error("a route must be provided");
        const PUTConfig = {
          ...config,
          method: "PUT",
          headers: {
            'Accept': "application/json, text/plain, */*",
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify(payload)
        }
        const response = await fetch(route, PUTConfig)
        if (!response.ok) throw new Error(`could not fetch data for url ${route}`)
        return await response.json()
      }
    };
  } else {
    return { httpGet: httpGetAuth, httpPut: httpPutAuth };
  }
}

// Wrapper function that retrieves the correct httpGet function depending on the version
export const httpGet = async (route: string, config: object = {}, authRequired: boolean = false) => {
  const { httpGet } = await getVersion();
  return await httpGet(route, config, authRequired);
};

// Wrapper function that retrieves the correct httpGet function depending on the version
export const httpPut = async (route: string, payload: object = {}, config: object = {}, authRequired: boolean = false) => {
  const { httpPut } = await getVersion();
  return await httpPut(route, payload, config, authRequired);
};
