import FromToDate, { FromToDateProps } from "./components/FromToDate";
import HeaderBlock, { HeaderBlockProps } from "./components/HeaderBlock";

interface ValidationRule {
  // Define the structure of a validation rule if it contains any specific properties
  // You can add properties here based on the actual structure of the validationRules object.
  // For example:
  // propertyName: propertyType;
}

export interface Button {
  name: string;
  icon: string;
  color: string;
  type?: string;
  url: string;
}

export interface InfoTipItem {
  type: string;
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  text: string;
}

export interface ValidateButton {
  commentMandatory: boolean;
}

export interface RejectButton {
  commentMandatory: boolean;
}

export interface Item {
  type?: string;
  title?: string;
  subtitle?: string;
  image?: string;
  total?: string;
  buttons?: Button[];
  label?: string;
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
  data?: any;
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

export interface Template {
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



export const generateComponents = (templateItems: Item[]): React.ReactNode => {
  return templateItems.map((item, index) => {
    switch (item.type) {
      case 'headerBlock':
        return <HeaderBlock {...item as HeaderBlockProps} />
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

      case 'fromToDate':
        return <FromToDate {...item as FromToDateProps} />
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