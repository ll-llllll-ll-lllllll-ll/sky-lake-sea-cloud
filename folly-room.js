/* Folly — the ruin is assembled from brief, discontinuous views.
   Stage timings follow the authored chapter boundaries in folly-archive/script.js.
   Media and interactive score images are served unchanged from Ruin Archive.
   This module only replaces the ruin-garden room. */
(function () {
  'use strict';
  if (typeof renderRoom !== 'function' || typeof render !== 'function') return;
  var ARCHIVE = 'https://ruin-archive.site/';
  var FOLLY = [
    {
      number: 'I', title: {zh:'沉墟心室',en:'Effluent Sedimentation',ja:'沈墟の心室'},
      source: ARCHIVE + 'attachments/effluent-sedimentation/folly-1.mp4',
      poster: './works/ruin-garden/img1-blur.jpg',
      score: 'mechanical', total: 150,
      moments: [
        {time:2, end:12, zh:'引序 · 滞岸之壳', en:'Prologue · The stranded shell', ja:'序章 · 岸に留まる殻'},
        {time:23, end:33, zh:'余存维持', en:'Remaining in place', ja:'残存の維持'},
        {time:45, end:54, zh:'枯蚀应力', en:'Erosive strain', ja:'侵食する応力'},
        {time:59, end:69, zh:'磨损挣扎', en:'Worn resistance', ja:'摩耗と抗い'},
        {time:88, end:98, zh:'徒劳空撑', en:'The futile support', ja:'徒労の支え'},
        {time:127, end:138, zh:'尾声 · 崩塌余响', en:'Epilogue · After the collapse', ja:'終章 · 崩落の余韻'}
      ]
    },
    {
      number: 'II', title: {zh:'朽塔焦土',en:'Aether Scorched-Earth',ja:'焦土の朽塔'},
      source: ARCHIVE + 'attachments/aether-scorched-earth/folly-2.mp4',
      poster: './works/ruin-garden/img2-blur.jpg',
      score: 'fold', total: 255,
      moments: [
        {time:2, end:12, zh:'引序 · 并和狭间', en:'Prologue · The interval', ja:'序章 · 並存の狭間'},
        {time:31, end:41, zh:'非谐构合', en:'Disjointed assembly', ja:'不協和の構成'},
        {time:70, end:80, zh:'磨盘震颤', en:'Tremor of the mill', ja:'摩盤の震え'},
        {time:109, end:119, zh:'风蚀噪层', en:'Erosion / noise', ja:'風食と雑音'},
        {time:146, end:156, zh:'嗡鸣共振', en:'Resonant hum', ja:'唸りの共振'},
        {time:201, end:211, zh:'以太余鸣', en:'The aether resonance', ja:'エーテルの残響'},
        {time:234, end:245, zh:'尾声 · 无实之基', en:'Epilogue · An absent base', ja:'終章 · 空虚な基盤'}
      ]
    }
  ];
  var COPY = {
    zh:{eyebrow:'废墟园林 / 影像片段',intro:'向右滑动。一段段短暂的现场，留下彼此之间未被看见的时间。',hint:'向右滑动 / →',back:'返回',prev:'上一瞬间',next:'下一瞬间',play:'播放',pause:'暂停',sound:'声音',mute:'静音',score:'图谱',close:'关闭图谱',reset:'复位',scoreI:'拖动游标，检视十五帧机械记谱。影像中的图谱由末帧倒向首帧。',scoreII:'拖拽三枚三角翼，或点击编号将其折叠、展开。',loading:'影像就位中',unavailable:'片段尚未就位，可从原始影像观看。',original:'原始影像',step:'瞬间'},
    en:{eyebrow:'FOLLY / FRAGMENTS',intro:'Move right. Brief views leave the unseen intervals for the mind to assemble.',hint:'SWIPE RIGHT / →',back:'Back',prev:'Previous moment',next:'Next moment',play:'Play',pause:'Pause',sound:'Sound on',mute:'Mute',score:'Score',close:'Close score',reset:'Reset',scoreI:'Drag the lever through fifteen mechanical-score frames. In the film, the score runs from last to first.',scoreII:'Drag the three triangular wings, or tap their numbers to fold and unfold.',loading:'Preparing the moment',unavailable:'This moment cannot be loaded. View the original film instead.',original:'Original film',step:'Moment'},
    ja:{eyebrow:'フォリー / 断片',intro:'右へ滑る。短い場面と場面のあいだにある見えない時間を、心の中でつなぎ合わせてゆく。',hint:'右にスワイプ / →',back:'戻る',prev:'前の瞬間',next:'次の瞬間',play:'再生',pause:'一時停止',sound:'音声',mute:'消音',score:'楽譜',close:'楽譜を閉じる',reset:'リセット',scoreI:'レバーを動かし、十五枚の機械楽譜を検視する。映像とともに最終フレームから最初へ進む。',scoreII:'三つの三角翼をドラッグするか、番号を押して折り畳み／展開する。',loading:'映像を準備中',unavailable:'この場面を読み込めません。元の映像をご覧ください。',original:'元の映像',step:'瞬間'}
  };
  var scoreIUrls = Array.from({length:15},function(_,i){
    return ARCHIVE+'attachments/effluent-sedimentation/score-1-'+(i+1)+'.webp';
  });
  var foldBase = ARCHIVE+'attachments/aether-scorched-earth/';
  var seriesIndex = 0, currentIndex = 0, controller = null, scoreOpened = false;
  var activeRoot = null, freezeScore = false, foldAngles = [0,0,0];
  var lastProgress = 0, soundOn = false, lastFocus = null, resizeObserver = null;

  function lang(){return COPY[state.lang] ? state.lang : 'zh';}
  function t(key){return COPY[lang()][key];}
  function h(s){return escapeHtml(String(s == null ? '' : s));}
  function title(s){return s[lang()] || s.zh || '';}
  function pad(n){return String(n).padStart(2,'0');}
  function clamp(n,a,b){return Math.max(a,Math.min(b,n));}
  function series(){return FOLLY[seriesIndex];}
  function progressFromTime(seconds){return clamp(seconds/series().total,0,1);}

  function segmentMarkup(moment,i) {
    var f=series(), name=moment[lang()] || moment.zh;
    return '<article class="folly-moment" data-folly-moment="'+i+'" aria-label="'+h(t('step')+' '+(i+1)+' / '+f.moments.length)+'">'+
      '<div class="folly-visual">'+
      '<video class="folly-moment-video" playsinline webkit-playsinline muted preload="none" poster="'+h(f.poster)+'" aria-label="'+h(name)+'"></video>'+
      '<div class="folly-film-grain" aria-hidden="true"></div>'+
      '<div class="folly-video-status" aria-live="polite"></div>'+
      '<button type="button" class="folly-film-play" data-folly-control="play" aria-label="'+h(t('play'))+'">▶</button>'+
      '</div>'+
      '<div class="folly-moment-caption"><span>'+h(t('step')+' '+pad(i+1))+'</span><span>'+h(name)+'</span></div>'+
      '</article>';
  }
  function foldGraphic(preview) {
    var wingHtml=[1,2,3].map(function(n){
      return '<div class="folly-fold-axis folly-fold-axis-'+n+'" data-fold-index="'+(n-1)+'">'+
        '<div class="folly-fold-flap" data-fold-grab="'+(n-1)+'">'+
          '<img src="'+foldBase+'score-'+n+'.png" draggable="false" alt="">'+
        '</div></div>';
    }).join('');
    return '<div class="folly-fold-space'+(preview?' is-preview':'')+'">'+
      '<div class="folly-fold-center"><img src="'+foldBase+'score-center.png" alt="" draggable="false"></div>'+
      wingHtml+
      '<img class="folly-fold-final" src="'+foldBase+'score-final-replacement.png" alt="" draggable="false">'+
      '<div class="folly-fold-needles" aria-hidden="true"><i></i><i></i></div>'+
      '</div>';
  }
  function scorePeek() {
    return '<button type="button" class="folly-score-peek" data-folly-control="score" aria-label="'+h(t('score'))+'">'+
      '<span class="folly-peek-label">SCORE ↗</span>'+
      (series().score==='mechanical' ? '<img data-folly-score-peek-img src="'+scoreIUrls[14]+'" alt="">' : foldGraphic(true))+
      '</button>';
  }
  function bodyMarkup() {
    var f=series();
    return '<div class="folly-mast">'+
      '<div class="folly-mast-title"><p>'+h(t('eyebrow'))+'</p><h1>'+h(localised(works.find(function(w){return w.slug==='ruin-garden';}).title))+'</h1></div>'+
      '<p class="folly-thesis">'+h(t('intro'))+'</p>'+
      '<div class="folly-series-switch" role="group" aria-label="Folly">'+
      FOLLY.map(function(x,i){return '<button type="button" data-folly-series="'+i+'" class="'+(i===seriesIndex?'is-current':'')+'" aria-pressed="'+(i===seriesIndex)+'"><span>'+x.number+'</span><small>'+h(title(x.title))+'</small></button>';}).join('')+
      '</div></div>'+
      '<section class="folly-viewer" aria-label="'+h(title(f.title))+'">'+
        '<div class="folly-track" data-folly-track tabindex="0" aria-roledescription="carousel" aria-label="'+h(title(f.title))+'">'+
          f.moments.map(segmentMarkup).join('')+'</div>'+
        scorePeek()+
      '</section>'+
      '<div class="folly-bottom">'+
        '<div class="folly-count"><strong data-folly-count>01</strong><span> / '+pad(f.moments.length)+'</span><i data-folly-line></i></div>'+
        '<div class="folly-actions">'+
          '<button data-folly-control="prev" type="button" aria-label="'+h(t('prev'))+'">←</button>'+
          '<button data-folly-control="next" type="button" aria-label="'+h(t('next'))+'">→</button>'+
          '<button data-folly-control="pause" type="button" aria-label="'+h(t('pause'))+'">'+h(t('pause'))+'</button>'+
          '<button data-folly-control="sound" type="button" aria-label="'+h(t('sound'))+'">'+h(soundOn?t('mute'):t('sound'))+'</button>'+
          '<button data-folly-control="score" type="button">'+h(t('score'))+' ↗</button>'+
        '</div>'+
        '<span class="folly-swipe-hint">'+h(t('hint'))+'</span>'+
      '</div>'+
      '<div class="folly-score-overlay" data-folly-overlay hidden role="dialog" aria-modal="true" aria-label="'+h(t('score'))+'">'+
        '<div class="folly-score-panel">'+
          '<div class="folly-score-top"><span>FOLLY '+f.number+' / SCORE</span>'+
          '<button data-folly-control="close-score" type="button" aria-label="'+h(t('close'))+'">×</button></div>'+
          '<div class="folly-score-art">'+
           (f.score==='mechanical'?
             '<div class="folly-mechanical"><img data-folly-score-image src="'+scoreIUrls[14]+'" alt="mechanical score">'+
               '<div class="folly-mechanical-track"><input data-folly-lever aria-label="Mechanical score lever" type="range" min="1" max="15" step="1" value="15" orient="vertical"></div>'+
               '<span class="folly-score-frame" data-folly-frame>15 / 15</span>'+
             '</div>':
             foldGraphic(false)+
             '<div class="folly-fold-buttons">'+[1,2,3].map(function(n){return '<button type="button" data-fold-button="'+(n-1)+'" aria-pressed="false">'+pad(n)+'</button>';}).join('')+'</div>'
           )+
          '</div>'+
          '<div class="folly-score-footer"><p>'+h(t(f.score==='mechanical'?'scoreI':'scoreII'))+'</p>'+
          '<button type="button" data-folly-control="reset-score">'+h(t('reset'))+' ↺</button></div>'+
        '</div>'+
      '</div>';
  }
  function follyRoom(item){
    return '<section class="room-view folly-room">'+
      '<header class="room-head"><button type="button" data-action="home" class="room-back">← '+h(labels[state.lang].back)+'</button>'+
       '<p>'+h(labels[state.lang].works)+' / '+h(localised(item.title))+'</p>'+languageSwitch()+'</header>'+
      '<div class="folly-cinema" data-folly-root>'+bodyMarkup()+'</div></section>';
  }
  var originalRenderRoom=renderRoom;
  renderRoom=function(item){
    return item && item.slug==='ruin-garden' ? follyRoom(item) : originalRenderRoom(item);
  };

  function setScoreProgress(progress) {
    lastProgress=clamp(progress,0,1);
    if(!activeRoot) return;
    var frame=clamp(Math.round((1-lastProgress)*14)+1,1,15);
    var peek=activeRoot.querySelector('[data-folly-score-peek-img]');
    if(peek && peek.dataset.frame!==String(frame)){
      peek.dataset.frame=String(frame);peek.src=scoreIUrls[frame-1];
    }
    if(!freezeScore && series().score==='mechanical') showMechanical(frame);
    if(series().score==='fold'){
      activeRoot.querySelectorAll('.folly-fold-needles').forEach(function(pair){
        var a=pair.children[0], b=pair.children[1];
        if(a)a.style.transform='rotate('+(-65+95*lastProgress)+'deg)';
        if(b)b.style.transform='rotate('+(-55+129*Math.min(1,lastProgress*1.2))+'deg)';
      });
    }
  }
  function showMechanical(frame){
    if(!activeRoot)return;
    var image=activeRoot.querySelector('[data-folly-score-image]');
    var lever=activeRoot.querySelector('[data-folly-lever]');
    var label=activeRoot.querySelector('[data-folly-frame]');
    if(image && image.dataset.frame!==String(frame)){image.src=scoreIUrls[frame-1];image.dataset.frame=String(frame);}
    if(lever && document.activeElement!==lever)lever.value=frame;
    if(label)label.textContent=pad(frame)+' / 15';
  }
  function reflectFolds(){
    if(!activeRoot)return;
    activeRoot.querySelectorAll('.folly-fold-space').forEach(function(stage){
      stage.querySelectorAll('.folly-fold-axis').forEach(function(axis,i){
        axis.style.setProperty('--folly-fold-angle',foldAngles[i]+'deg');
      });
      stage.classList.toggle('is-fully-folded',foldAngles.every(function(a){return a>=175;}));
    });
    activeRoot.querySelectorAll('[data-fold-button]').forEach(function(btn,i){
      btn.setAttribute('aria-pressed',String(foldAngles[i]>=90));
    });
  }
  function pauseAll() {
    if(!activeRoot) return;
    activeRoot.querySelectorAll('video').forEach(function(v){try{v.pause();}catch(_){}});
  }
  function clearInactive(){
    if(!activeRoot)return;
    activeRoot.querySelectorAll('.folly-moment').forEach(function(panel,i){
      if(i===currentIndex)return;
      var v=panel.querySelector('video');
      v.pause();
      if(v.hasAttribute('src')){v.removeAttribute('src');v.load();}
      panel.classList.remove('is-playing','is-error');
    });
  }
  function status(panel,message) {
    var node=panel.querySelector('.folly-video-status');
    if(node) node.textContent=message||'';
  }
  function attemptPlay(video,panel) {
    if(!video || scoreOpened)return;
    video.muted=!soundOn;
    var p;
    try{p=video.play();}catch(_){p=null;}
    if(p && p.then)p.then(function(){panel.classList.add('is-playing');status(panel,'');}).catch(function(){
      panel.classList.remove('is-playing');status(panel,t('play')+' ▶');
    });
  }
  function activateMoment(index) {
    if(!activeRoot || !activeRoot.isConnected) return;
    var f=series(), next=clamp(index,0,f.moments.length-1);
    var old=currentIndex;currentIndex=next;
    activeRoot.querySelectorAll('.folly-moment').forEach(function(panel,i){
      panel.classList.toggle('is-active',i===next);
      panel.setAttribute('aria-hidden',String(i!==next));
    });
    var count=activeRoot.querySelector('[data-folly-count]');
    if(count) count.textContent=pad(next+1);
    var line=activeRoot.querySelector('[data-folly-line]');
    if(line)line.style.setProperty('--folly-progress',((next+1)/f.moments.length*100)+'%');
    clearInactive();
    var panel=activeRoot.querySelector('.folly-moment[data-folly-moment="'+next+'"]');
    if(!panel)return;
    var video=panel.querySelector('video'), moment=f.moments[next];
    var sourceChanged=video.getAttribute('src')!==f.source;
    if(sourceChanged){
      status(panel,t('loading'));
      video.setAttribute('src',f.source);
      video.load();
    }
    function seekAndPlay() {
      if(!panel.isConnected || currentIndex!==next || series()!==f || scoreOpened)return;
      var start=Math.min(moment.time,Math.max(0,(Number(video.duration)||f.total)-1));
      try{if(Math.abs(video.currentTime-start)>0.9)video.currentTime=start;}catch(_){}
      setScoreProgress(progressFromTime(start));
      attemptPlay(video,panel);
    }
    if(video.readyState>=1) seekAndPlay();
    else video.addEventListener('loadedmetadata',seekAndPlay,{once:true});
    if(old!==next)video.dataset.lastActivated=String(Date.now());
  }
  function onTick(event) {
    if(!activeRoot)return;
    var video=event.target;
    var panel=video.closest('.folly-moment');
    if(!panel || Number(panel.dataset.follyMoment)!==currentIndex)return;
    var m=series().moments[currentIndex];
    if(video.currentTime>=m.end-0.1){
      try{video.currentTime=m.time;}catch(_){}
      if(!video.paused)attemptPlay(video,panel);
    }
    setScoreProgress(progressFromTime(clamp(video.currentTime,m.time,m.end)));
  }
  function jump(step) {
    if(!activeRoot)return;
    var f=series(), index=clamp(currentIndex+step,0,f.moments.length-1);
    var track=activeRoot.querySelector('[data-folly-track]');
    if(track)track.scrollTo({left:index*track.clientWidth,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    if(index!==currentIndex)activateMoment(index);
  }
  function openScore() {
    if(!activeRoot || scoreOpened)return;
    lastFocus=document.activeElement;
    scoreOpened=true;
    freezeScore=false;
    pauseAll();
    var overlay=activeRoot.querySelector('[data-folly-overlay]');
    overlay.hidden=false;
    activeRoot.classList.add('is-score-open');
    reflectFolds();
    setScoreProgress(lastProgress);
    var close=overlay.querySelector('[data-folly-control="close-score"]');
    if(close)close.focus({preventScroll:true});
  }
  function closeScore() {
    if(!activeRoot || !scoreOpened)return;
    scoreOpened=false;freezeScore=false;
    activeRoot.classList.remove('is-score-open');
    activeRoot.querySelector('[data-folly-overlay]').hidden=true;
    if(lastFocus && lastFocus.isConnected)lastFocus.focus({preventScroll:true});
    activateMoment(currentIndex);
  }
  function switchSeries(index) {
    if(index===seriesIndex)return;
    pauseAll();
    seriesIndex=index; currentIndex=0; freezeScore=false;scoreOpened=false;
    foldAngles=[0,0,0];soundOn=false;lastProgress=0;
    activeRoot.innerHTML=bodyMarkup();
    wireRoot(activeRoot);
  }
  function wireRoot(root) {
    var track=root.querySelector('[data-folly-track]'), scheduled=0;
    if(!track)return;
    track.addEventListener('scroll',function(){
      if(scheduled)return;
      scheduled=requestAnimationFrame(function(){
        scheduled=0;var width=track.clientWidth||1;
        var to=clamp(Math.round(track.scrollLeft/width),0,series().moments.length-1);
        if(to!==currentIndex)activateMoment(to);
      });
    },{passive:true});
    track.addEventListener('wheel',function(ev){
      if(scoreOpened)return;
      if(Math.abs(ev.deltaY)>Math.abs(ev.deltaX)*1.2 && Math.abs(ev.deltaY)>2){
        if((ev.deltaY>0 && currentIndex===series().moments.length-1) || (ev.deltaY<0 && currentIndex===0))return;
        ev.preventDefault();
        // One wheel gesture = one chapter. Native touch/trackpad horizontal scrolling remains enabled.
        if(!track._follyWheelLocked){
          track._follyWheelLocked=true; jump(ev.deltaY>0?1:-1);
          setTimeout(function(){track._follyWheelLocked=false;},540);
        }
      }
    },{passive:false});
    root.addEventListener('click',function(ev){
      var seriesBtn=ev.target.closest('[data-folly-series]');
      if(seriesBtn){switchSeries(Number(seriesBtn.dataset.follySeries));return;}
      var wingBtn=ev.target.closest('[data-fold-button]');
      if(wingBtn){var wi=Number(wingBtn.dataset.foldButton);foldAngles[wi]=foldAngles[wi]>=90?0:180;reflectFolds();return;}
      var button=ev.target.closest('[data-folly-control]');
      if(!button)return;
      var op=button.dataset.follyControl;
      if(op==='prev')jump(-1);
      if(op==='next')jump(1);
      if(op==='score')openScore();
      if(op==='close-score')closeScore();
      if(op==='reset-score'){
        if(series().score==='mechanical'){freezeScore=false;setScoreProgress(lastProgress);}
        else{foldAngles=[0,0,0];reflectFolds();}
      }
      if(op==='play' || op==='pause') {
        var panel=root.querySelector('.folly-moment[data-folly-moment="'+currentIndex+'"]');
        var v=panel && panel.querySelector('video');
        if(!v)return;
        if(v.paused)attemptPlay(v,panel);else{v.pause();panel.classList.remove('is-playing');}
      }
      if(op==='sound'){
        soundOn=!soundOn;
        root.querySelectorAll('video').forEach(function(v){v.muted=!soundOn;});
        button.textContent=soundOn?t('mute'):t('sound');
        if(soundOn){var v=root.querySelector('.folly-moment.is-active video');if(v && v.paused)attemptPlay(v,v.closest('.folly-moment'));}
      }
    });
    root.querySelectorAll('video').forEach(function(video){
      video.addEventListener('timeupdate',onTick);
      video.addEventListener('ended',function(){onTick({target:video});});
      video.addEventListener('error',function(){
        var panel=video.closest('.folly-moment');
        if(panel && Number(panel.dataset.follyMoment)===currentIndex){
          panel.classList.add('is-error');
          status(panel,t('unavailable'));
          var original=panel.querySelector('.folly-original-link');
          if(!original){
            original=document.createElement('a'); original.className='folly-original-link';
            original.href=series().source;original.target='_blank';original.rel='noopener noreferrer';
            original.textContent=t('original')+' ↗';
            panel.querySelector('.folly-visual').appendChild(original);
          }
        }
      });
    });
    var lever=root.querySelector('[data-folly-lever]');
    if(lever)lever.addEventListener('input',function(){
      freezeScore=true;showMechanical(Number(lever.value));
    });
    root.querySelectorAll('[data-fold-grab]').forEach(function(el){
      var idx=Number(el.dataset.foldGrab), start=null;
      var deg=[0,120,-120][idx]*Math.PI/180;
      el.addEventListener('pointerdown',function(ev){
        if(ev.pointerType==='mouse' && ev.button!==0)return;
        start={id:ev.pointerId,x:ev.clientX,y:ev.clientY,angle:foldAngles[idx]};
        try{el.setPointerCapture(ev.pointerId);}catch(_){}
        ev.preventDefault();
      });
      el.addEventListener('pointermove',function(ev){
        if(!start || start.id!==ev.pointerId)return;
        var dx=ev.clientX-start.x,dy=ev.clientY-start.y;
        var outward=dx*Math.sin(deg)-dy*Math.cos(deg);
        foldAngles[idx]=clamp(start.angle-outward*0.85,0,180);
        reflectFolds();
        ev.preventDefault();
      });
      function finish(ev){
        if(!start || start.id!==ev.pointerId)return;
        foldAngles[idx]=foldAngles[idx]>90?180:0;
        start=null;reflectFolds();
      }
      el.addEventListener('pointerup',finish);
      el.addEventListener('pointercancel',finish);
    });
    var overlay=root.querySelector('[data-folly-overlay]');
    overlay.addEventListener('click',function(ev){if(ev.target===overlay)closeScore();});
    // Begin playback only after the browser has laid out the horizontal track.
    requestAnimationFrame(function(){if(root.isConnected && root===activeRoot)activateMoment(currentIndex);});
  }
  function mount(){
    var root=document.querySelector('[data-folly-root]');
    if(root===activeRoot)return;
    if(activeRoot){pauseAll();}
    activeRoot=root;
    scoreOpened=false;freezeScore=false;
    if(root){currentIndex=0;wireRoot(root);}
  }
  var app=document.getElementById('app');
  if(app && 'MutationObserver' in window){
    new MutationObserver(mount).observe(app,{childList:true,subtree:false});
  }
  document.addEventListener('keydown',function(ev){
    if(!activeRoot || !activeRoot.isConnected)return;
    if(ev.key==='Escape' && scoreOpened){ev.preventDefault();ev.stopPropagation();closeScore();return;}
    if(scoreOpened){
      if(ev.key==='Tab'){
        var focusables=Array.from(activeRoot.querySelector('[data-folly-overlay]').querySelectorAll('button,input'));
        var start=focusables[0],end=focusables[focusables.length-1];
        if(ev.shiftKey && document.activeElement===start){end.focus();ev.preventDefault();}
        else if(!ev.shiftKey && document.activeElement===end){start.focus();ev.preventDefault();}
      }
      return;
    }
    if(ev.altKey||ev.metaKey||ev.ctrlKey||/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;
    if(ev.key==='ArrowRight'){jump(1);ev.preventDefault();}
    if(ev.key==='ArrowLeft'){jump(-1);ev.preventDefault();}
  },true);
  // Called after the original render() and all collection extensions have loaded.
  render();
  mount();
})();
