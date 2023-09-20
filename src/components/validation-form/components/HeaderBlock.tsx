import React from 'react';

export interface HeaderBlockProps {
  title: string;
  subtitle: string;
  image: string;
  total: string;
  buttons: Button[];
}

interface Button {
  name: string;
  icon: string;
  color: string;
  type: string;
  url: string;
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({
  title,
  subtitle,
  image,
  total,
  buttons,
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <img src={image} alt="Expense User" />
      <p>Total: {total}</p>
      <div>
        {buttons.map((button, index) => (
          <button key={index} style={{ backgroundColor: button.color }}>
            {button.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeaderBlock;
