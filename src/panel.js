import { serialize, deserialize } from './lib/serialization';
import { io } from './lib/io';

const THROTTLE_TIMEOUT_LENGTH = 500;

const ioHandler = io(chrome.storage.local, serialize, deserialize);

// -------------------------------------
// Create Code Editors and listen for changes
// -------------------------------------
['ccr-js', 'ccr-css'].forEach((ident) => {
  const input = document.querySelector(`#${ident}-textarea`);

  ioHandler.load(ident).then((loadedValue) => {
    input.innerHTML = loadedValue;

    const cmInstance = CodeMirror.fromTextArea(input, {
      lineNumbers: true,
      tabSize: 2,
      theme: 'cobalt',
      mode: (ident === 'ccr-js' ? 'javascript' : 'css'),
    });

    let throttleTimeout = null;
    cmInstance.on('change', (cm, changes) => {
      const curValue = cm.getValue();

      clearTimeout(throttleTimeout);
      throttleTimeout = setTimeout(() => {
        ioHandler.save(ident, cm.getValue());
      }, THROTTLE_TIMEOUT_LENGTH);
    });
  });

});

// -------------------------------------
// Run Button - Updates page with code
//
// `inspectedWindow.eval()` is the easiest way to 
// init page reload without passing messages
// -------------------------------------
const initButton = document.querySelector('.ccr-header__init');
if(initButton) {
  initButton.addEventListener('click', () => {
    chrome.devtools.inspectedWindow.eval(
      "window.location.reload()",
      (result, isException) => {
      }
    );
  });
}
