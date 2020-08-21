/**
 * DevTools UI
 */

chrome.devtools.panels.create(
  'Coder',
  'icon.png',
  'panel.html',
  () => {
    // Code invoked on panel.create
    chrome.runtime.connect();

    // On Page Load
    chrome.devtools.network.onNavigated.addListener(() => {
      chrome.runtime.sendMessage({
        type: 'ccr-pageload',
        tabId: chrome.devtools.inspectedWindow.tabId
      });
    });
  }
);
