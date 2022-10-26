import React, { ChangeEvent } from 'react'
import { useAppDispatch } from '../../../hooks/use-app-dispatch'
import { useAppSelector } from '../../../hooks/use-app-selector'
import { filtersActions } from '../../../store/filters-slice'

import { Input } from '@trading/energies-ui'

import './Search.scss'

export const Search: React.FC = () => {
  const dispatch = useAppDispatch()

  const search = useAppSelector((state) => state.filters.searchFilter)

  const searchChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(filtersActions.setSearchFilter(event.target.value))
  }

  return (
    <Input
      placeholder='Quick search ...'
      type='search'
      variant='translucide'
      round
      icon={{ name: 'search', position: 'before', color: 'white' }}
      onChange={searchChangeHandler}
      deleteBtn={true}
      value={search}
    />
  )
}

export default Search
