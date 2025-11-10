const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/html"); 
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

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// Before install prompt event ကို capture
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); 
  deferredPrompt = e;
  installBtn.style.display = 'inline-block'; 
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const choiceResult = await deferredPrompt.userChoice;
  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the install prompt');
  } else {
    console.log('User dismissed the install prompt');
  }
  deferredPrompt = null;
  installBtn.style.display = 'none'; 
});

window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  installBtn.style.display = 'none';
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker registered'))
    .catch((err) => console.error('Service Worker registration failed:', err));
}
