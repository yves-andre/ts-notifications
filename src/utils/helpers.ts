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
