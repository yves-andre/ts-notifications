import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../hooks/use-app-dispatch'
import { useAppSelector } from '../../../hooks/use-app-selector'
import { filtersActions } from '../../../store/filters-slice'
import './DelegationToggle.scss'

export const DelegationToggle: React.FC = () => {
  const showDelegationsObject = useAppSelector(
    (state) => state.filters.showDelegations
  );
  
  const [showDelegations, setShowDelegations] = useState<boolean | null>(null);
  
  // we use a useState showDelegations that is updated in the useEffect
  // because we want to wait for the showDelegations.hasBeenSet to be true,
  // in order to avoid a flashing of the checkbox
  useEffect(() => {
    showDelegationsObject.hasBeenSet && setShowDelegations(showDelegationsObject.value);
  },[showDelegationsObject])

  const dispatch = useAppDispatch();

  const toggleHandler = () => {
    dispatch(filtersActions.toggleShowDelegations(!showDelegationsObject.value))
  }

  if (showDelegations !== null) {
    return (
      <label className="DelegationToggle">
        Show delegations:
        <div className="DelegationToggle-switch">
          <input
            className="DelegationToggle-input"
            type="checkbox"
            onChange={toggleHandler}
            checked={showDelegations}
          />
          <span className="DelegationToggle-label">
            <span></span>
          </span>
        </div>
      </label>
    );
  }

  return <></>
}

export default DelegationToggle
