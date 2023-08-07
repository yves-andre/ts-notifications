import React from 'react';
import FromToDate, { FromToDateProps } from './components/FromToDate';
import HeaderBlock, { HeaderBlockProps } from './components/HeaderBlock';
import { Item, ItemValidationTemplate, generateComponents } from './validation-form-service';


interface ValidationFormProps {
  validationForm: ItemValidationTemplate|undefined;
}


const ValidationForm: React.FC<ValidationFormProps> = ({validationForm}) => {
    return (
        <form>
            {validationForm?.template && generateComponents(validationForm.template.items)}
        </form>
    );
};
  
export default ValidationForm;
  

