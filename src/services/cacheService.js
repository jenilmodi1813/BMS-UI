const cache = new Map();

/**
 * Set data in cache with a TTL (Time To Live)
 * @param {string} key - The cache key (usually the URL)
 * @param {any} data - The data to cache
 * @param {number} ttlSeconds - Time to live in seconds
 */
export const setCache = (key, data, ttlSeconds = 60) => {
    const expiry = Date.now() + ttlSeconds * 1000;
    cache.set(key, { data, expiry });
};

/**
 * Get data from cache
 * @param {string} key - The cache key
 * @returns {any|null} - The cached data or null if not found/expired
 */
export const getCache = (key) => {
    const cached = cache.get(key);
    if (!cached) return null;

    if (Date.now() > cached.expiry) {
        cache.delete(key);
        return null;
    }

    return cached.data;
};

/**
 * Clear the entire cache
 */
export const clearCache = () => {
    cache.clear();
};
