/* Ruin Atlas: compact lexicon and live site concordance, v1.
   The primary site registry and tag assignments are sourced from ruin-archive. */
(function () {
  "use strict";

  var THUMBNAILS = {"瘟猪坝沉墟":"https://ruin-archive.site/thumbnails/effluent-sedimentation.webp","电台路焦土":"https://ruin-archive.site/thumbnails/aether-scorched-earth.webp","山葬灰脉":"https://ruin-archive.site/thumbnails/yellow-mountain.webp","硅脉遗厂":"https://ruin-archive.site/thumbnails/silicon-vein-works.webp","琉棘庭":"https://ruin-archive.site/thumbnails/walled-gallery.webp","裂翼坪":"https://ruin-archive.site/thumbnails/fallen-wing-field.webp","轨畔孤构":"https://ruin-archive.site/thumbnails/rail-side.webp","残柱林":"https://ruin-archive.site/thumbnails/concrete-pole.webp","钟寂残堂":"https://ruin-archive.site/thumbnails/bell-silent-church.webp","池骸湾":"https://ruin-archive.site/thumbnails/bath-crack.webp","毒烬轮冢":"https://ruin-archive.site/thumbnails/toxic-tire-pyre.webp","褶层湾":"https://ruin-archive.site/thumbnails/quarry-bay-stairway.webp","隐染悬里":"https://ruin-archive.site/thumbnails/suspended-homeland.webp","雾蚀空庐":"https://ruin-archive.site/thumbnails/mist-eroded-hut.webp","锈祷圣堂":"https://ruin-archive.site/thumbnails/rust-prayer-sanctuary.webp","釉骸拓壁":"https://ruin-archive.site/thumbnails/membrane.webp","叠骸构阵":"https://ruin-archive.site/thumbnails/fish-mouth.webp","苔网塬":"https://ruin-archive.site/thumbnails/gloss-veil.webp","陆坞舰骸":"https://ruin-archive.site/thumbnails/brick-battleship.webp","墟响厅":"https://ruin-archive.site/thumbnails/mirror.webp","波蚀脊堤":"https://ruin-archive.site/thumbnails/wave-eroded-structure.webp","曜原驿":"https://ruin-archive.site/thumbnails/solar.webp","溶境遗廊":"https://ruin-archive.site/thumbnails/aquarium-bunker.webp","荒娱敖包":"https://ruin-archive.site/thumbnails/mountain-signal.webp","彩壳堡":"https://ruin-archive.site/thumbnails/castle.webp","削岩残居":"https://ruin-archive.site/thumbnails/roof.webp","隐阶空墅":"https://ruin-archive.site/thumbnails/hidden-stair-villa.webp","暮辉骸殿":"https://ruin-archive.site/thumbnails/afterglow-palace.webp","迁痕空埠":"https://ruin-archive.site/thumbnails/dock.webp","山骸窟殿":"https://ruin-archive.site/thumbnails/phospho.webp","山融灶垣":"https://ruin-archive.site/thumbnails/earthwall.webp","崖隐蚀垣":"https://ruin-archive.site/thumbnails/cliff-granary.webp","褶脊胚庭":"https://ruin-archive.site/thumbnails/compressed-courtyard.webp","草间稚居":"https://ruin-archive.site/thumbnails/grass-child-dwelling.webp","圆镜残境":"https://ruin-archive.site/thumbnails/circular-mirror-remnant.webp","火药磨盘":"https://ruin-archive.site/thumbnails/gunpowder-mill.webp","碎璃舍":"https://ruin-archive.site/thumbnails/shattered-glass-lodge.webp","遗廊椅":"https://ruin-archive.site/thumbnails/corridor-chair.webp","穿陨绒厅":"https://ruin-archive.site/thumbnails/meteor-velvet-hall.webp"};
  var FALLBACK = [{"name":"瘟猪坝沉墟","lat":30.454417,"lng":104.047667,"archiveDate":"2025.04","type":"garden"},{"name":"电台路焦土","lat":31.225833,"lng":121.618333,"archiveDate":"2026.03","type":"garden"},{"name":"山葬灰脉","lat":32.04174,"lng":119.83912,"archiveDate":"2017.08","type":"record"},{"name":"硅脉遗厂","lat":31.1936472,"lng":121.6131444,"archiveDate":"2018.05","type":"record"},{"name":"裂翼坪","lat":41.860278,"lng":-87.606111,"archiveDate":"2021.08","type":"record"},{"name":"钟寂残堂","lat":41.787463,"lng":-87.633307,"archiveDate":"2022.11","type":"record"},{"name":"池骸湾","lat":37.7806,"lng":-122.5137,"archiveDate":"2023.08","type":"record"},{"name":"褶层湾","lat":47.1808,"lng":-122.5537,"archiveDate":"2023.12","type":"record"},{"name":"隐染悬里","lat":37.4543556,"lng":141.0370611,"archiveDate":"2024.01","type":"record"}];
  var GROUPS = [
    { key:"terrain", titles:["土地","Terrain","土地"], tags:[
      ["mountain","山","Montane"],["slope","坡","Slope"],["shore","岸","Littoral"],
      ["bay","湾","Bay"],["port","埠","Port"],["plateau","塬","Plateau"],
      ["valley","谷","Valley"],["cliff","崖","Cliff"]
    ]},
    { key:"structure", titles:["建筑","Structure","建築"], tags:[
      ["corridor","廊","Gallery"],["stair","阶","Stair"],["room","厅","Hall"],
      ["dwelling","居","Dwelling"],["inn","驿","Lodging"],["wall","垣","Wall"],["fort","堡","Fort"],
      ["hall","殿","Palace"],["sacred","圣","Sanctuary"],["tower","塔","Tower"],
      ["tunnel","甬","Passage"],["column","柱","Column"],["aperture","孔","Opening"],
      ["mirror","镜","Mirror"],["factory","厂","Works"],["vessel","舰","Vessel"],["rail","辙","Rail"],
      ["courtyard","庭","Courtyard"],["dam","坝","Dam"],["chamber","室","Chamber"],
      ["monument","碑","Monument"],["base","基","Base"],["ring","环","Ring"]
    ]},
    { key:"condition", titles:["状态","Condition","状態"], tags:[
      ["ruin","残","Fragment"],["remains","骸","Skeletal"],["desolate","荒","Derelict"],
      ["sunken","沉","Sunken"],["scorched","焦","Charred"],["meteor","陨","Meteoric"],["crack","裂","Fissured"],
      ["eroded","蚀","Eroded"],["relocated","迁","Displaced"],["compressed","压","Compressed"],
      ["seepage","渗","Infiltrated"],["contaminated","染","Contaminated"],
      ["placed","置","Placed"],["interstitial","间","Interstice"],
      ["grind","磨","Grinding"],["attrition","耗","Attrition"]
    ]},
    { key:"nature", titles:["自然","Env. Agency","自然"], tags:[
      ["vine","蔓","Vine"],["moss","苔","Moss"],["tree","木","Tree"],
      ["grass","草","Grass"],["spike","棘","Thorn"],["ash","灰","Ash"],
      ["membrane","膜","Membrane"],["water","水","Water"],["wave","波","Wave"],
      ["magnetic","磁","Magnetic"],["soil","土","Soil"],["sand","沙","Sand"],
      ["dust","尘","Dust"]
    ]}
  ];
  // Source: ruin-archive/index.html — 60 Latin / Greek etymons and English labels.
  // Labels are view-only: data-tag values and intersection filtering remain stable.
  var ROOT_LEXICON = {
    "tag_mountain": {
      "root": "mont-",
      "source": "Latin",
      "english": "Montane"
    },
    "tag_slope": {
      "root": "cliv-",
      "source": "Latin",
      "english": "Slope"
    },
    "tag_shore": {
      "root": "littor-",
      "source": "Latin",
      "english": "Littoral"
    },
    "tag_bay": {
      "root": "sinus-",
      "source": "Latin",
      "english": "Embayment"
    },
    "tag_port": {
      "root": "port-",
      "source": "Latin",
      "english": "Port"
    },
    "tag_plateau": {
      "root": "plani-",
      "source": "Latin",
      "english": "Tableland"
    },
    "tag_valley": {
      "root": "vall-",
      "source": "Latin",
      "english": "Valley"
    },
    "tag_cliff": {
      "root": "rup-",
      "source": "Latin",
      "english": "Cliff"
    },
    "tag_corridor": {
      "root": "portic-",
      "source": "Latin",
      "english": "Gallery"
    },
    "tag_stair": {
      "root": "grad-",
      "source": "Latin",
      "english": "Stair"
    },
    "tag_room": {
      "root": "aula-",
      "source": "Greek",
      "english": "Hall"
    },
    "tag_dwelling": {
      "root": "dom-",
      "source": "Latin",
      "english": "Dwelling"
    },
    "tag_inn": {
      "root": "hospit-",
      "source": "Latin",
      "english": "Lodging"
    },
    "tag_wall": {
      "root": "mur-",
      "source": "Latin",
      "english": "Wall"
    },
    "tag_fort": {
      "root": "castell-",
      "source": "Latin",
      "english": "Fortification"
    },
    "tag_hall": {
      "root": "palat-",
      "source": "Latin",
      "english": "Palace"
    },
    "tag_sacred": {
      "root": "sacr-",
      "source": "Latin",
      "english": "Sanctuary"
    },
    "tag_tower": {
      "root": "turr-",
      "source": "Latin",
      "english": "Tower"
    },
    "tag_tunnel": {
      "root": "via-",
      "source": "Latin",
      "english": "Passage"
    },
    "tag_column": {
      "root": "styl-",
      "source": "Greek",
      "english": "Column"
    },
    "tag_aperture": {
      "root": "foram-",
      "source": "Latin",
      "english": "Aperture"
    },
    "tag_mirror": {
      "root": "specul-",
      "source": "Latin",
      "english": "Mirror"
    },
    "tag_factory": {
      "root": "erg-",
      "source": "Greek",
      "english": "Works"
    },
    "tag_vessel": {
      "root": "nav-",
      "source": "Latin",
      "english": "Vessel"
    },
    "tag_rail": {
      "root": "ferro-",
      "source": "Latin",
      "english": "Rail"
    },
    "tag_courtyard": {
      "root": "atri-",
      "source": "Latin",
      "english": "Courtyard"
    },
    "tag_dam": {
      "root": "agger-",
      "source": "Latin",
      "english": "Dam"
    },
    "tag_chamber": {
      "root": "camer-",
      "source": "Latin",
      "english": "Chamber"
    },
    "tag_monument": {
      "root": "mnemo-",
      "source": "Greek",
      "english": "Monument"
    },
    "tag_base": {
      "root": "basi-",
      "source": "Greek",
      "english": "Base"
    },
    "tag_ring": {
      "root": "annul-",
      "source": "Latin",
      "english": "Ring"
    },
    "tag_ruin": {
      "root": "frag-",
      "source": "Latin",
      "english": "Fragmentary"
    },
    "tag_remains": {
      "root": "skelet-",
      "source": "Greek",
      "english": "Skeletal"
    },
    "tag_desolate": {
      "root": "relict-",
      "source": "Latin",
      "english": "Derelict"
    },
    "tag_sunken": {
      "root": "mers-",
      "source": "Latin",
      "english": "Sunken"
    },
    "tag_scorched": {
      "root": "carbon-",
      "source": "Latin",
      "english": "Charred"
    },
    "tag_meteor": {
      "root": "meteōr-",
      "source": "Greek",
      "english": "Meteoric"
    },
    "tag_crack": {
      "root": "fiss-",
      "source": "Latin",
      "english": "Fissured"
    },
    "tag_eroded": {
      "root": "erod-",
      "source": "Latin",
      "english": "Eroded"
    },
    "tag_relocated": {
      "root": "migr-",
      "source": "Latin",
      "english": "Displaced"
    },
    "tag_compressed": {
      "root": "press-",
      "source": "Latin",
      "english": "Compressed"
    },
    "tag_seepage": {
      "root": "percol-",
      "source": "Latin",
      "english": "Infiltrated"
    },
    "tag_contaminated": {
      "root": "contamin-",
      "source": "Latin",
      "english": "Contaminated"
    },
    "tag_placed": {
      "root": "posit-",
      "source": "Latin",
      "english": "Emplaced"
    },
    "tag_interstitial": {
      "root": "interstit-",
      "source": "Latin",
      "english": "Interstitial"
    },
    "tag_grind": {
      "root": "tribo-",
      "source": "Greek",
      "english": "Grinding"
    },
    "tag_attrition": {
      "root": "attrit-",
      "source": "Latin",
      "english": "Attrition"
    },
    "tag_vine": {
      "root": "viti-",
      "source": "Latin",
      "english": "Vine"
    },
    "tag_moss": {
      "root": "bryo-",
      "source": "Greek",
      "english": "Moss"
    },
    "tag_tree": {
      "root": "xylo-",
      "source": "Greek",
      "english": "Woody"
    },
    "tag_grass": {
      "root": "herb-",
      "source": "Latin",
      "english": "Herbaceous"
    },
    "tag_spike": {
      "root": "acantho-",
      "source": "Greek",
      "english": "Thorn"
    },
    "tag_ash": {
      "root": "ciner-",
      "source": "Latin",
      "english": "Ash"
    },
    "tag_membrane": {
      "root": "membran-",
      "source": "Latin",
      "english": "Membrane"
    },
    "tag_water": {
      "root": "hydro-",
      "source": "Greek",
      "english": "Water"
    },
    "tag_wave": {
      "root": "und-",
      "source": "Latin",
      "english": "Wave"
    },
    "tag_magnetic": {
      "root": "magneto-",
      "source": "Greek",
      "english": "Magnetic"
    },
    "tag_soil": {
      "root": "pedo-",
      "source": "Greek",
      "english": "Soil"
    },
    "tag_sand": {
      "root": "aren-",
      "source": "Latin",
      "english": "Sand"
    },
    "tag_dust": {
      "root": "pulver-",
      "source": "Latin",
      "english": "Dust"
    }
  };
  var lexiconMode = "roots";

  var COPY = {
    zh: {
      title:"— 墟语学索引 —", intro:"土地、建筑、状态、自然。选择语素，逐次排除不符合的地点；每一个留下的名字，仍对应着一处继续变化的遗构。",
      reset:"清除选择", listing:"— 遗构录地点 —", count:"处地点", filtered:"筛选后", empty:"没有符合这些语素的遗构。",
      loading:"正在读取遗构录…", unavailable:"暂时无法读取完整名录，以下为部分地点。", map:"在地图中定位"
    },
    en: {
      title:"— RUIN LEXICOLOGY —", intro:"Terrain, structure, condition, and nature. Select morphemes to eliminate sites that do not share them. Each remaining name points to a relic still undergoing change.",
      reset:"clear selection", listing:"— RECORDED SITES —", count:"sites", filtered:"remaining", empty:"No sites share this combination of signs.",
      loading:"reading archive…", unavailable:"The complete archive is unavailable; showing a partial list.", map:"Locate on map"
    },
    ja: {
      title:"— 墟語学索引 —", intro:"土地、建築、状態、自然。語素を選び、該当しない地点を順に除いていく。残った名の一つひとつが、今も変わり続ける遺構につながっている。",
      reset:"選択を解除", listing:"— 遺構録・地点 —", count:"地点", filtered:"該当", empty:"この語素の組み合わせに該当する遺構はない。",
      loading:"遺構録を読み込み中…", unavailable:"遺構録の全件を取得できないため、一部のみ表示しています。", map:"地図で位置を見る"
    }
  };

  var shell = null;
  var panel = null;
  var sites = [];
  var selected = new Set();
  var hoveredTag = "";
  var loadingId = 0;
  var loaded = false;

  function lang() {
    var value = String(document.documentElement.lang || "zh").toLowerCase();
    return value.indexOf("ja") === 0 ? "ja" : value.indexOf("en") === 0 ? "en" : "zh";
  }
  function indexForLang() { return lang() === "en" ? 1 : lang() === "ja" ? 2 : 0; }
  function esc(value) {
    return String(value == null ? "" : value).replace(/&/g,"&amp;")
      .replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }
  function displayName(name) {
    if (name === "瘟猪坝沉墟") return "沉墟心室";
    if (name === "电台路焦土") return "朽塔焦土";
    return String(name || "");
  }
  function recorderNames(site) {
    var primary = String(site && site.recorder || "罗清源").trim();
    var secondary = site && Array.isArray(site.secondaryRecords) ? site.secondaryRecords : [];
    return Array.from(new Set([primary].concat(secondary.map(function(record) {
      return String(record && record.recorder || "").trim();
    })).filter(Boolean)));
  }
  function recorderLabel() {
    return lang() === "en" ? "Recorded by" : lang() === "ja" ? "記録者" : "记录者";
  }
  function tagsOf(site) {
    var data = window.siteTagsMapping || {};
    return String(data[site.name] || "").split(",").map(function(tag){return tag.trim();}).filter(Boolean);
  }
  function validSite(site) {
    return site && site.name && Number.isFinite(Number(site.lat)) && Number.isFinite(Number(site.lng));
  }
  function matches(site, wanted) {
    var tags = tagsOf(site);
    return wanted.every(function(tag) { return tags.indexOf(tag) >= 0; });
  }

  function lexiconTerm(item) {
    var entry = ROOT_LEXICON["tag_" + item[0]];
    if (lang() !== "en") return item[1];
    return entry ? (lexiconMode === "roots" ? entry.root : entry.english) : item[2];
  }
  function tagAccessibility(item) {
    var entry = ROOT_LEXICON["tag_" + item[0]];
    if (lang() !== "en") return { title: item[2] || item[1], label: item[1] };
    if (!entry) return { title: item[2], label: item[2] };
    return lexiconMode === "roots" ?
      {title: entry.english + " · " + entry.source + " root " + entry.root,
       label: entry.english + "; " + entry.source + " root " + entry.root} :
      {title: entry.english, label: entry.english};
  }
  function renderLexiconGroup(group, idx) {
    var tags = group.tags.map(function(item) {
      var meta = tagAccessibility(item);
      return '<button type="button" class="ruin-atlas-index-tag" data-tag="'+esc(item[0])+
        '" aria-pressed="false" aria-label="'+esc(meta.label)+'" title="'+esc(meta.title)+'">'+
        esc(lexiconTerm(item))+'</button>';
    }).join("");
    return '<div class="ruin-atlas-index-group" data-group="'+esc(group.key)+'">'+
      '<span class="ruin-atlas-index-category">'+esc(group.titles[idx])+'</span>'+
      '<span class="ruin-atlas-index-separator" aria-hidden="true">|</span>'+
      '<div class="ruin-atlas-index-tags">'+tags+'</div></div>';
  }
  function switchMarkup() {
    if (lang() !== "en") return "";
    return '<button type="button" class="ruin-atlas-index-lexicon-switch"'+
      ' role="switch" aria-checked="'+(lexiconMode === "roots")+'"'+
      ' data-mode="'+esc(lexiconMode)+'" aria-label="Latin / Greek roots or English terms">'+
      '<span class="ruin-atlas-index-switch-label" data-switch-label="english">ENG</span>'+
      '<span class="ruin-atlas-index-switch-track" aria-hidden="true">'+
        '<span class="ruin-atlas-index-switch-thumb"></span></span>'+
      '<span class="ruin-atlas-index-switch-label" data-switch-label="roots">LAT·GR</span>'+
      '</button>';
  }
  function refreshLexiconSwitch() {
    if (!panel) return;
    var rootMode = lexiconMode === "roots";
    panel.dataset.lexiconLang = lang();
    panel.dataset.lexiconMode = lexiconMode;
    panel.querySelectorAll(".ruin-atlas-index-tag").forEach(function(button) {
      var item = null;
      GROUPS.some(function(group) {
        item = group.tags.find(function(tag) { return tag[0] === button.dataset.tag; }) || null;
        return Boolean(item);
      });
      if (!item) return;
      var meta = tagAccessibility(item);
      button.textContent = lexiconTerm(item);
      button.title = meta.title;
      button.setAttribute("aria-label", meta.label);
      button.classList.toggle("is-root-lexeme",lang() === "en" && rootMode);
    });
    var toggle = panel.querySelector(".ruin-atlas-index-lexicon-switch");
    if (!toggle) return;
    toggle.dataset.mode = lexiconMode;
    toggle.setAttribute("aria-checked",String(rootMode));
    toggle.setAttribute("aria-label",rootMode ?
      "Latin / Greek roots selected. Switch to English terms." :
      "English terms selected. Switch to Latin / Greek roots.");
    toggle.title = rootMode ? "Latin / Greek roots · switch to English" :
      "English terms · switch to Latin / Greek roots";
    toggle.querySelectorAll(".ruin-atlas-index-switch-label").forEach(function(label) {
      label.classList.toggle("is-active",label.dataset.switchLabel === lexiconMode);
    });
  }
  function renderLexiconGroups(idx) {
    var isEnglish = lang() === "en";
    var groups = isEnglish ?
      GROUPS.map(function(group) {return '<div class="ruin-atlas-index-line">'+renderLexiconGroup(group,idx)+'</div>';}) :
      ['<div class="ruin-atlas-index-line">'+GROUPS.slice(0,2).map(function(g){return renderLexiconGroup(g,idx);}).join("")+'</div>',
       '<div class="ruin-atlas-index-line">'+GROUPS.slice(2).map(function(g){return renderLexiconGroup(g,idx);}).join("")+'</div>'];
    return groups.join("");
  }

  function renderChrome() {
    if (!panel) return;
    var copy = COPY[lang()];
    var idx = indexForLang();
    panel.setAttribute("aria-label", copy.title.replace(/—/g,"").trim());
    panel.innerHTML =
      '<div class="ruin-atlas-index-head"><div class="ruin-atlas-index-heading-controls">'+
        '<h2 class="ruin-atlas-index-title">'+esc(copy.title)+'</h2>'+
        switchMarkup()+'</div>'+
        '<span class="ruin-atlas-index-count" aria-live="polite"></span></div>'+
      '<p class="ruin-atlas-index-intro">'+esc(copy.intro)+'</p>'+
      '<div class="ruin-atlas-index-groups" role="group" aria-label="'+esc(copy.title)+'">'+
      renderLexiconGroups(idx)+'</div>'+
      '<div class="ruin-atlas-index-list-head"><h3>'+esc(copy.listing)+'</h3>'+
        '<button type="button" class="ruin-atlas-index-clear">'+esc(copy.reset)+'</button></div>'+
      '<div class="ruin-atlas-index-list" role="group" aria-label="'+esc(copy.listing)+'"></div>'+
      '<p class="ruin-atlas-index-empty" hidden>'+esc(copy.empty)+'</p>'+
      '<p class="ruin-atlas-index-status" aria-live="polite"></p>'+
      '<div class="ruin-atlas-index-preview" aria-hidden="true" hidden>'+
        '<img class="ruin-atlas-index-preview-image" alt="" />'+
        '<span class="ruin-atlas-index-preview-caption">'+
          '<span class="ruin-atlas-preview-place"></span>'+
          '<span class="ruin-atlas-preview-recorder"></span>'+
        '</span></div>';
    refreshLexiconSwitch();
    renderList();
  }
  function renderList() {
    if (!panel) return;
    var list = panel.querySelector(".ruin-atlas-index-list");
    var copy = COPY[lang()];
    list.innerHTML = sites.map(function(site, index) {
      return '<button type="button" class="ruin-atlas-index-site" data-index="'+index+
        '" aria-label="'+esc(displayName(site.name)+" · "+copy.map)+'">'+
        '<span class="ruin-atlas-index-dot" aria-hidden="true"></span>'+
        '<span class="ruin-atlas-index-site-name">'+esc(displayName(site.name))+'</span></button>';
    }).join("");
    update(true);
  }
  function update(dispatch) {
    if (!panel) return;
    var active = Array.from(selected);
    var count = 0;
    panel.querySelectorAll(".ruin-atlas-index-site").forEach(function(button) {
      var site = sites[Number(button.dataset.index)];
      var visible = matches(site, active);
      button.hidden = !visible;
      button.classList.toggle("is-linked", Boolean(hoveredTag) && tagsOf(site).indexOf(hoveredTag) >= 0);
      if (visible) count++;
    });
    panel.querySelectorAll(".ruin-atlas-index-tag").forEach(function(button) {
      var tag = button.dataset.tag;
      var isActive = selected.has(tag);
      var possible = isActive || sites.some(function(site) { return matches(site, active.concat(tag)); });
      button.disabled = !possible;
      button.classList.toggle("is-active", isActive);
      button.classList.toggle("is-related", hoveredTag === tag);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
    var copy = COPY[lang()];
    panel.querySelector(".ruin-atlas-index-count").textContent =
      (active.length ? copy.filtered+" " : "") + count+" / "+sites.length+" "+copy.count;
    panel.querySelector(".ruin-atlas-index-clear").disabled = !active.length;
    panel.querySelector(".ruin-atlas-index-empty").hidden = count > 0 || !sites.length;
    if (dispatch && shell) {
      shell.dispatchEvent(new CustomEvent("ruin-mini-index-filter",{detail:{tags:active}}));
    }
  }
  function hidePreview() {
    if (!panel) return;
    var preview = panel.querySelector(".ruin-atlas-index-preview");
    if (preview) preview.hidden = true;
  }
  function showPreview(button) {
    if (!panel || !button) return;
    var site = sites[Number(button.dataset.index)];
    if (!site) return;
    var url = THUMBNAILS[site.name];
    var preview = panel.querySelector(".ruin-atlas-index-preview");
    if (!url) { hidePreview(); return; }
    var image = preview.querySelector("img");
    image.src = url;
    image.alt = displayName(site.name);
    preview.querySelector(".ruin-atlas-preview-place").textContent =
      displayName(site.name) + (site.archiveDate ? " · " + site.archiveDate : "");
    preview.querySelector(".ruin-atlas-preview-recorder").textContent =
      recorderLabel() + " · " + recorderNames(site).join(" / ");
    var parent = panel.getBoundingClientRect();
    var anchor = button.getBoundingClientRect();
    var compact = window.matchMedia && window.matchMedia("(max-width:760px)").matches;
    var width = Math.min(compact ? 94 : 118, Math.max(76,parent.width * 0.28));
    var x = anchor.right - parent.left + 9;
    if (x + width > parent.width - 4) x = anchor.left - parent.left - width - 9;
    x = Math.max(5, Math.min(parent.width - width - 5,x));
    var previewHeight = width + 54;
    var y = anchor.top - parent.top - 30;
    y = Math.max(6,Math.min(Math.max(6,parent.height - previewHeight - 8),y));
    preview.style.width = width+"px";
    preview.style.left = x+"px";
    preview.style.top = y+"px";
    preview.hidden = false;
  }
  function locate(index) {
    var site = sites[index];
    if (!site || !shell) return;
    hidePreview();
    shell.dataset.ruinMiniPendingFocus = site.name;
    shell.dispatchEvent(new CustomEvent("ruin-mini-index-flyto",{detail:{name:site.name}}));
    // The map is above the list; return it to view as the flight begins.
    var scroller = shell.closest(".room-scroll");
    if (scroller) {
      var rect = shell.getBoundingClientRect();
      var host = scroller.getBoundingClientRect();
      var top = scroller.scrollTop + rect.top - host.top - 18;
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      scroller.scrollTo({top:Math.max(0,top),behavior:reduce?"auto":"smooth"});
    }
  }
  function onClick(event) {
    var vocabularySwitch = event.target.closest(".ruin-atlas-index-lexicon-switch");
    if (vocabularySwitch && panel.contains(vocabularySwitch)) {
      lexiconMode = lexiconMode === "roots" ? "english" : "roots";
      // In-place relabeling keeps selected tags, counts, matching dots, focus,
      // and the current Leaflet map viewport untouched.
      refreshLexiconSwitch();
      return;
    }
    var tagButton = event.target.closest(".ruin-atlas-index-tag");
    if (tagButton && panel.contains(tagButton)) {
      if (tagButton.disabled) return;
      var tag = tagButton.dataset.tag;
      if (selected.has(tag)) selected.delete(tag); else selected.add(tag);
      hidePreview();
      update(true);
      return;
    }
    var reset = event.target.closest(".ruin-atlas-index-clear");
    if (reset && panel.contains(reset)) {
      selected.clear();
      update(true);
      return;
    }
    var siteButton = event.target.closest(".ruin-atlas-index-site");
    if (siteButton && panel.contains(siteButton)) locate(Number(siteButton.dataset.index));
  }
  function onOver(event) {
    var tag = event.target.closest(".ruin-atlas-index-tag");
    if (tag && panel.contains(tag)) {
      hoveredTag = tag.dataset.tag;
      update(false);
    }
    var button = event.target.closest(".ruin-atlas-index-site");
    if (button && panel.contains(button) && !button.hidden) showPreview(button);
  }
  function onOut(event) {
    var tag = event.target.closest(".ruin-atlas-index-tag");
    if (tag && !tag.contains(event.relatedTarget)) {
      hoveredTag = "";
      update(false);
    }
    var button = event.target.closest(".ruin-atlas-index-site");
    if (button && !button.contains(event.relatedTarget)) hidePreview();
  }
  function mount() {
    var nextShell = document.querySelector('.room-view[data-room="ruin-atlas"] .ruin-mini-shell:not(.ruin-mini-cabinet-shell)');
    if (!nextShell) {
      shell = null;
      panel = null;
      sites = [];
      selected.clear();
      loadingId++;
      return;
    }
    if (shell === nextShell && panel && panel.isConnected) return;
    shell = nextShell;
    selected.clear();
    hoveredTag = "";
    sites = [];
    loaded = false;
    var section = shell.closest(".ruin-mini-section");
    if (!section) return;
    panel = document.createElement("section");
    panel.className = "ruin-atlas-index";
    shell.insertAdjacentElement("afterend", panel);
    panel.addEventListener("click", onClick);
    panel.addEventListener("pointerover", onOver);
    panel.addEventListener("pointerout", onOut);
    panel.addEventListener("focusin", function(event) { onOver(event); });
    panel.addEventListener("focusout", function(event) { onOut(event); });
    shell.addEventListener("ruin-mini-map-ready", function() { update(true); });
    renderChrome();
    panel.querySelector(".ruin-atlas-index-status").textContent = COPY[lang()].loading;
    var taskId = ++loadingId;

    function finish(fallback) {
      if (taskId !== loadingId || !panel || !panel.isConnected) return;
      var remote = Array.isArray(window.sites) && window.sites.length ? window.sites : null;
      if (remote) fallback = false;
      sites = (remote || FALLBACK).filter(validSite);
      loaded = !fallback;
      renderList();
      panel.querySelector(".ruin-atlas-index-status").textContent = fallback ? COPY[lang()].unavailable : "";
    }
    if (Array.isArray(window.sites) && window.sites.length) { finish(false); return; }
    var script = document.getElementById("ruin-mini-site-data");
    if (!script) {
      script = document.createElement("script");
      script.id = "ruin-mini-site-data";
      script.src = "https://ruin-archive.site/data/site-data.js?v=20261116-index";
      document.head.appendChild(script);
    }
    script.addEventListener("load", function(){finish(false);}, {once:true});
    script.addEventListener("error",function(){finish(true);},{once:true});
    window.setTimeout(function(){if (!sites.length) finish(true);},5000);
  }
  var app = document.getElementById("app");
  if (app && window.MutationObserver) {
    new MutationObserver(mount).observe(app, {childList:true});
  }
  if (window.MutationObserver) {
    new MutationObserver(function(){
      if (panel && panel.isConnected) {
        renderChrome();
        panel.querySelector(".ruin-atlas-index-status").textContent =
          loaded ? "" : sites.length ? COPY[lang()].unavailable : COPY[lang()].loading;
      }
    }).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded",mount,{once:true});
  } else {
    mount();
  }
})();
