import React, { ChangeEvent } from 'react'
import { useAppDispatch } from '../../../hooks/use-app-dispatch'
import { useAppSelector } from '../../../hooks/use-app-selector'
import { filtersActions } from '../../../store/filters-slice'
import './DelegationToggle.scss'

export const DelegationToggle: React.FC = () => {
  const showDelegations = useAppSelector(
    (state) => state.filters.showDelegations
  )
  const dispatch = useAppDispatch()

  const toggleHandler = () => {
    dispatch(filtersActions.toggleShowDelegations(!showDelegations))
  }

  return (
    <label className='DelegationToggle'>
      Show delegations:
      <div className='DelegationToggle-switch'>
        <input
          className='DelegationToggle-input'
          type='checkbox'
          onChange={toggleHandler}
          defaultChecked={showDelegations}
        />
        <span className='DelegationToggle-label'>
          <span></span>
        </span>
      </div>
    </label>
  )
}

export default DelegationToggle
