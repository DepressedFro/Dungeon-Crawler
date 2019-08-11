"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/Dungeon-Crawler/index.html","7cda2e8b9836e57f90ca929c5f643b8f"],["/Dungeon-Crawler/static/css/main.40361c46.css","e298f4d6ebc8d07e548f75d12e0b5ab9"],["/Dungeon-Crawler/static/js/main.6544febf.js","4595a714851df6ca1dcf5e96e924091c"],["/Dungeon-Crawler/static/media/Main_Menu.b5ce650f.png","b5ce650f264bdc95718d94e2fa32c4c1"],["/Dungeon-Crawler/static/media/Title_Screen.41716408.png","41716408ff88cf15e9108eac9c766743"],["/Dungeon-Crawler/static/media/riddles.649bb012.csv","649bb012912b103c0cf1d8d992e541fb"],["/Dungeon-Crawler/static/media/sfx_deathscream.c0a9f4c6.wav","c0a9f4c6e30e4976238cb02dac1ab945"],["/Dungeon-Crawler/static/media/sfx_enemy_blob_split.43029a36.wav","43029a3685e35e42848720e479528556"],["/Dungeon-Crawler/static/media/sfx_menu_scroll.90c7c31c.wav","90c7c31c06cb9882cd19d3fe5dcdde38"],["/Dungeon-Crawler/static/media/sfx_menu_start_game.2be7dc8b.wav","2be7dc8b0e1b57f57c6b13d36b4f9290"],["/Dungeon-Crawler/static/media/sfx_player_hurt.ec0f9373.wav","ec0f93737ac89941d32355661894f0d9"],["/Dungeon-Crawler/static/media/sfx_player_warrior_shield_block.b6a07429.wav","b6a07429c32e7ba7e204d54d85ff26f0"],["/Dungeon-Crawler/static/media/sfx_player_warrior_sword_hit.333575f8.wav","333575f8656c3ede9a767a9609e683d3"],["/Dungeon-Crawler/static/media/sfx_player_wizard_fireball_hit_.c67a98af.wav","c67a98afaf32d878f84876ea7f645f34"],["/Dungeon-Crawler/static/media/sfx_riddle_correct.71fb184d.wav","71fb184d5e74a4c5b5c7fee3a13a945c"],["/Dungeon-Crawler/static/media/sfx_riddle_incorrect.f201fa72.wav","f201fa727472738e812a084aefaeddf4"],["/Dungeon-Crawler/static/media/sfx_trap_flame_spit.1c99e803.wav","1c99e8038222370934d45242a6eba858"],["/Dungeon-Crawler/static/media/sprite1_strip14.7499afc9.png","7499afc9caffedcabbba239764b02bf6"],["/Dungeon-Crawler/static/media/tileset.ecf45c8f.png","ecf45c8f046cac83fa351cf572f054a0"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,a,t,r){var n=new URL(e);return r&&n.pathname.match(r)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],r=new URL(a,self.location),n=createCacheKey(r,hashParamName,t,/\.\w{8}\./);return[r.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var r=new Request(t,{credentials:"same-origin"});return fetch(r).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/Dungeon-Crawler/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});