import { serialize, deserialize } from './lib/serialization';
import { io } from './lib/io';

const ioHandler = io(chrome.storage.local, serialize, deserialize);

ioHandler.load('ccr-js').then((loadedValue) => {
  if(loadedValue && !document.querySelector('#ccr-js')) {
    const scriptElm = document.createElement('script');
    scriptElm.id = 'ccr-js';
    scriptElm.type = 'text/javascript';
    scriptElm.innerHTML = loadedValue;
    document.body.insertAdjacentElement('beforeend', scriptElm);
  }
});

ioHandler.load('ccr-css').then((loadedValue) => {
  if(loadedValue && !document.querySelector('#ccr-css')) {
    const styleElm = document.createElement('style');
    styleElm.id = 'ccr-css';
    styleElm.type = 'text/css';
    styleElm.innerHTML = loadedValue;
    document.body.insertAdjacentElement('beforeend', styleElm);
  }
});
