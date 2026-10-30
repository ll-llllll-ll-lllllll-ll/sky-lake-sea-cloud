/* the instrument: a Folly-like reading room, without a score.
   Add named works to WORKS; assign hero src only after images arrive. */
(function () {
  'use strict';
  if (typeof renderRoom!=='function'||typeof state==='undefined') return;
  var WORKS=[{
    title:{zh:'时间晶体',en:'Time Crystal',ja:'時間結晶'},
    prefix:{zh:'其一',en:'Part One',ja:'其の一'},
    progress:'Work in progress since 2023',
    year:'2023',
    kind:{"zh":"实验｜拉普拉斯妖的结石　·　仪器｜时间晶体透镜","en":"Experiment | The Stone of Laplace’s Demon　·　Instrument | Time Crystal Lens","ja":"実験｜ラプラスの悪魔の結石　·　器具｜時間結晶レンズ"},
    heroLabel:{zh:'离子阱',en:'Ion Trap',ja:'イオントラップ'},
    intro:{"zh":"《时间晶体透镜》是《拉普拉斯妖的结石》这一实验设想中的观测仪器模型。它借用离子阱、时间晶体与聚焦镜的形态，试图让不可见的时间结构获得一个可以凝视的形体。如果过去、现在与未来像一块早已凝固的琥珀，意识便如一束沿世界线移动的光，只能照亮自身所处的瞬间。作品在决定论的严密秩序中，为观测者保留一处细微的梗阻：我们是否只能逐帧观看既定的宇宙，还是仍有尚未被计算的可能？","en":"The Time Crystal Lens is an imagined observational instrument within the experiment “The Stone of Laplace’s Demon.” Drawing on the forms of an ion trap, a time crystal, and a focusing mirror, it gives an elusive structure of time something that might be contemplated. If past, present, and future were held together like an insect in amber, consciousness would resemble a beam of light moving along a worldline, illuminating only the moment it inhabits. Within the severe order of determinism, the instrument preserves a small obstruction: must we read an already written universe frame by frame, or might something remain beyond calculation?","ja":"《時間結晶レンズ》は、実験構想《ラプラスの悪魔の結石》に属する観測器具の模型である。イオントラップ、時間結晶、集光鏡のかたちを借りて、目に見えない時間の構造に、凝視しうる姿を与えようとする。もし過去・現在・未来が、琥珀のなかで既に凝固したように共存しているなら、意識は世界線を移動する一筋の光として、その瞬間だけを照らしているのかもしれない。決定論の緊密な秩序の内部に、この装置は小さなつかえを残す。私たちは書き終えられた宇宙を一齣ずつ見るしかないのか。それとも、まだ計算されていない可能性があるのだろうか。"},
    galleryIntro:{"zh":"图像依次展开仪器周围的环境、基座与构件：遗构、球体、加速器、卫星与核心，被组织成一个尚未完成的微型宇宙。它们保留着精密的秩序，也让观测在真正开始之前，先成为一件关于时间与感知的事物。","en":"The images move from the setting and foundations to the instrument’s constituent forms: ruins, sphere, accelerator, satellites, and core arranged as an unfinished miniature cosmos. Their measured order remains, even as observation becomes an object of time and perception before any experiment can begin.","ja":"写真は装置の周囲の風景から基礎、そして各部の形態へと進む。遺構、球体、加速器、衛星、中核が、まだ完成していない小さな宇宙として並べられる。精密な秩序を残しながら、観測という行為は、実験が始まる前に時間と知覚をめぐるひとつの事物となっている。"},
    hero:[
      {title:{zh:'设计图',en:'Design Drawing',ja:'設計図'},year:'2023',src:'./works/the-instrument/the-instrument-1/ion trap.png'},
      {title:{zh:'渲染图',en:'Rendering',ja:'レンダリング'},year:'2023',src:'./works/the-instrument/the-instrument-1/ion trap-render.png'}
    ],
    gallery:[
      {src:'./works/the-instrument/the-instrument-1/ruins-1.jpg',title:{zh:'遗构 01',en:'Ruins 01',ja:'遺構 01'},note:{"zh":"理性退入背景之后，实验空间成为一片遗构。","en":"An experimental space after reason has receded into the background.","ja":"理性が背景へ退いたあと、実験空間は遺構となる。"}},
      {src:'./works/the-instrument/the-instrument-1/ruins-2.jpg',title:{zh:'遗构 02',en:'Ruins 02',ja:'遺構 02'},note:{"zh":"尚未完成的装置，保存着被延迟的未来。","en":"An unfinished apparatus holding a future that has been deferred.","ja":"未完成の装置に、先送りされた未来が留まる。"}},
      {src:'./works/the-instrument/the-instrument-1/foundation.jpg',title:{zh:'基座',en:'Foundation',ja:'基礎'},note:{"zh":"几何与材料为一次不确定的观测搭起基座。","en":"Geometry and matter form the base of an uncertain observation.","ja":"幾何学と素材が、不確かな観測の土台を形づくる。"}},
      {src:'./works/the-instrument/the-instrument-1/sphere.jpg',title:{zh:'球体',en:'Sphere',ja:'球体'},note:{"zh":"一个近乎凝固的形体，承载着时间琥珀的想象。","en":"A form almost held in suspension, recalling time preserved in amber.","ja":"凝固しかけた形態に、時間の琥珀という想像が宿る。"}},
      {src:'./works/the-instrument/the-instrument-1/accelerator.jpg',title:{zh:'加速器',en:'Accelerator',ja:'加速器'},note:{"zh":"重复的运动，使时间的节律获得可见的形式。","en":"Repetition gives the rhythm of time a visible form.","ja":"反復する動きが、時間の律動に目に見える形を与える。"}},
      {src:'./works/the-instrument/the-instrument-1/satellites.jpg',title:{zh:'卫星',en:'Satellites',ja:'衛星'},note:{"zh":"围绕与偏离之间，生成一幅私人的星图。","en":"Between orbit and departure, a private star chart takes shape.","ja":"周回と逸脱のあいだに、個人的な星図が生まれる。"}},
      {src:'./works/the-instrument/the-instrument-1/core.jpg',title:{zh:'核心',en:'Core',ja:'中核'},note:{"zh":"所有结构指向的中心，仍是一处未被回答的空白。","en":"The center to which everything points remains an unanswered space.","ja":"すべてが向かう中心には、なお答えのない空白がある。"}}
    ]
  },{
    title:{zh:'克莱因瓶中的船',en:'Ship in a Klein Bottle',ja:'クラインの壺の船'},
    prefix:{zh:'其二',en:'Part Two',ja:'其の二'},
    year:'2024',
    progress:'',
    kind:{"zh":"理论｜宇宙无形之手　·　模型｜克莱因瓶中船","en":"Theory | The Invisible Hand of the Universe　·　Model | Ship in a Klein Bottle","ja":"理論｜宇宙の見えざる手　·　模型｜クラインの壺の船"},
    heroLabel:{zh:'克莱因瓶中的船',en:'Ship in a Klein Bottle',ja:'クラインの壺の船'},
    hero:[
      {title:{zh:'模型视图一',en:'Model View One',ja:'模型図一'},year:'2024',src:'./works/the-instrument/the-instrument-2/ship-in-klein-bottle-1.jpg'},
      {title:{zh:'模型视图二',en:'Model View Two',ja:'模型図二'},year:'2024',src:'./works/the-instrument/the-instrument-2/ship-in-klein-bottle-2.jpg'}
    ],
    intro:{"zh":"《克莱因瓶中的船》是《宇宙无形之手》构想中的宇宙论模型。它借克莱因瓶封闭却无边界的几何悖论想象我们的处境：瓶是宇宙，船是其中航行的文明。透明容器中的小船似乎不断向前，却无法抵达真正的外部；使它移动的力量又仿佛来自它无法看见的地方。作品将发条宇宙的宏大秩序缩入一件由木、玻璃与金属构筑的小型装置，让看似自主的航行与不可见的驱动并置，留下一个关于自由意志、感知边界及宇宙之外的思想实验。","en":"Ship in a Klein Bottle is a cosmological model within the speculative project “The Invisible Hand of the Universe.” It borrows the paradox of a space that is closed yet without boundary: the bottle stands for the universe, the vessel for the civilization sailing inside it. The small ship appears to travel onward within its transparent enclosure, yet can never reach an outside; the force that moves it seems to arrive from somewhere beyond its sight. Wood, glass, and metal reduce the vast machinery of a clockwork cosmos to a small object, holding apparently autonomous motion beside an unseen source of movement. What remains is a thought experiment about free will, the limits of perception, and the possibility of an outside.","ja":"《クラインの壺の船》は、構想《宇宙の見えざる手》に属する宇宙論の模型である。閉じていながら境界をもたないクラインの壺の幾何学的な逆説を借り、瓶を宇宙、その内部を航行する船を文明に見立てる。透明な容器のなかの小舟は進みつづけるように見えて、真の外部には決して辿り着けない。それを動かす力もまた、船の視界の外から訪れるかのようだ。木、ガラス、金属で組まれた小さな装置に、時計仕掛けの宇宙の巨大な秩序を収め、自ら進むように見える航行と、見えない駆動を重ね合わせる。そこに残されるのは、自由意志、知覚の境界、そして宇宙の「外」をめぐる思考実験である。"},
    video:'./works/the-instrument/the-instrument-2/ship-in-klein-bottle.mp4',
    videoLabel:{zh:'运动影像',en:'Moving Image',ja:'映像'},
    videoIntro:{"zh":"影像让瓶中船的航行与外部驱动之间的距离逐渐显现。小船的运动始终发生在封闭的透明空间内，而使它移动的力量却留在视野之外；反复的航程由此成为一次没有出口的观测，悬置着自主与支配之间的疑问。","en":"The moving image gradually reveals the distance between the ship’s passage and its external drive. Its motion remains inside a transparent, enclosed space, while the force that moves it stays beyond view. The recurring voyage becomes an observation without an exit, leaving the relation between agency and control unresolved.","ja":"映像は、瓶のなかを進む船と外部の駆動との隔たりを少しずつ浮かび上がらせる。船の動きは閉じた透明な空間で起こり、その力の源は視野の外に留まる。繰り返される航行は、出口のない観測となり、自律と支配のあいだに問いを残す。"},
    gallery:[]
  }];
  var I18N={
    zh:{about:'关于 the instrument',archive:'效果图集',hint:'向右翻阅散落的瞬间',wait:'图片待上传',view:'查看图像',close:'退出观看',next:'下一件作品',video:'运动影像'},
    en:{about:'About the instrument',archive:'Visual Studies',hint:'Move right through scattered moments',wait:'Image to be added',view:'View image',close:'Close viewer',next:'Next work',video:'Moving Image'},
    ja:{about:'the instrument について',archive:'イメージ集',hint:'右へ進み、散らばった瞬間をたどる',wait:'画像は後日追加',view:'画像を見る',close:'閉じる',next:'次の作品',video:'映像'}
  };
  var SERIES_INTRO={"zh":["《the instrument》是一组介于实验仪器、雕塑与私人宇宙论之间的构成主义装置。金属、玻璃、光、磁场与机械运动被拆解、重组，仍保留测量、校准和观测的姿态，却被有意悬置在实证之外。仪器以科学的精密形制承载那些被理性逐渐放逐的直觉，使一间现代实验室隐约显露出祭坛的庄严。","我将这些作品视为“神不再眷顾的实验”：围绕时间、意识与宇宙边界展开的艺术性思想实验、观测设想和模型。装置的空转、失效与沉默让结果保持缺席，也让材料与观看本身重新显影。当仪器不再给出答案，人依然制造、凝视并继续追问；这份无功利的执着，是理性废墟中尚未熄灭的光。"],"en":["the instrument is a series of Constructivist apparatuses poised between laboratory equipment, sculpture, and private cosmology. Metal, glass, light, magnetic fields and mechanical movement are taken apart and assembled anew. The instruments retain the gestures of measurement, calibration, and observation, yet their purpose is deliberately suspended beyond empirical proof. In their precision, a place is made for intuitions that reason has gradually cast aside; the modern laboratory begins to resemble a sanctuary.","I think of these works as “experiments forsaken by the gods”: artistic thought experiments, imagined observations and models concerned with time, consciousness, and the boundaries of the universe. As the mechanisms run idle, falter, or fall silent, their promised result remains absent, allowing matter and the act of looking to become visible again. These instruments offer no final answer; still, someone continues to make, watch, and ask. That unprofitable devotion is a small surviving light in the ruins of reason."],"ja":["《the instrument》は、実験器具、彫刻、そして私的な宇宙論のあいだに置かれた構成主義的な装置のシリーズである。金属、ガラス、光、磁場、機械運動を解体し、再び組み上げる。計測、較正、観測の身振りは残されるが、その目的は実証の領域から意図的に宙吊りにされている。科学の精密な形式が、理性によって少しずつ遠ざけられた直観を受け入れ、現代の実験室はかすかに祭壇の厳粛さを帯びはじめる。","私はこれらを「神に見放された実験」と考えている。時間、意識、宇宙の境界をめぐる、芸術としての思考実験、想像上の観測、そして模型である。空転し、失効し、沈黙する装置は、結果を不在のままに留めることで、素材と見る行為そのものを再び浮かび上がらせる。答えの出ない器具を前にしても、人はつくり、見つめ、問い続ける。その無用の執念こそ、理性の廃墟になお残る小さな光である。"]};
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
      '" loading="lazy" decoding="async"><span class="ins-arrow" aria-hidden="true">↗︎</span></span>'+
      '<span class="ins-card-copy"><span class="ins-card-number">'+N(i)+' <small>/ '+N(w.gallery.length-1)+'</small></span>'+
      '<span class="ins-card-name">'+E(L(photo.title))+'</span></span>'+
      (photo.note?'<span class="ins-card-note">'+E(L(photo.note))+'</span>':'')+
      '</button></li>';
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
              '<img class="ins-video-poster" alt="" loading="lazy" decoding="async" '+
                'src="./works/the-instrument/the-instrument-2/ship-in-klein-bottle-thumb.jpg">'+
              '<canvas class="ins-video-still" aria-hidden="true"></canvas>'+
              '<video class="ins-video-preview" muted loop playsinline webkit-playsinline preload="none" aria-hidden="true"></video>'+
              '<span class="ins-video-open-mark" aria-hidden="true">↗︎</span>'+
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
      '<p class="ins-work-kind">'+E(L(w.kind))+'</p>'+
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
        '<span class="ins-turn-arrow" aria-hidden="true">↓︎</span>'+
      '</button></div>';
  }
  function renderInstrument(item){
    return '<section class="room-view ins-room" data-ins-room>'+
      '<header class="room-head"><button type="button" data-action="home" class="room-back">←︎ '+
        E(labels[lng()].back)+'</button><p>'+E(labels[lng()].works)+' / '+E(L(item.title))+'</p>'+languageSwitch()+'</header>'+
      '<div class="ins-page"><header class="ins-page-title"><h1>'+E(L(item.title))+'</h1></header>'+
      '<section class="ins-about"><h2>'+E(T('about'))+'</h2>'+
      '<div class="ins-series-statement">'+
      (SERIES_INTRO[lng()]||SERIES_INTRO.zh).map(function(p){return '<p>'+E(p)+'</p>';}).join('')+
      '</div>'+
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
      var poster=card.querySelector('.ins-video-poster');
      var movie=card.dataset.insVideoPath;
      var o={room:room,card:card,video:preview,timer:0,observer:null,playing:false};
      films.push(o);
      // A cached real JPEG appears long before iOS Safari can seek the MP4.
      // Poster errors alone enable the old frame-capture fallback.
      var hasPoster=false,posterFailed=false,activeHover=false;
      if(poster){
        function ready(){
          hasPoster=true;
          card.classList.add('has-poster');
          if(poster.naturalWidth&&poster.naturalHeight)
            card.style.setProperty('--ins-video-aspect',poster.naturalWidth+'/'+poster.naturalHeight);
        }
        function missing(){
          posterFailed=true;
          poster.hidden=true;
          // Missing CI output still yields an actual still when possible.
          init(true);
        }
        poster.addEventListener('load',ready,{once:true});
        poster.addEventListener('error',missing,{once:true});
        if(poster.complete){if(poster.naturalWidth)ready();else missing();}
      }
      function init(captureFallback){
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
          if(captureFallback&&posterFailed&&!o.playing&&Number.isFinite(preview.duration)&&preview.duration>0){
            try{preview.currentTime=Math.min(2,Math.max(0,preview.duration-.1));}catch(_){}
          }
        },{once:true});
        preview.addEventListener('seeked',function(){
          if(!posterFailed||o.playing||!preview.videoWidth||!preview.videoHeight)return;
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
        // Mouse preview remains opt-in; static images never preload MP4s.
        activeHover=true;
        clearTimeout(o.timer);
        o.timer=window.setTimeout(function(){
          if(!card.matches(':hover')||document.hidden||!card.isConnected)return;
          init(false);
          preview.muted=true;preview.loop=true;
          o.playing=true;
          var p=preview.play();
          if(p?.then)p.then(function(){card.classList.add('is-previewing');})
                      .catch(function(){o.playing=false;});
        },600);
      });
      card.addEventListener('pointerleave',function(){activeHover=false;stop();});
      card.addEventListener('pointerdown',function(){clearTimeout(o.timer);o.timer=0;});
      card.addEventListener('focusin',function(){ /* Image needs no network work. */ });
      // The JPG is already lazy-loaded by the browser; there is no reason
      // to request MP4 metadata when the card merely enters the viewport.
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