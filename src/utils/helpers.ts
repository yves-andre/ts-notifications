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