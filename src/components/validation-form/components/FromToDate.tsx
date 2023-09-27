import React from 'react';

export interface FromToDateProps {
  labelFrom: string;
  labelTo: string;
  dateFormat: string;
  fromDate: string;
  toDate: string;
}

const FromToDate: React.FC<FromToDateProps> = ({
  labelFrom,
  labelTo,
  dateFormat,
  fromDate,
  toDate,
}) => {
  const formattedFromDate = new Date(fromDate).toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedToDate = new Date(toDate).toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div>
      <div>
        <span>{labelFrom}: </span>
        <span>{formattedFromDate}</span>
      </div>
      <div>
        <span>{labelTo}: </span>
        <span>{formattedToDate}</span>
      </div>
    </div>
  );
};

export default FromToDate;