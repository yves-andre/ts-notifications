let versionInfo: { promise: Promise<any> | null, expiration: number | null } = { promise: null, expiration: null }; // global variable to store versionPromise and its expiration
let tokenPromise: Promise<string> | null = null;


const getNewToken = async () => {
  if (tokenPromise) {
    // If there is an ongoing token request, wait for it to finish
    return await tokenPromise;
  }

  // Start a new token request and store the promise
  tokenPromise = (async () => {
    const root = process.env.REACT_APP_API_DWP_ROOT_2 as string;
    const url = root + process.env.REACT_APP_API_DWP_AUTH as string;
    const authResponse = await fetch(url, {
      credentials: "include",
    });
    const authData = await authResponse.text();
    return authData;
  })();

  try {
    // Wait for the token request to finish
    const token = await tokenPromise;
    return token;
  } finally {
    // Clear the token promise after the request is done
    tokenPromise = null;
  }
};

export const httpGetAuth = async (
  route: string,
  config: object = {},
  authRequired: boolean = false
) => {
  if (!route) throw new Error("a route must be provided");
  // a DWP route must be constructed with the Root api url
  if (!route.includes("http")) {
    route = process.env.REACT_APP_API_DWP_ROOT_2 + route;
  }

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

  try {
    // Try the GET request
    let response = await fetch(route, GETConfig);

    let currentRetry = 1;
    let totalDelay = 0; // Keep track of the total delay so far in milliseconds
    const MAX_DELAY_MS = 30000; // 5 minutes
    const BASE_DELAY_MS = 200;
    const MAX_WAIT_TIME_MS = 5 * 60 * 1000; // 5 minutes 
    
    // If the response is a 401, try to get a new token and retry the request
    while (response.status === 401 && authRequired && totalDelay < MAX_WAIT_TIME_MS) {
      // Get a new token
      const newToken = await getNewToken();
    
      // Update the Authorization header and retry the request
      GETConfig.headers.Authorization = `Bearer ${newToken}`;
      window.localStorage.setItem("token", newToken);
    
      // The formula is 200 x 2^(i-1) ms and we add as a maximum delay of 30 seconds
      // so with a base of 200ms and for the 6 first retry we have 200, 400, 800, 1600, 3200, 6400, until 30000
      let delayForThisRetry = Math.min(MAX_DELAY_MS, BASE_DELAY_MS * Math.pow(2, currentRetry - 1));
      await new Promise(resolve => setTimeout(resolve, delayForThisRetry));
      console.log("WAITED " + delayForThisRetry);
      response = await fetch(route, GETConfig); // Re-fetch after the delay
    
      totalDelay += delayForThisRetry; // Update the total delay so far
      currentRetry++;
    
      // Check if total delay has exceeded maximum waiting time
      if (totalDelay >= MAX_WAIT_TIME_MS) {
        throw new Error('Could not authenticate the user within the maximum waiting time');
      }
    }

    if (!response.ok) {
      console.error(`Could not fetch data for url ${route}, error ${response.status}`);
      return response.status;
    }

    return await response.json();
    
  } catch(error:any) {
    console.error(`An error occurred: ${error.message}, status code: ${error.status}`);
    // also handle failed requests where there is no status code
    return error.message == "Failed to fetch" ? 1 : error.status;
  }
};

export const httpPutAuth = async (
  route: string,
  payload: object = {},
  config: object = {},
  authRequired: boolean = false
) => {
  if (!route) throw new Error("a route must be provided");
  // a DWP route must be constructed with the Root api url
  if (!route.includes("http")) {
    route = process.env.REACT_APP_API_DWP_ROOT_2 + route;
  }
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
  let response:any = await fetch(route, PUTConfig);

  // If the response is a 401, try to get a new token and retry the request
  while (response.status === 401 && authRequired) {
    // Get a new token
    const newToken = await getNewToken();

    // Update the Authorization header and retry the request
    PUTConfig.headers.Authorization = `Bearer ${newToken}`;
    window.localStorage.setItem("token", newToken);
    response = await fetch(route, PUTConfig);
  }
  if (!response.ok) {
    return response.status;
    console.error(`could not fetch data for url ${route}, error ${response.status}`)
  }
  return await response.json();
};

const refreshVersionPromise = async () => {
  versionInfo.promise = getApiVersion();
  versionInfo.expiration = Date.now() + 300000; // Set expiration time to 5 minutes from now
};

const getApiVersion: any = async () => {
  const url = process.env.REACT_APP_API_DWP_VERSION as string;
  const versionResponse = await fetch(url);
  const version = await versionResponse.text();
  return version;
};

const getHttpMethods: any = async (authRequired: boolean) => {
  // Check if the versionPromise has expired or not set, then refresh it
  if (!versionInfo.promise || !versionInfo.expiration || Date.now() > versionInfo.expiration) {
    await refreshVersionPromise();
  }

  const version = await versionInfo.promise;
  if (version === "1.0") {
    return {
      httpGet: async (route: string, config: object = {}) => {
        if (!route) throw new Error("a route must be provided");
        const GETConfig = {
          ...config
        } as any;

        if (authRequired) {
          GETConfig["credentials"] = "include";
        }
        // a DWP route must be constructed with the Root api url
        if (!route.includes("http")) {
          route = process.env.REACT_APP_API_DWP_ROOT_1 + route;
        }
        try {
          const response:any = await fetch(route, GETConfig);
          if (!response.ok) {
            console.error(`Could not fetch data for url ${route}, error ${response.status}`);
            return response.status;
          }
          return await response.json();
        } catch (error:any) {
          console.error(`An error occurred: ${error.message}, status code: ${error.status}`);
          // also handle failed requests where there is no status code
          return error.message == "Failed to fetch" ? 1 : error.status;
        }
      },
      httpPut: async (route: string, payload: object = {}, config: object = {}) => {
        if (!route) throw new Error("a route must be provided");
        // a DWP route must be constructed with the Root api url
        if (!route.includes("http")) {
          route = process.env.REACT_APP_API_DWP_ROOT_1 + route;
        }
        const PUTConfig = {
          ...config,
          method: "PUT",
          headers: {
            'Accept': "application/json, text/plain, */*",
            'Content-Type': 'application/json;charset=UTF-8'
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        } as any;
        const response = await fetch(route, PUTConfig)
        if (!response.ok) throw new Error(`could not fetch data for url ${route}`)
        return await response.json()
      }
    };
  } else if (version === "2.0") {
    return { httpGet: httpGetAuth, httpPut: httpPutAuth };
  } else {
    throw new Error("Uknown dwp version");
  }
}

// Wrapper function that retrieves the correct httpGet function depending on the version
export const httpGet = async (route: string, config: object = {}, authRequired: boolean = false) => {
  const { httpGet } = await getHttpMethods(authRequired);
  return await httpGet(route, config, authRequired);
};

// Wrapper function that retrieves the correct httpGet function depending on the version
export const httpPut = async (route: string, payload: object = {}, config: object = {}, authRequired: boolean = false) => {
  const { httpPut } = await getHttpMethods();
  return await httpPut(route, payload, config, authRequired);
};
