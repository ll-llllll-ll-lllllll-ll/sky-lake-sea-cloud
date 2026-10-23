/* The Instrument: a Folly-like reading room, without a score.
   Add named works to WORKS; assign hero src only after images arrive. */
(function () {
  'use strict';
  if (typeof renderRoom!=='function'||typeof state==='undefined') return;
  var WORKS=[{
    title:{zh:'时间晶体',en:'Time Crystal',ja:'時間結晶'},
    prefix:{zh:'其一',en:'Part One',ja:'其の一'},
    progress:'Work in progress since 2023',
    hero:[
      {title:{zh:'效果图',en:'Visualisation',ja:'完成予想図'},src:null},
      {title:{zh:'设计图',en:'Design Drawing',ja:'設計図'},src:null}
    ],
    gallery:[
      {src:'./works/the-instrument/img3-blur.jpg',title:{zh:'试作记录 01',en:'Instrument Study 01',ja:'試作記録 01'}},
      {src:'./works/the-instrument/img4-blur.jpg',title:{zh:'试作记录 02',en:'Instrument Study 02',ja:'試作記録 02'}}
    ]
  }];
  var I18N={
    zh:{about:'关于 The Instrument',archive:'效果图集',hint:'向右翻阅散落的瞬间',wait:'图片待上传',view:'查看图像',close:'退出观看'},
    en:{about:'About The Instrument',archive:'Visual Studies',hint:'Move right through scattered moments',wait:'Image to be added',view:'View image',close:'Close viewer'},
    ja:{about:'The Instrument について',archive:'イメージ集',hint:'右へ進み、散らばった瞬間をたどる',wait:'画像は後日追加',view:'画像を見る',close:'閉じる'}
  };
  var active=null;
  function lng(){return I18N[state.lang]?state.lang:'zh';}
  function L(obj){return typeof obj==='string'?obj:(obj?(obj[lng()]||obj.zh||obj.en||''):'');}
  function T(k){return I18N[lng()][k];}
  function E(x){return escapeHtml(String(x==null?'':x));}
  function N(i){return String(i+1).padStart(2,'0');}
  function title(w){return L(w.prefix)+' · '+L(w.title);}
  function renderHero(w,image,i){
    var name=L(image.title);
    var visual=image.src?
      '<img src="'+E(image.src)+'" alt="'+E(L(w.title)+' · '+name)+'" loading="lazy" decoding="async">':
      '<span class="ins-await"><span>'+E(name)+'</span><small>'+E(T('wait'))+'</small></span>';
    return '<figure class="ins-hero"><div class="ins-hero-visual">'+visual+'</div>'+
      '<figcaption><span>'+N(i)+'</span><span>'+E(name)+'</span></figcaption></figure>';
  }
  function renderCard(w,photo,i){
    return '<li class="ins-card"><button type="button" class="ins-card-button" data-ins-open="'+i+
      '" aria-label="'+E(T('view')+' · '+L(photo.title))+'">'+
      '<span class="ins-card-image"><img src="'+E(photo.src)+'" alt="'+E(L(w.title)+' · '+L(photo.title))+
      '" loading="lazy" decoding="async"><span class="ins-arrow" aria-hidden="true">↗</span></span>'+
      '<span class="ins-card-copy"><span class="ins-card-number">'+N(i)+' <small>/ '+N(w.gallery.length-1)+'</small></span>'+
      '<span class="ins-card-name">'+E(L(photo.title))+'</span></span></button></li>';
  }
  function renderWork(w,i){
    return '<section class="ins-work" id="ins-work-'+(i+1)+'" data-ins-work="'+i+'">'+
      '<header class="ins-work-title"><h2>'+E(title(w))+'</h2><span>2023—</span></header>'+
      '<div class="ins-hero-grid">'+w.hero.map(function(x,j){return renderHero(w,x,j);}).join('')+'</div>'+
      '<p class="ins-work-progress">'+E(w.progress)+'</p>'+
      '<section class="ins-gallery" aria-label="'+E(T('archive'))+'">'+
        '<div class="ins-gallery-heading"><h3>'+E(T('archive'))+'</h3><p>'+E(T('hint'))+'</p></div>'+
        '<div class="ins-gallery-rail" data-ins-rail="'+i+'" tabindex="0" aria-label="'+E(T('archive'))+'">'+
          '<ol class="ins-gallery-strip">'+w.gallery.map(function(p,j){return renderCard(w,p,j);}).join('')+'</ol>'+
        '</div>'+
        (w.gallery.length>1?'<div class="ins-gallery-navigation"><input data-ins-slider="'+i+
          '" type="range" min="0" max="1000" value="0" step="1" aria-label="'+E(T('archive'))+'"></div>':'')+
      '</section></section>';
  }
  function renderInstrument(item){
    return '<section class="room-view ins-room" data-ins-room>'+
      '<header class="room-head"><button type="button" data-action="home" class="room-back">← '+
        E(labels[lng()].back)+'</button><p>'+E(labels[lng()].works)+' / '+E(L(item.title))+'</p>'+languageSwitch()+'</header>'+
      '<div class="ins-page"><header class="ins-page-title"><h1>'+E(L(item.title))+'</h1></header>'+
      '<section class="ins-about"><h2>'+E(T('about'))+'</h2><p>'+E(L(item.intro))+'</p>'+
      '<nav class="ins-contents"><ol>'+
        WORKS.map(function(w,i){return '<li><button type="button" data-ins-jump="'+i+'">'+E(title(w))+
          '<span>（'+E(w.progress)+'）</span></button></li>';}).join('')+
      '</ol></nav></section>'+WORKS.map(renderWork).join('')+'</div>'+
      '<div class="ins-viewer" data-ins-viewer role="dialog" aria-modal="true" hidden>'+
        '<button class="ins-viewer-scrim" type="button" data-ins-close aria-label="'+E(T('close'))+'"></button>'+
        '<div class="ins-viewer-stage"><img class="ins-viewer-image" data-ins-full alt="">'+
          '<div class="ins-viewer-copy"><span data-ins-count></span><span data-ins-name></span></div></div>'+
      '</div></section>';
  }
  var previous=renderRoom;
  renderRoom=function(item){return item&&item.slug==='the-instrument'?renderInstrument(item):previous(item);};
  function close(){
    if(!active)return;
    var trigger=active.trigger,viewer=active.viewer;
    viewer.hidden=true;
    viewer.querySelector('[data-ins-full]').removeAttribute('src');
    document.body.classList.remove('ins-modal-open');
    active=null;
    if(trigger&&trigger.isConnected)trigger.focus({preventScroll:true});
  }
  function open(room,si,idx,trigger){
    var w=WORKS[si],photo=w&&w.gallery[idx];
    if(!photo)return;
    var viewer=room.querySelector('[data-ins-viewer]');
    if(!viewer)return;
    active={room:room,viewer:viewer,si:si,idx:idx,trigger:trigger};
    var img=viewer.querySelector('[data-ins-full]');
    img.src=photo.src;img.alt=L(w.title)+' · '+L(photo.title);
    viewer.querySelector('[data-ins-count]').innerHTML=N(idx)+' <small>/ '+N(w.gallery.length-1)+'</small>';
    viewer.querySelector('[data-ins-name]').textContent=L(photo.title);
    viewer.hidden=false;
    document.body.classList.add('ins-modal-open');
    viewer.querySelector('[data-ins-close]').focus({preventScroll:true});
  }
  function step(dir){
    if(!active)return;
    var a=active,n=WORKS[a.si].gallery.length,k=a.idx+dir;
    if(k>=0&&k<n)open(a.room,a.si,k,a.trigger);
  }
  function wireGallery(room,si){
    var rail=room.querySelector('[data-ins-rail="'+si+'"]');
    var slider=room.querySelector('[data-ins-slider="'+si+'"]');
    if(!rail)return;
    var drag=null,justDragged=0,frame=0;
    function sync(){
      frame=0;
      if(!slider||document.activeElement===slider)return;
      var max=Math.max(0,rail.scrollWidth-rail.clientWidth);
      slider.value=String(max?Math.round(1000*rail.scrollLeft/max):0);
    }
    rail.addEventListener('scroll',function(){if(!frame)frame=requestAnimationFrame(sync);},{passive:true});
    rail.addEventListener('wheel',function(e){
      if(e.shiftKey&&Math.abs(e.deltaY)>Math.abs(e.deltaX)){
        e.preventDefault();rail.scrollLeft+=e.deltaY*(e.deltaMode===1?22:1);
      }
    },{passive:false});
    rail.addEventListener('pointerdown',function(e){
      if(e.pointerType==='mouse'&&e.button===0)drag={id:e.pointerId,x:e.clientX,start:rail.scrollLeft,moved:false};
    });
    rail.addEventListener('pointermove',function(e){
      if(!drag||e.pointerId!==drag.id)return;
      var dx=e.clientX-drag.x;
      if(!drag.moved&&Math.abs(dx)>6){
        drag.moved=true;rail.classList.add('is-dragging');
        try{rail.setPointerCapture(e.pointerId);}catch(_){}
      }
      if(drag.moved){rail.scrollLeft=drag.start-dx;e.preventDefault();}
    });
    function release(e){
      if(!drag||(e&&e.pointerId!=null&&e.pointerId!==drag.id))return;
      if(drag.moved)justDragged=performance.now()+210;
      drag=null;rail.classList.remove('is-dragging');
    }
    rail.addEventListener('pointerup',release);
    rail.addEventListener('pointercancel',release);
    rail.addEventListener('lostpointercapture',release);
    rail.addEventListener('click',function(e){
      if(performance.now()<justDragged){e.preventDefault();e.stopPropagation();}
    },true);
    if(slider)slider.addEventListener('input',function(){
      rail.scrollLeft=Math.max(0,rail.scrollWidth-rail.clientWidth)*Number(slider.value)/1000;
    });
    rail.addEventListener('keydown',function(e){
      if(e.target!==rail)return;
      if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
        e.preventDefault();rail.scrollBy({left:rail.clientWidth*.55*(e.key==='ArrowRight'?1:-1),behavior:'smooth'});
      }
    });
    sync();
  }
  function bind(room){
    if(room.dataset.insBound)return;
    room.dataset.insBound='1';
    room.addEventListener('click',function(e){
      var jump=e.target.closest('[data-ins-jump]');
      if(jump){
        e.preventDefault();
        var target=room.querySelector('[data-ins-work="'+Number(jump.dataset.insJump)+'"]');
        if(target)target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
        return;
      }
      if(e.target.closest('[data-ins-close]')){close();return;}
      var button=e.target.closest('[data-ins-open]');
      if(button){
        var work=button.closest('[data-ins-work]');
        if(work)open(room,Number(work.dataset.insWork),Number(button.dataset.insOpen),button);
      }
    });
    WORKS.forEach(function(_,i){wireGallery(room,i);});
  }
  function mount(){
    var room=document.querySelector('[data-ins-room]');
    if(active&&(!room||active.room!==room))close();
    if(room)bind(room);
  }
  var app=document.getElementById('app');
  if(app&&'MutationObserver' in window)new MutationObserver(mount).observe(app,{childList:true,subtree:false});
  document.addEventListener('keydown',function(e){
    if(!active)return;
    if(e.key==='Escape'){close();e.preventDefault();e.stopImmediatePropagation();}
    if(e.key==='ArrowRight'){step(1);e.preventDefault();}
    if(e.key==='ArrowLeft'){step(-1);e.preventDefault();}
  },true);
  mount();
})();