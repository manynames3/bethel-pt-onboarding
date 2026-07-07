const STORAGE_KEY = "abcpraise.site.ko.v1";
const ADMIN_CODE = "bethel";
const legacySundayNotes = [
  "라인 체크, Aviom 믹스, 튜닝, 전체 합주를 위해 예배 40분 전에 준비된 상태로 도착해 주세요."
];
const legacyCombinedSongIds = ["greeting", "offering"];
const sundayServices = [
  { service: "1부", practice: "오전 7:15", worship: "오전 7:45" },
  { service: "2부", practice: "오전 9:00", worship: "오전 9:30" },
  { service: "3부", practice: "오전 11:00", worship: "오전 11:30" }
];
const initialServiceDate = new Date(2026, 6, 5);
const weekdayLabels = ["주일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const kakaoSheetNote = "악보는 베델교회 찬양팀 카카오톡 단체방에도 공유됩니다.";
const quickResources = [
  {
    href: "#songbook",
    token: "PDF",
    title: "찬양 PDF",
    description: kakaoSheetNote,
    variant: "teal",
    primary: true,
    mobile: "악보",
    mobileOrder: 1
  },
  {
    href: "https://www.youtube.com/playlist?list=PLl9hj6fNvw1Fi4PGkWwMiS6gyCDs3udoj",
    token: "YT",
    title: "주일예배 플레이리스트",
    description: "YouTube 참고 영상",
    variant: "blue",
    external: true
  },
  {
    href: "https://www.youtube.com/playlist?list=PLl9hj6fNvw1G7-RC3SlAN1_Q0cqBYavot",
    token: "YT",
    title: "금요예배 플레이리스트",
    description: "YouTube 참고 영상",
    variant: "blue",
    external: true
  },
  {
    href: "#onboarding",
    token: "PT",
    title: "파트별 온보딩",
    description: "악기 · 보컬 · Aviom",
    variant: "green"
  },
  {
    href: "onboarding/aviom.html",
    token: "ALL",
    title: "전체 공통",
    description: "Aviom · 키 조정 리소스",
    variant: "slate",
    mobile: "전체 공통",
    mobileOrder: 3
  },
  {
    href: "#practice",
    token: "SAT",
    title: "토요 연습",
    description: "이번 달 · 다음 달 시간표",
    variant: "amber",
    mobile: "연습시간",
    mobileOrder: 2
  }
];

const defaultState = {
  selectedSongId: "offeringGreeting",
  songs: [
    {
      id: "offeringGreeting",
      title: "헌금 찬양 & 인사찬양",
      subtitle: "헌금송 · 축복송 자료",
      allowNotes: false,
      pdfName: "",
      pdfData: "",
      resources: [
        {
          label: "2부",
          title: "헌금송 · 축복송",
          description: "2부용 PDF 악보",
          type: "PDF",
          href: "assets/resources/2026-offering-blessing-song-2bu.pdf"
        },
        {
          label: "3부",
          title: "헌금송 · 축복송",
          description: "3부용 JPG 악보",
          type: "JPG",
          href: "assets/resources/2026-offering-blessing-song-3bu.jpg"
        }
      ],
      notes: ""
    },
    {
      id: "special",
      title: "축복/환영 찬양",
      subtitle: "결혼 · 축복 · 환영 순서",
      allowNotes: false,
      pdfName: "",
      pdfData: "",
      resources: [
        {
          label: "1",
          title: "당신은 사랑받기 위해 태어난 사람",
          description: "PDF 악보",
          type: "PDF",
          href: "assets/resources/special-you-were-born-to-be-loved-20250406.pdf"
        },
        {
          label: "2",
          title: "당신은 사랑 받기 위해",
          description: "JPG 악보",
          type: "JPG",
          href: "assets/resources/special-you-were-born-to-be-loved.jpg"
        },
        {
          label: "3",
          title: "하나님께서 당신을 통해",
          description: "JPG 악보",
          type: "JPG",
          href: "assets/resources/special-through-you.jpg"
        }
      ],
      notes: ""
    }
  ],
  practice: {
    slotOne: "이번 주 토요일 시간은 코디네이터가 공지합니다",
    slotTwo: "이번 주 토요일 시간은 코디네이터가 공지합니다",
    slotThree: "이번 주 토요일 시간은 코디네이터가 공지합니다",
    sunday:
      "라인 체크, Aviom 믹스, 튜닝, 전체 합주를 위해 예배 30분 전부터 연습을 시작합니다."
  }
};

const roleGuides = window.ABCPRAISE_ROLES || [];

let state = loadState();
let unlocked = false;
let selectedServiceDate = new Date(initialServiceDate);

const els = {
  songTabs: [...document.querySelectorAll(".song-tab")],
  currentSongTitle: document.querySelector("#currentSongTitle"),
  pdfName: document.querySelector("#pdfName"),
  pdfFrame: document.querySelector("#pdfFrame"),
  currentResourceLink: document.querySelector("#currentResourceLink"),
  songResources: document.querySelector("#songResources"),
  songStatus: document.querySelector("#songStatus"),
  resourceGrid: document.querySelector("#resourceGrid"),
  mobileQuickActions: document.querySelector("#mobileQuickActions"),
  topPracticeTimes: document.querySelector("#topPracticeTimes"),
  prevServiceDate: document.querySelector("#prevServiceDate"),
  serviceDate: document.querySelector("#serviceDate"),
  nextServiceDate: document.querySelector("#nextServiceDate"),
  sidebarServiceTimes: document.querySelector("#sidebarServiceTimes"),
  serviceBriefDate: document.querySelector("#serviceBriefDate"),
  serviceBriefTimes: document.querySelector("#serviceBriefTimes"),
  roleGrid: document.querySelector("#roleGrid"),
  saturdayTimes: document.querySelector("#saturdayTimes"),
  sundayNote: document.querySelector("#sundayNote"),
  adminOpen: document.querySelector("#adminOpen"),
  adminClose: document.querySelector("#adminClose"),
  adminDrawer: document.querySelector("#adminDrawer"),
  drawerBackdrop: document.querySelector("#drawerBackdrop"),
  adminLock: document.querySelector("#adminLock"),
  adminCode: document.querySelector("#adminCode"),
  lockMessage: document.querySelector("#lockMessage"),
  adminForm: document.querySelector("#adminForm"),
  songSelect: document.querySelector("#songSelect"),
  songTitleInput: document.querySelector("#songTitleInput"),
  songSubtitleInput: document.querySelector("#songSubtitleInput"),
  notesInput: document.querySelector("#notesInput"),
  pdfInput: document.querySelector("#pdfInput"),
  uploadPreview: document.querySelector("#uploadPreview"),
  saveSong: document.querySelector("#saveSong"),
  songSaveMessage: document.querySelector("#songSaveMessage"),
  clearPdf: document.querySelector("#clearPdf"),
  slotOne: document.querySelector("#slotOne"),
  slotTwo: document.querySelector("#slotTwo"),
  slotThree: document.querySelector("#slotThree"),
  sundayInput: document.querySelector("#sundayInput"),
  savePractice: document.querySelector("#savePractice"),
  practiceSaveMessage: document.querySelector("#practiceSaveMessage"),
  adminTabs: [...document.querySelectorAll("[data-admin-tab]")],
  adminPanels: [...document.querySelectorAll("[data-admin-panel]")],
  resetContent: document.querySelector("#resetContent")
};

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored || !Array.isArray(stored.songs)) return structuredClone(defaultState);
    const selectedSongId = legacyCombinedSongIds.includes(stored.selectedSongId)
      ? "offeringGreeting"
      : defaultState.songs.some((song) => song.id === stored.selectedSongId)
        ? stored.selectedSongId
        : defaultState.selectedSongId;
    const practice = {
      ...defaultState.practice,
      ...(stored.practice || {})
    };
    if (legacySundayNotes.includes(practice.sunday)) {
      practice.sunday = defaultState.practice.sunday;
    }

    return {
      ...structuredClone(defaultState),
      ...stored,
      selectedSongId,
      songs: defaultState.songs.map((song) => {
        const storedSong =
          stored.songs.find((item) => item.id === song.id) ||
          (song.id === "offeringGreeting"
            ? stored.songs.find((item) => item.id === "offering") ||
              stored.songs.find((item) => item.id === "greeting")
            : {}) ||
          {};
        const merged = {
          ...song,
          ...storedSong,
          id: song.id,
          allowNotes: song.allowNotes,
          resources: song.resources
        };
        if (merged.allowNotes === false) merged.notes = "";
        if (
          song.id === "offeringGreeting" &&
          ["인사 찬양", "헌금 찬양"].includes(storedSong.title)
        ) {
          merged.title = song.title;
        }
        if (
          song.id === "offeringGreeting" &&
          ["예배 시작 환영", "헌금 순서"].includes(storedSong.subtitle)
        ) {
          merged.subtitle = song.subtitle;
        }
        if (song.id === "special" && storedSong.title === "특별 순서 찬양") {
          merged.title = song.title;
        }
        return merged;
      }),
      practice
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function addDays(date, days) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function formatServiceDate(date, options = {}) {
  const includeWeekday = options.includeWeekday !== false;
  const base = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  return includeWeekday ? `${base} (${weekdayLabels[date.getDay()]})` : base;
}

function renderServiceDate() {
  if (els.serviceDate) {
    els.serviceDate.textContent = formatServiceDate(selectedServiceDate);
  }
  if (els.serviceBriefDate) {
    els.serviceBriefDate.textContent = formatServiceDate(selectedServiceDate, {
      includeWeekday: false
    });
  }
}

function shiftServiceDate(weeks) {
  selectedServiceDate = addDays(selectedServiceDate, weeks * 7);
  renderServiceDate();
  renderPractice();
}

function selectedSong() {
  return state.songs.find((song) => song.id === state.selectedSongId) || state.songs[0];
}

function renderSongTabs() {
  els.songTabs.forEach((button) => {
    const song = state.songs.find((item) => item.id === button.dataset.song);
    if (!song) return;
    button.classList.toggle("is-active", song.id === state.selectedSongId);
    button.setAttribute("aria-pressed", song.id === state.selectedSongId ? "true" : "false");
    const title = button.querySelector("[data-song-title]");
    const subtitle = button.querySelector("[data-song-subtitle]");
    if (title) title.textContent = song.title;
    if (subtitle) subtitle.textContent = song.subtitle;
  });
}

function renderSong() {
  const song = selectedSong();
  els.currentSongTitle.textContent = song.title;
  els.pdfName.textContent = song.pdfName || resourceSummary(song) || "PDF 없음";
  els.songStatus.textContent = song.subtitle;
  updateCurrentResourceLink(song);

  if (song.pdfData) {
    els.pdfFrame.innerHTML = "";
    const iframe = document.createElement("iframe");
    iframe.title = `${song.title} 악보 PDF`;
    iframe.src = song.pdfData;
    els.pdfFrame.append(iframe);
  } else if (song.resources?.length) {
    renderResourcePreview(song.resources[0], song);
  } else {
    els.pdfFrame.innerHTML = `
      <div class="empty-pdf">
        <div class="empty-sheet" aria-hidden="true">
          <div class="empty-sheet-head">
            <strong>${song.title}</strong>
            <span>${song.subtitle}</span>
          </div>
          <span class="staff-lines"></span>
          <span class="staff-lines"></span>
          <span class="staff-lines"></span>
        </div>
        <strong>아직 PDF가 없습니다</strong>
        <p>관리자에서 이 곡의 악보를 업로드하세요.</p>
      </div>
    `;
  }

  renderSongResources(song);
  renderSongTabs();
  syncAdminFields();
}

function updateCurrentResourceLink(song) {
  if (!els.currentResourceLink) return;
  const primaryResource = song.resources?.[0];
  const href = song.pdfData || primaryResource?.href || "";
  if (!href) {
    els.currentResourceLink.hidden = true;
    els.currentResourceLink.removeAttribute("href");
    return;
  }

  els.currentResourceLink.hidden = false;
  els.currentResourceLink.href = href;
  if (song.pdfData && song.pdfName) {
    els.currentResourceLink.setAttribute("download", song.pdfName);
  } else {
    els.currentResourceLink.removeAttribute("download");
  }
}

function resourceSummary(song) {
  if (!song.resources?.length) return "";
  return song.resources.map((resource) => `${resource.label} ${resource.type}`).join(" · ");
}

function renderResourcePreview(resource, song) {
  els.pdfFrame.innerHTML = "";
  if (resource.type === "PDF") {
    const iframe = document.createElement("iframe");
    iframe.title = `${song.title} ${resource.label} ${resource.type}`;
    iframe.src = resource.href;
    els.pdfFrame.append(iframe);
    return;
  }

  const img = document.createElement("img");
  img.className = "resource-preview-image";
  img.src = resource.href;
  img.alt = `${song.title} ${resource.label} ${resource.type}`;
  els.pdfFrame.append(img);
}

function renderSongResources(song) {
  if (!els.songResources) return;
  const resources = song.resources || [];
  if (!resources.length) {
    els.songResources.hidden = true;
    els.songResources.innerHTML = "";
    return;
  }

  els.songResources.hidden = false;
  els.songResources.innerHTML = `
    <div class="song-resources-head">
      <strong>파일</strong>
      <span>${resources.length}개 파일</span>
    </div>
    <div class="song-resource-list">
      ${resources
        .map(
          (resource) => `
            <a class="song-resource-card" href="${resource.href}" target="_blank" rel="noopener noreferrer">
              <span class="song-resource-type">${resource.type}</span>
              <span class="song-resource-copy">
                <strong>${resource.label} ${resource.title}</strong>
                <span>${resource.description}</span>
              </span>
              <span class="song-resource-action">열기</span>
            </a>
          `
        )
        .join("")}
    </div>
  `;
}

function renderQuickResources() {
  if (els.resourceGrid) {
    els.resourceGrid.innerHTML = quickResources
      .map(
        (resource) => `
          <a class="resource-card${resource.primary ? " primary" : ""}" href="${resource.href}"${resource.external ? ' target="_blank" rel="noopener noreferrer"' : ""}>
            <span class="resource-token ${resource.variant || ""}">${resource.token}</span>
            <strong>${resource.title}</strong>
            <span>${resource.description}</span>
          </a>
        `
      )
      .join("");
  }

  if (els.mobileQuickActions) {
    els.mobileQuickActions.innerHTML = quickResources
      .filter((resource) => resource.mobile)
      .sort((a, b) => a.mobileOrder - b.mobileOrder)
      .map((resource) => `<a href="${resource.href}">${resource.mobile}</a>`)
      .join("");
  }
}

function renderRoles() {
  const roles = window.ABCPRAISE_ROLES || roleGuides;
  els.roleGrid.innerHTML = roles
    .map(
      (role, index) => `
        <a class="role-row ${index === 0 ? "is-active" : ""}" href="onboarding/${role.slug || ""}.html" aria-label="${role.tag} 온보딩 페이지 열기">
          <span class="role-icon">${roleInitial(role)}</span>
          <span class="role-copy">
            <strong>${role.tag}</strong>
            <span>${role.equipment || role.title}</span>
          </span>
          <span class="chev" aria-hidden="true">›</span>
        </a>
      `
    )
    .join("");
}

function roleInitial(role) {
  const initials = {
    "어쿠스틱 기타": "A",
    "베이스": "B",
    "일렉 기타": "E",
    "메인 건반": "K",
    "세컨 건반": "K",
    "드럼": "D",
    "싱어": "V",
    "전체 공통": "M"
  };
  return initials[role.tag] || role.tag.slice(0, 1);
}

function renderServiceTimes() {
  const markup = sundayServices
    .map(
      ({ service, practice, worship }) => `
        <div class="service-time-row">
          <strong class="service-time-service">${service}</strong>
          <span class="service-time-value"><small>연습</small> <span>${practice}</span></span>
          <span class="service-time-value"><small>예배</small> <span>${worship}</span></span>
        </div>
      `
    )
    .join("");

  if (els.sidebarServiceTimes) els.sidebarServiceTimes.innerHTML = markup;
  if (els.serviceBriefTimes) els.serviceBriefTimes.innerHTML = markup;
}

function renderPractice() {
  const practiceWindow = window.ABCPRAISE_PRACTICE?.getCurrentAndNext?.(selectedServiceDate);
  const rows = practiceWindow
    ? practiceWindow.map((item) => [
        `${window.ABCPRAISE_PRACTICE.monthName(item.month)} ${item.label}`,
        Object.entries(item.services)
          .map(([service, time]) => `${service} ${time}`)
          .join(" / ")
      ])
    : [
        ["1부 섬김자", state.practice.slotOne],
        ["2부 섬김자", state.practice.slotTwo],
        ["3부 섬김자", state.practice.slotThree]
      ];

  els.saturdayTimes.innerHTML = rows
    .map(
      ([label, time]) => `
        <div class="time-row">
          <span>${label}</span>
          <strong>${time}</strong>
        </div>
      `
    )
    .join("");
  if (els.topPracticeTimes) {
    const practiceItems = practiceWindow || [
      {
        label: "이번 달",
        isCurrent: true,
        services: {
          "1부": state.practice.slotOne,
          "2부": state.practice.slotTwo,
          "3부": state.practice.slotThree
        }
      }
    ];
    els.topPracticeTimes.innerHTML = `
      <span class="top-practice-heading">토요 연습 시간</span>
      <span class="top-practice-months">
        ${practiceItems
          .map(
            (item) => `
              <span class="practice-month-group${item.isCurrent ? " is-current" : ""}">
                <span class="practice-month-label">${item.month ? `${window.ABCPRAISE_PRACTICE.monthName(item.month)} ` : ""}${item.label}</span>
                ${Object.entries(item.services)
                  .map(
                    ([service, time]) => `
                      <span class="practice-time-chip">
                        <span>${service}</span>
                        <strong>${time}</strong>
                      </span>
                    `
                  )
                  .join("")}
              </span>
            `
          )
          .join("")}
      </span>
    `;
  }
  els.sundayNote.textContent = state.practice.sunday;
  renderServiceTimes();
}

function populateAdminOptions() {
  els.songSelect.innerHTML = state.songs
    .map((song) => `<option value="${song.id}">${song.title}</option>`)
    .join("");
}

function syncAdminFields() {
  if (!els.adminForm || els.adminForm.hidden) return;
  const song = selectedSong();
  els.songSelect.value = song.id;
  els.songTitleInput.value = song.title;
  els.songSubtitleInput.value = song.subtitle;
  els.notesInput.disabled = song.allowNotes === false;
  els.notesInput.placeholder = song.allowNotes === false ? "이 곡은 악보 PDF만 사용합니다." : "";
  els.notesInput.value = song.allowNotes === false ? "" : song.notes;
  els.pdfInput.value = "";
  if (els.uploadPreview) els.uploadPreview.textContent = "선택된 새 PDF가 없습니다.";
  els.slotOne.value = state.practice.slotOne;
  els.slotTwo.value = state.practice.slotTwo;
  els.slotThree.value = state.practice.slotThree;
  els.sundayInput.value = state.practice.sunday;
}

function setAdminPanel(panelName) {
  els.adminTabs.forEach((tab) => {
    const active = tab.dataset.adminTab === panelName;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
  });
  els.adminPanels.forEach((panel) => {
    const active = panel.dataset.adminPanel === panelName;
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
  });
}

function showMessage(element, message) {
  if (!element) return;
  element.textContent = message;
  window.setTimeout(() => {
    if (element.textContent === message) element.textContent = "";
  }, 7000);
}

function openDrawer() {
  els.drawerBackdrop.hidden = false;
  els.adminDrawer.classList.add("is-open");
  els.adminDrawer.setAttribute("aria-hidden", "false");
  if (unlocked) {
    syncAdminFields();
  } else {
    window.setTimeout(() => els.adminCode.focus(), 60);
  }
}

function closeDrawer() {
  els.adminDrawer.classList.remove("is-open");
  els.adminDrawer.setAttribute("aria-hidden", "true");
  window.setTimeout(() => {
    if (!els.adminDrawer.classList.contains("is-open")) {
      els.drawerBackdrop.hidden = true;
    }
  }, 230);
}

function unlockAdmin() {
  unlocked = true;
  els.adminLock.hidden = true;
  els.adminForm.hidden = false;
  populateAdminOptions();
  syncAdminFields();
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

els.songTabs.forEach((button) => {
  button.addEventListener("click", () => {
    state.selectedSongId = button.dataset.song;
    saveState();
    renderSong();
  });
});

els.adminOpen.addEventListener("click", openDrawer);
els.adminClose.addEventListener("click", closeDrawer);
els.drawerBackdrop.addEventListener("click", closeDrawer);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDrawer();
});

if (els.prevServiceDate) {
  els.prevServiceDate.addEventListener("click", () => shiftServiceDate(-1));
}

if (els.nextServiceDate) {
  els.nextServiceDate.addEventListener("click", () => shiftServiceDate(1));
}

els.adminLock.addEventListener("submit", (event) => {
  event.preventDefault();
  if (els.adminCode.value.trim() === ADMIN_CODE) {
    els.lockMessage.textContent = "";
    unlockAdmin();
  } else {
    els.lockMessage.textContent = "코드가 맞지 않습니다.";
  }
});

els.songSelect.addEventListener("change", () => {
  state.selectedSongId = els.songSelect.value;
  saveState();
  renderSong();
});

els.adminTabs.forEach((tab) => {
  tab.addEventListener("click", () => setAdminPanel(tab.dataset.adminTab));
});

els.pdfInput.addEventListener("change", () => {
  const file = els.pdfInput.files[0];
  if (!els.uploadPreview) return;
  els.uploadPreview.textContent = file
    ? `새 PDF 선택됨: ${file.name}`
    : "선택된 새 PDF가 없습니다.";
});

els.saveSong.addEventListener("click", async () => {
  const song = selectedSong();
  song.title = els.songTitleInput.value.trim() || song.title;
  song.subtitle = els.songSubtitleInput.value.trim() || song.subtitle;
  song.notes = song.allowNotes === false ? "" : els.notesInput.value.trim();

  const file = els.pdfInput.files[0];
  if (file) {
    if (file.type !== "application/pdf") {
      alert("PDF 파일만 업로드해 주세요.");
      return;
    }
    song.pdfName = file.name;
    song.pdfData = await fileToDataUrl(file);
  }

  saveState();
  populateAdminOptions();
  renderSong();
  showMessage(els.songSaveMessage, "찬양 PDF 정보가 저장되었습니다.");
});

els.clearPdf.addEventListener("click", () => {
  const song = selectedSong();
  song.pdfName = "";
  song.pdfData = "";
  saveState();
  renderSong();
  showMessage(els.songSaveMessage, "업로드된 PDF가 지워졌습니다.");
});

els.savePractice.addEventListener("click", () => {
  state.practice.slotOne = els.slotOne.value.trim() || defaultState.practice.slotOne;
  state.practice.slotTwo = els.slotTwo.value.trim() || defaultState.practice.slotTwo;
  state.practice.slotThree = els.slotThree.value.trim() || defaultState.practice.slotThree;
  state.practice.sunday = els.sundayInput.value.trim() || defaultState.practice.sunday;
  saveState();
  renderPractice();
  showMessage(els.practiceSaveMessage, "연습 시간이 저장되었습니다.");
});

els.resetContent.addEventListener("click", () => {
  if (!confirm("이 브라우저의 사이트 내용을 초기화할까요?")) return;
  state = structuredClone(defaultState);
  selectedServiceDate = new Date(initialServiceDate);
  saveState();
  populateAdminOptions();
  renderSong();
  renderServiceDate();
  renderPractice();
});

renderRoles();
renderQuickResources();
renderServiceDate();
renderPractice();
populateAdminOptions();
renderSong();
