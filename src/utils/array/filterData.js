/**
 * @desc Filters an array of objects based on multiple conditions specified in a filter object.
 * @param {Array}  arr The array of objects to be filtered.
 * @param {Object} filterObj
 * @param {type}   filterObj.key Keys represent the fields to filter on.
 * @param {type}   filterObj.value Values are objects containing comparison operators (gt, lt, gte, lte) as keys and the corresponding comparison values as values.
 * @returns A new array containing only the objects from the original array that meet all the specified filtering conditions.
 */

function filterData(arr, filterObj = {}) {
  return arr.filter(item => {
    for (const field in filterObj) {
      const conditions = filterObj[field];
      for (const op in conditions) {
        const value = conditions[op];
        //
        if(value == null) return true
        const fieldValue = item[field];
        console.log({op, value, fieldValue})

        switch (op) {
          case "gt":
            if (!(fieldValue > value)) return false;
            break;
          case "lt":
            if (!(fieldValue < value)) return false;
            break;
          case "gte":
            if (!(fieldValue >= value)) return false;
            break;
          case "lte":
            if (!(fieldValue <= value)) return false;
            break;
          case "eq":
            if (!(fieldValue == value)) return false;
            break;
        }
      }
    }
    return true;
  });
}

export default filterData