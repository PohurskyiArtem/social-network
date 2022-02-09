//Check empty array/object

export const isEmpty = (val: Array<any> | object) => val == null || !(Object.keys(val) || val).length