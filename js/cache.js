const set = (key, obj, expired) => {
  let time = expired.substring(0, expired.length - 1)
  if (expired.endsWith('h')) {
    expired = Date.now() + parseInt(time) * 60 * 60 * 1000
  } else if (expired.endsWith('d')) {
    expired = Date.now() + parseInt(time) * 24 * 60 * 60 * 1000
  } else if (expired.endsWith('m')) {
    expired = Date.now() + parseInt(time) * 60 * 1000
  } else if (expired.endsWith('s')) {
    expired = Date.now() + parseInt(time) * 1000
  } else {
    expired = Date.now() + parseInt(time)
  }

  let cache = { data: obj, expired: expired }
  uni.setStorageSync(key, JSON.stringify(cache))
}

const get = (key) => {
  let cache = uni.getStorageSync(key)
  if (cache) {
    cache = JSON.parse(cache)
    if (cache.expired > Date.now()) {
      return cache.data
    } else {
      uni.removeStorageSync(key)
    }
  }
  return null
}

export default { set, get }
