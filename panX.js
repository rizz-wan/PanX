let panelWidth = "440px"; // update to change panel width
let panelVisibility = "hidden"; // update to change panel visibility on load
let tmpPanelWidth = panelWidth;
let hasPanel = true;
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
    restore();
  }
  if (ev.data == "removePanel") {
    remove();
  }
});
var iframe = document.createElement("iframe");
iframe.style.background = "rgba(255,255,255,0)";
iframe.style.backdropFilter = "saturate(200%) blur(28px)";
iframe.style.height = "calc(100% - 16px)";
iframe.style.width = panelWidth;
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
      tmpPanelWidth = "calc(100% - 16px)";
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
// Engine ends
