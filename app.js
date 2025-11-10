const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/html"); // HTML mode
editor.setOptions({
  fontSize: "14pt",
  showPrintMargin: false,
});

const preview = document.getElementById("preview");
function stripHTML(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}
editor.session.on('change', () => {
  const rawHtml = editor.getValue();
  preview.textContent = stripHTML(rawHtml);
});

preview.textContent = stripHTML(editor.getValue());

// Copy button
document.getElementById("copyBtn").addEventListener("click", () => {
  navigator.clipboard.writeText(editor.getValue()).then(() => {
    alert("Copied to clipboard!");
  }).catch(() => {
    alert("Copy failed.");
  });
});

// Clear button
document.getElementById("clearBtn").addEventListener("click", () => {
  editor.setValue("");
  preview.textContent = "";
});

// Theme selector 
document.getElementById("themeSelector").addEventListener("change", (e) => {
  const theme = e.target.value;
  editor.setTheme("ace/theme/" + theme);
});

// PWA Install button
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt = null;
});

// register sw
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
