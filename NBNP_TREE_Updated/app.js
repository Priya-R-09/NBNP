const treeCards = document.getElementById("treeCards");
const treeList = document.getElementById("treeList");
const treeSearch = document.getElementById("treeSearch");
const collectionSearch = document.getElementById("collectionSearch");
const familyFilter = document.getElementById("familyFilter");

function treeFolder(tree) {
  const safe = (tree.common || "tree")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return `${String(tree.id).padStart(2, "0")}_${safe}`;
}

function goToTree(id) {
  const tree = TREE_DATA.find(item => item.id === id);
  if (!tree) return;
  window.location.href = `trees/${treeFolder(tree)}/index.html`;
}

function makeTreeCard(tree) {
  return `
    <article class="tree-card" onclick="goToTree(${tree.id})">
      <div class="tree-number">${String(tree.id).padStart(2, "0")}</div>
      <div class="tree-card-glow"></div>
      <div class="tree-card-content">
        <span class="card-family">${tree.family}</span>
        <h3>${tree.common || "Unnamed Tree"}</h3>
        <p class="scientific">${tree.binomial}</p>
        <p class="tamil">${tree.tamil}</p>
        <div class="card-arrow">↗</div>
      </div>
    </article>
  `;
}

function renderCards() {
  const search = (collectionSearch.value || "").toLowerCase().trim();
  const family = familyFilter.value;

  const filtered = TREE_DATA.filter(tree => {
    const haystack = [
      tree.common,
      tree.binomial,
      tree.family,
      tree.tamil
    ].join(" ").toLowerCase();

    return haystack.includes(search) && (!family || tree.family === family);
  });

  treeCards.innerHTML = filtered.length
    ? filtered.map(makeTreeCard).join("")
    : `<div class="empty-state">No trees found. Try another search.</div>`;
}

function renderDirectory(filter = "") {
  const value = filter.toLowerCase().trim();

  const filtered = TREE_DATA.filter(tree => {
    const haystack = `${tree.common} ${tree.binomial} ${tree.tamil}`.toLowerCase();
    return haystack.includes(value);
  });

  treeList.innerHTML = filtered.map(tree => `
    <button class="directory-item" onclick="goToTree(${tree.id})">
      <span class="dir-no">${String(tree.id).padStart(2, "0")}</span>
      <span>
        <strong>${tree.common}</strong>
        <small>${tree.tamil}</small>
      </span>
      <span class="dir-arrow">→</span>
    </button>
  `).join("") || `<div class="empty-directory">No matching tree.</div>`;
}

function fillFamilies() {
  const families = [...new Set(TREE_DATA.map(t => t.family).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));

  familyFilter.innerHTML += families
    .map(family => `<option value="${family}">${family}</option>`)
    .join("");
}

treeSearch.addEventListener("input", e => renderDirectory(e.target.value));
collectionSearch.addEventListener("input", renderCards);
familyFilter.addEventListener("change", renderCards);

fillFamilies();
renderDirectory();
renderCards();


// Click/tap Tree Directory to open or close the searchable dropdown.
const treeMenu = document.querySelector(".tree-menu");
const treeMenuBtn = document.querySelector(".tree-menu-btn");

if (treeMenu && treeMenuBtn) {
  treeMenuBtn.setAttribute("aria-expanded", "false");

  treeMenuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = treeMenu.classList.toggle("open");
    treeMenuBtn.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      setTimeout(() => treeSearch?.focus(), 50);
    }
  });

  document.addEventListener("click", (event) => {
    if (!treeMenu.contains(event.target)) {
      treeMenu.classList.remove("open");
      treeMenuBtn.setAttribute("aria-expanded", "false");
    }
  });

  treeSearch?.addEventListener("click", (event) => event.stopPropagation());
}
