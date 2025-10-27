const cacheStore = {};

export const setCache = (key, data, ttl = 60) => {
  const expires = Date.now() + ttl * 1000;
  cacheStore[key] = { data, expires };
};

export const getCache = (key) => {
  const cached = cacheStore[key];
  if (!cached) return null;
  if (Date.now() > cached.expires) {
    delete cacheStore[key];
    return null;
  }
  return cached.data;
};

export const clearCache = () => {
  Object.keys(cacheStore).forEach((key) => delete cacheStore[key]);
};
