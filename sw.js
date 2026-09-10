self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  if (event.request.mode !== 'navigate') return;
  event.respondWith((async () => {
    const response = await fetch(event.request);
    const type = response.headers.get('content-type') || '';
    if (!type.includes('text/html')) return response;
    const html = await response.text();
    const style = `\n<style id="convoo-layout-fix">\n/* Correção visual: a malha de medições deve manter proporção compacta, semelhante à planilha de referência. */\n#measureGrid{width:58%;}\n#measureGrid table{width:100%;}\n@media(max-width:900px){#measureGrid{width:100%;}}\n</style>\n`;
    return new Response(html.replace('</head>', style + '</head>'), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  })());
});
