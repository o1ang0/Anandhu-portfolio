window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) setTimeout(() => loader.classList.add("hide"), 1700);
});

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
const letters = "010101ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&";
const fontSize = 16;
let drops = [];

function resizeMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drops = Array(Math.floor(canvas.width / fontSize)).fill(1);
}
resizeMatrix();

function drawMatrix() {
  ctx.fillStyle = document.body.classList.contains("light") ? "rgba(238,247,243,0.08)" : "rgba(0,0,0,0.075)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ff88";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 45);
window.addEventListener("resize", resizeMatrix);

const particleBox = document.querySelector(".particles");
if (particleBox) {
  for (let i = 0; i < 75; i++) {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.style.left = Math.random() * 100 + "vw";
    dot.style.animationDelay = Math.random() * 8 + "s";
    dot.style.animationDuration = 5 + Math.random() * 9 + "s";
    particleBox.appendChild(dot);
  }
}

const typeTarget = document.getElementById("typeName");
const nameText = "Anandhu S Saji";
let nameIndex = 0;

function typeName() {
  if (!typeTarget) return;
  if (nameIndex < nameText.length) {
    typeTarget.textContent += nameText[nameIndex];
    nameIndex++;
    setTimeout(typeName, 115);
  } else {
    typeTarget.innerHTML += "<span class='cursor'>▌</span>";
  }
}
setTimeout(typeName, 1800);

const reveals = document.querySelectorAll(".reveal");
const bars = document.querySelectorAll(".bar span");

function scrollEffects() {
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add("active");
  });
  bars.forEach((bar) => {
    if (bar.getBoundingClientRect().top < window.innerHeight - 70) bar.style.width = bar.dataset.width;
  });
  updateActiveNav();
  updateNavbar();
}

const terminal = document.getElementById("terminalText");
const terminalLines = [
  "user@anandhu:~$ whoami",
  "Anandhu S Saji",
  "user@anandhu:~$ cat about.txt",
  "Cybersecurity Enthusiast",
  "Web Developer",
  "Problem Solver",
  "Always learning, always hacking.",
  "user@anandhu:~$ _"
];
let terminalIndex = 0;
let terminalStarted = false;

function typeTerminal() {
  if (!terminal) return;
  if (terminalIndex < terminalLines.length) {
    terminal.textContent += terminalLines[terminalIndex] + "\n";
    terminalIndex++;
    setTimeout(typeTerminal, 520);
  }
}

function startTerminal() {
  const terminalCard = document.querySelector(".terminal-card");
  if (terminalCard && !terminalStarted && terminalCard.getBoundingClientRect().top < window.innerHeight - 100) {
    terminalStarted = true;
    typeTerminal();
  }
}

const themeBtn = document.getElementById("themeBtn");
function syncThemeToggle() {
  if (!themeBtn) return;
  themeBtn.setAttribute("aria-pressed", document.body.classList.contains("light") ? "true" : "false");
}
if (localStorage.getItem("theme") === "light") document.body.classList.add("light");
syncThemeToggle();
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
    syncThemeToggle();
  });
}

const navbar = document.getElementById("navbar");
function updateNavbar() {
  // Do nothing - keep navbar transparent while scrolling
}

const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll("#mainNav a");
const sections = document.querySelectorAll("section[id]");

function closeMenu() {
  if (!menuBtn || !mainNav) return;
  mainNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuBtn.textContent = "☰";
  menuBtn.setAttribute("aria-expanded", "false");
}

if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuBtn.textContent = isOpen ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

// Close mobile menu with Escape or outside tap
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

document.addEventListener("click", (e) => {
  if (!mainNav || !menuBtn) return;
  if (!mainNav.classList.contains("open")) return;
  if (!mainNav.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
});

function updateActiveNav() {
  let current = "home";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) current = section.id;
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const linkUrl = new URL(href, window.location.href);
    const linkPage = linkUrl.pathname.split("/").pop() || "index.html";
    const linkHash = linkUrl.hash.replace("#", "");

    const sameSection = currentPage === "index.html" && linkPage === "index.html" && linkHash === current;
    const samePage = currentPage !== "index.html" && linkPage === currentPage;
    link.classList.toggle("active", sameSection || samePage);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    const isHashOnly = href && href.startsWith("#");
    const target = isHashOnly ? document.querySelector(href) : null;

    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 86, behavior: "smooth" });
      closeMenu();
    } else {
      closeMenu();
    }
  });
});

window.addEventListener("scroll", () => {
  scrollEffects();
  startTerminal();
});
window.addEventListener("load", () => {
  scrollEffects();
  startTerminal();
  updateActiveNav();
  updateNavbar();
});
scrollEffects();
startTerminal();
