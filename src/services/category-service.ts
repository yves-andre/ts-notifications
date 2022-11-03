import CategoryColor from "../data/interfaces/category-color";
import { httpGet } from "./_http-client";

export const getCategoryColors = async () => {
  const applications = await httpGet(
    process.env.REACT_APP_API_CATEGORY_COLORS_URL as string,
    {
      headers: {
        Accept: "application/json;odata=verbose",
      },
    }
  )
    .then((response) => response.d.results)
    .then((categoryColors) => {
      return categoryColors.map((categoryColor: any) => {
        return {
          title: categoryColor.Title,
          color: categoryColor.Color
        } as CategoryColor;
      });
    });
  return applications;
};
