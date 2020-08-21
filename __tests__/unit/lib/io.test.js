'use strict';
/**
 * @todo Storage mock adheres to chrome.storage interface
 * @todo Async handling
 * @todo DI serialize and deserialize checks
 */
import { io } from '../../../src/lib/io';
import { serialize, deserialize } from '../../../src/lib/serialization';

describe('lib/io', () => {
  describe('on initialisation', () => {
    it('throws an error if less than 3 params passed', () => {
      expect(io.bind(null)).toThrow();
      expect(io.bind(null, {})).toThrow();
      expect(io.bind(null, {}, () => {})).toThrow();
    });
  });
});
