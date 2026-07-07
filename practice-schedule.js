(function () {
  const monthSchedule = [
    { month: 1, services: { "1부": "2:00pm", "2부": "2:40pm", "3부": "3:20pm" } },
    { month: 2, services: { "1부": "2:40pm", "2부": "3:20pm", "3부": "2:00pm" } },
    { month: 3, services: { "1부": "3:20pm", "2부": "2:00pm", "3부": "2:40pm" } },
    { month: 4, services: { "1부": "2:00pm", "2부": "2:40pm", "3부": "3:20pm" } },
    { month: 5, services: { "1부": "2:40pm", "2부": "3:20pm", "3부": "2:00pm" } },
    { month: 6, services: { "1부": "3:20pm", "2부": "2:00pm", "3부": "2:40pm" } },
    { month: 7, services: { "1부": "2:00pm", "2부": "2:40pm", "3부": "3:20pm" } },
    { month: 8, services: { "1부": "2:40pm", "2부": "3:20pm", "3부": "2:00pm" } },
    { month: 9, services: { "1부": "3:20pm", "2부": "2:00pm", "3부": "2:40pm" } },
    { month: 10, services: { "1부": "2:00pm", "2부": "2:40pm", "3부": "3:20pm" } },
    { month: 11, services: { "1부": "2:40pm", "2부": "3:20pm", "3부": "2:00pm" } },
    { month: 12, services: { "1부": "3:20pm", "2부": "2:00pm", "3부": "2:40pm" } }
  ];

  function monthName(month) {
    return `${month}월`;
  }

  function getMonthSchedule(month) {
    return monthSchedule[(month - 1 + 12) % 12];
  }

  function getCurrentAndNext(date = new Date()) {
    const currentMonth = date.getMonth() + 1;
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    return [
      { label: "이번 달", isCurrent: true, ...getMonthSchedule(currentMonth) },
      { label: "다음 달", isCurrent: false, ...getMonthSchedule(nextMonth) }
    ];
  }

  window.ABCPRAISE_PRACTICE = {
    monthSchedule,
    getCurrentAndNext,
    monthName
  };
})();
