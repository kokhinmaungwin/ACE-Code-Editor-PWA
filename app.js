const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/html"); // html mode ပြောင်းလိုက်ပါ
editor.setOptions({
  fontSize: "14pt",
  showPrintMargin: false,
});

const preview = document.getElementById("preview");

// Update preview on editor change
editor.session.on('change', () => {
  preview.innerHTML = editor.getValue(); // innerHTML ဖြစ်ဖို့ပြောင်းလိုက်
});

// Initial preview
preview.innerHTML = editor.getValue();

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
  preview.innerHTML = "";
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
