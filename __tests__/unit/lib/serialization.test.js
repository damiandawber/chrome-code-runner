'use strict';

import { serialize, deserialize } from '../../../src/lib/serialization';

describe('lib/serialization', () => {
  // ---------------------------
  // Serialize() is expected to take JS / CSS
  // and store it in a string format [base64]
  // ---------------------------
  describe('serialize()', () => {
    // -------------------------
    // No parameter is passed
    // -------------------------
    it('throws an error if no parameter is passed', () => {
      expect(serialize.bind(null)).toThrow();
    });

    // -------------------------
    // HTML Base 64 serialization check
    // -------------------------
    it('converts a simple HTML doc to base64', () => {
      const html = `<!DOCTYPE HTML> <html> <head> <meta charset="utf-8" /> <title>App</title> <meta name="viewport" content="width=device-width, initial-scale=1" /> <script charset="utf-8" src="js/app.js"></script> <link rel="stylesheet" href="css/app.css" /> </head> <body> <h1>Hello!</h1> </body> </html>`;

      const result = serialize(html);

      expect(result).toEqual('PCFET0NUWVBFIEhUTUw+IDxodG1sPiA8aGVhZD4gPG1ldGEgY2hhcnNldD0idXRmLTgiIC8+IDx0aXRsZT5BcHA8L3RpdGxlPiA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEiIC8+IDxzY3JpcHQgY2hhcnNldD0idXRmLTgiIHNyYz0ianMvYXBwLmpzIj48L3NjcmlwdD4gPGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJjc3MvYXBwLmNzcyIgLz4gPC9oZWFkPiA8Ym9keT4gPGgxPkhlbGxvITwvaDE+IDwvYm9keT4gPC9odG1sPg==');
    });

    // -------------------------
    // CSS Check
    // -------------------------
    it('converts simple CSS to base64', () => {
      const cssDoc = 'div#bob { min-height: 100%; } .eric9_4 display: flex; flex-direction: column; background-color: var(--white); background-image: none; background-position: top left; background-repeat: repeat; background-size: auto; background-attachment: auto; min-width: 1279px; color:var(--black-01);';

      const result = serialize(cssDoc);

      expect(result).toEqual('ZGl2I2JvYiB7IG1pbi1oZWlnaHQ6IDEwMCU7IH0gLmVyaWM5XzQgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2hpdGUpOyBiYWNrZ3JvdW5kLWltYWdlOiBub25lOyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiB0b3AgbGVmdDsgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDsgYmFja2dyb3VuZC1zaXplOiBhdXRvOyBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGF1dG87IG1pbi13aWR0aDogMTI3OXB4OyBjb2xvcjp2YXIoLS1ibGFjay0wMSk7');
    });

    // -------------------------
    // JS Check
    // -------------------------
    it('converts JS to base64', () => {
      const jsDoc = `function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}`;

      const result = serialize(jsDoc);

      expect(result).toEqual('ZnVuY3Rpb24gYihjLGUpe3JldHVybiBhLnB1c2goYysiICIpPmQuY2FjaGVMZW5ndGgmJmRlbGV0ZSBiW2Euc2hpZnQoKV0sYltjKyIgIl09ZX1yZXR1cm4gYn1mdW5jdGlvbiBoYShhKXtyZXR1cm4gYVt1XT0hMCxhfWZ1bmN0aW9uIGlhKGEpe3ZhciBiPW4uY3JlYXRlRWxlbWVudCgiZGl2Iik7dHJ5e3JldHVybiEhYShiKX1jYXRjaChjKXtyZXR1cm4hMX1maW5hbGx5e2IucGFyZW50Tm9kZSYmYi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGIpLGI9bnVsbH19');
    });
    
    // -------------------------
    // Handles empty strings
    // -------------------------
    it('handles empty strings returning empty string', () => {
      const result = serialize('');
      expect(result).toEqual('');
    });
  });

  // ---------------------------
  // Deserialize will ensure that 
  // ---------------------------
  describe('deserialize()', () => {
    // ---------------------------
    // Expect parameter
    // ---------------------------
    it('throws an error if no parameter is passed', () => {
      expect(deserialize.bind(null)).toThrow();
    });

    // ---------------------------
    // Expect error if not base64
    // ---------------------------
    it('throws an error if not a base64 param', () => {
      expect(deserialize.bind(null, Math.PI)).toThrow();
      expect(deserialize.bind(null, 'x')).toThrow();
    });
    
    // ---------------------------
    // Expect base64 returns raw css
    // ---------------------------
    it('converts base64 back to an unencoded CSS string', () => {
      const b = 'ZGl2I2JvYiB7IG1pbi1oZWlnaHQ6IDEwMCU7IH0gLmVyaWM5XzQgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2hpdGUpOyBiYWNrZ3JvdW5kLWltYWdlOiBub25lOyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiB0b3AgbGVmdDsgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdDsgYmFja2dyb3VuZC1zaXplOiBhdXRvOyBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGF1dG87IG1pbi13aWR0aDogMTI3OXB4OyBjb2xvcjp2YXIoLS1ibGFjay0wMSk7';

      const result = deserialize(b);

      expect(result).toEqual(`div#bob { min-height: 100%; } .eric9_4 display: flex; flex-direction: column; background-color: var(--white); background-image: none; background-position: top left; background-repeat: repeat; background-size: auto; background-attachment: auto; min-width: 1279px; color:var(--black-01);`);
    });

    // ---------------------------
    // Expect base64 returns raw js
    // ---------------------------
    it('converts base64 back to an unencoded JS string', () => {
      const b = 'ZnVuY3Rpb24gYihjLGUpe3JldHVybiBhLnB1c2goYysiICIpPmQuY2FjaGVMZW5ndGgmJmRlbGV0ZSBiW2Euc2hpZnQoKV0sYltjKyIgIl09ZX1yZXR1cm4gYn1mdW5jdGlvbiBoYShhKXtyZXR1cm4gYVt1XT0hMCxhfWZ1bmN0aW9uIGlhKGEpe3ZhciBiPW4uY3JlYXRlRWxlbWVudCgiZGl2Iik7dHJ5e3JldHVybiEhYShiKX1jYXRjaChjKXtyZXR1cm4hMX1maW5hbGx5e2IucGFyZW50Tm9kZSYmYi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGIpLGI9bnVsbH19';

      const result = deserialize(b);

      expect(result).toEqual(`function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}`);
    });
  });
});
