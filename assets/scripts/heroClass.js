// heroClass.js
class heroClass {
  constructor(superName, privateName = "Unknown", Powers = "Unknown", img = "", quote = "No quote available.", category = "", allies = [], enemies = [], stats = null) {
    this.superName = superName;
    this.privateName = privateName;
    this.Powers = Powers;
    this.img = img;
    this.quote = quote;
    this.category = category;
    this.allies = allies;
    this.enemies = enemies;
    this.stats = stats;
    heroClass._ensureModal();
  }

  // Category → colour mapping
  static categoryColor(cat) {
    const map = {
      Combat:    "#ef4444", Physical:  "#f97316", Cosmic:    "#a855f7",
      Energy:    "#facc15", Radiation: "#84cc16", Water:     "#38bdf8",
      Magic:     "#ec4899", Shadow:    "#6366f1", Sonic:     "#14b8a6",
      Tech:      "#60a5fa", Air:       "#94a3b8", Light:     "#fde68a",
      Quantum:   "#c084fc"
    };
    return map[cat] || "#ffb703";
  }

  // Inject the shared modal + Chart.js once
  static _ensureModal() {
    if (document.getElementById("heroDetailModal")) return;

    // Chart.js
    if (!document.getElementById("chartjs-cdn")) {
      const s = document.createElement("script");
      s.id  = "chartjs-cdn";
      s.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js";
      document.head.appendChild(s);
    }

    const tpl = document.createElement("div");
    tpl.innerHTML = `
<div class="modal fade" id="heroDetailModal" tabindex="-1" aria-labelledby="heroDetailModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content bg-dark text-white border border-secondary rounded-4">
      <div class="modal-header border-secondary">
        <h5 class="modal-title fw-bold fs-4" id="heroDetailModalLabel"></h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-4">
        <div class="row g-4">
          <div class="col-md-5 text-center">
            <img id="hdm-img" src="" alt="" class="img-fluid rounded-3 shadow-lg mb-3" style="max-height:260px;object-fit:contain;">
            <p class="text-secondary small mb-1" id="hdm-id"></p>
            <p class="small" id="hdm-powers"></p>
            <blockquote class="blockquote-footer text-warning-emphasis mt-2" id="hdm-quote"></blockquote>
            <span id="hdm-category" class="badge rounded-pill mt-2" style="font-size:.8rem;"></span>
          </div>
          <div class="col-md-7">
            <h6 class="text-warning mb-2">Power Stats</h6>
            <div style="max-width:280px;margin:0 auto 1rem;">
              <canvas id="heroRadarChart"></canvas>
            </div>
            <div class="row g-2" id="hdm-relations">
              <div class="col-6" id="hdm-allies-col">
                <h6 class="text-success small mb-1"><i class="bi bi-shield-check me-1"></i>Allies</h6>
                <ul id="hdm-allies" class="list-unstyled mb-0 small"></ul>
              </div>
              <div class="col-6" id="hdm-enemies-col">
                <h6 class="text-danger small mb-1"><i class="bi bi-lightning-charge me-1"></i>Enemies</h6>
                <ul id="hdm-enemies" class="list-unstyled mb-0 small"></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
    document.body.appendChild(tpl.firstElementChild);

    // Destroy chart on close so it can be recreated
    document.getElementById("heroDetailModal").addEventListener("hidden.bs.modal", () => {
      if (heroClass._radarChart) {
        heroClass._radarChart.destroy();
        heroClass._radarChart = null;
      }
    });
  }

  static _radarChart = null;

  _openModal() {
    const modal = document.getElementById("heroDetailModal");
    if (!modal) return;

    // Populate text fields
    modal.querySelector("#heroDetailModalLabel").textContent = this.superName;
    const imgEl = modal.querySelector("#hdm-img");
    const safeImg = this.img || "contents/indexphoto/logo.webp";
    imgEl.src = safeImg;
    imgEl.alt = this.superName;
    modal.querySelector("#hdm-id").textContent = `Secret identity: ${this.privateName}`;
    modal.querySelector("#hdm-powers").innerHTML = `<span class="text-secondary">Powers:</span> ${this.Powers}`;
    modal.querySelector("#hdm-quote").textContent = this.quote;

    const catEl = modal.querySelector("#hdm-category");
    const catColor = heroClass.categoryColor(this.category);
    catEl.textContent = this.category || "Unknown";
    catEl.style.background = catColor;
    catEl.style.color = "#111";

    // Allies
    const alliesList = modal.querySelector("#hdm-allies");
    alliesList.innerHTML = (this.allies || []).length
      ? (this.allies).map(a => `<li><a href="character.html?name=${encodeURIComponent(a.toLowerCase().replace(/\s+/g,'-'))}" class="text-info text-decoration-none">${a}</a></li>`).join("")
      : `<li class="text-secondary">—</li>`;

    // Enemies
    const enemiesList = modal.querySelector("#hdm-enemies");
    enemiesList.innerHTML = (this.enemies || []).length
      ? (this.enemies).map(e => `<li class="text-danger">${e}</li>`).join("")
      : `<li class="text-secondary">—</li>`;

    // Radar chart
    const canvasEl = modal.querySelector("#heroRadarChart");
    const stats = this.stats || { strength: 5, speed: 5, intelligence: 5, energy: 5, defense: 5 };
    const labels = ["Strength", "Speed", "Intelligence", "Energy", "Defense"];
    const data   = [stats.strength, stats.speed, stats.intelligence, stats.energy, stats.defense];

    const renderChart = () => {
      if (heroClass._radarChart) {
        heroClass._radarChart.destroy();
        heroClass._radarChart = null;
      }
      heroClass._radarChart = new Chart(canvasEl, {
        type: "radar",
        data: {
          labels,
          datasets: [{
            label: this.superName,
            data,
            backgroundColor: catColor + "33",
            borderColor:     catColor,
            pointBackgroundColor: catColor,
            borderWidth: 2,
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            r: {
              min: 0, max: 10,
              ticks:    { display: false, stepSize: 2 },
              grid:     { color: "rgba(255,255,255,0.12)" },
              pointLabels: { color: "#e2e8f0", font: { size: 11, weight: "600" } }
            }
          }
        }
      });
    };

    if (typeof Chart !== "undefined") {
      renderChart();
    } else {
      // Chart.js not loaded yet – wait for it
      const script = document.getElementById("chartjs-cdn");
      script.addEventListener("load", renderChart, { once: true });
    }

    const bsModal = bootstrap.Modal.getOrCreateInstance(modal);
    bsModal.show();
  }

  render(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";

    const safeImg   = this.img || "contents/indexphoto/logo.webp";
    const catColor  = heroClass.categoryColor(this.category);
    const catLabel  = this.category || "";
    const slug      = this.superName.toLowerCase().replace(/\s+/g, '-');

    col.innerHTML = `
      <div class="card h-100 bg-dark text-white border-0 shadow-sm hover-float hero-card" role="button" tabindex="0"
           style="cursor:pointer;border-top:3px solid ${catColor} !important;">
        <img src="${safeImg}" alt="${this.superName}" class="card-img-top"
             loading="lazy" onerror="this.onerror=null;this.src='contents/indexphoto/logo.webp';">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title mb-1">${this.superName}</h5>
          <p class="card-text small mb-1"><span class="text-secondary">Identity:</span> ${this.privateName}</p>
          <p class="card-text small mb-2"><span class="text-secondary">Powers:</span> ${this.Powers}</p>
          ${catLabel ? `<span class="badge rounded-pill mb-2" style="background:${catColor};color:#111;font-size:.72rem;">${catLabel}</span>` : ""}
          <blockquote class="blockquote-footer text-warning-emphasis mb-2 mt-auto">${this.quote}</blockquote>
          <div class="d-flex gap-1">
            <button class="btn btn-sm btn-outline-warning flex-grow-1 view-details-btn">
              <i class="bi bi-bar-chart-line me-1"></i>Stats
            </button>
            <a href="character.html?name=${encodeURIComponent(slug)}" class="btn btn-sm btn-warning flex-grow-1">
              <i class="bi bi-person-badge me-1"></i>Profile
            </a>
          </div>
        </div>
      </div>
    `;

    const card = col.querySelector(".hero-card");
    const btn  = col.querySelector(".view-details-btn");
    const open = (e) => {
      e.stopPropagation();
      this._openModal();
    };
    btn.addEventListener("click", open);
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") open(e); });

    container.appendChild(col);
  }
}
