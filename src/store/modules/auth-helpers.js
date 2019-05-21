export function getSavedState (key) {
  return JSON.parse(window.localStorage.getItem(key))
}

export function saveState (key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}

export function clearStates () {
  window.localStorage.clear()
}

export function setDefaultAuthHeaders (user = null) {
  saveState('auth.currentUser', user)
}