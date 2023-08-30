import React, { ChangeEvent } from 'react'
import { useAppDispatch } from '../../../hooks/use-app-dispatch'
import { useAppSelector } from '../../../hooks/use-app-selector'
import { filtersActions } from '../../../store/filters-slice'

import { Input } from '@trading/energies-ui'

import './Search.scss'
import { useDebounce } from '../../../hooks/use-debounce'

export const Search: React.FC<{ stacked: boolean }> = ({ stacked }) => {
  const dispatch = useAppDispatch()

  const search = useAppSelector((state) => state.filters.searchFilter);

  const searchChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(filtersActions.setSearchFilter(event.target.value));
  }

  return (
    <Input
      size='large'
      placeholder='Quick search in this list...'
      type='search'
      icon={{ name: 'search', position: 'before' }}
      stacked={stacked}
      onChange={searchChangeHandler}
      deleteBtn={true}
      value={search}
      style={{
        ...stacked && {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }
      }}
    />
  )
}

export default Search
