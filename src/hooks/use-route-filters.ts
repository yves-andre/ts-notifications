import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from './use-app-dispatch'
import { useAppSelector } from './use-app-selector'
import { filtersActions } from '../store/filters-slice'

// listens to filter changes and adds them to the route as query params,
export const useRouteFilters = () => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.filters)
  const [searchParams, setSearchParams] = useSearchParams()

  // adding filters to the route whenever a filter changes
  useEffect(() => {
    let searchParams = {} as any
    if(filters.showDelegations === undefined){
      initShowDelegationToggle(false);
    }
    Object.keys(filters).map((filterKey) => {
      type filtersKey = keyof typeof filters
      if (filters[filterKey as filtersKey] !== '') {
        const paramValue =
          typeof filters[filterKey as filtersKey] !== 'string'
            ? JSON.stringify(filters[filterKey as filtersKey])
            : filters[filterKey as filtersKey]
        searchParams[filterKey] = paramValue
      }
    })
    setSearchParams(searchParams)
  }, [filters])


  const initShowDelegationToggle = (showDelegations: boolean) => {
    dispatch(filtersActions.toggleShowDelegations(showDelegations))
  }

  return searchParams
}