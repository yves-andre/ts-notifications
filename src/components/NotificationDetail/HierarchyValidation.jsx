import React, { useContext, useEffect, useState } from "react";

import { IconButton, Input, BEM, Tooltip, Icon } from "@trading/energies-ui";
import styles from "./HierarchyValidation.module.scss";
import { ValidationContext } from "./Panel";
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

const ValidationErrorsPopup = ({ errors, isOpen, onClose }) => {

  const items = errors.map(error => {
    return {
      type: "text",
      icon: "warning",
      color: "orange",
      title: "Mandatory Check",
      text: error,
    }
  });

  return (
    <Infotip
      icon="filled/info-circle"
      color="gray"
      tooltip="Caption"
      closeButtonText="Ok, Got it"
      items={items}
      open={isOpen}
      onClose={onClose}
    />
  );
};

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
  notificationDetails,
}) => {
  const [comment, setComment] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { validation, getValidationErrors } = useContext(ValidationContext);
  const [validationErrorMessages, setValidationErrorMessages] = useState([]);
  const [showValidationPopup, setShowValidationPopup] = useState(false);

  const setValidationErrors = (messages) => {
    setValidationErrorMessages(messages);
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
    const hierarchyValid = isValid(HierarchyValidationButtons.Validate);
    const validationRulesErrors = getValidationErrors();
    if (hierarchyValid && validationRulesErrors.length === 0) {
      setValidationErrors(null);
      try {
        setIsUpdating(true);
        await onValidate?.(comment);
      } catch (e) {
        console.log("error: ", e);
      }
      setIsUpdating(false);
    } else {
      const validationErrorMessages = [];
      !hierarchyValid && validationErrorMessages.push("Comment is mandatory when validating");
      validationRulesErrors.length && validationErrorMessages.push(...validationRulesErrors);
      setValidationErrors(validationErrorMessages);
      setShowValidationPopup(true);
    }
  };

  const reject = async () => {
    if (isValid(HierarchyValidationButtons.Reject)) {
      setValidationErrors(null);
      try {
        setIsUpdating(true);
        await onReject?.(comment);
      } catch (e) {
        console.log("error: ", e);
      }
      setIsUpdating(false);
    } else {
      setValidationErrors(["Comment is mandatory when rejecting"]);
      setShowValidationPopup(true);
    }
  };

  return (
    <div className={b()} data-type={type}>
      {notificationStatus == 2 && <span>{notificationDetails}</span>}
      {notificationStatus != 2 && (
        <>
          {validationErrorMessages?.length > 0 && showValidationPopup && (
            <ValidationErrorsPopup
              errors={validationErrorMessages}
              isOpen={showValidationPopup}
              onClose={() => setShowValidationPopup(false)}
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
      )}
    </div>
  );
};

export default HierarchyValidation;
