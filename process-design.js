/* Local process redesign. Existing research, prompts and selected media stay intact. */
(()=>{
 const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
 const make=(tag,cls)=>{const e=document.createElement(tag);e.className=cls;return e;};
 const icons=[`<path d="M3 5q5-2 9 1 4-3 9-1v15q-5-2-9 1-4-3-9-1Z M12 6v15"/>`,`<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6m-14-11 2 2 4-4"/>`,`<path d="M4 5h16M4 12h10M4 19h6m4-1 6-6 3 3-6 6-4 1Z"/>`,`<rect x="3" y="4" width="18" height="16" rx="3"/><path d="m10 9 6 3-6 3Z"/>`,`<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>`,`<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 9h20M8 9v11M15 9v11"/>`];
 const svg=i=>`<svg viewBox="0 0 24 24" aria-hidden="true">${icons[i]}</svg>`;
 const slide5=$('#slide-5');slide5.classList.add('process-glass','process-overview');
 const process=$('.process',slide5),cards=$$('.card',process),wall=make('div','process-wall');
 wall.innerHTML=`<div class="process-visual"><img alt="" src="assets/pose.jpg"><div class="process-visual-label"></div></div><div class="process-step-copy"></div>`;
 process.before(wall);process.classList.add('process-rail');process.setAttribute('role','tablist');process.setAttribute('aria-label','Production process');
 const assets=['pose.jpg','rhodes-location-map.png','colossus-2.jpg','underwater.jpg','gardens.jpg','edit.mp4.jpg'];
 const tabs=cards.map((c,i)=>{const b=make('button','process-step');b.innerHTML=svg(i)+c.innerHTML;b.setAttribute('role','tab');b.id=`process-step-${i}`;b.setAttribute('aria-controls','process-stage');c.replaceWith(b);return b;});
 wall.id='process-stage';wall.setAttribute('role','tabpanel');
 function choose(i){tabs.forEach((b,j)=>{b.setAttribute('aria-selected',String(i===j));b.tabIndex=i===j?0:-1;});$('.process-visual img',wall).src='assets/'+assets[i];$('.process-visual-label',wall).textContent=`0${i+1} / 06`;$('.process-step-copy',wall).innerHTML=svg(i)+`<span class="eyebrow">0${i+1} / 06</span>`+cards[i].querySelector('h3').outerHTML+cards[i].querySelector('p').outerHTML;wall.setAttribute('aria-labelledby',tabs[i].id);}
 tabs.forEach((b,i)=>{b.onclick=()=>choose(i);b.onkeydown=e=>{let j=i;if(e.key==='ArrowRight')j=(i+1)%6;else if(e.key==='ArrowLeft')j=(i+5)%6;else if(e.key==='Home')j=0;else if(e.key==='End')j=5;else return;e.preventDefault();e.stopPropagation();choose(j);tabs[j].focus();};});choose(0);
})();
(()=>{
 const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
 const make=(tag,cls)=>{const e=document.createElement(tag);e.className=cls;return e;};
 // Reuse the selected-shot player's exact controls. Keep original video elements and listeners.
 const template=$('[data-cinema-player]');
 for(let n=6;n<=15;n++)$('#slide-'+n).classList.add('process-glass');
 function tabs(container,panels,labels,key){
  const rail=make('div','shot-tabs process-tabs'),lens=make('span','shot-tab-lens');rail.append(lens);rail.setAttribute('role','tablist');rail.setAttribute('aria-label',labels.join(', '));
  const buttons=panels.map((p,i)=>{const b=make('button','');b.textContent=labels[i];b.id=key+'-tab-'+i;b.setAttribute('role','tab');b.setAttribute('aria-controls',key+'-panel-'+i);p.id=key+'-panel-'+i;p.setAttribute('role','tabpanel');p.setAttribute('aria-labelledby',b.id);rail.append(b);return b;});
  let selected=0;function align(){const b=buttons[selected];lens.style.width=b.offsetWidth+'px';lens.style.height=b.offsetHeight+'px';lens.style.transform=`translate(${b.offsetLeft}px,${b.offsetTop}px)`;}
  function select(i){selected=i;panels.forEach((p,j)=>{p.hidden=i!==j;buttons[j].setAttribute('aria-selected',String(i===j));buttons[j].tabIndex=i===j?0:-1;});align();}
  buttons.forEach((b,i)=>{b.onclick=()=>select(i);b.onkeydown=e=>{let j=i;if(e.key==='ArrowRight')j=(i+1)%buttons.length;else if(e.key==='ArrowLeft')j=(i+buttons.length-1)%buttons.length;else if(e.key==='Home')j=0;else if(e.key==='End')j=buttons.length-1;else return;e.preventDefault();e.stopPropagation();select(j);buttons[j].focus();};});
  container.prepend(rail);new ResizeObserver(align).observe(rail);select(0);
 }
 [8,12].forEach(n=>{const s=$('#slide-'+n),chain=$('.decision-chain',s),result=$('.prompt-result',s);s.classList.add('prompt-workbench');const desk=make('div','prompt-desk'),inputs=make('div','prompt-inputs');chain.before(desk);desk.append(inputs,result);inputs.append(chain);$$(':scope > .flow-join',chain).forEach(e=>e.remove());$(':scope > .flow-join',result)?.remove();const panels=$$('.decision-node',chain);tabs(inputs,panels,['References','Decisions','Prompt'],'prompt-'+n);});
 [9,13].forEach(n=>{const s=$('#slide-'+n),pair=$('.two',s),panels=$$('figure',pair),copy=$('.takeaway',s);s.classList.add('state-viewer');const desk=make('div','state-desk'),viewer=make('div','state-picture');pair.before(desk);desk.append(viewer,copy);viewer.append(pair);tabs(viewer,panels,n===9?['Above water','Underwater']:['Ruined state','Living garden'],'state-'+n);});
 [7,11].forEach(n=>{const s=$('#slide-'+n);s.classList.add('evidence-gallery');$('.three,.two',s).classList.add('evidence-images');});
 const source=$('#slide-6');source.classList.add('source-library');$('.book',source).insertAdjacentHTML('afterbegin','<span class="book-spine" aria-hidden="true"></span>');
 [10,14,15].forEach(n=>{const s=$('#slide-'+n);s.classList.add('process-cinema');$$('figure',s).filter(f=>$('video',f)).forEach(f=>{const video=$('video',f),caption=$('figcaption',f)?.textContent||'',player=template.cloneNode(true);player.style.setProperty('--shot-tint','190,209,225');player.style.setProperty('--scene',`url("${video.poster}")`);$('.cinema-screen video',player).replaceWith(video);$('.cinema-caption',player).textContent=caption;$('.cinema-topline',player).innerHTML='<span class="cinema-dot"></span><span>'+ (n===15?'THE COMPLETED EXCERPT':'SELECTED VIDEO')+'</span><span class="cinema-format">1080P</span>';f.replaceChildren(player);});});
 $('#slide-15').classList.add('finish-workspace');
 // Prompt text stays verbatim, in a deliberately bounded reading pane.
 $$('.process-glass details').forEach(d=>{d.classList.add('prompt-drawer');d.addEventListener('toggle',()=>{if(d.open)d.scrollIntoView({block:'nearest',behavior:'instant'});});});
})();
(()=>{
 // Fit the video chrome as well as the picture on desktop-sized slides.
 const fit=()=>document.querySelectorAll('.process-cinema.video-flow:not([hidden])').forEach(s=>{const f=s.querySelector('.flow-result'),p=f.querySelector('.cinema-player'),screen=p.querySelector('.cinema-screen');if(innerWidth<=850){f.style.width='';return;}const available=s.getBoundingClientRect().bottom-f.getBoundingClientRect().top-14;const chrome=p.getBoundingClientRect().height-screen.getBoundingClientRect().height;f.style.width=`${Math.max(420,Math.min(760,s.clientWidth,(available-chrome)*16/9+22))}px`;});
 new MutationObserver(fit).observe(document.getElementById('stage'),{subtree:true,attributes:true,attributeFilter:['hidden']});addEventListener('resize',fit);document.fonts.ready.then(fit);fit();
 // Inspect the actual source images at full size without leaving the sequence.
 const dialog=document.createElement('dialog');dialog.className='research-lightbox';dialog.setAttribute('aria-label','Reference image');dialog.innerHTML='<button class="research-close" aria-label="Close reference image">×</button><figure><img alt=""><figcaption></figcaption></figure>';document.body.append(dialog);let trigger;
 const close=()=>{dialog.close();trigger?.focus();};dialog.querySelector('button').onclick=close;dialog.addEventListener('cancel',()=>trigger?.focus());dialog.addEventListener('click',e=>{if(e.target===dialog)close();});
 document.querySelectorAll('.evidence-images figure').forEach(f=>{const image=f.querySelector('img'),button=document.createElement('button');button.className='reference-expand';button.setAttribute('aria-label','Enlarge reference: '+image.alt);image.before(button);button.append(image);const badge=document.createElement('span');badge.textContent='⤢';badge.setAttribute('aria-hidden','true');button.append(badge);button.onclick=()=>{trigger=button;const target=dialog.querySelector('img');target.src=image.src;target.alt=image.alt;dialog.querySelector('figcaption').textContent=f.querySelector('figcaption').textContent;dialog.showModal();};});
})();

// Original cover capture, framed to the cover itself; the source image is preserved.
(()=>{const book=document.querySelector('#slide-6 .book'),copy=document.createElement('div');copy.className='book-copy';[...book.children].filter(e=>!e.classList.contains('book-spine')).forEach(e=>copy.append(e));const cover=document.createElement('div');cover.className='book-cover';cover.innerHTML='<img src="assets/book-cover-source.jpg" alt="Cover of The Seven Wonders of the Ancient World: Science, Engineering and Technology by Michael Denis Higgins" loading="lazy">';book.append(cover,copy);})();
