import { serialize, deserialize } from './lib/serialization';
import { io } from './lib/io';

const THROTTLE_TIMEOUT_LENGTH = 500;

const ioHandler = io(chrome.storage.local, serialize, deserialize);

['ccr-js', 'ccr-css'].forEach((ident) => {
  const input = document.querySelector(`#${ident}-textarea`);

  ioHandler.load(ident).then((loadedValue) => {
    input.innerHTML = loadedValue;
  });

  let throttleTimeout = null;
  input.addEventListener('keyup', (e) => {
    const thisElm = e.currentTarget;

    clearTimeout(throttleTimeout);
    throttleTimeout = setTimeout(() => {
      ioHandler.save(ident, thisElm.value);
    }, THROTTLE_TIMEOUT_LENGTH);
  });
});
