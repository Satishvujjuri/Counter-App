//Fast Letter-by-Letter Title Animation Setup
const title = document.getElementById("title");
const text = title.innerText;
title.innerHTML = text
    .split("")
    .map((letter, i) => `<span style="--i:${i}">${letter === " " ? "&nbsp;" : letter}</span>`)
    .join("");

//Select Elements
let count = document.getElementById("count");
let increase = document.getElementById("increase");
let decrease = document.getElementById("decrease");
let reset = document.getElementById("reset");

let info = document.getElementById("info");
let theme = document.getElementById("theme");

let infoModal = document.getElementById("infoModal");
let closeInfo = document.getElementById("closeInfo");

let number = 0;

function updateDisplay() {
    count.innerText = number;
}

//Counter Button Handlers
increase.onclick = function() {
    number++;
    updateDisplay();
};

decrease.onclick = function() {
    if (number > 0) {
        number--;
    }
    updateDisplay();
};

reset.onclick = function() {
    number = 0;
    updateDisplay();
};

//Keyboard Shortcuts
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") {
        number++;
        updateDisplay();
    } else if (event.key === "ArrowDown") {
        if (number > 0) {
            number--;
        }
        updateDisplay();
    } else if (event.key === "r" || event.key === "R") {
        number = 0;
        updateDisplay();
    }
});

//Modal Display Logic
info.onclick = () => {
    infoModal.classList.remove("hidden");
};

closeInfo.onclick = () => {
    infoModal.classList.add("hidden");
};

window.onclick = (event) => {
    if (event.target === infoModal) {
        infoModal.classList.add("hidden");
    }
};

//Theme State Management with localStorage
function applyTheme(themeName) {
    if (themeName === "light") {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        theme.innerText = "🌙";
        localStorage.setItem("appTheme", "light");
    } else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        theme.innerText = "☀";
        localStorage.setItem("appTheme", "dark");
    }
}

// Load saved theme on startup (defaults to dark)
const savedTheme = localStorage.getItem("appTheme") || "dark";
applyTheme(savedTheme);

theme.onclick = function() {
    //Trigger spin animation
    theme.classList.remove("theme-spin");
    void theme.offsetWidth;
    theme.classList.add("theme-spin");

    //Toggle theme
    const currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
    applyTheme(currentTheme === "light" ? "dark" : "light");
};