chrome.action.onClicked.addListener((tab) => {
  activateExtension(tab);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "panx",
    title: "PanX",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  activateExtension(tab);
});

function activateExtension(tab) {
  // Update the communication messages to prevent conflict between extensions developed on top of panX
  chrome.tabs.sendMessage(tab.id, "togglePanel");
}
// Engine ends
