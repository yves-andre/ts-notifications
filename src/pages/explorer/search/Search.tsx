import React, { ChangeEvent } from "react";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { useAppSelector } from "../../../hooks/use-app-selector";
import { filtersActions } from "../../../store/filters-slice";

import "./Search.scss";

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();

  const search = useAppSelector((state) => state.filters.searchFilter);

  const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(filtersActions.setSearchFilter(event.target.value));
  };

  return (
    <input
      type="text"
      value={search}
      onChange={searchChangeHandler}
      placeholder="Quick search ..."
    />
  );
};

export default Search;
