export const includesString = (searchString: string, compareString: string) => {
  if (!searchString && !compareString) return true;
  return searchString
    ?.trim()
    .toLowerCase()
    .includes(compareString.trim().toLowerCase());
};

// sorts an array of objects by a given string field
export const sortArrayByStringField = (
  array: any[],
  fieldName: string,
  ascending: boolean
) => {
  if (ascending) {
    return array.sort((a, b) =>
      a[fieldName] > b[fieldName] ? 1 : b[fieldName] > a[fieldName] ? -1 : 0
    );
  }
  return array.sort((b, a) =>
    a[fieldName] > b[fieldName] ? 1 : b[fieldName] > a[fieldName] ? -1 : 0
  );
};

export const dateStringtoDate = (dateStr: string): Date => {
  // Try parsing with default Date constructor first (for ISO strings)
  const isoDate = new Date(dateStr);
  if (!isNaN(isoDate.getTime())) {
    return isoDate;
  }

  // Custom format parsing for "28 Sept 2023 at 10:48"
  const [, day, month, year, hour, minute] = /(\d+) (\w+) (\d+) at (\d+):(\d+)/.exec(dateStr) || [];
  
  // Map for month names
  const monthNames: { [key: string]: number } = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };

  // Convert the month name to a number
  const monthNumber = monthNames[month.substr(0, 3)];
  
  // Return a new Date object
  return new Date(Number(year), monthNumber, Number(day), Number(hour), Number(minute));
};

// Your existing function with a minor modification to use dateStringtoDate
export const sortArrayByDateStringField = (
  array: any[],
  fieldName: string,
  ascending: boolean
) => {
  return array.sort((a, b) => {
    const dateA = dateStringtoDate(a[fieldName]);
    const dateB = dateStringtoDate(b[fieldName]);
    return ascending
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });
};

// sorting an array by a string property, with a secondary sort on a string-date format
export const sortArrayByStringAndDate = (
  array: any[],
  stringFieldName: string,
  dateStringFieldName: string,
  stringAscending: boolean,
) => {
  if(stringAscending) {
    return array.sort((a,b) => {
      if(a[stringFieldName] === b[stringFieldName]) {
        // date sorting is important only when the string fields are the same
        return Number(new Date(b[dateStringFieldName])) - Number(new Date(a[dateStringFieldName]))
      }
      return a[stringFieldName] > b[stringFieldName] ? 1 : b[stringFieldName] > a[stringFieldName] ? -1 : 0
    })
  }
  return array.sort((a,b) => {
    if(a[stringFieldName] === b[stringFieldName]) {
      // date sorting is important only when the string fields are the same
      return Number(new Date(b[dateStringFieldName])) - Number(new Date(a[dateStringFieldName]))
    }
    return b[stringFieldName] > a[stringFieldName] ? 1 : a[stringFieldName] > b[stringFieldName] ? -1 : 0
  })
}

export function getUTCWeek(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setUTCMonth(0, 1);
  if (target.getUTCDay() !== 4) {
    target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}