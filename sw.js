self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  if (event.request.mode !== 'navigate') return;
  event.respondWith((async () => {
    const response = await fetch(event.request);
    const type = response.headers.get('content-type') || '';
    if (!type.includes('text/html')) return response;
    const html = await response.text();
    const style = `
<style id="convoo-layout-fix">
/* Ajustes visuais do mapa e da malha, sem alterar cálculos. */
#measureGrid{width:58%;}
#measureGrid table{width:100%;}

/* O mapa usa a área disponível e limita sua altura. Como cada célula é quadrada,
   aumentar o número de linhas reduz automaticamente a largura da malha. */
.resultMapWrap{width:100%;max-width:none;padding-left:38px;padding-top:30px;}
.resultMap{margin:0 auto;}
.resultColLabels{right:auto;}
.resultRowLabels{bottom:auto;}
@media(max-width:900px){
  #measureGrid{width:100%;}
  .resultMapWrap{width:100%;}
}
</style>
<script>
(function(){
  function adjustResultMap(){
    const wrap=document.getElementById('resultMapWrap');
    const map=wrap && wrap.querySelector('.resultMap');
    if(!wrap || !map) return;

    const rows=parseInt(map.style.getPropertyValue('--rows') || getComputedStyle(map).getPropertyValue('--rows')) || map.querySelectorAll('.resultCell').length;
    const cols=parseInt(map.style.getPropertyValue('--cols') || getComputedStyle(map).getPropertyValue('--cols')) || 1;
    const cells=map.querySelectorAll('.resultCell');
    if(!cells.length) return;
    const r=rows>0?rows:Math.max(1,Math.round(cells.length/Math.max(1,cols)));
    const c=cols>0?cols:1;

    const available=Math.max(180,wrap.clientWidth-38);
    const maxHeight=Math.min(650, Math.max(300, window.innerHeight*0.68));
    const width=Math.min(available, maxHeight*c/r);
    map.style.width=width+'px';
    map.style.height='auto';

    requestAnimationFrame(function(){
      const wr=wrap.getBoundingClientRect();
      const mr=map.getBoundingClientRect();
      const labelsC=wrap.querySelector('.resultColLabels');
      const labelsR=wrap.querySelector('.resultRowLabels');
      if(labelsC){ labelsC.style.left=(mr.left-wr.left)+'px'; labelsC.style.width=mr.width+'px'; labelsC.style.right='auto'; }
      if(labelsR){ labelsR.style.left='0px'; labelsR.style.top=(mr.top-wr.top)+'px'; labelsR.style.height=mr.height+'px'; labelsR.style.bottom='auto'; }

      /* O eixo longitudinal usa exatamente o centro geométrico visual do espote. */
      const center=wrap.querySelector('.resultCenter');
      const axis=wrap.querySelector('.resultAxis');
      if(center && axis){
        const cr=center.getBoundingClientRect();
        axis.style.left=(cr.left+cr.width/2-wr.left)+'px';
      }
    });
  }
  window.addEventListener('resize',adjustResultMap);
  const observer=new MutationObserver(adjustResultMap);
  window.addEventListener('load',function(){
    adjustResultMap();
    const wrap=document.getElementById('resultMapWrap');
    if(wrap) observer.observe(wrap,{childList:true,subtree:true,attributes:true});
  });
  setTimeout(adjustResultMap,300);
  setTimeout(adjustResultMap,1000);
})();
</script>
`;
    return new Response(html.replace('</head>', style + '</head>'), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  })());
});
