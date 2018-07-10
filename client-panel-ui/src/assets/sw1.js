"use strict";

function setOfCachedUrls(e) {
  return e.keys().then(function (e) {
    return e.map(function (e) {
      return e.url
    })
  }).then(function (e) {
    return new Set(e)
  })
}

var precacheConfig = [["//static.treebo.com/hotrod/build/desktop/assets/css/main.a2cc5d704ea9fa6204f6ed6cfaeb9628.css", "a2cc5d704ea9fa6204f6ed6cfaeb9628"], ["//static.treebo.com/hotrod/build/desktop/assets/fonts/322A10_0_0.1c1227c8dd242a5fe51763f36a9a87b2.woff", "1c1227c8dd242a5fe51763f36a9a87b2"], ["//static.treebo.com/hotrod/build/desktop/assets/fonts/322A10_0_0.345e137c16c2504380702970e991013e.ttf", "345e137c16c2504380702970e991013e"], ["//static.treebo.com/hotrod/build/desktop/assets/fonts/322A10_0_0.aa2ea3c9630f11a196804e6a339b15e2.eot", "aa2ea3c9630f11a196804e6a339b15e2"], ["//static.treebo.com/hotrod/build/desktop/assets/fonts/322A10_0_0.c8b246bb10595c5667d8fca76e49fe69.woff2", "c8b246bb10595c5667d8fca76e49fe69"], ["//static.treebo.com/hotrod/build/desktop/assets/fonts/icomoon.049776a238659e567a39008c45ff5710.eot", "049776a238659e567a39008c45ff5710"], ["//static.treebo.com/hotrod/build/desktop/assets/fonts/icomoon.06eecc830840f11bf06eed97bc577d5c.woff", "06eecc830840f11bf06eed97bc577d5c"], ["//static.treebo.com/hotrod/build/desktop/assets/fonts/icomoon.b0864c6fe8be1823ab7af2aa5b3fb584.ttf", "b0864c6fe8be1823ab7af2aa5b3fb584"], ["//static.treebo.com/hotrod/build/desktop/assets/fonts/icomoon.b3fa4f9d37ce9d1ffffd90b74ab025d2.woff2", "b3fa4f9d37ce9d1ffffd90b74ab025d2"], ["//static.treebo.com/hotrod/build/desktop/js/Account.6e35572563572b55f60d.js", "5956f2260ff78869c442e26a4eda6025"], ["//static.treebo.com/hotrod/build/desktop/js/Auth.5a8d78acf0513cde3b03.js", "8901bc9661000501d8d69c8b4fb701ec"], ["//static.treebo.com/hotrod/build/desktop/js/Checkout.9e211d9d4c8096404010.js", "5a350cc8915f580fe75df753e7de5f81"], ["//static.treebo.com/hotrod/build/desktop/js/Faq.5cc3e742de01d92fd31e.js", "73ee90c264a8b9e4f3bd0eb07bfdddf8"], ["//static.treebo.com/hotrod/build/desktop/js/Home.8cbadf4f4d76d75e3caa.js", "6fbbddb577d36869327dca5ce83dc518"], ["//static.treebo.com/hotrod/build/desktop/js/Review.fbbe1f8796ac24b18153.js", "0ffafe42335a2749221a3780deddecac"], ["//static.treebo.com/hotrod/build/desktop/js/Search.d2d147cd707a46014d41.js", "0da8668d95163415867a92042414e27f"], ["//static.treebo.com/hotrod/build/desktop/js/View.b6f8d34c29755556371e.js", "a9339f9d913021f28bfd0619e9caa298"], ["//static.treebo.com/hotrod/build/desktop/js/main.9fbf773db1eff0bed85b.js", "f35eedfaf145c040c2c2bde31ec494b8"], ["//static.treebo.com/hotrod/build/desktop/js/manifest.8ed2550622208ddf9c0f.js", "290fdf00ddc7aaa63b9ecb8efeca719f"], ["//static.treebo.com/hotrod/build/desktop/js/vendor.0ed7ec6d3f072049f2ab.js", "4b278a41a80b884e6649d39f0a1e9fe1"]],
  cacheName = "sw-precache-v3-hotrod-" + (self.registration ? self.registration.scope : ""),
  ignoreUrlParametersMatching = [/^utm_/], addDirectoryIndex = function (e, t) {
    var o = new URL(e);
    return "/" === o.pathname.slice(-1) && (o.pathname += t), o.toString()
  }, cleanResponse = function (e) {
    return e.redirected ? ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function (t) {
      return new Response(t, {headers: e.headers, status: e.status, statusText: e.statusText})
    }) : Promise.resolve(e)
  }, createCacheKey = function (e, t, o, a) {
    var c = new URL(e);
    return a && c.pathname.match(a) || (c.search += (c.search ? "&" : "") + encodeURIComponent(t) + "=" + encodeURIComponent(o)), c.toString()
  }, isPathWhitelisted = function (e, t) {
    if (0 === e.length) return !0;
    var o = new URL(t).pathname;
    return e.some(function (e) {
      return o.match(e)
    })
  }, stripIgnoredUrlParameters = function (e, t) {
    var o = new URL(e);
    return o.hash = "", o.search = o.search.slice(1).split("&").map(function (e) {
      return e.split("=")
    }).filter(function (e) {
      return t.every(function (t) {
        return !t.test(e[0])
      })
    }).map(function (e) {
      return e.join("=")
    }).join("&"), o.toString()
  }, hashParamName = "_sw-precache", urlsToCacheKeys = new Map(precacheConfig.map(function (e) {
    var t = e[0], o = e[1], a = new URL(t, self.location), c = createCacheKey(a, hashParamName, o, /./);
    return [a.toString(), c]
  }));
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(cacheName).then(function (e) {
    return setOfCachedUrls(e).then(function (t) {
      return Promise.all(Array.from(urlsToCacheKeys.values()).map(function (o) {
        if (!t.has(o)) {
          var a = new Request(o, {credentials: "same-origin"});
          return fetch(a).then(function (t) {
            if (!t.ok) throw new Error("Request for " + o + " returned a response with status " + t.status);
            return cleanResponse(t).then(function (t) {
              return e.put(o, t)
            })
          })
        }
      }))
    })
  }).then(function () {
    return self.skipWaiting()
  }))
}), self.addEventListener("activate", function (e) {
  var t = new Set(urlsToCacheKeys.values());
  e.waitUntil(caches.open(cacheName).then(function (e) {
    return e.keys().then(function (o) {
      return Promise.all(o.map(function (o) {
        if (!t.has(o.url)) return e.delete(o)
      }))
    })
  }).then(function () {
    return self.clients.claim()
  }))
}), self.addEventListener("fetch", function (e) {
  if ("GET" === e.request.method) {
    var t, o = stripIgnoredUrlParameters(e.request.url, ignoreUrlParametersMatching);
    t = urlsToCacheKeys.has(o);
    t || (o = addDirectoryIndex(o, "index.html"), t = urlsToCacheKeys.has(o));
    t && e.respondWith(caches.open(cacheName).then(function (e) {
      return e.match(urlsToCacheKeys.get(o)).then(function (e) {
        if (e) return e;
        throw Error("The cached response that was expected is missing.")
      })
    }).catch(function (t) {
      return console.warn('Couldn\'t serve response for "%s" from cache: %O', e.request.url, t), fetch(e.request)
    }))
  }
});
