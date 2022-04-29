let numPanelWidth = 440; // update to change panel width
let panelOffset = 16; // update to change panel margin from body, 2X body.margin in css
let panelWidth = `${numPanelWidth}px`;
let panelVisibility = "hidden"; // update to change panel visibility on load
let tmpPanelWidth = panelWidth;
const fullPanel = `calc(100% - ${panelOffset}px)`;
let hasPanel = true;
const windowWidth = window.innerWidth;
let shouldRestore = windowWidth > numPanelWidth + panelOffset ? true : false;
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg == "togglePanel") {
    hasPanel && toggle();
  }
});
addEventListener("message", function (ev) {
  if (ev.data == "closePanel") {
    toggle();
  }
  if (ev.data == "restorePanel") {
    shouldRestore && restore();
  }
  if (ev.data == "removePanel") {
    remove();
  }
});
let iframe = document.createElement("iframe");
iframe.style.background = "rgba(255,255,255,0)";
iframe.style.backdropFilter = "saturate(200%) blur(28px)";
iframe.style.height = fullPanel;
iframe.style.width =
  windowWidth > numPanelWidth + panelOffset ? panelWidth : fullPanel;
iframe.style.opacity = 0;
iframe.style.position = "fixed";
iframe.style.visibility = panelVisibility;
iframe.style.top = "8px";
iframe.style.right = `-${panelWidth}`;
iframe.style.zIndex = "9000000000000000000";
iframe.style.border = "none";
iframe.style.borderRadius = "8px";
iframe.style.transition =
  "visibility 0.15s, right 0.15s, width 0.15s, opacity 0.15s ease-in-out";
iframe.setAttribute("id", "panXPanel");
iframe.setAttribute("allow", "clipboard-write"); // To enable async clipboard API, specifically, to write on clipboard, for copy to clipboard features
iframe.style.boxShadow =
  "rgba(0, 0, 0, 0.22) 0px 25px 57px 0px, rgba(0, 0, 0, 0.18) 0px 4px 14px 0px";
iframe.src = chrome.runtime.getURL("panelContent.html");
document.body.appendChild(iframe);
function toggle() {
  if (panelVisibility == "hidden") {
    panelVisibility = "visible";
    iframe.style.opacity = 1;
    iframe.style.right = "8px";
    document.body.style.overflow = "hidden"; // remove to enable parent scroll when panel is visible
  } else {
    panelVisibility = "hidden";
    iframe.style.opacity = 0;
    iframe.style.right = `-${tmpPanelWidth}`;
    document.body.style.overflow = "auto";
  }
  iframe.style.visibility = panelVisibility;
}
function restore() {
  tmpPanelWidth = iframe.style.width;
  if (panelVisibility == "visible") {
    if (tmpPanelWidth == panelWidth) {
      tmpPanelWidth = fullPanel;
    } else {
      tmpPanelWidth = panelWidth;
    }
  }
  iframe.style.width = tmpPanelWidth;
}
function remove() {
  document.body.removeChild(iframe);
  document.body.style.overflow = "auto";
  hasPanel = false;
}
window.addEventListener("resize", function (event) {
  if (event.currentTarget.innerWidth > numPanelWidth + panelOffset) {
    tmpPanelWidth = panelWidth;
    shouldRestore = true;
  } else {
    tmpPanelWidth = fullPanel;
    shouldRestore = false;
  }
  iframe.style.width = tmpPanelWidth;
});
// Engine ends
