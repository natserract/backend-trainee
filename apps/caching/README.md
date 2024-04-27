# Caching

a caching mechanism to store API responses temporarily. This helps minimize redundant API calls and improves response times, especially for frequently accessed or static data. However, ensure the cached data remains up-to-date and implement appropriate expiration policies.

## Cache aside strategy

One possible strategy that can be used to introduce a caching mechanism is Cache Aside (or Lazy loading).

Data is cached only when it’s requested.

When an application requests data, it first checks if it is present in the cache, if present, it is returned directly from the cache otherwise it is retrieved from the source (e.g. a database), stored in the cache for future requests and then returned to the application.

in this way we obtain the following advantages:

1. Reduced latency: frequently requested data is cached, reducing the time required to access it compared to retrieval from slower storage systems such as databases.

2. Scalability: by reducing the load on back-end systems such as databases, the effective use of caching can help improve the overall scalability of the system.

3. Improved user experience: By serving frequently accessed data from the cache, users experience faster response times and smoother interactions with applications or websites. This leads to a more satisfying experience.

and disadvantages:

1. Waste of resources: when storing infrequently used data.

2. Data consistency: introduces the need to manage synchronization and cache invalidation to ensure that the data are up-to-date and consistent with the source.

## Cache prefetching

An entire product catalog can be pre-cached in Redis, and the application can perform any product query on Redis similar to the primary database.
