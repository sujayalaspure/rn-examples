/**
 * class cacheService
 *  Takes api service which expose fetch method
 *  this fetch method should return promise with data and error
 *
 * getData
 *  exposed method from cacheService class
 *  this will fetch the data and store in cache
 *  this will take 2 args. identifier, and forceFetch(boolean)
 *  cache will be stored against identifier
 *  if forceFetch is true. invalidate the cache and refetch the data from api.
 *  else if time passes. refetch the data
 *  return promise{data, dataStatus: 'cache' | 'fresh'}
 *
 * setTimer
 *  this method set the timer to invalidate the cache
 *
 * extras
 * -  option to provide the local storage object
 * -  add abort controller config
 * -  retry of fails - https://dev.to/officialanurag/javascript-secrets-how-to-implement-retry-logic-like-a-pro-g57
 *
 */
