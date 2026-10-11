const body=document.body;
const themeToggle=document.getElementById('themeToggle');
if(localStorage.getItem('matin-theme')==='light')body.classList.add('light');
themeToggle.addEventListener('click',()=>{body.classList.toggle('light');localStorage.setItem('matin-theme',body.classList.contains('light')?'light':'dark')});
const menuToggle=document.getElementById('menuToggle'),navLinks=document.getElementById('navLinks');
menuToggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.textContent=open?'✕':'☰'});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰'}));
let activeFilter='all';
const cards=[...document.querySelectorAll('.article')],searchInput=document.getElementById('searchInput');
function filterCards(){const q=searchInput.value.toLowerCase().trim();let shown=0;cards.forEach(card=>{const ok=(activeFilter==='all'||card.dataset.category===activeFilter)&&card.dataset.title.toLowerCase().includes(q);card.hidden=!ok;if(ok)shown++});let empty=document.querySelector('.empty');if(!shown&&!empty){empty=document.createElement('div');empty.className='empty';empty.textContent='No notes match that search yet.';document.getElementById('articleGrid').appendChild(empty)}else if(shown&&empty)empty.remove()}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');activeFilter=btn.dataset.filter;filterCards()}));
searchInput.addEventListener('input',filterCards);
document.getElementById('year').textContent=new Date().getFullYear();

// Scroll progress, reveal animations, gallery lightbox and on-demand video.
const progressEl=document.getElementById('scrollProgress');
const updateProgress=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;progressEl.style.width=(max>0?window.scrollY/max*100:0)+'%'};
window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.section-head,.panel,.fact,.article,.project,.now-card,.contact,.visual-feature,.visual-tile').forEach((el,index)=>{el.classList.add('reveal');el.style.transitionDelay=(index%4)*55+'ms';revealObserver.observe(el)});
const mediaModal=document.createElement('div');mediaModal.id='mediaModal';mediaModal.setAttribute('role','dialog');mediaModal.setAttribute('aria-modal','true');mediaModal.setAttribute('aria-label','Image and video viewer');
mediaModal.innerHTML='<div class="media-modal-box"><button class="media-modal-close" aria-label="Close viewer"><i class="fa-solid fa-xmark"></i></button><div class="media-modal-content"></div><div class="media-modal-caption">MATIN.DEV / VISUAL PLAYGROUND</div></div>';document.body.appendChild(mediaModal);
const mediaContent=mediaModal.querySelector('.media-modal-content');
function showMedia(html){mediaContent.innerHTML=html;mediaModal.classList.add('open');document.body.style.overflow='hidden';mediaModal.querySelector('.media-modal-close').focus()}
function hideMedia(){mediaModal.classList.remove('open');document.body.style.overflow='';mediaContent.innerHTML=''}
mediaModal.querySelector('.media-modal-close').addEventListener('click',hideMedia);
mediaModal.addEventListener('click',e=>{if(e.target===mediaModal)hideMedia()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')hideMedia()});
document.querySelectorAll('.visual-tile').forEach(tile=>tile.addEventListener('click',()=>showMedia('<img src="'+tile.dataset.image+'" alt="'+tile.getAttribute('aria-label')+'">')));
document.getElementById('openVideo').addEventListener('click',()=>showMedia('<div style="padding:10px 5px 16px"><div style="font:11px DM Mono,monospace;color:#a9e8e6;letter-spacing:.1em;margin-bottom:10px">FOCUS MODE / EXTERNAL VIDEO</div><h3 style="font-size:25px;letter-spacing:-.05em;margin:0 0 10px;color:#f3f5ff">A little inspiration</h3><p style="color:#aab2cc;font-size:13px;line-height:1.8;margin-bottom:18px">Load the external player only when you are ready.</p><button class="btn primary" id="loadInspirationVideo"><i class="fa-brands fa-youtube"></i> Load video</button><div id="videoSlot" style="margin-top:18px"></div></div>'));
mediaModal.addEventListener('click',e=>{if(e.target.closest('#loadInspirationVideo')){document.getElementById('videoSlot').innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?autoplay=1" title="Focus music video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';e.target.closest('button').remove()}});
const navAnchors=[...document.querySelectorAll('#navLinks a')];
const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)navAnchors.forEach(a=>a.classList.toggle('nav-active',a.getAttribute('href')==='#'+entry.target.id))}),{rootMargin:'-35% 0px -55% 0px'});
document.querySelectorAll('main section[id]').forEach(section=>navObserver.observe(section));


/* Visitor badge demo: local-only, no passwords and no remote account. */
const visitorForm=document.getElementById('visitorForm');
const visitorName=document.getElementById('visitorName');
const profileResult=document.getElementById('profileResult');
try{const savedVisitor=localStorage.getItem('matin-visitor-name');if(savedVisitor){visitorName.value=savedVisitor;profileResult.textContent='Welcome back, '+savedVisitor+'. Your local visitor badge is ready.';profileResult.classList.add('show')}}catch(e){}
visitorForm.addEventListener('submit',event=>{event.preventDefault();const name=visitorName.value.trim();if(!name){visitorName.focus();return}try{localStorage.setItem('matin-visitor-name',name)}catch(e){}profileResult.textContent='Badge created for '+name+'. This profile exists only in this browser.';profileResult.classList.add('show')});
