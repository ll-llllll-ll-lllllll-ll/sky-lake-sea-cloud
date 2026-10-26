/* The Instrument: a Folly-like reading room, without a score.
   Add named works to WORKS; assign hero src only after images arrive. */
(function () {
  'use strict';
  if (typeof renderRoom!=='function'||typeof state==='undefined') return;
  var WORKS=[{
    title:{zh:'时间晶体',en:'Time Crystal',ja:'時間結晶'},
    prefix:{zh:'其一',en:'Part One',ja:'其の一'},
    progress:'Work in progress since 2023',
    year:'2023—',
    hero:[
      {title:{zh:'设计图',en:'Design Drawing',ja:'設計図'},year:'2023',src:'./works/the-instrument/the-instrument-1/ion trap.png'},
      {title:{zh:'渲染图',en:'Rendering',ja:'レンダリング'},year:'2023',src:'./works/the-instrument/the-instrument-1/ion trap-render.png'}
    ],
    gallery:[
      {src:'./works/the-instrument/the-instrument-1/ruins-1.jpg',title:{zh:'遗构 01',en:'Ruins 01',ja:'遺構 01'}},
      {src:'./works/the-instrument/the-instrument-1/ruins-2.jpg',title:{zh:'遗构 02',en:'Ruins 02',ja:'遺構 02'}},
      {src:'./works/the-instrument/the-instrument-1/foundation.jpg',title:{zh:'基座',en:'Foundation',ja:'基礎'}},
      {src:'./works/the-instrument/the-instrument-1/sphere.jpg',title:{zh:'球体',en:'Sphere',ja:'球体'}},
      {src:'./works/the-instrument/the-instrument-1/accelerator.jpg',title:{zh:'加速器',en:'Accelerator',ja:'加速器'}},
      {src:'./works/the-instrument/the-instrument-1/satellites.jpg',title:{zh:'卫星',en:'Satellites',ja:'衛星'}},
      {src:'./works/the-instrument/the-instrument-1/core.jpg',title:{zh:'核心',en:'Core',ja:'中核'}}
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
  // The two principal images are ONE quiet two-state composition.
  // Like Folly's photographic study, they exchange with a soft fade and
  // large/small typography, rather than competing as adjacent thumbnails.
  function renderHero(w){
    return '<figure class="ins-hero-switch" data-ins-hero data-ins-active="0" aria-label="'+
      E(L(w.title)+' · '+L(w.hero[0].title)+' / '+L(w.hero[1].title))+'">'+
      '<div class="ins-hero-screen">'+w.hero.map(function(image,i){
        return '<div class="ins-hero-face'+(i===0?' is-active':'')+'" data-ins-hero-face="'+i+'" aria-hidden="'+(i===0?'false':'true')+'">'+
          '<img src="'+E(image.src)+'" alt="'+E(L(w.title)+' · '+L(image.title))+'" '+
          (i===0?'fetchpriority="high"':'fetchpriority="low"')+' decoding="async" draggable="false">'+
        '</div>';
      }).join('')+'</div>'+
      '<figcaption class="ins-hero-meta">'+
        '<div class="ins-hero-options" role="group" aria-label="'+E(L(w.title))+'">'+
          w.hero.map(function(image,i){
            return '<button class="ins-hero-option'+(i===0?' is-active':'')+'" type="button" '+
              'data-ins-hero-choice="'+i+'" aria-pressed="'+(i===0?'true':'false')+'">'+
              '<span>'+E(L(image.title))+'</span><small>'+E(image.year)+'</small>'+
            '</button>';
          }).join('<span class="ins-hero-separator" aria-hidden="true">｜</span>')+
        '</div><span class="ins-hero-project">Ion Trap / '+E('2023')+'</span>'+
      '</figcaption>'+
    '</figure>';
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
      '<header class="ins-work-title"><h2>'+E(title(w))+'</h2><span>'+E(w.year||'')+'</span></header>'+
      '<div class="ins-hero-grid">'+renderHero(w)+'</div>'+
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
  // On a direct hash-link reload script.js rendered the generic room before
  // this extension loaded. Repaint once the specialised renderer is ready.
  if(typeof parseRoute==='function'&&parseRoute()?.slug==='the-instrument')render();
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
  // Seven-second alternating images, as in Folly. Pause while offscreen,
  // during manual changes and in background tabs; never start a second timer.
  var heroState=null;
  function stopHero(){
    if(!heroState)return;
    clearTimeout(heroState.timer);
    heroState.observer?.disconnect();
    heroState=null;
  }
  function bindHero(room){
    stopHero();
    var hero=room.querySelector('[data-ins-hero]');
    if(!hero)return;
    var entry={room:room,hero:hero,index:0,visible:false,timer:0,observer:null};
    heroState=entry;
    function arm(){
      clearTimeout(entry.timer);
      entry.timer=0;
      if(!entry.visible||document.hidden||!hero.isConnected||heroState!==entry)return;
      entry.timer=window.setTimeout(function(){
        entry.timer=0;
        change((entry.index+1)%2);
      },7000);
    }
    function change(index){
      if(index===entry.index){arm();return;}
      entry.index=index;
      hero.dataset.insActive=String(index);
      hero.querySelectorAll('[data-ins-hero-face]').forEach(function(face,i){
        var active=i===index;
        face.classList.toggle('is-active',active);
        face.setAttribute('aria-hidden',active?'false':'true');
      });
      hero.querySelectorAll('[data-ins-hero-choice]').forEach(function(choice,i){
        var active=i===index;
        choice.classList.toggle('is-active',active);
        choice.setAttribute('aria-pressed',String(active));
      });
      arm();
    }
    hero.addEventListener('click',function(e){
      var button=e.target.closest('[data-ins-hero-choice]');
      if(!button)return;
      change(Number(button.dataset.insHeroChoice)||0);
    });
    if('IntersectionObserver' in window){
      entry.observer=new IntersectionObserver(function(entries){
        if(entry!==heroState)return;
        entry.visible=entries.some(function(x){return x.isIntersecting&&x.intersectionRatio>=.13;});
        if(entry.visible)arm();
        else{clearTimeout(entry.timer);entry.timer=0;}
      },{threshold:[0,.13,.5]});
      entry.observer.observe(hero);
    }else{
      entry.visible=true;arm();
    }
  }
  document.addEventListener('visibilitychange',function(){
    if(!heroState)return;
    clearTimeout(heroState.timer);heroState.timer=0;
    if(!document.hidden&&heroState.hero.isConnected&&heroState.visible){
      // Set visibility through a new intersection cycle when supported.
      heroState.hero.querySelector('[data-ins-hero-choice].is-active')?.click();
    }
  });
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
    bindHero(room);
  }
  function mount(){
    var room=document.querySelector('[data-ins-room]');
    if(active&&(!room||active.room!==room))close();
    if(heroState&&(!room||heroState.room!==room))stopHero();
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