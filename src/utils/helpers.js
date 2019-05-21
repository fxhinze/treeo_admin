export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    const last = +new Date() - timestamp

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function dateDiffMonths (dt1, dt2) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000
  diff /= (60 * 60 * 24 * 7 * 4)
  return Math.abs(Math.round(diff))
}

export function numberWithCommas (number, toFixed = 0) {
  return number.toFixed(toFixed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function validateLngLat (lnglat) {
  const [lng, lat] = lnglat

  if (lat < -90 || lat > 90) {
    // LngLat [lat] must be within -90 to 90 degrees
    return false
  } else if (lng < -180 || lng > 180) {
    // LngLat [lng] must be within -180 to 180 degrees
    return false
  }
  return true
}