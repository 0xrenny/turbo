(()=>{const T=window.TOKEN,G=T.growth,M=T.marketcap,$=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
for(const[k,v]of Object.entries(T.colors))document.documentElement.style.setProperty('--'+k,v);
document.title=`${T.name} · ${T.tagline}`;$('meta[name=description]').content=T.tagline;
$$('[data-name]').forEach(e=>e.textContent=T.name);$$('[data-ticker]').forEach(e=>e.textContent=T.ticker);$$('[data-img]').forEach(e=>e.src=T.image);
$('[data-contract]').textContent=T.contract;$$('[data-link]').forEach(e=>e.href=T.links[e.dataset.link]||'#');$('#yr').textContent=new Date().getFullYear();
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
$('#lore').textContent=T.sections.lore;
$('#facts').innerHTML=T.sections.facts.map(f=>`<div class="reveal"><p class="lbl">${esc(f[0])}</p><b>${esc(f[1])}</b><i>${esc(f[2])}</i></div>`).join('');
$('#buy').innerHTML=T.sections.buy.map((b,i)=>`<li class="reveal"><span>0${i+1}</span>${esc(b)}</li>`).join('');
$('#rm').innerHTML=T.sections.roadmap.map(r=>`<li class="reveal"><span>${esc(r[0])}</span>${esc(r[1])}</li>`).join('');
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&(e.target.classList.add('in'),io.unobserve(e.target))),{threshold:.15});$$('.reveal,.lede').forEach(e=>{e.classList.add('reveal');io.observe(e)});
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t._);t._=setTimeout(()=>t.classList.remove('on'),2400)};
$('#copy').onclick=async()=>{if(!T.contract||T.contract==='TBA')return toast('CA is TBA. Patience also grows things.');try{await navigator.clipboard.writeText(T.contract)}catch{}toast('Copied. Measure twice, ape once.')};
// ---- market cap ----
let mc=M.start,live=false;const lenOf=m=>Math.sqrt(Math.max(m,0))*G.cmPerSqrtDollar;
async function poll(){const a=M.dexscreener&&M.dexscreener.address;if(!a||a==='TBA')return;
 try{const r=await fetch('https://api.dexscreener.com/latest/dex/tokens/'+a),j=await r.json();const p=(j.pairs||[]).filter(p=>!M.dexscreener.chain||p.chainId===M.dexscreener.chain).sort((a,b)=>(b.liquidity?.usd||0)-(a.liquidity?.usd||0))[0];
 const v=p&&(p.marketCap||p.fdv);if(v){mc=v;live=true;$('#live').textContent='LIVE'}}catch{}}
poll();setInterval(poll,30000);
setInterval(()=>{if(!live&&M.drift)mc*=1+(Math.random()-.47)*M.drift},500);
$('#pump').onclick=()=>{mc*=M.pump;kick=1};$('#dump').onclick=()=>{mc*=M.dump;toast(G.shrinkComments[Math.random()*G.shrinkComments.length|0])};
let kick=0;
// ---- render ----
const S=$('#scene'),frog=$('#frog'),NS='http://www.w3.org/2000/svg';let disp=lenOf(mc),rec=+localStorage.getItem('rec_'+T.ticker)||0,lastC='';
const fmt$=v=>'$'+(v>=1e9?(v/1e9).toFixed(2)+'B':v>=1e6?(v/1e6).toFixed(2)+'M':v>=1e3?(v/1e3).toFixed(1)+'K':v.toFixed(0));
const fmtL=c=>c>=100000?(c/100000).toFixed(2)+' km':c>=100?(c/100).toFixed(2)+' m':c.toFixed(1)+' '+G.unit;
const nice=x=>{const p=Math.pow(10,Math.floor(Math.log10(x))),n=x/p;return(n<2?2:n<5?5:10)*p};
function frame(t){const W=innerWidth,H=innerHeight,mob=W<760;
 const target=lenOf(mc)+scrollY*G.scrollBonusCm;disp+=(target-disp)*.08;kick*=.9;
 if(disp>rec+.5){rec=disp;localStorage.setItem('rec_'+T.ticker,rec)}
 const fs=mob?Math.min(W*.42,190):Math.min(H*.32,300),fx=mob?W*.08:W*.06,fy=mob?H*.47:H*.5;
 const startX=fx+fs*.72,avail=W-startX-(mob?40:150),frogCm=60;// frog is 60cm, for scale
 const ppc=Math.min(avail/Math.max(disp,1),fs/frogCm*1.2);// px per cm (zooms out as it grows)
 const Lpx=disp*ppc,y0=fy+fs*.12,th=Math.max(10,fs*.13);
 frog.style.width=fs+'px';frog.style.left=fx+'px';frog.style.top=(fy-fs/2)+'px';
 frog.style.transform=`rotate(${Math.sin(t/900)*3-kick*8}deg) translateY(${Math.sin(t/700)*6}px)`;
 // hose path: wavy, sagging, wobble scales with energy
 const n=40;let d='',pts=[];for(let i=0;i<=n;i++){const u=i/n,x=startX+u*Lpx,amp=(th*.9+kick*30)*Math.sin(Math.PI*u),y=y0+Math.sin(u*Math.PI*3-t/400)*amp*.6+u*u*th*1.4;pts.push([x,y]);d+=(i?'L':'M')+x.toFixed(1)+','+y.toFixed(1)}
 for(const[id,w]of[['hose-shadow',th+6],['hose',th],['hose-ribs',th],['hose-shine',th*.18]]){const e=$('#'+id);e.setAttribute('d',d);e.setAttribute('stroke-width',w)}
 $('#hose-ribs').setAttribute('stroke-dasharray',`2 ${Math.max(5,th*.55)}`);$('#hose-shine').setAttribute('transform',`translate(0,${-th*.25})`);
 const[ex,ey]=pts[n],[px,py]=pts[n-1],ang=Math.atan2(ey-py,ex-px)*180/Math.PI;
 $('#nozzle').setAttribute('transform',`translate(${ex},${ey}) rotate(${ang}) scale(${th/20})`);$('#flame').setAttribute('r',18+Math.sin(t/40)*4+kick*20);
 // ruler
 const ry=Math.min(fy+fs*.68,H*(mob?.68:.66)),R=$('#ruler');let step=nice(80/ppc),h='';h+=`<line x1="${startX}" y1="${ry}" x2="${W}" y2="${ry}" class="m"/>`;
 for(let c=0;c*ppc<=W-startX;c+=step){const x=startX+c*ppc;h+=`<line x1="${x}" y1="${ry}" x2="${x}" y2="${ry+10}" class="m"/><text x="${x+4}" y="${ry+22}">${fmtL(c)}</text>`;
  for(let k=1;k<5;k++){const xx=x+k*step/5*ppc;h+=`<line x1="${xx}" y1="${ry}" x2="${xx}" y2="${ry+5}"/>`}}
 let mi=0;for(const[c,lab]of G.milestones){const x=startX+c*ppc;if(x>W-(mob?120:170)||c*ppc<34)continue;const yy=ry-14-(mi++%2)*20;h+=`<line x1="${x}" y1="${yy+4}" x2="${x}" y2="${ry}" class="m"/><text x="${x+5}" y="${yy}" class="ms">${esc(lab)}</text>`}
 const rx=startX+rec*ppc;if(rx<W)h+=`<line x1="${rx}" y1="${ry-60}" x2="${rx}" y2="${ry+14}" stroke="var(--flame)" style="stroke:var(--flame)"/><text x="${rx-4}" y="${ry-64}" text-anchor="end" style="fill:var(--flame)">RECORD</text>`;
 R.innerHTML=h;
 const dl=$('#dimline');dl.setAttribute('x1',startX);dl.setAttribute('x2',startX+Lpx);dl.setAttribute('y1',ry-4);dl.setAttribute('y2',ry-4);
 const dt=$('#dimtext');dt.setAttribute('x',startX+Lpx/2);dt.setAttribute('y',y0-th*2.2);dt.textContent='← '+fmtL(disp)+' →';
 $('#mc').textContent=fmt$(mc);$('#len').textContent=fmtL(disp);$('#rec').textContent=fmtL(rec);
 let c=G.comments[0][1];for(const[v,s]of G.comments)if(disp>=v)c=s;if(c!==lastC){lastC=c;const e=$('#comment');e.style.opacity=0;setTimeout(()=>{e.textContent=c;e.style.opacity=1},200)}
 requestAnimationFrame(frame)}
requestAnimationFrame(frame);
})();
