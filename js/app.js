import {
  cycleDays,
  LUNAR_MONTH_LENGTH,
  LUNAR_YEAR_LENGTH,
  lunarDayMap,
  lunarMonths
} from "./data.js";
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
  prevMonthButton: document.querySelector("#prev-month"),
  nextMonthButton: document.querySelector("#next-month"),
  jumpMonthSelect: document.querySelector("#jump-month"),
  jumpYearInput: document.querySelector("#jump-year"),
  jumpToMonthButton: document.querySelector("#jump-to-month"),
  displayDate: document.querySelector("#display-date"),
  cycleDay: document.querySelector("#cycle-day"),
  lunarDay: document.querySelector("#lunar-day"),
  lunarMonthLabel: document.querySelector("#lunar-month-label"),
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

function getLunarDate(startDate, currentDate) {
  const diffDays = Math.floor((currentDate - startDate) / MS_PER_DAY);
  const dayOfYear = ((diffDays % LUNAR_YEAR_LENGTH) + LUNAR_YEAR_LENGTH) % LUNAR_YEAR_LENGTH;
  return lunarDayMap[dayOfYear];
}

function getLunarYearMonth(startDate, currentDate) {
  const diffDays = Math.floor((currentDate - startDate) / MS_PER_DAY);
  const dayOfYear = ((diffDays % LUNAR_YEAR_LENGTH) + LUNAR_YEAR_LENGTH) % LUNAR_YEAR_LENGTH;
  const yearIndex = Math.floor(diffDays / LUNAR_YEAR_LENGTH);
  const monthIndex = Math.floor(dayOfYear / LUNAR_MONTH_LENGTH) + 1;
  return { dayOfYear, monthIndex, yearIndex };
}

function getLunarKey(startDate, currentDate) {
  const lunarDate = getLunarDate(startDate, currentDate);
  const lunarYearMonth = getLunarYearMonth(startDate, currentDate);
  return `${lunarYearMonth.yearIndex + 1}-${lunarYearMonth.monthIndex}-${lunarDate.dayInMonth}`;
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

function buildMonthOptions() {
  lunarMonths.forEach((month) => {
    const option = document.createElement("option");
    option.value = String(month.index);
    option.textContent = `${month.index} — ${month.name}`;
    elements.jumpMonthSelect.append(option);
  });
}

function updateReflection(dateKey) {
  const todayKey = toISODate(normalizeDate(new Date()));
  const legacyKey = dateKey === todayKey ? dateKey : null;
  const lunarKey = getLunarKey(cycleStartDate, viewDate);
  elements.reflectionInput.value = getReflection(lunarKey, legacyKey);
}

function render() {
  const displayKey = toISODate(viewDate);
  const cycleIndex = getCycleIndex(cycleStartDate, viewDate);
  const cycleDay = cycleDays[cycleIndex];
  const lunarDate = getLunarDate(cycleStartDate, viewDate);
  const lunarYearMonth = getLunarYearMonth(cycleStartDate, viewDate);
  const lunarMonth = lunarMonths[lunarYearMonth.monthIndex - 1];

  elements.displayDate.textContent = viewDate.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  elements.cycleDay.textContent = `Cycle Day ${cycleDay.day} of 28`;
  elements.lunarDay.textContent = `Month ${lunarDate.monthIndex} (${lunarDate.monthName}) • Day ${lunarDate.dayInMonth}`;
  elements.lunarMonthLabel.textContent = `Viewing Lunar Month ${lunarMonth.index} (${lunarMonth.name}) • Year ${
    lunarYearMonth.yearIndex + 1
  }`;
  elements.moonPhase.textContent = cycleDay.phase;
  elements.moonName.textContent = cycleDay.moonName;
  elements.archetype.textContent = cycleDay.archetype;
  elements.affirmation.textContent = cycleDay.affirmation;

  elements.jumpMonthSelect.value = String(lunarMonth.index);
  elements.jumpYearInput.value = String(lunarYearMonth.yearIndex + 1);

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

elements.prevMonthButton.addEventListener("click", () => shiftViewDate(-LUNAR_MONTH_LENGTH));

elements.nextMonthButton.addEventListener("click", () => shiftViewDate(LUNAR_MONTH_LENGTH));

elements.jumpToMonthButton.addEventListener("click", () => {
  const monthValue = Number.parseInt(elements.jumpMonthSelect.value, 10);
  const yearValue = Number.parseInt(elements.jumpYearInput.value, 10);

  if (Number.isNaN(monthValue) || Number.isNaN(yearValue)) {
    return;
  }

  const yearIndex = yearValue - 1;
  const totalDays =
    yearIndex * LUNAR_YEAR_LENGTH + (monthValue - 1) * LUNAR_MONTH_LENGTH;
  viewDate = normalizeDate(new Date(cycleStartDate.getTime() + totalDays * MS_PER_DAY));
  render();
});

elements.reflectionInput.addEventListener("input", (event) => {
  const value = event.target.value;
  const lunarKey = getLunarKey(cycleStartDate, viewDate);
  setReflection(lunarKey, value);
});

buildMonthOptions();
render();
