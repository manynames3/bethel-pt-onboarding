const STORAGE_KEY = "abcpraise.site.ko.v1";
const ADMIN_CODE = "bethel";
const legacyCombinedSongIds = ["greeting", "offering"];
const legacyOfferingSubtitle = ["헌금송", "축복송 자료"].join(" · ");
const legacyOfferingTitles = ["인사 찬양", "헌금 찬양", "헌금 찬양 & 인사찬양"];
const legacySpecialTitles = ["특별 순서 찬양", "축복/환영 찬양"];
const legacySpecialSubtitles = ["결혼 · 축복 · 환영 순서"];
const sundayServices = [
  { service: "1부", practice: "오전 7:15" },
  { service: "2부", practice: "오전 9:00" },
  { service: "3부", practice: "오전 11:00" }
];
const mobileQuickResources = [
  {
    href: "#onboarding",
    mobile: "온보딩",
    mobileOrder: 1
  },
  {
    href: "#songbook",
    mobile: "음원 & 악보",
    mobileOrder: 2
  },
  {
    href: "#practice",
    mobile: "연습시간",
    mobileOrder: 3
  }
];
const roleDisplayOrder = [
  "main-keys",
  "second-keys",
  "acoustic-guitar",
  "electric-guitar",
  "bass",
  "drums",
  "singers",
  "aviom"
];

const defaultState = {
  selectedSongId: "offeringGreeting",
  songs: [
    {
      id: "offeringGreeting",
      title: "헌금송 & 축복송",
      subtitle: "",
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
      title: "아기 환영송",
      subtitle: "",
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
    sunday: ""
  }
};

const roleGuides = window.ABCPRAISE_ROLES || [];

let state = loadState();
let unlocked = false;
const selectedResourceBySongId = {};

const els = {
  songTabs: [...document.querySelectorAll(".song-tab")],
  currentSongTitle: document.querySelector("#currentSongTitle"),
  pdfFrame: document.querySelector("#pdfFrame"),
  songResources: document.querySelector("#songResources"),
  mobileQuickActions: document.querySelector("#mobileQuickActions"),
  topPracticeTimes: document.querySelector("#topPracticeTimes"),
  sidebarServiceTimes: document.querySelector("#sidebarServiceTimes"),
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
    practice.sunday = defaultState.practice.sunday;

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
        if (song.id === "offeringGreeting" && legacyOfferingTitles.includes(storedSong.title)) {
          merged.title = song.title;
        }
        if (
          song.id === "offeringGreeting" &&
          ["예배 시작 환영", "헌금 순서", legacyOfferingSubtitle].includes(storedSong.subtitle)
        ) {
          merged.subtitle = song.subtitle;
        }
        if (song.id === "special" && legacySpecialTitles.includes(storedSong.title)) {
          merged.title = song.title;
        }
        if (song.id === "special" && legacySpecialSubtitles.includes(storedSong.subtitle)) {
          merged.subtitle = song.subtitle;
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

function selectedSong() {
  return state.songs.find((song) => song.id === state.selectedSongId) || state.songs[0];
}

function selectedResourceIndex(song) {
  const resources = song.resources || [];
  const index = selectedResourceBySongId[song.id] || 0;
  return resources[index] ? index : 0;
}

function selectedResource(song) {
  return (song.resources || [])[selectedResourceIndex(song)];
}

function renderSongTabs() {
  els.songTabs.forEach((button) => {
    const song = state.songs.find((item) => item.id === button.dataset.song);
    if (!song) return;
    button.classList.toggle("is-active", song.id === state.selectedSongId);
    button.setAttribute("aria-pressed", song.id === state.selectedSongId ? "true" : "false");
    const title = button.querySelector("[data-song-title]");
    if (title) title.textContent = song.title;
  });
}

function renderSong() {
  const song = selectedSong();
  els.currentSongTitle.textContent = song.title;
  const activeResource = selectedResource(song);

  if (song.pdfData) {
    els.pdfFrame.innerHTML = "";
    const iframe = document.createElement("iframe");
    iframe.title = `${song.title} 악보 PDF`;
    iframe.src = song.pdfData;
    els.pdfFrame.append(iframe);
  } else if (activeResource) {
    renderResourcePreview(activeResource, song);
  } else {
    els.pdfFrame.innerHTML = `
      <div class="empty-pdf">
        <div class="empty-sheet" aria-hidden="true">
          <div class="empty-sheet-head">
            <strong>${song.title}</strong>
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
  const activeIndex = selectedResourceIndex(song);
  if (!resources.length) {
    els.songResources.hidden = true;
    els.songResources.innerHTML = "";
    return;
  }

  els.songResources.hidden = false;
  els.songResources.innerHTML = `
    <div class="song-resource-list">
      ${resources
        .map(
          (resource, index) => `
            <button class="song-resource-card ${index === activeIndex ? "is-active" : ""}" type="button" data-resource-index="${index}">
              <span class="song-resource-type">${resource.type}</span>
              <span class="song-resource-copy">
                <strong>${resource.label} ${resource.title}</strong>
                <span>${resource.description}</span>
              </span>
              <span class="song-resource-action">보기</span>
            </button>
          `
        )
        .join("")}
    </div>
  `;

  els.songResources.querySelectorAll("[data-resource-index]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedResourceBySongId[song.id] = Number(button.dataset.resourceIndex) || 0;
      renderSong();
    });
  });
}

function renderMobileQuickActions() {
  if (els.mobileQuickActions) {
    els.mobileQuickActions.innerHTML = mobileQuickResources
      .filter((resource) => resource.mobile)
      .sort((a, b) => a.mobileOrder - b.mobileOrder)
      .map((resource) => `<a href="${resource.href}">${resource.mobile}</a>`)
      .join("");
  }
}

function setupNavigationState() {
  const navLinks = [...document.querySelectorAll(".vfc-nav a, .mobile-quick-actions a")];
  if (!navLinks.length) return;

  const normalizeHash = () => {
    if (window.location.hash === "#score-viewer") return "#songbook";
    return window.location.hash || "#onboarding";
  };

  const syncActive = () => {
    const activeHash = normalizeHash();
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === activeHash);
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.remove("is-active"));
      link.classList.add("is-active");
    });
  });

  window.addEventListener("hashchange", syncActive);
  syncActive();
}

function renderRoles() {
  const roles = [...(window.ABCPRAISE_ROLES || roleGuides)].sort((a, b) => {
    const aIndex = roleDisplayOrder.indexOf(a.slug);
    const bIndex = roleDisplayOrder.indexOf(b.slug);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });
  els.roleGrid.innerHTML = roles
    .map(
      (role, index) => `
        <a class="role-row ${index === 0 ? "is-active" : ""}" href="onboarding/${role.slug || ""}.html" aria-label="${role.tag} 온보딩 페이지 열기">
          <span class="role-icon" aria-hidden="true">${roleIcon(role)}</span>
          <span class="role-copy">
            <strong>${role.tag}</strong>
          </span>
          <span class="chev" aria-hidden="true">›</span>
        </a>
      `
    )
    .join("");
}

function iconSvg(paths) {
  return `<svg viewBox="0 0 24 24" focusable="false">${paths}</svg>`;
}

function roleIcon(role) {
  if (role.slug === "main-keys") {
    return iconSvg(`
      <path d="M6 4h10a3 3 0 0 1 3 3v11H5V5a1 1 0 0 1 1-1z"></path>
      <path d="M8 18v2"></path>
      <path d="M16 18v2"></path>
      <path d="M7 10h10"></path>
      <path d="M7 13h10"></path>
      <path d="M9 13v5"></path>
      <path d="M12 13v5"></path>
      <path d="M15 13v5"></path>
    `);
  }
  if (role.slug === "second-keys") {
    return iconSvg(`
      <rect x="3" y="6" width="18" height="12" rx="2"></rect>
      <path d="M5 13h14"></path>
      <path d="M7 13v5"></path>
      <path d="M10 13v5"></path>
      <path d="M13 13v5"></path>
      <path d="M16 13v5"></path>
      <circle cx="7" cy="9.5" r=".8" fill="currentColor"></circle>
      <circle cx="10" cy="9.5" r=".8" fill="currentColor"></circle>
      <path d="M14 9.5h4"></path>
    `);
  }
  if (role.slug === "acoustic-guitar") {
    return iconSvg(`
      <path d="M13 10.8l5.8-5.8"></path>
      <path d="M17.5 4.2l2.3 2.3"></path>
      <path d="M16.5 5.2l2.3 2.3"></path>
      <path d="M8.6 10.9c-1.4-.8-3.2-.3-4.2 1.2-1.4 2.1-.7 5 1.5 6.5 1.5 1 3.3.9 4.6-.2 1.3 1.1 3.1 1.2 4.6.2 2.2-1.5 2.9-4.4 1.5-6.5-1-1.5-2.8-2-4.2-1.2-.7.4-1.2.9-1.4 1.5-.5-.6-1-1.1-1.9-1.5z"></path>
      <circle cx="10.5" cy="15.2" r="1.4"></circle>
    `);
  }
  if (role.slug === "electric-guitar") {
    return iconSvg(`
      <path d="M9.4 13.6l6.7-6.7"></path>
      <path d="M16.1 6.9l2.9-2.9 1 1-2.9 2.9"></path>
      <path d="M8.7 13.1l-3.5-.9 1.2 2.8-2.3 1.9 3.3.6.9 3.2 2.1-2.6 3.1.7-.8-3.2 2.6-2.1-3.5-.7-1.2-2.9-1.9 3.2z"></path>
      <path d="M8.8 15.2l2.1 2.1"></path>
    `);
  }
  if (role.slug === "bass") {
    return iconSvg(`
      <path d="M10.4 14.2l7.4-7.4"></path>
      <path d="M17.8 6.8l2.6-2.6"></path>
      <path d="M18.2 4.6l1.8 1.8"></path>
      <path d="M7.3 12.7c-1.7-.1-3.1 1-3.5 2.7-.5 2.4 1.3 4.7 4 4.9 2.3.2 4.2-1.1 4.5-3.1.1-.7 0-1.3-.3-1.9.8.2 1.6 0 2.1-.6.8-.8.8-2.1 0-2.9s-2.1-.8-2.9 0c-.5.5-.7 1.3-.6 2-.8-.7-1.9-1.1-3.3-1.1z"></path>
      <circle cx="8.3" cy="16.8" r="1.3"></circle>
      <path d="M13.3 11.3l3.4 3.4"></path>
    `);
  }
  if (role.slug === "drums") {
    return iconSvg(`
      <ellipse cx="9" cy="14" rx="5" ry="3"></ellipse>
      <ellipse cx="16" cy="11" rx="4" ry="2.5"></ellipse>
      <path d="M4 14v3c0 1.7 2.2 3 5 3s5-1.3 5-3v-3"></path>
      <path d="M12 11v2.5"></path>
      <path d="M16 13.5v2"></path>
      <path d="M5 5l5 5"></path>
      <path d="M19 5l-5 5"></path>
    `);
  }
  if (role.slug === "singers") {
    return iconSvg(`
      <rect x="9" y="3" width="6" height="11" rx="3"></rect>
      <path d="M5 11a7 7 0 0 0 14 0"></path>
      <path d="M12 18v3"></path>
      <path d="M8 21h8"></path>
    `);
  }
  if (role.slug === "aviom") {
    return iconSvg(`
      <path d="M5 4v16"></path>
      <path d="M12 4v16"></path>
      <path d="M19 4v16"></path>
      <circle cx="5" cy="9" r="2"></circle>
      <circle cx="12" cy="15" r="2"></circle>
      <circle cx="19" cy="7" r="2"></circle>
    `);
  }
  return iconSvg(`
    <path d="M15 4l5 5"></path>
    <path d="M14 5l5 5"></path>
    <path d="M10 8l6 6"></path>
    <path d="M8 10l6 6"></path>
    <ellipse cx="7.5" cy="16.5" rx="4.5" ry="3.5" transform="rotate(-35 7.5 16.5)"></ellipse>
    <circle cx="7.5" cy="16.5" r="1.4"></circle>
    <path d="M11 13l7-7"></path>
  `);
}

function renderServiceTimes() {
  const markup = `
    <div class="service-time-row">
      <span class="service-time-label">매주</span>
      ${sundayServices
        .map(
          ({ service, practice }) => `
            <span class="service-time-chip">
              <span>${service}</span>
              <strong>${practice}</strong>
            </span>
          `
        )
        .join("")}
    </div>
  `;

  if (els.sidebarServiceTimes) els.sidebarServiceTimes.innerHTML = markup;
  if (els.serviceBriefTimes) {
    els.serviceBriefTimes.innerHTML = sundayServices
      .map(
        ({ service, practice }) => `
          <div class="service-time-row">
            <span class="service-time-label">${service}</span>
            <span class="service-time-chip"><span>연습</span><strong>${practice}</strong></span>
          </div>
        `
      )
      .join("");
  }
}

function renderPractice() {
  const practiceWindow = window.ABCPRAISE_PRACTICE?.getCurrentAndNext?.();
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

  if (els.saturdayTimes) {
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
  }
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
  if (els.sundayNote) els.sundayNote.textContent = state.practice.sunday;
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

if (els.adminOpen) els.adminOpen.addEventListener("click", openDrawer);
if (els.adminClose) els.adminClose.addEventListener("click", closeDrawer);
if (els.drawerBackdrop) els.drawerBackdrop.addEventListener("click", closeDrawer);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDrawer();
});

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
  showMessage(els.songSaveMessage, "악보 정보가 저장되었습니다.");
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
  state.practice.sunday = defaultState.practice.sunday;
  saveState();
  renderPractice();
  showMessage(els.practiceSaveMessage, "연습 시간이 저장되었습니다.");
});

els.resetContent.addEventListener("click", () => {
  if (!confirm("이 브라우저의 사이트 내용을 초기화할까요?")) return;
  state = structuredClone(defaultState);
  saveState();
  populateAdminOptions();
  renderSong();
  renderPractice();
});

renderRoles();
renderMobileQuickActions();
setupNavigationState();
renderPractice();
populateAdminOptions();
renderSong();
