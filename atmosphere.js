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
