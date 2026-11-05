// Panda palette applied to the whole presentation surface, including controls.
(()=>{
 const themes=["graphite", "midnight", "graphite", "midnight", "teal", "midnight", "teal", "warm", "teal", "midnight", "graphite", "graphite", "graphite", "graphite", "graphite"];
 function sync(){const slide=document.querySelector('.slide:not([hidden])');if(!slide)return;const n=Number(slide.id.replace('slide-',''))-1;const activeTab=slide.querySelector('.shot-panel:not([hidden])');document.body.dataset.theme=activeTab?(activeTab.id==='shot-panel-lighthouse'?'midnight':'plum'):(themes[n]||'graphite');}
 new MutationObserver(sync).observe(document.getElementById('stage'),{subtree:true,attributes:true,attributeFilter:['hidden']});sync();
})();
