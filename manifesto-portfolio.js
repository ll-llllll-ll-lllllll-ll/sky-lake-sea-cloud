/* Ruinwright Manifesto, portfolio reading room.
   Tenets/canonical captions: folly-archive/manifesto.{txt,en.txt,ja.txt}.
   Visual reference: original 2026-10-05 manifesto-atlas-v19 routed rail.
   This is scoped to the portfolio; the original manifesto site is untouched. */
(function () {
  "use strict";
  if (typeof renderRoom !== "function" || typeof state === "undefined") return;
  var SECTIONS = [
    {zh:"墟语学",en:"Ruin Lexicology",ja:"墟語学"},
    {zh:"近身之物的考古",en:"An Archaeology of Things Close at Hand",ja:"身近なものの考古学"},
    {zh:"借墟",en:"Borrowing the Ruin",ja:"借墟"},
    {zh:"粗野物性",en:"Brutal Materiality",ja:"粗野な物性"},
    {zh:"力流观",en:"The Force-Flow View",ja:"力の流れを観る"},
    {zh:"摧毁试体",en:"The Destructive Test Body",ja:"破壊試験体"},
    {zh:"重返悬境",en:"Return to the Suspended Realm",ja:"懸境へ帰る"},
    {zh:"耗散成声",en:"Dissipation into Sound",ja:"散逸して音となる"},
    {zh:"蓝图成谱",en:"The Blueprint Becomes a Score",ja:"設計図は楽譜となる"},
    {zh:"徒劳之义",en:"The Meaning of Futility",ja:"徒労の意義"}
  ];
  var ORDINAL = {
    zh:["第一则","第二则","第三则","第四则","第五则","第六则","第七则","第八则","第九则","第十则"],
    en:["First Tenet","Second Tenet","Third Tenet","Fourth Tenet","Fifth Tenet","Sixth Tenet","Seventh Tenet","Eighth Tenet","Ninth Tenet","Tenth Tenet"],
    ja:["第一則","第二則","第三則","第四則","第五則","第六則","第七則","第八則","第九則","第十則"]
  };
  var COPY = {
    zh: {chapter:"章节", tenets:"墟构师建造十则",reading:"宣言 / MANIFESTO",intro:"序言：在建筑之后",modern:"现代废墟",ruinwork:"墟构与墟构师",preview:"十则",read:"阅读正文",open:"阅读原文",mechanics:"墟构机械数据库 ↗",archive:"遗构馆 ↗",size:"字号",leading:"行距",tone:"护眼与夜间",epigraph:"“我以这些碎片支撑我的废墟”",source:"—— T. S. 艾略特《荒原》"},
    en: {chapter:"Contents",tenets:"Tenets of the Ruinwright",reading:"MANIFESTO",intro:"Prologue: After Architecture",modern:"Modern Ruins",ruinwork:"Ruinwork and the Ruinwright",preview:"Tenets",read:"Read the text",open:"Read in the full manifesto",mechanics:"Mechanism Archive ↗",archive:"Relic Archive ↗",size:"Type size",leading:"Leading",tone:"Reading tone",epigraph:"“These fragments I have shored against my ruins”",source:"— T. S. Eliot, The Waste Land"},
    ja: {chapter:"目次",tenets:"墟構師の建造十則",reading:"宣言 / MANIFESTO",intro:"序章――建築のあとで",modern:"現代の廃墟",ruinwork:"墟構と墟構師",preview:"十則",read:"本文を読む",open:"宣言の本文へ",mechanics:"墟構機械データベース ↗",archive:"遺構館 ↗",size:"文字サイズ",leading:"行間",tone:"読書環境",epigraph:"「私はこれらの断片で自分の廃墟を支えた」",source:"—— T. S. エリオット『荒地』"}
  };
  var BASE = "https://ruin-archive.site/manifesto.html";
  function lang(){return COPY[state.lang]?state.lang:"zh";}
  function l(val){return typeof val==="string"?val:val&&(val[lang()]||val.zh||val.en)||"";}
  function c(){return COPY[lang()];}
  function e(s){return escapeHtml(String(s==null?"":s));}
  function pad(n){return String(n).padStart(2,"0");}
  function manifestoLanguages(){
    return '<nav class="language mp-language" aria-label="Language">'+
      ["zh","en","ja"].map(function(code){
        return '<button type="button" data-action="language" data-lang="'+code+'" class="'+
          (state.lang===code?"is-active":"")+'">'+(code==="zh"?"中":code==="en"?"EN":"JP")+'</button>';
      }).join('<span class="mp-lang-divider" aria-hidden="true">/</span>')+
    '</nav>';
  }
  function url(i){return BASE+"#section-01-sub-"+pad(i);}
  function markup(item){
    var words=l(item.intro)||[];
    var images=item.tenetImages||[];
    var head='<header class="mp-topbar">'+
      '<button class="mp-back" type="button" data-action="home" aria-label="'+e(labels[lang()].back)+'">←</button>'+
      '<strong class="mp-brand">'+e(l(item.title))+'</strong>'+
      '<nav class="mp-links" aria-label="Archive">'+
        '<a href="https://ruin-archive.site/mechanics.html" target="_blank" rel="noopener noreferrer">'+e(c().mechanics)+'</a>'+
        '<a href="https://ruin-archive.site/" target="_blank" rel="noopener noreferrer">'+e(c().archive)+'</a>'+
      '</nav>'+
      '<div class="mp-tools">'+
        '<div class="mp-step" aria-label="'+e(c().leading)+'"><span>≡</span>'+
          '<button type="button" data-mp-action="leading-down" aria-label="'+e(c().leading)+' −">−</button>'+
          '<output data-mp-leading>2.30</output>'+
          '<button type="button" data-mp-action="leading-up" aria-label="'+e(c().leading)+' +">+</button></div>'+
        '<div class="mp-step" aria-label="'+e(c().size)+'"><span>Aa</span>'+
          '<button type="button" data-mp-action="font-down" aria-label="'+e(c().size)+' −">−</button>'+
          '<output data-mp-font>15</output>'+
          '<button type="button" data-mp-action="font-up" aria-label="'+e(c().size)+' +">+</button></div>'+
        '<label class="mp-tone"><span aria-hidden="true">☼</span>'+
          '<input type="range" data-mp-tone min="0" max="100" step="1" value="45" aria-label="'+e(c().tone)+'">'+
          '<span aria-hidden="true">☾</span></label>'+
        manifestoLanguages()+
      '</div>'+
    '</header>';
    var tiles=SECTIONS.map(function(name,i){
      var caption=l(name),image=images[i]||"";
      return '<button type="button" class="mp-tenet" data-mp-tenet="'+i+'" aria-label="'+e((ORDINAL[lang()]||ORDINAL.zh)[i]+" · "+caption)+'" aria-pressed="false">'+
        '<span class="mp-tenet-ordinal">'+e(ORDINAL[lang()][i])+'</span>'+
        '<span class="mp-ceramic"><span class="mp-ceramic-inner">'+
        (image?'<img src="'+e(image)+'" alt="" loading="'+(i<4?"eager":"lazy")+'" decoding="async">':"")+
        '</span></span>'+
        '<span class="mp-tenet-name">'+e(caption)+'</span>'+
      '</button>';
    }).join("");
    var items=SECTIONS.map(function(name,i){
      return '<a class="mp-index-tenet" data-mp-index="'+i+'" href="'+e(url(i))+'" target="_blank" rel="noopener noreferrer">'+
        '<span class="mp-index-code">1.2.'+(i+1)+'</span><span>'+e(ORDINAL[lang()][i])+': '+e(l(name))+'</span>'+
      '</a>';
    }).join("");
    var contents='<aside class="mp-index" aria-label="'+e(c().chapter)+'">'+
      '<p class="mp-index-kicker">'+e(c().chapter)+'</p>'+
      '<div class="mp-index-group">'+
        '<p class="mp-index-group-name">'+e(c().reading)+'</p>'+
        '<a class="mp-index-heading" href="'+BASE+'#section-00" target="_blank" rel="noopener noreferrer"><span>1.1.0</span>'+e(c().intro)+'</a>'+
        '<a class="mp-index-sub" href="'+BASE+'#section-00-sub-00" target="_blank" rel="noopener noreferrer"><span>1.1.1</span>'+e(c().modern)+'</a>'+
        '<a class="mp-index-sub" href="'+BASE+'#section-00-sub-01" target="_blank" rel="noopener noreferrer"><span>1.1.2</span>'+e(c().ruinwork)+'</a>'+
        '<a class="mp-index-heading" href="'+BASE+'#section-01" target="_blank" rel="noopener noreferrer"><span>1.2.0</span>'+e(c().tenets)+'</a>'+
        items+
      '</div>'+
    '</aside>';
    var firstImage=images[0]||"";
    var statement='<main class="mp-reading">'+
      '<header class="mp-title-block"><h1>'+e(l(item.title))+'</h1><span>Manifesto of the Ruinwright</span></header>'+
      '<div class="mp-epigraph"><p>'+e(c().epigraph)+'</p><small>'+e(c().source)+'</small></div>'+
      '<section class="mp-statement" aria-label="'+e(c().reading)+'">'+
        words.map(function(p){return '<p>'+e(p)+'</p>';}).join("")+
      '</section>'+
      '<div class="mp-focus" data-mp-focus aria-live="polite">'+
        '<div class="mp-focus-top"><span data-mp-focus-num>01 / 10</span><span>'+e(c().preview)+'</span></div>'+
        '<div class="mp-focus-body">'+
          '<img data-mp-focus-image src="'+e(firstImage)+'" alt="'+e(l(SECTIONS[0]))+'" loading="lazy">'+
          '<div><h2 data-mp-focus-name>'+e(ORDINAL[lang()][0])+'：'+e(l(SECTIONS[0]))+'</h2>'+
          '<a data-mp-focus-link href="'+e(url(0))+'" target="_blank" rel="noopener noreferrer">'+e(c().open)+' ↗</a></div>'+
        '</div>'+
      '</div>'+
      '<p class="mp-open-full"><a href="'+e(item.visit)+'" target="_blank" rel="noopener noreferrer">'+e(c().read)+' ↗</a></p>'+
    '</main>';
    return '<section class="room-view mp-room" data-room="ruinwright-manifesto" data-group="writing">'+
      head+
      '<div class="mp-scroll" data-mp-scroll>'+
        '<div class="mp-map" data-mp-map>'+
          '<nav class="mp-atlas" aria-label="'+e(c().tenets)+'">'+tiles+'</nav>'+
          '<svg class="mp-routes" data-mp-routes aria-hidden="true"></svg>'+
          '<div class="mp-body">'+contents+statement+'</div>'+
        '</div>'+
      '</div>'+
    '</section>';
  }

  var original=renderRoom;
  renderRoom=function(item){
    return item&&item.slug==="ruinwright-manifesto" ? markup(item) : original(item);
  };
  if(typeof parseRoute==="function"&&parseRoute()&&parseRoute().slug==="ruinwright-manifesto")render();

  var room=null, observer=null, raf=0, active=-1, hovered=-1;
  var settings={font:15,leading:2.3,tone:45};
  function clamp(x,a,b){return Math.max(a,Math.min(b,x));}
  function hexColor(s){return s.match(/\w\w/g).map(function(v){return parseInt(v,16);});}
  function blend(a,b,t){
    var first=hexColor(a),second=hexColor(b);
    return "#"+first.map(function(v,i){return Math.round(v+(second[i]-v)*t).toString(16).padStart(2,"0");}).join("");
  }
  function apply(){
    if(!room)return;
    var t=settings.tone, background=t<=45?blend("f3f2ed","e8e1cf",t/45):blend("e8e1cf","20231f",(t-45)/55);
    var ink=t<=45?"#3c3a36":blend("3c3a36","e5e2d9",(t-45)/55);
    var muted=t<=45?"#80796f":blend("80796f","aba79f",(t-45)/55);
    var line=t<=45?"#aea594":blend("aea594","62665e",(t-45)/55);
    room.style.setProperty("--mp-paper",background);
    room.style.setProperty("--mp-ink",ink);
    room.style.setProperty("--mp-muted",muted);
    room.style.setProperty("--mp-line",line);
    room.style.setProperty("--mp-size",settings.font+"px");
    room.style.setProperty("--mp-leading",settings.leading);
    var size=room.querySelector("[data-mp-font]"),leading=room.querySelector("[data-mp-leading]"),tone=room.querySelector("[data-mp-tone]");
    if(size)size.textContent=String(settings.font);
    if(leading)leading.textContent=settings.leading.toFixed(2);
    if(tone)tone.value=String(settings.tone);
  }
  function highlight(){
    if(!room)return;
    var selected=hovered>=0?hovered:active;
    room.querySelectorAll("[data-mp-tenet]").forEach(function(el){
      var i=Number(el.getAttribute("data-mp-tenet"));
      el.classList.toggle("is-active",i===selected);
      el.setAttribute("aria-pressed",String(i===active));
    });
    room.querySelectorAll("[data-mp-index]").forEach(function(el){el.classList.toggle("is-active",Number(el.dataset.mpIndex)===selected);});
    room.querySelectorAll(".mp-route").forEach(function(el){el.classList.toggle("is-active",Number(el.dataset.route)===selected);});
  }
  function updateRoutes(){
    raf=0;
    if(!room||!room.isConnected)return;
    var map=room.querySelector("[data-mp-map]"),svg=room.querySelector("[data-mp-routes]");
    if(!map||!svg)return;
    if(window.matchMedia("(max-width:900px)").matches){
      svg.innerHTML="";
      return;
    }
    var mr=map.getBoundingClientRect(),side=room.querySelector(".mp-index");
    var maxWidth=map.clientWidth,maxHeight=map.clientHeight;
    if(!maxWidth||!maxHeight||!side)return;
    svg.setAttribute("viewBox","0 0 "+maxWidth+" "+maxHeight);
    var out="";
    room.querySelectorAll("[data-mp-tenet]").forEach(function(card,i){
      var tile=card.querySelector(".mp-ceramic"),link=room.querySelector('[data-mp-index="'+i+'"]');
      if(!tile||!link)return;
      var a=tile.getBoundingClientRect(),b=link.getBoundingClientRect(),sr=side.getBoundingClientRect();
      var sx=a.left+a.width/2-mr.left,sy=a.bottom-mr.top+2;
      var ey=b.top+b.height*.5-mr.top;
      var lane=sy+18+i*11;
      var bend=Math.max(sr.right-mr.left+72,Math.min(sx-14,sr.right-mr.left+120+i*8));
      var diag=clamp(bend-(sr.right-mr.left)-18,18,44);
      var cx=bend-diag,cy=lane+diag;
      var endX=sr.right-mr.left-9;
      var d="M "+sx.toFixed(1)+" "+sy.toFixed(1)+" V "+lane.toFixed(1)+" H "+bend.toFixed(1)+" L "+cx.toFixed(1)+" "+cy.toFixed(1)+" V "+Math.max(cy,ey).toFixed(1)+" H "+endX.toFixed(1);
      out+='<g class="mp-route" data-route="'+i+'"><path class="mp-route-depth" d="'+d+'"/><path class="mp-route-main" d="'+d+'"/><path class="mp-route-glint" d="'+d+'"/></g>';
    });
    svg.innerHTML=out;
    highlight();
  }
  function schedule(){if(raf)cancelAnimationFrame(raf);raf=requestAnimationFrame(updateRoutes);}
  function select(index){
    if(!room||index<0||index>=SECTIONS.length)return;
    active=index;hovered=-1;
    var item=writings.find(function(x){return x.slug==="ruinwright-manifesto";});
    if(!item)return;
    var img=room.querySelector("[data-mp-focus-image]"),name=room.querySelector("[data-mp-focus-name]");
    var num=room.querySelector("[data-mp-focus-num]"),link=room.querySelector("[data-mp-focus-link]");
    if(img&&item.tenetImages[index]){img.src=item.tenetImages[index];img.alt=l(SECTIONS[index]);}
    if(name)name.textContent=ORDINAL[lang()][index]+"："+l(SECTIONS[index]);
    if(num)num.textContent=pad(index+1)+" / 10";
    if(link)link.href=url(index);
    highlight();
  }
  function install(){
    var next=document.querySelector(".mp-room");
    if(next===room)return;
    if(observer){observer.disconnect();observer=null;}
    room=next;active=-1;hovered=-1;
    if(!room)return;
    apply();highlight();
    if("ResizeObserver" in window){
      observer=new ResizeObserver(schedule);
      observer.observe(room.querySelector("[data-mp-map]"));
    }
    room.querySelectorAll(".mp-ceramic img").forEach(function(img){
      if(!img.complete)img.addEventListener("load",schedule,{once:true});
    });
    schedule();
  }
  var mount=document.getElementById("app");
  if(mount)new MutationObserver(install).observe(mount,{childList:true,subtree:false});
  window.addEventListener("resize",schedule,{passive:true});
  document.addEventListener("click",function(ev){
    var hit=ev.target.closest&&ev.target.closest("[data-mp-tenet],[data-mp-action]");
    if(!hit||!hit.closest(".mp-room"))return;
    if(hit.hasAttribute("data-mp-tenet")){select(Number(hit.dataset.mpTenet));return;}
    switch(hit.dataset.mpAction){
      case "font-down":settings.font=clamp(settings.font-.5,12,22);break;
      case "font-up":settings.font=clamp(settings.font+.5,12,22);break;
      case "leading-down":settings.leading=clamp(+(settings.leading-.05).toFixed(2),1.55,2.45);break;
      case "leading-up":settings.leading=clamp(+(settings.leading+.05).toFixed(2),1.55,2.45);break;
    }
    apply();schedule();
  });
  document.addEventListener("input",function(ev){
    var target=ev.target;
    if(target&&target.matches&&target.matches(".mp-room [data-mp-tone]")){
      settings.tone=clamp(Number(target.value)||0,0,100);
      apply();
    }
  });
  document.addEventListener("pointerover",function(ev){
    if(!room||!ev.target.closest)return;
    var hit=ev.target.closest("[data-mp-tenet],[data-mp-index]");
    if(!hit||!room.contains(hit)||hit.contains(ev.relatedTarget))return;
    hovered=Number(hit.getAttribute("data-mp-tenet")||hit.getAttribute("data-mp-index"));
    highlight();
  });
  document.addEventListener("pointerout",function(ev){
    if(!room||!ev.target.closest)return;
    var hit=ev.target.closest("[data-mp-tenet],[data-mp-index]");
    if(!hit||!room.contains(hit)||hit.contains(ev.relatedTarget))return;
    hovered=-1;highlight();
  });
  document.addEventListener("focusin",function(ev){
    if(!room||!ev.target.closest)return;
    var hit=ev.target.closest("[data-mp-tenet],[data-mp-index]");
    if(hit&&room.contains(hit)){hovered=Number(hit.getAttribute("data-mp-tenet")||hit.getAttribute("data-mp-index"));highlight();}
  });
  document.addEventListener("focusout",function(ev){
    if(!room||!ev.target.closest)return;
    var hit=ev.target.closest("[data-mp-tenet],[data-mp-index]");
    if(hit&&room.contains(hit)){hovered=-1;highlight();}
  });
  install();
})();
