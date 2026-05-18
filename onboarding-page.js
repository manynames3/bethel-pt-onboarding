const roles = window.ABCPRAISE_ROLES || [];
const currentSlug = document.body.dataset.role;
const currentRole = roles.find((role) => role.slug === currentSlug) || roles[0];

function renderRoleNav() {
  const nav = document.querySelector("#roleNav");
  if (!nav) return;
  nav.innerHTML = roles
    .map(
      (role) => `
        <a class="${role.slug === currentRole.slug ? "is-active" : ""}" href="${role.slug}.html">
          <span>${role.tag}</span>
          <small>${role.equipment}</small>
        </a>
      `
    )
    .join("");
}

function renderList(selector, items) {
  const target = document.querySelector(selector);
  if (!target) return;
  target.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderRolePage() {
  if (!currentRole) return;

  document.title = `${currentRole.tag} | 애틀랜타 베델교회 찬양팀`;
  document.querySelector("#roleEyebrow").textContent = currentRole.tag;
  document.querySelector("#roleTitle").textContent = currentRole.title;
  document.querySelector("#roleEquipment").textContent = currentRole.equipment;
  document.querySelector("#roleSummary").textContent = currentRole.summary;

  document.querySelector("#roleFocus").innerHTML = currentRole.focus
    .map((item) => `<span>${item}</span>`)
    .join("");

  renderList("#setupList", currentRole.setup);
  renderList("#monitoringList", currentRole.monitoring);
  renderList("#checklist", currentRole.checklist);
  renderRoleNav();
}

renderRolePage();
