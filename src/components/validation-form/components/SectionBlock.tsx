import React from 'react';

export interface SectionBlockProps {
  title: string;
  subtitle: string;
  actions: any[]; // You can define a specific type for actions if needed
  items: any[]; // You can define a specific type for items if needed
}

const SectionBlock: React.FC<SectionBlockProps> = ({ title, subtitle, actions, items }) => {
  return (
    <div>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      {/* Render actions here, if needed */}
      <div>
        {items.map((item, index) => (
          <div key={index}>
            {item.type === 'fromToDate' && (
              <div>
                <h4>From: {item.fromDate}</h4>
                <h4>To: {item.toDate}</h4>
              </div>
            )}
            {/* Render other item types here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionBlock;