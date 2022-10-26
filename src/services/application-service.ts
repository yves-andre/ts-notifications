import Application from "../data/interfaces/application";
import { httpGet } from "./_http-client";

export const getApplications = async () => {
  const applications = await httpGet(
    process.env.REACT_APP_API_APPLICATIONS_URL as string,
    {
      headers: {
        Accept: "application/json;odata=verbose",
      },
    }
  )
    .then((response) => response.d.results)
    .then((applications) => {
      return applications.map((application: any) => {
        return {
          match: application.Match,
          type: application.NotificationType,
          title: application.Title,
          image: application.image,
        } as Application;
      });
    });
  return applications;
};
