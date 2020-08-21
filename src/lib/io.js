export const io = (kvStorage, serialize, deserialize) => {
  if(!kvStorage || !serialize || !deserialize) {
    throw "io(): Invalid parameter count";
  }

  /**
   * @param {String} key
   */
  const load = async (key) => {
    const gotItem = await new Promise((res, rej) => {
      kvStorage.get([key], (item) => {
        res(item && item[key] ? item[key] : '');
      });
    });

    const result = deserialize(gotItem);

    return result;
  }

  /**
   * @param {String} key
   */
  const save = async (key, value) => {
    const data = {};
    data[key] = serialize(value);

    await new Promise((res, rej) => {
      kvStorage.set(data, res.bind(null));
    });
  }

  return Object.freeze({
    load,
    save
  });
};
