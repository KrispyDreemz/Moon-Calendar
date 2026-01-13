const START_DATE_KEY = "moonCalendar:startDate";
const REFLECTION_KEY_PREFIX = "moonCalendar:reflection:";

export function getStoredStartDate() {
  return localStorage.getItem(START_DATE_KEY);
}

export function setStoredStartDate(value) {
  localStorage.setItem(START_DATE_KEY, value);
}

export function getReflection(lunarKey, legacyKey) {
  const lunarStorageKey = `${REFLECTION_KEY_PREFIX}${lunarKey}`;
  const storedValue = localStorage.getItem(lunarStorageKey);
  if (storedValue !== null) {
    return storedValue;
  }

  if (legacyKey) {
    const legacyStorageKey = `${REFLECTION_KEY_PREFIX}${legacyKey}`;
    const legacyValue = localStorage.getItem(legacyStorageKey);
    if (legacyValue !== null) {
      localStorage.setItem(lunarStorageKey, legacyValue);
      localStorage.removeItem(legacyStorageKey);
      return legacyValue;
    }
  }

  return "";
}

export function setReflection(lunarKey, value) {
  localStorage.setItem(`${REFLECTION_KEY_PREFIX}${lunarKey}`, value);
}
