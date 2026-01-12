import { cycleDays } from "./data.js";
import {
  getReflection,
  getStoredStartDate,
  setReflection,
  setStoredStartDate
} from "./storage.js";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const elements = {
  startDateInput: document.querySelector("#start-date"),
  setStartButton: document.querySelector("#set-start"),
  todayButton: document.querySelector("#go-today"),
  prevButton: document.querySelector("#prev-day"),
  nextButton: document.querySelector("#next-day"),
  displayDate: document.querySelector("#display-date"),
  cycleDay: document.querySelector("#cycle-day"),
  moonPhase: document.querySelector("#moon-phase"),
  moonName: document.querySelector("#moon-name"),
  archetype: document.querySelector("#archetype"),
  affirmation: document.querySelector("#affirmation"),
  reflectionInput: document.querySelector("#reflection")
};

let viewDate = normalizeDate(new Date());

function normalizeDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toISODate(date) {
  return date.toISOString().slice(0, 10);
}

function getCycleIndex(startDate, currentDate) {
  const diffDays = Math.floor((currentDate - startDate) / MS_PER_DAY);
  const mod = ((diffDays % 28) + 28) % 28;
  return mod;
}

function ensureStartDate() {
  const storedDate = getStoredStartDate();
  const today = normalizeDate(new Date());
  if (storedDate) {
    elements.startDateInput.value = storedDate;
    return normalizeDate(new Date(storedDate));
  }
  const iso = toISODate(today);
  elements.startDateInput.value = iso;
  setStoredStartDate(iso);
  return today;
}

let cycleStartDate = ensureStartDate();

function updateReflection(dateKey) {
  elements.reflectionInput.value = getReflection(dateKey);
}

function render() {
  const displayKey = toISODate(viewDate);
  const cycleIndex = getCycleIndex(cycleStartDate, viewDate);
  const cycleDay = cycleDays[cycleIndex];

  elements.displayDate.textContent = viewDate.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  elements.cycleDay.textContent = `Cycle Day ${cycleDay.day} of 28`;
  elements.moonPhase.textContent = cycleDay.phase;
  elements.moonName.textContent = cycleDay.moonName;
  elements.archetype.textContent = cycleDay.archetype;
  elements.affirmation.textContent = cycleDay.affirmation;

  updateReflection(displayKey);
}

function shiftViewDate(days) {
  viewDate = normalizeDate(new Date(viewDate.getTime() + days * MS_PER_DAY));
  render();
}

elements.setStartButton.addEventListener("click", () => {
  const value = elements.startDateInput.value;
  if (!value) {
    return;
  }
  cycleStartDate = normalizeDate(new Date(value));
  setStoredStartDate(value);
  render();
});

elements.todayButton.addEventListener("click", () => {
  viewDate = normalizeDate(new Date());
  render();
});

elements.prevButton.addEventListener("click", () => shiftViewDate(-1));

elements.nextButton.addEventListener("click", () => shiftViewDate(1));

elements.reflectionInput.addEventListener("input", (event) => {
  const value = event.target.value;
  const dateKey = toISODate(viewDate);
  setReflection(dateKey, value);
});

render();
