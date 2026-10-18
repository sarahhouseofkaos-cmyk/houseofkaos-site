/* House of Kaos - scroll reveal. Content is visible unless this script runs. */
(function(d){
  var r=d.documentElement;
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  r.classList.add('js');
  var SEL='main h2,.kicker,.section-lede,.event,.legacy-card,.ptype,.faq-item,.about-text,.directors,.performers-cta,.contact-wrap,.enquiry-form,section h2';
  function go(){
    var els=[].filter.call(d.querySelectorAll(SEL),function(e){return !e.closest('nav,.hero')&&!e.matches('.btn')});
    var io=new IntersectionObserver(function(es){
      var n=0;
      es.forEach(function(x){
        if(!x.isIntersecting)return;
        x.target.style.setProperty('--d',Math.min(n++,5)*90+'ms');
        x.target.classList.add('in');io.unobserve(x.target);
      });
    },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(e){e.classList.add('rv');io.observe(e)});
    setTimeout(function(){els.forEach(function(e){e.classList.add('in')})},6000); /* safety net */
  }
  d.readyState==='loading'?d.addEventListener('DOMContentLoaded',go):go();
})(document);

/* Step 4: gentle parallax on Evenings Past photos (desktop, motion allowed) */
(function(){
  var mq=window.matchMedia('(min-width:861px) and (prefers-reduced-motion:no-preference)');
  var imgs=[],ticking=false;
  function update(){
    ticking=false;
    var vh=window.innerHeight;
    imgs.forEach(function(img){
      var r=img.parentNode.getBoundingClientRect();
      if(r.bottom<-100||r.top>vh+100)return;
      var p=(r.top+r.height/2-vh/2)/(vh/2+r.height/2);
      p=Math.max(-1,Math.min(1,p));
      img.style.setProperty('--py',(p*-28).toFixed(1)+'px');
    });
  }
  function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(update);}}
  function init(){
    imgs=[].slice.call(document.querySelectorAll('#legacy .legacy-photo img'));
    if(!imgs.length)return;
    function toggle(){
      window.removeEventListener('scroll',onScroll);
      window.removeEventListener('resize',onScroll);
      if(mq.matches){
        window.addEventListener('scroll',onScroll,{passive:true});
        window.addEventListener('resize',onScroll,{passive:true});
        update();
      }else{imgs.forEach(function(i){i.style.removeProperty('--py');});}
    }
    if(mq.addEventListener)mq.addEventListener('change',toggle);
    toggle();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
