// heroClass.js
class heroClass {
  constructor(superName, privateName = "Unknown", Powers = "Unknown", img = "", quote = "No quote available.") {
    this.superName = superName;
    this.privateName = privateName;
    this.Powers = Powers;
    this.img = img;
    this.quote = quote;
  }

  render(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";

    // Fallback: אם התמונה לא נטענת – החלף לסמל
    const safeImg = this.img || "contents/indexphoto/logo.webp";
    col.innerHTML = `
      <div class="card h-100 bg-dark text-white border-0 shadow-sm hover-float">
        <img src="${safeImg}" alt="${this.superName}" class="card-img-top"
             loading="lazy" onerror="this.onerror=null;this.src='contents/indexphoto/logo.webp';">
        <div class="card-body">
          <h5 class="card-title mb-1">${this.superName}</h5>
          <p class="card-text small mb-1"><span class="text-secondary">Secret identity:</span> ${this.privateName}</p>
          <p class="card-text small mb-2"><span class="text-secondary">Powers:</span> ${this.Powers}</p>
          <blockquote class="blockquote-footer text-warning-emphasis mb-0">${this.quote}</blockquote>
        </div>
      </div>
    `;

    container.appendChild(col);
  }
}
