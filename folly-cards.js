/* Folly card archive · 2026-10-14
   Deliberately not a film player: quiet magnetic cards first, projected moving
   images only after selection. Source media and score notation remain in
   folly-archive. Existing site routing / locale switch remain unchanged. */
(function () {
  'use strict';
  if (typeof renderRoom !== 'function' || typeof state === 'undefined') return;

  var ARCHIVE = 'https://ruin-archive.site/';
  var LOCAL_VIDEO = './works/ruin-garden/';
  var PHOTOS = ARCHIVE + 'thumbnails/garden-128/';
  var SERIES = [
    {id:'folly-1',roman:'I',title:{zh:'沉墟心室',en:'Effluent Sedimentation',ja:'沈墟の心室'},
     media:LOCAL_VIDEO+'folly-1/',poster:PHOTOS+'effluent-sedimentation.webp',
     assets:{full:LOCAL_VIDEO+'folly-1-assets/folly-1-full.jpg',back:LOCAL_VIDEO+'folly-1-assets/folly-1-back.jpg',instrument:LOCAL_VIDEO+'folly-1-assets/folly-1-instrument.jpg',body:LOCAL_VIDEO+'folly-1-assets/folly-1-body.jpg',film:LOCAL_VIDEO+'folly-1-assets/instrument-1.mp4'},
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
     media:LOCAL_VIDEO+'folly-2/',poster:PHOTOS+'aether-scorched-earth.webp',
     assets:{full:LOCAL_VIDEO+'folly-2-assets/folly-2-full.jpeg',back:LOCAL_VIDEO+'folly-2-assets/folly-2-back.jpeg',instrument:LOCAL_VIDEO+'folly-2-assets/folly-2-instrument.jpeg',body:LOCAL_VIDEO+'folly-2-assets/folly-2-body.jpeg',film:LOCAL_VIDEO+'folly-2-assets/instrument-2.mp4'},
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
    ja:{group:'フォリー / 風景の断片',instruction:'右へ進み、散らばった瞬間をたどる。',selection:'一枚を選び、その短い変化に入る。',seek:'段階を移動',open:'この瞬間を見る',close:'風景に戻る',prev:'前の段階',next:'次の段階',sound:'音声オン',mute:'消音',play:'再開',pause:'一時停止',score:'楽譜を検視',reset:'リセット',loading:'映像を準備中',missing:'この断片はまだありません',allEnd:'この巻は終わりました',hintI:'楽譜は逆行 · ホバーで校正',hintII:'三つの翼を折る · ホバーで校正',loadingPoster:'',zoom:'拡大'}
  };
  // Short interim captions stay close to the physical artefacts. They can be
  // replaced with the artist's full Chinese/English/Japanese texts later.
  var SERIES_COPY=[
    {
      structure:{
        zh:'主体结构在正面与背面之间显露出不同的构件关系。影像开始之前，先让它作为一件静止的构造被观看。',
        en:'Seen from the front and back, the structure reveals different relationships among its parts. Before the film begins, it remains here as a still construction.',
        ja:'表裏から見ると、構造体の各部材は異なる関係を見せる。映像が始まる前に、まず静止した構築物として見る。'
      },
      instrument:{
        zh:'仪器与主体的局部构造并置于此。下方的影像记录了仪器在运行中逐渐发生的变化。',
        en:'The instrument and the body are set side by side. The moving fragment below records the instrument as it begins to change.',
        ja:'器械と本体の細部を並べて示す。下の映像は、器械が動きのなかで少しずつ変化する様子を記録する。'
      },
      score:{
        zh:'图谱与横向排列的影像共享同一段时间。滑动切片或移动下方滑轨，十五帧记谱便沿原有的机械顺序逆向更替。',
        en:'The notation shares its timeline with the film strip. Move the cards or the rail below; the fifteen score frames advance in the reverse mechanical order.',
        ja:'この譜面は横に並ぶ映像と同じ時間軸を共有する。カードや下のスライダーを動かすと、十五の譜面が機構の逆順に入れ替わる。'
      }
    },
    {
      structure:{
        zh:'主体与背面的两幅图像保留了结构各自的面貌。它们在运动之前，已将构造的重心、连接与空隙呈现出来。',
        en:'The two views retain the structure from either side. Even at rest, its weight, connections and openings become visible.',
        ja:'二つの視点から、構造体の表と裏を記録する。動き始める前から、重み、接合、空隙が見えている。'
      },
      instrument:{
        zh:'仪器的局部与主体细节在此分开陈列；接下来的短片让这些静止的部分进入时间。',
        en:'Details of the instrument and body are displayed separately; the following moving image returns these still parts to time.',
        ja:'器械と本体の細部を分けて並べる。次の短い映像では、静止した各部が時間の中に戻される。'
      },
      score:{
        zh:'折翼图谱与同步指针保留在影像下方。横向滑动时，图谱和双指针随影片阶段改变；亦可独立折叠、校准与展开检视。',
        en:'The folding score and paired needles remain below the images. They follow each fragment of the film and can also be folded, calibrated and inspected on their own.',
        ja:'折り畳み譜と二本の指針を映像の下に置く。映像の段階に連動しながら、独立して折ることも、位置を合わせて確かめることもできる。'
      }
    }
  ];
  var SECTION_TERMS={
    zh:{front:'正面 / 全貌',back:'背面',instrument:'仪器',body:'主体细部',moving:'仪器动态记录',movement:'运动切片',score:'运动图谱',scoreOpen:'展开图谱',scoreClose:'返回图谱',scoreFold:'折叠 / 展开',scoreReset:'复位',frame:'记谱帧'},
    en:{front:'Full view',back:'Back view',instrument:'Instrument',body:'Body detail',moving:'Instrument in motion',movement:'Film fragments',score:'Graphic score',scoreOpen:'Enlarge score',scoreClose:'Return to score',scoreFold:'Fold / unfold',scoreReset:'Reset',frame:'Score frame'},
    ja:{front:'全景',back:'背面',instrument:'器械',body:'本体細部',moving:'器械の動き',movement:'映像断片',score:'動きの譜面',scoreOpen:'譜面を拡大',scoreClose:'譜面に戻る',scoreFold:'折る / 開く',scoreReset:'リセット',frame:'譜面フレーム'}
  };
  function term(key){return (SECTION_TERMS[state.lang]||SECTION_TERMS.zh)[key];}
  function essay(si,key){return label(SERIES_COPY[si][key]);}
  var i18n=function(k){return (COPY[state.lang]||COPY.zh)[k]||'';};
  var label=function(obj){return obj[state.lang]||obj.zh||'';};
  var esc=function(v){return escapeHtml(v == null?'':String(v));};
  var pad=function(n){return String(n).padStart(2,'0');};
  var clamp=function(x,min,max){return Math.max(min,Math.min(max,Number(x)||0));};
  var source=function(s,i){return s.media+String(i+1)+'.mp4';};
  var FILES_I=Array.from({length:15},function(_,i){return ARCHIVE+'attachments/effluent-sedimentation/score-1-'+(i+1)+'.webp';});
  var FILES_I_MOBILE=Array.from({length:15},function(_,i){return ARCHIVE+'assets/mobile-score/effluent-sedimentation/score-1-'+(i+1)+'.webp';});
  var FOLD_BASE=ARCHIVE+'attachments/aether-scorched-earth/';
  var selection={series:0,index:0,focus:[0,0],open:false,muted:true,paused:false,scoreInspect:false,scoreZoom:1,scorePanX:0,scorePanY:0,folds:[0,0,0],lastTime:0,manualFrame:null};
  var scene=null,player=null,serial=0,queue=[],previewInFlight=0,previewComplete=new Set(),mountedToken=0;
  // Only one in-card film is allowed to play. The still-image extraction uses
  // a different off-screen video so hovering cannot disturb decoding.
  var hoverFilm={card:null,video:null,si:-1,index:-1,timer:0,request:0,active:false};
  function stopHoverFilm(){
    hoverFilm.request++;
    clearTimeout(hoverFilm.timer);
    hoverFilm.timer=0;
    if(hoverFilm.video){
      try{
        hoverFilm.video.pause();
        hoverFilm.video.removeAttribute('src');
        hoverFilm.video.load();
      }catch(_){}
    }
    hoverFilm.card?.classList.remove('is-hovering','is-previewing');
    hoverFilm.card=null;hoverFilm.video=null;
    hoverFilm.si=-1;hoverFilm.index=-1;hoverFilm.active=false;
  }
  function startHoverFilm(card,si,index,delay){
    if(!card?.isConnected||selection.open||!isLive())return;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    if(hoverFilm.card===card&&(hoverFilm.active||hoverFilm.timer))return;
    stopHoverFilm();
    var rail=railFor(si);
    if(!rail||rail.classList.contains('is-dragging'))return;
    hoverFilm.card=card;hoverFilm.si=si;hoverFilm.index=index;
    card.classList.add('is-hovering');
    var ticket=hoverFilm.request;
    hoverFilm.timer=window.setTimeout(function(){
      hoverFilm.timer=0;
      if(ticket!==hoverFilm.request||selection.open||!card.isConnected)return;
      var film=card.querySelector('.fc-hover-video');
      if(!film)return;
      hoverFilm.video=film;
      film.loop=true;
      film.muted=true;
      film.preload='metadata';
      film.src=source(SERIES[si],index);
      function begin(){
        if(ticket!==hoverFilm.request||selection.open||!card.isConnected)return;
        try{
          var target=Math.min(2,Math.max(0,film.duration-.3));
          film.currentTime=target;
        }catch(_){}
        var promise=film.play();
        if(promise?.then)promise.then(function(){
          if(ticket!==hoverFilm.request){film.pause();return;}
          hoverFilm.active=true;
          card.classList.add('is-previewing');
        }).catch(function(){/* autoplay may be blocked by a browser */});
      }
      if(film.readyState>=1)begin();
      else film.addEventListener('loadedmetadata',begin,{once:true});
      film.load();
    },delay);
  }
  var io=null,scrollFrame=0,playRaf=0,hoverRAF=0,lastTrigger=null,resizeTimer=0;
  var upcomingVideo=null;
  function releaseUpcoming(){
    if(!upcomingVideo)return;
    try{upcomingVideo.pause();upcomingVideo.removeAttribute('src');upcomingVideo.load();}catch(_){}
    upcomingVideo=null;
  }
  function warmFollowing(){
    releaseUpcoming();
    if(!selection.open||!isLive())return;
    var next=selection.index+1;
    if(next>=current().stages.length||navigator.connection?.saveData)return;
    // Range-cache just the next clip's metadata; no mass download or autoplay.
    var warm=document.createElement('video');
    warm.preload='metadata';
    warm.muted=true;
    warm.src=source(current(),next);
    try{warm.load();upcomingVideo=warm;}catch(_){}
  }

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
    var lever='<div class="fc-mechanical-lever" aria-hidden="true"><i class="fc-mechanical-guide"></i><i class="fc-mechanical-ring"></i><i class="fc-mechanical-knob"></i></div>';
    var notation=mechanical?
      '<div class="fc-score-notation fc-mechanical-notation"><img class="fc-score-frame" data-fc-score-frame src="'+mechanicalImage(15)+'" alt="">'+lever+'<div class="fc-scan-line" data-fc-line></div><div class="fc-scan-pulse" data-fc-pulse></div></div>':
      '<div class="fc-score-notation fc-fold-notation">'+foldMarkup(false)+
       '<div class="fc-radial-needles" aria-hidden="true"><i data-fc-needle="0"></i><i data-fc-needle="1"></i></div></div>';
    var shadow=mechanical?
      '<div class="fc-shadow-scan"><img data-fc-score-shadow-img src="'+mechanicalImage(15)+'" alt="">'+lever+'<i data-fc-shadow-line></i></div>':
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
    return '<li class="fc-card" data-fc-card="'+index+'" data-fc-series="'+SERIES.indexOf(s)+'">'+
      '<button class="fc-card-button" type="button" data-fc-action="select" data-fc-index="'+index+'" data-fc-series="'+SERIES.indexOf(s)+'" aria-label="'+esc(i18n('open')+': '+label(stage))+'">'+
        '<span class="fc-frame">'+
          '<canvas class="fc-preview-frame" aria-hidden="true"></canvas>'+
          '<video class="fc-preview" playsinline webkit-playsinline preload="none" muted aria-hidden="true"></video>'+
          '<video class="fc-hover-video" playsinline webkit-playsinline preload="none" muted loop aria-hidden="true"></video>'+
          '<span class="fc-card-filmwash" aria-hidden="true"></span><span class="fc-card-open-sign">↗</span></span>'+
        '<span class="fc-card-copy"><span class="fc-card-count">'+pad(index+1)+' <small>/ '+pad(s.stages.length)+'</small></span>'+
        '<span class="fc-card-name">'+esc(label(stage))+'</span></span>'+
      '</button></li>';
  }


  function assetPairMarkup(s,si,kind){
    var front=kind==='structure',items=front?['full','back']:['instrument','body'];
    return '<div class="fc-asset-pair fc-asset-pair-'+kind+'">'+items.map(function(k){
      return '<figure class="fc-artifact fc-artifact-'+k+'"><div class="fc-artifact-image">'+
        '<img src="'+esc(s.assets[k])+'" loading="lazy" decoding="async" alt="'+esc(label(s.title)+' — '+term(k==='full'?'front':k))+'"></div>'+
        '<figcaption><span>'+term(k==='full'?'front':k)+'</span><small>FOLLY '+s.roman+' / '+k.toUpperCase()+'</small></figcaption></figure>';
    }).join('')+'</div>';
  }
  function instrumentMarkup(s,si){
    return '<div class="fc-instrument-wrap">'+
      '<div class="fc-subchapter"><span>0'+(si+1)+' / A</span><h3>'+esc(term('moving'))+'</h3></div>'+
      '<div class="fc-instrument-card" data-fc-instrument-card data-fc-series="'+si+'">'+
        '<button class="fc-card-button" type="button" data-fc-action="instrument" data-fc-series="'+si+'" aria-label="'+esc(term('moving'))+'">'+
          '<span class="fc-frame"><canvas class="fc-preview-frame" aria-hidden="true"></canvas>'+
          '<video class="fc-preview" playsinline webkit-playsinline preload="none" muted aria-hidden="true"></video>'+
          '<video class="fc-hover-video" playsinline webkit-playsinline preload="none" muted loop aria-hidden="true"></video>'+
          '<span class="fc-card-open-sign">↗</span></span>'+
          '<span class="fc-card-copy"><span class="fc-card-count">01 <small>/ 01</small></span>'+
          '<span class="fc-card-name">'+esc(term('moving'))+'</span></span>'+
        '</button></div>'+
      '<p class="fc-instrument-description">'+esc(essay(si,'instrument'))+'</p>'+
    '</div>';
  }
  function inlineScoreMarkup(s,si){
    return '<section class="fc-inline-score" data-fc-inline-score="'+si+'">'+
      '<div class="fc-inline-score-top"><div><p>FOLLY '+s.roman+' / NOTATION</p><h3>'+esc(term('score'))+'</h3></div>'+
      '<button type="button" class="fc-inline-expand" data-fc-action="score-expand" data-fc-series="'+si+'" aria-label="'+esc(term('scoreOpen'))+'">'+
      esc(term('scoreOpen'))+' ↗</button></div>'+
      '<div class="fc-inline-score-main"><div class="fc-inline-score-device">'+scoreMarkup(s)+
        '<button type="button" class="fc-inline-score-fold" data-fc-action="score-fold" data-fc-series="'+si+'" '+
        (s.kind==='linear'?'hidden':'')+'>'+esc(term('scoreFold'))+' △</button>'+
      '</div><div class="fc-inline-score-text"><p>'+esc(essay(si,'score'))+'</p>'+
        '<span data-fc-score-state>01 / '+pad(s.stages.length)+'</span>'+
        '<div class="fc-inline-score-actions">'+
          '<button type="button" data-fc-action="score-reset" data-fc-series="'+si+'">'+esc(term('scoreReset'))+' ↺</button>'+
          '<button type="button" data-fc-action="score-expand" data-fc-series="'+si+'">'+esc(term('scoreOpen'))+' ↗</button>'+
        '</div>'+
      '</div></div>'+
      '<div class="fc-inline-score-foot"><span>FOLLY '+s.roman+' / SCORE</span>'+
        '<span data-fc-score-frame-label>'+esc(term('frame'))+' '+(s.kind==='linear'?'15':'—')+'</span></div>'+
    '</section>';
  }
  // Each film is laid out independently; neither is hidden by a series tab.
  function projectionMarkup(s, si) {
    return '<div class="fc-projection" data-fc-projection="'+si+'" hidden role="dialog" aria-modal="true" aria-label="'+esc(i18n('open'))+'">'+
      '<div class="fc-projection-scrim" data-fc-action="close"></div>'+
      '<div class="fc-projection-shell">'+
        '<div class="fc-projection-top"><span>FOLLY '+s.roman+' <b data-fc-projection-count>01 / '+pad(s.stages.length)+'</b></span>'+
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
            '<button type="button" data-fc-action="sound" aria-label="'+esc(i18n('sound'))+'">♪̸</button></div></div>'+
        '<div class="fc-inspection" data-fc-inspection hidden>'+
          '<div class="fc-inspection-head"><span>FOLLY '+s.roman+' / SCORE</span>'+
            '<button type="button" data-fc-action="stop-inspect" aria-label="'+esc(i18n('close'))+'">×</button></div>'+
          '<div class="fc-inspection-body">'+(s.kind==='linear'?
              '<div class="fc-inspect-mechanical"><img data-fc-inspect-img src="'+mechanicalImage(15)+'" alt="">'+
                '<input class="fc-inspect-lever" data-fc-inspect-lever type="range" min="1" max="15" step="1" value="15" orient="vertical" aria-label="15 score frames"></div>':
              '<div class="fc-inspect-fold">'+foldMarkup(false)+
                '<div class="fc-inspect-wings">'+[1,2,3].map(function(i){return '<button type="button" data-fc-action="wing" data-fc-wing-index="'+(i-1)+'">'+pad(i)+'</button>';}).join('')+'</div></div>')+
          '</div><div class="fc-inspection-foot">'+
            '<button type="button" data-fc-action="zoom-out" aria-label="Zoom out">−</button>'+
            '<button type="button" data-fc-action="zoom-in" aria-label="Zoom in">+</button>'+
            '<button type="button" data-fc-action="reset-score">'+esc(i18n('reset'))+' ↺</button></div>'+
        '</div>'+
      '</div></div>';
  }
  function sectionMarkup(s, si) {
    return '<section class="fc-series-block" data-fc-series-block="'+si+'" style="--fc-video-aspect:16 / 9;--fc-ratio-number:1.77778">'+
      '<div class="fc-series-heading">'+
        '<div class="fc-series-number">'+s.roman+' <span>/ 0'+(si+1)+'</span></div>'+
        '<div class="fc-series-title"><h2>'+esc(label(s.title))+'</h2>'+
        '<p>FOLLY '+s.roman+' — '+pad(s.stages.length)+' '+(state.lang==='zh'?'个瞬间':state.lang==='ja'?'の瞬間':'MOMENTS')+'</p></div>'+
      '</div>'+
      '<div class="fc-series-composition">'+assetPairMarkup(s,si,'structure')+
        '<p class="fc-structure-description">'+esc(essay(si,'structure'))+'</p>'+
        assetPairMarkup(s,si,'detail')+
        instrumentMarkup(s,si)+
      '</div>'+
      '<div class="fc-subchapter fc-main-subchapter"><span>0'+(si+1)+' / B</span><h3>'+esc(term('movement'))+'</h3></div>'+
      '<div class="fc-gallery-area"><div class="fc-rail" data-fc-rail="'+si+'" tabindex="0" aria-label="'+esc(i18n('seek')+' / '+label(s.title))+'">'+
        '<ol class="fc-strip">'+s.stages.map(function(stage,index){return cardMarkup(stage,index,s);}).join('')+'</ol>'+
      '</div></div>'+
      '<div class="fc-navigation"><div class="fc-rail-index"><strong data-fc-index-display>01</strong><span> / '+pad(s.stages.length)+'</span></div>'+
        '<input class="fc-slider" data-fc-slider="'+si+'" type="range" min="0" max="1000" value="0" step="1" aria-label="'+esc(i18n('seek')+' / '+label(s.title))+'">'+
        '<span class="fc-sideways-hint">'+(state.lang==='zh'?'左右滑动浏览':state.lang==='ja'?'横にスワイプ':'SWIPE SIDEWAYS')+' ↔</span></div>'+
      inlineScoreMarkup(s,si)+
    '</section>';
  }
  function pageMarkup(item) {
    var intro=localised(item.intro);
    return '<section class="room-view fc-room"><header class="room-head">'+
      '<button type="button" data-action="home" class="room-back">← '+esc(labels[state.lang].back)+'</button>'+
      '<p>'+esc(labels[state.lang].works)+' / '+esc(localised(item.title))+'</p>'+languageSwitch()+'</header>'+
      '<div class="fc-page" data-fc-scene>'+
        '<div class="fc-page-heading"><div class="fc-heading-primary">'+
          '<p>'+esc(i18n('group'))+'</p><h1>'+esc(localised(item.title))+'</h1></div>'+
          '<p class="fc-instruction">'+esc(i18n('instruction'))+'<span>'+esc(i18n('selection'))+'</span></p></div>'+
        '<div class="fc-scroll-content">'+SERIES.map(sectionMarkup).join('')+
          '<section class="fc-essay" aria-label="Folly notes"><div class="fc-essay-rule"></div>'+
            '<p class="fc-essay-index">FOLLY / '+(state.lang==='zh'?'关于作品':state.lang==='ja'?'作品について':'NOTES')+'</p>'+
            '<p class="fc-essay-intro">'+esc(intro)+'</p>'+
            '<div class="fc-essay-space" aria-hidden="true"></div>'+
          '</section>'+
        '</div>'+
        SERIES.map(projectionMarkup).join('')+
      '</div></section>';
  }
  var originalRoom=renderRoom;
  renderRoom=function(item){return item&&item.slug==='ruin-garden'?pageMarkup(item):originalRoom(item);};

  function activeOverlay(){return scene?.querySelector('[data-fc-projection="'+selection.series+'"]')||null;}
  function block(si){return scene?.querySelector('[data-fc-series-block="'+si+'"]')||null;}
  function railFor(si){return block(si)?.querySelector('[data-fc-rail]')||null;}
  function isLive(){return !!(scene&&scene.isConnected);}
  function stopMedia(){
    serial++;
    if(player){try{player.pause();player.removeAttribute('src');player.load();}catch(_){}}
    if(playRaf){cancelAnimationFrame(playRaf);playRaf=0;}
  }
  function clearPreviews(){
    stopHoverFilm();
    mountedToken++;queue=[];previewComplete=new Set();previewInFlight=0;
    if(io){io.disconnect();io=null;}
    if(scene)scene.querySelectorAll('.fc-preview').forEach(function(v){
      try{v.pause();v.removeAttribute('src');v.load();}catch(_){}
    });
  }
  function align(si,index,smooth) {
    var rail=railFor(si),card=block(si)?.querySelector('[data-fc-card="'+index+'"]');
    if(!rail||!card)return;
    // Explicit keyboard/next-stage navigation only: bring an off-screen
    // card into view, without aligning its centre to a magnetic point.
    var viewport=rail.getBoundingClientRect(),r=card.getBoundingClientRect();
    var inset=24,delta=0;
    if(r.left<viewport.left+inset)delta=r.left-viewport.left-inset;
    else if(r.right>viewport.right-inset)delta=r.right-viewport.right+inset;
    if(delta)rail.scrollBy({left:delta,behavior:smooth?'smooth':'auto'});
  }
  function focusCard(si,index,scroll) {
    if(!isLive())return;
    var s=SERIES[si],i=clamp(index,0,s.stages.length-1),root=block(si);
    if(!root)return;
    selection.focus[si]=i;
    if(!selection.open){selection.series=si;selection.index=i;}
    // Record the nearest stage for the counter only. No selected/magnetic
    // class, implicit scrolling or forced rest position.
    root.querySelector('[data-fc-index-display]').textContent=pad(i+1);
    var slider=root.querySelector('[data-fc-slider]');
    var rail=railFor(si);
    var max=rail?Math.max(0,rail.scrollWidth-rail.clientWidth):0;
    if(slider&&document.activeElement!==slider)slider.value=String(max?Math.round(rail.scrollLeft/max*1000):0);
    if(scroll)align(si,i,true);
    if(nearViewport(root))prioritizePreviews(si,i);
    if(selection.open&&selection.series===si){
      var overlay=activeOverlay();
      overlay.querySelector('[data-fc-now-title]').textContent=label(s.stages[i]);
      overlay.querySelector('[data-fc-time-index]').textContent=pad(i+1)+' / '+pad(s.stages.length);
      overlay.querySelector('[data-fc-projection-count]').textContent=pad(i+1)+' / '+pad(s.stages.length);
    }
  }
  function nearViewport(element) {
    if(!element)return false;
    var box=element.getBoundingClientRect();
    return box.bottom>-300 && box.top<window.innerHeight+420;
  }
  function prioritizePreviews(si,index) {
    if(!isLive())return;
    // Only the current neighbourhood, not all thirteen videos at once.
    var n=SERIES[si].stages.length;
    var nearby=[index,index+1,index-1,index+2,index-2].filter(function(i){return i>=0&&i<n;});
    var waiting=nearby.map(function(i){return {si:si,index:i,key:si+':'+i};})
      .filter(function(task){return !previewComplete.has(task.key) && !queue.some(function(q){return q.key===task.key;});});
    queue=waiting.concat(queue);
    processPreviews();
  }
  function applyVideoRatio(si,video) {
    if(!video||!video.videoWidth||!video.videoHeight)return;
    var root=block(si);if(!root)return;
    var ratio=video.videoWidth/video.videoHeight;
    // Metadata, rather than the image's thumbnail crop, defines every frame's physical shape.
    if(ratio>.2&&ratio<6){
      root.style.setProperty('--fc-video-aspect',video.videoWidth+' / '+video.videoHeight);
      root.style.setProperty('--fc-ratio-number',String(ratio));
    }
  }
  // Decode a genuine film frame near 2 seconds into a light canvas still.
  // Once captured, detach the 25MB source from the preview video.
  // Each MP4 is only prepared as its series approaches the viewport.
  function processPreviews() {
    if(!isLive())return;
    while(previewInFlight<2&&queue.length){
      let task=queue.shift();
      if(previewComplete.has(task.key))continue;
      let root=block(task.si),card=root?.querySelector('[data-fc-card="'+task.index+'"]');
      if(!card)continue;
      let v=card.querySelector('video'),canvas=card.querySelector('.fc-preview-frame');
      let token=mountedToken,settled=false,usedFallback=false,watchdog=0;
      previewComplete.add(task.key);
      previewInFlight++;
      function dropVideo(){
        try{v.pause();v.removeAttribute('src');v.load();}catch(_){}
      }
      function release(ok){
        if(settled)return;
        settled=true;
        clearTimeout(watchdog);
        v.removeEventListener('loadedmetadata',meta);
        v.removeEventListener('seeked',seek);
        v.removeEventListener('loadeddata',onData);
        v.removeEventListener('error',bad);
        dropVideo();
        if(token!==mountedToken)return;
        if(ok){
          card.classList.add('has-frame');
          card.classList.remove('has-poster-fallback');
        }else{
          card.classList.add('has-poster-fallback');
          card.title=i18n('missing');
        }
        previewInFlight=Math.max(0,previewInFlight-1);
        processPreviews();
      }
      function capture(){
        if(settled||token!==mountedToken)return;
        if(v.readyState<2||!v.videoWidth||!v.videoHeight)return;
        try{
          var w=Math.min(780,v.videoWidth);
          var h=Math.max(1,Math.round(w*v.videoHeight/v.videoWidth));
          canvas.width=w;canvas.height=h;
          canvas.getContext('2d',{alpha:false}).drawImage(v,0,0,w,h);
          release(true);
        }catch(error){release(false);}
      }
      function meta(){
        if(settled||token!==mountedToken)return;
        applyVideoRatio(task.si,v);
        try{
          if(!Number.isFinite(v.duration)||v.duration<.15){release(false);return;}
          var target=Math.min(2,Math.max(.04,v.duration-.12));
          v.currentTime=target;
        }catch(_){release(false);}
      }
      function seek(){
        if(v.readyState>=2){capture();}
        else v.addEventListener('loadeddata',onData,{once:true});
      }
      function onData(){capture();}
      function bad(){release(false);}
      v.addEventListener('loadedmetadata',meta);
      v.addEventListener('seeked',seek);
      v.addEventListener('error',bad);
      watchdog=window.setTimeout(function(){release(false);},15500);
      v.preload='metadata';
      v.muted=true;
      v.src=source(SERIES[task.si],task.index);
      v.load();
    }
  }
  function updateScore(absolute) {
    var overlay=activeOverlay();
    if(!overlay)return;
    var s=current(),ratio=clamp(absolute/s.endTime,0,1);
    if(s.kind==='linear'){
      var frame=sourceScoreFrame(ratio),frameURL=mechanicalImage(frame);
      // Original Folly I two-stage mechanism: small knob moves first,
      // then the large ring engages after frame 07/08. Film runs 15 -> 01.
      var mechanical=1-ratio, split=6/14;
      var engaged=mechanical<=split?0:clamp((mechanical-split)/(1-split),0,1);
      overlay.querySelectorAll('.fc-mechanical-lever').forEach(function(lever){
        lever.style.setProperty('--fc-mech-knob',(85-70*mechanical).toFixed(2)+'%');
        lever.style.setProperty('--fc-mech-ring',(55-40*engaged).toFixed(2)+'%');
        lever.style.setProperty('--fc-mech-engage',engaged.toFixed(3));
      });
      overlay.querySelectorAll('[data-fc-score-frame],[data-fc-score-shadow-img]').forEach(function(img){
        if(img.dataset.frame!==String(frame)){img.src=frameURL;img.dataset.frame=String(frame);}
      });
      overlay.querySelectorAll('[data-fc-line],[data-fc-shadow-line]').forEach(function(line){
        line.style.left=(12+76*ratio)+'%';
      });
      var pulse=overlay.querySelector('[data-fc-pulse]');
      if(pulse) {
        pulse.style.opacity=absolute>=113?'0':'.9';
        pulse.style.left=(12+76*ratio)+'%';
        pulse.style.top=(89-18*ratio)+'%';
        pulse.style.transform='scale('+(0.68+Math.abs(Math.sin(absolute*3.4))*.4)+')';
      }
    }else{
      overlay.querySelector('[data-fc-needle="0"]')?.style.setProperty('transform','rotate('+(-65+95*ratio)+'deg)');
      overlay.querySelector('[data-fc-needle="1"]')?.style.setProperty('transform','rotate('+(-55+129*Math.min(1,ratio*1.2))+'deg)');
      // Mirror folly-archive's authored 2.5s wait, 720ms hinges,
      // overlapping 432ms apart, and fold order 3 → 2 → 1.
      var wings=[0,0,0];
      [2,1,0].forEach(function(wi,rank){
        var p=clamp((absolute-(2.5+rank*.432))/.720,0,1);
        wings[wi]=180*(p*p*(3-2*p));
      });
      var cluster=overlay.querySelector('.fc-score-cluster');
      if(cluster)cluster.classList.toggle('is-hud-awaiting',absolute<5.1);
      overlay.querySelectorAll('.fc-score-cluster [data-fc-wing]').forEach(function(el){
        el.style.setProperty('--fc-fold-angle',wings[Number(el.dataset.fcWing)]+'deg');
      });
      overlay.querySelectorAll('.fc-score-cluster .fc-fold-stage').forEach(function(el){
        el.classList.toggle('is-folded',wings.every(function(a){return a>=174;}));
      });
    }
  }
  function updateInspect() {
    var overlay=activeOverlay();if(!overlay)return;
    if(current().kind==='linear'){
      var frame=selection.manualFrame==null?sourceScoreFrame(selection.lastTime/current().endTime):selection.manualFrame;
      var lever=overlay.querySelector('[data-fc-inspect-lever]'),img=overlay.querySelector('[data-fc-inspect-img]');
      if(img&&img.dataset.frame!==String(frame)){img.src=mechanicalImage(frame);img.dataset.frame=String(frame);}
      if(lever&&document.activeElement!==lever)lever.value=frame;
    }else{
      overlay.querySelectorAll('.fc-inspection [data-fc-wing]').forEach(function(el){
        el.style.setProperty('--fc-fold-angle',selection.folds[Number(el.dataset.fcWing)]+'deg');
      });
      overlay.querySelectorAll('.fc-inspection .fc-fold-stage').forEach(function(el){
        el.classList.toggle('is-folded',selection.folds.every(function(a){return a>175;}));
      });
    }
    var target=overlay.querySelector('.fc-inspection .fc-inspect-mechanical, .fc-inspection .fc-inspect-fold');
    if(target)target.style.transform='translate('+selection.scorePanX+'px,'+selection.scorePanY+'px) scale('+selection.scoreZoom+')';
  }
  function progress() {
    if(!isLive()||!player||!selection.open)return;
    var m=current().stages[selection.index];
    var length=m.end-m.start;
    var fraction=Number.isFinite(player.duration)&&player.duration>0
      ?clamp((Number(player.currentTime)||0)/player.duration,0,1)
      :0;
    selection.lastTime=m.start+length*fraction;
    updateScore(selection.lastTime);
    if(selection.scoreInspect)updateInspect();
  }
  function syncPlayButton(){
    var overlay=activeOverlay();if(!overlay)return;
    overlay.querySelectorAll('[data-fc-action="play"]').forEach(function(btn){
      btn.textContent=selection.paused?'▶':'Ⅱ';
      btn.setAttribute('aria-label',i18n(selection.paused?'play':'pause'));
    });
  }
  function select(si,index) {
    if(!isLive())return;
    if(selection.open)closeProjection();
    lastTrigger=document.activeElement;
    // Continue from the real currentTime of the in-card film when applicable.
    var resume=(hoverFilm.active&&hoverFilm.si===si&&hoverFilm.index===index&&
      hoverFilm.video&&Number.isFinite(hoverFilm.video.currentTime))
      ?hoverFilm.video.currentTime:0;
    stopHoverFilm();
    selection.series=si;
    selection.open=true;selection.index=clamp(index,0,SERIES[si].stages.length-1);
    selection.paused=false;selection.scoreInspect=false;
    var overlay=activeOverlay();
    overlay.hidden=false;
    scene.classList.add('is-projected');
    block(si)?.querySelector('[data-fc-card="'+selection.index+'"]')?.classList.add('is-playing');
    document.body.classList.add('fc-modal-open');
    scene.querySelectorAll('.fc-page-heading,.fc-scroll-content').forEach(function(node){node.inert=true;});
    focusCard(si,index,false);
    overlay.querySelector('[data-fc-action="close"]:not(.fc-projection-scrim)')?.focus({preventScroll:true});
    loadSelected(resume);
  }
  function loadSelected(startAt){
    if(!isLive()||!selection.open)return;
    stopMedia();
    var token=serial,s=current(),i=selection.index,overlay=activeOverlay();
    player=overlay.querySelector('[data-fc-film]');
    var status=overlay.querySelector('[data-fc-film-status]');
    var frame=overlay.querySelector('.fc-film-wrap');
    frame.classList.remove('has-error','has-started');
    status.textContent=i18n('loading');
    selection.lastTime=s.stages[i].start;
    selection.paused=false;syncPlayButton();updateScore(selection.lastTime);
    player.muted=selection.muted;player.loop=false;player.removeAttribute('poster');
    player.src=source(s,i);player.load();
    var initialTime=clamp(Number(startAt)||0,0,1e7);
    function play(){
      if(token!==serial||!isLive()||!selection.open)return;
      var p=player.play();
      if(p&&p.then)p.then(function(){
        if(token!==serial)return;
        frame.classList.add('has-started');
        status.textContent='';selection.paused=false;syncPlayButton();warmFollowing();
      }).catch(function(){
        if(token===serial){status.textContent=i18n('play')+' ▶';selection.paused=true;syncPlayButton();}
      });
    }
    function prepare(){
      if(token!==serial||!isLive()||!selection.open)return;
      if(initialTime>.08 && Number.isFinite(player.duration)&&player.duration>.3){
        var seekTo=Math.min(initialTime,Math.max(0,player.duration-.18));
        try{
          player.currentTime=seekTo;
          // Wait for the actual seek before revealing/playing the film.
          player.addEventListener('seeked',play,{once:true});
        }catch(_){play();}
      }else if(player.readyState>=2)play();
      else player.addEventListener('canplay',play,{once:true});
    }
    if(player.readyState>=1)prepare();
    else player.addEventListener('loadedmetadata',prepare,{once:true});
  }
  function nextStage(dir) {
    if(!isLive()||!selection.open)return;
    var n=selection.index+dir,s=current();
    if(n<0||n>=s.stages.length){
      if(dir>0){
        selection.paused=true;syncPlayButton();
        activeOverlay().querySelector('[data-fc-film-status]').textContent=i18n('allEnd');
      }
      return;
    }
    var currentBlock=block(selection.series);
    currentBlock?.querySelectorAll('.fc-card.is-playing').forEach(function(card){card.classList.remove('is-playing');});
    selection.index=n;
    currentBlock?.querySelector('[data-fc-card="'+n+'"]')?.classList.add('is-playing');
    focusCard(selection.series,n,true);
    loadSelected();
  }
  function setInspect(open) {
    var overlay=activeOverlay();if(!overlay||!selection.open)return;
    selection.scoreInspect=open;
    var pane=overlay.querySelector('[data-fc-inspection]');
    pane.hidden=!open;
    if(open){
      selection.manualFrame=null;selection.scoreZoom=1;selection.scorePanX=0;selection.scorePanY=0;
      updateInspect();pane.querySelector('button')?.focus({preventScroll:true});
    }else{
      overlay.querySelector('[data-fc-action="inspect"]')?.focus({preventScroll:true});
    }
  }
  function closeProjection() {
    if(!selection.open||!isLive())return;
    stopMedia();
    stopHoverFilm();
    releaseUpcoming();
    var overlay=activeOverlay();
    overlay.querySelector('[data-fc-inspection]').hidden=true;
    overlay.hidden=true;
    overlay.querySelector('.fc-score-cluster')?.classList.remove('is-magnetic');
    selection.open=false;selection.scoreInspect=false;
    scene.classList.remove('is-projected');
    scene.querySelectorAll('.fc-card.is-playing').forEach(function(card){card.classList.remove('is-playing');});
    document.body.classList.remove('fc-modal-open');
    scene.querySelectorAll('.fc-page-heading,.fc-scroll-content').forEach(function(node){node.inert=false;});
    if(lastTrigger?.isConnected)lastTrigger.focus({preventScroll:true});
    else block(selection.series)?.querySelector('[data-fc-card="'+selection.index+'"] button')?.focus({preventScroll:true});
  }
  function nearest(si){
    var rail=railFor(si);if(!rail)return 0;
    var r=rail.getBoundingClientRect(),cx=r.left+r.width/2,best=0,diff=Infinity;
    rail.querySelectorAll('[data-fc-card]').forEach(function(card,i){
      var v=card.getBoundingClientRect(),d=Math.abs((v.left+v.right)/2-cx);
      if(d<diff){best=i;diff=d;}
    });
    return best;
  }
  function wireRail(si){
    var rail=railFor(si),root=block(si);
    if(!rail||!root)return;
    var drag=null,scrollRaf=0,idleTimer=0,touched=false;
    var slider=root.querySelector('[data-fc-slider]');
    function syncRange(){
      if(!slider||document.activeElement===slider)return;
      var max=Math.max(0,rail.scrollWidth-rail.clientWidth);
      slider.value=String(max?Math.round(1000*rail.scrollLeft/max):0);
    }
    function idlePreview(){
      idleTimer=0;
      if(selection.open||!isLive()||document.hidden||drag||hoverFilm.card||!nearViewport(root))return;
      // After someone horizontally explores, a resting tableau comes alive.
      // Never initiate this when the pointer is outside the rail unless a
      // touch gesture brought the visitor here.
      var pointed=(typeof rail.matches==='function'&&rail.matches(':hover'));
      if(!pointed&&!touched)return;
      var index=nearest(si),card=root.querySelector('[data-fc-card="'+index+'"]');
      if(!card)return;
      var bounds=card.getBoundingClientRect(),r=rail.getBoundingClientRect();
      if(bounds.right>r.left+50&&bounds.left<r.right-50)
        startHoverFilm(card,si,index,0);
      touched=false;
    }
    // Trackpad horizontal deltas and touch swipes belong entirely to the
    // browser's native inertial scroller. Vertical mouse wheel stays vertical.
    rail.addEventListener('wheel',function(event){
      if(selection.open||!event.shiftKey||Math.abs(event.deltaX)>Math.abs(event.deltaY))return;
      event.preventDefault();
      rail.scrollLeft+=event.deltaY*(event.deltaMode===1?22:event.deltaMode===2?rail.clientWidth:1);
    },{passive:false});
    // Mouse drag is a free pixel-wise translation, with no release centring.
    rail.addEventListener('pointerdown',function(event){
      if(event.pointerType==='touch'||event.pointerType==='pen'){
        touched=true;
        clearTimeout(idleTimer);
        if(hoverFilm.card?.closest('.fc-rail')===rail)stopHoverFilm();
        return;
      }
      if(event.pointerType!=='mouse'||event.button!==0)return;
      clearTimeout(idleTimer);
      // A mere click must preserve the playing hover video's timestamp.
      // Stop its preview only once the gesture becomes a genuine drag.
      drag={pointerId:event.pointerId,x:event.clientX,left:rail.scrollLeft,moved:false};
    });
    rail.addEventListener('pointermove',function(event){
      if(!drag||drag.pointerId!==event.pointerId)return;
      var dx=event.clientX-drag.x;
      if(Math.abs(dx)>6&&!drag.moved){
        drag.moved=true;
        if(hoverFilm.card?.closest('.fc-rail')===rail)stopHoverFilm();
        rail.classList.add('is-dragging');
        try{rail.setPointerCapture(event.pointerId);}catch(_){}
      }
      if(drag.moved){
        rail.scrollLeft=drag.left-dx;
        event.preventDefault();
      }
    });
    function finishDrag(event){
      if(!drag||(event?.pointerId!=null&&event.pointerId!==drag.pointerId))return;
      var wasMoved=drag.moved;
      drag=null;
      rail.classList.remove('is-dragging');
      if(wasMoved){
        rail.dataset.fcJustDragged='1';
        window.setTimeout(function(){
          if(rail.isConnected)delete rail.dataset.fcJustDragged;
        },170);
      }
      // Intentionally no scrollTo, scroll-snap or alignment on release.
    }
    rail.addEventListener('pointerup',finishDrag);
    rail.addEventListener('pointercancel',finishDrag);
    rail.addEventListener('lostpointercapture',finishDrag);
    rail.addEventListener('click',function(event){
      if(rail.dataset.fcJustDragged){event.preventDefault();event.stopPropagation();}
    },true);
    // Hover can magnify/play a single card after a short, deliberate rest.
    root.querySelectorAll('.fc-card').forEach(function(card){
      var index=Number(card.dataset.fcCard);
      card.addEventListener('pointerenter',function(event){
        if(event.pointerType!=='mouse'||drag||selection.open)return;
        clearTimeout(idleTimer);
        startHoverFilm(card,si,index,460);
      });
      card.addEventListener('pointerleave',function(){
        if(hoverFilm.card===card)stopHoverFilm();
      });
      card.addEventListener('focusin',function(event){
        if(event.target.matches('.fc-card-button'))startHoverFilm(card,si,index,850);
      });
      card.addEventListener('focusout',function(){
        if(hoverFilm.card===card)stopHoverFilm();
      });
    });
    rail.addEventListener('scroll',function(){
      if(hoverFilm.card?.closest('.fc-rail')===rail)stopHoverFilm();
      if(!scrollRaf)scrollRaf=requestAnimationFrame(function(){
        scrollRaf=0;
        syncRange();
        var closest=nearest(si);
        if(selection.focus[si]!==closest)focusCard(si,closest,false);
      });
      clearTimeout(idleTimer);
      // A still card begins a muted miniature preview only AFTER scrolling
      // actually stops. This timer never changes the scroll position.
      idleTimer=setTimeout(idlePreview,1450);
    },{passive:true});
    if(slider){
      slider.addEventListener('input',function(event){
        clearTimeout(idleTimer);
        if(hoverFilm.card?.closest('.fc-rail')===rail)stopHoverFilm();
        var max=Math.max(0,rail.scrollWidth-rail.clientWidth);
        rail.scrollLeft=max*Number(event.target.value)/1000;
      });
      slider.addEventListener('change',function(){syncRange();});
    }
    rail.addEventListener('keydown',function(event){
      if(event.key==='ArrowRight'){focusCard(si,selection.focus[si]+1,true);event.preventDefault();}
      else if(event.key==='ArrowLeft'){focusCard(si,selection.focus[si]-1,true);event.preventDefault();}
      else if(event.key==='Enter'){select(si,selection.focus[si]);event.preventDefault();}
    });
    syncRange();
  }
  function wireOverlay(si) {
    var overlay=scene.querySelector('[data-fc-projection="'+si+'"]');
    var video=overlay.querySelector('[data-fc-film]');
    video.addEventListener('timeupdate',function(){
      if(selection.open&&selection.series===si)progress();
    });
    video.addEventListener('ended',function(){
      if(selection.open&&selection.series===si)nextStage(1);
    });
    video.addEventListener('error',function(){
      if(!selection.open||selection.series!==si||video!==player)return;
      overlay.querySelector('[data-fc-film-status]').textContent=i18n('missing');
      overlay.querySelector('.fc-film-wrap').classList.add('has-error');
      selection.paused=true;syncPlayButton();
    });
    var cluster=overlay.querySelector('.fc-score-cluster');
    cluster.addEventListener('pointerenter',function(){
      if(window.matchMedia('(hover:hover)').matches)cluster.classList.add('is-magnetic');
    });
    cluster.addEventListener('pointerleave',function(){
      cluster.classList.remove('is-magnetic');
      cluster.style.setProperty('--fc-magnet-x','0px');
      cluster.style.setProperty('--fc-magnet-y','0px');
    });
    cluster.addEventListener('pointermove',function(ev){
      if(!cluster.classList.contains('is-magnetic'))return;
      var r=cluster.getBoundingClientRect();
      cluster.style.setProperty('--fc-magnet-x',(((ev.clientX-r.left)/r.width-.5)*9).toFixed(1)+'px');
      cluster.style.setProperty('--fc-magnet-y',(((ev.clientY-r.top)/r.height-.5)*8).toFixed(1)+'px');
    },{passive:true});
    var lever=overlay.querySelector('[data-fc-inspect-lever]');
    if(lever)lever.addEventListener('input',function(){
      if(selection.series!==si)return;
      selection.manualFrame=Number(lever.value);
      var img=overlay.querySelector('[data-fc-inspect-img]');
      img.src=mechanicalImage(selection.manualFrame);
      img.dataset.frame=String(selection.manualFrame);
    });
    overlay.querySelectorAll('.fc-inspection [data-fc-drag-wing]').forEach(function(wing){
      var wi=Number(wing.dataset.fcDragWing),start=null,deg=[0,120,-120][wi]*Math.PI/180;
      wing.addEventListener('pointerdown',function(ev){
        if(ev.pointerType==='mouse'&&ev.button!==0)return;
        start={id:ev.pointerId,x:ev.clientX,y:ev.clientY,angle:selection.folds[wi]};
        try{wing.setPointerCapture?.(ev.pointerId);}catch(_){}
        ev.preventDefault();
      });
      wing.addEventListener('pointermove',function(ev){
        if(!start||ev.pointerId!==start.id)return;
        var dx=ev.clientX-start.x,dy=ev.clientY-start.y;
        selection.folds[wi]=clamp(start.angle+(dx*Math.sin(deg)-dy*Math.cos(deg))*.8,0,180);
        updateInspect();ev.preventDefault();
      });
      var finish=function(ev){
        if(!start||(ev.pointerId!=null&&ev.pointerId!==start.id))return;
        selection.folds[wi]=selection.folds[wi]>=90?180:0;start=null;updateInspect();
      };
      wing.addEventListener('pointerup',finish);
      wing.addEventListener('pointercancel',finish);
    });
    var body=overlay.querySelector('.fc-inspection-body'),pan=null;
    body.addEventListener('pointerdown',function(ev){
      if(ev.target.closest('button,input,[data-fc-drag-wing]'))return;
      pan={id:ev.pointerId,x:ev.clientX,y:ev.clientY,px:selection.scorePanX,py:selection.scorePanY};
      try{body.setPointerCapture?.(ev.pointerId);}catch(_){}
    });
    body.addEventListener('pointermove',function(ev){
      if(!pan||ev.pointerId!==pan.id)return;
      selection.scorePanX=pan.px+ev.clientX-pan.x;
      selection.scorePanY=pan.py+ev.clientY-pan.y;updateInspect();
    });
    body.addEventListener('pointerup',function(){pan=null;});
    body.addEventListener('pointercancel',function(){pan=null;});
  }
  function wireEvents(){
    if(!isLive())return;
    SERIES.forEach(function(_,i){wireRail(i);wireOverlay(i);});
    scene.addEventListener('click',function(event){
      var node=event.target.closest('[data-fc-action]');
      if(!node)return;
      var action=node.dataset.fcAction;
      var si=Number(node.dataset.fcSeries);
      if(action==='select'){
        select(Number(node.dataset.fcSeries),Number(node.dataset.fcIndex));return;
      }
      if(action==='close'){closeProjection();return;}
      if(action==='inspect'){setInspect(true);return;}
      if(action==='stop-inspect'){setInspect(false);return;}
      if(action==='previous'||action==='next'){
        var dir=action==='next'?1:-1;
        if(selection.open)nextStage(dir);
        else focusCard(Number.isInteger(si)?si:selection.series,selection.focus[Number.isInteger(si)?si:selection.series]+dir,true);
        return;
      }
      if(action==='sound'){
        selection.muted=!selection.muted;if(player)player.muted=selection.muted;
        node.textContent=selection.muted?'♪̸':'♫';node.setAttribute('aria-label',i18n(selection.muted?'sound':'mute'));
        return;
      }
      if(action==='play'&&player){
        if(player.paused){
          var p=player.play();if(p&&p.catch)p.catch(function(){});
          selection.paused=false;
        }else{player.pause();selection.paused=true;}
        syncPlayButton();return;
      }
      if(action==='wing'){
        var wi=Number(node.dataset.fcWingIndex);
        selection.folds[wi]=selection.folds[wi]>=90?0:180;updateInspect();return;
      }
      if(action==='zoom-in'||action==='zoom-out'){
        selection.scoreZoom=clamp(selection.scoreZoom*(action==='zoom-in'?1.19:1/1.19),.7,3);updateInspect();return;
      }
      if(action==='reset-score'){
        selection.folds=[0,0,0];selection.manualFrame=null;
        selection.scoreZoom=1;selection.scorePanX=0;selection.scorePanY=0;
        updateInspect();return;
      }
    });
  }
  function mount(){
    var next=document.querySelector('[data-fc-scene]');
    if(scene===next)return;
    if(scene){stopHoverFilm();stopMedia();clearPreviews();}
    releaseUpcoming();
    document.body.classList.remove('fc-modal-open');
    scene=next;player=null;
    if(!scene)return;
    selection.open=false;selection.scoreInspect=false;selection.focus=[0,0];
    wireEvents();
    SERIES.forEach(function(_,si){focusCard(si,0,false);});
    if('IntersectionObserver' in window) {
      io=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            var si=Number(entry.target.dataset.fcSeriesBlock);
            prioritizePreviews(si,selection.focus[si]);
          }
        });
      },{rootMargin:'420px 0px'});
      SERIES.forEach(function(_,si){io.observe(block(si));});
    } else {
      prioritizePreviews(0,0);
    }
  }
  var app=document.getElementById('app');
  if(app&&'MutationObserver' in window){new MutationObserver(mount).observe(app,{childList:true,subtree:false});}
  document.addEventListener('keydown',function(event){
    if(!isLive())return;
    if(event.key==='Escape'){
      if(selection.scoreInspect){setInspect(false);event.preventDefault();event.stopImmediatePropagation();return;}
      if(selection.open){closeProjection();event.preventDefault();event.stopImmediatePropagation();return;}
    }
    if(!selection.open || event.altKey||event.ctrlKey||event.metaKey)return;
    if(/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||''))return;
    if(event.key==='ArrowRight'){nextStage(1);event.preventDefault();}
    if(event.key==='ArrowLeft'){nextStage(-1);event.preventDefault();}
  },true);
  render();
  mount();
})();
