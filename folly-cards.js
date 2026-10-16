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
    zh:{front:'正面 / 全貌',back:'背面',instrument:'仪器',body:'主体细部',moving:'仪器动态记录',movement:'废墟剧场',score:'废墟乐谱',scoreOpen:'展开图谱',scoreClose:'返回图谱',scoreFold:'折叠 / 展开',scoreReset:'复位',frame:'记谱帧'},
    en:{front:'Full view',back:'Back view',instrument:'Instrument',body:'Body detail',moving:'Instrument in motion',movement:'Ruin Theatre',score:'Ruin Score',scoreOpen:'Enlarge score',scoreClose:'Return to score',scoreFold:'Fold / unfold',scoreReset:'Reset',frame:'Score frame'},
    ja:{front:'全景',back:'背面',instrument:'器械',body:'本体細部',moving:'器械の動き',movement:'廃墟劇場',score:'廃墟の楽譜',scoreOpen:'譜面を拡大',scoreClose:'譜面に戻る',scoreFold:'折る / 開く',scoreReset:'リセット',frame:'譜面フレーム'}
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
  var selection={series:0,index:0,focus:[0,0],open:false,muted:true,paused:false,scoreInspect:false,scoreZoom:1,scorePanX:0,scorePanY:0,folds:[0,0,0],lastTime:0,manualFrame:null,instrument:false};
  var scene=null,player=null,serial=0,queue=[],previewInFlight=0,previewComplete=new Set(),mountedToken=0;
  // Only one in-card film is allowed to play. The still-image extraction uses
  // a different off-screen video so hovering cannot disturb decoding.
  var hoverFilm={card:null,video:null,si:-1,index:-1,kind:'film',timer:0,request:0,active:false};
  function stopHoverFilm(){
    hoverFilm.request++;
    clearTimeout(hoverFilm.timer);
    hoverFilm.timer=0;
    if(hoverFilm.video){
      try{
        hoverFilm.video.ontimeupdate=null;
        hoverFilm.video.pause();
        hoverFilm.video.removeAttribute('src');
        hoverFilm.video.load();
      }catch(_){}
    }
    hoverFilm.card?.classList.remove('is-hovering','is-previewing');
    hoverFilm.card=null;hoverFilm.video=null;
    hoverFilm.si=-1;hoverFilm.index=-1;hoverFilm.kind='film';hoverFilm.active=false;
  }
  function startHoverFilm(card,si,index,delay){
    if(!card?.isConnected||selection.open||!isLive())return;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    if(hoverFilm.card===card&&(hoverFilm.active||hoverFilm.timer))return;
    stopHoverFilm();
    var rail=railFor(si);
    if(!rail||rail.classList.contains('is-dragging'))return;
    var isInstrument=card.hasAttribute('data-fc-instrument-card');
    hoverFilm.card=card;hoverFilm.si=si;hoverFilm.index=index;
    hoverFilm.kind=isInstrument?'instrument':'film';
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
      film.src=isInstrument?SERIES[si].assets.film:source(SERIES[si],index);
      film.ontimeupdate=function(){
        if(hoverFilm.video!==film || selection.open)return;
        var duration=Number.isFinite(film.duration)&&film.duration>0?film.duration:1;
        var fraction=clamp(film.currentTime/duration,0,1);
        var stage=SERIES[si].stages[index];
        var t=isInstrument?SERIES[si].endTime*fraction:stage.start+(stage.end-stage.start)*fraction;
        updateInlineScore(si,t);
      };
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
    if(selection.instrument||next>=current().stages.length||navigator.connection?.saveData)return;
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


  // Editable placeholders: one short archive caption and one longer note per
  // photo. None of the date/place values are guessed from the folder name.
  var PHOTO_INFORMATION={
    zh:{
      date:'拍摄日期待补',place:'拍摄地点待补',
      short:[
        {full:'建立状态的正面全貌；材质、尺寸及制作信息待补。',
         back:'坍塌后的背面状态；残留构件与损耗记录待补。',
         instrument:'废墟乐器的局部构造；材料与传动方式待补。',
         body:'坍塌结构的连接细部；断裂与变形记录待补。'},
        {full:'建立状态的正面全貌；支撑方式与材料信息待补。',
         back:'背面与坍塌后的形态；现场变化记录待补。',
         instrument:'废墟乐器的构件细节；制作与动作信息待补。',
         body:'坍塌结构的残余形态；连接、折叠与变形记录待补。'}
      ],
      long:[
        {full:'主体结构在正面与背面之间显露出不同的构件关系。影像开始之前，先让它作为一件静止的构造被观看。',
         back:'从背面重新观看，原先完整的支撑关系开始松动；构件退入背景，坍塌后的形态仍留下建造时的痕迹。此处文字待进一步校订。',
         instrument:'乐器的局部结构被单独取出：连接、承重和可能发声的部件暂时停止运动，等待影像继续展开。此处文字待进一步校订。',
         body:'坍塌结构保留着局部连接与材料断裂的形状，这些细节将原本连续的动作停留在一个可以观察的瞬间。此处文字待进一步校订。'},
        {full:'主体与背面的两幅图像保留了结构各自的面貌。它们在运动之前，已将构造的重心、连接与空隙呈现出来。',
         back:'从背后观看结构，原先稳定的边界变得松散；失去支撑后的材料继续保留着形体和受力的方向。此处文字待进一步校订。',
         instrument:'乐器的细节将运动的起点暂时固定下来。各部分之间的间隙、接合与牵引关系等待在影像中显现。此处文字待进一步校订。',
         body:'在坍塌结构的局部，折叠和变形留下不同于完整状态的空间关系。此处文字待进一步校订。'}
      ]
    },
    en:{
      date:'Date to be added',place:'Location to be added',
      short:[
        {full:'Established structure; material and dimensions to be added.',back:'Collapsed rear view; condition notes to be added.',instrument:'Instrument detail; mechanism and materials to be added.',body:'Collapsed body; joints and fracture notes to be added.'},
        {full:'Established structure; supports and materials to be added.',back:'Rear view after collapse; field notes to be added.',instrument:'Instrument details; construction notes to be added.',body:'Collapsed structure; folding and deformation notes to be added.'}
      ],
      long:[
        {full:'Seen from the front and back, the structure reveals different relationships among its parts. Before the film begins, it remains here as a still construction.',
         back:'Seen from behind, the supporting relationships begin to loosen. The remaining members still carry traces of their construction. Text awaiting revision.',
         instrument:'The instrument is set apart for closer attention: connections, weight and possible sources of sound remain still until the moving image begins. Text awaiting revision.',
         body:'Joints and fractures of the collapsed structure suspend its movement in a single observable moment. Text awaiting revision.'},
        {full:'The two views retain the structure from either side. Even at rest, its weight, connections and openings become visible.',
         back:'From the rear, the structure loses its stable outline while its materials retain the directions of their former loads. Text awaiting revision.',
         instrument:'Details of the instrument hold movement at its point of departure; gaps, joints and points of tension await the moving image. Text awaiting revision.',
         body:'Folding and deformation leave the collapsed structure with spatial relationships unlike its original form. Text awaiting revision.'}
      ]
    },
    ja:{
      date:'撮影日未記入',place:'撮影場所未記入',
      short:[
        {full:'構築時の正面全景。素材と寸法は追記予定。',back:'崩壊後の背面。残存部材の記録は追記予定。',instrument:'楽器の部分構造。素材と機構は追記予定。',body:'崩壊した本体の細部。接合と亀裂の記録は追記予定。'},
        {full:'構築時の正面全景。支持構造の情報は追記予定。',back:'崩壊後の背面。現場記録は追記予定。',instrument:'楽器の構成部材。製作と動作の情報は追記予定。',body:'崩壊した構造の残余。変形の記録は追記予定。'}
      ],
      long:[
        {full:'表裏から見ると、構造体の各部材は異なる関係を見せる。映像が始まる前に、まず静止した構築物として見る。',
         back:'裏側から見ると、支えの関係が緩み始め、残った部材には建造時の痕跡が見える。文章は後日推敲予定。',
         instrument:'器械の接合、荷重、音を発する可能性のある部材を静止した状態で見る。文章は後日推敲予定。',
         body:'崩壊した構造の接合と亀裂が、連続する動きを観察可能な一瞬に留める。文章は後日推敲予定。'},
        {full:'二つの視点から、構造体の表と裏を記録する。動き始める前から、重み、接合、空隙が見えている。',
         back:'背面では輪郭が緩み、材料にはかつて受けた力の方向が残されている。文章は後日推敲予定。',
         instrument:'器械の細部は動き始める直前を留め、空隙や接合、張力の関係を示す。文章は後日推敲予定。',
         body:'折り畳みと変形が、元の姿とは異なる空間的関係を残す。文章は後日推敲予定。'}
      ]
    }
  };
  function photoNotes(si,key){
    var copy=PHOTO_INFORMATION[state.lang]||PHOTO_INFORMATION.zh;
    return {date:copy.date,place:copy.place,short:copy.short[si][key],long:copy.long[si][key]};
  }
  function assetPairMarkup(s,si,kind){
    var items=kind==='structure'?['full','back']:['instrument','body'];
    var switchNames={
      zh:{structure:['建立','坍塌'],detail:['废墟乐器','坍塌结构']},
      en:{structure:['Construction','Collapse'],detail:['Ruin Instrument','Collapsed Structure']},
      ja:{structure:['構築','崩壊'],detail:['廃墟の楽器','崩壊した構造']}
    };
    var names=(switchNames[state.lang]||switchNames.zh)[kind];
    var faces=items.map(function(k,index){
      return '<figure class="fc-artifact fc-swap-face'+(index===0?' is-current':'')+'" data-fc-swap-face="'+index+'" aria-hidden="'+(index===0?'false':'true')+'">'+
        '<div class="fc-artifact-image"><img src="'+esc(s.assets[k])+'" loading="lazy" decoding="async" alt="'+esc(label(s.title)+' — '+names[index])+'"></div>'+
      '</figure>';
    }).join('');
    var options=items.map(function(k,index){
      return '<button type="button" class="fc-swap-option'+(index===0?' is-active':'')+'" data-fc-action="swap-option" data-fc-index="'+index+'" aria-pressed="'+(index===0?'true':'false')+'">'+esc(names[index])+'</button>';
    }).join('<span class="fc-swap-separator" aria-hidden="true">/</span>');
    var metadata=items.map(function(k,index){
      var d=photoNotes(si,k);
      return '<div class="fc-photo-meta-panel" data-fc-meta-face="'+index+'" '+(index?'hidden':'')+'>'+
        '<p class="fc-photo-meta-fields"><span>'+esc(d.date)+'</span><span>'+esc(d.place)+'</span></p>'+
        '<p class="fc-photo-meta-note">'+esc(d.short)+'</p>'+
      '</div>';
    }).join('');
    var paragraphs=items.map(function(k,index){
      return '<p class="fc-aside-panel" data-fc-aside-face="'+index+'" '+(index?'hidden':'')+'>'+esc(photoNotes(si,k).long)+'</p>';
    }).join('');
    return '<div class="fc-asset-pair fc-asset-pair-'+kind+'" data-fc-swap data-fc-series="'+si+'" data-fc-active="0" aria-label="'+esc(names.join(' / '))+'">'+
      '<div class="fc-photo-column">'+
        '<div class="fc-swap-stage">'+faces+'</div>'+
        '<div class="fc-swap-controls" role="group" aria-label="'+esc(names.join(' / '))+'">'+
          '<div class="fc-swap-options">'+options+'</div>'+
        '</div>'+
        '<div class="fc-photo-meta">'+metadata+'</div>'+
      '</div>'+
      '<aside class="fc-asset-aside" aria-label="'+esc(names.join(' / '))+'">'+paragraphs+'</aside>'+
    '</div>';
  }
  function instrumentMarkup(s,si){
    return '<section class="fc-instrument-wrap">'+
      '<div class="fc-subchapter"><h3>'+esc(term('moving'))+'</h3></div>'+
      '<div class="fc-instrument-layout">'+
        '<div class="fc-instrument-card fc-card" data-fc-instrument-card data-fc-series="'+si+'">'+
          '<button class="fc-card-button" type="button" data-fc-action="instrument" data-fc-series="'+si+'" aria-label="'+esc(term('moving'))+'">'+
            '<span class="fc-frame"><canvas class="fc-preview-frame" aria-hidden="true"></canvas>'+
            '<video class="fc-preview" playsinline webkit-playsinline preload="none" muted aria-hidden="true"></video>'+
            '<video class="fc-hover-video" playsinline webkit-playsinline preload="none" muted loop aria-hidden="true"></video>'+
            '<span class="fc-card-open-sign">↗</span></span>'+
            '<span class="fc-card-copy"><span class="fc-card-count">01 <small>/ 01</small></span>'+
            '<span class="fc-card-name">'+esc(term('moving'))+'</span></span>'+
          '</button></div>'+
        '<p class="fc-instrument-description">'+esc(essay(si,'instrument'))+'</p>'+
      '</div>'+
    '</section>';
  }
  function inlineScoreMarkup(s,si){
    var pointerLabel={
      zh:['显示指针','隐藏指针'],en:['Show pointers','Hide pointers'],
      ja:['指針を表示','指針を非表示']
    }[state.lang]||['显示指针','隐藏指针'];
    return '<section class="fc-inline-score" data-fc-inline-score="'+si+'" data-fc-pointers="off">'+
      '<div class="fc-inline-score-top"><h3>'+esc(term('score'))+'</h3></div>'+
      '<div class="fc-inline-score-main">'+
        '<div class="fc-inline-score-device">'+scoreMarkup(s)+'</div>'+
        '<div class="fc-inline-score-detail">'+
          '<span data-fc-score-state>01 / '+pad(s.stages.length)+'</span>'+
          '<input class="fc-score-timeline" data-fc-score-timeline="'+si+'" type="range" min="0" max="1000" step="1" value="0" aria-label="'+esc(term('score')+' / '+i18n('seek'))+'">'+
          '<div class="fc-score-controls-bottom">'+
            (s.kind==='radial'?'<div class="fc-score-minimal-actions"><button type="button" data-fc-action="score-fold" data-fc-series="'+si+'">'+esc(term('scoreFold'))+' ↕</button></div>':'')+
            '<button type="button" class="fc-pointer-switch" data-fc-action="score-pointer" data-fc-series="'+si+'" role="switch" aria-checked="false" data-fc-label-off="'+esc(pointerLabel[0])+'" data-fc-label-on="'+esc(pointerLabel[1])+'">'+
              '<span class="fc-pointer-switch-track" aria-hidden="true"><i></i></span>'+
              '<span class="fc-pointer-switch-text">'+esc(pointerLabel[0])+'</span>'+
            '</button>'+
          '</div>'+
        '</div>'+
      '</div>'+
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
  function chapterPart(si){
    return ({
      zh:['其一','其二'],en:['Part One','Part Two'],ja:['其の一','其の二']
    }[state.lang]||['其一','其二'])[si];
  }
  // Chapter II is deliberately not constructed until the reader crosses
  // this boundary. No photograph, mask or teaser asset belongs here.
  var activeChapter=0,lastFollyIntro='',chapterChanging=false;
  function chapterGateMarkup(from){
    var target=from===0?1:0;
    var phrases={
      zh:['继续阅读废墟园林·其二','阅读废墟园林·其一'],
      en:['Continue reading Folly · Part Two','Return to Folly · Part One'],
      ja:['フォリー・其の二を続けて読む','フォリー・其の一を読む']
    };
    var words=(phrases[state.lang]||phrases.zh)[from];
    var arrow=target===1?'↓':'↑';
    return '<section class="fc-chapter-gate" data-fc-chapter-gate data-fc-target="'+target+'" data-fc-direction="'+(target===1?'down':'up')+'">'+
      '<button type="button" class="fc-gate-continue" data-fc-action="chapter-goto" data-fc-chapter="'+target+'" aria-label="'+esc(words)+'">'+
        '<span>'+esc(words)+'</span><span class="fc-gate-arrow" aria-hidden="true">'+arrow+'</span>'+
      '</button>'+
    '</section>';
  }
  function chapterBodyMarkup(){
    // One uninterrupted document: both chapters have stable positions.
    // Images and videos still load lazily only near the viewport.
    return sectionMarkup(SERIES[0],0)+chapterGateMarkup(0)+sectionMarkup(SERIES[1],1)+
      '<section class="fc-essay" aria-label="Folly notes"><div class="fc-essay-rule"></div>'+
        '<p class="fc-essay-intro">'+esc(lastFollyIntro)+'</p>'+
        '<div class="fc-essay-space" aria-hidden="true"></div>'+
      '</section>';
  }
  function sectionMarkup(s, si) {
    return '<section class="fc-series-block" data-fc-series-block="'+si+'" id="fc-chapter-'+(si+1)+'" style="--fc-video-aspect:16 / 9;--fc-ratio-number:1.77778">'+
      '<div class="fc-series-heading">'+
        '<h2>'+esc(chapterPart(si))+'</h2>'+
        '<p>'+esc(label(s.title))+'</p>'+
      '</div>'+
      '<div class="fc-series-composition">'+
        assetPairMarkup(s,si,'structure')+
        assetPairMarkup(s,si,'detail')+
        instrumentMarkup(s,si)+
      '</div>'+
      '<div class="fc-film-head">'+
        '<h3>'+esc(term('movement'))+'</h3>'+
        '<p class="fc-instruction">'+esc(i18n('instruction'))+'<span>'+esc(i18n('selection'))+'</span></p>'+
      '</div>'+
      '<div class="fc-navigation">'+
        '<input class="fc-slider" data-fc-slider="'+si+'" type="range" min="0" max="1000" value="0" step="1" aria-label="'+esc(i18n('seek')+' / '+label(s.title))+'"></div>'+
      '<div class="fc-gallery-area"><div class="fc-rail" data-fc-rail="'+si+'" tabindex="0" aria-label="'+esc(i18n('seek')+' / '+label(s.title))+'">'+
        '<ol class="fc-strip">'+s.stages.map(function(stage,index){return cardMarkup(stage,index,s);}).join('')+'</ol>'+
      '</div></div>'+
      inlineScoreMarkup(s,si)+
    '</section>';
  }
  function pageMarkup(item) {
    lastFollyIntro=localised(item.intro);
    return '<section class="room-view fc-room"><header class="room-head">'+
      '<button type="button" data-action="home" class="room-back">← '+esc(labels[state.lang].back)+'</button>'+
      '<p>'+esc(labels[state.lang].works)+' / '+esc(localised(item.title))+'</p>'+languageSwitch()+'</header>'+
      '<div class="fc-page" data-fc-scene>'+
        '<div class="fc-page-heading"><div class="fc-heading-primary">'+
          '<h1>'+esc(localised(item.title))+'</h1></div></div>'+
        '<div class="fc-scroll-content" data-fc-chapter-body>'+chapterBodyMarkup()+'</div>'+
        '<div data-fc-projection-slot>'+SERIES.map(projectionMarkup).join('')+'</div>'+
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
    var counter=root.querySelector('[data-fc-index-display]');
    if(counter)counter.textContent=pad(i+1);
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
    if(!element||!element.isConnected)return false;
    var box=element.getBoundingClientRect();
    return box.bottom>-300 && box.top<window.innerHeight+420;
  }
  function prioritizePreviews(si,index) {
    if(!isLive())return;
    // Only the current neighbourhood, not all thirteen videos at once.
    var n=SERIES[si].stages.length;
    var nearby=[index,index+1,index-1,index+2,index-2].filter(function(i){return i>=0&&i<n;});
    var waiting=nearby.map(function(i){return {si:si,index:i,key:si+':'+i,kind:'film'};})
      .concat([{si:si,index:0,key:si+':instrument',kind:'instrument'}])
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
      let root=block(task.si),card=task.kind==='instrument'?
        root?.querySelector('[data-fc-instrument-card]'):
        root?.querySelector('[data-fc-card="'+task.index+'"]');
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
        if(task.kind==='instrument'){
          card.style.setProperty('--fc-instrument-aspect',v.videoWidth+' / '+v.videoHeight);
        }else applyVideoRatio(task.si,v);
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
      v.src=task.kind==='instrument'?SERIES[task.si].assets.film:source(SERIES[task.si],task.index);
      v.load();
    }
  }
  function paintScore(overlay,s,absolute,si) {
    if(!overlay)return;
    var ratio=clamp(absolute/s.endTime,0,1);
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
      // Hand folding takes precedence only while the visitor explicitly
      // manipulates the graphic score. Returning to the film rail restores sync.
      if(si!==undefined && manualWings[si])wings=manualWings[si].slice();
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
  var inlineTime=[0,0],manualWings=[null,null],expandedScore=-1,scoreScale=[1,1],scorePan=[[0,0],[0,0]],railOriginLocks=[false,false];
  function stageByTime(s,t){
    var value=clamp(t,0,s.endTime),idx=0;
    for(var i=0;i<s.stages.length;i++){
      if(value>=s.stages[i].start)idx=i;
    }
    return idx;
  }
  function updateInlineScore(si,absolute) {
    var root=block(si),s=SERIES[si];
    if(!root||!s)return;
    var at=clamp(absolute,0,s.endTime);
    inlineTime[si]=at;
    var score=root.querySelector('[data-fc-inline-score]');
    if(!score)return;
    paintScore(score,s,at,si);
    var cluster=score.querySelector('.fc-score-cluster');
    if(cluster)cluster.style.transform='translate('+scorePan[si][0]+'px,'+scorePan[si][1]+'px) scale('+scoreScale[si]+')';
    var i=stageByTime(s,at);
    var state=score.querySelector('[data-fc-score-state]');
    if(state)state.textContent=pad(i+1)+' / '+pad(s.stages.length);
    var frameLabel=score.querySelector('[data-fc-score-frame-label]');
    if(frameLabel)frameLabel.textContent=s.kind==='linear'?
      term('frame')+' '+pad(sourceScoreFrame(at/s.endTime))+' / 15':
      'SYNC '+String(Math.round(at/s.endTime*100)).padStart(2,'0')+'%';
    var timeline=score.querySelector('[data-fc-score-timeline]');
    if(timeline&&document.activeElement!==timeline){
      timeline.value=String(Math.round(1000*at/s.endTime));
    }
  }
  function updateScore(absolute) {
    paintScore(activeOverlay(),current(),absolute);
    updateInlineScore(selection.series,absolute);
  }
  function scoreFromRail(si){
    if(railOriginLocks[si])return;
    var rail=railFor(si),s=SERIES[si];
    if(!rail||!s)return;
    var max=Math.max(1,rail.scrollWidth-rail.clientWidth);
    var ratio=clamp(rail.scrollLeft/max,0,1);
    manualWings[si]=null;
    updateInlineScore(si,s.endTime*ratio);
  }
  function seekFilmFromScore(si,absolute,opts){
    var s=SERIES[si],rail=railFor(si);
    if(!s||!rail)return;
    var at=clamp(absolute,0,s.endTime),ratio=at/s.endTime;
    // This suppresses the scroll -> score feedback during a score-originated
    // gesture, while retaining the browser's free, unsnapped film strip.
    railOriginLocks[si]=true;
    if(!(opts&&opts.keepWings))manualWings[si]=null;
    if(hoverFilm.card && hoverFilm.si===si)stopHoverFilm();
    rail.scrollLeft=Math.max(0,rail.scrollWidth-rail.clientWidth)*ratio;
    var filmSlider=block(si)?.querySelector('[data-fc-slider]');
    if(filmSlider)filmSlider.value=String(Math.round(ratio*1000));
    focusCard(si,stageByTime(s,at),false);
    updateInlineScore(si,at);
    var release=function(){requestAnimationFrame(function(){railOriginLocks[si]=false;});};
    requestAnimationFrame(release);
  }
  function setScoreExpanded(si,open){
    if(!isLive())return;
    var root=block(si),score=root?.querySelector('[data-fc-inline-score]');
    if(!score)return;
    if(open){
      if(expandedScore!==-1&&expandedScore!==si)setScoreExpanded(expandedScore,false);
      expandedScore=si;
      score.classList.add('is-expanded');
      document.body.classList.add('fc-score-expanded');
      score.querySelectorAll('[data-fc-action="score-expand"]').forEach(function(b){
        b.setAttribute('aria-expanded','true');
        b.textContent=term('scoreClose')+' ×';
      });
      score.querySelector('[data-fc-action="score-expand"]')?.focus({preventScroll:true});
    }else{
      expandedScore=-1;
      score.classList.remove('is-expanded');
      document.body.classList.remove('fc-score-expanded');
      score.querySelectorAll('[data-fc-action="score-expand"]').forEach(function(b){
        b.setAttribute('aria-expanded','false');
        b.textContent=term('scoreOpen')+' ↗';
      });
      score.querySelector('[data-fc-action="score-expand"]')?.focus({preventScroll:true});
    }
  }
  function foldInlineScore(si){
    var s=SERIES[si];
    if(!s||s.kind!=='radial')return;
    var opened=manualWings[si] && manualWings[si].every(function(v){return v>170;});
    manualWings[si]=opened?[0,0,0]:[180,180,180];
    // The fold gesture also selects its authored early movement position.
    // The full film sequence remains addressable by the continuous timeline.
    seekFilmFromScore(si,opened?0:4.2,{keepWings:true});
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
    var length=selection.instrument?current().endTime:m.end-m.start;
    var fraction=Number.isFinite(player.duration)&&player.duration>0
      ?clamp((Number(player.currentTime)||0)/player.duration,0,1)
      :0;
    selection.lastTime=(selection.instrument?0:m.start)+length*fraction;
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
  function select(si,index,isInstrument) {
    if(!isLive())return;
    if(selection.open)closeProjection();
    lastTrigger=document.activeElement;
    // Continue from the real currentTime of the in-card film when applicable.
    var resume=(hoverFilm.active&&hoverFilm.si===si&&hoverFilm.index===index&&
      (hoverFilm.kind==='instrument')===Boolean(isInstrument)&&
      hoverFilm.video&&Number.isFinite(hoverFilm.video.currentTime))
      ?hoverFilm.video.currentTime:0;
    stopHoverFilm();
    selection.series=si;
    selection.open=true;selection.instrument=Boolean(isInstrument);selection.index=clamp(index,0,SERIES[si].stages.length-1);
    selection.paused=false;selection.scoreInspect=false;
    var overlay=activeOverlay();
    overlay.hidden=false;
    scene.classList.add('is-projected');
    if(!selection.instrument)block(si)?.querySelector('[data-fc-card="'+selection.index+'"]')?.classList.add('is-playing');
    else block(si)?.querySelector('[data-fc-instrument-card]')?.classList.add('is-playing');
    document.body.classList.add('fc-modal-open');
    scene.querySelectorAll('.fc-page-heading,.fc-scroll-content').forEach(function(node){node.inert=true;});
    if(!selection.instrument)focusCard(si,index,false);
    else {
      overlay.querySelector('[data-fc-now-title]').textContent=term('moving');
      overlay.querySelector('[data-fc-time-index]').textContent='01 / 01';
      overlay.querySelector('[data-fc-projection-count]').textContent='INSTRUMENT / 01';
    }
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
    selection.lastTime=selection.instrument?0:s.stages[i].start;
    selection.paused=false;syncPlayButton();updateScore(selection.lastTime);
    player.muted=selection.muted;player.loop=false;player.removeAttribute('poster');
    player.src=selection.instrument?s.assets.film:source(s,i);player.load();
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
    if(selection.instrument){
      selection.paused=true;syncPlayButton();
      activeOverlay()?.querySelector('[data-fc-film-status]')?.replaceChildren(document.createTextNode(i18n('allEnd')));
      return;
    }
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
    selection.open=false;selection.instrument=false;selection.scoreInspect=false;
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
        scoreFromRail(si);
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
        scoreFromRail(si);
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
  function wireInstrument(si){
    var card=block(si)?.querySelector('[data-fc-instrument-card]');
    if(!card)return;
    card.addEventListener('pointerenter',function(event){
      if(event.pointerType==='mouse'&&!selection.open)startHoverFilm(card,si,0,550);
    });
    card.addEventListener('pointerleave',function(){
      if(hoverFilm.card===card)stopHoverFilm();
    });
    card.addEventListener('focusin',function(){
      if(!selection.open)startHoverFilm(card,si,0,850);
    });
    card.addEventListener('focusout',function(){
      if(hoverFilm.card===card)stopHoverFilm();
    });
  }
  function wireInlineScore(si){
    var score=block(si)?.querySelector('[data-fc-inline-score]');
    if(!score)return;
    var cluster=score.querySelector('.fc-score-cluster');
    if(cluster){
      cluster.addEventListener('pointerenter',function(ev){
        if(window.matchMedia('(hover:hover)').matches)cluster.classList.add('is-magnetic');
      });
      cluster.addEventListener('pointerleave',function(){
        cluster.classList.remove('is-magnetic');
        cluster.style.setProperty('--fc-magnet-x','0px');
        cluster.style.setProperty('--fc-magnet-y','0px');
      });
      cluster.addEventListener('pointermove',function(ev){
        if(!cluster.classList.contains('is-magnetic'))return;
        var box=cluster.getBoundingClientRect();
        cluster.style.setProperty('--fc-magnet-x',(((ev.clientX-box.left)/box.width-.5)*10).toFixed(2)+'px');
        cluster.style.setProperty('--fc-magnet-y',(((ev.clientY-box.top)/box.height-.5)*9).toFixed(2)+'px');
      },{passive:true});
    }
    // The expanded score inherits viewer-style zoom and gentle hand panning.
    var device=score.querySelector('.fc-inline-score-device'),panGesture=null;
    device.addEventListener('wheel',function(event){
      if(expandedScore!==si)return;
      if(!event.ctrlKey && !event.metaKey)return;
      event.preventDefault();
      scoreScale[si]=clamp(scoreScale[si]*(event.deltaY<0?1.10:1/1.10),.72,3.6);
      updateInlineScore(si,inlineTime[si]);
    },{passive:false});
    device.addEventListener('pointerdown',function(event){
      if(expandedScore!==si)return;
      if(event.pointerType==='mouse'&&event.button!==0)return;
      if(event.target.closest('button,.fc-mechanical-lever,[data-fc-drag-wing]'))return;
      panGesture={id:event.pointerId,x:event.clientX,y:event.clientY,px:scorePan[si][0],py:scorePan[si][1]};
      try{device.setPointerCapture(event.pointerId);}catch(_){}
    });
    device.addEventListener('pointermove',function(event){
      if(!panGesture||panGesture.id!==event.pointerId)return;
      scorePan[si]=[
        clamp(panGesture.px+event.clientX-panGesture.x,-290,290),
        clamp(panGesture.py+event.clientY-panGesture.y,-240,240)
      ];
      updateInlineScore(si,inlineTime[si]);
    });
    device.addEventListener('pointerup',function(){panGesture=null;});
    device.addEventListener('pointercancel',function(){panGesture=null;});
    // A light timeline below the bare notation acts in both directions:
    // dragging it moves the film strip and its own original stage scrollbar.
    var scoreSlider=score.querySelector('[data-fc-score-timeline]');
    if(scoreSlider){
      scoreSlider.addEventListener('input',function(ev){
        seekFilmFromScore(si,SERIES[si].endTime*(Number(ev.target.value)/1000));
      });
      scoreSlider.addEventListener('change',function(ev){
        seekFilmFromScore(si,SERIES[si].endTime*(Number(ev.target.value)/1000));
      });
    }
    // The entire mechanical score is a tactile fifteen-frame index even with
    // the HUD pointer switched off. Drag downward to advance the Folly film.
    var notationSurface=score.querySelector('.fc-score-shadow .fc-shadow-scan');
    if(notationSurface){
      var scoreGesture=null;
      function scrubArtwork(ev){
        var rect=notationSurface.getBoundingClientRect();
        var y=clamp((ev.clientY-rect.top)/Math.max(1,rect.height),0,1);
        var ratio=clamp((y-.12)/.76,0,1);
        seekFilmFromScore(si,SERIES[si].endTime*ratio);
      }
      notationSurface.addEventListener('pointerdown',function(ev){
        if(ev.pointerType==='mouse'&&ev.button!==0)return;
        scoreGesture=ev.pointerId;
        try{notationSurface.setPointerCapture(ev.pointerId);}catch(_){}
        scrubArtwork(ev);ev.preventDefault();
      });
      notationSurface.addEventListener('pointermove',function(ev){
        if(scoreGesture!==ev.pointerId)return;
        scrubArtwork(ev);ev.preventDefault();
      });
      var releaseArtwork=function(ev){if(ev.pointerId===scoreGesture)scoreGesture=null;};
      notationSurface.addEventListener('pointerup',releaseArtwork);
      notationSurface.addEventListener('pointercancel',releaseArtwork);
      notationSurface.addEventListener('lostpointercapture',function(){scoreGesture=null;});
    }
    // Folly I: drag the small knob along its guide; the authored fifteen
    // frames and two-stage large ring then follow the same rail timeline.
    var lever=score.querySelector('.fc-mechanical-notation .fc-mechanical-lever');
    if(lever){
      var dragging=-1;
      var seekLever=function(event){
        var rect=lever.getBoundingClientRect();
        var y=(event.clientY-rect.top)/Math.max(1,rect.height);
        var ratio=clamp((y-.15)/.70,0,1);
        seekFilmFromScore(si,SERIES[si].endTime*ratio);
      };
      lever.addEventListener('pointerdown',function(event){
        if(event.pointerType==='mouse'&&event.button!==0)return;
        dragging=event.pointerId;
        try{lever.setPointerCapture(event.pointerId);}catch(_){}
        seekLever(event);event.preventDefault();
      });
      lever.addEventListener('pointermove',function(event){
        if(dragging!==event.pointerId)return;
        seekLever(event);event.preventDefault();
      });
      var end=function(event){if(dragging===event.pointerId)dragging=-1;};
      lever.addEventListener('pointerup',end);
      lever.addEventListener('pointercancel',end);
      lever.addEventListener('lostpointercapture',function(){dragging=-1;});
    }
    // With the HUD switched on, its paired pointers can also scrub the film
    // from within the score itself. The underlying folded artwork stays put.
    var needles=score.querySelector('.fc-score-hud .fc-radial-needles');
    if(needles){
      var needleGesture=null;
      function seekNeedle(ev){
        var rect=needles.getBoundingClientRect();
        var ratio=clamp((ev.clientX-rect.left)/Math.max(1,rect.width),0,1);
        seekFilmFromScore(si,SERIES[si].endTime*ratio);
      }
      needles.addEventListener('pointerdown',function(ev){
        if(score.dataset.fcPointers!=='on')return;
        if(ev.pointerType==='mouse'&&ev.button!==0)return;
        needleGesture=ev.pointerId;
        try{needles.setPointerCapture(ev.pointerId);}catch(_){}
        seekNeedle(ev);ev.preventDefault();
      });
      needles.addEventListener('pointermove',function(ev){
        if(needleGesture!==ev.pointerId)return;
        seekNeedle(ev);ev.preventDefault();
      });
      var endNeedle=function(ev){if(needleGesture===ev.pointerId)needleGesture=null;};
      needles.addEventListener('pointerup',endNeedle);
      needles.addEventListener('pointercancel',endNeedle);
      needles.addEventListener('lostpointercapture',function(){needleGesture=null;});
    }
    // Folly II: three authored hinged wings remain independently draggable.
    score.querySelectorAll('.fc-score-shadow [data-fc-drag-wing]').forEach(function(wing){
      var wi=Number(wing.dataset.fcDragWing),gesture=null;
      wing.addEventListener('pointerdown',function(event){
        if(event.pointerType==='mouse'&&event.button!==0)return;
        var angles=manualWings[si] || [0,0,0];
        gesture={id:event.pointerId,startY:event.clientY,startX:event.clientX,start:angles[wi]};
        manualWings[si]=angles.slice();
        try{wing.setPointerCapture(event.pointerId);}catch(_){}
        event.preventDefault();
      });
      wing.addEventListener('pointermove',function(event){
        if(!gesture||gesture.id!==event.pointerId)return;
        var displacement=(gesture.startY-event.clientY)*.78+(event.clientX-gesture.startX)*.32;
        manualWings[si][wi]=clamp(gesture.start+displacement,0,180);
        // Use the original score's hinge schedule to return to the same
        // point in film time, not a fabricated stage interpretation.
        var rank=[2,1,0].indexOf(wi);
        var t=2.5+rank*.432+(manualWings[si][wi]/180)*.720;
        seekFilmFromScore(si,t,{keepWings:true});
        event.preventDefault();
      });
      var finish=function(event){
        if(!gesture||gesture.id!==event.pointerId)return;
        manualWings[si][wi]=manualWings[si][wi]>92?180:0;
        var rank=[2,1,0].indexOf(wi);
        var t=2.5+rank*.432+(manualWings[si][wi]/180)*.720;
        gesture=null;
        seekFilmFromScore(si,t,{keepWings:true});
      };
      wing.addEventListener('pointerup',finish);
      wing.addEventListener('pointercancel',finish);
    });
  }
  var imageSwapStates=new Map(),imageSwapObserver=null,imageSwapFallback=null;
  function resetSwapTimer(state){
    if(!state)return;
    clearTimeout(state.timer);
    state.timer=0;
    if(!state.visible || document.hidden || !state.root.isConnected)return;
    // The clock starts only on entry to the viewport (or manual switch).
    state.timer=window.setTimeout(function(){
      state.timer=0;
      if(!state.visible || document.hidden || !state.root.isConnected)return;
      advanceSwap(state,1);
    },7000);
  }
  // First let the old caption recede; only then reveal the matching note.
  // Match a caption to the PAINTED photograph, not the larger 16:9
  // container. object-fit: contain can leave vacant space at its right edge.
  var photoReadingCleanup=null;
  function contentBoundsForContainedImage(img){
    var box=img.getBoundingClientRect();
    var width=box.width,height=box.height;
    var actualWidth=width,actualHeight=height;
    if(img.naturalWidth>0&&img.naturalHeight>0&&width>0&&height>0){
      var ratio=Math.min(width/img.naturalWidth,height/img.naturalHeight);
      actualWidth=img.naturalWidth*ratio;
      actualHeight=img.naturalHeight*ratio;
    }
    return {right:box.left+actualWidth,bottom:box.top+(height-actualHeight)/2+actualHeight};
  }
  function alignPhotoAside(root){
    if(!root)return;
    if(window.innerWidth<=1200){
      ['--fc-caption-left','--fc-caption-top','--fc-photo-min-height'].forEach(function(k){root.style.removeProperty(k);});
      return;
    }
    var frame=root.querySelector('[data-fc-swap-face="'+root.dataset.fcActive+'"] img');
    var aside=root.querySelector('.fc-asset-aside');
    var photoColumn=root.querySelector('.fc-photo-column');
    if(!frame||!aside||!photoColumn)return;
    var box=root.getBoundingClientRect(),painted=contentBoundsForContainedImage(frame);
    var left=Math.max(0,painted.right-box.left+50);
    var top=Math.max(0,painted.bottom-box.top+35);
    root.style.setProperty('--fc-caption-left',left.toFixed(1)+'px');
    root.style.setProperty('--fc-caption-top',top.toFixed(1)+'px');
    root.style.setProperty('--fc-photo-min-height',Math.ceil(Math.max(photoColumn.offsetHeight,top+aside.scrollHeight+20))+'px');
  }
  function alignInstrumentAside(layout){
    if(!layout)return;
    if(window.innerWidth<=1200){
      ['--fc-instrument-caption-left','--fc-instrument-caption-top','--fc-instrument-min-height'].forEach(function(k){layout.style.removeProperty(k);});
      return;
    }
    var frame=layout.querySelector('.fc-instrument-card .fc-frame');
    var card=layout.querySelector('.fc-instrument-card');
    var aside=layout.querySelector('.fc-instrument-description');
    if(!frame||!card||!aside)return;
    var box=layout.getBoundingClientRect(),image=frame.getBoundingClientRect();
    var left=Math.max(0,image.right-box.left+50),top=Math.max(0,image.bottom-box.top+35);
    layout.style.setProperty('--fc-instrument-caption-left',left.toFixed(1)+'px');
    layout.style.setProperty('--fc-instrument-caption-top',top.toFixed(1)+'px');
    layout.style.setProperty('--fc-instrument-min-height',Math.ceil(Math.max(card.offsetHeight,top+aside.scrollHeight+20))+'px');
  }
  function setupPhotoReadingLayout(){
    if(photoReadingCleanup){photoReadingCleanup();photoReadingCleanup=null;}
    if(!isLive())return;
    var photos=Array.from(scene.querySelectorAll('[data-fc-swap]'));
    var instruments=Array.from(scene.querySelectorAll('.fc-instrument-layout'));
    var images=photos.flatMap(function(root){return Array.from(root.querySelectorAll('.fc-artifact-image img'));});
    var frame=0,disposed=false;
    function update(){
      frame=0;
      if(disposed||!isLive())return;
      photos.forEach(alignPhotoAside);
      instruments.forEach(alignInstrumentAside);
    }
    function schedule(){if(!disposed&&!frame)frame=requestAnimationFrame(update);}
    images.forEach(function(img){img.addEventListener('load',schedule);});
    window.addEventListener('resize',schedule,{passive:true});
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(schedule);
    photoReadingCleanup=function(){
      disposed=true;
      if(frame)cancelAnimationFrame(frame);
      images.forEach(function(img){img.removeEventListener('load',schedule);});
      window.removeEventListener('resize',schedule);
    };
    schedule();
  }
  function crossfadeImageCopy(state,next){
    var panels=Array.from(state.root.querySelectorAll('[data-fc-meta-face],[data-fc-aside-face]'));
    clearTimeout(state.copyTimer);
    if(state.copyFrame)cancelAnimationFrame(state.copyFrame);
    state.copyTimer=0;state.copyFrame=0;
    panels.forEach(function(panel){
      panel.classList.remove('is-copy-entering');
      if(!panel.hidden)panel.classList.add('is-copy-leaving');
    });
    state.copyTimer=window.setTimeout(function(){
      state.copyTimer=0;
      panels.forEach(function(panel){
        var selected=Number(panel.dataset.fcMetaFace??panel.dataset.fcAsideFace)===next;
        panel.hidden=!selected;
        panel.classList.remove('is-copy-leaving');
        panel.classList.toggle('is-copy-entering',selected);
      });
      alignPhotoAside(state.root);
      // Force the 0-opacity entry state to be laid out before animating in.
      panels.forEach(function(panel){if(!panel.hidden)void panel.offsetHeight;});
      state.copyFrame=requestAnimationFrame(function(){
        state.copyFrame=0;
        panels.forEach(function(panel){
          if(!panel.hidden)panel.classList.remove('is-copy-entering');
        });
      });
    },window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:330);
  }
  function advanceSwap(state,step){
    if(!state || !state.root.isConnected)return;
    var next=(state.active+step+2)%2;
    if(next===state.active){resetSwapTimer(state);return;}
    var oldFace=state.root.querySelector('[data-fc-swap-face="'+state.active+'"]');
    var nextFace=state.root.querySelector('[data-fc-swap-face="'+next+'"]');
    if(!oldFace||!nextFace)return;
    clearTimeout(state.fade);
    [oldFace,nextFace].forEach(function(face){face.classList.remove('is-fading');});
    oldFace.classList.add('is-fading');
    oldFace.classList.remove('is-current');
    oldFace.setAttribute('aria-hidden','true');
    nextFace.classList.add('is-current');
    nextFace.setAttribute('aria-hidden','false');
    state.active=next;
    state.root.dataset.fcActive=String(next);
    state.root.querySelectorAll('.fc-swap-option').forEach(function(dot,index){
      var active=index===next;
      dot.classList.toggle('is-active',active);
      dot.setAttribute('aria-pressed',String(active));
    });
    crossfadeImageCopy(state,next);
    state.fade=window.setTimeout(function(){
      oldFace.classList.remove('is-fading');
      state.fade=0;
    },1650);
    resetSwapTimer(state);
  }
  function setSwapVisible(state,visible){
    if(!state || state.visible===visible)return;
    state.visible=visible;
    if(visible)resetSwapTimer(state);
    else{clearTimeout(state.timer);state.timer=0;}
  }
  function clearImageSwaps(){
    if(imageSwapObserver){imageSwapObserver.disconnect();imageSwapObserver=null;}
    if(imageSwapFallback){
      window.removeEventListener('scroll',imageSwapFallback);
      window.removeEventListener('resize',imageSwapFallback);
      imageSwapFallback=null;
    }
    imageSwapStates.forEach(function(state){
      clearTimeout(state.timer);
      clearTimeout(state.fade);
      clearTimeout(state.copyTimer);
      if(state.copyFrame)cancelAnimationFrame(state.copyFrame);
    });
    imageSwapStates.clear();
    document.removeEventListener('visibilitychange',onImageSwapVisibility);
  }
  function onImageSwapVisibility(){
    if(document.hidden){
      imageSwapStates.forEach(function(state){clearTimeout(state.timer);state.timer=0;});
    }else{
      imageSwapStates.forEach(function(state){if(state.visible)resetSwapTimer(state);});
    }
  }
  function initializeImageSwaps(){
    clearImageSwaps();
    if(!isLive())return;
    var frames=scene.querySelectorAll('[data-fc-swap]');
    frames.forEach(function(el){
      imageSwapStates.set(el,{root:el,active:0,visible:false,timer:0,fade:0,copyTimer:0,copyFrame:0});
    });
    if('IntersectionObserver' in window){
      imageSwapObserver=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          var state=imageSwapStates.get(entry.target);
          if(state)setSwapVisible(state,entry.isIntersecting&&entry.intersectionRatio>=.15);
        });
      },{root:null,rootMargin:'0px',threshold:[0,.15,.4,.7]});
      frames.forEach(function(el){imageSwapObserver.observe(el);});
    }else{
      var check=function(){
        frames.forEach(function(el){
          var r=el.getBoundingClientRect();
          var area=Math.max(1,r.height);
          var visible=Math.max(0,Math.min(r.bottom,window.innerHeight)-Math.max(r.top,0));
          setSwapVisible(imageSwapStates.get(el),visible/area>=.15);
        });
      };
      imageSwapFallback=check;
      window.addEventListener('scroll',check,{passive:true});
      window.addEventListener('resize',check,{passive:true});
      check();
    }
    document.addEventListener('visibilitychange',onImageSwapVisibility);
  }
  var gateDirectionCleanup=null;
  function wireChapterGate(){
    if(gateDirectionCleanup){gateDirectionCleanup();gateDirectionCleanup=null;}
    var gate=scene?.querySelector('[data-fc-chapter-gate]');
    if(!gate)return;
    var target=Number(gate.dataset.fcTarget),direction=target===1?1:-1;
    var pull=0,touch=null,mouse=null,lastWheel=0,releaseTimer=0,threshold=0;
    // A small elastic ridge at the edge of a chapter. The page remains a
    // normal vertical document until its text-only boundary is reached.
    var touchLimit=94,wheelLimit=150,mouseLimit=108;
    function ready(){
      if(!isLive()||chapterChanging||selection.open)return false;
      var r=gate.getBoundingClientRect(),h=window.innerHeight||1;
      if(r.bottom<=0||r.top>=h)return false;
      // The lower edge of I and the upper edge of II mirror each other.
      return direction===1?r.top<=h*.68:r.bottom>=h*.32;
    }
    function show(amount,dragging){
      var progress=clamp(amount,0,1);
      gate.style.setProperty('--fc-gate-pull',progress.toFixed(3));
      gate.classList.toggle('is-pulling',Boolean(dragging)&&progress>0);
    }
    function release(){
      clearTimeout(releaseTimer);
      pull=0;show(0,false);
    }
    function cross(){
      if(!ready())return;
      clearTimeout(releaseTimer);
      show(1,false);
      switchFollyChapter(target);
    }
    // Mouse-wheel/trackpad delta gets lighter resistance near the rim.
    // Reverse scrolling remains completely native.
    function wheel(event){
      if(!ready()||!event.cancelable)return;
      var delta=event.deltaY*direction;
      if(delta<=0){release();return;}
      if(event.target.closest&&event.target.closest('input,textarea,select,[data-fc-rail]'))return;
      event.preventDefault();
      clearTimeout(releaseTimer);
      var t=performance.now();
      if(t-lastWheel>550)pull=0;
      lastWheel=t;
      var unit=event.deltaMode===1?17:event.deltaMode===2?window.innerHeight:1;
      pull+=Math.min(delta*unit,75);
      show(pull/wheelLimit,true);
      if(pull>=wheelLimit)cross();
      else releaseTimer=window.setTimeout(release,280);
    }
    function touchstart(event){
      if(event.touches.length!==1)return;
      var el=event.target;
      if(el.closest&&el.closest('button,a,input,textarea,select,[data-fc-rail]')){
        touch=null;return;
      }
      touch={y:event.touches[0].clientY,last:event.touches[0].clientY,active:false};
    }
    function touchmove(event){
      if(!touch||event.touches.length!==1)return;
      var y=event.touches[0].clientY,delta=(touch.last-y)*direction;
      touch.last=y;
      if(!touch.active){
        if(!ready()||delta<=0)return;
        touch.active=true;touch.y=y;pull=0;
      }
      if(!ready()){release();touch=null;return;}
      if(delta<=0){
        pull=Math.max(0,pull+delta*1.25);
        if(event.cancelable)event.preventDefault();
        show(pull/touchLimit,true);
        return;
      }
      if(event.cancelable)event.preventDefault();
      pull+=delta;
      show(pull/touchLimit,true);
      if(pull>=touchLimit){touch=null;cross();}
    }
    function touchend(){touch=null;release();}
    function mousedown(event){
      if(event.button!==0||!ready())return;
      if(event.target.closest&&event.target.closest('button,a,input,textarea,select,[data-fc-rail]'))return;
      mouse={y:event.clientY};
      pull=0;
    }
    function mousemove(event){
      if(!mouse||!ready())return;
      pull=Math.max(0,(mouse.y-event.clientY)*direction);
      show(pull/mouseLimit,true);
      if(pull>=mouseLimit){mouse=null;cross();}
    }
    function mouseup(){mouse=null;release();}
    // Capture gestures even if they began over the preceding work rather
    // than directly on the small interchapter caption.
    window.addEventListener('wheel',wheel,{passive:false,capture:true});
    window.addEventListener('touchstart',touchstart,{passive:true,capture:true});
    window.addEventListener('touchmove',touchmove,{passive:false,capture:true});
    window.addEventListener('touchend',touchend,{passive:true,capture:true});
    window.addEventListener('touchcancel',touchend,{passive:true,capture:true});
    gate.addEventListener('mousedown',mousedown);
    window.addEventListener('mousemove',mousemove,{passive:true});
    window.addEventListener('mouseup',mouseup,{passive:true});
    gateDirectionCleanup=function(){
      clearTimeout(releaseTimer);
      window.removeEventListener('wheel',wheel,true);
      window.removeEventListener('touchstart',touchstart,true);
      window.removeEventListener('touchmove',touchmove,true);
      window.removeEventListener('touchend',touchend,true);
      window.removeEventListener('touchcancel',touchend,true);
      gate.removeEventListener('mousedown',mousedown);
      window.removeEventListener('mousemove',mousemove);
      window.removeEventListener('mouseup',mouseup);
      gate.classList.remove('is-pulling');
    };
  }
  function setupFollyChapter(){
    var si=activeChapter;
    wireRail(si);
    wireInstrument(si);
    wireInlineScore(si);
    wireOverlay(si);
    wireChapterGate();
    initializeImageSwaps();
    setupPhotoReadingLayout();
    focusCard(si,0,false);
    updateInlineScore(si,0);
    if('IntersectionObserver' in window){
      io=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            var i=Number(entry.target.dataset.fcSeriesBlock);
            prioritizePreviews(i,selection.focus[i]);
          }
        });
      },{rootMargin:'420px 0px'});
      var currentBlock=block(si);
      if(currentBlock)io.observe(currentBlock);
    }else{
      prioritizePreviews(si,0);
    }
  }
  function switchFollyChapter(target){
    if(chapterChanging||!isLive()||target===activeChapter||target<0||target>1)return;
    var content=scene.querySelector('[data-fc-chapter-body]');
    var projectionSlot=scene.querySelector('[data-fc-projection-slot]');
    if(!content||!projectionSlot)return;
    chapterChanging=true;
    // Release all decoded media, in-card posters, attached events, observers
    // and clocks before dropping the actual source chapter from the DOM.
    if(gateDirectionCleanup){gateDirectionCleanup();gateDirectionCleanup=null;}
    if(photoReadingCleanup){photoReadingCleanup();photoReadingCleanup=null;}
    clearImageSwaps();clearPreviews();stopMedia();releaseUpcoming();
    document.body.classList.remove('fc-modal-open','fc-score-expanded');
    player=null;
    selection.open=false;
    selection.instrument=false;
    selection.scoreInspect=false;
    selection.focus=[0,0];
    selection.series=target;
    selection.index=0;
    manualWings=[null,null];
    inlineTime=[0,0];
    scoreScale=[1,1];scorePan=[[0,0],[0,0]];
    railOriginLocks=[false,false];expandedScore=-1;
    // No second-chapter cards or film nodes exist before this assignment.
    // The old chapter and its frame canvases are no longer in the document.
    content.replaceChildren();
    projectionSlot.replaceChildren();
    activeChapter=target;
    content.classList.remove('is-chapter-settled');
    content.classList.add('is-chapter-arriving');
    content.dataset.fcArrival=target===1?'down':'up';
    content.innerHTML=chapterBodyMarkup(target);
    projectionSlot.innerHTML=projectionMarkup(SERIES[target],target);
    setupFollyChapter();
    requestAnimationFrame(function(){
      if(!isLive()||activeChapter!==target){chapterChanging=false;return;}
      var dest=target===1?block(1):scene.querySelector('[data-fc-chapter-gate]');
      if(dest){
        var y=(window.scrollY||window.pageYOffset||0)+dest.getBoundingClientRect().top;
        // The new chapter receives the same visual direction of travel.
        // A small onward drift replaces the old abrupt full-screen jump.
        if(target===0)y-=window.innerHeight*.65;
        else y-=Math.min(105,window.innerHeight*.13);
        window.scrollTo({top:Math.max(0,y),behavior:'auto'});
      }
      requestAnimationFrame(function(){
        if(!isLive()||activeChapter!==target)return;
        content.classList.add('is-chapter-settled');
        chapterChanging=false;
        if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
          window.scrollBy({top:target===1?38:-38,behavior:'smooth'});
        }
        window.setTimeout(function(){
          if(content.isConnected){
            content.classList.remove('is-chapter-arriving','is-chapter-settled');
          }
        },720);
        prioritizePreviews(target,0);
      });
    });
  }
  function wireEvents(){
    if(!isLive())return;
    // Individual chapter nodes are wired by setupFollyChapter() after mount.
    scene.addEventListener('click',function(event){
      var node=event.target.closest('[data-fc-action]');
      if(!node)return;
      var action=node.dataset.fcAction;
      var si=Number(node.dataset.fcSeries);
      if(action==='chapter-goto'){
        switchFollyChapter(Number(node.dataset.fcChapter));
        return;
      }
      if(action==='select'){
        select(Number(node.dataset.fcSeries),Number(node.dataset.fcIndex));return;
      }
      if(action==='instrument'){
        select(Number(node.dataset.fcSeries),0,true);return;
      }
      if(action==='swap-option'){
        var frame=node.closest('[data-fc-swap]');
        var controller=imageSwapStates.get(frame);
        if(controller)advanceSwap(controller,Number(node.dataset.fcIndex)-controller.active);
        return;
      }
      if(action==='close'){closeProjection();return;}
      if(action==='inspect'){
        var inline=node.closest('[data-fc-inline-score]');
        if(inline){setScoreExpanded(Number(inline.dataset.fcInlineScore),true);return;}
        setInspect(true);return;
      }
      if(action==='score-expand'){
        var which=Number(node.dataset.fcSeries);
        setScoreExpanded(which,expandedScore!==which);return;
      }
      if(action==='score-pointer'){
        var score=block(Number(node.dataset.fcSeries))?.querySelector('[data-fc-inline-score]');
        if(!score)return;
        var on=score.dataset.fcPointers!=='on';
        score.dataset.fcPointers=on?'on':'off';
        node.setAttribute('aria-checked',String(on));
        var caption=node.querySelector('.fc-pointer-switch-text');
        if(caption)caption.textContent=node.getAttribute(on?'data-fc-label-on':'data-fc-label-off');
        return;
      }
      if(action==='score-fold'){foldInlineScore(Number(node.dataset.fcSeries));return;}
      if(action==='score-zoom-in'||action==='score-zoom-out'){
        var si=Number(node.dataset.fcSeries);
        scoreScale[si]=clamp(scoreScale[si]*(action==='score-zoom-in'?1.20:1/1.20),.72,3.6);
        updateInlineScore(si,inlineTime[si]);return;
      }
      if(action==='score-reset'){
        var which=Number(node.dataset.fcSeries);
        manualWings[which]=null;
        scoreScale[which]=1;scorePan[which]=[0,0];
        scoreFromRail(which);
        return;
      }
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
    if(gateDirectionCleanup){gateDirectionCleanup();gateDirectionCleanup=null;}
    if(photoReadingCleanup){photoReadingCleanup();photoReadingCleanup=null;}
    if(scene){clearImageSwaps();clearPreviews();stopMedia();}
    releaseUpcoming();
    document.body.classList.remove('fc-modal-open','fc-score-expanded');
    scene=next;player=null;
    chapterChanging=false;activeChapter=0;
    if(!scene)return;
    selection.open=false;selection.instrument=false;selection.scoreInspect=false;
    selection.series=0;selection.index=0;selection.focus=[0,0];
    manualWings=[null,null];inlineTime=[0,0];expandedScore=-1;
    scoreScale=[1,1];scorePan=[[0,0],[0,0]];railOriginLocks=[false,false];
    // The first chapter alone exists. Wire direct handlers only for mounted
    // nodes; the delegated action listener remains alive across swaps.
    wireEvents();
    setupFollyChapter();
  }
  var app=document.getElementById('app');
  if(app&&'MutationObserver' in window){new MutationObserver(mount).observe(app,{childList:true,subtree:false});}
  document.addEventListener('keydown',function(event){
    if(!isLive())return;
    if(event.key==='Escape'){
      if(expandedScore!==-1){setScoreExpanded(expandedScore,false);event.preventDefault();event.stopImmediatePropagation();return;}
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
