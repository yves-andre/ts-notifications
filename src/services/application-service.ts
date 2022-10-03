import { httpGet } from "./_http-client";

export const getApplications = async () => {
  const applications = httpGet("applications.json");
  return applications;
};