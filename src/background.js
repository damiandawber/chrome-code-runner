/**
 * Executable snippets are scripts injected on the 
 * fly so that we can reference the window object if required
 */
const executableSnippet = (content) => {
  const code = `
    (() => {
      const existingSnippet = document.querySelector('#ccr-adhoc');
      if(existingSnippet) {
        existingSnippet.remove();
      }

      let adHocScript = document.createElement('script');
      adHocScript.id = 'ccr-adhoc';
      adHocScript.innerHTML = "${content}"
      document.body.insertAdjacentElement('beforeend', adHocScript);
    })();
  `;

  return code;
};

// -----------------------
// Handle messages from devtools panel(s).js
// -----------------------
chrome.runtime.onConnect.addListener((devToolsConnection) => {
  chrome.runtime.onMessage.addListener((message,sender,sendResponse) => {
    if(message && message.type) {
      switch(message.type) {
        case 'ccr-pageload':
          chrome.tabs.executeScript(
            message.tabID, { 
              file: 'content.build.js',  // Primary inspected window script
              runAt: 'document_idle', 
              allFrames: true 
            }
          );
          break;
      }
    }
  });
});
