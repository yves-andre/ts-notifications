import React, { useEffect, useState } from "react";

import { IconButton, Input, BEM } from "@trading/energies-ui";
import styles from "./HierarchyValidation.module.scss";
import Infotip from "./Infotip";
const b = BEM(styles);

export const HierarchyValidationButtons = {
  Validate: "validateButton",
  Reject: "rejectButton",
};

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
  notificationStatus,
  notificaitonTreatedBy,
  notificaitonTreatedOn,
}) => {
  const [comment, setComment] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const [validationErrorMessage, setValidationErrorMessage] = useState(null);

  const setValidationError = (message) => {
    setValidationErrorMessage(message);
  };

  const isCommentMandatory = (buttonName) => {
    switch (buttonName) {
      case HierarchyValidationButtons.Validate:
        return validateButton?.commentMandatory;
      case HierarchyValidationButtons.Reject:
        return rejectButton?.commentMandatory;
    }
    return false;
  };

  const isValid = (buttonName) => {
    if (isCommentMandatory(buttonName) && !comment) {
      return false;
    }
    return true;
  };

  const validate = async () => {
    if (isValid(HierarchyValidationButtons.Validate)) {
      setValidationError(null);
      try {
        setIsUpdating(true);
        await onValidate?.(comment);
      } catch (e) {
        console.log("error: ", e);
      }
      setIsUpdating(false);
    } else {
      setValidationError("Comment is mandatory when validating");
    }
  };

  const reject = async () => {
    if (isValid(HierarchyValidationButtons.Reject)) {
      setValidationError(null);
      try {
        setIsUpdating(true);
        await onReject?.(comment);
      } catch (e) {
        console.log("error: ", e);
      }
      setIsUpdating(false);
    } else {
      setValidationError("Comment is mandatory when rejecting");
    }
  };

  return (
    <div className={b()} data-type={type}>
      {notificationStatus === 2 && 
        <div className={b("treated_info")}>
          Treated by <b>{notificaitonTreatedBy}</b> on <b>{notificaitonTreatedOn}</b>
        </div>
      }
      {notificationStatus !== 2 && 
        <>
          {validationErrorMessage && (
        <Infotip
          icon="filled/info-circle"
          color="gray"
          tooltip="Caption"
          closeButtonText="Ok, Got it"
          items={[{
            type: "text",
            icon: "warning",
            color: "red",
            title: "Mandatory Comment",
            text: validationErrorMessage,
          }]}
          open={validationErrorMessage}
          onClose={() => {setValidationErrorMessage(null)}}
        />
      )}
      <Input
        placeholder={commentPlaceholder}
        round
        variant="gray"
        margin={0}
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ flex: 1, lineHeight: 1 }}
        disabled={!commentEnabled || isUpdating || isDisabled}
      />
      <div className={b("actions")}>
        {validateButton && (
          <IconButton
            color="corporate/green"
            icon="filled/check-circle"
            size="xl"
            disabled={isUpdating || isDisabled}
            onClick={() => validate()}
          >
            Validate
          </IconButton>
        )}
        {rejectButton && (
          <IconButton
            color="corporate/red"
            icon="filled/times-circle"
            size="xl"
            disabled={isUpdating || isDisabled}
            onClick={() => reject()}
          >
            Reject
          </IconButton>
        )}
      </div>
        </>
      }
    </div>
  );
};

export default HierarchyValidation;
