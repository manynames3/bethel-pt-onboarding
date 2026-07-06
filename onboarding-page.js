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

function assetPath(path) {
  if (!path) return "";
  return location.pathname.includes("/onboarding/") ? `../${path}` : path;
}

function renderReferenceTable(reference) {
  return `
    <table class="reference-table">
      <thead>
        <tr>${reference.columns.map((column) => `<th>${column}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${reference.rows
          .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
          .join("")}
      </tbody>
    </table>
  `;
}

function renderReferenceLinks(reference) {
  return `
    <div class="reference-links">
      ${reference.links
        .map(
          (link) => `
            <a class="reference-link-card" href="${link.href}" target="_blank" rel="noopener noreferrer">
              <strong>${link.title}</strong>
              <span>${link.description}</span>
            </a>
          `
        )
        .join("")}
    </div>
  `;
}

function renderReferences() {
  const content = document.querySelector(".role-content");
  if (!content || !currentRole.references?.length) return;

  const markup = currentRole.references
    .map(
      (reference) => {
        if (reference.links?.length) {
          return `
            <article class="detail-card reference-detail">
              <span class="practice-label">${reference.label}</span>
              <h2>${reference.title}</h2>
              <p class="reference-note">${reference.note}</p>
              ${renderReferenceLinks(reference)}
            </article>
          `;
        }

        return `
          <article class="detail-card reference-detail">
            <span class="practice-label">${reference.label}</span>
            <h2>${reference.title}</h2>
            <div class="reference-media-grid">
              <figure class="reference-photo">
                <img src="${assetPath(reference.image)}" alt="${reference.alt}" loading="lazy">
                <figcaption>${reference.note}</figcaption>
              </figure>
              <div class="reference-table-wrap">
                ${renderReferenceTable(reference)}
              </div>
            </div>
          </article>
        `;
      }
    )
    .join("");

  content.insertAdjacentHTML("afterbegin", markup);
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
  renderReferences();
  renderRoleNav();
}

renderRolePage();
