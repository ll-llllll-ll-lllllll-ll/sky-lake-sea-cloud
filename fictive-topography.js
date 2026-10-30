/* Fictive Topography · independent, image-ready reading room.
   Sources: the artist's Fictive Topography/Vaporware and Ship of Fools papers.
   Image arrays remain empty until the artist provides the actual artwork. */
(function () {
  "use strict";
  if (typeof renderRoom !== "function" || typeof state === "undefined") return;

  var SERIES = {
    zh: [
      "“虚构地形学”（Fictive Topography）借用了地形测绘的名称，却把虚构作为勘测的起点：先构想一处未经抵达、甚至从未存在的空间，再循着它的形体、遗迹与细节，反过来追问它可能拥有怎样的历史。卡尔维诺《隐形的城市》中由叙述生长出来的城市，为这种工作方式留下了最初的启发。地图逐渐成为一份由想象编写、又不断要求被考证的记录。",
      "这些地形由符号残片、人工制作的痕迹与含混的记忆相互拼接而成。它们让人感到某种难以指认的熟悉，仿佛曾经到过那里，却始终无法找到能够返回的路径。对不可归返之地的乡愁，连同对从未发生的过往的怀念，被保存在这些有意留下缝隙的结构里。",
      "“雾件”（Vaporware）原指被预告却迟迟未能实现的技术产品。在这里，它也指向一批悬置于构想与物质之间的作品：既留存了尚未兑现的未来，又仿佛携带着一段无法核实的过去。虚构地形学沿这些不完整的线索工作，为不存在的地方留下暂时的坐标。"
    ],
    en: [
      "Fictive Topography borrows the language of surveying, but begins with an imagined place. A space never visited, perhaps never existent, is given form first; its shapes, traces and fragments then suggest a history that might have produced it. Italo Calvino’s Invisible Cities helped set this inquiry in motion. The map becomes a record invented through imagination that nonetheless keeps asking to be examined as though it were real.",
      "These terrains gather fragments of symbols, marks of manual construction and uncertain memories. They carry an unsettling familiarity, as if one had been there before without ever finding a way back. Longing for an unreachable home and nostalgia for a past that may never have existed remain suspended among their visible seams.",
      "Vaporware originally named technologies announced but never delivered. Here it also describes works held between conception and material presence: remnants of a future yet to arrive, bearing traces of a past that cannot be verified. Fictive Topography follows these incomplete clues, leaving provisional coordinates for places that do not exist."
    ],
    ja: [
      "「虚構地形学（Fictive Topography）」は、地形を測量するという言葉を借りながら、想像上の場所を出発点とする。訪れたことのない、あるいは初めから存在しなかった空間を先に形づくり、その形態や痕跡、細部をたどりながら、そこにありえた歴史を逆向きに探っていく。カルヴィーノの『見えない都市』は、この試みの一つの出発点となった。地図は想像から書かれながらも、現実の記録のように検証を求め続ける。",
      "こうした地形は、記号の断片、手仕事の痕跡、曖昧な記憶をつなぎ合わせてできている。かつてそこにいたような奇妙な親しさがありながら、帰り道は見つからない。帰れない場所への郷愁と、もともと存在しなかった過去への懐かしさが、構造の隙間に留まっている。",
      "「ヴェイパーウェア（Vaporware）」は、発表されながら実現しなかった技術製品を指す言葉である。ここでは、構想と実体のあいだに留まる作品群にも重なる。まだ到来していない未来の残余が、確かめられない過去の痕跡を帯びている。虚構地形学はその不完全な手がかりをたどり、存在しない場所に仮の座標を残す。"
    ]
  };

  var I18N = {
    zh: { about:"关于虚构地形学", contents:"目录", image:"图像待补", next:"下一件作品", series:"雾件", study:"作品陈述", gallery:"图像", progress:"构想与制作记录", view:"查看",close:"关闭",play:"播放影像",previous:"上一张",following:"下一张",gif:"动态图像",film:"运动影像" },
    en: { about:"About Fictive Topography", contents:"Contents", image:"Images forthcoming", next:"Next work", series:"Vaporware", study:"Work statement", gallery:"Images", progress:"Concept and construction", view:"View",close:"Close",play:"Play video",previous:"Previous image",following:"Next image",gif:"Animated image",film:"Moving image" },
    ja: { about:"虚構地形学について", contents:"目次", image:"画像は後日追加", next:"次の作品", series:"ヴェイパーウェア", study:"作品について", gallery:"画像", progress:"構想・制作記録",view:"表示",close:"閉じる",play:"映像を再生",previous:"前の画像",following:"次の画像",gif:"アニメーション画像",film:"映像" }
  };

  var WORKS = [
    {
      number:{ zh:"其一", en:"Part One", ja:"其の一" },
      title:{
        zh:"◬ 233-12_021（未注明来源的子组件）",
        en:"◬ 233-12_021 (Unsourced Subassembly)",
        ja:"◬ 233-12_021（出所不明のサブアセンブリ）"
      },
      meta:{
        zh:"虚构地形学 · 雾件｜一处自足的空间",
        en:"Fictive Topography · Vaporware | A Self-Contained Space",
        ja:"虚構地形学 · ヴェイパーウェア｜自己完結した空間"
      },
      year:"",
      paragraphs:{
        zh:[
          "《◬ 233-12_021（未注明来源的子组件）》从“虚构地形”中生长出来。原先存在于文字、图像与模拟中的空间逐渐获得了物质的形体，成为一个可以环绕、靠近，却依然无法确认其来历的合成世界。它像是从某处被拆下的部件，名称中保留着编号，来源却始终缺席。",
          "这个自足的空间将世界的零散线索压缩在一起。残片相互拼接，制造出仿佛经历过某种历史的痕迹；其中既有令人安心的熟悉感，也有无法辨认的陌生。人们或许会想起某段并不属于自己的时间，或者怀念一处未曾真正居住过的地方。",
          "结构中的接缝、修补与手工留下的不完整，继续暴露着虚构的过程。它试图接近已经消失的事物，却无法将过去恢复成一个完整的整体；那些无法复原的部分，仍作为形体内部的空缺留在那里。"
        ],
        en:[
          "◬ 233-12_021 (Unsourced Subassembly) grew out of Fictive Topography. A space once confined to language, images, and simulation gradually acquired a material body: a fabricated world one can approach and circle around, yet never securely place. It seems to have been detached from somewhere else. The designation preserves a number, while its origin remains absent.",
          "This self-contained space compresses scattered traces of an entire world. Its fragments are joined into something that seems to have survived a history, carrying both a reassuring familiarity and an unease that cannot be named. It may recall a time that was never ours, or a place in which we have never lived.",
          "Joints, repairs, and the incompleteness of handmade construction keep the fiction visible. The work reaches toward what has vanished without restoring it to a coherent whole. What cannot be recovered remains as an absence within the structure itself."
        ],
        ja:[
          "《◬ 233-12_021（出所不明のサブアセンブリ）》は、虚構地形学から派生した作品である。言葉や図像、シミュレーションのなかにあった空間が少しずつ物質的な姿を得て、近づき、周囲を歩くことのできる合成世界となった。それでも来歴は定かでない。どこかから切り離された部品のように番号だけを残し、出所は空白のままである。",
          "この自己完結した空間には、世界の散らばった手がかりが押し込められている。断片は継ぎ合わされ、何らかの歴史をくぐってきたかのような痕跡を生む。そこには安心を覚える親しさと、名づけがたい違和感が同居する。自分のものではない時間や、住んだことのない場所への懐かしさが、ふと立ち上がる。",
          "継ぎ目や補修、手仕事に残る不完全さは、虚構がつくられた過程を隠さない。失われたものに近づこうとしながら、過去を一つの完全な姿へ戻すことはできない。回復できない部分は、その内部の空白として残り続ける。"
        ]
      },
      media: [
        {
          id:"vaporware-1-images",
          type:"slides",
          label:{zh:"图像",en:"Images",ja:"画像"},
          files:[1,2,3,4,5].map(function(n){
            return "./works/fictional-topography/vaporware-1/"+n+".jpg";
          })
        },
        {
          id:"vaporware-1-spin",
          type:"gif",
          src:"./works/fictional-topography/vaporware-1/vertical%20spin.gif",
          file:"vertical spin.gif"
        },
        {
          id:"vaporware-1-hologram",
          type:"video",
          src:"./works/fictional-topography/vaporware-1/hologram.mp4",
          file:"hologram.mp4"
        }
      ]
    },
    {
      number:{ zh:"其二", en:"Part Two", ja:"其の二" },
      title:{
        zh:"愚人船号-探测器",
        en:"Ship of Fools — Probe",
        ja:"愚者の船号―探査機"
      },
      meta:{
        zh:"虚构地形学 · 雾件｜媒介恐惧与漂流",
        en:"Fictive Topography · Vaporware | Media Anxiety and Drift",
        ja:"虚構地形学 · ヴェイパーウェア｜メディアへの不安と漂流"
      },
      year:"2025",
      detail:{
        zh:"1600 × 700 × 500 mm　·　2025.06.05　·　三甲港港口",
        en:"1600 × 700 × 500 mm　·　2025.06.05　·　Sanjia Port",
        ja:"1600 × 700 × 500 mm　·　2025.06.05　·　三甲港"
      },
      paragraphs:{
        zh:[
          "《愚人船号-探测器》来自一段难以核实的记忆：一间废弃美术馆的角落里，有一个漏水的容器，据说盛着“55个海洋的海水”。在担心记忆消散的同时，每一次试图将它重新画出、制造出来，又可能让新的物体取代原来模糊的印象。探测器便从这种相互牵制的执念中逐渐形成。",
          "装置中央留下了一处空置的控制舱。三轴稳定机构不断尝试维持姿态，外部由木材、金属与手工接合的表面则保留了修补和磨损的痕迹。精密的稳定机制围绕着一个始终空缺的中心运转，仿佛一次永远无法完成的记忆复原。",
          "在设计中的航程里，辅助推进器首先带领探测器穿过近岸碎浪与破波区；进入外海涌浪后，推进器分离返回岸边，主体将随洋流独自漂流。这个借用了航天器分级方式的动作，使一件尝试寻找记忆原点的器物，最终把自己的方向交给海水。",
          "它计划携带自2019年以来收集的海水样本，以这些来自真实海岸的微小份额，回应记忆里无法证实的“55个海洋”。中央控制舱仍然空置；寻找的过程与未能抵达的地方，一同留在航行之中。"
        ],
        en:[
          "Ship of Fools — Probe began with a memory difficult to verify: a leaking container in the corner of an abandoned art museum, said to hold “seawater from 55 oceans.” The fear of losing that memory is inseparable from the fear that painting or reconstructing it might replace the indistinct impression with something newly made. The probe took shape within this unresolved tension.",
          "An empty control chamber sits at its center. A three-axis stabilizing mechanism continually seeks to maintain its attitude, while timber, metal joints, and handmade surfaces retain traces of repair and wear. A precise system revolves around a center deliberately left vacant, as though the reconstruction of memory could never quite be completed.",
          "In the proposed voyage, auxiliary propulsion would first carry the probe across the surf and breakwater zone. Once beyond the nearshore water, the propulsion unit would separate and return to land, leaving the vessel to drift with the currents. This staging, borrowed from spaceflight, lets an object built to search for a memory finally surrender its direction to the sea.",
          "The vessel is intended to carry seawater samples collected since 2019, real fragments of distant shores answering the unverifiable “55 oceans” of the remembered scene. Its central chamber remains empty; the act of searching and the place never reached are carried together into the voyage."
        ],
        ja:[
          "《愚者の船号―探査機》は、確かめることのできない記憶から生まれた。廃館となった美術館の片隅で水を漏らしていた容器に、「55の海の海水」が入っていたという。記憶が消えてしまうことを恐れる一方、それを描き直し、つくり直すたびに、新しい物体が曖昧な原像を置き換えてしまうかもしれない。探査機は、その相反する執着から少しずつ形を得た。",
          "中央には空の制御室が置かれている。三軸の姿勢安定機構が絶えず水平を保とうとする一方、木材と金属を手作業でつないだ外殻には、補修と摩耗の跡が残る。精密な機構は、意図的に空けられた中心を囲んで動き続ける。記憶の復元は、いつまでも完了しない。",
          "構想上の航行では、補助推進装置がまず砕波帯と防波帯を越えて探査機を沖へ運ぶ。外海のうねりに入ると、推進部は分離して岸に戻り、本体は海流に委ねられる。宇宙船の段階分離を借りたこの動作によって、記憶の起点を探す装置は、最後にその行き先を海へ手渡す。",
          "船には2019年以来採集してきた各地の海水を積み込む計画である。実在する海岸から集まった小さな水の断片が、記憶のなかの確かめようのない「55の海」に応答する。中央の制御室は空いたまま、探し続ける行為と、辿り着かなかった場所とをともに運んでいく。"
        ]
      },
      media: [
        {
          id:"vaporware-2-shuttle",
          type:"slides",
          label:{zh:"shuttle",en:"shuttle",ja:"shuttle"},
          files:[1,2,3,4,5,6].map(function(n){
            return "./works/fictional-topography/vaporware-2/shuttle-"+n+".jpg";
          })
        },
        {
          id:"vaporware-2-stages",
          type:"slides",
          label:{zh:"stage one / two",en:"stage one / two",ja:"stage one / two"},
          files:["stage-one-1.jpg","stage-one-2.jpg","stage-two-1.jpg","stage-two-2.jpg"].map(function(name){
            return "./works/fictional-topography/vaporware-2/"+name;
          })
        },
        {
          id:"vaporware-2-probe",
          type:"slides",
          label:{zh:"probe",en:"probe",ja:"probe"},
          files:[1,2,3,4,5].map(function(n){
            return "./works/fictional-topography/vaporware-2/probe-"+n+".jpg";
          })
        }
      ]
    }
  ];

  function language() { return SERIES[state.lang] ? state.lang : "zh"; }
  function l(obj) { var k=language();return typeof obj==="string"?obj:((obj && (obj[k]||obj.zh||obj.en))||""); }
  function e(value) { return escapeHtml(value == null ? "" : String(value)); }
  function t(key) {return I18N[language()][key];}
  function projectTitle(work) {return l(work.number) + " · " + l(work.title);}

  // The media order is explicit and matches the actual repo directories.
  // Captions and interpretative notes intentionally remain unset for now.
  var MEDIA = Object.create(null);
  WORKS.forEach(function(work){(work.media||[]).forEach(function(block){MEDIA[block.id]=block;});});
  function pad(n){return String(n).padStart(2,"0");}
  function renderSlides(block){
    var n=block.files.length;
    return '<section class="ft-media-unit ft-slides" data-ft-slideshow="'+e(block.id)+'" data-ft-active="0">'+
      '<div class="ft-media-heading"><h3>'+e(l(block.label))+'</h3><span>'+pad(1)+' / '+pad(n)+'</span></div>'+
      '<button type="button" class="ft-slide-screen" data-ft-open-slide="'+e(block.id)+'" aria-label="'+e(t("view")+' · '+l(block.label))+'">'+
        block.files.map(function(src,i){return '<img class="ft-slide-image'+(i===0?' is-active':'')+'" src="'+
          e(src)+'" alt="'+e(l(block.label))+' '+pad(i+1)+' / '+pad(n)+'" loading="lazy" decoding="async" '+
          'data-ft-slide="'+i+'" aria-hidden="'+(i===0?'false':'true')+'">';}).join('')+
      '</button>'+
      '<div class="ft-slide-footer">'+
        '<div class="ft-slide-options" role="group" aria-label="'+e(l(block.label))+'">'+
          block.files.map(function(src,i){return '<button type="button" class="ft-slide-choice'+(i===0?' is-active':'')+
            '" data-ft-slide-pick="'+i+'" data-ft-slideshow-id="'+e(block.id)+'" aria-pressed="'+(i===0?'true':'false')+
            '" aria-label="'+e(l(block.label)+' '+pad(i+1)+' / '+pad(n))+'">'+pad(i+1)+'</button>';}).join('')+
        '</div>'+
        '<span class="ft-slide-count" data-ft-count>'+pad(1)+' / '+pad(n)+'</span>'+
      '</div>'+
    '</section>';
  }
  function renderMediaCard(block) {
    var isVideo=block.type==="video",label=isVideo?t("film"):t("gif");
    return '<section class="ft-media-unit ft-media-card-unit" data-ft-media-unit="'+e(block.id)+'">'+
      '<div class="ft-media-heading"><h3>'+e(label)+'</h3></div>'+
      '<button type="button" class="ft-media-card" data-ft-open="'+e(block.id)+'" aria-label="'+
        e((isVideo?t("play"):t("view"))+' · '+block.file)+'">'+
        '<span class="ft-media-card-screen">'+
          (isVideo?
            '<video class="ft-media-video" data-ft-preview="'+e(block.id)+'" preload="metadata" muted loop playsinline webkit-playsinline aria-hidden="true" '+
              'src="'+e(block.src)+'"></video>':
            '<img class="ft-media-gif" src="'+e(block.src)+'" alt="" loading="lazy" decoding="async">')+
          '<span class="ft-media-open-mark" aria-hidden="true">↗</span>'+
        '</span>'+
        '<span class="ft-media-card-caption"><span class="ft-media-card-count">01 <small>/ 01</small></span>'+
        '<span class="ft-media-card-name">'+e(block.file)+'</span></span>'+
      '</button>'+
    '</section>';
  }
  function renderImages(work) {
    if (!work.media || !work.media.length) {
      return '<div class="ft-photo-pending" aria-label="'+e(t("image"))+'">'+
        '<span class="ft-photo-pending-caption">'+e(t("image"))+'</span></div>';
    }
    var bits=[], pendingCards=[];
    function flushCards(){
      if (!pendingCards.length)return;
      bits.push('<div class="ft-media-cards">'+pendingCards.join("")+'</div>');
      pendingCards=[];
    }
    work.media.forEach(function(block){
      if (block.type==="slides"){flushCards();bits.push(renderSlides(block));}
      else if (block.type==="gif" || block.type==="video"){pendingCards.push(renderMediaCard(block));}
    });
    flushCards();
    return '<div class="ft-media-stack">'+bits.join("")+'</div>';
  }

  function renderWork(work, index) {
    var paragraphs=l(work.paragraphs) || [];
    return '<section class="ft-work" id="ft-work-' + (index+1) + '">' +
      '<header class="ft-work-heading">' +
        '<div><p class="ft-work-number">' + e(l(work.number)) + ' / ' + e(t("series")) + '</p>' +
        '<h2>' + e(l(work.title)) + '</h2></div>' +
        (work.year ? '<span class="ft-work-year">' + e(work.year) + '</span>' : '') +
      '</header>' +
      '<p class="ft-work-meta">' + e(l(work.meta)) + '</p>' +
      renderImages(work) +
      '<div class="ft-work-copy">' + paragraphs.map(function (p) {return '<p>' + e(p) + '</p>';}).join("") +
        (work.detail ? '<p class="ft-work-data">' + e(l(work.detail)) + '</p>' : '') +
      '</div>' +
    '</section>';
  }
  function renderFictive(item) {
    var source=SERIES[language()];
    return '<section class="room-view ft-room" data-room="fictional-topography" data-group="work">' +
      '<header class="room-head"><button type="button" data-action="home" class="room-back">←︎ ' + e(labels[language()].back) + '</button>' +
        '<p>' + e(labels[language()].works) + ' / ' + e(l(item.title)) + '</p>' + languageSwitch() + '</header>' +
      '<div class="ft-page">' +
        '<header class="ft-series-head"><h1>' + e(l(item.title)) + '</h1><p>2021-</p></header>' +
        '<section class="ft-about"><h2>' + e(t("about")) + '</h2>' +
          '<div class="ft-series-copy">' + source.map(function(p){return '<p>' + e(p) + '</p>';}).join("") + '</div>' +
          '<nav class="ft-contents" aria-label="' + e(t("contents")) + '"><p>' + e(t("contents")) + '</p><ol>' +
            WORKS.map(function(work,index){return '<li><button type="button" data-ft-jump="' + (index+1) + '">' +
              '<span>' + String(index+1).padStart(2,"0") + '</span>' + e(projectTitle(work)) + '</button></li>';}).join("") +
          '</ol></nav>' +
        '</section>' +
        WORKS.map(function(work,index){return renderWork(work,index);}).join('<div class="ft-section-space" aria-hidden="true"></div>') +
      '</div>' +
      '<div class="ft-viewer" data-ft-viewer role="dialog" aria-modal="true" aria-label="'+e(t("view"))+'" hidden>'+
        '<button type="button" class="ft-viewer-scrim" data-ft-close aria-label="'+e(t("close"))+'"></button>'+
        '<div class="ft-viewer-inner">'+
          '<img class="ft-viewer-gif" data-ft-viewer-img alt="" hidden>'+
          '<video class="ft-viewer-video" data-ft-viewer-video playsinline webkit-playsinline controls preload="none" hidden></video>'+
          '<div class="ft-viewer-caption"><span data-ft-viewer-label></span>'+
            '<button type="button" class="ft-viewer-close" data-ft-close>'+e(t("close"))+' ×</button></div>'+
        '</div>'+
      '</div>'+
    '</section>';
  }

  var originalRenderRoom=renderRoom;
  renderRoom=function(item) {
    return item && item.slug==="fictional-topography" ? renderFictive(item) : originalRenderRoom(item);
  };
  // On a hard reload, the root script may paint the generic page first.
  if (typeof parseRoute==="function" && parseRoute() && parseRoute().slug==="fictional-topography") render();

  // Multiple independent 7-second slideshows. Only on-screen groups run;
  // stop all timers when the route changes or the tab goes into the background.
  var currentRoom=null, slideGroups=Object.create(null), io=null;
  var openMedia=null, lastTrigger=null;
  var reduced=!!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  function stopTimer(group){
    if(group.timer){clearInterval(group.timer);group.timer=null;}
  }
  function mayPlay(group){
    return group.visible && !group.hovered && !document.hidden &&
      !openMedia && !reduced && currentRoom && currentRoom.isConnected;
  }
  function startTimer(group){
    stopTimer(group);
    if(mayPlay(group))group.timer=setInterval(function(){
      pickSlide(group,(group.index+1)%group.images.length,false);
    },7000);
  }
  function applySlide(group,next){
    var index=((next%group.images.length)+group.images.length)%group.images.length;
    group.index=index;
    group.el.dataset.ftActive=String(index);
    group.images.forEach(function(img,i){
      img.classList.toggle("is-active",i===index);
      img.setAttribute("aria-hidden",i===index?"false":"true");
    });
    group.buttons.forEach(function(btn,i){
      btn.classList.toggle("is-active",i===index);
      btn.setAttribute("aria-pressed",i===index?"true":"false");
    });
    var count=group.el.querySelector("[data-ft-count]");
    if(count)count.textContent=pad(index+1)+" / "+pad(group.images.length);
    var head=group.el.querySelector(".ft-media-heading > span");
    if(head)head.textContent=pad(index+1)+" / "+pad(group.images.length);
    if(openMedia===group.id && currentRoom){
      var viewer=currentRoom.querySelector("[data-ft-viewer]");
      var block=MEDIA[group.id];
      if(viewer && block){
        var full=viewer.querySelector("[data-ft-viewer-img]");
        full.src=block.files[index];
        full.alt=l(block.label)+" "+pad(index+1)+" / "+pad(group.images.length);
        viewer.querySelector("[data-ft-viewer-label]").textContent=
          l(block.label)+" "+pad(index+1)+" / "+pad(group.images.length);
      }
    }
  }
  function pickSlide(group,index,manual){
    if(!group||!group.images.length)return;
    var target=group.images[((index%group.images.length)+group.images.length)%group.images.length];
    var token=++group.changeToken;
    // Hidden pictures are fetched on demand and decoded before crossfading,
    // avoiding blank frames over slower mobile connections.
    target.loading="eager";
    var decoding=target.complete && target.naturalWidth?
      Promise.resolve() : (target.decode?target.decode():Promise.resolve());
    decoding.then(function(){
      if(!currentRoom||!currentRoom.isConnected||token!==group.changeToken)return;
      if(target.complete && !target.naturalWidth)return;
      applySlide(group,index);
    }).catch(function(){/* retain previous picture if one upload cannot decode */});
    if(manual)startTimer(group);
  }
  function closeViewer(refocus) {
    if(!currentRoom||!openMedia)return;
    var viewer=currentRoom.querySelector("[data-ft-viewer]");
    var video=viewer&&viewer.querySelector("[data-ft-viewer-video]");
    var img=viewer&&viewer.querySelector("[data-ft-viewer-img]");
    if(video){video.pause();video.removeAttribute("src");video.load();video.hidden=true;}
    if(img){img.removeAttribute("src");img.hidden=true;}
    if(viewer)viewer.hidden=true;
    document.body.classList.remove("ft-modal-open");
    openMedia=null;
    Object.keys(slideGroups).forEach(function(id){startTimer(slideGroups[id]);});
    var focus=lastTrigger;
    lastTrigger=null;
    if(refocus && focus && focus.isConnected)focus.focus({preventScroll:true});
  }
  function openViewer(id, trigger) {
    var block=MEDIA[id],viewer=currentRoom&&currentRoom.querySelector("[data-ft-viewer]");
    if(!block||!viewer||!trigger)return;
    if(openMedia)closeViewer(false);
    openMedia=id;lastTrigger=trigger;
    Object.keys(slideGroups).forEach(function(key){stopTimer(slideGroups[key]);});
    var img=viewer.querySelector("[data-ft-viewer-img]");
    var video=viewer.querySelector("[data-ft-viewer-video]");
    // Make the overlay visible before attempting user-gesture playback
    // (Safari may decline play() on an element within a hidden ancestor).
    viewer.hidden=false;
    if(block.type==="gif" || block.type==="slides"){
      var group=slideGroups[id],index=group?group.index:0;
      img.src=block.type==="slides"?block.files[index]:block.src;
      img.alt=block.type==="slides"?(l(block.label)+" "+pad(index+1)):block.file;
      img.hidden=false;
      video.hidden=true;
    }else if(block.type==="video"){
      var preview=trigger.querySelector(".ft-media-video");
      if(preview)preview.pause();
      video.src=block.src;
      video.hidden=false;
      video.controls=true;
      video.loop=false;
      video.muted=false;
      video.playsInline=true;
      img.hidden=true;
      // Click is a real user gesture. If playback is blocked the controls
      // remain available instead of making a false autoplay promise.
      var started=video.play();
      if(started && started.catch)started.catch(function(){video.controls=true;});
    }
    var group=slideGroups[id];
    viewer.querySelector("[data-ft-viewer-label]").textContent=block.type==="slides"?
      (l(block.label)+" "+pad(group?group.index+1:1)+" / "+pad(block.files.length)):block.file;
    document.body.classList.add("ft-modal-open");
    viewer.querySelector("[data-ft-close]").focus({preventScroll:true});
  }
  function teardown(){
    if(openMedia)closeViewer(false);
    if(io){io.disconnect();io=null;}
    Object.keys(slideGroups).forEach(function(id){stopTimer(slideGroups[id]);});
    slideGroups=Object.create(null);
    if(currentRoom)currentRoom.querySelectorAll(".ft-media-video").forEach(function(video){
      video.pause();
    });
    currentRoom=null;
  }
  function install(){
    var room=document.querySelector(".ft-room");
    if(room===currentRoom)return;
    teardown();
    if(!room)return;
    currentRoom=room;
    room.querySelectorAll("[data-ft-slideshow]").forEach(function(el){
      var id=el.getAttribute("data-ft-slideshow");
      var group={
        id:id,el:el,images:Array.from(el.querySelectorAll("[data-ft-slide]")),
        buttons:Array.from(el.querySelectorAll("[data-ft-slide-pick]")),
        index:0,timer:null,visible:false,hovered:false,changeToken:0
      };
      slideGroups[id]=group;
    });
    if("IntersectionObserver" in window){
      io=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          var id=entry.target.getAttribute("data-ft-slideshow");
          var group=slideGroups[id];
          if(!group)return;
          group.visible=entry.isIntersecting;
          startTimer(group);
        });
      },{threshold:.15,rootMargin:"70px 0px 70px 0px"});
      Object.keys(slideGroups).forEach(function(id){io.observe(slideGroups[id].el);});
    }else{
      Object.keys(slideGroups).forEach(function(id){
        slideGroups[id].visible=true;
        startTimer(slideGroups[id]);
      });
    }
  }
  var app=document.querySelector("#app");
  if(app && "MutationObserver" in window){
    new MutationObserver(install).observe(app,{childList:true,subtree:false});
  }
  install();

  // All interactions are delegated: language switches reconstruct the page.
  document.addEventListener("click",function(evt){
    var target=evt.target && evt.target.closest ? evt.target : null;
    if(!target)return;
    var jump=target.closest("[data-ft-jump]");
    if(jump&&jump.closest(".ft-room")){
      var section=document.getElementById("ft-work-"+Number(jump.dataset.ftJump));
      if(section)section.scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"});
      return;
    }
    var choice=target.closest("[data-ft-slide-pick]");
    if(choice && choice.closest(".ft-room")){
      var group=slideGroups[choice.getAttribute("data-ft-slideshow-id")];
      if(group)pickSlide(group,Number(choice.getAttribute("data-ft-slide-pick")),true);
      return;
    }
    var close=target.closest("[data-ft-close]");
    if(close && close.closest(".ft-room")){closeViewer(true);return;}
    var slideImage=target.closest("[data-ft-open-slide]");
    if(slideImage && slideImage.closest(".ft-room")){
      openViewer(slideImage.getAttribute("data-ft-open-slide"),slideImage);
      return;
    }
    var open=target.closest("[data-ft-open]");
    if(open && open.closest(".ft-room"))openViewer(open.getAttribute("data-ft-open"),open);
  });
  document.addEventListener("pointerover",function(evt){
    var target=evt.target;
    if(!target||!target.closest||!currentRoom)return;
    var slide=target.closest("[data-ft-slideshow]");
    if(slide&&currentRoom.contains(slide)&&!slide.contains(evt.relatedTarget)){
      var group=slideGroups[slide.getAttribute("data-ft-slideshow")];
      if(group){group.hovered=true;stopTimer(group);}
    }
    var card=target.closest("[data-ft-media-unit]");
    if(!card||!currentRoom.contains(card)||card.contains(evt.relatedTarget)||
       (evt.pointerType && evt.pointerType!=="mouse" && evt.pointerType!=="pen"))return;
    var video=card.querySelector(".ft-media-video");
    if(video && !reduced && !openMedia){
      var played=video.play();
      if(played && played.catch)played.catch(function(){});
    }
  });
  document.addEventListener("pointerout",function(evt){
    var target=evt.target;
    if(!target||!target.closest||!currentRoom)return;
    var slide=target.closest("[data-ft-slideshow]");
    if(slide&&currentRoom.contains(slide)&&!slide.contains(evt.relatedTarget)){
      var group=slideGroups[slide.getAttribute("data-ft-slideshow")];
      if(group){group.hovered=false;startTimer(group);}
    }
    var card=target.closest("[data-ft-media-unit]");
    if(!card||!currentRoom.contains(card)||card.contains(evt.relatedTarget))return;
    var video=card.querySelector(".ft-media-video");
    if(video){video.pause();try{video.currentTime=0;}catch(_){}}
  });
  document.addEventListener("focusin",function(evt){
    if(!currentRoom||!evt.target.closest)return;
    var card=evt.target.closest("[data-ft-media-unit]");
    if(!card||!currentRoom.contains(card)||reduced||openMedia)return;
    var video=card.querySelector(".ft-media-video");
    if(video){var played=video.play();if(played&&played.catch)played.catch(function(){});}
  });
  document.addEventListener("focusout",function(evt){
    if(!currentRoom||!evt.target.closest)return;
    var card=evt.target.closest("[data-ft-media-unit]");
    if(!card||!currentRoom.contains(card)||card.contains(evt.relatedTarget))return;
    var video=card.querySelector(".ft-media-video");
    if(video)video.pause();
  });
  document.addEventListener("keydown",function(evt){
    if(openMedia && evt.key==="Escape"){evt.preventDefault();closeViewer(true);return;}
    if(openMedia && (evt.key==="ArrowRight"||evt.key==="ArrowLeft") &&
       MEDIA[openMedia] && MEDIA[openMedia].type==="slides"){
      var fullGroup=slideGroups[openMedia];
      if(fullGroup){
        evt.preventDefault();
        pickSlide(fullGroup,fullGroup.index+(evt.key==="ArrowRight"?1:-1),true);
      }
      return;
    }
    if(!currentRoom||!evt.target.closest)return;
    var slideshow=evt.target.closest("[data-ft-slideshow]");
    if(!slideshow||!currentRoom.contains(slideshow))return;
    var group=slideGroups[slideshow.getAttribute("data-ft-slideshow")];
    if(!group)return;
    if(evt.key==="ArrowRight"||evt.key==="ArrowLeft"){
      evt.preventDefault();
      pickSlide(group,group.index+(evt.key==="ArrowRight"?1:-1),true);
    }
  });
  document.addEventListener("visibilitychange",function(){
    Object.keys(slideGroups).forEach(function(id){startTimer(slideGroups[id]);});
    if(document.hidden && currentRoom)currentRoom.querySelectorAll(".ft-media-video").forEach(function(video){video.pause();});
  });
})();
