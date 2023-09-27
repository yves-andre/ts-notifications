import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../hooks/use-app-dispatch'
import { useAppSelector } from '../../../hooks/use-app-selector'
import { filtersActions } from '../../../store/filters-slice'


import { Checkbox } from '@trading/energies-ui'


import './DelegationToggle.scss'

export const DelegationToggle: React.FC = () => {
  const showDelegations = useAppSelector(
    (state) => state.filters.showDelegations
  );

  const dispatch = useAppDispatch();

  const toggleHandler = () => {
    dispatch(filtersActions.toggleShowDelegations(!showDelegations))
  }

  if (showDelegations !== undefined) {
    return (
      <Checkbox
        label='Show Delegations'
        margin={0}
        variant='switch'
        style={{ flexDirection: 'row-reverse' }}
        defaultChecked={showDelegations}
        onChange={toggleHandler}
      />
    );
  }

  return <></>
}

export default DelegationToggle
