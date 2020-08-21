/**
 * Serialize a string to base64
 *
 * @param {String} value
 */
export const serialize = (value) => {
  if(typeof value === 'undefined') {
    throw "serialize() - Invalid value param";
  }

  return btoa(value);
};

/**
 * Deserialize  a string from base64
 *
 * @param {String} value
 */
export const deserialize = (value) => {
  if(typeof value === 'undefined') {
    throw "deserialize() - Invalid value param";
  }

  return atob(value);
};
