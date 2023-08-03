import React from 'react';

interface ValidationRule {
    // Define the structure of a validation rule if it contains any specific properties
    // You can add properties here based on the actual structure of the validationRules object.
    // For example:
    // propertyName: propertyType;
  }

  interface Button {
    name: string;
    icon: string;
    color: string;
    type: string;
    url: string;
  }
  
  interface InfoTipItem {
    type: string;
    icon: string;
    color: string;
    title: string;
    subtitle: string;
    text: string;
  }
  
  interface ValidateButton {
    commentMandatory: boolean;
  }
  
  interface RejectButton {
    commentMandatory: boolean;
  }
  
  interface Item {
    type?: string;
    title?: string;
    subtitle?: string;
    image?: string;
    total?: string;
    buttons?: Button[];
    labelFrom?: string;
    labelTo?: string;
    dateFormat?: string;
    fromDate?: string;
    toDate?: string;
    infotip?: {
      icon: string;
      color: string;
      tooltip: string;
      closeButtonText: string;
      items: InfoTipItem[];
    };
    data?: string;
    slides?: string;
    display?: string;
    items?: Item[]; // Renamed from listItems to Items
    icon?: string;
    color?: string;
    href?: string;
    commentEnabled?: boolean;
    commentPlaceholder?: string;
    validateButton?: ValidateButton;
    rejectButton?: RejectButton;
  }
  
  interface Template {
    color: string;
    gradient: string;
    items: Item[];
  }
  
  export interface ItemValidationTemplate {
    version: string;
    type: string;
    validationRules: ValidationRule;
    data: { [key: string]: any }; // You can define a more specific type if you know the data structure.
    template: Template;
 }

  interface ValidationFormProps {
    validationForm: ItemValidationTemplate|undefined;
  }
  
  
const ValidationForm: React.FC<ValidationFormProps> = ({validationForm}) => {

    const generateComponents = (templateItems: Item[]): React.ReactNode => {
        return templateItems.map((item, index) => {
          switch (item.type) {
            case 'headerBlock':
              return (
                <div key={index}>
                  {/* Render your headerBlock component here */}
                  <h1>{item.title}</h1>
                  <p>{item.subtitle}</p>
                  {/* Render buttons, if available */}
                  {item.buttons && item.buttons.map((button, btnIndex) => (
                    <button key={btnIndex} style={{ color: button.color }}>
                      {button.name}
                    </button>
                  ))}
                </div>
              );
      
            case 'sectionBlock':
              return (
                <div key={index}>
                  {/* Render your sectionBlock component here */}
                  <h2>{item.title}</h2>
                  <p>{item.subtitle}</p>
                  {/* Recursively render nested items */}
                  {item.items && generateComponents(item.items)}
                </div>
              );
      
            case 'listBlock':
              return (
                <ul key={index}>
                  {/* Render your listBlock component here */}
                  {item.items && item.items.map((item, liIndex) => (
                    <li key={liIndex}>
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                      {/* Recursively render nested items */}
                      {item.items && generateComponents(item.items)}
                    </li>
                  ))}
                </ul>
              );
      
            // Add more cases for other types as needed
            default:
              return null;
          }
        });
      };
    return (
        <form>
            {validationForm?.template && generateComponents(validationForm.template.items)}
            <button type="submit">Submit</button>
        </form>
    );
};
  
export default ValidationForm;
  

