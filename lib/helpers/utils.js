const reverseArray = a => a.map((item, idx) => a[a.length - 1 - idx]);

const dynamicSort = property => {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

export { reverseArray, dynamicSort };
