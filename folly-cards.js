/* Folly card archive · 2026-10-14
   Deliberately not a film player: quiet magnetic cards first, projected moving
   images only after selection. Source media and score notation remain in
   folly-archive. Existing site routing / locale switch remain unchanged. */
(function () {
  'use strict';
  if (typeof renderRoom !== 'function' || typeof state === 'undefined') return;

  var ARCHIVE = 'https://ruin-archive.site/';
  var PHOTOS = ARCHIVE + 'thumbnails/garden-128/';
  var SERIES = [
    {id:'folly-1',roman:'I',title:{zh:'沉墟心室',en:'Effluent Sedimentation',ja:'沈墟の心室'},
     media:'attachments/effluent-sedimentation/folly-1/',poster:PHOTOS+'effluent-sedimentation.webp',
     kind:'linear',endTime:150,
     stages:[
       {start:0, end:20, zh:'滞岸之壳',en:'Stranded shell',ja:'岸に留まる殻'},
       {start:20,end:42,zh:'余存维持',en:'Remaining in place',ja:'残存の維持'},
       {start:42,end:56,zh:'枯蚀应力',en:'Erosive strain',ja:'侵食する応力'},
       {start:56,end:84,zh:'磨损挣扎',en:'Worn resistance',ja:'摩耗と抗い'},
       {start:84,end:124,zh:'徒劳空撑',en:'Futile support',ja:'徒労の支え'},
       {start:124,end:150,zh:'崩塌余响',en:'After the collapse',ja:'崩落の余韻'}
     ]},
    {id:'folly-2',roman:'II',title:{zh:'朽塔焦土',en:'Aether Scorched-Earth',ja:'朽塔の焦土'},
     media:'attachments/aether-scorched-earth/folly-2/',poster:PHOTOS+'aether-scorched-earth.webp',
     kind:'radial',endTime:255,
     stages:[
       {start:0,end:28,zh:'并和狭间',en:'The interval',ja:'並存の狭間'},
       {start:28,end:67,zh:'非谐构合',en:'Disjointed assembly',ja:'不協和の構成'},
       {start:67,end:105,zh:'磨盘震颤',en:'The mill trembles',ja:'摩盤の震え'},
       {start:105,end:142,zh:'风蚀噪层',en:'Wind and noise',ja:'風食と雑音'},
       {start:142,end:198,zh:'嗡鸣共振',en:'Resonant hum',ja:'唸りの共振'},
       {start:198,end:231,zh:'以太余鸣',en:'Aether resonance',ja:'エーテルの残響'},
       {start:231,end:255,zh:'无实之基',en:'The absent foundation',ja:'空虚な基盤'}
     ]}
  ];
  var COPY = {
    zh:{group:'废墟园林 / 图景',instruction:'向右翻阅散落的瞬间。',selection:'点击一幅图景，进入它短暂的变化。',seek:'滑动阶段',open:'观看这一瞬间',close:'回到图景',prev:'上一阶段',next:'下一阶段',sound:'打开声音',mute:'静音',play:'继续',pause:'暂停',score:'检视图谱',reset:'复位',loading:'影像就位中',missing:'这一阶段的影像尚未就位',allEnd:'本卷已至尾声',hintI:'图谱随时间逆行 · 悬停校准指针',hintII:'三角翼可折叠 · 悬停校准指针',loadingPoster:'',zoom:'放大'},
    en:{group:'FOLLY / TABLEAUX',instruction:'Move right through scattered moments.',selection:'Select a tableau to enter its brief transformation.',seek:'Move through stages',open:'Open this moment',close:'Return to the tableaux',prev:'Previous stage',next:'Next stage',sound:'Sound on',mute:'Mute',play:'Resume',pause:'Pause',score:'Inspect the score',reset:'Reset',loading:'Preparing the moving image',missing:'This fragment is not available yet',allEnd:'The sequence has ended',hintI:'Score runs in reverse · Hover to calibrate',hintII:'Three folding wings · Hover to calibrate',loadingPoster:'',zoom:'Zoom'},
    ja:{group:'フォリー / 風景の断片',instruction:'右へ進み、散らばった瞬間をたどる。',selection:'一枚を選び、その短い変化に入る。',seek:'段階を移動',open:'この瞬間を見る',close:'風景に戻る',prev:'前の段階',next:'次の段階',sound:'音声オン',mute:'消音',play:'再開',pause:'一時停止',score:'楽譜を検視',reset:'リセット',loading:'映像を準備中',missing:'この断片はまだありません',allEnd:'この巻は終わりました',hintI:'楽譜は逆行 · 悬停で校正',hintII:'三つの翼を折る · ホバーで校正',loadingPoster:'',zoom:'拡大'}
  };
  var i18n=function(k){return (COPY[state.lang]||COPY.zh)[k]||'';};
  var label=function(obj){return obj[state.lang]||obj.zh||'';};
  var esc=function(v){return escapeHtml(v == null?'':String(v));};
  var pad=function(n){return String(n).padStart(2,'0');};
  var clamp=function(x,min,max){return Math.max(min,Math.min(max,Number(x)||0));};
  var source=function(s,i){return ARCHIVE+s.media+String(i+1)+'.mp4';};
  var FILES_I=Array.from({length:15},function(_,i){return ARCHIVE+'attachments/effluent-sedimentation/score-1-'+(i+1)+'.webp';});
  var FILES_I_MOBILE=Array.from({length:15},function(_,i){return ARCHIVE+'assets/mobile-score/effluent-sedimentation/score-1-'+(i+1)+'.webp';});
  var FOLD_BASE=ARCHIVE+'attachments/aether-scorched-earth/';
  var selection={series:0,index:0,open:false,muted:true,paused:false,scoreInspect:false,scoreZoom:1,scorePanX:0,scorePanY:0,folds:[0,0,0],lastTime:0};
  var scene=null,player=null,serial=0,queue=[],previewInFlight=0,previewComplete=new Set(),mountedToken=0;
  var io=null,scrollFrame=0,playRaf=0,hoverRAF=0,lastTrigger=null,resizeTimer=0;

  function current(){return SERIES[selection.series];}
  function sourceScoreFrame(fraction){
    var frame=15-Math.round(clamp(fraction,0,1)*14);
    return clamp(frame,1,15);
  }
  function mechanicalImage(frame){
    return window.matchMedia('(max-width: 700px)').matches?FILES_I_MOBILE[frame-1]:FILES_I[frame-1];
  }
  function foldMarkup(isShadow){
    return '<div class="fc-fold-stage '+(isShadow?'fc-fold-shadow-stage':'')+'">'+
      '<div class="fc-fold-core"><img src="'+FOLD_BASE+'score-center.png" alt="" draggable="false"></div>'+
      [1,2,3].map(function(i){
        return '<div class="fc-fold-axis fc-fold-axis-'+i+'" data-fc-wing="'+(i-1)+'">'+
          '<div class="fc-fold-wing" data-fc-drag-wing="'+(i-1)+'">'+
            '<div class="fc-fold-face fc-fold-face-front"><img src="'+FOLD_BASE+'score-'+i+'.png" alt="" draggable="false"></div>'+
            '<div class="fc-fold-face fc-fold-face-back"><img src="'+FOLD_BASE+'score-'+i+'.png" alt="" draggable="false"></div>'+
          '</div></div>';
      }).join('')+
      '<div class="fc-fold-finish"><img src="'+FOLD_BASE+'score-final-replacement.png" alt="" draggable="false"></div>'+
      '</div>';
  }
  function scoreMarkup(s){
    var mechanical=s.kind==='linear';
    var notation=mechanical?
      '<div class="fc-score-notation fc-mechanical-notation"><img class="fc-score-frame" data-fc-score-frame src="'+mechanicalImage(15)+'" alt=""><div class="fc-scan-line" data-fc-line></div><div class="fc-scan-pulse" data-fc-pulse></div></div>':
      '<div class="fc-score-notation fc-fold-notation">'+foldMarkup(false)+
       '<div class="fc-radial-needles" aria-hidden="true"><i data-fc-needle="0"></i><i data-fc-needle="1"></i></div></div>';
    var shadow=mechanical?
      '<div class="fc-shadow-scan"><img data-fc-score-shadow-img src="'+mechanicalImage(15)+'" alt=""><i data-fc-shadow-line></i></div>':
      foldMarkup(true);
    return '<div class="fc-score-cluster fc-score-'+s.kind+'">'+
      '<div class="fc-score-shadow" data-fc-score-shadow aria-hidden="true">'+shadow+'</div>'+
      '<div class="fc-score-hud" data-fc-score-hud>'+
        '<p class="fc-score-mark">SCORE / '+s.roman+'</p>'+notation+
        '<div class="fc-score-indicator"><i class="fc-score-light"></i><span>SYNC / '+s.roman+'</span></div>'+
      '</div>'+
      '<p class="fc-score-manual">'+esc(i18n(mechanical?'hintI':'hintII'))+'</p>'+
      '<button class="fc-score-expand" type="button" data-fc-action="inspect">'+esc(i18n('score'))+' ↗</button>'+
      '</div>';
  }
  function cardMarkup(stage,index,s){
    return '<li class="fc-card" data-fc-card="'+index+'">'+
      '<button class="fc-card-button" type="button" data-fc-action="select" data-fc-index="'+index+'" aria-label="'+esc(i18n('open')+': '+label(stage))+'">'+
        '<span class="fc-frame"><img class="fc-poster" alt="" src="'+esc(s.poster)+'" decoding="async" loading="'+(index<3?'eager':'lazy')+'">'+
          '<video class="fc-preview" playsinline webkit-playsinline preload="none" muted aria-hidden="true"></video>'+
          '<span class="fc-card-filmwash" aria-hidden="true"></span><span class="fc-card-open-sign">↗</span></span>'+
        '<span class="fc-card-copy"><span class="fc-card-count">'+pad(index+1)+' <small>/ '+pad(s.stages.length)+'</small></span>'+
        '<span class="fc-card-name">'+esc(label(stage))+'</span></span>'+
      '</button></li>';
  }
  function pageMarkup(item){
    var s=current();
    return '<section class="room-view fc-room"><header class="room-head">'+
      '<button type="button" data-action="home" class="room-back">← '+esc(labels[state.lang].back)+'</button>'+
      '<p>'+esc(labels[state.lang].works)+' / '+esc(localised(item.title))+'</p>'+languageSwitch()+'</header>'+
      '<div class="fc-page" data-fc-scene>'+
        '<div class="fc-page-heading"><div class="fc-heading-primary"><p>'+esc(i18n('group'))+'</p><h1>'+esc(localised(item.title))+'</h1></div>'+
        '<p class="fc-instruction">'+esc(i18n('instruction'))+'<span>'+esc(i18n('selection'))+'</span></p>'+
        '<div class="fc-series-tabs" role="group" aria-label="Folly series">'+
          SERIES.map(function(serie,i){return '<button type="button" data-fc-action="series" data-fc-series="'+i+'" class="'+(i===selection.series?'is-current':'')+'" aria-pressed="'+String(i===selection.series)+'">'+
          serie.roman+'<small>'+esc(label(serie.title))+'</small></button>';}).join('')+
        '</div></div>'+
        '<div class="fc-gallery-area"><div class="fc-rail" data-fc-rail tabindex="0" aria-label="'+esc(i18n('seek'))+'"><ol class="fc-strip">'+
          s.stages.map(function(stage,i){return cardMarkup(stage,i,s);}).join('')+
        '</ol></div></div>'+
        '<div class="fc-navigation">'+
          '<div class="fc-rail-index"><strong data-fc-index-display>01</strong><span> / '+pad(s.stages.length)+'</span></div>'+
          '<button type="button" data-fc-action="previous" class="fc-nudge" aria-label="'+esc(i18n('prev'))+'">←</button>'+
          '<input data-fc-slider class="fc-slider" type="range" min="0" max="'+(s.stages.length-1)+'" step="1" value="0" aria-label="'+esc(i18n('seek'))+'">'+
          '<button type="button" data-fc-action="next" class="fc-nudge" aria-label="'+esc(i18n('next'))+'">→</button>'+
          '<p class="fc-rail-caption">'+esc(label(s.title))+' <span>'+s.roman+'</span></p>'+
        '</div>'+
        '<div class="fc-projection" data-fc-projection hidden role="dialog" aria-modal="true" aria-label="'+esc(i18n('open'))+'">'+
          '<div class="fc-projection-scrim" data-fc-action="close"></div>'+
          '<div class="fc-projection-shell">'+
            '<div class="fc-projection-top"><span>'+esc(i18n('group'))+' <b data-fc-projection-count>01 / '+pad(s.stages.length)+'</b></span>'+
              '<button type="button" data-fc-action="close" aria-label="'+esc(i18n('close'))+'">×</button></div>'+
            '<div class="fc-projection-center">'+
              '<button type="button" class="fc-projection-arrow fc-arrow-prev" data-fc-action="previous" aria-label="'+esc(i18n('prev'))+'">←</button>'+
              '<div class="fc-film-wrap"><video class="fc-film" data-fc-film playsinline webkit-playsinline preload="metadata" muted></video>'+
                '<div class="fc-film-vignette"></div><span class="fc-film-status" data-fc-film-status aria-live="polite"></span>'+
                '<button class="fc-film-pause-sign" type="button" data-fc-action="play" aria-label="'+esc(i18n('pause'))+'">Ⅱ</button></div>'+
              '<button type="button" class="fc-projection-arrow fc-arrow-next" data-fc-action="next" aria-label="'+esc(i18n('next'))+'">→</button>'+
            '</div>'+
            scoreMarkup(s)+
            '<div class="fc-projection-bottom"><span class="fc-now-title" data-fc-now-title>'+esc(label(s.stages[0]))+'</span>'+
              '<span class="fc-time-index" data-fc-time-index>01 / '+pad(s.stages.length)+'</span>'+
              '<div class="fc-play-actions"><button type="button" data-fc-action="play" aria-label="'+esc(i18n('pause'))+'">Ⅱ</button>'+
                '<button type="button" data-fc-action="sound" aria-label="'+esc(i18n('sound'))+'">♪̸</button>'+
              '</div></div>'+
            '<div class="fc-inspection" data-fc-inspection hidden>'+
              '<div class="fc-inspection-head"><span>FOLLY '+s.roman+' / SCORE</span>'+
                '<button type="button" data-fc-action="stop-inspect" aria-label="'+esc(i18n('close'))+'">×</button></div>'+
              '<div class="fc-inspection-body">'+(s.kind==='linear'?
                  '<div class="fc-inspect-mechanical"><img data-fc-inspect-img src="'+mechanicalImage(15)+'" alt="">'+
                     '<input class="fc-inspect-lever" data-fc-inspect-lever type="range" min="1" max="15" step="1" value="15" orient="vertical" aria-label="15 score frames">'+
                   '</div>':
                  '<div class="fc-inspect-fold">'+foldMarkup(false)+
                    '<div class="fc-inspect-wings">'+[1,2,3].map(function(i){return '<button type="button" data-fc-action="wing" data-fc-wing-index="'+(i-1)+'">'+pad(i)+'</button>';}).join('')+'</div></div>')+
                '</div><div class="fc-inspection-foot">'+
                  '<button type="button" data-fc-action="zoom-out" aria-label="Zoom out">−</button><button type="button" data-fc-action="zoom-in" aria-label="Zoom in">+</button>'+
                  '<button type="button" data-fc-action="reset-score">'+esc(i18n('reset'))+' ↺</button></div>'+
            '</div>'+
          '</div>'+
        '</div></div></section>';
  }
  var originalRoom=renderRoom;
  renderRoom=function(item){return item && item.slug==='ruin-garden'?pageMarkup(item):originalRoom(item);};

  function isLive(){return !!(scene && scene.isConnected);}
  function stopMedia(){
    serial++;
    if(player){try{player.pause();player.removeAttribute('src');player.load();}catch(_){}}
    if(playRaf){cancelAnimationFrame(playRaf);playRaf=0;}
  }
  function clearPreviews(){
    queue=[];previewInFlight=0;previewComplete=new Set();mountedToken++;
    if(io){io.disconnect();io=null;}
    if(scene)scene.querySelectorAll('.fc-preview').forEach(function(v){try{v.pause();v.removeAttribute('src');v.load();}catch(_){}});
  }
  function align(index,smooth){
    if(!isLive())return;
    var rail=scene.querySelector('[data-fc-rail]');
    var card=scene.querySelector('[data-fc-card="'+index+'"]');
    if(!rail||!card)return;
    var x=card.offsetLeft+(card.offsetWidth/2)-rail.clientWidth/2;
    rail.scrollTo({left:x,behavior:smooth&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches?'smooth':'auto'});
  }
  function focusCard(index,scroll){
    if(!isLive())return;
    var s=current(),i=clamp(index,0,s.stages.length-1);
    selection.index=i;
    scene.querySelectorAll('[data-fc-card]').forEach(function(card){
      var selected=Number(card.dataset.fcCard)===i;
      card.classList.toggle('is-magnet',selected);
    });
    var display=scene.querySelector('[data-fc-index-display]');
    var slider=scene.querySelector('[data-fc-slider]');
    if(display)display.textContent=pad(i+1);
    if(slider)slider.value=String(i);
    if(scroll)align(i,true);
    var name=scene.querySelector('[data-fc-now-title]');
    var time=scene.querySelector('[data-fc-time-index]');
    var progress=scene.querySelector('[data-fc-projection-count]');
    if(name)name.textContent=label(s.stages[i]);
    if(time)time.textContent=pad(i+1)+' / '+pad(s.stages.length);
    if(progress)progress.textContent=pad(i+1)+' / '+pad(s.stages.length);
    updatePreviewPriority(i);
  }
  function updatePreviewPriority(index){
    if(!isLive())return;
    var n=current().stages.length,sequence=[];
    for(var dist=0;dist<n;dist++){
      if(index+dist<n)sequence.push(index+dist);
      if(dist>0 && index-dist>=0)sequence.push(index-dist);
    }
    queue=sequence.filter(function(i){return !previewComplete.has(i);});
    processPreviews();
  }
  function processPreviews(){
    if(!isLive())return;
    while(previewInFlight<2 && queue.length){
      var next=queue.shift(),card=scene.querySelector('[data-fc-card="'+next+'"]');
      if(!card || previewComplete.has(next))continue;
      previewComplete.add(next);previewInFlight++;
      var v=card.querySelector('video'), token=mountedToken,settled=false;
      var release=function(success){
        if(settled)return;
        settled=true;
        v.removeEventListener('loadedmetadata',onMeta);
        v.removeEventListener('seeked',onSeek);
        v.removeEventListener('error',onError);
        if(token!==mountedToken)return;
        if(success)card.classList.add('has-frame');
        else card.classList.add('has-poster-fallback');
        previewInFlight=Math.max(0,previewInFlight-1);
        processPreviews();
      };
      var onMeta=function(){
        if(token!==mountedToken)return;
        try{
          var seek=clamp(1,0,Math.max(0,v.duration-.15));
          if(v.duration<.35){release(true);return;}
          v.currentTime=seek;
        }catch(_){release(false);}
      };
      var onSeek=function(){v.pause();release(true);};
      var onError=function(){release(false);};
      v.addEventListener('loadedmetadata',onMeta);
      v.addEventListener('seeked',onSeek);
      v.addEventListener('error',onError);
      v.preload='auto';
      v.muted=true;
      v.src=source(current(),next);
      v.load();
    }
  }
  function updateScore(absolute){
    if(!isLive())return;
    var s=current(),ratio=clamp(absolute/s.endTime,0,1);
    var cluster=scene.querySelector('.fc-score-cluster');
    if(!cluster)return;
    if(s.kind==='linear'){
      var frame=sourceScoreFrame(ratio),frameURL=mechanicalImage(frame);
      scene.querySelectorAll('[data-fc-score-frame],[data-fc-score-shadow-img]').forEach(function(img){
        if(img.dataset.frame!==String(frame)){img.src=frameURL;img.dataset.frame=String(frame);}
      });
      scene.querySelectorAll('[data-fc-line],[data-fc-shadow-line]').forEach(function(line){
        line.style.left=(12+76*ratio)+'%';
      });
      var pulse=scene.querySelector('[data-fc-pulse]');
      if(pulse){
        pulse.style.opacity=absolute>=113?'0':'.9';
        pulse.style.left=(12+76*ratio)+'%';
        pulse.style.top=(89-18*ratio)+'%';
        pulse.style.transform='scale('+(0.68+Math.abs(Math.sin(absolute*3.4))*.4)+')';
      }
    }else{
      scene.querySelectorAll('[data-fc-needle="0"]').forEach(function(el){el.style.transform='rotate('+(-65+95*ratio)+'deg)';});
      scene.querySelectorAll('[data-fc-needle="1"]').forEach(function(el){el.style.transform='rotate('+(-55+129*Math.min(1,ratio*1.2))+'deg)';});
      var wings=[clamp((ratio-.12)*260,0,180),clamp((ratio-.37)*275,0,180),clamp((ratio-.69)*440,0,180)];
      scene.querySelectorAll('.fc-score-cluster [data-fc-wing]').forEach(function(el){
        el.style.setProperty('--fc-fold-angle',wings[Number(el.dataset.fcWing)]+'deg');
      });
      scene.querySelectorAll('.fc-score-cluster .fc-fold-stage').forEach(function(el){
        el.classList.toggle('is-folded',wings.every(function(a){return a>=174;}));
      });
    }
  }
  function updateInspect(){
    if(!isLive())return;
    var s=current();
    if(s.kind==='linear'){
      var frame=sourceScoreFrame(selection.lastTime/s.endTime),lever=scene.querySelector('[data-fc-inspect-lever]');
      var img=scene.querySelector('[data-fc-inspect-img]');
      if(img&&img.dataset.frame!==String(frame)){img.src=mechanicalImage(frame);img.dataset.frame=String(frame);}
      if(lever && document.activeElement!==lever)lever.value=frame;
    }else{
      scene.querySelectorAll('.fc-inspection [data-fc-wing]').forEach(function(el){
        el.style.setProperty('--fc-fold-angle',selection.folds[Number(el.dataset.fcWing)]+'deg');
      });
      var full=selection.folds.every(function(a){return a>175;});
      scene.querySelectorAll('.fc-inspection .fc-fold-stage').forEach(function(el){el.classList.toggle('is-folded',full);});
    }
    var target=scene.querySelector('.fc-inspection .fc-inspect-mechanical, .fc-inspection .fc-inspect-fold');
    if(target)target.style.transform='translate('+selection.scorePanX+'px,'+selection.scorePanY+'px) scale('+selection.scoreZoom+')';
  }
  function progress(){
    if(!isLive()||!player||!selection.open)return;
    var m=current().stages[selection.index];
    if(Number.isFinite(player.currentTime))selection.lastTime=m.start+player.currentTime;
    updateScore(selection.lastTime);
    if(selection.scoreInspect)updateInspect();
  }
  function select(index){
    if(!isLive())return;
    var s=current(),i=clamp(index,0,s.stages.length-1);
    lastTrigger=document.activeElement;
    focusCard(i,true);
    selection.open=true;selection.paused=false;selection.scoreInspect=false;
    var overlay=scene.querySelector('[data-fc-projection]');
    overlay.hidden=false;scene.classList.add('is-projected');
    var inspect=scene.querySelector('[data-fc-inspection]');
    inspect.hidden=true;
    var close=scene.querySelector('[data-fc-action="close"]:not(.fc-projection-scrim)');
    if(close)close.focus({preventScroll:true});
    loadSelected();
  }
  function loadSelected(){
    if(!isLive()||!selection.open)return;
    stopMedia();
    var token=serial,s=current(),i=selection.index;
    player=scene.querySelector('[data-fc-film]');
    var status=scene.querySelector('[data-fc-film-status]');
    var frame=scene.querySelector('.fc-film-wrap');
    frame.classList.remove('has-error','has-started');
    if(status)status.textContent=i18n('loading');
    player.muted=selection.muted;
    player.loop=false;
    player.poster=s.poster;
    player.src=source(s,i);
    player.load();
    selection.lastTime=s.stages[i].start;
    updateScore(selection.lastTime);
    function play(){
      if(token!==serial || !isLive() || !selection.open)return;
      var promise=player.play();
      if(promise&&promise.then){
        promise.then(function(){if(token!==serial)return;frame.classList.add('has-started');status.textContent='';selection.paused=false;syncPlayButton();})
        .catch(function(){if(token===serial){status.textContent=i18n('play')+' ▶';selection.paused=true;syncPlayButton();}});
      }
    }
    var ready=function(){
      if(token!==serial)return;
      try{player.currentTime=0;}catch(_){}
      play();
    };
    if(player.readyState>=2)ready();
    else player.addEventListener('canplay',ready,{once:true});
  }
  function nextStage(dir){
    if(!isLive())return;
    var s=current(),n=selection.index+dir;
    if(n<0||n>=s.stages.length){
      if(selection.open && dir>0){
        var status=scene.querySelector('[data-fc-film-status]');
        if(status)status.textContent=i18n('allEnd');
      }
      return;
    }
    focusCard(n,true);
    if(selection.open)loadSelected();
  }
  function syncPlayButton(){
    if(!isLive())return;
    scene.querySelectorAll('[data-fc-action="play"]').forEach(function(btn){
      var t=selection.paused?i18n('play'):i18n('pause');
      btn.setAttribute('aria-label',t);
      btn.textContent=selection.paused?'▶':'Ⅱ';
    });
  }
  function closeProjection(){
    if(!isLive()||!selection.open)return;
    stopMedia();selection.open=false;selection.scoreInspect=false;
    scene.classList.remove('is-projected');
    scene.querySelector('[data-fc-projection]').hidden=true;
    scene.querySelector('[data-fc-inspection]').hidden=true;
    scene.querySelector('.fc-score-cluster')?.classList.remove('is-magnetic');
    if(lastTrigger&&lastTrigger.isConnected){lastTrigger.focus({preventScroll:true});}
    else scene.querySelector('[data-fc-card="'+selection.index+'"] button')?.focus({preventScroll:true});
  }
  function rebuildSeries(index){
    if(!isLive()||selection.series===index)return;
    stopMedia();clearPreviews();
    selection.series=index;selection.index=0;selection.open=false;
    selection.scoreInspect=false;selection.folds=[0,0,0];selection.lastTime=0;
    var item=works.find(function(w){return w.slug==='ruin-garden';});
    var old=scene;
    var parent=old.parentNode;
    var template=document.createElement('template');template.innerHTML=pageMarkup(item);
    var next=template.content.querySelector('[data-fc-scene]');
    parent.replaceChild(next,old);scene=null;
    mount();
  }
  function setInspect(open){
    if(!isLive()||!selection.open)return;
    selection.scoreInspect=open;
    var overlay=scene.querySelector('[data-fc-inspection]');
    overlay.hidden=!open;
    if(open){selection.scoreZoom=1;selection.scorePanX=0;selection.scorePanY=0;updateInspect();overlay.querySelector('button')?.focus({preventScroll:true});}
  }
  function wireEvents(){
    if(!isLive())return;
    var rail=scene.querySelector('[data-fc-rail]');
    var strip=scene.querySelector('.fc-strip');
    scene.addEventListener('click',function(event){
      var node=event.target.closest('[data-fc-action]');
      if(!node)return;
      var action=node.dataset.fcAction;
      if(action==='select'){select(Number(node.dataset.fcIndex));return;}
      if(action==='series'){rebuildSeries(Number(node.dataset.fcSeries));return;}
      if(action==='close'){closeProjection();return;}
      if(action==='inspect'){setInspect(true);return;}
      if(action==='stop-inspect'){setInspect(false);return;}
      if(action==='previous'){if(selection.open)nextStage(-1);else focusCard(selection.index-1,true);return;}
      if(action==='next'){if(selection.open)nextStage(1);else focusCard(selection.index+1,true);return;}
      if(action==='sound'){
        selection.muted=!selection.muted;
        if(player)player.muted=selection.muted;
        node.textContent=selection.muted?'♪̸':'♫';
        node.setAttribute('aria-label',i18n(selection.muted?'sound':'mute'));return;
      }
      if(action==='play'&&player){
        if(player.paused){var p=player.play();if(p&&p.catch)p.catch(function(){});selection.paused=false;}
        else{player.pause();selection.paused=true;}
        syncPlayButton();return;
      }
      if(action==='wing'){
        var wi=Number(node.dataset.fcWingIndex);selection.folds[wi]=selection.folds[wi]>90?0:180;
        updateInspect();return;
      }
      if(action==='zoom-in'||action==='zoom-out'){
        selection.scoreZoom=clamp(selection.scoreZoom*(action==='zoom-in'?1.19:1/1.19),.7,3);updateInspect();return;
      }
      if(action==='reset-score'){
        selection.folds=[0,0,0];selection.scoreZoom=1;selection.scorePanX=0;selection.scorePanY=0;updateInspect();return;
      }
    });
    scene.querySelector('[data-fc-slider]').addEventListener('input',function(event){
      focusCard(Number(event.target.value),true);
    });
    function nearest(){
      if(!isLive())return;
      var center=rail.scrollLeft+rail.clientWidth/2,closest=0,diff=Infinity;
      scene.querySelectorAll('[data-fc-card]').forEach(function(card,i){
        var distance=Math.abs(card.offsetLeft+card.offsetWidth/2-center);
        if(distance<diff){closest=i;diff=distance;}
      });
      return closest;
    }
    rail.addEventListener('scroll',function(){
      if(scrollFrame)return;
      scrollFrame=requestAnimationFrame(function(){
        scrollFrame=0;
        var near=nearest();
        if(!selection.open && near!==selection.index)focusCard(near,false);
      });
    },{passive:true});
    var drag=null;
    rail.addEventListener('pointerdown',function(ev){
      if(ev.pointerType!=='mouse'||ev.button!==0)return;
      drag={id:ev.pointerId,x:ev.clientX,left:rail.scrollLeft,moved:false};
      rail.classList.add('is-dragging');
    });
    rail.addEventListener('pointermove',function(ev){
      if(!drag||drag.id!==ev.pointerId)return;
      var dx=ev.clientX-drag.x;
      if(Math.abs(dx)>7){drag.moved=true;rail.dataset.fcJustDragged='1';}
      if(drag.moved){rail.scrollLeft=drag.left-dx;}
    });
    var finishDrag=function(){
      if(!drag)return;drag=null;rail.classList.remove('is-dragging');
      window.setTimeout(function(){if(rail.isConnected)delete rail.dataset.fcJustDragged;},100);
      align(nearest(),true);
    };
    rail.addEventListener('pointerup',finishDrag);
    rail.addEventListener('pointercancel',finishDrag);
    rail.addEventListener('click',function(ev){
      if(rail.dataset.fcJustDragged){ev.preventDefault();ev.stopPropagation();}
    },true);
    rail.addEventListener('wheel',function(ev){
      if(selection.open)return;
      // Keep ordinary vertical page scrolling elsewhere intact.
      if(Math.abs(ev.deltaX)>Math.abs(ev.deltaY)*.6 || ev.shiftKey){
        ev.preventDefault();rail.scrollLeft+=(ev.deltaX||ev.deltaY);
      }
    },{passive:false});
    player=scene.querySelector('[data-fc-film]');
    player.addEventListener('timeupdate',progress);
    player.addEventListener('ended',function(){nextStage(1);});
    player.addEventListener('error',function(){
      if(!selection.open)return;
      var status=scene.querySelector('[data-fc-film-status]');
      if(status)status.textContent=i18n('missing');
      scene.querySelector('.fc-film-wrap').classList.add('has-error');
      // No fake video or endless loading for clips not yet uploaded.
      selection.paused=true;syncPlayButton();
    });
    var cluster=scene.querySelector('.fc-score-cluster');
    cluster.addEventListener('pointerenter',function(){
      if(window.matchMedia('(hover:hover)').matches)cluster.classList.add('is-magnetic');
    });
    cluster.addEventListener('pointerleave',function(){
      cluster.classList.remove('is-magnetic');
      cluster.style.setProperty('--fc-magnet-x','0px');cluster.style.setProperty('--fc-magnet-y','0px');
    });
    cluster.addEventListener('pointermove',function(ev){
      if(!cluster.classList.contains('is-magnetic'))return;
      var rect=cluster.getBoundingClientRect(),cx=(ev.clientX-rect.left)/rect.width-.5,cy=(ev.clientY-rect.top)/rect.height-.5;
      cluster.style.setProperty('--fc-magnet-x',(cx*9).toFixed(1)+'px');
      cluster.style.setProperty('--fc-magnet-y',(cy*8).toFixed(1)+'px');
    },{passive:true});
    var lever=scene.querySelector('[data-fc-inspect-lever]');
    if(lever)lever.addEventListener('input',function(){
      var img=scene.querySelector('[data-fc-inspect-img]');
      img.src=mechanicalImage(Number(lever.value));
      img.dataset.frame=String(lever.value);
    });
    scene.querySelectorAll('.fc-inspection [data-fc-drag-wing]').forEach(function(wing){
      var wi=Number(wing.dataset.fcDragWing),start=null,deg=[0,120,-120][wi]*Math.PI/180;
      wing.addEventListener('pointerdown',function(ev){
        if(ev.pointerType==='mouse'&&ev.button!==0)return;
        start={id:ev.pointerId,x:ev.clientX,y:ev.clientY,angle:selection.folds[wi]};
        wing.setPointerCapture?.(ev.pointerId);ev.preventDefault();
      });
      wing.addEventListener('pointermove',function(ev){
        if(!start||ev.pointerId!==start.id)return;
        var dx=ev.clientX-start.x,dy=ev.clientY-start.y;
        selection.folds[wi]=clamp(start.angle+(dx*Math.sin(deg)-dy*Math.cos(deg))*.8,0,180);
        updateInspect();ev.preventDefault();
      });
      var end=function(ev){
        if(!start||(ev.pointerId!=null&&ev.pointerId!==start.id))return;
        selection.folds[wi]=selection.folds[wi]>=90?180:0;start=null;updateInspect();
      };
      wing.addEventListener('pointerup',end);wing.addEventListener('pointercancel',end);
    });
    var inspectBody=scene.querySelector('.fc-inspection-body'),pan=null;
    inspectBody.addEventListener('pointerdown',function(ev){
      if(ev.target.closest('button,input,[data-fc-drag-wing]'))return;
      pan={id:ev.pointerId,x:ev.clientX,y:ev.clientY,px:selection.scorePanX,py:selection.scorePanY};
      inspectBody.setPointerCapture?.(ev.pointerId);
    });
    inspectBody.addEventListener('pointermove',function(ev){
      if(!pan||pan.id!==ev.pointerId)return;
      selection.scorePanX=pan.px+ev.clientX-pan.x;
      selection.scorePanY=pan.py+ev.clientY-pan.y;updateInspect();
    });
    inspectBody.addEventListener('pointerup',function(){pan=null;});
    inspectBody.addEventListener('pointercancel',function(){pan=null;});
  }
  function mount(){
    var next=document.querySelector('[data-fc-scene]');
    if(scene===next)return;
    if(scene){stopMedia();clearPreviews();}
    scene=next;player=null;
    if(!scene)return;
    selection.open=false;selection.scoreInspect=false;
    selection.index=0;selection.folds=[0,0,0];
    wireEvents();
    focusCard(0,false);
    requestAnimationFrame(function(){if(isLive()){align(0,false);updatePreviewPriority(0);}});
  }
  var app=document.getElementById('app');
  if(app&&'MutationObserver' in window){new MutationObserver(mount).observe(app,{childList:true,subtree:false});}
  document.addEventListener('keydown',function(event){
    if(!isLive())return;
    if(event.key==='Escape'){
      if(selection.scoreInspect){setInspect(false);event.preventDefault();event.stopImmediatePropagation();return;}
      if(selection.open){closeProjection();event.preventDefault();event.stopImmediatePropagation();return;}
    }
    if(event.altKey||event.ctrlKey||event.metaKey)return;
    if(/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||''))return;
    if(event.key==='ArrowRight'){selection.open?nextStage(1):focusCard(selection.index+1,true);event.preventDefault();}
    if(event.key==='ArrowLeft'){selection.open?nextStage(-1):focusCard(selection.index-1,true);event.preventDefault();}
    if(event.key==='Enter'&&!selection.open&&document.activeElement===scene.querySelector('[data-fc-rail]'))select(selection.index);
  },true);
  render();
  mount();
})();
