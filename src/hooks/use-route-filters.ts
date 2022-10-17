import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "./use-app-dispatch";
import { useAppSelector } from "./use-app-selector";

// listens to filter changes and adds them to the route as query params,
export const useRoutetFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // adding filters to the route whenever a filter changes
  useEffect(() => {
    let searchParams = {} as any;
    Object.keys(filters).map((filterKey) => {
      type filtersKey = keyof typeof filters;
      if (filters[filterKey as filtersKey] !== "") {
        const paramValue =
          typeof filters[filterKey as filtersKey] !== "string"
            ? JSON.stringify(filters[filterKey as filtersKey])
            : filters[filterKey as filtersKey];
        searchParams[filterKey] = paramValue;
      }
    });
    setSearchParams(searchParams);
  }, [filters]);

  return searchParams;
}