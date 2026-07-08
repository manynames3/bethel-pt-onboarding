(function () {
  const rotationAnchor = { year: 2026, month: 1 };
  const services = ["1부", "2부", "3부"];
  const rotatingTimes = ["2:00pm", "2:40pm", "3:20pm"];

  function positiveModulo(value, divisor) {
    return ((value % divisor) + divisor) % divisor;
  }

  function monthSerial(year, month) {
    return year * 12 + (month - 1);
  }

  function normalizeYearMonth(yearOrMonth, month) {
    if (typeof month === "number") {
      return { year: yearOrMonth, month };
    }

    return { year: rotationAnchor.year, month: yearOrMonth };
  }

  function nextYearMonth(year, month) {
    return month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };
  }

  function monthName(month) {
    return `${month}월`;
  }

  function formatMonthLabel(item, referenceDate = new Date()) {
    const referenceYear = referenceDate.getFullYear();
    const prefix = item.year && item.year !== referenceYear ? `${item.year}년 ` : "";
    return `${prefix}${monthName(item.month)}`;
  }

  function getMonthSchedule(yearOrMonth, month) {
    const target = normalizeYearMonth(yearOrMonth, month);
    const monthsFromAnchor =
      monthSerial(target.year, target.month) - monthSerial(rotationAnchor.year, rotationAnchor.month);
    const rotationOffset = positiveModulo(monthsFromAnchor, rotatingTimes.length);

    return {
      year: target.year,
      month: target.month,
      services: Object.fromEntries(
        services.map((service, index) => [
          service,
          rotatingTimes[(index + rotationOffset) % rotatingTimes.length]
        ])
      )
    };
  }

  function normalizeDate(date) {
    const value = date instanceof Date ? date : new Date(date);
    return Number.isNaN(value.getTime()) ? new Date() : value;
  }

  function getCurrentAndNext(date = new Date()) {
    const today = normalizeDate(date);
    const current = {
      year: today.getFullYear(),
      month: today.getMonth() + 1
    };
    const next = nextYearMonth(current.year, current.month);

    return [
      { label: "이번 달", isCurrent: true, ...getMonthSchedule(current.year, current.month) },
      { label: "다음 달", isCurrent: false, ...getMonthSchedule(next.year, next.month) }
    ];
  }

  window.ABCPRAISE_PRACTICE = {
    rotationAnchor,
    services,
    rotatingTimes,
    monthSchedule: Array.from({ length: 12 }, (_, index) =>
      getMonthSchedule(rotationAnchor.year, index + 1)
    ),
    getMonthSchedule,
    getCurrentAndNext,
    monthName,
    formatMonthLabel
  };
})();
