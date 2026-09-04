const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const tree = TREE_DATA.find(item => item.id === id);
const page = document.getElementById("treePage");

function listHTML(items, emptyText) {
  if (!items || !items.length) {
    return `<p class="muted">${emptyText}</p>`;
  }
  return `<ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>`;
}

if (!tree) {
  page.innerHTML = `
    <section class="not-found">
      <div class="section-label">TREE NOT FOUND</div>
      <h1>We couldn't find that tree.</h1>
      <a class="primary-btn" href="index.html#collection">Back to Collection →</a>
    </section>
  `;
} else {
  document.title = `NBNP TREE | ${tree.common}`;

  page.innerHTML = `
    <section class="tree-hero">
      <div class="detail-overlay"></div>
      <div class="detail-hero-content">
        <div class="back-link"><a href="index.html#collection">← Back to collection</a></div>
        <div class="detail-number">${String(tree.id).padStart(2, "0")}</div>
        <div class="section-label">NBNP TREE / SPECIES PROFILE</div>
        <h1>${tree.common}</h1>
        <p class="detail-tamil">${tree.tamil}</p>
        <p class="detail-scientific">${tree.binomial}</p>
      </div>
    </section>

    <section class="profile section">
      <div class="profile-grid">
        <aside class="profile-side">
          <span class="side-label">BOTANICAL IDENTITY</span>
          <div class="identity-item">
            <small>Botanical Name</small>
            <strong>${tree.binomial}</strong>
          </div>
          <div class="identity-item">
            <small>Family</small>
            <strong>${tree.family}</strong>
          </div>
          <div class="identity-item">
            <small>Common Name</small>
            <strong>${tree.common}</strong>
          </div>
          <div class="identity-item">
            <small>Tamil Name</small>
            <strong class="tamil">${tree.tamil}</strong>
          </div>
        </aside>

        <div class="profile-main">
          <div class="season-grid">
            <div class="season-card">
              <span>01</span>
              <small>Flowering Season</small>
              <strong>${tree.flowering || "Not specified"}</strong>
            </div>
            <div class="season-card">
              <span>02</span>
              <small>Fruiting Season</small>
              <strong>${tree.fruiting || "Not specified"}</strong>
            </div>
            <div class="season-card">
              <span>03</span>
              <small>Medicinal Value</small>
              <strong>${tree.medicinalValue || "Not specified"}</strong>
            </div>
          </div>

          <div class="info-block">
            <div class="info-heading">
              <span>02</span>
              <h2>English Information</h2>
            </div>
            ${listHTML(tree.english, "No English information was provided in the source document.")}
          </div>

          <div class="info-block tamil-block">
            <div class="info-heading">
              <span>03</span>
              <h2>தமிழ் தகவல்கள்</h2>
            </div>
            ${listHTML(tree.tamilInfo, "மூல ஆவணத்தில் தமிழ் தகவல் வழங்கப்படவில்லை.")}
          </div>
        </div>
      </div>
    </section>

    <section class="tree-navigation">
      <div>
        <span class="section-label">CONTINUE EXPLORING</span>
        <h2>Explore another tree.</h2>
      </div>
      <a class="primary-btn" href="index.html#collection">Open Tree Collection →</a>
    </section>
  `;
}
