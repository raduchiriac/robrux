const reverseArray = a => a.map((item, idx) => a[a.length - 1 - idx]);

const dynamicSort = property => {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a, b) => {
    const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

const getErrorMessage = error => {
  if (error.graphQLErrors) {
    for (const graphQLError of error.graphQLErrors) {
      if (graphQLError.extensions && graphQLError.extensions.code === 'BAD_USER_INPUT') {
        return graphQLError.message;
      }
    }
  }
  return error.message;
};

export { reverseArray, dynamicSort, getErrorMessage };
