// Initialize ACE editor
const editor = ace.edit("editor");
editor.setTheme("ace/theme/github");
editor.session.setMode("ace/mode/javascript");

// Copy button
document.getElementById('copyBtn').addEventListener('click', () => {
  const code = editor.getValue();
  navigator.clipboard.writeText(code).then(() => {
    alert('Copied to clipboard!');
  }).catch(() => alert('Copy failed'));
});

// Clear button
document.getElementById('clearBtn').addEventListener('click', () => {
  editor.setValue('');
});

// PWA install prompt handling
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'inline-block';
});

installBtn.addEventListener('click', async () => {
  installBtn.style.display = 'none';
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('User response to the install prompt:', outcome);
    deferredPrompt = null;
  }
});

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {
    console.warn('Service worker registration failed');
  });
}
