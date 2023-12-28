export default {
  first: (array) => {
    return Array.isArray(array) && array && array.length > 0
      ? array[0]
      : undefined;
  },
  last: (array) => {
    return Array.isArray(array) && array && array.length > 0
      ? array[array.length - 1]
      : undefined;
  },
  hasItem: (array, item) => {
    return Array.isArray(array) && array && array.indexOf(item) !== -1;
  },
  sort: (array, property, isReverse = false) => {
    return property
      ? array.sort(function (a, b) {
          return a[property] > b[property]
            ? isReverse
              ? -1
              : 1
            : b[property] > a[property]
              ? isReverse
                ? 1
                : -1
              : 0;
        })
      : array.sort();
  },
  sortByASC: (array, property) => {
    return array.sort(function (a, b) {
      return ((property ? a[property] : a) || "").toLowerCase() === "xxxx" &&
        ((property ? b[property] : b) || "").toLowerCase() !== "xxxx"
        ? -1
        : ((property ? a[property] : a) || "").toLowerCase() !== "xxxx" &&
            ((property ? b[property] : b) || "").toLowerCase() === "xxxx"
          ? 1
          : (property ? a[property] : a) > (property ? b[property] : b)
            ? 1
            : (property ? a[property] : a) < (property ? b[property] : b)
              ? -1
              : 0;
    });
  },
  relocateItem: (array, oldIdx, newIdx) => {
    if (newIdx >= array.length) {
      var k = newIdx - array.length + 1;
      while (k--) {
        array.push(undefined);
      }
    }
    array.splice(newIdx, 0, array.splice(oldIdx, 1)[0]);
    return array;
  },
};
