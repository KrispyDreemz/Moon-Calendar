const START_DATE_KEY = "moonCalendar:startDate";
const REFLECTION_KEY_PREFIX = "moonCalendar:reflection:";

export function getStoredStartDate() {
  return localStorage.getItem(START_DATE_KEY);
}

export function setStoredStartDate(value) {
  localStorage.setItem(START_DATE_KEY, value);
}

export function getReflection(dateKey) {
  return localStorage.getItem(`${REFLECTION_KEY_PREFIX}${dateKey}`) || "";
}

export function setReflection(dateKey, value) {
  localStorage.setItem(`${REFLECTION_KEY_PREFIX}${dateKey}`, value);
}
