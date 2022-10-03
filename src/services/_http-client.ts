import { APP_CONFIG } from "../data/app-config";

export const httpGet = async (route: string) => {
  if (!route) throw new Error("a route must be provided");
  const response = await fetch(APP_CONFIG.BASE_URL + route);
  if (!response.ok) throw new Error(`could not fetch data for url ${route}`);
  return await response.json();
};

export const httpPost = async (route: string, body: any) => {
  if (!route) throw new Error("a route must be provided");
  const response = await fetch(APP_CONFIG.BASE_URL + route, {
    body: JSON.stringify({ ...body }),
  });
  if (!response.ok) throw new Error(`sending data failed for ${route}`);
  return await response.json();
};
