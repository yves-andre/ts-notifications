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

// sorts an array of objects by a given string field representing a date
export const sortArrayByDateStringField = (
  array: any[],
  fieldName: string,
  ascending: boolean
) => {
  if (ascending) {
    return array.sort((a, b) => Number(new Date(a[fieldName])) - Number(new Date(b[fieldName])));
    // return array.sort(function(a,b){return new Date(a[fieldName]).getTime() - new Date(b[fieldName]).getTime()});
  }
  return array.sort((a, b) => Number(new Date(b[fieldName])) - Number(new Date(a[fieldName])));
  // return array.sort(function(a,b){return new Date(a[fieldName]).getTime() + new Date(b[fieldName]).getTime()});
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

export function getUTCWeek(date: any) {
  if (!(date instanceof Date)) date = new Date();

  // ISO week date weeks start on Monday, so correct the day number
  var nDay = (date.getDay() + 6) % 7;

  // ISO 8601 states that week 1 is the week with the first Thursday of that year
  // Set the target date to the Thursday in the target week
  date.setDate(date.getDate() - nDay + 3);

  // Store the millisecond value of the target date
  var n1stThursday = date.valueOf();

  // Set the target to the first Thursday of the year
  // First, set the target to January 1st
  date.setMonth(0, 1);

  // Not a Thursday? Correct the date to the next Thursday
  if (date.getDay() !== 4) {
    date.setMonth(0, 1 + ((4 - date.getDay()) + 7) % 7);
  }

  // The week number is the number of weeks between the first Thursday of the year
  // and the Thursday in the target week (604800000 = 7 * 24 * 3600 * 1000)
  return 1 + Math.ceil((n1stThursday - date) / 604800000);
}