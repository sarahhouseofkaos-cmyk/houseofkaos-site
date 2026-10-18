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

/* Steps 5-7: nav scroll state, FAQ one-at-a-time, enquiry pills */
(function(){
  var nav=document.querySelector('nav'),hero=document.getElementById('top');
  function onS(){if(nav)nav.classList.toggle('scrolled',window.scrollY>(hero?hero.offsetHeight-120:300));}
  window.addEventListener('scroll',onS,{passive:true});onS();
  var items=[].slice.call(document.querySelectorAll('.faq-item'));
  items.forEach(function(d){d.addEventListener('toggle',function(){if(d.open)items.forEach(function(o){if(o!==d)o.open=false;});});});
  var sel=document.getElementById('enquiry-type');
  if(sel){
    var wrap=document.createElement('div');wrap.className='pills';wrap.setAttribute('role','radiogroup');wrap.setAttribute('aria-label','Enquiry type');
    var btns=[];
    function set(v){sel.value=v;btns.forEach(function(b){var on=b.getAttribute('data-v')===v;b.classList.toggle('on',on);b.setAttribute('aria-checked',on?'true':'false');});}
    [].slice.call(sel.options).forEach(function(o){
      if(!o.value)return;
      var b=document.createElement('button');b.type='button';b.className='pill';b.setAttribute('role','radio');b.setAttribute('data-v',o.value);
      b.textContent=o.value==='Ticket / Booking Question'?'Tickets & Booking':o.value;
      b.addEventListener('click',function(){set(o.value);});
      wrap.appendChild(b);btns.push(b);
    });
    sel.parentNode.classList.add('has-pills');sel.parentNode.appendChild(wrap);
    set('General Enquiry');
    document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-enquiry]');if(a)set(a.getAttribute('data-enquiry'));});
  }
})();
