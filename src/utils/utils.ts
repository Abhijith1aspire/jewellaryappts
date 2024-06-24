type JsonObject = { [key: string]: any };

export const applyKeyMapping = (jsonObject: JsonObject, mapping: { [key: string]: string }): JsonObject => {
  const newObject: JsonObject = {};

  Object.keys(jsonObject).forEach(key => {
    const newKey = mapping[key];

    if (Array.isArray(jsonObject[key])) {
        newObject[newKey] = jsonObject[key].map(item => {
          if (typeof item === 'object' && item !== null) {
            return applyKeyMapping(item, mapping);
          }
          return item;
        });
    } else if (typeof jsonObject[key] === 'object' && jsonObject[key] !== null) {
      newObject[newKey] = applyKeyMapping(jsonObject[key], mapping);
    } else {
      newObject[newKey] = jsonObject[key];
    }
  });

  return newObject;
};

   