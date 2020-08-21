import { serialize, deserialize } from './lib/serialization';
import { io } from './lib/io';

//const ioHandler = io(chrome.storage.local, serialize, deserialize);
//
//// ----------------------
//// Reference ccr on window so we can pass messages
//// from background.js
//// ----------------------
//window.ccr = (() => {
//  return {
//    loadFromStorage: (key) => ioHandler.load(key),
//    saveToStorage: (key, val) => {
//      ioHandler.save(key, val);
//    }
//  }
//})();
//
