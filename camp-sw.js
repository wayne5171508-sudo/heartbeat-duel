// 營火之夜：讓 camp.html 在營地沒訊號時也能打開（有網路時永遠拿最新版）
const CACHE = 'campfire-night-v1';
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(['camp.html']))); self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || !url.pathname.endsWith('/camp.html')) return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put('camp.html', copy)); return r; })
    .catch(() => caches.match('camp.html')));
});
