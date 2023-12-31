import Application from "../data/interfaces/application";
import { httpGet } from "./_http-client";

export const getApplications = async () => {
  const url = `${window.location.protocol}${process.env.REACT_APP_API_APPLICATIONS_URL}`;
  const applications = await httpGet(
    url,
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
          sourceName: application.SourceName,
          title: application.Title,
          image: application.image,
          txtColor: application.TxtColor
        } as Application;
      });
    });
  return applications;
};
