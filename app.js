const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
  fontSize: "14pt",
  showPrintMargin: false,
});

const preview = document.getElementById("preview");

// Update preview on editor change
editor.session.on('change', () => {
  preview.textContent = editor.getValue();
});
// Initial preview
preview.textContent = editor.getValue();

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
