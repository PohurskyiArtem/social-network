
export const removeNullUndefined = (obj: Object) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
