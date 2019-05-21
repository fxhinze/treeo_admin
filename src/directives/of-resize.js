import ResizeObserver from 'resize-observer-polyfill'
import debounce from 'lodash/debounce'

const defaultDelay = 150

function getOptions (modifiers) {
  if (!modifiers) {
    return { delay: defaultDelay, initial: false }
  }
  const { initial = false } = modifiers
  let delay = Object.keys(modifiers).map(k => parseInt(k)).find(v => !isNaN(v))
  delay = delay || defaultDelay
  return { delay, initial }
}

function listenToVisibile (el, callback) {
  const observer = new ResizeObserver((entries, observer) => {
    if (entries.length > 0) {
      callback(entries[0].contentRect)
    }
  })

  observer.observe(el)
  return observer
}

export default {
  inserted (el, { value, arg, modifiers }) {
    if (!value || typeof value !== 'function') return

    const options = getOptions(modifiers)

    options.initial = true

    let setValue = (payload) => {
      value(payload)
    }

    if (arg === 'debounce') {
      setValue = debounce((payload) => {
        value(payload)
      }, options.delay)
    }

    el.__visibility__listener__ = listenToVisibile(
      el,
      value,
      payload => setValue(payload)
    )
  },

  unbind (el) {
    if (el.__visibility__listener__) {
      el.__visibility__listener__.disconnect()
    }
  }
}