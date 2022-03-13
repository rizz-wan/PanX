chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, "togglePanel");
});
// Engine ends
