class HistoryClass {
  constructor(year, description, image, index) {
    this.year = year;
    this.description = description;
    this.image = image;
    this.index = index;
  }

  render() {
    const host = document.querySelector("#showMe");
    if (!host) return;

    // עטיפה לכל פריט
    const item = document.createElement("article");
    item.className = "timeline-item";

    // כרטיס
    const card = document.createElement("div");
    card.className = "timeline-card";

    // שנה
    const yearBadge = document.createElement("span");
    yearBadge.className = "timeline-year";
    yearBadge.textContent = this.year;

    // כותרת
    const title = document.createElement("h3");
    title.className = "title";
    title.textContent = this._titleFromYear(this.year);

    // מטא (רשות)
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = "";

    // תיאור
    const p = document.createElement("p");
    p.textContent = this.description;

    // תמונה (אם קיימת)
    if (this.image && this.image.trim() !== "") {
      const img = document.createElement("img");
      img.src = this.image;
      img.alt = this._titleFromYear(this.year);
      img.loading = "lazy";
      card.appendChild(img);
    }

    // הרכבה
    card.appendChild(yearBadge);
    card.appendChild(title);
    if (meta.textContent.trim()) card.appendChild(meta);
    card.appendChild(p);

    item.appendChild(card);
    host.appendChild(item);
  }

  _titleFromYear(y) {
    if (String(y).includes("1455") || String(y).includes("1487")) return "Wars of the Roses";
    if (String(y).includes("750")) return "Mysterious Meteor";
    if (y === "1799") return "Napoleon in the Middle East";
    if (String(y).includes("1839")) return "Opium Wars";
    if (String(y).includes("1850")) return "Victorian Era";
    if (String(y).includes("1865")) return "American Old West";
    if (y === "1948") return "War of Independence";
    if (String(y).includes("1947") || String(y).includes("1991")) return "Cold War";
    if (y === "1960s") return "Prime Children in the 1960s";
    if (y === "2020") return "Prime-Children Emerge";
    if (y === "2021") return "Interguard Established";
    if (y === "2022") return "Alien Invasion";
    if (y === "2023") return "Compass Alliance Founded";
    return String(y);
  }
}
