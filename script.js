const STORAGE_KEY = "abcpraise.site.ko.v1";
const ADMIN_CODE = "bethel";

const defaultState = {
  selectedSongId: "greeting",
  songs: [
    {
      id: "greeting",
      title: "인사 찬양",
      subtitle: "예배 시작 환영",
      pdfName: "",
      pdfData: "",
      notes:
        "따뜻하고 단정하게 시작합니다. 예배 인도자의 환영 멘트가 끝날 때까지 인트로는 복잡하지 않게 유지합니다.\n\n어쿠스틱이 박자를 잡고, 베이스는 첫 구절 이후 들어옵니다. 싱어들은 멘트가 잘 들리도록 공간을 남겨 주세요."
    },
    {
      id: "baby",
      title: "아기 환영 찬양",
      subtitle: "가정 환영 순서",
      pdfName: "",
      pdfData: "",
      notes:
        "가정 소개가 진행되는 동안 부드럽게 연주합니다. 이름 소개와 기도가 또렷하게 들리도록 다이내믹을 낮게 유지합니다.\n\n건반이나 어쿠스틱은 가볍게 패드처럼 받쳐 주세요. 드럼은 요청이 없으면 쉬거나 아주 작게 연주합니다."
    },
    {
      id: "offering",
      title: "헌금 찬양",
      subtitle: "헌금 순서",
      pdfName: "",
      pdfData: "",
      notes:
        "헌금 큐가 나오면 바로 시작합니다. 헌금위원들이 움직이는 동안 템포를 안정적으로 유지합니다.\n\n일렉은 가벼운 스웰로 공간을 채울 수 있습니다. 사회자가 다음 순서로 넘어가기 쉽도록 마지막은 분명한 다운비트나 홀드 코드로 마무리합니다."
    }
  ],
  practice: {
    slotOne: "이번 주 토요일 시간은 코디네이터가 공지합니다",
    slotTwo: "이번 주 토요일 시간은 코디네이터가 공지합니다",
    slotThree: "이번 주 토요일 시간은 코디네이터가 공지합니다",
    sunday:
      "라인 체크, Aviom 믹스, 튜닝, 전체 합주를 위해 예배 40분 전에 준비된 상태로 도착해 주세요."
  }
};

const roleGuides = window.ABCPRAISE_ROLES || [];

let state = loadState();
let unlocked = false;

const els = {
  songTabs: [...document.querySelectorAll(".song-tab")],
  currentSongTitle: document.querySelector("#currentSongTitle"),
  pdfName: document.querySelector("#pdfName"),
  pdfFrame: document.querySelector("#pdfFrame"),
  songNotes: document.querySelector("#songNotes"),
  songStatus: document.querySelector("#songStatus"),
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
  saveSong: document.querySelector("#saveSong"),
  clearPdf: document.querySelector("#clearPdf"),
  slotOne: document.querySelector("#slotOne"),
  slotTwo: document.querySelector("#slotTwo"),
  slotThree: document.querySelector("#slotThree"),
  sundayInput: document.querySelector("#sundayInput"),
  savePractice: document.querySelector("#savePractice"),
  resetContent: document.querySelector("#resetContent")
};

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored || !Array.isArray(stored.songs)) return structuredClone(defaultState);
    return {
      ...structuredClone(defaultState),
      ...stored,
      songs: defaultState.songs.map((song) => ({
        ...song,
        ...(stored.songs.find((item) => item.id === song.id) || {})
      })),
      practice: {
        ...defaultState.practice,
        ...(stored.practice || {})
      }
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

function renderSongTabs() {
  els.songTabs.forEach((button) => {
    const song = state.songs.find((item) => item.id === button.dataset.song);
    if (!song) return;
    button.classList.toggle("is-active", song.id === state.selectedSongId);
    button.querySelector("span").textContent = song.title;
    button.querySelector("small").textContent = song.subtitle;
  });
}

function renderSong() {
  const song = selectedSong();
  els.currentSongTitle.textContent = song.title;
  els.songNotes.textContent = song.notes || "아직 메모가 없습니다.";
  els.pdfName.textContent = song.pdfName || "PDF 없음";
  els.songStatus.textContent = song.subtitle;

  if (song.pdfData) {
    els.pdfFrame.innerHTML = "";
    const iframe = document.createElement("iframe");
    iframe.title = `${song.title} 악보 PDF`;
    iframe.src = song.pdfData;
    els.pdfFrame.append(iframe);
  } else {
    els.pdfFrame.innerHTML = `
      <div class="empty-pdf">
        <span class="staff-lines" aria-hidden="true"></span>
        <strong>아직 PDF가 없습니다</strong>
        <p>관리자에서 이 곡의 악보를 업로드하세요.</p>
      </div>
    `;
  }

  renderSongTabs();
  syncAdminFields();
}

function renderRoles() {
  const roles = window.ABCPRAISE_ROLES || roleGuides;
  els.roleGrid.innerHTML = roles
    .map(
      (role) => `
        <a class="role-card" href="onboarding/${role.slug || ""}.html" aria-label="${role.tag} 온보딩 페이지 열기">
          <span class="role-tag">${role.tag}</span>
          <h3>${role.equipment || role.title}</h3>
          <p>${role.summary || ""}</p>
          <div class="role-focus">
            ${(role.focus || []).map((item) => `<span>${item}</span>`).join("")}
          </div>
          <strong class="role-link">자세히 보기</strong>
        </a>
      `
    )
    .join("");
}

function renderPractice() {
  const rows = [
    ["1부 섬김자", state.practice.slotOne],
    ["2부 섬김자", state.practice.slotTwo],
    ["3부 섬김자", state.practice.slotThree]
  ];

  els.saturdayTimes.innerHTML = rows
    .map(
      ([label, time]) => `
        <div class="rotation-row">
          <strong>${label}</strong>
          <span>${time}</span>
        </div>
      `
    )
    .join("");
  els.sundayNote.textContent = state.practice.sunday;
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
  els.notesInput.value = song.notes;
  els.pdfInput.value = "";
  els.slotOne.value = state.practice.slotOne;
  els.slotTwo.value = state.practice.slotTwo;
  els.slotThree.value = state.practice.slotThree;
  els.sundayInput.value = state.practice.sunday;
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

els.saveSong.addEventListener("click", async () => {
  const song = selectedSong();
  song.title = els.songTitleInput.value.trim() || song.title;
  song.subtitle = els.songSubtitleInput.value.trim() || song.subtitle;
  song.notes = els.notesInput.value.trim();

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
});

els.clearPdf.addEventListener("click", () => {
  const song = selectedSong();
  song.pdfName = "";
  song.pdfData = "";
  saveState();
  renderSong();
});

els.savePractice.addEventListener("click", () => {
  state.practice.slotOne = els.slotOne.value.trim() || defaultState.practice.slotOne;
  state.practice.slotTwo = els.slotTwo.value.trim() || defaultState.practice.slotTwo;
  state.practice.slotThree = els.slotThree.value.trim() || defaultState.practice.slotThree;
  state.practice.sunday = els.sundayInput.value.trim() || defaultState.practice.sunday;
  saveState();
  renderPractice();
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
renderPractice();
populateAdminOptions();
renderSong();
