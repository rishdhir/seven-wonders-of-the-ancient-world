/* Progressive enhancement: selected films retain native controls if setup fails. */
(()=>{
 const stamp=t=>{if(!Number.isFinite(t))return '—';return `${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,'0')}`;};
 document.querySelectorAll('[data-cinema-player]').forEach(player=>{
  const video=player.querySelector('video'),controls=player.querySelector('.cinema-controls'),toggle=player.querySelector('.cinema-toggle'),start=player.querySelector('.cinema-start'),seek=player.querySelector('.cinema-seek'),clock=player.querySelector('.cinema-clock'),audio=player.querySelector('.cinema-audio'),full=player.querySelector('.cinema-full'),message=player.querySelector('.cinema-message');
  const update=()=>{const playing=!video.paused&&!video.ended;player.classList.toggle('is-playing',playing);player.classList.toggle('is-muted',video.muted);toggle.setAttribute('aria-label',playing?'Pause video':'Play video');audio.setAttribute('aria-label',video.muted?'Unmute video':'Mute video');audio.setAttribute('aria-pressed',String(video.muted));clock.textContent=`${stamp(video.currentTime)} / ${stamp(video.duration)}`;const pct=Number.isFinite(video.duration)&&video.duration>0?video.currentTime/video.duration*100:0;seek.disabled=!Number.isFinite(video.duration);seek.value=String(pct);seek.style.setProperty('--played',`${pct}%`);seek.setAttribute('aria-valuetext',`${stamp(video.currentTime)} of ${stamp(video.duration)}`);start.setAttribute('aria-label',video.ended?'Replay film':`Play film`);};
  const play=async()=>{try{if(video.ended)video.currentTime=0;await video.play();message.hidden=true;}catch(e){message.textContent='Playback could not start. Try the video controls.';message.hidden=false;video.controls=true;controls.hidden=true;player.classList.remove('cinema-ready');}};
  toggle.onclick=()=>video.paused?play():video.pause();start.onclick=play;
  player.querySelector('.cinema-replay').onclick=()=>{video.currentTime=0;play();};
  audio.onclick=()=>{video.muted=!video.muted;};
  seek.oninput=()=>{if(Number.isFinite(video.duration))video.currentTime=Number(seek.value)/100*video.duration;update();};
  full.onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(player.requestFullscreen)await player.requestFullscreen();else if(video.webkitEnterFullscreen)video.webkitEnterFullscreen();}catch{video.controls=true;message.textContent='Use the video controls to enter full screen.';message.hidden=false;}};
  document.addEventListener('fullscreenchange',()=>full.setAttribute('aria-label',document.fullscreenElement===player?'Exit full screen video':'Full screen video'));
  player.addEventListener('keydown',e=>{if(e.target.closest('input,button,a'))return;if(e.key===' '||e.key.toLowerCase()==='k'){e.preventDefault();e.stopPropagation();video.paused?play():video.pause();}else if(e.key.toLowerCase()==='m'){e.stopPropagation();video.muted=!video.muted;}});
  ['play','pause','ended','timeupdate','loadedmetadata','durationchange','volumechange','seeked'].forEach(name=>video.addEventListener(name,update));
  video.addEventListener('error',()=>{message.textContent='The film could not load. Please reload to try again.';message.hidden=false;video.controls=true;});
  controls.hidden=false;video.controls=false;player.classList.add('cinema-ready');update();
 });
})();
