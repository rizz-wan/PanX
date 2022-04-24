let panXHeader = document.getElementById("panX-header");
let minButton = document.getElementById("minButton");
let restoreButton = document.getElementById("restoreButton");
let closeButton = document.getElementById("closeButton");
minButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: closePanel,
  });
});
restoreButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: restorePanel,
  });
});
closeButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: removePanel,
  });
});
function closePanel() {
  parent.postMessage("closePanel", "*");
}
function restorePanel() {
  parent.postMessage("restorePanel", "*");
}
function removePanel() {
  parent.postMessage("removePanel", "*");
}
window.addEventListener("scroll", () => {
  const [r, g, b] = [255, 255, 255];
  let [a, blur] = [0, 0];
  if (window.scrollY || window.pageYOffset) {
    [a, blur] = [0.8, 4];
  }
  panXHeader.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
  panXHeader.style.backdropFilter = `blur(${blur}px)`;
});
// Engine ends
