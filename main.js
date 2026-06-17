// ---------- Active nav link ----------
document.addEventListener("DOMContentLoaded", () => {
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href && href.endsWith(here)) a.classList.add("active");
  });
});

// ---------- Reusable SVG sketches ----------
const SKETCHES = {
  anchor: `<g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><circle cx="32" cy="10" r="4"/><path d="M32 14 V46"/><path d="M24 22 H40"/><path d="M16 40 Q32 56 48 40"/><path d="M16 40 L12 36 M48 40 L52 36"/></g>`,
  skull: `<g fill="none" stroke="currentColor" stroke-width="1.2"><path d="M16 28 Q16 12 32 12 Q48 12 48 28 V36 H40 L36 44 H28 L24 36 H16 Z"/><circle cx="24" cy="26" r="3" fill="currentColor"/><circle cx="40" cy="26" r="3" fill="currentColor"/><path d="M30 32 L32 36 L34 32"/></g>`,
  feather: `<g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M48 8 Q20 20 16 52"/><path d="M44 14 Q34 14 30 22"/><path d="M40 22 Q28 24 24 32"/><path d="M34 32 Q24 34 20 42"/></g>`,
  key: `<g fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="16" cy="32" r="8"/><path d="M24 32 H54"/><path d="M44 32 V40 M50 32 V40"/></g>`,
  heart: `<g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M32 50 C 10 36 12 16 24 16 C 30 16 32 20 32 24 C 32 20 34 16 40 16 C 52 16 54 36 32 50 Z"/></g>`,
  ship: `<g fill="none" stroke="currentColor" stroke-width="1.2"><path d="M8 40 L56 40 L50 50 L14 50 Z"/><path d="M32 40 V10"/><path d="M32 14 L46 22 L32 22 Z"/><path d="M32 24 L20 34 L32 34 Z"/></g>`,
  scroll: `<g fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 16 Q12 10 18 10 H50 Q44 10 44 16 V44 Q44 50 50 50 H18 Q12 50 12 44 Z"/><path d="M44 10 Q50 10 50 16 V44"/><path d="M20 22 H36 M20 30 H36 M20 38 H30"/></g>`,
  crown: `<g fill="none" stroke="currentColor" stroke-width="1.2"><path d="M10 44 L14 18 L24 32 L32 14 L40 32 L50 18 L54 44 Z"/><path d="M10 44 H54"/><circle cx="14" cy="18" r="2" fill="currentColor"/><circle cx="32" cy="14" r="2" fill="currentColor"/><circle cx="50" cy="18" r="2" fill="currentColor"/></g>`,
};
function sketchSvg(kind) {
  return `<svg viewBox="0 0 64 64" style="width:100%;height:100%;color:var(--ink)">${SKETCHES[kind] || ""}</svg>`;
}
document.querySelectorAll("[data-sketch]").forEach((el) => {
  el.innerHTML = sketchSvg(el.getAttribute("data-sketch"));
});

// ---------- Journey map (journey.html) ----------
const PINS = [
  { id: "ceremony", label: "I", title: "The Vows", place: "Anderson Japanese Gardens", address: "318 Spring Creek Rd, Rockford, IL 61107", blurb: "Stone lanterns, koi ponds, and a quiet garden where two parties of adventurers swear their alliance.", time: "Saturday, late afternoon", mapUrl: "https://maps.google.com/?q=Anderson+Japanese+Gardens+Rockford+IL", x: 22, y: 34 },
  { id: "reception", label: "II", title: "The Feast & Revels", place: "Ethereal Confections", address: "Woodstock, IL", blurb: "A chocolatier's hall transformed into a feast: trivia, games, dancing, karaoke, and sweets fit for a fellowship. (Dry wedding — bring thirst for joy, not ale.)", time: "Saturday eve, until the candles surrender", mapUrl: "https://maps.google.com/?q=Ethereal+Confections+Woodstock+IL", x: 74, y: 64 },
];
function initJourney() {
  const stage = document.querySelector("#journey-stage");
  const info = document.querySelector("#journey-info");
  const buttons = document.querySelector("#journey-buttons");
  if (!stage || !info) return;
  let active = "ceremony";

  function renderPins() {
    stage.querySelectorAll(".pin").forEach(n => n.remove());
    PINS.forEach((p) => {
      const b = document.createElement("button");
      b.className = "pin" + (active === p.id ? " active" : "");
      b.style.left = p.x + "%";
      b.style.top = p.y + "%";
      b.setAttribute("aria-label", p.place);
      b.innerHTML = `
        <svg width="44" height="56" viewBox="0 0 44 56" style="color:var(--seal)">
          <path d="M22 2 C 10 2 2 11 2 22 C 2 36 22 54 22 54 C 22 54 42 36 42 22 C 42 11 34 2 22 2 Z" fill="currentColor" stroke="var(--ink)" stroke-width="1.5"/>
          <text x="22" y="27" text-anchor="middle" fill="var(--parchment)" font-size="14" font-family="serif" font-weight="bold">${p.label}</text>
        </svg>
        <span class="pin-label">✗ ${p.place}</span>`;
      b.addEventListener("click", () => { active = p.id; render(); });
      stage.appendChild(b);
    });
  }
  function renderInfo() {
    const p = PINS.find(x => x.id === active);
    info.innerHTML = `
      <div class="eyebrow mb-1">Stop ${p.label} of II</div>
      <h3 style="font-size:1.75rem">${p.title}</h3>
      <p class="hand" style="font-size:1.5rem;transform:rotate(-1deg);margin:.25rem 0 .75rem">${p.place}</p>
      <p class="muted italic" style="font-size:1.05rem">${p.blurb}</p>
      <dl>
        <dt>When</dt><dd>${p.time}</dd>
        <dt>Where</dt><dd>${p.address}</dd>
      </dl>
      <div class="journey-buttons">
        ${PINS.map(x => `<button class="chip${x.id===active?' active':''}" data-pin="${x.id}">${x.label} · ${x.place}</button>`).join("")}
        <a class="chip" style="background:var(--seal);color:var(--parchment);border-color:var(--seal);text-decoration:none" href="${p.mapUrl}" target="_blank" rel="noreferrer">Open in Maps ↗</a>
      </div>`;
    info.querySelectorAll("[data-pin]").forEach(btn => {
      btn.addEventListener("click", () => { active = btn.getAttribute("data-pin"); render(); });
    });
  }
  function render() { renderPins(); renderInfo(); }
  render();
}
initJourney();

// ---------- RSVP form (rsvp.html) ----------
function initRsvp() {
  const form = document.querySelector("form.rsvp");
  if (!form) return;
  const dietGrid = form.querySelector(".diet-grid");
  const errorEl = form.querySelector(".error");
  const successEl = document.querySelector("#rsvp-success");
  const diet = new Set();

  dietGrid?.querySelectorAll(".diet").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const v = btn.getAttribute("data-diet");
      if (diet.has(v)) { diet.delete(v); btn.classList.remove("on"); }
      else { diet.add(v); btn.classList.add("on"); }
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get("name") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const guests = parseInt(fd.get("guests"), 10);
    if (!name) return showError("A name is required, brave traveler.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return showError("Send us a proper raven address.");
    if (!Number.isFinite(guests) || guests < 1 || guests > 8) return showError("Party size must be between 1 and 8 souls.");
    errorEl.textContent = "";

    const submitBtn = form.querySelector("[type=submit]");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending raven…";

    const payload = {
      name,
      email,
      attending: fd.get("attending"),
      guests,
      costume: (fd.get("costume") || "").toString().trim(),
      dietary: [...diet].join(", ") || "none",
      dietaryOther: (fd.get("dietaryOther") || "").toString().trim(),
      message: (fd.get("message") || "").toString().trim(),
    };

    try {
      const res = await fetch("https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("submission failed");
      form.classList.add("hidden");
      successEl.classList.remove("hidden");
    } catch {
      showError("The raven was lost in the mist. Please try again or contact us directly.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Seal with Wax ✦ Send Raven";
    }
  });
  function showError(msg) { errorEl.textContent = msg; }
}
initRsvp();

// ---------- Calendar download ----------
function downloadIcs() {
  const dtStart = "20260913T210000Z";
  const dtEnd   = "20260914T060000Z";
  const uid = `ausaf-jade-wedding-${Date.now()}@etherealquest`;
  const ics = [
    "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Ausaf & Jade//Wedding//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,`DTSTAMP:${dtStart}`,`DTSTART:${dtStart}`,`DTEND:${dtEnd}`,
    "SUMMARY:Ausaf & Jade — A Quest of Two Parties Becoming One",
    "DESCRIPTION:Ceremony at Anderson Japanese Gardens (Rockford\\, IL)\\, then reception at Ethereal Confections (Woodstock\\, IL). Costume wedding — medieval/renaissance or space-themed (Star Wars/Dune). Note: this is a dry wedding.",
    "LOCATION:Anderson Japanese Gardens, 318 Spring Creek Rd, Rockford, IL 61107",
    "END:VEVENT","END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "ausaf-and-jade-wedding.ics"; a.click();
  URL.revokeObjectURL(url);
}
document.querySelectorAll("[data-ics]").forEach(b => b.addEventListener("click", downloadIcs));
