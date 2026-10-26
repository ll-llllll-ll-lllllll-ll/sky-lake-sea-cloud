/* The Instrument: a Folly-like reading room, without a score.
   Add named works to WORKS; assign hero src only after images arrive. */
(function () {
  'use strict';
  if (typeof renderRoom!=='function'||typeof state==='undefined') return;
  var WORKS=[{
    title:{zh:'时间晶体',en:'Time Crystal',ja:'時間結晶'},
    prefix:{zh:'其一',en:'Part One',ja:'其の一'},
    progress:'Work in progress since 2023',
    year:'2023',
    heroLabel:{zh:'离子阱',en:'Ion Trap',ja:'イオントラップ'},
    intro:{
      zh:'【待补充：时间晶体的构造、离子阱与作品设想之间的关系。】',
      en:'[To be added: the structure of Time Crystal and the relationship between the ion trap and the work.]',
      ja:'【追記予定：『時間結晶』の構造と、イオントラップを用いた作品構想について。】'
    },
    galleryIntro:{
      zh:'【待补充：模型、装置及其所处环境的图像说明。】',
      en:'[To be added: notes on the model, apparatus and its setting.]',
      ja:'【追記予定：模型、装置とその周辺環境について。】'
    },
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
  },{
    title:{zh:'克莱因瓶中的船',en:'Ship in a Klein Bottle',ja:'クラインの壺の船'},
    prefix:{zh:'其二',en:'Part Two',ja:'其の二'},
    year:'',
    progress:'',
    heroLabel:{zh:'克莱因瓶中的船',en:'Ship in a Klein Bottle',ja:'クラインの壺の船'},
    hero:[
      {title:{zh:'图像一',en:'Image One',ja:'図像一'},year:'',src:'./works/the-instrument/the-instrument-2/ship-in-klein-bottle-1.jpg'},
      {title:{zh:'图像二',en:'Image Two',ja:'図像二'},year:'',src:'./works/the-instrument/the-instrument-2/ship-in-klein-bottle-2.jpg'}
    ],
    intro:{
      zh:'【待补充：克莱因瓶中的船的构造、运作方式及作品设想。】',
      en:'[To be added: the structure, operation and conception of Ship in a Klein Bottle.]',
      ja:'【追記予定：『クラインの壺の船』の構造、作動方法と構想について。】'
    },
    video:'./works/the-instrument/the-instrument-2/ship-in-klein-bottle.mp4',
    videoLabel:{zh:'运动影像',en:'Moving Image',ja:'映像'},
    videoIntro:{
      zh:'【待补充：运动影像所记录的机械动作与时间过程。】',
      en:'[To be added: the mechanical motion and passage of time recorded in the film.]',
      ja:'【追記予定：映像に記録された機構の運動と時間の経過について。】'
    },
    gallery:[]
  }];
  var I18N={
    zh:{about:'关于 The Instrument',archive:'效果图集',hint:'向右翻阅散落的瞬间',wait:'图片待上传',view:'查看图像',close:'退出观看',next:'下一件作品',video:'运动影像'},
    en:{about:'About The Instrument',archive:'Visual Studies',hint:'Move right through scattered moments',wait:'Image to be added',view:'View image',close:'Close viewer',next:'Next work',video:'Moving Image'},
    ja:{about:'The Instrument について',archive:'イメージ集',hint:'右へ進み、散らばった瞬間をたどる',wait:'画像は後日追加',view:'画像を見る',close:'閉じる',next:'次の作品',video:'映像'}
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
              '<span>'+E(L(image.title))+'</span>'+(image.year?'<small>'+E(image.year)+'</small>':'')+
            '</button>';
          }).join('<span class="ins-hero-separator" aria-hidden="true">｜</span>')+
        '</div><span class="ins-hero-project">'+E(L(w.heroLabel))+(w.year?' / '+E(w.year):'')+'</span>'+
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
  function renderFilm(w,si){
    if(!w.video)return '';
    var label=L(w.videoLabel)||T('video');
    return '<section class="ins-film-section" aria-label="'+E(label)+'">'+
      '<div class="ins-section-heading"><h3>'+E(label)+'</h3></div>'+
      '<div class="ins-film-layout">'+
        '<div class="ins-video-card" data-ins-video-card="'+si+'" data-ins-video-path="'+E(w.video)+'">'+
          '<button class="ins-video-open" type="button" data-ins-video-open="'+si+'" aria-label="'+E(T('view')+' · '+label)+'">'+
            '<span class="ins-video-screen">'+
              '<canvas class="ins-video-still" aria-hidden="true"></canvas>'+
              '<video class="ins-video-preview" muted loop playsinline webkit-playsinline preload="none" aria-hidden="true"></video>'+
              '<span class="ins-video-open-mark" aria-hidden="true">↗</span>'+
            '</span>'+
            '<span class="ins-video-caption"><span class="ins-video-number">01 <small>/ 01</small></span><span class="ins-video-name">'+E(label)+'</span></span>'+
          '</button>'+
        '</div>'+
      '</div>'+
      '<p class="ins-reading-copy ins-film-copy">'+E(L(w.videoIntro))+'</p>'+
    '</section>';
  }
  function renderGallery(w,si){
    if(!w.gallery||!w.gallery.length)return '';
    return '<section class="ins-gallery" aria-label="'+E(T('archive'))+'">'+
      '<div class="ins-gallery-heading"><h3>'+E(T('archive'))+'</h3><p>'+E(T('hint'))+'</p></div>'+
      '<p class="ins-reading-copy ins-gallery-intro">'+E(L(w.galleryIntro))+'</p>'+
      '<div class="ins-gallery-rail" data-ins-rail="'+si+'" tabindex="0" aria-label="'+E(T('archive'))+'">'+
        '<ol class="ins-gallery-strip">'+w.gallery.map(function(p,j){return renderCard(w,p,j);}).join('')+'</ol>'+
      '</div>'+
      (w.gallery.length>1?'<div class="ins-gallery-navigation"><input data-ins-slider="'+si+
        '" type="range" min="0" max="1000" value="0" step="1" aria-label="'+E(T('archive'))+'"></div>':'')+
    '</section>';
  }
  function renderWork(w,i){
    return '<section class="ins-work ins-reading-page" id="ins-work-'+(i+1)+'" data-ins-work="'+i+'">'+
      '<header class="ins-work-title"><h2>'+E(title(w))+'</h2><span>'+E(w.year||'')+'</span></header>'+
      '<div class="ins-reading-content">'+
        '<section class="ins-design-section" aria-label="'+E(L(w.heroLabel))+'">'+
          '<div class="ins-hero-grid">'+renderHero(w)+'</div>'+
          '<p class="ins-reading-copy ins-work-intro">'+E(L(w.intro))+'</p>'+
          (w.progress?'<p class="ins-work-progress">'+E(w.progress)+'</p>':'')+
        '</section>'+
      '</div>'+
      (w.video?renderFilm(w,i):'')+
      renderGallery(w,i)+
    '</section>';
  }
  function renderTurn(i){
    var next=WORKS[i+1];if(!next)return '';
    return '<div class="ins-page-turn" aria-label="'+E(T('next'))+'">'+
      '<button type="button" class="ins-turn-link" data-ins-jump="'+(i+1)+'">'+
        '<span class="ins-turn-line" aria-hidden="true"></span>'+
        '<span class="ins-turn-small">'+E(T('next'))+'</span>'+
        '<span class="ins-turn-name">'+E(title(next))+'</span>'+
        '<span class="ins-turn-arrow" aria-hidden="true">↓</span>'+
      '</button></div>';
  }
  function renderInstrument(item){
    return '<section class="room-view ins-room" data-ins-room>'+
      '<header class="room-head"><button type="button" data-action="home" class="room-back">← '+
        E(labels[lng()].back)+'</button><p>'+E(labels[lng()].works)+' / '+E(L(item.title))+'</p>'+languageSwitch()+'</header>'+
      '<div class="ins-page"><header class="ins-page-title"><h1>'+E(L(item.title))+'</h1></header>'+
      '<section class="ins-about"><h2>'+E(T('about'))+'</h2><p>'+E(L(item.intro))+'</p>'+
      '<nav class="ins-contents"><ol>'+
        WORKS.map(function(w,i){return '<li><button type="button" data-ins-jump="'+i+'">'+E(title(w))+
          (w.progress?'<span>（'+E(w.progress)+'）</span>':'')+'</button></li>';}).join('')+
      '</ol></nav></section>'+WORKS.map(function(w,i){return renderWork(w,i)+renderTurn(i);}).join('')+'</div>'+
      '<div class="ins-viewer" data-ins-viewer role="dialog" aria-modal="true" hidden>'+
        '<button class="ins-viewer-scrim" type="button" data-ins-close aria-label="'+E(T('close'))+'"></button>'+
        '<div class="ins-viewer-stage"><img class="ins-viewer-image" data-ins-full alt="">'+
        '<video class="ins-viewer-film" data-ins-full-video playsinline webkit-playsinline preload="metadata"></video>'+
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
    var a=active,viewer=a.viewer;
    var video=viewer.querySelector('[data-ins-full-video]');
    video.pause();video.removeAttribute('src');video.load();
    viewer.hidden=true;
    viewer.classList.remove('is-video');
    viewer.style.removeProperty('--ins-film-ratio');
    viewer.querySelector('[data-ins-full]').removeAttribute('src');
    document.body.classList.remove('ins-modal-open');
    active=null;
    if(a.trigger&&a.trigger.isConnected)a.trigger.focus({preventScroll:true});
  }
  function open(room,si,idx,trigger){
    var w=WORKS[si],photo=w&&w.gallery[idx];
    if(!photo)return;
    if(active)close();
    var viewer=room.querySelector('[data-ins-viewer]');
    if(!viewer)return;
    active={room:room,viewer:viewer,si:si,idx:idx,trigger:trigger,kind:'image'};
    viewer.classList.remove('is-video');
    var img=viewer.querySelector('[data-ins-full]');
    img.src=photo.src;img.alt=L(w.title)+' · '+L(photo.title);
    viewer.querySelector('[data-ins-count]').innerHTML=N(idx)+' <small>/ '+N(w.gallery.length-1)+'</small>';
    viewer.querySelector('[data-ins-name]').textContent=L(photo.title);
    viewer.hidden=false;
    document.body.classList.add('ins-modal-open');
    viewer.querySelector('[data-ins-close]').focus({preventScroll:true});
  }
  function openVideo(room,si,trigger){
    var w=WORKS[si],viewer=room.querySelector('[data-ins-viewer]');
    if(!viewer||!w||!w.video)return;
    if(active)close();
    var preview=room.querySelector('[data-ins-video-card="'+si+'"] .ins-video-preview');
    preview?.pause();
    viewer.classList.add('is-video');
    var video=viewer.querySelector('[data-ins-full-video]');
    active={room:room,viewer:viewer,si:si,idx:0,trigger:trigger,kind:'video'};
    video.muted=false;
    video.controls=false;
    video.loop=false;
    video.playsInline=true;
    video.src=w.video;
    video.onloadedmetadata=function(){
      if(active?.viewer!==viewer||active.kind!=='video')return;
      if(video.videoWidth&&video.videoHeight)
        viewer.style.setProperty('--ins-film-ratio',String(video.videoWidth/video.videoHeight));
    };
    viewer.querySelector('[data-ins-count]').innerHTML='01 <small>/ 01</small>';
    viewer.querySelector('[data-ins-name]').textContent=L(w.videoLabel)||T('video');
    viewer.hidden=false;
    document.body.classList.add('ins-modal-open');
    viewer.querySelector('[data-ins-close]').focus({preventScroll:true});
    // User initiated click authorizes sound in Safari; never claim autoplay
    // succeeded when the browser blocks it.
    var playing=video.play();
    if(playing?.catch)playing.catch(function(){video.controls=true;});
  }
  function step(dir){
    if(!active||active.kind!=='image')return;
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
  // One independent visibility-aware alternating image clock per work.
  // This is essential on the two-work Folly-like reading page: the second
  // work must not inherit the first work's timer or selected image.
  var heroes=[];
  function clearHeroes(){
    heroes.forEach(function(h){clearTimeout(h.timer);h.observer?.disconnect();});
    heroes=[];
  }
  function bindHeroes(room){
    clearHeroes();
    room.querySelectorAll('[data-ins-hero]').forEach(function(root){
      var entry={room:room,root:root,index:0,visible:false,timer:0,observer:null,arm:null};
      heroes.push(entry);
      function arm(){
        clearTimeout(entry.timer);entry.timer=0;
        if(!entry.visible||document.hidden||!root.isConnected||!heroes.includes(entry))return;
        entry.timer=window.setTimeout(function(){entry.timer=0;change((entry.index+1)%2);},7000);
      }
      entry.arm=arm;
      function change(index){
        if(index===entry.index){arm();return;}
        entry.index=index;root.dataset.insActive=String(index);
        root.querySelectorAll('[data-ins-hero-face]').forEach(function(face,i){
          var yes=i===index;face.classList.toggle('is-active',yes);
          face.setAttribute('aria-hidden',yes?'false':'true');
        });
        root.querySelectorAll('[data-ins-hero-choice]').forEach(function(button,i){
          var yes=i===index;button.classList.toggle('is-active',yes);
          button.setAttribute('aria-pressed',String(yes));
        });
        arm();
      }
      root.addEventListener('click',function(ev){
        var button=ev.target.closest('[data-ins-hero-choice]');
        if(button)change(Number(button.dataset.insHeroChoice)||0);
      });
      if('IntersectionObserver' in window){
        entry.observer=new IntersectionObserver(function(entries){
          if(!heroes.includes(entry))return;
          entry.visible=entries.some(function(e){return e.isIntersecting&&e.intersectionRatio>=.13;});
          if(entry.visible)arm();
          else{clearTimeout(entry.timer);entry.timer=0;}
        },{threshold:[0,.13,.5]});
        entry.observer.observe(root);
      }else{
        entry.visible=true;arm();
      }
    });
  }
  document.addEventListener('visibilitychange',function(){
    heroes.forEach(function(h){
      clearTimeout(h.timer);h.timer=0;
      if(!document.hidden&&h.visible)h.arm();
    });
  });
  var films=[];
  function clearFilms(){
    films.forEach(function(o){
      clearTimeout(o.timer);
      o.observer?.disconnect();
      var v=o.video;
      if(v){v.pause();v.removeAttribute('src');v.load();}
    });
    films=[];
  }
  function bindFilms(room){
    clearFilms();
    room.querySelectorAll('[data-ins-video-card]').forEach(function(card){
      var preview=card.querySelector('.ins-video-preview');
      var still=card.querySelector('.ins-video-still');
      var movie=card.dataset.insVideoPath;
      var o={room:room,card:card,video:preview,timer:0,observer:null,playing:false};
      films.push(o);
      function init(){
        if(preview.hasAttribute('src')||!card.isConnected)return;
        preview.src=movie;
        preview.preload='metadata';
        preview.addEventListener('loadedmetadata',function(){
          if(preview.videoWidth&&preview.videoHeight){
            card.style.setProperty('--ins-video-aspect',preview.videoWidth+'/'+preview.videoHeight);
          }
          // A real decoded two-second still, as in Folly's instrument card.
          // Wait for seeked before drawing; Safari cannot reliably draw a
          // video frame that has loaded metadata but not decoded footage.
          if(!o.playing&&Number.isFinite(preview.duration)&&preview.duration>0){
            try{preview.currentTime=Math.min(2,Math.max(0,preview.duration-.1));}catch(_){}
          }
        },{once:true});
        preview.addEventListener('seeked',function(){
          if(o.playing||!preview.videoWidth||!preview.videoHeight)return;
          try{
            still.width=Math.min(960,preview.videoWidth);
            still.height=Math.max(1,Math.round(still.width*preview.videoHeight/preview.videoWidth));
            still.getContext('2d').drawImage(preview,0,0,still.width,still.height);
            card.classList.add('has-still');
          }catch(_){}
        },{once:true});
      }
      function stop(){
        clearTimeout(o.timer);o.timer=0;
        preview.pause();card.classList.remove('is-previewing');
        o.playing=false;
      }
      card.addEventListener('pointerenter',function(e){
        if(e.pointerType!=='mouse'||document.hidden)return;
        init();clearTimeout(o.timer);
        o.timer=window.setTimeout(function(){
          if(!card.matches(':hover')||document.hidden||!card.isConnected)return;
          preview.muted=true;preview.loop=true;
          o.playing=true;
          var p=preview.play();
          if(p?.then)p.then(function(){card.classList.add('is-previewing');})
                      .catch(function(){o.playing=false;});
        },600);
      });
      card.addEventListener('pointerleave',stop);
      card.addEventListener('pointerdown',function(){clearTimeout(o.timer);o.timer=0;});
      card.addEventListener('focusin',init);
      if('IntersectionObserver' in window){
        o.observer=new IntersectionObserver(function(entries){
          if(entries.some(function(e){return e.isIntersecting;})){init();o.observer?.disconnect();}
        },{rootMargin:'170px'});
        o.observer.observe(card);
      }
      o.stop=stop;
    });
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
      if(active?.kind==='video'&&e.target.matches('[data-ins-full-video]')){
        var v=e.target;if(v.paused){var promise=v.play();if(promise?.catch)promise.catch(function(){});}
        else v.pause();
        return;
      }
      var videoButton=e.target.closest('[data-ins-video-open]');
      if(videoButton){
        var si=Number(videoButton.dataset.insVideoOpen);
        films.forEach(function(o){if(Number(o.card.dataset.insVideoCard)===si)o.stop();});
        openVideo(room,si,videoButton);return;
      }
      var button=e.target.closest('[data-ins-open]');
      if(button){
        var work=button.closest('[data-ins-work]');
        if(work)open(room,Number(work.dataset.insWork),Number(button.dataset.insOpen),button);
      }
    });
    WORKS.forEach(function(_,i){wireGallery(room,i);});
    bindHeroes(room);
    bindFilms(room);
  }
  function mount(){
    var room=document.querySelector('[data-ins-room]');
    if(active&&(!room||active.room!==room))close();
    if(heroes.length&&(!room||heroes[0].room!==room))clearHeroes();
    if(films.length&&(!room||films[0].room!==room))clearFilms();
    if(room)bind(room);
  }
  var app=document.getElementById('app');
  if(app&&'MutationObserver' in window)new MutationObserver(mount).observe(app,{childList:true,subtree:false});
  document.addEventListener('keydown',function(e){
    if(!active)return;
    if(e.key==='Escape'){close();e.preventDefault();e.stopImmediatePropagation();}
    if(active.kind==='video'&&(e.key===' '||e.key==='Spacebar')){
      var v=active.viewer.querySelector('[data-ins-full-video]');
      if(v.paused){var p=v.play();if(p?.catch)p.catch(function(){});}else v.pause();
      e.preventDefault();return;
    }
    if(e.key==='ArrowRight'){step(1);e.preventDefault();}
    if(e.key==='ArrowLeft'){step(-1);e.preventDefault();}
  },true);
  mount();
})();