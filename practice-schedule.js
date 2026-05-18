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

  function serviceMarkup(services) {
    return Object.entries(services)
      .map(([service, time]) => `<span><strong>${service}</strong> ${time}</span>`)
      .join("");
  }

  function renderHeaderPractice() {
    const header = document.querySelector("header.site-shell");
    if (!header || header.querySelector(".practice-strip")) return;

    const strip = document.createElement("section");
    strip.className = "practice-strip";
    strip.setAttribute("aria-label", "이번 달과 다음 달 토요일 연습 시간");
    strip.innerHTML = `
      <div class="practice-strip-label">토요 연습</div>
      <div class="practice-strip-months">
        ${getCurrentAndNext()
          .map(
            (item) => `
              <article class="practice-strip-card${item.isCurrent ? " is-current" : ""}"${item.isCurrent ? ' aria-current="date"' : ""}>
                <span>${item.label}</span>
                <h2>${monthName(item.month)}</h2>
                <div>${serviceMarkup(item.services)}</div>
              </article>
            `
          )
          .join("")}
      </div>
    `;

    header.append(strip);
  }

  window.ABCPRAISE_PRACTICE = {
    monthSchedule,
    getCurrentAndNext,
    monthName,
    serviceMarkup
  };

  renderHeaderPractice();
})();
