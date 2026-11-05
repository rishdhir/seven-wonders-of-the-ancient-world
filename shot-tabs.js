/* In-slide shot tabs: Anatomy navigation with Panda's clear glass treatment. */
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 document.querySelectorAll('.shot-explorer').forEach(explorer=>{
  const rail=explorer.querySelector('.shot-tabs'),lens=rail.querySelector('.shot-tab-lens'),buttons=[...rail.querySelectorAll('[role=tab]')],panels=[...explorer.querySelectorAll('.shot-panel')],slide=explorer.closest('.slide');
  let selected=0;
  function align(){const b=buttons[selected];lens.style.width=b.offsetWidth+'px';lens.style.height=b.offsetHeight+'px';lens.style.transform=`translate(${b.offsetLeft}px,${b.offsetTop}px)`;}
  function select(n,animate=true){selected=n;panels.forEach((p,i)=>{if(i!==n)p.querySelectorAll('video,audio').forEach(v=>v.pause());p.hidden=i!==n;buttons[i].setAttribute('aria-selected',String(i===n));buttons[i].tabIndex=i===n?0:-1;});slide.querySelector('.slide-heading h2').textContent=panels[n].dataset.title;align();if(animate&&!reduced.matches)panels[n].animate([{opacity:.2,transform:'translateY(7px)'},{opacity:1,transform:'none'}],{duration:230,easing:'cubic-bezier(.16,1,.3,1)'});}
  buttons.forEach((b,i)=>{b.onclick=()=>select(i);b.onkeydown=e=>{let n=i;if(['ArrowRight','ArrowDown'].includes(e.key))n=(i+1)%buttons.length;else if(['ArrowLeft','ArrowUp'].includes(e.key))n=(i+buttons.length-1)%buttons.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=buttons.length-1;else return;e.preventDefault();e.stopPropagation();select(n);buttons[n].focus();};});
  new ResizeObserver(align).observe(rail);select(0,false);
 });
 // Clear refraction belongs on the chrome; the films are never filter targets.
 let surfaces=[];
 const transparency=matchMedia('(prefers-reduced-transparency:reduce)'),contrast=matchMedia('(prefers-contrast:more)');
 function configure(){surfaces.forEach(g=>g.destroy());surfaces=[];if(!window.liquidGlass||transparency.matches||contrast.matches||reduced.matches)return;document.querySelectorAll('.shot-tabs,.shot-tab-lens,.cinema-controls,.cinema-start').forEach(el=>{surfaces.push(window.liquidGlass(el,{scale:el.classList.contains('shot-tabs')?-45:-24,chroma:2,border:.055,mapBlur:7,blur:0,saturate:1.06,fallbackBlur:0}));});}
 [transparency,contrast,reduced].forEach(m=>m.addEventListener('change',configure));configure();
})();
