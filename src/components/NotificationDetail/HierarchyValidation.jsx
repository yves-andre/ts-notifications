import React, {useState} from 'react'

import { IconButton, Input, BEM } from '@trading/energies-ui'
import styles from './HierarchyValidation.module.scss'
const b = BEM(styles)

export const HierarchyValidationButtons = {
  Validate : 'validateButton',
  Reject : 'rejectButton'
}

/*----------------------------------------------------------------------------*/
// EXEMPLE
/*
{
  "type": "hierarchyValidation",
  "commentEnabled": true,
  "commentPlaceholder": "Comments",
  "validateButton" : {
    "commentMandatory": false
  },
  "rejectButton": {
    "commentMandatory": true
  }
}

*/
/*----------------------------------------------------------------------------*/
export const HierarchyValidation = ({
  type,
  commentEnabled,
  commentPlaceholder,
  validateButton,
  rejectButton,
  onValidate,
  onReject,
  isDisabled,
}) => {
  const [comment, setComment] = useState('')
  const [isUpdating, setIsUpdating] = useState(false);

  const isCommentMandatory = (buttonName) => {
    switch(buttonName){
      case HierarchyValidationButtons.Validate:
        return validateButton?.commentMandatory;
      case HierarchyValidationButtons.Reject:
        return rejectButton?.commentMandatory;
    }
    return false;
  }

  const isValid = (buttonName) => {
    if(isCommentMandatory(buttonName) && !comment){
      return false;
    }
    return true;
  }

  const validate = async () => {

    if(isValid(HierarchyValidationButtons.Validate)){
      try {
        setIsUpdating(true)
        await onValidate?.(comment);
      } catch (e) {
        console.log('error: ', e);
      }
      setIsUpdating(false)
    } else {
      console.log('error: comment is mandatory when validating');
    }
  }

  const reject = async () => {
    if(isValid(HierarchyValidationButtons.Reject)){
      try {
        setIsUpdating(true)
        await onReject?.(comment);
      } catch (e) {
        console.log('error: ', e);
      }
      setIsUpdating(false)
    } else {
      console.log('error: comment is mandatory when rejecting');
    }
  }


  return (
    <div className={b()} data-type={type}>
      <Input
        placeholder={commentPlaceholder}
        round
        variant='gray'
        margin={0}
        type='text'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ flex: 1, lineHeight: 1 }}
        disabled={!commentEnabled || isUpdating || isDisabled}
      />
      <div className={b('actions')}>
        {validateButton && (
          <IconButton
            color='corporate/green'
            icon='filled/check-circle'
            size='xl'
            disabled={isUpdating || isDisabled}
            onClick={() => validate()}
          >
            Validate
          </IconButton>
        )}
        {rejectButton && (
          <IconButton
            color='corporate/red'
            icon='filled/times-circle'
            size='xl'
            disabled={isUpdating || isDisabled}
            onClick={() => reject()}
          >
            Reject
          </IconButton>
        )}
      </div>
    </div>
  )
}

export default HierarchyValidation
