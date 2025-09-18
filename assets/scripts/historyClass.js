class HistoryClass {
  constructor(year, description, index) {
    this.year = year;
    this.description = description;
    this.index = index;
  }

  render() {
    const host = document.querySelector("#showMe");
    if (!host) return;

    // עטיפה לכל פריט (משמשת ל-nth-child בעיצוב)
    const item = document.createElement("article");
    item.className = "timeline-item";

    // הכרטיס עצמו
    const card = document.createElement("div");
    card.className = "timeline-card";

    // תווית שנה צפה
    const yearBadge = document.createElement("span");
    yearBadge.className = "timeline-year";
    yearBadge.textContent = this.year;

    // כותרת (רשות – אם תרצה לשים טייטל נפרד; כרגע שנה משמשת גם ככותרת)
    const title = document.createElement("h3");
    title.className = "title";
    title.textContent = this._titleFromYear(this.year); // כרגע נגזרת מהשנה (ראה פונקציה למטה)

    // מטא (רשות)
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = ""; // אפשר למלא לפי צורך (מיקום, תקופה, תגים וכו')

    // תיאור
    const p = document.createElement("p");
    p.textContent = this.description;

    // הרכבה
    card.appendChild(yearBadge);
    card.appendChild(title);
    if (meta.textContent.trim()) card.appendChild(meta);
    card.appendChild(p);

    item.appendChild(card);
    host.appendChild(item);
  }

  // מחלץ טייטל קריא מהשנה (אפשר/כדאי להחליף למיפוי מפורש)
  _titleFromYear(y) {
    // דוגמאות פשוטות — שפר כרצונך:
    if (String(y).includes("1455") || String(y).includes("1487")) return "Wars of the Roses";
    if (String(y).includes("750")) return "Mysterious Meteor";
    if (y === "1799") return "Napoleon in the Middle East";
    if (String(y).includes("1839")) return "Opium Wars";
    if (String(y).includes("1850")) return "Victorian Era";
    if (String(y).includes("1865")) return "American Old West";
    if (y === "1948") return "War of Independence";
    if (String(y).includes("1947") || String(y).includes("1991")) return "Cold War";
    if (y === "1967") return "Six-Day War";
    if (y === "2020") return "Prime-Children Emerge";
    if (y === "2021") return "Interguard Established";
    if (y === "2022") return "Alien Invasion";
    if (y === "2023") return "Compass Alliance Founded";
    return String(y);
  }
}
