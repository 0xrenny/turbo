(()=>{const T=window.TOKEN,$=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s),r=document.documentElement.style;
for(const[k,v]of Object.entries(T.colors))r.setProperty('--'+k,v);
document.title=`${T.name} (${T.ticker})`;$('meta[name=description]').content=T.tagline;
$$('[data-name]').forEach(e=>{e.textContent=T.name;e.dataset.text=T.name});$$('[data-ticker]').forEach(e=>e.textContent=T.ticker);
$$('[data-img]').forEach(e=>e.src=T.image);$('link[rel=icon]').href=T.image;
$('[data-tagline]').textContent=T.tagline;$('[data-subtagline]').textContent=T.subtagline;$('[data-contract]').textContent=T.contract;
$$('[data-link]').forEach(e=>e.href=T.links[e.dataset.link]||'#');$('#yr').textContent=new Date().getFullYear();
const h=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.innerHTML=x;return e},esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const mq=$('#mq'),items=[...T.ticker_jokes,...T.ticker_jokes].map(j=>`<span>${esc(T.ticker)} ✦ ${esc(j)}</span>`).join('');mq.innerHTML=items+items;
T.lore.forEach(p=>$('#lore-list').append(h('p','reveal',esc(p))));
T.tokenomics.forEach(t=>$('#tk').append(h('div','card reveal',`<p class="lbl">${esc(t.label)}</p><div class="v">${esc(t.value)}</div><p>${esc(t.note)}</p>`)));
T.buy_steps.forEach((s,i)=>$('#steps').append(h('div','card reveal',`<span class="n">0${i+1}</span><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p>`)));
T.roadmap.forEach((s,i)=>$('#rm').append(h('div','it reveal'+(i==0?' done':''),`<p class="lbl">${esc(s.phase)}</p><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p>`)));
T.memes.forEach(m=>$('#mm').append(h('div','meme reveal',`<img src="${esc(T.image)}" alt=""><span>${esc(m)}</span>`)));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach((e,i)=>{e.style.transitionDelay=(i%4)*80+'ms';io.observe(e)});
const toast=m=>{const t=$('#toast');if(m)t.textContent=m;t.classList.add('on');clearTimeout(t._);t._=setTimeout(()=>t.classList.remove('on'),2200)};
$('#copy').onclick=async()=>{if(T.contract==='TBA'){toast('Contract is TBA. Patience is also a strategy.');return}
try{await navigator.clipboard.writeText(T.contract)}catch{const a=h('textarea');a.value=T.contract;document.body.append(a);a.select();document.execCommand('copy');a.remove()}toast('Copied. Now don\'t paste it into a scam site.')};
// fake speedometer
let sp=0;setInterval(()=>{sp=Math.max(0,sp*.9+(Math.random()-.5)*.02);$('#spd').textContent=sp.toFixed(2)},400);
// hero parallax tilt
const hi=$('#hero-img');addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;hi.style.translate=`${x*24}px ${y*24}px`});
hi.onclick=()=>{hi.animate([{transform:'translateY(0)'},{transform:'translateY(-120px) rotate(20deg)'},{transform:'translateY(0)'}],{duration:700,easing:'cubic-bezier(.3,1.6,.5,1)'});toast('Liftoff aborted. Frog says "nice try".')};
// turbo button
let n=0,heat=0;const btn=$('#turbo');
btn.onclick=e=>{n++;heat=Math.min(100,heat+7);sp+=n;$('#clicks').textContent=n;$('#mc').textContent='$'+Math.round(69*Math.pow(1.35,Math.min(n,60))).toLocaleString('en-US');
$('#bar').style.width=heat+'%';$('#quip').textContent=n%10==0?`${n} clicks. Still on the launchpad.`:T.toy_quips[Math.floor(Math.random()*T.toy_quips.length)];
const b=btn.getBoundingClientRect();for(let i=0;i<6;i++){const p=h('img','pop');p.src=T.image;p.style.left=b.left+b.width/2-22+'px';p.style.top=b.top+b.height/2-22+'px';
const a=Math.random()*Math.PI*2,d=120+Math.random()*160;p.style.setProperty('--dx',Math.cos(a)*d+'px');p.style.setProperty('--dy',Math.sin(a)*d+'px');p.style.setProperty('--r',(Math.random()*720-360)+'deg');document.body.append(p);setTimeout(()=>p.remove(),1100)}
if(heat>=100){toast('OVERHEATED. Even the frog needs a break.');heat=30}};
setInterval(()=>{heat=Math.max(0,heat-2);$('#bar').style.width=heat+'%'},300);
// starfield (warp speed with scroll)
const c=$('#stars'),x=c.getContext('2d');let W,H,S=[];const rs=()=>{W=c.width=innerWidth;H=c.height=innerHeight;S=Array.from({length:Math.min(260,W/5)},()=>({x:Math.random()*W-W/2,y:Math.random()*H-H/2,z:Math.random()*W}))};rs();addEventListener('resize',rs);
let ls=scrollY,boost=0;const red=matchMedia('(prefers-reduced-motion:reduce)').matches;
(function f(){boost=boost*.92+Math.abs(scrollY-ls)*.05;ls=scrollY;x.fillStyle='rgba(7,7,11,.35)';x.fillRect(0,0,W,H);x.fillStyle='#fff';
for(const s of S){s.z-=red?0:(1.2+boost);if(s.z<1){s.z=W;s.x=Math.random()*W-W/2;s.y=Math.random()*H-H/2}const k=128/s.z,px=s.x*k+W/2,py=s.y*k+H/2,sz=Math.max(.3,1.6-s.z/W*1.6);x.globalAlpha=1-s.z/W;x.fillRect(px,py,sz,sz)}
x.globalAlpha=1;requestAnimationFrame(f)})();
})();
