"use strict";

const LANGS = ["zh", "en", "ja"];
const AMBIENT_TYPES = ["sea", "cloud", "lake", "sky"];
const AMBIENT_LIBRARY = window.AMBIENT_LIBRARY || { sea: [], cloud: [], lake: [], sky: [] };

const labels = {
  zh: {
    index: "索引",
    about: "关于",
    close: "收起",
    calendar: "日历",
    today: "今天",
    returnToday: "回到今天",
    works: "作品",
    collection: "收藏",
    writings: "文稿",
    back: "返回",
    next: "下一处",
    weekdays: ["一", "二", "三", "四", "五", "六", "日"],
    monthSuffix: "月",
    viewing: "正在回看"
  },
  en: {
    index: "index",
    about: "about",
    close: "close",
    calendar: "calendar",
    today: "today",
    returnToday: "return to today",
    works: "works",
    collection: "collection",
    writings: "writings",
    back: "back",
    next: "next",
    weekdays: ["M", "T", "W", "T", "F", "S", "S"],
    monthSuffix: "",
    viewing: "viewing"
  },
  ja: {
    index: "索引",
    about: "私について",
    close: "閉じる",
    calendar: "暦",
    today: "今日",
    returnToday: "今日へ戻る",
    works: "作品",
    collection: "コレクション",
    writings: "文章",
    back: "戻る",
    next: "次へ",
    weekdays: ["月", "火", "水", "木", "金", "土", "日"],
    monthSuffix: "月",
    viewing: "振り返り"
  }
};

const ambientMeta = {
  sea: {
    day: { zh: "海之日", en: "day of the sea", ja: "海の日" },
    short: { zh: "海", en: "sea", ja: "海" },
    fallback: { zh: "海面记录", en: "sea record", ja: "海面の記録" },
    image: "./img1-blur.jpg"
  },
  cloud: {
    day: { zh: "云之日", en: "day of clouds", ja: "雲の日" },
    short: { zh: "云", en: "cloud", ja: "雲" },
    fallback: { zh: "云层记录", en: "cloud record", ja: "雲の記録" },
    image: "./img3-blur.jpg"
  },
  lake: {
    day: { zh: "湖之日", en: "day of the lake", ja: "湖の日" },
    short: { zh: "湖", en: "lake", ja: "湖" },
    fallback: { zh: "湖面记录", en: "lake record", ja: "湖面の記録" },
    image: "./img5-blur.jpg"
  },
  sky: {
    day: { zh: "天之日", en: "day of the sky", ja: "空の日" },
    short: { zh: "天", en: "sky", ja: "空" },
    fallback: { zh: "高空记录", en: "sky record", ja: "空の記録" },
    image: "./img6-blur.jpg"
  }
};

const calendarIntro = {
  "zh": [
    "一册由天空、海洋、湖泊与云层这些瞬息万变、无法被安排之物占据的日历。每一天的景象便如天气般自行更替，首页背景也随之播放着不同的环境影像。在这个看似没有重点的日历中，目光仿佛短暂地“失焦”，从日常琐事的焦点移开，重新落到那些原本退入生活背景的自然景象上。",
    "这些景象在这里承担着重新校准感官的作用。这里所谓的“纯净”并非空白，而是一枚让观看暂时退回到解释与判断之前的“锚点”。",
    "我的艺术创作理念也是如此：看完世界后，仍可以回到这里。所谓纯粹的心灵，并不是从未见过复杂，而是在洞见复杂之后，仍愿意抬头看一眼天空。"
  ],
  "en": [
    "A calendar occupied by sky, oceans, lakes and clouds—things that change in an instant and cannot be arranged. Each day's scenery changes of its own accord, like the weather, and the homepage plays a different ambient film in the background. In this seemingly aimless calendar, the gaze briefly slips “out of focus”: it moves away from the concerns of everyday life and settles once more on the natural scenes that had receded into its background.",
    "Here, these scenes serve to recalibrate the senses. What I call “purity” is not emptiness, but an “anchor” that allows looking to return, for a moment, to a point before explanation and judgement.",
    "My approach to making art follows much the same thought: after seeing the world, one can still return here. A pure heart is not one that has never encountered complexity, but one that, having looked deeply into it, is still willing to look up at the sky."
  ],
  "ja": [
    "空、海、湖、雲――刻々と姿を変え、人の手では予定できないものに占められた暦。一日の風景は天気のようにおのずと移り変わり、ホームの背景にも、それに応じて異なる環境映像が流れる。これといった中心のない暦のなかで、視線はふと「ピントを外す」ように、日々の雑事へ向けていた焦点を離れ、暮らしの背景へと退いていた自然の風景に、再び落ち着く。",
    "ここでは、こうした風景が感覚を整え直す役割を担っている。ここでいう「純粋」は空白ではなく、見ることを一時的に説明や判断よりも前へと戻す「錨」である。",
    "私の芸術制作に対する考え方も同じだ。世界を見てきたあとにも、ここへ戻ってくることができる。純粋な心とは、複雑さを知らない心ではなく、その複雑さを見通したあとにも、なお空を見上げようとする心のことだ。"
  ]
};

const works = [
  {
    slug: "ruin-garden",
    group: "work",
    title: { zh: "废墟园林", en: "Folly", ja: "フォリー" },
    intro: {
      zh: "废墟不是一件已经结束的东西。材料、风、植物、重力与时间继续工作，我只在其中安排一次短暂的相遇。",
      en: "A ruin is not something already finished. Matter, wind, plants, gravity and time continue the work; I only arrange a brief encounter among them.",
      ja: "廃墟は、すでに終わったものではない。素材、風、植物、重力、時間が仕事を続け、私はそのあいだに短い出会いを置く。"
    },
    closing: {
      zh: "废墟从未在此终结。它的落成，仅仅是让形体定格于某种正在坍塌的姿态，而后续的演变，早已让渡给时间。",
      en: "The ruin has never come to an end here. Its completion merely holds its form in a posture already collapsing; all that follows has long since been ceded to time.",
      ja: "廃墟はここで終わったことなどない。その完成は、崩れつつある姿勢に形をひととき定着させるにすぎず、その後の変容は、とうに時間へと委ねられている。"
    },
    images: [
      { src: "./img1-blur.jpg", caption: { zh: "现场记录 01", en: "site record 01", ja: "現場記録 01" } },
      { src: "./img2-blur.jpg", caption: { zh: "现场记录 02", en: "site record 02", ja: "現場記録 02" } }
    ]
  },
  {
    slug: "the-instrument",
    group: "work",
    title: { zh: "the instrument", en: "the instrument", ja: "the instrument" },
    intro: {
      zh: "《the instrument》是一组介于实验仪器、雕塑与私人宇宙论之间的构成主义装置。我将它们视为“神不再眷顾的实验”：在测量与观测的精密形制中，保留对时间、意识与宇宙边界的艺术性追问。",
      en: "the instrument is a series of Constructivist apparatuses between laboratory equipment, sculpture and private cosmology. These experiments forsaken by the gods keep questions of time, consciousness and the universe alive within the forms of measurement and observation.",
      ja: "《the instrument》は、実験器具、彫刻、私的な宇宙論のあいだに置かれた構成主義的な装置のシリーズである。「神に見放された実験」として、計測と観測の精密な形式のなかに、時間、意識、宇宙の境界をめぐる芸術的な問いを留める。"
    },
    images: [
      { src: "./img3-blur.jpg", caption: { zh: "仪器试作 01", en: "instrument study 01", ja: "器械試作 01" } },
      { src: "./img4-blur.jpg", caption: { zh: "仪器试作 02", en: "instrument study 02", ja: "器械試作 02" } }
    ]
  }
];

const seawaterMemoryText = {
  "zh": [
    "起点是一段悬置在真实与虚构之间的童年记忆：大约十一岁时，我记得在楼梯下的角落看见一个正在漏水的吨桶，并隐约听见一句“55个海洋的海水”。多年后回头查证，我找不到任何相关记录。我不知道这段记忆究竟来自真实经历，还是在漫长的回想中被重新拼接出来。也许当时真的有这样一件作品；也许只是路过的人对一缸水的过度解读。奇怪的是，当它多年后突然重新回到脑海里，我越想确认它，它反而越显得不真实。",
    "一边担心原始记忆会随着时间彻底消失，一边又担心任何试图把它画下来、做出来、命名出来的动作，都会替换掉那段记忆本身。于是，我将这段无法被证实的记忆，用一幅朦胧的画记录了下来。"
  ],
  "en": [
    "It begins with a childhood memory suspended between reality and fiction: when I was about eleven, I remember seeing a leaking tote tank in a corner beneath the stairs, and vaguely hearing someone say “seawater from 55 oceans.” Years later, looking back for evidence, I could find no record of it. I do not know whether this memory comes from an experience that really happened or was pieced together anew over years of recollection. Perhaps such a work did exist; perhaps it was merely a passer-by reading too much into a tank of water. Strangely, when the memory suddenly returned to me years later, the more I tried to confirm it, the less real it seemed.",
    "I feared that the original memory might vanish entirely with time, yet also feared that any attempt to paint it, make it or name it would replace the memory itself. So I recorded this unverifiable memory in a hazy painting."
  ],
  "ja": [
    "始まりは、現実と虚構のあいだに宙づりになった幼い頃の記憶である。十一歳くらいのとき、階段下の隅で水の漏れているトートタンク（大型液体コンテナ）を見かけ、「55の海の海水」という言葉をぼんやり耳にした覚えがある。何年もたってから確かめようと調べても、関連する記録は何も見つからなかった。この記憶が実際の体験に由来するのか、それとも長い歳月の回想のなかでつなぎ直されたものなのか、私には分からない。実際にそういう作品があったのかもしれないし、通りすがりの誰かが一槽の水を深読みしただけなのかもしれない。奇妙なのは、何年も後になって突然その記憶がよみがえったとき、確かめようとするほどかえって現実味を失っていったことだ。",
    "もとの記憶が時間とともにすっかり消えてしまうことを恐れる一方で、それを描き、形にし、名づけようとする行為が、その記憶そのものを置き換えてしまうことも恐れていた。そこで私は、この確かめようのない記憶を、朦朧とした一枚の絵に記録した。"
  ]
};

const collections = [
  {
    slug: "ruin-atlas",
    group: "collection",
    title: { zh: "墟域图·遗构馆", en: "Ruin Archive", ja: "墟域図・遺構館" },
    intro: {
      zh: "一张由城市、废墟与断裂共同构成的文明地表。",
      en: "A surface of civilisation composed of cities, ruins and fractures.",
      ja: "都市、廃墟、断裂によって構成された文明の地表。"
    },
    visit: "https://ruin-archive.site/",
    visitLabel: {
      zh: "进入完整地图",
      en: "enter the full atlas",
      ja: "地図全体を見る"
    },
    images: [],
    notes: [
      {
        titleHtml: {
          zh: "<strong>墟域图·</strong>——文明墨迹图",
          en: "<strong>Ruin Atlas ·</strong>—Civilisation Ink Map",
          ja: "<strong>墟域図·</strong>——文明の墨跡図"
        },
        bodyHtml: {
          zh: [
            "地图上的黑点来自真实世界中的都市区域。我参考了 <a href='https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-urban-area/' target='_blank' rel='noreferrer'>Natural Earth 的 Urban Areas 数据</a>，将原本精确的城市轮廓大幅简化，再根据它们各自的面积估算成大小不同的点状物，最终以近似“墨斑”的样貌，沾染在一张经过修改的地形地图之上。地图的底图同样来自 <a href='https://www.naturalearthdata.com/downloads/50m-raster-data/50m-gray-earth/' target='_blank' rel='noreferrer'>Natural Earth 的 Gray Earth 数据</a>。",
            "遗构录中的废墟记录也以“点”的形式出现。它们坐落在城市的角落、边缘和缝隙里，或干脆再次被城市吞没。现代废墟往往正是这样的存在——仍然是文明的产物，却又尚未真正回到纯粹的自然之中。",
            "随着漫游和记录继续发生，这些遗构的标记也会越来越多。它们不断落入城市留下的墨迹之间，这张图谱也因此逐渐扩张，成为一张仍在生长的墟域图。"
          ],
          en: [
            "The black points on the map come from urban areas in the real world. I referred to <a href='https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-urban-area/' target='_blank' rel='noreferrer'>Natural Earth’s Urban Areas data</a>, greatly simplifying the precise outlines of cities and estimating them as point-like forms of different sizes according to their area. They finally stain a modified terrain map like ink blots. The underlying map is likewise derived from <a href='https://www.naturalearthdata.com/downloads/50m-raster-data/50m-gray-earth/' target='_blank' rel='noreferrer'>Natural Earth’s Gray Earth data</a>.",
            "The ruin records in the archive appear as points as well. They sit in the corners, edges and gaps of cities, or are simply swallowed by the city once again. Modern ruins often exist in precisely this condition—still products of civilisation, yet not fully returned to a purely natural state.",
            "As wandering and recording continue, the number of these marks keeps growing. They settle among the traces left by cities, and the atlas expands with them, becoming a Ruin Atlas that is still in the process of growing."
          ],
          ja: [
            "地図上の黒い点は、現実世界の都市域から来ている。<a href='https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-urban-area/' target='_blank' rel='noreferrer'>Natural Earth の Urban Areas データ</a>を参照し、もともと精密だった都市の輪郭を大きく簡略化したうえで、それぞれの面積から大きさの異なる点状のかたちへ置き換えた。最終的にそれらは「墨の染み」に近い姿で、加工した地形図の上へ付着している。下地となる地図も同じく <a href='https://www.naturalearthdata.com/downloads/50m-raster-data/50m-gray-earth/' target='_blank' rel='noreferrer'>Natural Earth の Gray Earth データ</a>をもとにしている。",
            "遺構録に収めた廃墟の記録もまた、「点」として現れる。それらは都市の隅、縁、隙間に位置し、ときには再び都市そのものに呑み込まれていく。現代の廃墟とはしばしばそのような存在である——なお文明の産物でありながら、まだ純粋な自然へ完全には戻っていない。",
            "漫遊と記録が続くにつれて、遺構の印も少しずつ増えていく。それらは都市が残した墨跡のあいだへ落ち、この図譜もまた広がり続け、いまなお成長の途中にある一枚の墟域図となっていく。"
          ]
        }
      },
      {
        titleHtml: {
          zh: "<strong>·遗构馆</strong>——残破画框",
          en: "<strong>· Archive</strong>—The Broken Frame",
          ja: "<strong>·遺構館</strong>——壊れた額縁"
        },
        bodyHtml: {
          zh: [
            "整个网站的界面被处理得像一副残破的画框。这个设计借用了<a href='https://ruin-archive.site/manifesto.html#section-02' target='_blank' rel='noreferrer'>《墟构师宣言》中关于“残破画框”的理解</a>：透过那些断裂的边缘，我们不再只把注意力放在框中的景象上，框架自身留下的碎片，也开始成为可以被读取的残片。我把废墟地点的记录放进这些断裂的角落；随着记录逐渐积累，残片不断堆叠，这个集合也慢慢成为了“遗构馆”。",
            "框中的景象与框架的残片彼此对照，一边仍指向我们正在观看的世界，一边暴露出原本支撑这种观看的结构。两者重新拼接在一起，也逐渐形成另一种理解世界的方法。"
          ],
          en: [
            "The whole site interface is treated like a damaged picture frame. The design draws on <a href='https://ruin-archive.site/manifesto.html#section-02' target='_blank' rel='noreferrer'>the idea of the “broken frame” in the Manifesto of the Ruinwright</a>: through those fractured edges, attention no longer rests only on the scene within the frame; the fragments left by the frame itself also begin to become remnants that can be read. I place records of ruined sites into these broken corners; as the records accumulate, the fragments gather into a layered collection that gradually becomes the “Archive”.",
            "The scene inside the frame and the fragments of the frame are set against one another. One still points toward the world being seen; the other exposes the structure that had supported that act of seeing. Rejoined, the two gradually form another way of understanding the world."
          ],
          ja: [
            "サイト全体の界面は、一枚の壊れた額縁のように扱われている。このデザインは、<a href='https://ruin-archive.site/manifesto.html#section-02' target='_blank' rel='noreferrer'>『墟構師宣言』における「破碎画框」の理解</a>を借りている。断裂した縁を通して、私たちは額の内側の景色だけに目を向けるのではなく、枠そのものが残した断片も、読み取ることのできる残片として見始める。私はその断裂した角へ廃墟地点の記録を置いていく。記録が少しずつ積み重なるにつれ、残片の集積はやがてひとつの「遺構館」になっていく。",
            "額の内側の景色と、枠から残された断片は互いに照らし合う。一方はなお私たちが見ている世界を指し、もう一方はその見方を支えていた構造を露わにする。二つを再びつなぎ合わせることで、そこから別の世界理解の方法が少しずつ組み上がっていく。"
          ]
        }
      }
    ]
  },
  {
    slug: "room-by-the-lake",
    group: "collection",
    title: { zh: "room by the lake", en: "room by the lake", ja: "room by the lake" },
    intro: {
      zh: "布面油画 · 60 × 91 cm · 密西根湖",
      en: "Oil on canvas · 60 × 91 cm · Lake Michigan",
      ja: "キャンバスに油彩 · 60 × 91 cm · ミシガン湖"
    },
    images: [
      {
        src: "./collections/room-by-the-lake/room-by-the-lake-detail.webp",
        caption: {
          zh: "room by the lake, 2020 · 布面油画 · 60 × 91 cm · 密西根湖",
          en: "room by the lake, 2020 · oil on canvas · 60 × 91 cm · Lake Michigan",
          ja: "room by the lake, 2020 · キャンバスに油彩 · 60 × 91 cm · ミシガン湖"
        }
      },
      {
        src: "./collections/room-by-the-lake/room-by-the-lake-installation.webp",
        caption: { zh: "展览现场", en: "installation view", ja: "展示風景" }
      }
    ]
  },
  {
    slug: "seawater",
    group: "collection",
    title: { zh: "collection of (all) oceans and seas", en: "collection of (all) oceans and seas", ja: "collection of (all) oceans and seas" },
    intro: seawaterMemoryText,
    images: []
  },
  {
    slug: "fragrance-hall",
    group: "collection",
    title: {"zh":"芬芳厅的角落","en":"Corners of the Hall of Fragrance","ja":"芬芳の間の片隅"},
    intro: {"zh":"《芬芳厅的角落》收集日常环境中那些悄悄脱离控制的美学角落：怪诞的雕塑、失去语境的设施，以及被习惯性忽略、却偶尔让人感到诡异的生活场景与物品。这样的景象，有时会被调侃为“儿童邪典”。","en":"Corners of the Hall of Fragrance gathers the aesthetic corners of everyday life that have quietly slipped beyond control: grotesque sculptures, facilities severed from their context, and familiar scenes and objects that we habitually overlook, yet sometimes find unsettling. Such sights are sometimes jokingly called “children’s cult horror.”","ja":"『芬芳の間の片隅』は、日常のなかでいつのまにか制御を離れた、美的な片隅を集めたものだ。奇妙な彫刻、文脈を失った設備、見慣れているがゆえに普段は見過ごされ、ときおり不気味に感じられる生活の風景や物たち。俗に「子ども向けカルトホラー」などと冗談めかして呼ばれることもある。"},
    images: [],
    // Only the original quotation remains from the earlier notes.
    notes: [{ quote: {

          zh: "“塞维利亚·摩尔人国王宫殿——这是一座按照幻想的原始冲动建成的建筑物，没有任何实用方面的考虑能阻止这一幻想。那高高在上的房间只是为梦想和庆典建造的，房间里成为主题的除了跳舞就是沉寂，因为一切人的活动都被房间纹饰里那没有声息的嘈杂吸收了。”",
          en: "“The Palace of the Moorish Kings in Seville — a building erected according to a primitive impulse of fantasy, where no practical consideration could restrain imagination. Its elevated rooms were made only for dreams and festivities; nothing takes place there but dancing or silence, for all human activity is absorbed by the noiseless clamour of the ornament.”",
          ja: "「セビリアのムーア人王宮――幻想の原始的な衝動に従って建てられ、実用上の考慮がその幻想を妨げることのない建築。高みにある部屋は夢と祝祭のためだけにつくられ、そこにある主題は踊りか沈黙しかない。人間のあらゆる活動は、室内装飾の無音の喧騒に吸収されてしまう。」"
        } }]
  }
];

const writings = [
  {
    slug: "ruinwright-manifesto",
    group: "writing",
    title: { zh: "墟构师宣言", en: "Manifesto of the Ruinwright", ja: "墟構師宣言" },
    intro: {
      zh: [
        "《墟构师宣言》是我对废墟长期观察、研究与实践的一次整理。它记录了我理解废墟的方式，也建立起一套与之相应的理论框架，讨论我如何观看废墟、如何理解这个时代不断出现的现代废墟，以及这些认识如何进一步进入审美与创作。",
        "随着研究逐渐进入实践，“墟构师”也从一种称谓变成了我在废墟中工作的角色。我以这一身份进入废墟进行创作，并将“墟构”发展为属于自身实践的方法，用于《废墟园林》系列作品的建造。",
        "最终，我将对废墟的理解、由此形成的理论，以及在实践中逐渐建立的墟构方法整理在一起，构成《墟构师宣言》。它既是一份个人陈述，也是一套仍在持续修订的工作体系，并作为我面对这个时代“现代废墟”的一部个人法典。"
      ],
      en: [
        "Manifesto of the Ruinwright is a consolidation of my long-term observation, study, and practice around ruins. It records the way I understand ruins and gathers the theoretical framework that has grown alongside that understanding, including my reflections on ways of seeing ruins, modern ruins, and their aesthetic relations.",
        "As research gradually entered practice, “Ruinwright” also shifted from a name into the role through which I work inside ruins. In that role I enter ruins to make work, and have developed “Ruinwork” as a method belonging to my own practice, used in the construction of the Folly Series and related works.",
        "I eventually brought these understandings of ruins, the theories that emerged from them, and the methods of Ruinwork developed through practice together as the Manifesto of the Ruinwright. It is both a personal statement and a working system that remains open to revision: a personal code for confronting the “modern ruins” of this era."
      ],
      ja: [
        "『墟構師宣言』は、廃墟について長期にわたり行ってきた観察・研究・実践を整理したものである。そこには、私が廃墟をどのように理解してきたか、その理解とともに形づくられた理論的な枠組み、そして廃墟をどのように見るか、この時代に絶えず現れる現代の廃墟をどう理解するか、それらの認識が美学と制作へどう入っていくかが記されている。",
        "研究が次第に実践へ入っていくにつれ、「墟構師」は一つの呼称から、私が廃墟の中で仕事をするための役割へと変わった。私はこの立場で廃墟へ入り制作を行い、「墟構」を自らの実践に属する方法として育て、『フォリー』シリーズの制作に用いている。",
        "最終的に、廃墟についての理解、そこから生まれた理論、そして実践の中で築いてきた墟構の方法を一つに編み直し、『墟構師宣言』とした。それは個人的なステートメントであると同時に、なお更新され続ける作業体系であり、この時代の「現代の廃墟」に向き合うための私自身の法典でもある。"
      ]
    },
    visit: "https://ruin-archive.site/manifesto.html",
    visitLabel: {
      zh: "阅读《墟构师宣言》",
      en: "read the Manifesto of the Ruinwright",
      ja: "『墟構師宣言』を読む"
    },
    tenetImages: [
      "https://ruin-archive.site/manifesto-assets/tenets/chapters/01.png",
      "https://ruin-archive.site/manifesto-assets/tenets/chapters/02.png",
      "https://ruin-archive.site/manifesto-assets/tenets/chapters/03.png",
      "https://ruin-archive.site/manifesto-assets/tenets/chapters/04.png",
      "https://ruin-archive.site/manifesto-assets/tenets/chapters/05.png",
      "https://ruin-archive.site/manifesto-assets/tenets/chapters/06.png",
      "https://ruin-archive.site/manifesto-assets/tenets/chapters/07.png",
      "https://ruin-archive.site/manifesto-assets/tenets/chapters/08.png",
      "https://ruin-archive.site/manifesto-assets/tenets/chapters/09.png",
      "https://ruin-archive.site/manifesto-assets/tenets/chapters/10.png"
    ],
    images: []
  }
];

const rooms = works.concat(collections, writings);

/* A trailing "-" denotes an ongoing series; dates belong in the index only. */
const indexYears = {
  "ruin-garden": "2025-",
  "the-instrument": "2023-",
  "ruin-atlas": "2026-",
  "seawater": "2019-",
  "room-by-the-lake": "2020",
  "fragrance-hall": "2024-2025",
  "ruinwright-manifesto": "2025-"
};

/* Independent biography. Set image to a file path when a photo is ready. */
const aboutProfile = {
  slug: "about",
  group: "about",
  title: { zh: "关于", en: "about", ja: "私について" },
  name: { zh: "罗清源", en: "Luo Qingyuan", ja: "羅清源" },
  practice: { zh: "艺术创作者", en: "artist", ja: "美術作家" },
  paragraphs: {
    zh: [
      "我的创作游走于雕塑、装置、影像、绘画，以及持续展开的记录与收集之间。",
      "我常从一处现场、一件失去用途的器物，或一段无法确认的记忆开始工作。废墟、风化、仪器与时间反复进入这些实践；材料在其中暂时获得形体，而后续的变化，仍继续发生。"
    ],
    en: [
      "My practice moves between sculpture, installation, moving image, painting, and ongoing acts of recording and collecting.",
      "I often begin with a place, an object left without a use, or a memory that cannot be verified. Ruins, weathering, instruments and time recur throughout this work; materials briefly take form, while what follows remains open to change."
    ],
    ja: [
      "彫刻、インスタレーション、映像、絵画、そして継続的な記録と採集のあいだを行き来しながら制作している。",
      "制作は、一つの現場、用途を失ったもの、確かめることのできない記憶から始まることが多い。廃墟、風化、器具、時間が繰り返し現れ、素材はひととき形を得る。その後の変化もまた、続いていく。"
    ]
  },
  image: ""
};

const state = {
  lang: readLanguage(),
  indexOpen: false,
  calendarOpen: false,
  previewDate: null,
  calendarCursor: todayAtNoon()
};

const app = document.querySelector("#app");

// First-visit language: explicit link > deliberate saved selection >
// the visitor's browser/device preferences > English fallback.
// Automatic detection is never saved over a deliberate preference.
function supportedLanguage(locale) {
  var code = String(locale || "").trim().toLowerCase().replace(/_/g, "-");
  if (code === "zh" || code.indexOf("zh-") === 0 ||
      code === "cmn" || code.indexOf("cmn-") === 0) return "zh";
  if (code === "ja" || code.indexOf("ja-") === 0 || code === "jp") return "ja";
  if (code === "en" || code.indexOf("en-") === 0) return "en";
  return null;
}

function readLanguage() {
  try {
    var forced = supportedLanguage(new URLSearchParams(location.search).get("lang"));
    if (forced) return forced;
  } catch (_) {}

  try {
    var saved = supportedLanguage(localStorage.getItem("sky-sea-lake-cloud-language"));
    if (saved) return saved;
  } catch (_) {}

  try {
    var preferred = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages : [navigator.language || navigator.userLanguage];
    for (var i = 0; i < preferred.length; i++) {
      var detected = supportedLanguage(preferred[i]);
      if (detected) return detected;
    }
  } catch (_) {}

  // The site has authored zh-Hans, en and ja; no other translation is implied.
  return "en";
}

function saveLanguage(lang) {
  try { localStorage.setItem("sky-sea-lake-cloud-language", lang); } catch (_) {}
}

function clearLinkLanguageOverride() {
  // When a visitor selects another language, prevent ?lang= on a shared link
  // from undoing that choice on refresh; preserve other params and the hash.
  try {
    var params = new URLSearchParams(location.search);
    if (!params.has("lang")) return;
    params.delete("lang");
    var remaining = params.toString();
    history.replaceState(history.state, "", location.pathname +
      (remaining ? "?" + remaining : "") + location.hash);
  } catch (_) {}
}

function localised(value) {
  return value && value[state.lang] ? value[state.lang] : "";
}

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function(character) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[character];
  });
}

function pad(number) {
  return String(number).padStart(2, "0");
}

function dateKey(date) {
  return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
}

function parseDateKey(key) {
  var parts = key.split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0, 0);
}

function todayAtNoon() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0);
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 12, 0, 0, 0);
}

function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1, 12, 0, 0, 0);
}

const CALENDAR_START = new Date(2023, 6, 23, 12, 0, 0, 0);
const CALENDAR_START_MONTH = startOfMonth(CALENDAR_START);

function dateIsBeforeCalendarStart(date) {
  return date.getTime() < CALENDAR_START.getTime();
}

function dateIsAfterToday(date) {
  return date.getTime() > todayAtNoon().getTime();
}

function calendarCursorIsAtStart() {
  return state.calendarCursor.getTime() <= CALENDAR_START.getTime();
}

function calendarCursorIsAtToday() {
  return state.calendarCursor.getTime() >= todayAtNoon().getTime();
}

// Noon-based local dates avoid DST and timezone drift in the eight-day window.
function shiftCalendarDate(date, numberOfDays) {
  return new Date(date.getFullYear(), date.getMonth(),
    date.getDate() + numberOfDays, 12, 0, 0, 0);
}

function hashString(value) {
  var hash = 2166136261;
  for (var i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

var ambientYearCache = {};

function ambientSeededRandom(seed) {
  var value = seed >>> 0;
  return function() {
    value = (value + 0x6D2B79F5) | 0;
    var t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ambientWeightedChoice(types, weights, random) {
  var total = weights.reduce(function(sum, weight) { return sum + weight; }, 0);
  if (total <= 0) return types[0];

  var cursor = random() * total;
  for (var i = 0; i < types.length; i += 1) {
    cursor -= weights[i];
    if (cursor <= 0) return types[i];
  }
  return types[types.length - 1];
}

function ambientRunLength(random) {
  var roll = random();
  if (roll < 0.46) return 1;
  if (roll < 0.75) return 2;
  if (roll < 0.90) return 3;
  if (roll < 0.97) return 4;
  return 5;
}

function ambientLibraryCount(type) {
  return Array.isArray(AMBIENT_LIBRARY[type]) ? AMBIENT_LIBRARY[type].length : 0;
}

function ambientLibrarySignature() {
  return AMBIENT_TYPES.map(function(type) {
    return type + ":" + ambientLibraryCount(type);
  }).join("|");
}

function ambientShuffleIndices(length, random, avoidFirst) {
  var values = [];
  for (var i = 0; i < length; i += 1) values.push(i);

  for (var j = values.length - 1; j > 0; j -= 1) {
    var swapIndex = Math.floor(random() * (j + 1));
    var tmp = values[j];
    values[j] = values[swapIndex];
    values[swapIndex] = tmp;
  }

  /* When a bag is refilled, do not let its first clip equal the clip that
     ended the previous bag. This means a category cycles through all of its
     available material before repeating, with no immediate duplicate at the
     cycle boundary. */
  if (values.length > 1 && Number.isInteger(avoidFirst) && values[0] === avoidFirst) {
    var replacementIndex = 1 + Math.floor(random() * (values.length - 1));
    var held = values[0];
    values[0] = values[replacementIndex];
    values[replacementIndex] = held;
  }

  return values;
}

function ambientNextEntryIndex(type, bags, lastEntry, random) {
  var count = ambientLibraryCount(type);
  if (!count) return -1;

  if (!Array.isArray(bags[type]) || bags[type].length === 0) {
    bags[type] = ambientShuffleIndices(count, random, lastEntry[type]);
  }

  var next = bags[type].shift();
  lastEntry[type] = next;
  return next;
}

function ambientBuildYearSchedule(year) {
  var signature = ambientLibrarySignature();
  var cacheKey = String(year) + "|" + signature + ":balanced-five-day-v1";
  if (ambientYearCache[cacheKey]) return ambientYearCache[cacheKey];

  /*
    Deterministic, loosely randomized five-day bags. Every complete bag
    contains sea / cloud / lake / sky once, plus one balanced extra day.
    The sequence is continuous across month and year boundaries, so every
    sliding ten-day window includes all four landscapes, even at New Year.
    Different video clips still come from the existing no-repeat clip bags.
  */
  var random = ambientSeededRandom(hashString(signature + ":balanced-five-day-v1"));
  var available = AMBIENT_TYPES.filter(function(type) {
    return ambientLibraryCount(type) > 0;
  });
  var count = {};
  available.forEach(function(type) { count[type] = 0; });

  var assignments = {}, clipBags = {}, lastClip = {};
  var previousType = null;
  var firstYear = Math.min(2023, year);
  var day = new Date(firstYear, 0, 1, 12);
  var lastDay = new Date(year, 11, 31, 12);

  function randomizedBag(items, priorType) {
    var bag = items.slice();
    for (var i = bag.length - 1; i > 0; i -= 1) {
      var j = Math.floor(random() * (i + 1));
      var swap = bag[i]; bag[i] = bag[j]; bag[j] = swap;
    }

    // Backtracking finds a valid shuffle if a category has only one clip.
    // Such a category may reappear, but never on adjacent days.
    function arrange(remaining, arranged, last) {
      if (!remaining.length) return arranged;
      for (var k = 0; k < remaining.length; k += 1) {
        var type = remaining[k];
        if (type === last && ambientLibraryCount(type) <= 1) continue;
        var result = arrange(remaining.slice(0,k).concat(remaining.slice(k+1)),
          arranged.concat(type), type);
        if (result) return result;
      }
      return null;
    }
    return arrange(bag, [], priorType) || bag;
  }

  while (day.getTime() <= lastDay.getTime()) {
    if (!available.length) break;

    var block = available.slice();
    while (block.length < 5) {
      // Each type has nearly equal exposure regardless of the number of videos.
      // Library size affects clip variety, not the odds of a day type.
      var least = Math.min.apply(null, available.map(function(type) { return count[type]; }));
      var candidates = available.filter(function(type) { return count[type] === least; });
      block.push(candidates[Math.floor(random() * candidates.length)]);
      count[block[block.length - 1]] += 1;
    }
    // A category is always present at least once in every five-day bag.
    var order = randomizedBag(block, previousType);

    for (var offset = 0; offset < order.length && day.getTime() <= lastDay.getTime(); offset++) {
      var type = order[offset];
      assignments[dateKey(day)] = {
        type: type,
        entryIndex: ambientNextEntryIndex(type, clipBags, lastClip, random)
      };
      previousType = type;
      day.setDate(day.getDate() + 1);
    }
  }

  var output = {};
  for (var dateString in assignments) {
    if (Number(dateString.slice(0, 4)) === year) output[dateString] = assignments[dateString];
  }
  ambientYearCache[cacheKey] = output;
  return output;
}

function ambientAssignmentForDate(date) {
  var schedule = ambientBuildYearSchedule(date.getFullYear());
  var assignment = schedule[dateKey(date)];
  if (assignment) return assignment;

  var fallbackType = AMBIENT_TYPES.find(function(type) {
    return ambientLibraryCount(type) > 0;
  }) || AMBIENT_TYPES[0];

  return { type: fallbackType, entryIndex: 0 };
}

function ambientTypeForDate(date) {
  return ambientAssignmentForDate(date).type;
}

function ambientEntryForDate(date, type) {
  var assignment = ambientAssignmentForDate(date);
  var resolvedType = assignment.type;
  var pool = Array.isArray(AMBIENT_LIBRARY[resolvedType]) ? AMBIENT_LIBRARY[resolvedType] : [];
  if (!pool.length) return null;

  var index = assignment.entryIndex;
  if (!Number.isInteger(index) || index < 0 || index >= pool.length) index = 0;

  /* type is retained in the function signature for existing callers; the
     assignment itself is authoritative so the media always matches the day. */
  return pool[index];
}

function selectedDate() {
  return state.previewDate ? parseDateKey(state.previewDate) : todayAtNoon();
}

function ambientTitle(entry, type) {
  if (entry && entry.title) {
    if (typeof entry.title === "string") return entry.title;
    if (entry.title[state.lang]) return entry.title[state.lang];
  }
  return localised(ambientMeta[type].fallback);
}

function ambientPlace(entry) {
  if (!entry || !entry.place) return "";
  if (typeof entry.place === "string") return entry.place;
  return entry.place[state.lang] || "";
}

function formatDate(date) {
  // One concise calendar notation in every interface language: YY-MM-DD.
  return pad(date.getFullYear() % 100) + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
}

function formatMonth(date) {
  // Month navigator follows the same numerical convention: YY-MM.
  return pad(date.getFullYear() % 100) + "-" + pad(date.getMonth() + 1);
}

function languageSwitch() {
  var html = '<nav class="language" aria-label="language">';
  LANGS.forEach(function(lang) {
    var title = lang === "ja" ? "JP" : lang.toUpperCase();
    html += '<button type="button" data-action="language" data-lang="' + lang + '" class="' +
      (state.lang === lang ? "is-active" : "") + '">' + title + "</button>";
  });
  html += "</nav>";
  return html;
}

function ambientMedia(date, type, entry) {
  if (entry && entry.src) {
    var poster = entry.poster ? ' poster="' + escapeHtml(entry.poster) + '"' : "";
    return '<video class="ambient-video" autoplay muted playsinline loop preload="metadata"' + poster +
      ' src="' + escapeHtml(entry.src) + '"></video>';
  }
  return '<div class="ambient-empty ambient-empty-' + type + '" aria-hidden="true"></div>';
}

function calendarGrid() {
  var anchor = state.calendarCursor;
  var today = todayAtNoon();
  var todayKey = dateKey(today);
  var selectedKey = dateKey(selectedDate());
  var cells = [];

  // Seven recorded days ending on the cursor date, then one following day.
  // At the latest window that last day is tomorrow: deliberately unassigned.
  for (var offset = -6; offset <= 1; offset += 1) {
    var date = shiftCalendarDate(anchor, offset);
    var key = dateKey(date);
    var weekday = labels[state.lang].weekdays[(date.getDay() + 6) % 7];
    var unavailable = dateIsBeforeCalendarStart(date) || dateIsAfterToday(date);
    var head = '<span class="calendar-window-weekday">' +
      escapeHtml(weekday) + '</span>' +
      '<span class="calendar-number">' + escapeHtml(formatDate(date)) + '</span>';

    if (unavailable) {
      // The eighth day has a date, but no forecast, type, or "unknown" label.
      cells.push('<span class="calendar-day is-unassigned" aria-label="' +
        escapeHtml(formatDate(date)) + '">' + head + '</span>');
      continue;
    }

    var type = ambientTypeForDate(date);
    var classes = "calendar-day calendar-day-" + type;
    if (key === todayKey) classes += " is-today";
    if (key === selectedKey) classes += " is-selected";
    cells.push('<button type="button" class="' + classes +
      '" data-action="choose-date" data-date="' + key + '" aria-label="' +
      escapeHtml(formatDate(date) + " · " + localised(ambientMeta[type].day)) + '">' +
      head +
      '<span class="calendar-day-type">' + escapeHtml(localised(ambientMeta[type].short)) + '</span>' +
      '</button>');
  }
  return cells.join("");
}

function calendarPanel() {
  var current = selectedDate();
  var currentType = ambientTypeForDate(current);
  var selectedKey = dateKey(current);
  var todayKey = dateKey(todayAtNoon());
  var anchor = state.calendarCursor;
  var rangeStart = shiftCalendarDate(anchor, -6);
  var rangeEnd = shiftCalendarDate(anchor, 1);
  var earlierLabel = state.lang === "zh" ? "前七天" : (state.lang === "ja" ? "前の七日間" : "previous seven days");
  var laterLabel = state.lang === "zh" ? "后七天" : (state.lang === "ja" ? "次の七日間" : "next seven days");

  return '<section class="calendar-layer" ' + (state.calendarOpen ? "" : "hidden") +
    ' aria-label="' + escapeHtml(labels[state.lang].calendar) + '">' +
    '<button class="calendar-backdrop" type="button" data-action="close-calendar" aria-label="close"></button>' +
    '<div class="calendar-panel calendar-panel-rolling">' +
      '<div class="calendar-intro">' +
        calendarIntro[state.lang].map(function(paragraph) {
          return "<p>" + escapeHtml(paragraph) + "</p>";
        }).join("") +
      "</div>" +
      '<header class="calendar-head">' +
        '<div class="calendar-current-wrap">' +
          '<p class="calendar-kicker">' + escapeHtml(labels[state.lang].calendar) + '</p>' +
          '<p class="calendar-current">' + escapeHtml(formatDate(current)) + ' · ' +
            escapeHtml(localised(ambientMeta[currentType].day)) + "</p>" +
        "</div>" +
        '<div class="calendar-controls">' +
          '<button type="button" data-action="calendar-window-prev" aria-label="' + escapeHtml(earlierLabel) + '"' +
            (calendarCursorIsAtStart() ? " disabled" : "") + '>←︎</button>' +
          '<span>' + escapeHtml(formatDate(rangeStart)) + ' — ' + escapeHtml(formatDate(rangeEnd)) + '</span>' +
          '<button type="button" data-action="calendar-window-next" aria-label="' + escapeHtml(laterLabel) + '"' +
            (calendarCursorIsAtToday() ? " disabled" : "") + '>→︎</button>' +
        "</div>" +
      "</header>" +
      '<div class="calendar-grid calendar-rolling-grid" role="group" aria-label="' +
        escapeHtml(formatDate(rangeStart) + " — " + formatDate(rangeEnd)) + '">' + calendarGrid() + "</div>" +
      (selectedKey !== todayKey
        ? '<button class="calendar-today" type="button" data-action="today">' +
            escapeHtml(labels[state.lang].returnToday) + "</button>"
        : "") +
    "</div>" +
  "</section>";
}

function indexItemLabel(item) {
  var year = indexYears[item.slug];
  return escapeHtml(localised(item.title)) +
    (year ? ' <span class="index-year">' + escapeHtml(year) + '</span>' : "");
}

function indexPanel() {
  var html = '<aside class="index-layer" ' + (state.indexOpen ? "" : "hidden") + ' aria-label="' + escapeHtml(labels[state.lang].index) + '">' +
    '<button class="index-backdrop" type="button" data-action="close-index" aria-label="close"></button>' +
    '<div class="index-panel">' +
      '<section class="index-group"><p class="index-heading">' + labels[state.lang].works + "</p>";

  works.forEach(function(item) {
    if (item.slug === "fictional-topography") {
      var unavailable = {
        zh: "暂时不可用", en: "Temporarily unavailable", ja: "現在利用できません"
      }[state.lang];
      html += '<span class="index-link index-link-unavailable" tabindex="0" ' +
        'aria-label="' + escapeHtml(localised(item.title) + " · " + unavailable) + '">' +
        '<span class="index-unavailable-title">' + escapeHtml(localised(item.title)) + '</span>' +
        '<span class="index-unavailable-note" aria-hidden="true">' + escapeHtml(unavailable) + '</span>' +
      '</span>';
      return;
    }
    html += '<button type="button" class="index-link" data-action="route" data-route="' + item.slug + '">' +
      indexItemLabel(item) + "</button>";
  });

  html += '</section><section class="index-group"><p class="index-heading">' + labels[state.lang].collection + "</p>";

  collections.forEach(function(item) {
    html += '<button type="button" class="index-link" data-action="route" data-route="' + item.slug + '">' +
      indexItemLabel(item) + "</button>";
  });

  html += '</section><section class="index-group"><p class="index-heading">' + labels[state.lang].writings + "</p>";
  writings.forEach(function(item) {
    html += '<button type="button" class="index-link" data-action="route" data-route="' + item.slug + '">' +
      indexItemLabel(item) + "</button>";
  });

  html += '</section><section class="index-group index-about-group">' +
    '<button type="button" class="index-link index-about-link" data-action="route" data-route="about">' +
    escapeHtml(labels[state.lang].about) + "</button>" +
    "</section></div></aside>";
  return html;
}

function homeHeader(date, type, entry) {
  return '<header class="home-head">' +
    '<button class="calendar-toggle" type="button" data-action="toggle-calendar">' +
      '<span>' + escapeHtml(labels[state.lang].calendar) + '</span>' +
    "</button>" +
    languageSwitch() +
  "</header>";
}

function renderHome() {
  var date = selectedDate();
  var type = ambientTypeForDate(date);
  var entry = ambientEntryForDate(date, type);

  return '<section class="home-view">' +
    '<div class="ambient-field" aria-hidden="true">' +
      ambientMedia(date, type, entry) +
      '<span class="ambient-veil"></span>' +
      '<span class="ambient-grain"></span>' +
    "</div>" +
    homeHeader(date, type, entry) +
    '<div class="home-day-calligraphy' + (state.lang === "en" ? " is-latin" : "") +
      '" aria-label="' + escapeHtml(localised(ambientMeta[type].day)) + '">' +
      '<span class="home-day-calligraphy-title">' +
        escapeHtml(localised(ambientMeta[type].day)) +
      '</span>' +
      '<span class="home-day-calligraphy-date">' + escapeHtml(formatDate(date)) + '</span>' +
    '</div>' +
    '<button class="index-toggle" type="button" data-action="toggle-index">' + escapeHtml(labels[state.lang].index) + '</button>' +
    (state.previewDate
      ? '<button class="home-today" type="button" data-action="today">' + escapeHtml(labels[state.lang].returnToday) + "</button>"
      : "") +
    calendarPanel() +
    indexPanel() +
  "</section>";
}

function parseRoute() {
  var slug = location.hash.replace(/^#\/?/, "").split("/")[0];
  if (!slug || slug === "fictional-topography") return null;
  if (slug === "about") return aboutProfile;
  return rooms.find(function(item) { return item.slug === slug; }) || null;
}

function roomIndex(item) {
  return rooms.findIndex(function(candidate) { return candidate.slug === item.slug; });
}

function renderRoomIntro(item) {
  var intro = localised(item.intro);
  if (!Array.isArray(intro)) {
    return '<p class="room-intro">' + escapeHtml(intro || "") + '</p>';
  }

  return '<div class="room-intro-stack">' + intro.map(function(paragraph, index) {
    var safe = escapeHtml(paragraph || "");
    if (item.group === "writing" && index === 0) {
      var title = escapeHtml(localised(item.title));
      if (safe.indexOf(title) === 0) {
        safe = '<strong class="writing-intro-name">' + title + '</strong>' + safe.slice(title.length);
      }
    }
    return '<p class="room-intro">' + safe + '</p>';
  }).join("") + '</div>';
}


function renderRuinAtlasPreview() {
  var updatedCopy = {
    zh: "地点更新于 [2026 10 3]",
    en: "sites updated [2026 10 3]",
    ja: "地点更新 [2026 10 3]"
  };
  var sourceCopy = {
    zh: { before: "地图取自 ", label: "《墟域图·遗构馆》", after: " 网站。" },
    en: { before: "Map from ", label: "Ruin Archive", after: "." },
    ja: { before: "地図は ", label: "『墟域図・遺構館』", after: " より。" }
  };
  var ariaCopy = {
    zh: "墟域图·遗构馆 互动地图",
    en: "Ruin Archive interactive map",
    ja: "墟域図・遺構館 インタラクティブ地図"
  };
  var source = sourceCopy[state.lang] || sourceCopy.en;

  return '<section class="ruin-mini-section">' +
    '<div class="ruin-mini-shell" data-tone="22">' +
      '<div id="ruin-mini-map" class="ruin-mini-map" role="region" aria-label="' + escapeHtml(ariaCopy[state.lang] || ariaCopy.en) + '"></div>' +
      '<div class="ruin-mini-fracture-host" aria-hidden="true"></div>' +
    '</div>' +
    '<p class="ruin-mini-source">' +
      escapeHtml(source.before) +
      '<a href="https://ruin-archive.site/" target="_blank" rel="noreferrer">' + escapeHtml(source.label) + '</a>' +
      escapeHtml(source.after) +
    '</p>' +
    '<p class="ruin-mini-updated">' + escapeHtml(updatedCopy[state.lang] || updatedCopy.en) + '</p>' +
  '</section>';
}

function renderRuinArchiveCabinetPreview() {
  var sourceCopy = {
    zh: { before: "档案界面取自 ", label: "《墟域图·遗构馆》", after: " 网站。" },
    en: { before: "Archive interface from ", label: "Ruin Archive", after: "." },
    ja: { before: "档案界面は ", label: "『墟域図・遺構館』", after: " より。" }
  };
  var ariaCopy = {
    zh: "遗构馆 archive-doc 与 index-drawer 缩小系统",
    en: "Scaled Ruin Archive archive-doc and index-drawer system",
    ja: "遺構館 archive-doc / index-drawer 縮小システム"
  };
  var drawerCopy = {
    zh: {
      record: "遗构录・卷",
      center: "遗构馆",
      garden: "⁙废墟园林・编",
      intro: "《墟域图・遗构馆》收录漫游世界时所遇见的人造残构、荒地与被遗忘的地景，并持续建构一个不断扩张的废墟世界。",
      p1: "每一处遗构，都保存着稍纵即逝的「如画美」，也孕育着另一场崩解的开始。这些残构由此成为墟构师创作《废墟园林》的土壤。",
      p2: "所有影像、声音与遗物重新汇入《遗构馆》，成为持续更新的废墟档案，并散落于同一张仍未完成的《墟域图》之中。",
      title: "— 墟语学索引 —",
      lex: "「墟语学」将现场征候转化为语素，并连接具有共同征候的遗构。",
      cats: ["土地","建筑","状态","自然"]
    },
    en: {
      record: "RECORDS · VOL.",
      center: "ARCHIVE",
      garden: "⁙FOLLY · SERIES",
      intro: "Ruin Archive gathers artificial remnants, wastelands, and forgotten landscapes encountered while roaming the world.",
      p1: "Each record preserves a fleeting picturesque condition while carrying the beginning of another collapse.",
      p2: "Images, sounds, and relics return to the Archive as an expanding atlas of ruins.",
      title: "— RUIN LEXICOLOGY —",
      lex: "Field signs become lexical units that connect ruins sharing the same symptoms.",
      cats: ["LAND","ARCHITECTURE","STATE","NATURE"]
    },
    ja: {
      record: "遺構録・巻",
      center: "遺構館",
      garden: "⁙フォリー・編",
      intro: "『墟域図・遺構館』は、世界を歩くなかで出会った人工の残構、荒地、忘れられた景観を収録する。",
      p1: "それぞれの遺構は一瞬の「如画美」を保存しながら、次の崩壊の始まりを孕んでいる。",
      p2: "映像、音、遺物は再び『遺構館』へ集まり、更新され続ける墟域図の断片となる。",
      title: "— 墟語学索引 —",
      lex: "現場の徴候を語素へ変換し、共通する徴候を持つ遺構を接続する。",
      cats: ["土地","建築","状態","自然"]
    }
  };

  var indexGroups = [
    ["mountain","山","slope","坡","shore","岸","bay","湾","port","埠","plateau","塬","valley","谷","cliff","崖"],
    ["corridor","廊","stair","阶","room","厅","dwelling","居","wall","垣","fort","堡","hall","殿","sacred","圣","tower","塔","tunnel","甬","column","柱","aperture","孔","factory","厂","vessel","舰","rail","辙","courtyard","庭","dam","坝","chamber","室","monument","碑"],
    ["ruin","残","remains","骸","desolate","荒","sunken","沉","scorched","焦","crack","裂","eroded","蚀","relocated","迁","compressed","压","seepage","渗","contaminated","染","placed","置","interstitial","间"],
    ["vine","蔓","moss","苔","tree","木","grass","草","spike","棘","ash","灰","membrane","膜","water","水","wave","波","magnetic","磁","soil","土","sand","沙"]
  ];

  var source = sourceCopy[state.lang] || sourceCopy.en;
  var drawer = drawerCopy[state.lang] || drawerCopy.zh;
  var fractureCopy = {
    zh: { button: "再碎裂", note: "瞬息万变的废墟，没有固定的模样。" },
    en: { button: "fracture again", note: "A ruin in constant change has no fixed appearance." },
    ja: { button: "もう一度砕く", note: "移ろい続ける廃墟に、定まった姿はない。" }
  };
  var fracture = fractureCopy[state.lang] || fractureCopy.zh;
  var steleCopy = {
    zh: {
      lead: "断裂石碑—碑文拓片",
      body: "这个效果模拟了断裂石碑的碑文拓片，文字也在断裂处断掉。"
    },
    en: {
      lead: "Fractured stele — inscription rubbing",
      body: "This effect simulates a rubbing taken from a broken stele; the inscription breaks wherever the stone breaks."
    },
    ja: {
      lead: "断裂石碑—碑文拓本",
      body: "この効果は、割れた石碑から採った碑文の拓本を模している。文字も石の断裂した箇所で途切れる。"
    }
  };
  var stele = steleCopy[state.lang] || steleCopy.zh;

  function indexRows() {
    return indexGroups.map(function(group, groupIndex) {
      var tags = "";
      for (var i = 0; i < group.length; i += 2) {
        tags += '<button type="button" class="ruin-mini-index-tag" data-tag="' +
          escapeHtml(group[i]) + '">' + escapeHtml(group[i + 1]) + '</button>';
      }
      return '<div class="ruin-mini-index-row">' +
        '<div class="ruin-mini-index-category">' + escapeHtml(drawer.cats[groupIndex]) + '</div>' +
        '<div class="ruin-mini-index-separator">|</div>' +
        '<div class="ruin-mini-index-tags">' + tags + '</div>' +
      '</div>';
    }).join("");
  }

  return '<section class="ruin-mini-section ruin-mini-cabinet-section" aria-label="' +
    escapeHtml(ariaCopy[state.lang] || ariaCopy.en) + '">' +
    '<div class="ruin-mini-shell ruin-mini-cabinet-shell">' +
      '<div id="ruin-mini-archive-system" class="ruin-mini-archive-system">' +
        '<div id="ruin-mini-stack-record" class="ruin-mini-file-stack ruin-mini-position-left" aria-hidden="true"></div>' +
        '<div id="ruin-mini-stack-garden" class="ruin-mini-file-stack ruin-mini-position-right" aria-hidden="true"></div>' +
      '</div>' +
      '<div class="ruin-mini-cabinet-frame" aria-hidden="true">' +
        '<svg viewBox="0 0 1000 820" preserveAspectRatio="none">' +
          '<g class="ruin-mini-cabinet-frame-lines">' +
            '<path d="M1 1H999V819H1Z"/>' +
            '<path d="M195 64H885V725H195Z"/>' +
            '<path d="M1 1L195 64 M999 1L885 64 M999 819L885 725 M1 819L195 725"/>' +
          '</g>' +
        '</svg>' +
      '</div>' +
      '<div id="ruin-mini-index-drawer" class="ruin-mini-index-drawer">' +
        '<div id="ruin-mini-index-stone-layer" class="ruin-mini-index-stone-layer" aria-hidden="true"></div>' +
        '<div id="ruin-mini-index-handle" class="ruin-mini-index-handle">' +
          '<button type="button" class="ruin-mini-index-surface-trigger" aria-expanded="false" aria-label="' + escapeHtml(drawer.center) + '"></button>' +
        '</div>' +
        '<div class="ruin-mini-index-content">' +
          '<div class="ruin-mini-stele-copy" data-stele-lang="' + escapeHtml(state.lang) + '">' +
            '<span class="ruin-mini-stele-lead">' + escapeHtml(stele.lead) + '</span>' +
            '<span class="ruin-mini-stele-separator">：</span>' +
            '<span class="ruin-mini-stele-body">' + escapeHtml(stele.body) + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="ruin-mini-refracture-control">' +
      '<button type="button" class="ruin-mini-refracture-button">' + escapeHtml(fracture.button) + '</button>' +
      '<p class="ruin-mini-refracture-note">' + escapeHtml(fracture.note) + '</p>' +
    '</div>' +
    '<p class="ruin-mini-source ruin-mini-cabinet-source">' +
      escapeHtml(source.before) +
      '<a href="https://ruin-archive.site/" target="_blank" rel="noreferrer">' + escapeHtml(source.label) + '</a>' +
      escapeHtml(source.after) +
    '</p>' +
  '</section>';
}

function renderSeawaterSpaceTimeChart(item) {
  var records = Array.isArray(item && item.spaceTimeRecords) ? item.spaceTimeRecords : [];
  if (!records.length) return "";

  var variants = {
    zh: {
      title: "时间与空间",
      subtitle: "X / 时间　　Y / 经度 λ　　Z / 纬度 φ",
      label: "X / 时间间距",
      close: "汇聚",
      open: "展开",
      note: "页面滚动：空间轴的视角改变　／　拖动滑条：时间切面的间距改变。",
      demo: "16处采样记录，据原始手写名录录入 · 最后一条日期仅记至2025年7月"
    },
    en: {
      title: "Space and time",
      subtitle: "X / time　　Y / longitude λ　　Z / latitude φ",
      label: "X / time spacing",
      close: "gather",
      open: "unfold",
      note: "Scroll to shift the spatial projection; move the bar to widen the intervals between moments.",
      demo: "16 samples transcribed from the handwritten ledger · the final date is recorded only as July 2025"
    },
    ja: {
      title: "時間と空間",
      subtitle: "X / 時間　　Y / 経度 λ　　Z / 緯度 φ",
      label: "X / 時間の間隔",
      close: "集約",
      open: "展開",
      note: "ページをスクロールすると空間軸の投影が変わり、バーを動かすと時間の断面の間隔が広がる。",
      demo: "手書き記録から転記した16件の採水記録 · 最後の採取日は2025年7月まで記載"
    }
  };
  var t = variants[state.lang] || variants.zh;
  return '<section class="seawater-space-time" data-seawater-space-time data-chart-lang="' +
      escapeHtml(state.lang) + '" data-chart-records="' + escapeHtml(JSON.stringify(records)) + '">' +
    '<header class="seawater-space-time-head">' +
      '<p class="seawater-space-time-kicker">SPACE / TIME</p>' +
      '<h2>' + escapeHtml(t.title) + '</h2>' +
      '<p class="seawater-space-time-subtitle">' + escapeHtml(t.subtitle) + '</p>' +
    '</header>' +
    '<div class="seawater-space-time-stage">' +
      '<svg class="seawater-space-time-svg" viewBox="0 0 1200 570" role="group" aria-label="' +
        escapeHtml(t.title) + '"></svg>' +
    '</div>' +
    '<div class="seawater-time-control">' +
      '<div class="seawater-time-control-labels">' +
        '<label for="seawater-time-spacing">' + escapeHtml(t.label) + '</label>' +
        '<output class="seawater-time-readout" data-seawater-time-readout for="seawater-time-spacing">×1.00</output>' +
      '</div>' +
      '<input class="seawater-time-slider" id="seawater-time-spacing" data-seawater-time-slider ' +
        'type="range" min="0" max="100" value="0" step="1" aria-label="' + escapeHtml(t.label) + '" />' +
      '<div class="seawater-time-control-endpoints">' +
        '<span>' + escapeHtml(t.close) + '</span><span>' + escapeHtml(t.open) + '</span>' +
      '</div>' +
    '</div>' +
    '<p class="seawater-space-time-note">' + escapeHtml(t.note) + '</p>' +
    '<p class="seawater-chart-prototype">' + escapeHtml(t.demo) + '</p>' +
  '</section>';
}

/*
  Seawater's reading sequence grows from the two original artworks:
  painting →︎ two memory paragraphs →︎ tank →︎ vessel →︎ time/space chart.
  Preserve the existing image viewer, captions, chart and brief annotations.
*/
const seawaterVesselDescription = {
  "zh": [
    "吨桶的形体一直使我着迷。它的标准化与普遍性，让这种容器出现在世界各地，盛放过彼此迥异的液体。那种圆润又方正、庞大又结实的样貌，使我想到一枚“现代帆船”的符号：单凭外形，便仿佛带着一种什么地方都去过、什么东西都装过的经验。只不过在这里，海水从船舱外来到了舱内。",
    "“吨”这个称呼连同它巨大的体量，又让这种能力隐约带上了野心，仿佛始终带着一种“你尽管带海水回来装”的态度。于是，我借用这个现成的形体，让那段无法证实的回忆继续有一个可以寄存的地方。这一尝试随后慢慢变成了一项持续至今的海水收集。"
  ],
  "en": [
    "The form of the tote tank has always fascinated me. Its standardisation and ubiquity allow this kind of container to appear all over the world, holding liquids of widely different kinds. Rounded yet square, enormous yet sturdy, it reminds me of an emblem of a “modern sailing ship”: its very shape seems to carry the experience of having been everywhere and held everything. Only here, the seawater has passed from outside the hull into its hold.",
    "The word “tonne”, together with the tank’s immense bulk, lends that capacity a faint ambition, as though it always had an attitude of “Bring back as much seawater as you like; I’ll hold it.” So I borrowed this ready-made form to give that unverifiable memory somewhere to remain. This attempt gradually became a collection of seawater that continues to this day."
  ],
  "ja": [
    "トートタンク（大型液体コンテナ）の形には、ずっと心を惹かれてきた。規格化され、広く普及しているからこそ、この容器は世界のさまざまな場所に現れ、互いにまったく異なる液体を入れてきた。丸みがありながら四角く、大きく頑丈な姿は、私には「現代の帆船」という一つの記号を思わせる。その形だけで、どこへでも行き、何でも入れてきた経験をまとっているように見える。ただしここでは、海水は船倉の外から内へと移されている。",
    "「トン」という呼び名とその巨大な量塊は、その能力にどこか野心めいたものまで与え、いつも「海水ならいくらでも持ち帰って入れればいい」とでも言いたげな態度を感じさせる。私はその既製の形を借りて、証明できない記憶がなお身を寄せられる場所をつくった。この試みはやがて、今も続く海水の採集へと少しずつ変わっていった。"
  ]
};

function rearrangeSeawaterStory(markup) {
  var template = document.createElement("template");
  template.innerHTML = markup;
  var root = template.content.querySelector(".room-view");
  var scroll = root && root.querySelector(".room-scroll");
  if (!scroll) return markup;

  var lead = scroll.querySelector(".room-lead");
  var frames = scroll.querySelectorAll(".room-image");
  var chart = scroll.querySelector(".seawater-space-time");
  if (!lead || frames.length < 2 || !chart) return markup;

  var memoryPainting = frames[0], toteArtwork = frames[1];
  memoryPainting.classList.add("seawater-memory-painting");
  toteArtwork.classList.add("seawater-light-artwork");

  // A painting before any prose: the introductory memory follows it.
  var introduction = lead.querySelector(".room-intro-stack, .room-intro");
  var memoryChapter = document.createElement("section");
  memoryChapter.className = "seawater-memory-chapter";
  if (introduction) memoryChapter.appendChild(introduction);
  memoryPainting.insertAdjacentElement("afterend", memoryChapter);

  // The tank opens a second phase, followed by its own short essay.
  var vesselEssay = document.createElement("section");
  vesselEssay.className = "seawater-vessel-chapter";
  // Keep the two paragraphs of the vessel text separate, as in the manuscript.
  var vesselParagraphs = localised(seawaterVesselDescription);
  (Array.isArray(vesselParagraphs) ? vesselParagraphs : [vesselParagraphs]).forEach(function (copy) {
    var paragraph = document.createElement("p");
    paragraph.className = "seawater-vessel-text";
    paragraph.textContent = copy;
    vesselEssay.appendChild(paragraph);
  });
  toteArtwork.insertAdjacentElement("afterend", vesselEssay);

  // Keep the artwork captions and chart controls / provenance annotations,
  // without the old long-form essays.
  return template.innerHTML;
}

function renderRoom(item) {
  var images = item.images || [];
  var next = rooms[(roomIndex(item) + 1) % rooms.length];
  var groupLabel = item.group === "collection" ? labels[state.lang].collection : item.group === "writing" ? labels[state.lang].writings : labels[state.lang].works;
  var html = '<section class="room-view' + (item.group === "writing" ? " writing-room" : "") +
    '" data-room="' + escapeHtml(item.slug) + '" data-group="' + escapeHtml(item.group) + '">' +
    '<header class="room-head">' +
      '<button type="button" data-action="home" class="room-back">←︎ ' + escapeHtml(labels[state.lang].back) + "</button>" +
      '<p>' + escapeHtml(groupLabel) + " / " + escapeHtml(localised(item.title)) + "</p>" +
      languageSwitch() +
    "</header>" +
    '<div class="room-scroll">' +
      '<section class="room-lead">' +
        '<p class="room-group">' + escapeHtml(groupLabel) + "</p>" +
        '<h1>' + escapeHtml(localised(item.title)) + "</h1>" +
        renderRoomIntro(item) +
      "</section>";

  if (item.slug === "ruin-atlas") {
    html += renderRuinAtlasPreview();
  }

  images.forEach(function(image, index) {
    html += '<figure class="room-image' + (image.fit === "contain" ? " is-contain" : "") + '">' +
      '<img src="' + image.src + '" alt="" ' + (index ? 'loading="lazy"' : "") + " />" +
      '<figcaption>' + escapeHtml(localised(image.caption)) + "</figcaption>" +
    "</figure>";
  });

  if (item.slug === "seawater") {
    html += renderSeawaterSpaceTimeChart(item);
  }

  if (item.group === "writing" && Array.isArray(item.tenetImages)) {
    html += '<section class="writing-tenets" aria-label="Ruinwright ten tenets">';
    item.tenetImages.forEach(function(src, index) {
      html += '<a class="writing-tenet-card" href="' + item.visit + '" target="_blank" rel="noreferrer" aria-label="' + escapeHtml(localised(item.title)) + ' · ' + String(index + 1).padStart(2, "0") + '">' +
        '<span class="writing-tenet-tile"><img src="' + src + '" alt="" loading="lazy" /></span>' +
        '<span class="writing-tenet-number">' + String(index + 1).padStart(2, "0") + '</span>' +
      '</a>';
    });
    html += '</section>';
  }

  if (Array.isArray(item.notes) && item.notes.length) {
    html += '<section class="room-notes">';
    item.notes.forEach(function(note, noteIndex) {
      if (item.slug === "ruin-atlas" && noteIndex === 1) {
        html += renderRuinArchiveCabinetPreview();
      }

      var richBody = note.bodyHtml ? localised(note.bodyHtml) : null;
      var body = localised(note.body);
      var bodyHtml = "";
      if (Array.isArray(richBody)) {
        bodyHtml = richBody.map(function(paragraph) {
          return '<p class="room-note-body">' + paragraph + "</p>";
        }).join("");
      } else if (richBody) {
        bodyHtml = '<p class="room-note-body">' + richBody + "</p>";
      } else if (Array.isArray(body)) {
        bodyHtml = body.map(function(paragraph) {
          return '<p class="room-note-body">' + escapeHtml(paragraph) + "</p>";
        }).join("");
      } else if (body) {
        bodyHtml = '<p class="room-note-body">' + escapeHtml(body) + "</p>";
      }

      var quoteHtml = "";
      if (note.quote) {
        quoteHtml = '<blockquote class="room-note-quote">' +
          '<p>' + escapeHtml(localised(note.quote)) + "</p>" +
          (note.attribution ? '<cite>' + escapeHtml(localised(note.attribution)) + "</cite>" : "") +
        "</blockquote>";
      }

      var noteTitleHtml = note.titleHtml
        ? localised(note.titleHtml)
        : escapeHtml(localised(note.title));

      html += '<article class="room-note">' +
        '<p class="room-note-title">' + noteTitleHtml + "</p>" +
        '<div class="room-note-copy">' + bodyHtml + quoteHtml + "</div>" +
      "</article>";
    });
    html += "</section>";
  }

  if (item.visit) {
    html += '<div class="room-visit-wrap"><a class="room-visit" href="' + item.visit + '" target="_blank" rel="noreferrer">' +
      escapeHtml(localised(item.visitLabel)) + '<span aria-hidden="true"> ↗︎</span></a></div>';
  }

  html += '<footer class="room-footer">' +
    '<button type="button" data-action="route" data-route="' + next.slug + '">' +
      escapeHtml(localised(next.title)) + '<span aria-hidden="true"> →︎</span>' +
    "</button>" +
  "</footer></div></section>";

  return item.slug === "seawater" ? rearrangeSeawaterStory(html) : html;
}

function renderAboutRoom() {
  var title = localised(aboutProfile.title);
  var name = localised(aboutProfile.name);
  var image = aboutProfile.image
    ? '<img src="' + escapeHtml(aboutProfile.image) + '" alt="' + escapeHtml(name) + '" loading="lazy" />'
    : '<span class="about-image-label" aria-hidden="true">image</span>';
  var paragraphs = localised(aboutProfile.paragraphs) || [];

  return '<section class="room-view about-room" data-room="about" data-group="about">' +
    '<header class="room-head">' +
      '<button type="button" data-action="home" class="room-back">←︎ ' + escapeHtml(labels[state.lang].back) + '</button>' +
      '<p>' + escapeHtml(title) + '</p>' +
      languageSwitch() +
    '</header>' +
    '<div class="room-scroll about-scroll">' +
      '<article class="about-layout">' +
        '<div class="about-copy">' +
          '<p class="about-kicker">' + escapeHtml(title) + '</p>' +
          '<h1 class="about-name">' + escapeHtml(name) + '</h1>' +
          '<p class="about-practice">' + escapeHtml(localised(aboutProfile.practice)) + '</p>' +
          '<div class="about-prose">' + paragraphs.map(function(p) {
            return '<p>' + escapeHtml(p) + '</p>';
          }).join("") + '</div>' +
        '</div>' +
        '<figure class="about-portrait">' + image + '</figure>' +
      '</article>' +
    '</div>' +
  '</section>';
}

function render() {
  var room = parseRoute();
  document.documentElement.lang = state.lang === "zh" ? "zh-Hans" : state.lang;

  if (room) {
    state.indexOpen = false;
    state.calendarOpen = false;
    document.title = localised(room.title) + " — sky-sea-lake-cloud";
    app.innerHTML = '<main class="site-root">' +
      (room.slug === "about" ? renderAboutRoom() : renderRoom(room)) + "</main>";
  } else {
    document.title = "sky-sea-lake-cloud";
    app.innerHTML = '<main class="site-root">' + renderHome() + "</main>";
  }
}

function goHome() {
  history.pushState(null, "", location.pathname + location.search);
  state.indexOpen = false;
  state.calendarOpen = false;
  render();
}

function goRoute(route) {
  if (route === "fictional-topography") return;
  state.indexOpen = false;
  state.calendarOpen = false;
  location.hash = route;
}

function openIndex(open) {
  state.indexOpen = open;
  if (open) state.calendarOpen = false;
  render();
}

function openCalendar(open) {
  state.calendarOpen = open;
  if (open) {
    state.indexOpen = false;
    state.calendarCursor = selectedDate();
  }
  render();
}

function chooseDate(key) {
  var date = parseDateKey(key);
  if (dateIsBeforeCalendarStart(date) || dateIsAfterToday(date)) return;

  state.previewDate = key === dateKey(todayAtNoon()) ? null : key;
  state.calendarOpen = false;
  render();
}

app.addEventListener("click", function(event) {
  var target = event.target.closest("[data-action]");
  if (!target) return;

  var action = target.dataset.action;

  if (action === "toggle-index") openIndex(!state.indexOpen);
  if (action === "close-index") openIndex(false);
  if (action === "toggle-calendar") openCalendar(!state.calendarOpen);
  if (action === "close-calendar") openCalendar(false);
  if (action === "calendar-window-prev") {
    var previousWindow = shiftCalendarDate(state.calendarCursor, -7);
    state.calendarCursor = previousWindow.getTime() < CALENDAR_START.getTime()
      ? CALENDAR_START : previousWindow;
    render();
  }
  if (action === "calendar-window-next") {
    var nextWindow = shiftCalendarDate(state.calendarCursor, 7);
    state.calendarCursor = nextWindow.getTime() > todayAtNoon().getTime()
      ? todayAtNoon() : nextWindow;
    render();
  }
  if (action === "choose-date") chooseDate(target.dataset.date);
  if (action === "today") {
    state.previewDate = null;
    state.calendarCursor = todayAtNoon();
    state.calendarOpen = false;
    render();
  }
  if (action === "home") goHome();
  if (action === "route") goRoute(target.dataset.route);
  if (action === "language") {
    var lang = target.dataset.lang;
    if (LANGS.indexOf(lang) < 0) return;
    state.lang = lang;
    saveLanguage(lang);
    clearLinkLanguageOverride();
    render();
  }
});

window.addEventListener("hashchange", render);
window.addEventListener("popstate", render);

window.addEventListener("keydown", function(event) {
  if (event.key !== "Escape") return;
  if (state.calendarOpen) openCalendar(false);
  else if (state.indexOpen) openIndex(false);
  else if (parseRoute()) goHome();
});

render();


/* ===== Collection pages ===== */

"use strict";

/*
  Collection page extensions.
  Keeps the main portfolio script small while letting image-heavy collections
  use their own viewing rhythm.
*/

(function () {
  var fragranceStory = {
  "zh": [
    "《芬芳厅的角落》收集日常环境中那些悄悄脱离控制的美学角落：怪诞的雕塑、失去语境的设施，以及被习惯性忽略、却偶尔让人感到诡异的生活场景与物品。这样的景象，有时会被调侃为“儿童邪典”。",
    "它们在城市过快的建设中，成为生活背景里的一部分点缀，未必参与宏大叙事，也未必被设计成独立的作品，最终甚至未必能进入人们的目光、引起共鸣，却往往在完整的需求尚未形成之前，就被一批批制造出来，成为意义模糊的半成品。真正吸引我的，是那些原本只是装饰都市生活背景的东西，在比例、材质或摆放方式稍微偏离常识以后，开始反过来凝视生活在其中的人。",
    "这种荒诞并不一定来自某个设计者强烈的个人趣味，反而可能发生于每个参与者都暂时从整体意图中抽身，只依据那些被无端沿袭的需求与经验，完成各自负责的功能性点缀。当人与人之间缺少共鸣时，一种无法归属于任何单一作者的美学便可能自行出现。它诞生于人类制造的环境，却又像已经游离于人的控制与意图之外。",
    "而作为观察者的我，同样是这种失去共鸣的一环。正因为我无法真正进入这些场景原本的意义，才会从中看见本不该透露出的诡异，也同时看见一种未经设计的美。",
    "为了让这种“反向凝视”更强，我刻意使用一台凝视能力被弱化的相机——一种接近玩具相机的胶片相机。它不追求锋利的画面和准确的色彩，也不让我借助摄影技术重新支配空间与画面。我不再像是拿着一台精密设备去审视某个奇怪对象的观察者，反而变得迟钝、脆弱，甚至有一点不可靠，使我与场景之间的权力关系也因此被削弱。当作者的控制感降低以后，画面中的设施、雕塑、纹饰和生活残留，反而更容易获得一种独立的存在感。",
    "玩具相机那轻盈的视角，又将我带回了儿时“秘密基地”的感受。孩子为什么会把那些无人的角落当作秘密基地？有些地方似乎一直在自动筛选自己的光顾者。它既不是为孩童设计的儿童乐园，也不是成人替孩童搭好的童真故事。正是在这些不起眼、没有被认真观看的地方，某些设施、装饰和物品开始获得一种奇怪的独立生命。",
    "于是，最重要的东西不一定出现在画面中央。它更像留在画面之外的一种情绪：那些东西仿佛并不需要我去解释，也不等待我的判断。它们只是继续存在，并以一种我无法完全掌控的方式，把视线重新投向我。",
    "我从这些地方直接感受到了一种儿童时期曾经直冲灵魂的陌生感与现实荒诞感。因此，我拍摄它们，并不是为了把它们重新整理成一个合理的世界。恰恰相反，我更愿意保留那种无法完全解释的距离：像进入一个并不真正属于我的秘密基地，短暂地允许那些被忽略的纹饰先看见我。",
    "最后，我常想到关于“塞维利亚·摩尔人国王宫殿”的那段描述：房间里人的活动，被纹饰中“没有声息的嘈杂”吸收。对我来说，《芬芳厅的角落》中的场景也有类似的力量。那些纹饰并不只是被我们观看的对象；当它们脱离了设计者原本的控制、用途与解释以后，反而开始组织我们的感受，甚至像是在画面之外反向凝视我们自己。"
  ],
  "en": [
    "Corners of the Hall of Fragrance gathers the aesthetic corners of everyday life that have quietly slipped beyond control: grotesque sculptures, facilities severed from their context, and familiar scenes and objects that we habitually overlook, yet sometimes find unsettling. Such sights are sometimes jokingly called “children’s cult horror.”",
    "As cities are built at breakneck speed, these things become ornaments in the background of everyday life. They need not belong to any grand narrative, nor have been conceived as works in their own right; they may never even draw anyone’s attention or strike a chord. Yet they are made in batches, often before the need for them has fully taken shape, and remain half-finished in meaning. What draws me to them is the way something intended merely to decorate the urban backdrop can, through a slight departure from familiar proportions, materials or placement, begin to look back at the people who live among it.",
    "This absurdity need not arise from the forceful personal taste of any one designer. It can emerge when each participant steps away from the larger intention and carries out their part of the functional ornament, following requirements and habits inherited without much question. Where understanding between people is missing, an aesthetic attributable to no single author may begin to appear of its own accord. It grows out of a man-made environment, yet seems to have wandered beyond human control and intention.",
    "And I, the observer, am also part of this failure to understand. Precisely because I cannot fully enter what these scenes originally meant, I find in them an uncanniness they were never supposed to disclose, alongside a beauty no one quite designed.",
    "To strengthen this “returning gaze,” I deliberately use a camera whose own power to look has been weakened—a film camera close to a toy camera. It makes no claim to sharp images or accurate colour, nor does it let me use photographic technique to assert control over the scene. Instead of standing over a strange object with a precision instrument, I become slower, more vulnerable, even a little unreliable; the balance of power between the scene and me shifts. As my control as an author diminishes, the facilities, sculptures, ornament and residues of daily life in the photograph can acquire a presence of their own.",
    "The toy camera’s lightness of vision takes me back to the feeling of childhood “secret bases.” Why do children turn unoccupied corners into secret bases? Some places seem always to be choosing their own visitors. They are neither playgrounds designed for children nor ready-made stories of childhood assembled by adults. It is in these inconspicuous places, seldom truly looked at, that certain facilities, decorations and objects begin to take on a strange life of their own.",
    "So the most important thing is not necessarily at the centre of the picture. It is more like a feeling left somewhere beyond the frame: those things seem not to need my explanation or await my judgement. They simply go on existing, turning their gaze back on me in ways I cannot entirely control.",
    "In these places I feel directly the strangeness and absurdity of reality that once struck me to the core as a child. I photograph them not to put them back in order as a reasonable world. On the contrary, I would rather preserve that distance which cannot be fully explained: as though entering a secret base that does not truly belong to me, and for a moment allowing its neglected ornaments to see me first.",
    "Finally, I often think of the description of the “Palace of the Moorish Kings in Seville”: the activity of people in its rooms is absorbed by the ornament’s “noiseless clamour.” For me, the scenes in Corners of the Hall of Fragrance have a similar force. Ornament is not simply something we look at. Once it slips beyond the designer’s original control, use and explanation, it begins to organise our feelings, even seeming to look back at us from somewhere beyond the frame."
  ],
  "ja": [
    "『芬芳の間の片隅』は、日常のなかでいつのまにか制御を離れた、美的な片隅を集めたものだ。奇妙な彫刻、文脈を失った設備、見慣れているがゆえに普段は見過ごされ、ときおり不気味に感じられる生活の風景や物たち。俗に「子ども向けカルトホラー」などと冗談めかして呼ばれることもある。",
    "都市の建設があまりに速く進むなか、それらは暮らしの背景を飾るものとなる。壮大な物語に関わるとは限らず、独立した作品として設計されたとも限らない。人の目に留まり、共感を呼ぶことさえないかもしれない。それでも必要とされる理由が十分に形になる前から、次々と量産され、意味の曖昧な半製品のように残される。私が惹かれるのは、都市生活の背景を飾るはずだったものが、比率や素材、置かれ方を常識からほんの少し外した途端、そこに暮らす人を逆に見つめ始めることだ。",
    "この不条理は、必ずしも設計者個人の強い趣味から生まれるわけではない。関わった一人ひとりが全体の意図からいったん身を引き、理由も問われず引き継がれてきた要求や経験に従って、それぞれの機能的な飾りを仕上げた結果かもしれない。人と人とのあいだに共鳴が失われるとき、誰一人の作者にも帰属しない美学が、おのずと現れることがある。人のつくった環境に生まれながら、人の制御と意図をすでに離れたかのように。",
    "そして観察する私自身も、共鳴を失ったその輪の一部である。これらの場面がもともと持っていた意味の内側へ、本当には入れないからこそ、そこに現れるはずのなかった不気味さと、誰にも設計されていない美しさを見つけるのだ。",
    "この「見返してくる視線」をさらに強めるために、私はあえて見る力の弱いカメラを使う。玩具カメラに近いフィルムカメラである。鮮明な像や正確な色を求めず、写真の技術によって空間や画面を思いどおりに支配することもできない。精密な機械で奇妙な対象を検査する者ではなく、むしろ私自身が鈍く、脆く、少し頼りない観察者になることで、場面と私との力関係が弱まる。作者としての制御感が薄れるほど、写真のなかの設備、彫刻、装飾、生活の痕跡は、かえって独立した存在感を帯びてくる。",
    "玩具カメラの軽やかな視点は、子どもの頃の「秘密基地」の感覚へと私を連れ戻す。子どもはなぜ、人のいない片隅を秘密基地にするのだろう。ある場所は、いつも自分を訪れる者を選り分けているように見える。そこは子どものために設計された遊園地でも、大人がこしらえた童心の物語でもない。目立たず、きちんと見られてこなかった場所でこそ、設備や飾りや物たちが奇妙な独立した生命を持ち始める。",
    "だから、最も大切なものが必ずしも画面の中央にあるとは限らない。それはむしろ、画面の外に残された感情に近い。それらは私の説明を必要とせず、判断も待っていない。ただ存在し続け、私が完全には制御できない仕方で、視線をこちらへ向け直してくる。",
    "こうした場所で私は、子どもの頃に魂を突き抜けるように感じた、現実の見知らぬ気配と不条理を直接感じる。私がそれらを撮るのは、筋の通った世界へ整理し直すためではない。むしろ、完全には説明できない距離を残したい。自分のものではない秘密基地に入り、見過ごされてきた装飾のほうに、ほんのしばらく先に私を見つけさせるように。",
    "最後に、私はよく「セビリアのムーア人王宮」についての一節を思い出す。室内の人間の営みが、装飾の「音のない喧騒」に吸い込まれてしまうという記述である。私にとって『芬芳の間の片隅』の風景にも、それに似た力がある。装飾はただ私たちに見られる対象ではない。設計者のもともとの制御、用途、説明から離れたあと、かえって私たちの感覚を組み立て、画面の外からこちらを見返してくるように感じられる。"
  ]
};

  var fragranceThemes = [
    {
      key: "sky",
      label: { zh: "天空", en: "sky", ja: "空" },
      files: [
        "01.jpg",
        "02.jpg",
        "03.jpg",
        "04.jpg",
        "05.jpg",
        "06.jpg",
        "07.jpg",
        "08.jpg",
        "09.jpg",
        "10.jpg"
      ]
    },
    {
      key: "cosmos",
      label: { zh: "宇宙", en: "cosmos", ja: "宇宙" },
      files: [
        "01.jpg",
        "02.jpg",
        "03.jpg",
        "04.jpg",
        "05.jpg",
        "06.jpg",
        "07.jpg"
      ]
    },
    {
      key: "organs",
      label: { zh: "肢体", en: "body", ja: "身体" },
      files: [
        "01.jpg",
        "02.jpg",
        "03.jpg",
        "04.jpg",
        "05.jpg",
        "06.jpg",
        "07.jpg",
        "08.jpg"
      ]
    },
    {
      key: "gallery",
      label: { zh: "画廊", en: "gallery", ja: "ギャラリー" },
      files: [
        "01.jpg",
        "02.jpg",
        "03.jpg",
        "04.jpg"
      ]
    },
    {
      key: "eyes",
      label: { zh: "眼睛", en: "eyes", ja: "眼" },
      files: [
        "01.jpg",
        "02.jpg",
        "03.jpg",
        "04.jpg",
        "05.jpg",
        "06.jpg",
        "07.jpg"
      ]
    }
  ];

  fragranceThemes.forEach(function (theme) {
    theme.images = theme.files.map(function (file) {
      return "./collection/fragrance/" + theme.key + "/" + encodeURIComponent(file);
    });
  });

  var fragranceState = {
    theme: "organs",
    slides: { sky: 0, cosmos: 0, organs: 0, gallery: 0, eyes: 0 }
  };

  function findCollection(slug) {
    return collections.find(function (item) { return item.slug === slug; });
  }

  var fragrance = findCollection("fragrance-hall");
  if (fragrance) fragrance.galleryThemes = fragranceThemes;

  var lakeRoom = findCollection("room-by-the-lake");
  if (lakeRoom) {
    lakeRoom.images = [
      {
        src: "./collection/room-by-the-lake/room-by-the-lake.jpg",
        fit: "contain",
        caption: {
          zh: "room by the lake, 2020 · 布面油画 · 60 × 91 cm · 密西根湖",
          en: "room by the lake, 2020 · oil on canvas · 60 × 91 cm · Lake Michigan",
          ja: "room by the lake, 2020 · キャンバスに油彩 · 60 × 91 cm · ミシガン湖"
        }
      },
      {
        src: "./collection/room-by-the-lake/painting-on-site.jpg",
        caption: { zh: "展示空间", en: "painting on site", ja: "展示空間" }
      }
    ];
  }

  var seawater = findCollection("seawater");
  if (seawater) {
    seawater.title = {
      zh: "collection of (all) oceans and seas",
      en: "collection of (all) oceans and seas",
      ja: "collection of (all) oceans and seas"
    };
    seawater.intro = seawaterMemoryText;
    seawater.images = [
      {
        src: "./collection/oceans-and-seas/memory.jpeg",
        fit: "contain",
        caption: {
          zh: "《角落里漏着“55个海洋的海水”》 · 30 × 40 cm · 布面油画 · 2019",
          en: "Water from ‘55 Oceans’ Leaking in the Corner · 30 × 40 cm · oil on canvas · 2019",
          ja: "《隅で漏れている「55の海の海水」》 · 30 × 40 cm · キャンバスに油彩 · 2019"
        }
      },
      {
        src: "./collection/oceans-and-seas/totetank.jpg",
        fit: "contain",
        caption: {
          zh: "collection of (all) oceans and seas · H: — · D: — · 2023/2— ·（坐标、坐标、坐标……）",
          en: "collection of (all) oceans and seas · H: — · D: — · 2023/2— · (coordinates, coordinates, coordinates …)",
          ja: "collection of (all) oceans and seas · H: — · D: — · 2023/2— ·（座標、座標、座標……）"
        }
      }
    ];
    // Keep artwork captions and the chart's annotations, without older essays.
    seawater.notes = [];

    // 16 entries transcribed from the original handwritten seawater ledger.
    // Preserve recorded coordinates, including coastal points. The final
    // entry supplies only a month (2025-07): do not invent a calendar day.
    seawater.spaceTimeRecords = [
      {
        "date": "2023-02-23",
        "lat": 33.245667,
        "lng": -77.778917,
        "name": {
          "zh": "北大西洋",
          "en": "North Atlantic",
          "ja": "北大西洋"
        }
      },
      {
        "date": "2023-08-07",
        "lat": 37.549028,
        "lng": -122.847917,
        "name": {
          "zh": "北太平洋",
          "en": "North Pacific",
          "ja": "北太平洋"
        }
      },
      {
        "date": "2023-12-26",
        "lat": 47.00838,
        "lng": -124.187756,
        "name": {
          "zh": "北太平洋",
          "en": "North Pacific",
          "ja": "北太平洋"
        }
      },
      {
        "date": "2024-01-17",
        "lat": 40.572331,
        "lng": -73.975015,
        "name": {
          "zh": "北大西洋",
          "en": "North Atlantic",
          "ja": "北大西洋"
        }
      },
      {
        "date": "2024-03-27",
        "lat": 31.214175,
        "lng": 121.783933,
        "name": {
          "zh": "东海",
          "en": "East China Sea",
          "ja": "東シナ海"
        }
      },
      {
        "date": "2024-03-30",
        "lat": 35.522447,
        "lng": 119.628333,
        "name": {
          "zh": "黄海",
          "en": "Yellow Sea",
          "ja": "黄海"
        }
      },
      {
        "date": "2024-04-01",
        "lat": 36.076083,
        "lng": 120.60675,
        "name": {
          "zh": "黄海",
          "en": "Yellow Sea",
          "ja": "黄海"
        }
      },
      {
        "date": "2024-04-01",
        "lat": 40.617972,
        "lng": 120.810667,
        "name": {
          "zh": "渤海",
          "en": "Bohai Sea",
          "ja": "渤海"
        }
      },
      {
        "date": "2024-04-02",
        "lat": 39.061411,
        "lng": 121.912862,
        "name": {
          "zh": "黄海",
          "en": "Yellow Sea",
          "ja": "黄海"
        }
      },
      {
        "date": "2024-04-05",
        "lat": 36.733,
        "lng": 121.652111,
        "name": {
          "zh": "黄海",
          "en": "Yellow Sea",
          "ja": "黄海"
        }
      },
      {
        "date": "2024-04-08",
        "lat": 20.054539,
        "lng": 110.568111,
        "name": {
          "zh": "南海",
          "en": "South China Sea",
          "ja": "南シナ海"
        }
      },
      {
        "date": "2024-06-22",
        "lat": 30.817861,
        "lng": 121.533472,
        "name": {
          "zh": "东海",
          "en": "East China Sea",
          "ja": "東シナ海"
        }
      },
      {
        "date": "2024-07-03",
        "lat": 33.734694,
        "lng": -118.818694,
        "name": {
          "zh": "北太平洋",
          "en": "North Pacific",
          "ja": "北太平洋"
        }
      },
      {
        "date": "2024-07-06",
        "lat": 34.029972,
        "lng": -118.560611,
        "name": {
          "zh": "北太平洋",
          "en": "North Pacific",
          "ja": "北太平洋"
        }
      },
      {
        "date": "2025-03-05",
        "lat": 22.292833,
        "lng": 114.169806,
        "name": {
          "zh": "南海",
          "en": "South China Sea",
          "ja": "南シナ海"
        }
      },
      {
        "date": "2025-07",
        "lat": 35.299972,
        "lng": 139.474611,
        "name": {
          "zh": "北太平洋",
          "en": "North Pacific",
          "ja": "北太平洋"
        }
      }
    ];

  }

  function renderNotes(item) {
    if (!Array.isArray(item.notes) || !item.notes.length) return "";

    var html = '<section class="room-notes">';
    item.notes.forEach(function (note) {
      var body = localised(note.body);
      var bodyHtml = "";

      if (Array.isArray(body)) {
        bodyHtml = body.map(function (paragraph) {
          return '<p class="room-note-body">' + escapeHtml(paragraph) + "</p>";
        }).join("");
      } else if (body) {
        bodyHtml = '<p class="room-note-body">' + escapeHtml(body) + "</p>";
      }

      var quoteHtml = "";
      if (note.quote) {
        quoteHtml = '<blockquote class="room-note-quote">' +
          '<p>' + escapeHtml(localised(note.quote)) + "</p>" +
          (note.attribution ? '<cite>' + escapeHtml(localised(note.attribution)) + "</cite>" : "") +
        "</blockquote>";
      }

      html += '<article class="room-note">' +
        '<p class="room-note-title">' + escapeHtml(localised(note.title)) + "</p>" +
        '<div class="room-note-copy">' + bodyHtml + quoteHtml + "</div>" +
      "</article>";
    });
    return html + "</section>";
  }


  // The galleries are encountered in the order of the essay; existing directory
  // "organs" is the collection called "limbs" in the author's layout notes.
  var fragranceReadingOrder = ["organs", "cosmos", "eyes", "sky", "gallery"];

  function fragranceThemeByKey(key) {
    return fragranceThemes.find(function(theme) { return theme.key === key; }) || null;
  }

  function renderFragranceGallery(themeKey) {
    var theme = fragranceThemeByKey(themeKey);
    if (!theme || !theme.images.length) return "";
    var index = fragranceState.slides[theme.key] || 0;
    var image = theme.images[index];

    var thumbs = theme.images.map(function(src, thumbIndex) {
      return '<button type="button" class="fragrance-thumb' + (thumbIndex === index ? " is-active" : "") +
        '" data-fragrance-slide="' + thumbIndex + '" aria-label="' + escapeHtml(localised(theme.label)) +
        " " + (thumbIndex + 1) + '">' +
        '<img src="' + src + '" alt="" loading="lazy" />' +
      '</button>';
    }).join("");

    return '<section class="fragrance-gallery fragrance-gallery-in-essay" data-fragrance-gallery="' + theme.key +
      '" aria-label="' + escapeHtml(localised(theme.label)) + '">' +
      '<div class="fragrance-stage">' +
        '<button type="button" class="fragrance-arrow fragrance-arrow-prev" data-fragrance-step="-1" aria-label="previous image">←︎</button>' +
        '<figure class="fragrance-frame">' +
          '<img src="' + image + '" alt="' + escapeHtml(localised(theme.label)) + " " + (index + 1) + '" loading="lazy" />' +
          '<figcaption><span></span><span>' +
            String(index + 1).padStart(2, "0") + " / " + String(theme.images.length).padStart(2, "0") +
          '</span></figcaption>' +
        '</figure>' +
        '<button type="button" class="fragrance-arrow fragrance-arrow-next" data-fragrance-step="1" aria-label="next image">→︎</button>' +
      '</div>' +
      '<div class="fragrance-filmstrip" aria-label="contact sheet">' + thumbs + '</div>' +
    '</section>';
  }

  function renderFragranceText(paragraphIndexes) {
    var paragraphs = fragranceStory[state.lang] || fragranceStory.zh;
    return '<section class="fragrance-essay">' + paragraphIndexes.map(function(index) {
      return '<p>' + escapeHtml(paragraphs[index]) + '</p>';
    }).join("") + '</section>';
  }

  function renderFragranceQuote(item) {
    var quoteNote = (item.notes || []).find(function(note) { return !!note.quote; });
    if (!quoteNote) return "";
    // Attribution has not been verified; preserve the supplied passage without
    // printing an unconfirmed author's name.
    return '<blockquote class="fragrance-final-quote"><p>' +
      escapeHtml(localised(quoteNote.quote)) + '</p></blockquote>';
  }

  function renderFragranceRoom(item) {
    var next = rooms[(roomIndex(item) + 1) % rooms.length];
    var groupLabel = labels[state.lang].collection;
    var opening = (fragranceStory[state.lang] || fragranceStory.zh)[0];

    return '<section class="room-view fragrance-room">' +
      '<header class="room-head">' +
        '<button type="button" data-action="home" class="room-back">←︎ ' + escapeHtml(labels[state.lang].back) + '</button>' +
        '<p>' + escapeHtml(groupLabel) + " / " + escapeHtml(localised(item.title)) + '</p>' +
        languageSwitch() +
      '</header>' +
      '<div class="room-scroll">' +
        '<section class="room-lead fragrance-lead">' +
          '<p class="room-group">' + escapeHtml(groupLabel) + '</p>' +
          '<h1>' + escapeHtml(localised(item.title)) + '</h1>' +
          '<p class="room-intro">' + escapeHtml(opening) + '</p>' +
        '</section>' +
        // The five author-marked insertion points: limbs, cosmos, eyes, sky, gallery.
        renderFragranceGallery(fragranceReadingOrder[0]) +
        renderFragranceText([1]) +
        renderFragranceGallery(fragranceReadingOrder[1]) +
        renderFragranceText([2, 3]) +
        renderFragranceGallery(fragranceReadingOrder[2]) +
        renderFragranceText([4, 5]) +
        renderFragranceGallery(fragranceReadingOrder[3]) +
        renderFragranceText([6, 7]) +
        renderFragranceGallery(fragranceReadingOrder[4]) +
        renderFragranceText([8]) +
        renderFragranceQuote(item) +
        '<footer class="room-footer">' +
          '<button type="button" data-action="route" data-route="' + next.slug + '">' +
            escapeHtml(localised(next.title)) + '<span aria-hidden="true"> →︎</span>' +
          '</button>' +
        '</footer>' +
      '</div>' +
    '</section>';
  }

  var baseRenderRoom = renderRoom;
  renderRoom = function(item) {
    if (item && item.slug === "fragrance-hall") return renderFragranceRoom(item);
    return baseRenderRoom(item);
  };

  function replaceFragranceGallery(themeKey) {
    var gallery = document.querySelector('[data-fragrance-gallery="' + themeKey + '"]');
    if (!gallery) return;
    var strip = gallery.querySelector(".fragrance-filmstrip");
    var lastScroll = strip ? strip.scrollLeft : 0;
    gallery.outerHTML = renderFragranceGallery(themeKey);
    var updated = document.querySelector('[data-fragrance-gallery="' + themeKey + '"]');
    var freshStrip = updated && updated.querySelector(".fragrance-filmstrip");
    if (freshStrip) {
      freshStrip.scrollLeft = lastScroll;
      var active = freshStrip.querySelector(".fragrance-thumb.is-active");
      if (active) {
        var left = active.offsetLeft - freshStrip.offsetLeft;
        if (left < freshStrip.scrollLeft || left + active.offsetWidth > freshStrip.scrollLeft + freshStrip.clientWidth) {
          freshStrip.scrollLeft = Math.max(0, left - (freshStrip.clientWidth - active.offsetWidth) / 2);
        }
      }
    }
  }

  function selectFragranceGallery(eventTarget) {
    var gallery = eventTarget.closest("[data-fragrance-gallery]");
    var key = gallery && gallery.dataset.fragranceGallery;
    if (!key || !fragranceThemeByKey(key)) return null;
    fragranceState.theme = key;
    return key;
  }

  document.addEventListener("click", function(event) {
    var slideButton = event.target.closest("[data-fragrance-slide]");
    if (slideButton) {
      var slideKey = selectFragranceGallery(slideButton);
      if (!slideKey) return;
      fragranceState.slides[slideKey] = Number(slideButton.dataset.fragranceSlide) || 0;
      replaceFragranceGallery(slideKey);
      return;
    }

    var stepButton = event.target.closest("[data-fragrance-step]");
    if (stepButton) {
      var stepKey = selectFragranceGallery(stepButton);
      var theme = stepKey && fragranceThemeByKey(stepKey);
      if (!theme) return;
      var step = Number(stepButton.dataset.fragranceStep) || 0;
      var oldIndex = fragranceState.slides[stepKey] || 0;
      fragranceState.slides[stepKey] = (oldIndex + step + theme.images.length) % theme.images.length;
      replaceFragranceGallery(stepKey);
    }
  });

  window.addEventListener("keydown", function(event) {
    if (!document.querySelector(".fragrance-room")) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    if (event.altKey || event.ctrlKey || event.metaKey ||
        /INPUT|TEXTAREA|SELECT/.test((event.target && event.target.tagName) || "")) return;

    // In a long interleaved essay, the arrow keys act on the gallery closest
    // to the viewport centre, not on an unrelated gallery above the fold.
    var galleries = Array.prototype.slice.call(document.querySelectorAll("[data-fragrance-gallery]"));
    var chosen = null;
    var nearest = Infinity;
    var centre = window.innerHeight / 2;
    galleries.forEach(function(gallery) {
      var rect = gallery.getBoundingClientRect();
      var distance = Math.abs((rect.top + rect.bottom) / 2 - centre);
      if (distance < nearest) { nearest = distance; chosen = gallery; }
    });
    var themeKey = chosen && chosen.dataset.fragranceGallery;
    var theme = themeKey && fragranceThemeByKey(themeKey);
    if (!theme) return;
    event.preventDefault();
    fragranceState.theme = themeKey;
    var step = event.key === "ArrowLeft" ? -1 : 1;
    var oldIndex = fragranceState.slides[themeKey] || 0;
    fragranceState.slides[themeKey] = (oldIndex + step + theme.images.length) % theme.images.length;
    replaceFragranceGallery(themeKey);
  });

  // The main script rendered once before this extension loaded. Render again so
  // the uploaded collection assets and custom fragrance gallery appear at once.
  render();
})();


/* ===== Ambient colour hooks ===== */

"use strict";

/*
  Ambient colour hooks — filter-only edition
  ------------------------------------------
  The calendar decides the current day type. This script only applies the matching
  class to the homepage so CSS can grade the original uploaded video differently
  for sea / cloud / lake / sky. It never replaces or duplicates the source video.
*/

(function () {
  var DAY_TYPES = ["sea", "cloud", "lake", "sky"];
  var appNode = document.querySelector("#app");
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  var themeColors = {
    sea: "#06172a",
    cloud: "#111b26",
    lake: "#0a1a22",
    sky: "#0b1b30"
  };

  function getCurrentAmbientType() {
    try {
      return ambientTypeForDate(selectedDate());
    } catch (_) {
      return null;
    }
  }

  function clearDayClasses(node) {
    DAY_TYPES.forEach(function (type) {
      if (node) node.classList.remove("ambient-day-" + type);
      document.body.classList.remove("ambient-day-" + type);
    });
  }

  function applyAmbientColour() {
    var home = document.querySelector(".home-view");

    if (!home) {
      clearDayClasses(null);
      if (themeMeta) themeMeta.setAttribute("content", "#f4f3ee");
      return;
    }

    var type = getCurrentAmbientType();
    if (!type || DAY_TYPES.indexOf(type) < 0) type = "sky";

    clearDayClasses(home);
    home.classList.add("ambient-day-" + type);
    document.body.classList.add("ambient-day-" + type);

    var field = home.querySelector(".ambient-field");
    if (field) field.dataset.ambientType = type;

    if (themeMeta) themeMeta.setAttribute("content", themeColors[type] || "#080a09");
  }

  if (appNode && "MutationObserver" in window) {
    var scheduled = false;
    var observer = new MutationObserver(function () {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(function () {
        scheduled = false;
        applyAmbientColour();
      });
    });

    observer.observe(appNode, { childList: true, subtree: true });
  }

  applyAmbientColour();
})();


/* ===== Mobile video compatibility ===== */

"use strict";

/*
  Calendar video compatibility
  ----------------------------
  iOS Safari is much more reliable with H.264 MP4 than arbitrary WebM encodes.
  The repository keeps the original WebM files untouched; a GitHub Action creates
  same-name .mp4 fallbacks. iPhone / iPad prefer the MP4, while other browsers can
  continue to use the original WebM first.
*/

(function () {
  var ua = navigator.userAgent || "";
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  /* Replace the renderer used by script.js before site-patches.js re-renders. */
  ambientMedia = function (date, type, entry) {
    if (!entry || !entry.src) {
      return '<div class="ambient-empty ambient-empty-' + type + '" aria-hidden="true"></div>';
    }

    var webm = entry.src;
    var mp4 = entry.mp4 || webm.replace(/\.webm(?:\?.*)?$/i, ".mp4");
    var poster = entry.poster ? ' poster="' + escapeHtml(entry.poster) + '"' : "";
    var sources = isIOS
      ? '<source src="' + escapeHtml(mp4) + '" type="video/mp4">' +
        '<source src="' + escapeHtml(webm) + '" type="video/webm">'
      : '<source src="' + escapeHtml(webm) + '" type="video/webm">' +
        '<source src="' + escapeHtml(mp4) + '" type="video/mp4">';

    return '<video class="ambient-video" autoplay muted playsinline webkit-playsinline loop preload="auto"' + poster + '>' +
      sources +
    '</video>';
  };

  function prepare(video) {
    if (!video || video.dataset.mobilePrepared === "1") return;
    video.dataset.mobilePrepared = "1";
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    var tryPlay = function () {
      if (!video.isConnected) return;
      var promise = video.play();
      if (promise && typeof promise.catch === "function") promise.catch(function () {});
    };

    if (video.readyState >= 2) tryPlay();
    video.addEventListener("loadeddata", tryPlay, { once: true });
    video.addEventListener("canplay", tryPlay, { once: true });

    /* Safari sometimes needs playback retried after the first real page gesture. */
    ["touchstart", "pointerdown", "click"].forEach(function (name) {
      document.addEventListener(name, tryPlay, { once: true, passive: true });
    });
  }

  function prepareAll() {
    document.querySelectorAll(".ambient-video").forEach(prepare);
  }

  var app = document.querySelector("#app");
  if (app && "MutationObserver" in window) {
    new MutationObserver(function () {
      requestAnimationFrame(prepareAll);
    }).observe(app, { childList: true, subtree: true });
  }

  window.addEventListener("pageshow", prepareAll);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) prepareAll();
  });

  requestAnimationFrame(prepareAll);
})();


/* ===== Site refinements ===== */

"use strict";

/*
  Small site-level refinements that sit on top of the main renderer.
  - keeps works and collections in separate navigation loops
  - points the old root work images to their new /works/ folders
  - restores Fictional Topography as the third work
  - repairs iOS calendar playback with Safari-safe H.264 MP4 fallbacks
  - keeps every collection on the same generated after-image field
*/

(function () {
  function findBySlug(list, slug) {
    return list.find(function (item) { return item.slug === slug; });
  }

  var folly = findBySlug(works, "ruin-garden");
  if (folly) {
    folly.images = [
      {
        src: "./works/ruin-garden/img1-blur.jpg",
        caption: { zh: "现场记录 01", en: "site record 01", ja: "現場記録 01" }
      },
      {
        src: "./works/ruin-garden/img2-blur.jpg",
        caption: { zh: "现场记录 02", en: "site record 02", ja: "現場記録 02" }
      }
    ];
  }

  var instrument = findBySlug(works, "the-instrument");
  if (instrument) {
    instrument.images = [
      {
        src: "./works/the-instrument/the-instrument-2/ship-in-klein-bottle-1.jpg",
        caption: { zh: "仪器试作 01", en: "instrument study 01", ja: "器械試作 01" }
      },
      {
        src: "./works/the-instrument/the-instrument-2/ship-in-klein-bottle-2.jpg",
        caption: { zh: "仪器试作 02", en: "instrument study 02", ja: "器械試作 02" }
      }
    ];
  }

  if (!findBySlug(works, "fictional-topography")) {
    var fictionalTopography = {
      slug: "fictional-topography",
      group: "work",
      title: {
        zh: "虚构地形学",
        en: "Fictional Topography",
        ja: "架空地形学"
      },
      intro: {
        zh: "这里的地图不负责复原世界，而负责收留遗漏之物。地点被发现、命名、记录，再以图像、声音与文本进入《墟域图·遗构馆》，成为一片不断改写自身的地理。",
        en: "These maps do not restore the world; they shelter what it leaves out. Sites are found, named and recorded, then enter the Atlas of Ruins through image, sound and text—an unfinished geography rewriting itself.",
        ja: "この地図は世界を復元するためではなく、こぼれ落ちたものを収めるためにある。場所は発見され、名づけられ、記録され、像・音・言葉として《墟域図・遺構館》へ入り、自らを書き換え続ける地理となる。"
      },
      images: [
        {
          src: "./works/fictional-topography/img5-blur.jpg",
          caption: { zh: "地形记录 01", en: "terrain record 01", ja: "地形記録 01" }
        },
        {
          src: "./works/fictional-topography/img6-blur.jpg",
          caption: { zh: "地形记录 02", en: "terrain record 02", ja: "地形記録 02" }
        }
      ]
    };

    works.push(fictionalTopography);
    rooms.splice(2, 0, fictionalTopography);
  }

  function nextWithinGroup(item) {
    var list = item && item.group === "collection" ? collections : item && item.group === "writing" ? writings : works;
    // Retain Fictional Topography in the index, but never send a visitor
    // to its unfinished page via the footer's next-work navigation.
    list = list.filter(function(entry) { return entry.slug !== "fictional-topography"; });
    if (!list.length) return null;
    var index = list.findIndex(function (candidate) { return candidate.slug === item.slug; });
    if (index < 0) return list[0];
    return list[(index + 1) % list.length];
  }

  function updateFooterNavigation(item) {
    var footerButton = document.querySelector(".room-footer [data-action='route']");
    var next = nextWithinGroup(item);
    if (!footerButton || !next) return;

    footerButton.dataset.route = next.slug;

    if (footerButton.dataset.groupNext !== next.slug) {
      footerButton.dataset.groupNext = next.slug;
      footerButton.innerHTML = escapeHtml(localised(next.title)) + '<span aria-hidden="true"> →︎</span>';
    }
  }

  function isIOSLike() {
    var ua = navigator.userAgent || "";
    var classicIOS = /iPad|iPhone|iPod/.test(ua);
    var touchIPad = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    return classicIOS || touchIPad;
  }

  function tryPlayVideo(video) {
    if (!video || !document.documentElement.contains(video)) return;
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    var promise;
    try {
      promise = video.play();
    } catch (_) {
      return;
    }
    if (promise && typeof promise.catch === "function") {
      promise.catch(function () {});
    }
  }

  function repairAmbientCalendarVideo() {
    var video = document.querySelector(".home-view .ambient-video");
    if (!video) return;

    var source = video.dataset.originalWebm || video.getAttribute("src") || "";
    if (!source) return;

    if (!video.dataset.originalWebm) video.dataset.originalWebm = source;

    /*
      Diagnostic result: the uploaded WebM is VP9 Profile 2, 10-bit yuv420p10le.
      iPhone Safari can expose WebM support while still failing on this profile.
      On iOS we therefore bypass WebM completely and request the matched H.264 MP4.
    */
    if (isIOSLike() && /\.webm(?:$|\?)/i.test(source)) {
      var mp4 = source.replace(/\.webm(?:\?.*)?$/i, ".mp4");
      if (video.dataset.mobileMp4 !== mp4) {
        video.dataset.mobileMp4 = mp4;
        video.pause();
        video.removeAttribute("src");
        video.src = mp4;
        video.preload = "auto";
        video.load();
      }
    }

    if (video.dataset.playbackWired !== "1") {
      video.dataset.playbackWired = "1";

      video.addEventListener("loadeddata", function () {
        video.classList.add("is-ready");
        tryPlayVideo(video);
      });
      video.addEventListener("canplay", function () {
        video.classList.add("is-ready");
        tryPlayVideo(video);
      });
      video.addEventListener("playing", function () {
        video.classList.add("is-playing");
        document.documentElement.dataset.ambientVideo = "playing";
      });
      video.addEventListener("error", function () {
        document.documentElement.dataset.ambientVideo = "error";
      });
    }

    tryPlayVideo(video);
  }


  var ruinMiniLeafletPromise = null;
  var ruinMiniSitesPromise = null;
  var ruinMiniMapInstance = null;
  var ruinMiniMountToken = 0;
  var ruinMiniParallaxCleanup = null;
  var ruinMiniIndexFilterCleanup = null;

  var RUIN_MINI_TONE_STEPS = [0, 22, 45, 60, 100];
  var RUIN_MINI_TONE_KEY = "ruin-reader-tone";
  var RUIN_MINI_WARM_POINT = 45;
  var RUIN_MINI_PALETTES = {
    paper: {
      bg: [255, 255, 251], paper: [255, 255, 251], text: [28, 28, 26],
      muted: [103, 103, 97], line: [205, 205, 197], lineStrong: [102, 102, 96], marker: [17, 17, 17]
    },
    warm: {
      bg: [235, 227, 209], paper: [243, 235, 218], text: [50, 47, 42],
      muted: [103, 96, 84], line: [193, 183, 161], lineStrong: [112, 105, 91], marker: [57, 52, 44]
    },
    night: {
      bg: [25, 26, 24], paper: [31, 32, 30], text: [204, 201, 191],
      muted: [143, 141, 133], line: [66, 67, 62], lineStrong: [121, 120, 112], marker: [202, 199, 188]
    }
  };

  var RUIN_MINI_FALLBACK_SITES = [
    { name: "瘟猪坝沉墟", lat: 30.454417, lng: 104.047667, archiveDate: "2025.04", type: "garden" },
    { name: "电台路焦土", lat: 31.225833, lng: 121.618333, archiveDate: "2026.03", type: "garden" },
    { name: "山葬灰脉", lat: 32.04174, lng: 119.83912, archiveDate: "2017.08", type: "record" },
    { name: "硅脉遗厂", lat: 31.1936472, lng: 121.6131444, archiveDate: "2018.05", type: "record" },
    { name: "裂翼坪", lat: 41.860278, lng: -87.606111, archiveDate: "2021.08", type: "record" },
    { name: "钟寂残堂", lat: 41.7874631760, lng: -87.6333067890, archiveDate: "2022.11", type: "record" },
    { name: "池骸湾", lat: 37.78060, lng: -122.51370, archiveDate: "2023.08", type: "record" },
    { name: "褶层湾", lat: 47.1808, lng: -122.5537, archiveDate: "2023.12", type: "record" },
    { name: "隐染悬里", lat: 37.4543556, lng: 141.0370611, archiveDate: "2024.01", type: "record" }
  ];

  function ruinMiniClamp(value, min, max) {
    return Math.max(min, Math.min(max, Number(value) || 0));
  }

  function ruinMiniMix(a, b, t) {
    return a + (b - a) * t;
  }

  function ruinMiniMixArray(a, b, t) {
    return a.map(function(value, index) { return ruinMiniMix(value, b[index], t); });
  }

  function ruinMiniInterpolateTone(value, key) {
    var tone = ruinMiniClamp(value, 0, 100);
    if (tone <= RUIN_MINI_WARM_POINT) {
      return ruinMiniMixArray(RUIN_MINI_PALETTES.paper[key], RUIN_MINI_PALETTES.warm[key], tone / RUIN_MINI_WARM_POINT);
    }
    return ruinMiniMixArray(
      RUIN_MINI_PALETTES.warm[key],
      RUIN_MINI_PALETTES.night[key],
      (tone - RUIN_MINI_WARM_POINT) / (100 - RUIN_MINI_WARM_POINT)
    );
  }

  function ruinMiniRgb(values) {
    return "rgb(" + values.slice(0, 3).map(function(value) { return Math.round(value); }).join(", ") + ")";
  }

  function readRuinMiniTone() {
    try {
      var saved = localStorage.getItem(RUIN_MINI_TONE_KEY);
      if (saved !== null && saved !== "") return ruinMiniClamp(saved, 0, 100);
    } catch (_) {}
    return 22;
  }

  function saveRuinMiniTone(value) {
    try { localStorage.setItem(RUIN_MINI_TONE_KEY, String(Math.round(ruinMiniClamp(value, 0, 100)))); } catch (_) {}
  }

  function ensureRuinMiniLeaflet() {
    if (window.L && window.L.map) return Promise.resolve(window.L);
    if (ruinMiniLeafletPromise) return ruinMiniLeafletPromise;

    ruinMiniLeafletPromise = new Promise(function(resolve, reject) {
      if (!document.getElementById("ruin-mini-leaflet-css")) {
        var link = document.createElement("link");
        link.id = "ruin-mini-leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      var existing = document.getElementById("ruin-mini-leaflet-js");
      if (existing) {
        existing.addEventListener("load", function() { resolve(window.L); }, { once: true });
        existing.addEventListener("error", reject, { once: true });
        if (window.L && window.L.map) resolve(window.L);
        return;
      }

      var scriptEl = document.createElement("script");
      scriptEl.id = "ruin-mini-leaflet-js";
      scriptEl.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      scriptEl.onload = function() { resolve(window.L); };
      scriptEl.onerror = reject;
      document.head.appendChild(scriptEl);
    });

    return ruinMiniLeafletPromise;
  }

  function ensureRuinMiniSites() {
    if (Array.isArray(window.sites) && window.sites.length) return Promise.resolve(window.sites);
    if (ruinMiniSitesPromise) return ruinMiniSitesPromise;

    ruinMiniSitesPromise = new Promise(function(resolve) {
      var existing = document.getElementById("ruin-mini-site-data");
      var finish = function() {
        resolve(Array.isArray(window.sites) && window.sites.length ? window.sites : RUIN_MINI_FALLBACK_SITES);
      };

      if (existing) {
        existing.addEventListener("load", finish, { once: true });
        existing.addEventListener("error", finish, { once: true });
        window.setTimeout(finish, 1200);
        return;
      }

      var scriptEl = document.createElement("script");
      scriptEl.id = "ruin-mini-site-data";
      scriptEl.src = "https://ruin-archive.site/data/site-data.js?v=20261003";
      scriptEl.onload = finish;
      scriptEl.onerror = finish;
      document.head.appendChild(scriptEl);
    });

    return ruinMiniSitesPromise;
  }

  function ruinMiniGeoToSvg(lat, lng) {
    var shiftedLng = Number(lng) + 180;
    if (shiftedLng > 180) shiftedLng -= 360;
    var x = (shiftedLng + 180) / 360;
    var y = (Number(lat) + 90) / 180;
    return [y * 3000, x * 4000];
  }

  function ruinMiniEscape(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;");
  }

  function ruinMiniMembraneState(map, tone) {
    var zoom = map.getZoom();
    var ratio = ruinMiniClamp((zoom + 0.20) / 3.15, 0, 1);
    var warmT = Math.min(1, tone / RUIN_MINI_WARM_POINT);
    var nightT = tone <= RUIN_MINI_WARM_POINT ? 0 : Math.min(1, (tone - RUIN_MINI_WARM_POINT) / (100 - RUIN_MINI_WARM_POINT));

    var dynamicBlur = 0.40 + ratio * 2.3;
    var zoomContrast = 1.8 - ratio * 0.8;
    var dynamicContrast = zoomContrast * ruinMiniMix(1, 0.96, warmT) * ruinMiniMix(1, 0.91, nightT);
    var zoomBrightness = 1.02 + ratio * 0.7;
    var dynamicBrightness = zoomBrightness * ruinMiniMix(1, 0.92, warmT) * ruinMiniMix(1, 0.84, nightT);
    var warmSepia = ruinMiniMix(0.33, 0.50, warmT);
    var dynamicSepia = ruinMiniMix(warmSepia, 0.08, nightT);
    var nightInvert = ruinMiniMix(0, 0.88, nightT);
    var zoomInvert = ratio * 0.15;
    var dynamicInvert = nightInvert + ((1 - nightInvert) * zoomInvert);
    var opacity = (1 - ratio * 0.45) * ruinMiniMix(1, 0.94, warmT);

    return {
      filter: "blur(" + dynamicBlur.toFixed(3) + "px) contrast(" + dynamicContrast.toFixed(3) + ") brightness(" + dynamicBrightness.toFixed(3) + ") sepia(" + dynamicSepia.toFixed(3) + ") invert(" + dynamicInvert.toFixed(3) + ")",
      opacity: opacity,
      blend: nightT > 0.12 ? "normal" : ((ratio > 0 || tone > 3) ? "multiply" : "normal")
    };
  }

  function applyRuinMiniTone(shell, map, worldPane, value, persist) {
    var tone = ruinMiniClamp(value, 0, 100);
    var paper = ruinMiniInterpolateTone(tone, "paper");
    var bg = ruinMiniInterpolateTone(tone, "bg");
    var text = ruinMiniInterpolateTone(tone, "text");
    var muted = ruinMiniInterpolateTone(tone, "muted");
    var line = ruinMiniInterpolateTone(tone, "line");
    var lineStrong = ruinMiniInterpolateTone(tone, "lineStrong");
    var marker = ruinMiniInterpolateTone(tone, "marker");

    shell.dataset.tone = String(Math.round(tone));
    shell.style.setProperty("--ruin-mini-bg", ruinMiniRgb(bg));
    shell.style.setProperty("--ruin-mini-paper", ruinMiniRgb(paper));
    shell.style.setProperty("--ruin-mini-text", ruinMiniRgb(text));
    shell.style.setProperty("--ruin-mini-muted", ruinMiniRgb(muted));
    shell.style.setProperty("--ruin-mini-line", ruinMiniRgb(line));
    shell.style.setProperty("--ruin-mini-line-strong", ruinMiniRgb(lineStrong));
    var markerRgb = ruinMiniRgb(marker);
    shell.style.setProperty("--ruin-mini-marker", markerRgb);
    shell.style.setProperty(
      "--ruin-mini-marker-shadow",
      tone >= 60 ? "rgba(255,255,255,.16)" : "rgba(0,0,0,.25)"
    );

    /* Marker dots live in their own unfiltered Leaflet pane. Re-assert the
       resolved colour on every tone change as well: tiny 5–6px divIcons can
       otherwise be lost by mobile Safari during compositing changes. */
    shell.querySelectorAll(".ruin-mini-marker-icon .garden-dot, .ruin-mini-marker-icon .record-dot")
      .forEach(function(dot) {
        dot.style.setProperty("background-color", markerRgb, "important");
        dot.style.setProperty("opacity", "1", "important");
        dot.style.setProperty("filter", "none", "important");
        dot.style.setProperty("mix-blend-mode", "normal", "important");
      });

    if (map && map.getContainer()) map.getContainer().style.background = ruinMiniRgb(paper);
    if (map && worldPane) {
      var membrane = ruinMiniMembraneState(map, tone);
      worldPane.style.filter = membrane.filter;
      worldPane.style.opacity = String(membrane.opacity);
      worldPane.style.mixBlendMode = membrane.blend;
    }

    shell.querySelectorAll(".ruin-mini-tone-button").forEach(function(button) {
      var active = Number(button.dataset.tone) === Number(RUIN_MINI_TONE_STEPS.reduce(function(best, step) {
        return Math.abs(step - tone) < Math.abs(best - tone) ? step : best;
      }, RUIN_MINI_TONE_STEPS[0]));
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-checked", active ? "true" : "false");
    });

    if (persist) saveRuinMiniTone(tone);
  }

  function makeRuinMiniToneControl(L, shell, map, worldPane) {
    var labelsByTone = {
      0: "original",
      22: "soft eye-care",
      45: "eye-care",
      60: "dark",
      100: "night"
    };
    var ToneControl = L.Control.extend({
      options: { position: "topright" },
      onAdd: function() {
        var box = L.DomUtil.create("div", "ruin-mini-tone-control leaflet-bar");
        box.setAttribute("role", "radiogroup");
        box.setAttribute("aria-label", "reading environment");
        RUIN_MINI_TONE_STEPS.forEach(function(tone, index) {
          var button = document.createElement("button");
          button.type = "button";
          button.className = "ruin-mini-tone-button";
          button.dataset.tone = String(tone);
          button.setAttribute("role", "radio");
          button.setAttribute("aria-label", labelsByTone[tone]);
          button.title = labelsByTone[tone];
          button.innerHTML = '<span class="ruin-mini-eclipse ruin-mini-eclipse-' + index + '" aria-hidden="true"></span>';
          button.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            applyRuinMiniTone(shell, map, worldPane, tone, true);
          });
          box.appendChild(button);
        });
        L.DomEvent.disableClickPropagation(box);
        L.DomEvent.disableScrollPropagation(box);
        return box;
      }
    });
    new ToneControl().addTo(map);
  }

  function renderRuinMiniFractureFrame(shell) {
    var host = shell.querySelector(".ruin-mini-fracture-host");
    var mapEl = shell.querySelector(".ruin-mini-map");
    if (!host || !mapEl) return;
    host.innerHTML = "";

    var rect = mapEl.getBoundingClientRect();
    var shellRect = shell.getBoundingClientRect();
    var x0 = rect.left - shellRect.left;
    var y0 = rect.top - shellRect.top;
    var w = rect.width;
    var h = rect.height;
    if (w < 80 || h < 80) return;

    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "ruin-mini-fracture-svg");
    svg.setAttribute("viewBox", "0 0 " + shellRect.width + " " + shellRect.height);

    function path(d, className, opacity) {
      var el = document.createElementNS(svgNS, "path");
      el.setAttribute("d", d);
      el.setAttribute("class", className || "ruin-mini-fracture-line");
      if (opacity != null) el.setAttribute("opacity", String(opacity));
      svg.appendChild(el);
      return el;
    }

    var rand = Math.random;
    var topSide = rand() < 0.5 ? "left" : "right";
    var topT = topSide === "left" ? 0.12 + rand() * 0.20 : 0.68 + rand() * 0.16;
    var topW = 24 + rand() * 28;
    var topD = 7 + rand() * 8;
    var tx = x0 + w * topT;
    var rightY = y0 + h * (0.58 + rand() * 0.24);
    var rightH = 32 + rand() * 34;
    var rightD = 7 + rand() * 8;
    var leftY = y0 + h * (0.30 + rand() * 0.28);
    var leftH = 18 + rand() * 22;
    var leftD = 3 + rand() * 5;

    var border = [
      "M", x0 + 0.5, y0 + 0.5,
      "L", tx - topW * 0.50, y0 + 0.5,
      "L", tx - topW * 0.18, y0 + topD * 0.30,
      "L", tx + topW * 0.04, y0 + topD,
      "L", tx + topW * 0.23, y0 + topD * 0.44,
      "L", tx + topW * 0.50, y0 + 0.5,
      "L", x0 + w - 0.5, y0 + 0.5,
      "L", x0 + w - 0.5, rightY - rightH * 0.50,
      "L", x0 + w - rightD * 0.35, rightY - rightH * 0.21,
      "L", x0 + w - rightD, rightY + rightH * 0.04,
      "L", x0 + w - rightD * 0.42, rightY + rightH * 0.24,
      "L", x0 + w - 0.5, rightY + rightH * 0.50,
      "L", x0 + w - 0.5, y0 + h - 0.5,
      "L", x0 + 0.5, y0 + h - 0.5,
      "L", x0 + 0.5, leftY + leftH * 0.50,
      "L", x0 + leftD * 0.35, leftY + leftH * 0.15,
      "L", x0 + leftD, leftY - leftH * 0.05,
      "L", x0 + leftD * 0.26, leftY - leftH * 0.30,
      "L", x0 + 0.5, leftY - leftH * 0.50,
      "Z"
    ].join(" ");
    path(border, "ruin-mini-fracture-border", 0.94);

    var topTipX = tx + topW * 0.04;
    var topTipY = y0 + topD;
    var topDir = topSide === "left" ? -1 : 1;
    path(
      "M " + topTipX + " " + topTipY +
      " C " + (topTipX + topDir * (18 + rand() * 12)) + " " + (topTipY + 12 + rand() * 7) +
      ", " + (topTipX + topDir * (32 + rand() * 18)) + " " + (topTipY + 25 + rand() * 10) +
      ", " + (topTipX + topDir * (50 + rand() * 24)) + " " + (topTipY + 43 + rand() * 15),
      "ruin-mini-fracture-crack", 0.84
    );
    path(
      "M " + (topTipX + topDir * 31) + " " + (topTipY + 26) +
      " Q " + (topTipX + topDir * 44) + " " + (topTipY + 18) +
      " " + (topTipX + topDir * 58) + " " + (topTipY + 22),
      "ruin-mini-fracture-branch", 0.62
    );

    var rightTipX = x0 + w - rightD;
    var rightTipY = rightY + rightH * 0.04;
    path(
      "M " + rightTipX + " " + rightTipY +
      " C " + (rightTipX - 18 - rand() * 12) + " " + (rightTipY + 7 + rand() * 9) +
      ", " + (rightTipX - 38 - rand() * 18) + " " + (rightTipY + 18 + rand() * 12) +
      ", " + (rightTipX - 66 - rand() * 28) + " " + (rightTipY + 42 + rand() * 20),
      "ruin-mini-fracture-crack", 0.78
    );
    path(
      "M " + (rightTipX - 37) + " " + (rightTipY + 19) +
      " Q " + (rightTipX - 44) + " " + (rightTipY + 38) +
      " " + (rightTipX - 61) + " " + (rightTipY + 49),
      "ruin-mini-fracture-branch", 0.58
    );

    host.appendChild(svg);

    // The map itself loses small edge bites, so the frame is truly broken rather
    // than a decorative crack merely drawn above a rectangular grey card.
    var topA = ((tx - topW * 0.50 - x0) / w * 100).toFixed(2);
    var topB = ((tx + topW * 0.50 - x0) / w * 100).toFixed(2);
    var topMid = ((tx - x0) / w * 100).toFixed(2);
    var rightA = ((rightY - rightH * 0.50 - y0) / h * 100).toFixed(2);
    var rightB = ((rightY + rightH * 0.50 - y0) / h * 100).toFixed(2);
    var rightMid = ((rightY - y0) / h * 100).toFixed(2);
    mapEl.style.clipPath = "polygon(0 0, " + topA + "% 0, " + topMid + "% 1.35%, " + topB + "% 0, 100% 0, 100% " + rightA + "%, 98.7% " + rightMid + "%, 100% " + rightB + "%, 100% 100%, 0 100%)";
  }

  function destroyRuinAtlasMiniMap() {
    ruinMiniMountToken += 1;
    if (ruinMiniParallaxCleanup) {
      ruinMiniParallaxCleanup();
      ruinMiniParallaxCleanup = null;
    }
    if (ruinMiniIndexFilterCleanup) {
      ruinMiniIndexFilterCleanup();
      ruinMiniIndexFilterCleanup = null;
    }
    if (ruinMiniMapInstance) {
      try { ruinMiniMapInstance.remove(); } catch (_) {}
      ruinMiniMapInstance = null;
    }
  }

  function mountRuinAtlasMiniMap(item) {
    if (!item || item.slug !== "ruin-atlas") {
      destroyRuinAtlasMiniMap();
      return;
    }

    var container = document.getElementById("ruin-mini-map");
    var shell = document.querySelector(".ruin-mini-shell");
    if (!container || !shell || container.dataset.mounted === "true") return;
    container.dataset.mounted = "true";
    var token = ++ruinMiniMountToken;

    Promise.all([ensureRuinMiniLeaflet(), ensureRuinMiniSites()]).then(function(results) {
      if (token !== ruinMiniMountToken || !container.isConnected || !shell.isConnected) return;
      var L = results[0];
      var sites = Array.isArray(results[1]) && results[1].length ? results[1] : RUIN_MINI_FALLBACK_SITES;
      if (!L || !L.map) return;

      if (ruinMiniMapInstance) {
        try { ruinMiniMapInstance.remove(); } catch (_) {}
      }

      var map = L.map(container, {
        crs: L.CRS.Simple,
        minZoom: -2.2,
        maxZoom: 3,
        zoomControl: false,
        attributionControl: false,
        zoomSnap: 0.25,
        zoomDelta: 0.5,
        wheelPxPerZoomLevel: 90,
        scrollWheelZoom: false,
        inertia: true,
        maxBoundsViscosity: 0.54
      });
      ruinMiniMapInstance = map;

      var bounds = [[0, 0], [3000, 4000]];
      map.createPane("ruinMiniWorldPane");
      var worldPane = map.getPane("ruinMiniWorldPane");
      worldPane.style.zIndex = "210";
      worldPane.style.pointerEvents = "none";

      /* Markers intentionally stay on Leaflet's native markerPane, exactly as
         on ruin-archive.site. The atlas SVG alone lives in the filtered world
         pane, so marker coordinates and transforms remain Leaflet-native. */
      L.imageOverlay(
        "https://ruin-archive.site/assets/ruin-map.svg?v=20261003",
        bounds,
        { pane: "ruinMiniWorldPane", interactive: false }
      ).addTo(map);

      var miniMarkerEntries = [];

      sites.forEach(function(site) {
        if (!site || !Number.isFinite(Number(site.lat)) || !Number.isFinite(Number(site.lng))) return;

        var isGarden = site.type === "garden";
        var size = isGarden ? 10 : 6;
        var dotClass = isGarden ? "garden-dot" : "record-dot";
        var icon = L.divIcon({
          className: "ruin-mini-marker-icon ruin-marker" + (isGarden ? "" : " ruin-marker-record"),
          html: '<span class="' + dotClass + '"></span>',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2]
        });

        var marker = L.marker(
          ruinMiniGeoToSvg(site.lat, site.lng),
          {
            icon: icon,
            keyboard: false
          }
        ).addTo(map);

        marker.bindTooltip(
          '<span class="ruin-mini-tooltip-name">' + ruinMiniEscape(site.name) + '</span>' +
          (site.archiveDate ? '<span class="ruin-mini-tooltip-date">' + ruinMiniEscape(site.archiveDate) + '</span>' : ''),
          { direction: "top", offset: [0, -7], opacity: 1, className: "ruin-mini-tooltip" }
        );

        var tags = String(
          window.siteTagsMapping && window.siteTagsMapping[site.name] || ""
        ).split(",").map(function(tag) { return tag.trim(); }).filter(Boolean);

        miniMarkerEntries.push({ marker: marker, site: site, tags: tags });
      });

      function applyMiniIndexFilter(event) {
        var activeTags = Array.isArray(event && event.detail && event.detail.tags)
          ? event.detail.tags.map(String).map(function(tag) { return tag.trim(); }).filter(Boolean)
          : [];

        miniMarkerEntries.forEach(function(entry) {
          var visible = activeTags.length === 0 ||
            activeTags.every(function(tag) { return entry.tags.indexOf(tag) !== -1; });

          entry.marker.setOpacity(visible ? 1 : 0);
          var markerEl = entry.marker.getElement();
          if (markerEl) {
            markerEl.style.display = visible ? "" : "none";
            markerEl.style.pointerEvents = visible ? "" : "none";
          }
        });
      }

      shell.addEventListener("ruin-mini-index-filter", applyMiniIndexFilter);
      ruinMiniIndexFilterCleanup = function() {
        shell.removeEventListener("ruin-mini-index-filter", applyMiniIndexFilter);
      };

      /* Mirror ruin-archive.site exactly: once zoom passes 0, all markers
         progressively fade as the view magnifies, reaching 30% opacity at
         maxZoom 3. This is applied to Leaflet's native markerPane so every
         marker fades together without changing its individual position or
         index-filter state. */
      var markerOpacityRaf = 0;

      function updateRuinMiniMarkerOpacity() {
        if (markerOpacityRaf) return;

        markerOpacityRaf = requestAnimationFrame(function() {
          markerOpacityRaf = 0;
          if (!shell.isConnected || token !== ruinMiniMountToken) return;

          var currentZoom = map.getZoom();
          var triggerZoom = 0;
          var maxZoom = 3;
          var targetOpacity = 1;

          if (currentZoom > triggerZoom) {
            var ratio = (currentZoom - triggerZoom) / (maxZoom - triggerZoom);
            targetOpacity = 1 - (ratio * 0.7);
          }

          targetOpacity = Math.max(0.3, targetOpacity);

          var markerPane = map.getPane("markerPane");
          if (markerPane) {
            var nextOpacity = String(targetOpacity);
            if (markerPane.style.opacity !== nextOpacity) {
              markerPane.style.opacity = nextOpacity;
            }
          }
        });
      }

      map.on("zoom", updateRuinMiniMarkerOpacity);
      updateRuinMiniMarkerOpacity();

      var initialTone = readRuinMiniTone();
      makeRuinMiniToneControl(L, shell, map, worldPane);
      applyRuinMiniTone(shell, map, worldPane, initialTone, false);

      map.on("zoomend", function() {
        applyRuinMiniTone(shell, map, worldPane, Number(shell.dataset.tone || initialTone), false);
      });
      map.on("movestart", function() { shell.classList.add("is-navigating"); });
      map.on("moveend", function() { shell.classList.remove("is-navigating"); });

      map.fitBounds(bounds, { padding: [20, 20], animate: false });
      map.setMaxBounds([[-520, -800], [3520, 4800]]);
      applyRuinMiniTone(shell, map, worldPane, initialTone, false);

      if (ruinMiniParallaxCleanup) {
        ruinMiniParallaxCleanup();
        ruinMiniParallaxCleanup = null;
      }

      var roomScroll = shell.closest(".room-scroll");
      var parallaxRaf = 0;
      var parallaxApplied = 0;
      var startupFlyActive = false;
      var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      function applyRuinMiniParallax() {
        parallaxRaf = 0;
        if (!roomScroll || !shell.isConnected || token !== ruinMiniMountToken || startupFlyActive) return;

        var shellRect = shell.getBoundingClientRect();
        var scrollRect = roomScroll.getBoundingClientRect();
        var contentCenter = shellRect.top - scrollRect.top + roomScroll.scrollTop + shellRect.height * 0.5;
        var centerScroll = contentCenter - roomScroll.clientHeight * 0.5;

        /* The map behaves like a distant landscape behind the moving frame.
           This is deliberately stronger than the earlier pass so the reverse
           drift remains legible even after the miniature itself is reduced. */
        var target = ruinMiniClamp((roomScroll.scrollTop - centerScroll) * 0.22, -155, 155);
        var delta = target - parallaxApplied;

        if (Math.abs(delta) > 0.02) {
          map.panBy([0, -delta], { animate: false });
          parallaxApplied = target;
        }
      }

      function scheduleRuinMiniParallax() {
        if (parallaxRaf) return;
        parallaxRaf = requestAnimationFrame(applyRuinMiniParallax);
      }

      if (roomScroll && !reducedMotion) {
        roomScroll.addEventListener("scroll", scheduleRuinMiniParallax, { passive: true });
        ruinMiniParallaxCleanup = function() {
          roomScroll.removeEventListener("scroll", scheduleRuinMiniParallax);
          if (parallaxRaf) cancelAnimationFrame(parallaxRaf);
          parallaxRaf = 0;
        };
      }

      /* Port the authored startup movement from ruin-archive.site:
         fit the complete 4000×3000 atlas first, then fly 377 units upward and
         410 units left, adding only +0.65 zoom on desktop (+0.35 compact)
         over five seconds. This replaces the previous static +2 zoom. */
      var startupCenter = map.getCenter();
      var startupZoomDelta = window.innerWidth <= 760 ? 0.35 : 0.65;
      var startupTarget = [
        startupCenter.lat + 377,
        startupCenter.lng - 410
      ];
      var startupTargetZoom = Math.min(map.getMaxZoom(), map.getZoom() + startupZoomDelta);

      if (reducedMotion) {
        map.setView(startupTarget, startupTargetZoom, { animate: false });
      } else {
        startupFlyActive = true;
        var startupFlyFinished = false;

        function finishStartupFly() {
          if (startupFlyFinished) return;
          startupFlyFinished = true;
          startupFlyActive = false;
          try { map.off("moveend", finishStartupFly); } catch (_) {}
          parallaxApplied = 0;
          requestAnimationFrame(applyRuinMiniParallax);
        }

        map.on("moveend", finishStartupFly);
        requestAnimationFrame(function() {
          if (!shell.isConnected || token !== ruinMiniMountToken) return;
          map.flyTo(startupTarget, startupTargetZoom, {
            animate: true,
            duration: 5
          });
        });
        window.setTimeout(finishStartupFly, 5400);
      }

      if (roomScroll && !reducedMotion) {
        requestAnimationFrame(function() {
          if (!startupFlyActive) applyRuinMiniParallax();
        });
      }

      requestAnimationFrame(function() {
        if (!container.isConnected) return;
        map.invalidateSize(false);
        renderRuinMiniFractureFrame(shell);
      });

      var resizeTimer = 0;
      var onResize = function() {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(function() {
          if (!shell.isConnected || token !== ruinMiniMountToken) {
            window.removeEventListener("resize", onResize);
            return;
          }
          map.invalidateSize(false);
          renderRuinMiniFractureFrame(shell);
        }, 100);
      };
      window.addEventListener("resize", onResize, { passive: true });
    }).catch(function() {
      container.dataset.mounted = "error";
      container.innerHTML = '<p class="ruin-mini-load-error">map temporarily unavailable</p>';
      renderRuinMiniFractureFrame(shell);
    });
  }



  /* ==========================================================================
     Mini Ruin Archive · archive-doc subsystem
     --------------------------------------------------------------------------
     This is a scoped, scaled port of the uploaded ruin-archive archive-doc
     system: real document elements, the 23-sheet sliding record fan, compressed
     top/bottom records, the right Folly stack, sparse paper misregistration,
     clipped/cut sheet contours, extraction, and smooth retraction.
     ========================================================================== */
  var ruinMiniArchiveCleanup = null;
  var ruinMiniArchiveMountToken = 0;

  var RUIN_MINI_ARCHIVE_COMBINED_GROUPS = [
    { id: "monastic-retreat-pair", memberNames: ["山融灶垣", "崖隐蚀垣"] },
    { id: "fukushima-solastalgia-pair", memberNames: ["隐染悬里", "雾蚀空庐"] }
  ];

  var RUIN_MINI_ARCHIVE_THUMBNAILS = {
    "瘟猪坝沉墟": "effluent-sedimentation.webp",
    "电台路焦土": "aether-scorched-earth.webp",
    "山葬灰脉": "yellow-mountain.webp",
    "硅脉遗厂": "silicon-vein-works.webp",
    "琉棘庭": "walled-gallery.webp",
    "裂翼坪": "fallen-wing-field.webp",
    "轨畔孤构": "rail-side.webp",
    "残柱林": "concrete-pole.webp",
    "钟寂残堂": "bell-silent-church.webp",
    "池骸湾": "bath-crack.webp",
    "毒烬轮冢": "toxic-tire-pyre.webp",
    "褶层湾": "quarry-bay-stairway.webp",
    "隐染悬里": "suspended-homeland.webp",
    "雾蚀空庐": "mist-eroded-hut.webp",
    "锈祷圣堂": "rust-prayer-sanctuary.webp",
    "釉骸拓壁": "membrane.webp",
    "叠骸构阵": "fish-mouth.webp",
    "苔网塬": "gloss-veil.webp",
    "陆坞舰骸": "brick-battleship.webp",
    "墟响厅": "mirror.webp",
    "波蚀脊堤": "wave-eroded-structure.webp",
    "曜原驿": "solar.webp",
    "溶境遗廊": "aquarium-bunker.webp",
    "荒娱敖包": "mountain-signal.webp",
    "彩壳堡": "castle.webp",
    "削岩残居": "roof.webp",
    "隐阶空墅": "hidden-stair-villa.webp",
    "暮辉骸殿": "afterglow-palace.webp",
    "迁痕空埠": "dock.webp",
    "山骸窟殿": "phospho.webp",
    "山融灶垣": "earthwall.webp",
    "崖隐蚀垣": "cliff-granary.webp",
    "褶脊胚庭": "compressed-courtyard.webp",
    "草间稚居": "grass-child-dwelling.webp"
  };

  function ruinMiniArchiveBuildRecordEntries(recordSites) {
    var byName = new Map(recordSites.map(function(site) { return [site.name, site]; }));
    var grouped = new Set();
    var groupByName = new Map();

    RUIN_MINI_ARCHIVE_COMBINED_GROUPS.forEach(function(group) {
      group.memberNames.forEach(function(name) { groupByName.set(name, group); });
    });

    var entries = [];
    recordSites.forEach(function(site) {
      if (!site || grouped.has(site.name)) return;
      var group = groupByName.get(site.name);
      if (group) {
        var members = group.memberNames.map(function(name) { return byName.get(name); }).filter(Boolean);
        if (members.length > 1) {
          entries.push({ isGroup: true, group: group, sites: members });
          members.forEach(function(member) { grouped.add(member.name); });
          return;
        }
      }
      entries.push({ isGroup: false, group: null, sites: [site] });
      grouped.add(site.name);
    });
    return entries;
  }

  function ruinMiniArchiveSparseJitter(total, magnitudes, probability) {
    var values = Array(total).fill(0);
    if (!total) return values;
    var target = Math.min(total, Math.max(1, Math.round(total * probability)));
    var pool = Array.from({ length: total }, function(_, i) { return i; });
    for (var i = pool.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var held = pool[i]; pool[i] = pool[j]; pool[j] = held;
    }

    var chosen = [];
    pool.forEach(function(index) {
      if (chosen.length >= target) return;
      if (chosen.some(function(other) { return Math.abs(other - index) <= 1; })) return;
      chosen.push(index);
    });
    pool.forEach(function(index) {
      if (chosen.length < target && chosen.indexOf(index) === -1) chosen.push(index);
    });

    chosen.forEach(function(index, order) {
      var mag = magnitudes[(order + Math.floor(Math.random() * magnitudes.length)) % magnitudes.length];
      var sign = Math.random() < 0.58 ? -1 : 1;
      values[index] = Number((sign * mag).toFixed(1));
    });
    return values;
  }

  function ruinMiniArchiveDms(value, positive, negative) {
    var n = Number(value) || 0;
    var abs = Math.abs(n);
    var deg = Math.floor(abs);
    var minutesFloat = (abs - deg) * 60;
    var min = Math.floor(minutesFloat);
    var sec = ((minutesFloat - min) * 60).toFixed(1);
    return deg + "°" + String(min).padStart(2, "0") + "′" + String(sec).padStart(4, "0") + "″" + (n >= 0 ? positive : negative);
  }

  function ruinMiniArchiveCoord(site) {
    return ruinMiniArchiveDms(site.lat, "N", "S") + " " + ruinMiniArchiveDms(site.lng, "E", "W");
  }

  function ruinMiniArchiveCopy() {
    var lang = state.lang;
    if (lang === "en") {
      return { record: "Record", garden: "Folly", archive: "archive", recorder: "Recorder", creator: "Ruinwright", nav: "OPEN ORIGINAL ⌖" };
    }
    if (lang === "ja") {
      return { record: "遺構録", garden: "フォリー", archive: "記録", recorder: "記録者", creator: "墟構師", nav: "原版を開く ⌖" };
    }
    return { record: "遗构录", garden: "废墟园林", archive: "归档", recorder: "记录者", creator: "墟构师", nav: "打开原站 ⌖" };
  }

  function destroyRuinArchiveMiniSystem() {
    ruinMiniArchiveMountToken += 1;
    if (typeof ruinMiniArchiveCleanup === "function") {
      try { ruinMiniArchiveCleanup(); } catch (_) {}
    }
    ruinMiniArchiveCleanup = null;
  }

  function mountRuinArchiveMiniSystem(item) {
    if (!item || item.slug !== "ruin-atlas") {
      destroyRuinArchiveMiniSystem();
      return;
    }

    var system = document.getElementById("ruin-mini-archive-system");
    var recordStack = document.getElementById("ruin-mini-stack-record");
    var gardenStack = document.getElementById("ruin-mini-stack-garden");
    var indexDrawer = document.getElementById("ruin-mini-index-drawer");
    if (!system || !recordStack || !gardenStack || !indexDrawer || system.dataset.mounted === "true") return;

    destroyRuinArchiveMiniSystem();
    system.dataset.mounted = "true";
    var token = ++ruinMiniArchiveMountToken;

    ensureRuinMiniSites().then(function(loadedSites) {
      if (token !== ruinMiniArchiveMountToken || !system.isConnected) return;

      var sites = Array.isArray(loadedSites) && loadedSites.length ? loadedSites : RUIN_MINI_FALLBACK_SITES;
      var allGarden = sites.filter(function(site) { return site && site.type === "garden"; });
      var allRecordEntries = ruinMiniArchiveBuildRecordEntries(
        sites.filter(function(site) { return site && site.type !== "garden"; })
      );

      function sampleEvenly(list, count, repeat) {
        if (!list.length) return [];
        if (list.length >= count) {
          if (count === 1) return [list[0]];
          return Array.from({ length: count }, function(_, i) {
            var idx = Math.round(i * (list.length - 1) / (count - 1));
            return list[idx];
          });
        }
        if (!repeat) return list.slice();
        return Array.from({ length: count }, function(_, i) { return list[i % list.length]; });
      }

      // Exactly the reduced visual population requested for this portfolio miniature.
      var recordEntries = sampleEvenly(allRecordEntries, 9, false);
      var gardenSites = sampleEvenly(allGarden, 5, true);

      var scale = 1;
      var selectedTags = new Set();
      var cleanupTimers = [];
      var fractureIteration = (Date.now() ^ Math.floor(Math.random() * 0x7fffffff)) >>> 0;
      var archiveDamagePlan = { record: new Map(), garden: new Map() };

      function currentScale() {
        return Math.max(0.26, Math.min(0.84, system.clientHeight / 900));
      }

      function setGeometryVariables() {
        scale = currentScale();
        var systemWidth = Math.max(1, system.clientWidth);
        var leftRailWidth = systemWidth * 0.195;
        var rightRailWidth = systemWidth * 0.115;

        system.style.setProperty("--mini-archive-scale", scale.toFixed(4));
        system.style.setProperty("--mini-record-doc-w", Math.max(42, leftRailWidth * 0.96).toFixed(2) + "px");
        system.style.setProperty("--mini-garden-doc-w", Math.max(36, rightRailWidth * 0.97).toFixed(2) + "px");
        system.style.setProperty("--mini-record-doc-h", (640 * scale).toFixed(2) + "px");
        system.style.setProperty("--mini-garden-doc-h", (505 * scale).toFixed(2) + "px");
        system.style.setProperty("--mini-record-stack-w", leftRailWidth.toFixed(2) + "px");
        system.style.setProperty("--mini-garden-stack-w", rightRailWidth.toFixed(2) + "px");
        system.style.setProperty("--mini-record-left", "0px");
        system.style.setProperty("--mini-garden-right", "0px");
        system.style.setProperty("--mini-garden-bottom", (355 * scale).toFixed(2) + "px");
        system.style.setProperty("--mini-record-extract-x", (190 * scale).toFixed(2) + "px");
        system.style.setProperty("--mini-garden-extract-x", (-205 * scale).toFixed(2) + "px");
        system.style.setProperty("--mini-garden-extract-top", (-255 * scale).toFixed(2) + "px");
        system.style.setProperty("--mini-record-extract-top", (300 * scale).toFixed(2) + "px");
      }

      function tagsForSites(entrySites) {
        var tags = new Set();
        entrySites.forEach(function(site) {
          String(window.siteTagsMapping && window.siteTagsMapping[site.name] || "")
            .split(",")
            .map(function(tag) { return tag.trim(); })
            .filter(Boolean)
            .forEach(function(tag) { tags.add(tag); });
        });
        return Array.from(tags);
      }

      function makeDoc(entry, visualIndex, isGarden) {
        var entrySites = isGarden ? [entry] : entry.sites;
        var doc = document.createElement("div");
        doc.className = "ruin-mini-archive-doc archive-doc archive-cut-doc" + (isGarden ? " garden-archive-doc" : "");
        doc.dataset.isGarden = isGarden ? "1" : "0";
        doc.dataset.visualIndex = String(visualIndex);
        doc.dataset.tags = tagsForSites(entrySites).join(",");
        doc.setAttribute("aria-hidden", "true");
        return doc;
      }

      function seededRandom(seed) {
        var x = seed >>> 0;
        return function() {
          x += 0x6D2B79F5;
          var t = x;
          t = Math.imul(t ^ (t >>> 15), t | 1);
          t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
          return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
      }


      function syncMiniSourceStoneMask(geom) {
        if (!geom || !Array.isArray(geom.cells) || !geom.cells.length || !indexDrawer.isConnected) return;

        var drawerRect=indexDrawer.getBoundingClientRect();
        if(drawerRect.width<20||drawerRect.height<20) return;
        if(Math.abs((Number(geom.width)||0)-drawerRect.width)>4) return;

        var polygons=geom.cells.map(function(cell){
          var pts=(cell.points||[]).map(function(p){
            return Number(p.x).toFixed(2)+","+Number(p.y).toFixed(2);
          }).join(" ");
          return '<polygon points="'+pts+'" fill="white"/>';
        }).join("");

        var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+
          Number(geom.width).toFixed(2)+' '+Number(geom.height).toFixed(2)+
          '" preserveAspectRatio="none">'+polygons+'</svg>';
        var maskUrl='url("data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)+'")';
        indexDrawer.style.setProperty("--mini-index-stone-mask",maskUrl);

        function applySharedMask(el){
          if(!el) return;
          var rect=el.getBoundingClientRect();
          if(rect.width<2||rect.height<2) return;
          var x=rect.left-drawerRect.left;
          var y=rect.top-drawerRect.top;
          el.style.setProperty("-webkit-mask-image",maskUrl);
          el.style.setProperty("mask-image",maskUrl);
          el.style.setProperty("-webkit-mask-size",Number(geom.width).toFixed(2)+"px "+Number(geom.height).toFixed(2)+"px");
          el.style.setProperty("mask-size",Number(geom.width).toFixed(2)+"px "+Number(geom.height).toFixed(2)+"px");
          el.style.setProperty("-webkit-mask-position",(-x).toFixed(2)+"px "+(-y).toFixed(2)+"px");
          el.style.setProperty("mask-position",(-x).toFixed(2)+"px "+(-y).toFixed(2)+"px");
          el.style.setProperty("-webkit-mask-repeat","no-repeat");
          el.style.setProperty("mask-repeat","no-repeat");
        }

        applySharedMask(indexDrawer.querySelector(".ruin-mini-stele-copy"));
      }

      var onMiniStoneGeometry=function(event){
        syncMiniSourceStoneMask(event&&event.detail ? event.detail : window.__indexStoneFragmentGeometry);
      };
      window.addEventListener("index-stone-geometry-ready",onMiniStoneGeometry);

      function syncMiniIndexDrawerBaseline() {
        var shellHeight = system.clientHeight || 0;
        if (!shellHeight) return;
        var exactHandleH = shellHeight * (95 / 820);
        indexDrawer.style.setProperty("--mini-index-handle-h",exactHandleH.toFixed(2)+"px");
      }

      function renderMiniIndexStone() {
        syncMiniIndexDrawerBaseline();
        if(typeof window.installRuinMiniStoneFragments==="function"){
          window.installRuinMiniStoneFragments();
        }
        if(typeof window.ensureIndexStoneFragmentsReady==="function"){
          window.ensureIndexStoneFragmentsReady();
        }
        if(window.__indexStoneFragmentGeometry){
          syncMiniSourceStoneMask(window.__indexStoneFragmentGeometry);
        }
      }

      function rebuildArchiveDamagePlan() {
        archiveDamagePlan = { record: new Map(), garden: new Map() };

        function put(map,index,damage){
          if(index < 0) return;
          map.set(index,damage);
        }

        function cluster(count,isRecord){
          if(count <= 0) return;
          var rand = seededRandom(hashString(
            "mini-archive-cluster-v1:" + fractureIteration + ":" + (isRecord ? "record" : "garden")
          ));
          var map = isRecord ? archiveDamagePlan.record : archiveDamagePlan.garden;
          var indices;
          if(count >= 3){
            var center = 1 + Math.floor(rand() * (count - 2));
            indices = [center-1,center,center+1];
          } else {
            indices = Array.from({length:count},function(_,i){return i;});
          }

          // Port the source bias: left/record stack breaks mostly on its right
          // edge; garden is more evenly distributed across top/left/right.
          var roll=rand();
          var side=isRecord
            ? (roll<.20 ? "top" : (roll<.32 ? "left" : "right"))
            : (roll<.36 ? "top" : (roll<.68 ? "left" : "right"));
          var sharedT=isRecord ? .20+rand()*.30 : .24+rand()*.52;
          var baseWidth=side==="top" ? 14+rand()*10 : 15+rand()*12;
          var baseDepth=side==="top" ? 3.2+rand()*2.0 : 2.8+rand()*1.8;
          var scales=indices.length===3 ? [.66,1,.72] : indices.length===2 ? [1,.72] : [1];

          indices.forEach(function(index,i){
            var sc=scales[i]||.72;
            put(map,index,{
              side:side,
              t:Math.max(.14,Math.min(.84,sharedT+(rand()-.5)*.045)),
              width:baseWidth*(.84+sc*.36),
              depth:baseDepth*(.76+sc*.34)
            });
          });

          // One or two isolated shallow chips keep the stack from becoming a
          // perfectly repeated triplet, matching the source wear system.
          var extras = count >= 7 ? 2 : 1;
          for(var e=0;e<extras;e++){
            if(rand()>.62) continue;
            var idx=Math.floor(rand()*count);
            if(map.has(idx)) continue;
            var sideRoll=rand();
            var extraSide=sideRoll<.34?"top":(sideRoll<.67?"left":"right");
            put(map,idx,{
              side:extraSide,
              t:.18+rand()*.64,
              width:8+rand()*10,
              depth:1.8+rand()*2.1
            });
          }
        }

        cluster(recordStack.querySelectorAll(".ruin-mini-archive-doc").length,true);
        cluster(gardenStack.querySelectorAll(".ruin-mini-archive-doc").length,false);
      }

      function applyCut(doc, index, isGarden) {
        if (!doc || !doc.isConnected) return;
        var rect = doc.getBoundingClientRect();
        if (rect.width < 8 || rect.height < 8) return;

        var w=rect.width,h=rect.height;
        var seedLabel=(isGarden?"mini-garden-":"mini-record-")+index+"-cut-v3:"+fractureIteration;
        var rand=seededRandom(hashString(seedLabel));

        // Smaller corner chamfers than the previous pass.
        var tl=(3.5+rand()*7.0)*scale;
        var tr=(3.0+rand()*7.5)*scale;
        var br=(rand()<.28 ? 2.5+rand()*5.5 : 0)*scale;
        var bl=(rand()<.24 ? 2.5+rand()*5.0 : 0)*scale;
        tl=Math.min(tl,w*.13,h*.075);
        tr=Math.min(tr,w*.13,h*.075);
        br=Math.min(br,w*.10,h*.060);
        bl=Math.min(bl,w*.10,h*.060);

        var damage=(isGarden?archiveDamagePlan.garden:archiveDamagePlan.record).get(index)||null;

        function point(x,y){ return [x,y]; }
        function edgeWithChip(a,b,side){
          if(!damage||damage.side!==side) return [a,b];
          var dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy)||1;
          var t=Math.max(.10,Math.min(.90,damage.t));
          var half=Math.min(.16,Math.max(.025,(damage.width*scale*.5)/len));
          var t0=Math.max(.02,t-half),t1=Math.min(.98,t+half);
          var n;
          if(side==="top") n=[0,1];
          else if(side==="right") n=[-1,0];
          else n=[1,0];
          var depth=Math.min((damage.depth*scale),side==="top"?h*.055:w*.09);
          var asym=.78+rand()*.42;
          var samples=[
            [0,0],
            [.20,.18*asym],
            [.42,.62],
            [.54,1],
            [.70,.54/asym],
            [1,0]
          ];
          var out=[a];
          samples.forEach(function(sample){
            var et=t0+(t1-t0)*sample[0];
            out.push([
              a[0]+dx*et+n[0]*depth*sample[1],
              a[1]+dy*et+n[1]*depth*sample[1]
            ]);
          });
          out.push(b);
          return out;
        }

        var tlTop=point(tl,0);
        var trTop=point(w-tr,0);
        var trRight=point(w,tr);
        var brRight=point(w,h-br);
        var brBottom=point(w-br,h);
        var blBottom=point(bl,h);
        var blLeft=point(0,h-bl);
        var tlLeft=point(0,tl);

        var top=edgeWithChip(tlTop,trTop,"top");
        var right=edgeWithChip(trRight,brRight,"right");
        var left=edgeWithChip(blLeft,tlLeft,"left");

        var points=[];
        points=points.concat(top);
        points.push(trRight);
        points=points.concat(right.slice(1));
        points.push(brBottom,blBottom,blLeft);
        points=points.concat(left.slice(1));

        // Deduplicate adjacent points generated at edge junctions.
        points=points.filter(function(p,i,arr){
          if(i===0) return true;
          var q=arr[i-1];
          return Math.hypot(p[0]-q[0],p[1]-q[1])>.12;
        });

        var polygon=points.map(function(p){
          return p[0].toFixed(2)+"px "+p[1].toFixed(2)+"px";
        }).join(", ");
        var clip="polygon("+polygon+")";
        doc.style.clipPath=clip;
        doc.style.webkitClipPath=clip;
        doc.style.setProperty("--archive-doc-shape-clip",clip);

        doc.querySelectorAll(":scope > .ruin-mini-archive-cut-outline").forEach(function(node){node.remove();});

        var NS="http://www.w3.org/2000/svg";
        var svg=document.createElementNS(NS,"svg");
        svg.setAttribute("class","ruin-mini-archive-cut-outline");
        svg.setAttribute("viewBox","0 0 "+w+" "+h);
        svg.setAttribute("preserveAspectRatio","none");

        var path=document.createElementNS(NS,"path");
        path.setAttribute("d",points.map(function(p,pointIndex){
          return (pointIndex?"L":"M")+p[0].toFixed(2)+" "+p[1].toFixed(2);
        }).join(" ")+" Z");
        svg.appendChild(path);

        // A short interior continuation grows from some chips. It is subtle:
        // the source system treats the missing edge as primary and the hairline
        // continuation as secondary.
        if(damage&&rand()<.58){
          var crack=document.createElementNS(NS,"path");
          var side=damage.side;
          var startX,startY,angle,length;
          if(side==="top"){
            startX=w*damage.t;
            startY=Math.min(h*.08,damage.depth*scale);
            angle=(.34+rand()*.30)*Math.PI;
          }else if(side==="right"){
            startX=w-Math.min(w*.09,damage.depth*scale);
            startY=h*damage.t;
            angle=(.72+rand()*.18)*Math.PI;
          }else{
            startX=Math.min(w*.09,damage.depth*scale);
            startY=h*(1-damage.t);
            angle=(-.18-rand()*.18)*Math.PI;
          }
          length=(6+rand()*14)*scale;
          var midX=startX+Math.cos(angle)*length*.52+(rand()-.5)*2*scale;
          var midY=startY+Math.sin(angle)*length*.52+(rand()-.5)*2*scale;
          var endX=startX+Math.cos(angle)*length;
          var endY=startY+Math.sin(angle)*length;
          crack.setAttribute("d","M"+startX.toFixed(2)+" "+startY.toFixed(2)+
            " Q"+midX.toFixed(2)+" "+midY.toFixed(2)+" "+endX.toFixed(2)+" "+endY.toFixed(2));
          crack.setAttribute("class","ruin-mini-archive-hairline-crack");
          svg.appendChild(crack);
        }

        doc.insertBefore(svg,doc.firstChild);
      }

      function layoutStacks() {
        if (!system.isConnected) return;
        setGeometryVariables();

        var recordDocs = Array.from(recordStack.querySelectorAll(".ruin-mini-archive-doc"));
        var recordBaseTop = 455;
        var recordGapY = 35;
        var recordGapX = 3.2;

        recordDocs.forEach(function(doc, index) {
          var rank = (recordDocs.length - 1) - index;
          var x = -rank * recordGapX * scale;
          var y = (recordBaseTop + rank * recordGapY) * scale;
          var jitterX = (((index * 17) % 5) - 2) * 0.72 * scale;
          var jitterY = (((index * 11) % 5) - 2) * 0.62 * scale;
          doc.style.setProperty("--stack-x", (x + jitterX).toFixed(2) + "px");
          doc.style.setProperty("--stack-y", (y + jitterY).toFixed(2) + "px");
          doc.style.zIndex = String(130 + rank);
          doc.dataset.zIndex = String(130 + rank);
          applyCut(doc,index,false);
        });

        var gardenDocs = Array.from(gardenStack.querySelectorAll(".ruin-mini-archive-doc"));
        gardenDocs.forEach(function(doc, index) {
          var rank = (gardenDocs.length - 1) - index;
          var top = rank * 43 * scale;
          var right = -rank * 2.6 * scale;
          var jitterX = (((index * 13) % 5) - 2) * 0.78 * scale;
          var jitterY = (((index * 7) % 5) - 2) * 0.64 * scale;
          doc.style.top = (top + jitterY).toFixed(2) + "px";
          doc.style.right = (right + jitterX).toFixed(2) + "px";
          doc.style.zIndex = String(150 + rank);
          doc.dataset.zIndex = String(150 + rank);
          applyCut(doc,index,true);
        });
      }

      function retractDoc(doc) {
        if (!doc || !doc.classList.contains("extracted") || doc.classList.contains("retracting")) return;
        var isRecord = !!doc.closest("#ruin-mini-stack-record");
        if (!isRecord) {
          doc.classList.remove("extracted");
          doc.style.zIndex = doc.dataset.zIndex || "";
          return;
        }
        doc.classList.add("retracting");
        var done = false;
        var finish = function() {
          if (done) return;
          done = true;
          doc.classList.remove("retracting","extracted");
          doc.style.zIndex = doc.dataset.zIndex || "";
        };
        var onEnd = function(event) {
          if (event.target !== doc || (event.propertyName !== "transform" && event.propertyName !== "top")) return;
          doc.removeEventListener("transitionend",onEnd);
          finish();
        };
        doc.addEventListener("transitionend",onEnd);
        cleanupTimers.push(setTimeout(function() {
          doc.removeEventListener("transitionend",onEnd);
          finish();
        },620));
      }

      function toggleExtract(doc) {
        if (!doc) return;
        if (doc.classList.contains("extracted")) {
          retractDoc(doc);
          return;
        }
        system.querySelectorAll(".ruin-mini-archive-doc.extracted").forEach(function(other) {
          if (other !== doc) retractDoc(other);
        });
        doc.classList.remove("retracting");
        doc.classList.add("extracted");
        doc.style.zIndex = "260";
      }

      recordStack.innerHTML = "";
      gardenStack.innerHTML = "";

      recordEntries.forEach(function(entry,index) {
        var doc = makeDoc(entry,index,false);
        doc.addEventListener("click",function(event) {
          event.preventDefault();
          event.stopPropagation();
          toggleExtract(doc);
        });
        recordStack.appendChild(doc);
      });

      gardenSites.forEach(function(site,index) {
        var doc = makeDoc(site,index,true);
        doc.addEventListener("click",function(event) {
          event.preventDefault();
          event.stopPropagation();
          toggleExtract(doc);
        });
        gardenStack.appendChild(doc);
      });

      rebuildArchiveDamagePlan();
      layoutStacks();
      renderMiniIndexStone();

      // Miniature port of the source index-drawer + procedural broken-stone rubbing:
      // slide the slab upward, and sink/restore the archive stacks around it.
      var surfaceTrigger = indexDrawer.querySelector(".ruin-mini-index-surface-trigger");
      var cabinetShell = system.closest(".ruin-mini-cabinet-shell");
      var refractureButton = document.querySelector(".ruin-mini-cabinet-section .ruin-mini-refracture-button");
      var drawerOpenTimer = 0;
      var refractureTimer = 0;

      function setDrawerOpen(open) {
        syncMiniIndexDrawerBaseline();
        indexDrawer.classList.toggle("open",open);
        if (surfaceTrigger) surfaceTrigger.setAttribute("aria-expanded",open ? "true" : "false");

        window.clearTimeout(drawerOpenTimer);
        if (open) {
          recordStack.classList.add("sink-down");
          gardenStack.classList.add("sink-down");
          drawerOpenTimer = window.setTimeout(function() {
            recordStack.classList.add("elevated-z");
            gardenStack.classList.add("elevated-z");
            recordStack.classList.remove("sink-down");
            gardenStack.classList.remove("sink-down");
          },400);
        } else {
          recordStack.classList.add("sink-down");
          gardenStack.classList.add("sink-down");
          drawerOpenTimer = window.setTimeout(function() {
            recordStack.classList.remove("elevated-z","sink-down");
            gardenStack.classList.remove("elevated-z","sink-down");
          },400);
        }
      }


      if (surfaceTrigger) {
        surfaceTrigger.addEventListener("click",function(event) {
          event.preventDefault();
          event.stopPropagation();
          setDrawerOpen(!indexDrawer.classList.contains("open"));
        });
      }

      var onRefracture = function(event) {
        event.preventDefault();
        if (!cabinetShell || cabinetShell.classList.contains("is-refracturing")) return;

        if (refractureButton) refractureButton.disabled = true;
        cabinetShell.classList.add("is-refracturing");

        window.clearTimeout(refractureTimer);
        refractureTimer = window.setTimeout(function() {
          fractureIteration = (
            fractureIteration +
            1 +
            Math.floor(Math.random() * 0x3fffffff)
          ) >>> 0;

          rebuildArchiveDamagePlan();
          layoutStacks();
          if(typeof window.rerollIndexStoneFragments==="function"){
            window.rerollIndexStoneFragments();
          }else{
            renderMiniIndexStone();
          }

          requestAnimationFrame(function() {
            requestAnimationFrame(function() {
              if (!cabinetShell || !cabinetShell.isConnected) return;
              cabinetShell.classList.remove("is-refracturing");
              window.setTimeout(function() {
                if (refractureButton) refractureButton.disabled = false;
              },360);
            });
          });
        },230);
      };

      if (refractureButton) {
        refractureButton.addEventListener("click",onRefracture);
      }

      var onOutside = function(event) {
        if (!system.isConnected) return;
        if (indexDrawer.classList.contains("open") && !indexDrawer.contains(event.target)) {
          setDrawerOpen(false);
        }
        if (!system.contains(event.target)) {
          system.querySelectorAll(".ruin-mini-archive-doc.extracted").forEach(retractDoc);
        }
      };

      var resizeRaf = 0;
      var onResize = function() {
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(function() {
          resizeRaf = 0;
          if (token !== ruinMiniArchiveMountToken || !system.isConnected) return;
          layoutStacks();
          renderMiniIndexStone();
        });
      };

      document.addEventListener("pointerdown",onOutside,true);
      window.addEventListener("resize",onResize,{passive:true});

      ruinMiniArchiveCleanup = function() {
        window.clearTimeout(drawerOpenTimer);
        window.clearTimeout(refractureTimer);
        if (refractureButton) refractureButton.removeEventListener("click",onRefracture);
        window.removeEventListener("index-stone-geometry-ready",onMiniStoneGeometry);
        cleanupTimers.forEach(window.clearTimeout);
        cleanupTimers = [];
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        document.removeEventListener("pointerdown",onOutside,true);
        window.removeEventListener("resize",onResize);
      };
    });
  }

  function mountSeawaterWorld(item) {
    if (!item || item.slug !== "seawater") return;

    var room = document.querySelector('.room-view[data-room="seawater"]');
    if (!room) return;

    var scroll = room.querySelector(".room-scroll");
    if (!scroll || room.querySelector(".seawater-caustic-projection")) return;

    room.querySelectorAll(".seawater-world-light, .seawater-world-shadow, .seawater-caustics").forEach(function (node) {
      node.remove();
    });

    /*
      Canvas2D projected Water Caustics
      ---------------------------------
      Keep the earlier low-resolution optical interference field, but make the
      projected space almost parallel. A physical point-light projection still
      determines the direction and depth; only the exaggerated convergence is
      damped so the far rectangle shrinks by just a few percent.

      The caustic field is rendered in depth bands. Every band is progressively
      more blurred and less opaque, and the complete layer receives a small base
      blur so both long side edges are soft from beginning to end, like a real
      shadow / light volume.
    */
    var canvas = document.createElement("canvas");
    canvas.className = "seawater-caustic-projection";
    canvas.setAttribute("aria-hidden", "true");
    room.insertBefore(canvas, scroll);

    var ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      canvas.remove();
      return;
    }

    var low = document.createElement("canvas");
    var lowCtx = low.getContext("2d", { alpha: true, willReadFrequently: false });
    var mid = document.createElement("canvas");
    var midCtx = mid.getContext("2d", { alpha: true });
    var far = document.createElement("canvas");
    var farCtx = far.getContext("2d", { alpha: true });
    var soft = document.createElement("canvas");
    var softCtx = soft.getContext("2d", { alpha: true });
    var layer = document.createElement("canvas");
    var layerCtx = layer.getContext("2d", { alpha: true });
    var mask = document.createElement("canvas");
    var maskCtx = mask.getContext("2d", { alpha: true });
    if (!lowCtx || !midCtx || !farCtx || !softCtx || !layerCtx || !maskCtx) {
      canvas.remove();
      return;
    }

    var width = 1;
    var height = 1;
    var pixelRatio = 1;
    var lowWidth = 168;
    var lowHeight = 132;
    var lowImageData = null;
    var reduceMotion = false;
    var lastFrame = 0;
    var lastFieldFrame = -1;
    var currentSolarProgress = null;

    try {
      reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (_) {}

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function lerpPoint(a, b, t) {
      return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
    }

    function seawaterArtworkScrollWindow() {
      var artwork = scroll.querySelector(".seawater-light-artwork");
      if (!artwork) return null;
      var viewport = Math.max(1, scroll.clientHeight);
      var rect = artwork.getBoundingClientRect();
      var parentRect = scroll.getBoundingClientRect();
      var top = scroll.scrollTop + rect.top - parentRect.top;
      var heightOfArtwork = Math.max(1, rect.height);
      var maxScroll = Math.max(1, scroll.scrollHeight - viewport);
      // Begin shortly before the tank enters view; finish soon after it passes.
      var start = clamp(top - viewport * 0.82, 0, maxScroll);
      var finish = clamp(top + heightOfArtwork - viewport * 0.22, 0, maxScroll);
      // The chart must never inherit the tank's darkness.
      var chart = scroll.querySelector("[data-seawater-space-time]");
      if (chart) {
        var chartRect = chart.getBoundingClientRect();
        var chartTop = scroll.scrollTop + chartRect.top - parentRect.top;
        finish = Math.min(finish, Math.max(0, chartTop - viewport * 1.05));
      }
      return { start: start, finish: Math.max(start + 1, finish) };
    }

    function scrollProgress() {
      var windowOfArt = seawaterArtworkScrollWindow();
      if (!windowOfArt) return 0;
      return clamp((scroll.scrollTop - windowOfArt.start) /
        Math.max(1, windowOfArt.finish - windowOfArt.start), 0, 1);
    }


    /*
      Seawater background exposure:
      the white–dark–white interval belongs ONLY to the tote-tank photograph.
      The preceding painted memory stays on warm paper, and the chart returns
      to warm paper well before entering the viewport.
    */
    var seawaterPaperRgb = [244, 243, 238];
    var seawaterDeepRgb = [146, 140, 128];
    var lastSeawaterBackground = "";

    function smoothstep01(value) {
      var t = clamp(value, 0, 1);
      return t * t * (3 - 2 * t);
    }

    function interpolateBackgroundStops(stops, progress) {
      var scaled = clamp(progress, 0, 1) * (stops.length - 1);
      var index = Math.min(stops.length - 2, Math.floor(scaled));
      var local = smoothstep01(scaled - index);
      return lerp(stops[index], stops[index + 1], local);
    }

    function backgroundLevelForScroll() {
      var interval = seawaterArtworkScrollWindow();
      if (!interval) return 0;
      var current = scroll.scrollTop;
      if (current <= interval.start || current >= interval.finish) return 0;
      var progress = clamp((current - interval.start) /
        Math.max(1, interval.finish - interval.start), 0, 1);
      return progress <= 0.50
        ? interpolateBackgroundStops([0, 20, 30, 40], progress * 2)
        : interpolateBackgroundStops([40, 30, 20, 10, 0], (progress - 0.5) * 2);
    }


    function updateSeawaterBackground() {
      var level = backgroundLevelForScroll();
      var mix = clamp(level / 40, 0, 1);
      var r = Math.round(lerp(seawaterPaperRgb[0], seawaterDeepRgb[0], mix));
      var g = Math.round(lerp(seawaterPaperRgb[1], seawaterDeepRgb[1], mix));
      var b = Math.round(lerp(seawaterPaperRgb[2], seawaterDeepRgb[2], mix));
      var value = "rgb(" + r + ", " + g + ", " + b + ")";
      if (value !== lastSeawaterBackground) {
        lastSeawaterBackground = value;
        room.style.backgroundColor = value;
        room.style.setProperty("--seawater-scroll-background", value);
      }
      document.documentElement.dataset.seawaterBackgroundLevel = String(Math.round(level));
    }

    function lightForFrame() {
      /*
        Scroll-driven 3D solar arc.
        0.00 = low morning light from down-left
        0.50 = high noon light from almost overhead / slightly left
        1.00 = low evening light from up-left

        The scroll target is eased so the light has inertia instead of sticking
        directly to touch movement. Solar altitude follows sin(pi*p): high at
        noon, low at both ends. That same altitude later compresses / expands
        the projected caustic volume like a real morning-noon-evening shadow.
      */
      var targetProgress = clamp(scrollProgress(), 0, 1);
      if (currentSolarProgress == null) currentSolarProgress = targetProgress;
      currentSolarProgress += (targetProgress - currentSolarProgress) * 0.014;

      var p = clamp(currentSolarProgress, 0, 1);
      var altitude = Math.sin(Math.PI * p);
      var altitudeEase = Math.pow(clamp(altitude, 0, 1), 0.88);
      var mobile = width <= 760;
      var distance = Math.max(width, height) * lerp(1.52, 1.18, altitudeEase);

      /* Horizontal orbit: low sun sits farther left; noon comes closer to the
         vertical axis while remaining slightly left of the artwork. */
      var xOffset = lerp(0.72, 0.24, altitudeEase);

      /* Screen-space vertical keyframes, matching the user's 3D sketch:
         down-left -> overhead-left -> up-left. */
      var yOffset;
      if (p <= 0.5) {
        yOffset = lerp(0.58, -0.92, smoothstep01(p / 0.5));
      } else {
        yOffset = lerp(-0.92, -0.52, smoothstep01((p - 0.5) / 0.5));
      }

      var lowZ = mobile ? 1850 : 2450;
      var highZ = mobile ? 5200 : 6800;
      var z = lerp(lowZ, highZ, altitudeEase);

      document.documentElement.dataset.seawaterTimeSource = "scroll-solar-arc";
      document.documentElement.dataset.seawaterSolarAltitude = altitude.toFixed(3);
      document.documentElement.dataset.seawaterSolarProgress = p.toFixed(3);

      return {
        x: width * 0.5 - distance * xOffset,
        y: height * 0.5 + distance * yOffset,
        z: z,
        altitude: altitude,
        progress: p
      };
    }

    function physicalProjectRect(rect, light, elevation, canvasRect) {
      var left = rect.left - canvasRect.left;
      var right = rect.right - canvasRect.left;
      var top = rect.top - canvasRect.top;
      var bottom = rect.bottom - canvasRect.top;
      var base = [
        { x: left, y: top },
        { x: right, y: top },
        { x: right, y: bottom },
        { x: left, y: bottom }
      ];
      var projection = light.z / Math.max(1, light.z - elevation);
      var projected = base.map(function (point) {
        return {
          x: light.x + (point.x - light.x) * projection,
          y: light.y + (point.y - light.y) * projection
        };
      });
      return { base: base, projected: projected };
    }

    function buildSolarProjectedVolume(rect, index, light, canvasRect) {
      var mobile = width <= 760;
      var left = rect.left - canvasRect.left;
      var right = rect.right - canvasRect.left;
      var top = rect.top - canvasRect.top;
      var bottom = rect.bottom - canvasRect.top;
      var base = [
        { x: left, y: top },
        { x: right, y: top },
        { x: right, y: bottom },
        { x: left, y: bottom }
      ];

      var baseCenter = {
        x: (left + right) * 0.5,
        y: (top + bottom) * 0.5
      };
      var dx = baseCenter.x - light.x;
      var dy = baseCenter.y - light.y;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      var ux = dx / len;
      var uy = dy / len;

      /* Height controls projection length. The noon volume becomes compact,
         while low morning/evening light produces a long caustic space. */
      var altitude = clamp(light.altitude == null ? 0.5 : light.altitude, 0, 1);
      var heightEase = Math.pow(altitude, 0.82);
      var longDepth = clamp(
        rect.width * (index === 0 ? 0.76 : 0.70),
        mobile ? 175 : 235,
        mobile ? 290 : 420
      );
      var noonDepth = clamp(
        rect.width * (index === 0 ? 0.24 : 0.22),
        mobile ? 68 : 92,
        mobile ? 118 : 158
      );
      var depth = lerp(longDepth, noonDepth, heightEase);
      var farCenter = {
        x: baseCenter.x + ux * depth,
        y: baseCenter.y + uy * depth
      };

      /* Keep the single-point character extremely restrained. A higher noon
         source reduces divergence further, so the volume feels almost parallel. */
      var elevation = clamp(
        rect.width * (index === 0 ? 0.18 : 0.16),
        mobile ? 44 : 60,
        mobile ? 90 : 124
      );
      var perspectiveScale = clamp(
        light.z / Math.max(1, light.z - elevation),
        1.006,
        1.028
      );
      var halfW = rect.width * perspectiveScale * 0.5;
      var halfH = rect.height * perspectiveScale * 0.5;
      var far = [
        { x: farCenter.x - halfW, y: farCenter.y - halfH },
        { x: farCenter.x + halfW, y: farCenter.y - halfH },
        { x: farCenter.x + halfW, y: farCenter.y + halfH },
        { x: farCenter.x - halfW, y: farCenter.y + halfH }
      ];

      return {
        base: base,
        far: far,
        elevation: elevation,
        direction: { x: ux, y: uy },
        altitude: altitude,
        depth: depth
      };
    }

    function pathQuad(targetCtx, quad) {
      targetCtx.beginPath();
      targetCtx.moveTo(quad[0].x, quad[0].y);
      targetCtx.lineTo(quad[1].x, quad[1].y);
      targetCtx.lineTo(quad[2].x, quad[2].y);
      targetCtx.lineTo(quad[3].x, quad[3].y);
      targetCtx.closePath();
    }

    function cross(o, a, b) {
      return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    }

    function convexHull(points) {
      var sorted = points.slice().sort(function (a, b) {
        return a.x === b.x ? a.y - b.y : a.x - b.x;
      });
      if (sorted.length <= 2) return sorted;

      var lower = [];
      sorted.forEach(function (point) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
          lower.pop();
        }
        lower.push(point);
      });

      var upper = [];
      for (var i = sorted.length - 1; i >= 0; i -= 1) {
        var point = sorted[i];
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0) {
          upper.pop();
        }
        upper.push(point);
      }

      upper.pop();
      lower.pop();
      return lower.concat(upper);
    }

    function volumeHull(volume) {
      return convexHull(volume.base.concat(volume.far));
    }

    function pathPolygon(targetCtx, points) {
      if (!points || !points.length) return;
      targetCtx.beginPath();
      targetCtx.moveTo(points[0].x, points[0].y);
      for (var i = 1; i < points.length; i += 1) {
        targetCtx.lineTo(points[i].x, points[i].y);
      }
      targetCtx.closePath();
    }

    function boundsOf(points) {
      var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      points.forEach(function (p) {
        minX = Math.min(minX, p.x);
        minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x);
        maxY = Math.max(maxY, p.y);
      });
      return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
    }

    function resizeWorld() {
      var rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      var mobile = width <= 760;

      pixelRatio = Math.min(window.devicePixelRatio || 1, mobile ? 1.35 : 1.5);
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      /* One CSS-pixel soft layer keeps edge blur inexpensive. */
      soft.width = Math.max(1, Math.round(width));
      soft.height = Math.max(1, Math.round(height));
      softCtx.imageSmoothingEnabled = true;
      softCtx.imageSmoothingQuality = "high";

      lowWidth = mobile ? 220 : 300;
      lowHeight = Math.round(lowWidth * Math.max(0.72, Math.min(1.08, height / Math.max(width, 1))));
      low.width = lowWidth;
      low.height = lowHeight;
      lowCtx.imageSmoothingEnabled = true;
      lowCtx.imageSmoothingQuality = "high";
      lowImageData = lowCtx.createImageData(lowWidth, lowHeight);

      /* Keep the blur pyramid dense enough that Safari never exposes pixel blocks. */
      mid.width = Math.max(150, Math.round(lowWidth * 0.76));
      mid.height = Math.max(108, Math.round(lowHeight * 0.76));
      far.width = Math.max(108, Math.round(lowWidth * 0.52));
      far.height = Math.max(82, Math.round(lowHeight * 0.52));
      midCtx.imageSmoothingEnabled = true;
      midCtx.imageSmoothingQuality = "high";
      farCtx.imageSmoothingEnabled = true;
      farCtx.imageSmoothingQuality = "high";

      layer.width = soft.width;
      layer.height = soft.height;
      mask.width = soft.width;
      mask.height = soft.height;
      layerCtx.imageSmoothingEnabled = true;
      layerCtx.imageSmoothingQuality = "high";
      maskCtx.imageSmoothingEnabled = true;
      maskCtx.imageSmoothingQuality = "high";
      lastFieldFrame = -1;
    }

    function renderLowField(timeSeconds) {
      if (!lowImageData) return;
      var data = lowImageData.data;
      var time = reduceMotion ? 0 : timeSeconds;
      var pointer = 0;

      for (var y = 0; y < lowHeight; y += 1) {
        var ny = (y + 0.5) / lowHeight - 0.5;
        for (var x = 0; x < lowWidth; x += 1) {
          var nx = (x + 0.5) / lowWidth - 0.5;

          var wx = nx + 0.085 * Math.sin(ny * 12.5 + time * 1.46) + 0.034 * Math.sin(ny * 25.0 - time * 1.08 + 0.7);
          var wy = ny + 0.082 * Math.cos(nx * 11.2 - time * 1.28) + 0.030 * Math.cos(nx * 22.4 + time * 0.92 + 1.3);
          var a = Math.sin(wx * 18.0 + Math.sin(wy * 10.5 + time * 1.18));
          var b = Math.cos(wy * 17.0 + Math.sin(wx * 11.5 - time * 1.02));
          var c = Math.sin((wx + wy) * 12.2 + Math.cos((wx - wy) * 9.7 + time * 0.84));
          var d = Math.cos((wx - wy) * 14.3 + Math.sin(wy * 8.6 - time * 0.72));
          var f = (a + b + c + d) * 0.25;
          var ridge = Math.max(0, 1 - Math.abs(f) * 1.64);
          var core = Math.pow(ridge, 8.5);
          var halo = Math.pow(Math.max(0, 1 - Math.abs(f) * 1.02), 2.7) * 0.17;
          var crossField = Math.sin(wx * 13.5 + Math.sin(wy * 18.0 + time * 0.82)) * 0.55 +
            Math.cos(wy * 14.8 + Math.sin(wx * 16.0 - time * 0.88)) * 0.45;
          var crossing = Math.pow(Math.max(0, 1 - Math.abs(crossField) * 1.48), 7.2) * 0.26;
          var value = clamp(core * 1.06 + halo + crossing, 0, 1);

          /* Strict neutral grayscale. Equal RGB channels avoid the previous yellow / magenta interpolation fringes. */
          data[pointer] = 255;
          data[pointer + 1] = 255;
          data[pointer + 2] = 255;
          data[pointer + 3] = Math.round(value * 226);
          pointer += 4;
        }
      }

      lowCtx.putImageData(lowImageData, 0, 0);

      /*
        Cross-browser blur pyramid. Instead of ctx.filter="blur(...)" (which is
        unreliable on iPhone Safari), progressively downsample the same caustic
        field. Upscaling these smaller buffers with high-quality interpolation
        produces a genuine soft-focus version with no rectangular band seams.
      */
      midCtx.setTransform(1, 0, 0, 1, 0, 0);
      midCtx.clearRect(0, 0, mid.width, mid.height);
      midCtx.drawImage(low, 0, 0, mid.width, mid.height);

      farCtx.setTransform(1, 0, 0, 1, 0, 0);
      farCtx.clearRect(0, 0, far.width, far.height);
      farCtx.drawImage(mid, 0, 0, far.width, far.height);
    }

    function volumeAxis(volume) {
      return {
        near: {
          x: (volume.base[0].x + volume.base[2].x) * 0.5,
          y: (volume.base[0].y + volume.base[2].y) * 0.5
        },
        far: {
          x: (volume.far[0].x + volume.far[2].x) * 0.5,
          y: (volume.far[0].y + volume.far[2].y) * 0.5
        }
      };
    }

    function polygonCenter(points) {
      var sumX = 0;
      var sumY = 0;
      points.forEach(function (point) {
        sumX += point.x;
        sumY += point.y;
      });
      return {
        x: sumX / Math.max(1, points.length),
        y: sumY / Math.max(1, points.length)
      };
    }

    function scalePolygon(points, center, scale) {
      return points.map(function (point) {
        return {
          x: center.x + (point.x - center.x) * scale,
          y: center.y + (point.y - center.y) * scale
        };
      });
    }

    function buildLayerMask(volume, stops, edgeBlur) {
      var whole = volumeHull(volume);
      var axis = volumeAxis(volume);
      var center = polygonCenter(whole);
      var mobile = width <= 760;

      maskCtx.setTransform(1, 0, 0, 1, 0, 0);
      maskCtx.clearRect(0, 0, width, height);
      maskCtx.globalCompositeOperation = "source-over";

      /*
        Safari-safe geometric feather:
        many translucent hulls span from slightly outside the projected volume
        to slightly inside it. The result is a real soft edge with no visible
        straight clipping line, and the far optical layers request a wider feather.
      */
      var reference = Math.max(260, Math.min(width, height));
      var feather = clamp(edgeBlur / reference * 0.46, 0.008, 0.070);
      var steps = mobile ? 16 : 20;
      var passAlpha = mobile ? 0.115 : 0.095;

      for (var i = 0; i < steps; i += 1) {
        var t = steps <= 1 ? 0.5 : i / (steps - 1);
        var scale = 1 + feather - feather * 2 * t;
        var feathered = scalePolygon(whole, center, scale);
        maskCtx.fillStyle = "rgba(255,255,255," + passAlpha + ")";
        pathPolygon(maskCtx, feathered);
        maskCtx.fill();
      }

      var gradient = maskCtx.createLinearGradient(axis.near.x, axis.near.y, axis.far.x, axis.far.y);
      stops.forEach(function (stop) {
        gradient.addColorStop(stop[0], "rgba(255,255,255," + stop[1] + ")");
      });
      maskCtx.globalCompositeOperation = "destination-in";
      maskCtx.fillStyle = gradient;
      maskCtx.fillRect(0, 0, width, height);

      /* Directional front gate: no caustic halo may wrap around the light-facing
         sides of the image. This is the key fix for the extra two/three edges. */
      var axisDx = axis.far.x - axis.near.x;
      var axisDy = axis.far.y - axis.near.y;
      var axisLength = Math.sqrt(axisDx * axisDx + axisDy * axisDy) || 1;
      var dirX = axisDx / axisLength;
      var dirY = axisDy / axisLength;
      var gateBack = Math.min(axisLength * 0.10, Math.max(6, edgeBlur * 0.48));
      var gateForward = Math.min(axisLength * 0.24, Math.max(10, edgeBlur * 0.92));
      var gate = maskCtx.createLinearGradient(
        axis.near.x - dirX * gateBack,
        axis.near.y - dirY * gateBack,
        axis.near.x + dirX * gateForward,
        axis.near.y + dirY * gateForward
      );
      gate.addColorStop(0, "rgba(255,255,255,0)");
      gate.addColorStop(0.38, "rgba(255,255,255,0)");
      gate.addColorStop(0.72, "rgba(255,255,255,0.82)");
      gate.addColorStop(1, "rgba(255,255,255,1)");
      maskCtx.fillStyle = gate;
      maskCtx.fillRect(0, 0, width, height);
      maskCtx.globalCompositeOperation = "source-over";
    }

    function drawCausticLayer(source, volume, bounds, stops, edgeBlur, alpha) {
      layerCtx.setTransform(1, 0, 0, 1, 0, 0);
      layerCtx.clearRect(0, 0, width, height);
      layerCtx.globalCompositeOperation = "source-over";
      layerCtx.globalAlpha = alpha;
      layerCtx.imageSmoothingEnabled = true;
      layerCtx.imageSmoothingQuality = "high";

      var pad = 76;
      layerCtx.drawImage(
        source,
        bounds.minX - pad,
        bounds.minY - pad,
        (bounds.maxX - bounds.minX) + pad * 2,
        (bounds.maxY - bounds.minY) + pad * 2
      );

      buildLayerMask(volume, stops, edgeBlur);
      layerCtx.globalCompositeOperation = "destination-in";
      layerCtx.globalAlpha = 1;
      layerCtx.drawImage(mask, 0, 0);
      layerCtx.globalCompositeOperation = "source-over";

      softCtx.save();
      softCtx.globalCompositeOperation = "source-over";
      softCtx.globalAlpha = 1;
      softCtx.drawImage(layer, 0, 0);
      softCtx.restore();
    }

    function drawProjectedCaustic(rect, index, light, canvasRect) {
      if (rect.width < 2 || rect.height < 2) return;
      var mobile = width <= 760;
      var volume = buildSolarProjectedVolume(rect, index, light, canvasRect);
      var wholeBounds = boundsOf(volume.base.concat(volume.far));
      var baseAlpha = index === 0 ? 0.92 : 0.88;

      /*
        Continuous depth-of-field blend:
        sharp near the image -> medium focus -> broad far focus.
        No per-band clipping and no Canvas2D filter, so iOS Safari cannot reveal
        the old stack of rectangular blur strips.
      */
      drawCausticLayer(
        low,
        volume,
        wholeBounds,
        [[0, 1], [0.14, 0.96], [0.30, 0.66], [0.48, 0.16], [0.58, 0]],
        mobile ? 7 : 8,
        baseAlpha
      );
      drawCausticLayer(
        mid,
        volume,
        wholeBounds,
        [[0, 0.12], [0.18, 0.30], [0.42, 0.60], [0.68, 0.56], [0.88, 0.20], [1, 0]],
        mobile ? 14 : 17,
        baseAlpha * 0.90
      );
      drawCausticLayer(
        far,
        volume,
        wholeBounds,
        [[0, 0], [0.28, 0.05], [0.50, 0.22], [0.72, 0.50], [0.90, 0.60], [1, 0.50]],
        mobile ? 28 : 34,
        baseAlpha * 0.78
      );
    }

    function render(now) {
      if (!canvas.isConnected) return;
      var mobile = width <= 760;
      var frameInterval = mobile ? 52 : 40;

      if (now - lastFrame >= frameInterval || reduceMotion && lastFieldFrame < 0) {
        lastFrame = now;
        var fieldFrame = Math.floor(now / frameInterval);
        if (fieldFrame !== lastFieldFrame) {
          renderLowField(now * 0.00118);
          lastFieldFrame = fieldFrame;
        }

        softCtx.setTransform(1, 0, 0, 1, 0, 0);
        softCtx.clearRect(0, 0, width, height);

        updateSeawaterBackground();

        var canvasRect = canvas.getBoundingClientRect();
        var images = Array.prototype.slice.call(scroll.querySelectorAll(".seawater-light-artwork img"));
        var light = lightForFrame();
        var anyVisible = false;

        images.forEach(function (image, index) {
          var rect = image.getBoundingClientRect();
          if (rect.bottom < canvasRect.top - height * 0.80 || rect.top > canvasRect.bottom + height * 0.80) return;
          anyVisible = true;
          drawProjectedCaustic(rect, index, light, canvasRect);
        });

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
        ctx.drawImage(soft, 0, 0, width, height);

        canvas.style.opacity = anyVisible ? "1" : "0";
        document.documentElement.dataset.seawaterRenderer = "canvas2d-scroll-solar3d-caustics";
        document.documentElement.dataset.seawaterProjection = "scroll-solar-arc-3d";
      }

      requestAnimationFrame(render);
    }

    window.addEventListener("resize", resizeWorld, { passive: true });
    window.addEventListener("orientationchange", resizeWorld, { passive: true });
    scroll.querySelectorAll(".seawater-light-artwork img").forEach(function (image) {
      if (!image.complete) image.addEventListener("load", resizeWorld, { once: true });
    });

    resizeWorld();
    updateSeawaterBackground();
    requestAnimationFrame(render);
  }


  var collectionStageResizeFrame = 0;

  function sizeCollectionStages(item) {
    if (!item || item.group !== "collection") return;

    var stages = document.querySelectorAll('.room-view[data-group="collection"] .room-image');
    if (!stages.length) return;

    var viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    var viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    var mobile = viewportWidth <= 760;

    stages.forEach(function (stage) {
      var img = stage.querySelector("img");
      if (!img) return;

      function applyStageSize() {
        if (!stage.isConnected || !img.naturalWidth || !img.naturalHeight) return;

        var imageWidth = img.naturalWidth;
        var imageHeight = img.naturalHeight;

        /*
          User-defined proportions:
          - start with a field that is 150% of the artwork in both dimensions;
          - then add another 10% of artwork width to both the left and right sides.
          Result: field width = artwork × 1.70; field height = artwork × 1.50.
        */
        var stageWidthRatio = 1.70;
        var stageHeightRatio = 1.50;

        /* Viewport limits only scale the whole construction; they never change its ratio. */
        var maxStageWidth = mobile
          ? Math.max(260, viewportWidth - 30)
          : Math.min(viewportWidth * 0.76, 1160);
        var maxStageHeight = mobile
          ? Math.min(viewportHeight * 0.62, 560)
          : Math.min(viewportHeight * 0.72, 740);

        var scale = Math.min(
          maxStageWidth / (imageWidth * stageWidthRatio),
          maxStageHeight / (imageHeight * stageHeightRatio)
        );
        scale = Math.max(scale, 0.01);

        var displayedImageWidth = Math.round(imageWidth * scale * 10) / 10;
        var displayedImageHeight = Math.round(imageHeight * scale * 10) / 10;
        var stageWidth = Math.round(displayedImageWidth * stageWidthRatio * 10) / 10;
        var stageHeight = Math.round(displayedImageHeight * stageHeightRatio * 10) / 10;

        stage.style.setProperty("--image-width", displayedImageWidth + "px");
        stage.style.setProperty("--image-height", displayedImageHeight + "px");
        stage.style.setProperty("--stage-width", stageWidth + "px");
        stage.style.setProperty("--stage-height", stageHeight + "px");
      }

      if (img.complete && img.naturalWidth) {
        applyStageSize();
      } else if (img.dataset.collectionStageSizingBound !== "true") {
        img.dataset.collectionStageSizingBound = "true";
        img.addEventListener("load", applyStageSize, { once: true });
      }
    });
  }

  function scheduleCollectionStageSizing() {
    if (collectionStageResizeFrame) cancelAnimationFrame(collectionStageResizeFrame);
    collectionStageResizeFrame = requestAnimationFrame(function () {
      collectionStageResizeFrame = 0;
      sizeCollectionStages(parseRoute());
    });
  }

  function refineCurrentView() {
    repairAmbientCalendarVideo();

    var item = parseRoute();
    var roomView = document.querySelector(".room-view");
    if (!item || !roomView) return;

    roomView.dataset.room = item.slug;
    roomView.dataset.group = item.group;
    updateFooterNavigation(item);
    sizeCollectionStages(item);
    mountSeawaterWorld(item);
    mountRuinAtlasMiniMap(item);
    mountRuinArchiveMiniSystem(item);
  }

  var appNode = document.querySelector("#app");
  if (appNode && "MutationObserver" in window) {
    var queued = false;
    var observer = new MutationObserver(function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        refineCurrentView();
      });
    });
    observer.observe(appNode, { childList: true, subtree: true });
  }

  function resumeMediaAfterGesture() {
    repairAmbientCalendarVideo();
  }

  window.addEventListener("resize", scheduleCollectionStageSizing, { passive: true });
  window.addEventListener("orientationchange", scheduleCollectionStageSizing, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", scheduleCollectionStageSizing, { passive: true });
  }

  document.addEventListener("pointerdown", resumeMediaAfterGesture, { passive: true, capture: true });
  document.addEventListener("touchstart", resumeMediaAfterGesture, { passive: true, capture: true });
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) repairAmbientCalendarVideo();
  });

  render();
  requestAnimationFrame(refineCurrentView);
})();

// === RUIN MINI SOURCE STONE PORT START ===
// v268 · Index Drawer smoother stone + rubbing text reflow source geometry
// ----------------------------------------------------------------------------
// Goals of this pass:
// - abandon the hub/radial topology: each fracture splits ONE existing slab;
// - choose 1–4 fractures per page, so later breaks may terminate on older seams;
// - fracture edges are independently irregular and often nearly coincide;
// - seam width varies along the same break, creating dark/near-contact and
//   lighter/open sections like tightly reassembled stone;
// - edge mouths follow the ACTUAL incidence angle of each fracture, but the
//   rim is now weathered as a shallow rounded bevel instead of a pointed tooth;
// - top-edge mouths avoid the central title and prefer the two side bands;
// - mouth size / erosion style varies from small to occasional large worn bays;
// - mouth throat width is oriented perpendicular to the entering fracture, so
//   the opening flows into the seam without a geometric kink;
// - seams are opened a little more again to reveal rounded, rubbed fracture faces.
// Text interruption remains disabled for this stage.
// ============================================================================
(() => {
    const NS = 'http://www.w3.org/2000/svg';
    const LAYER_ID = 'ruin-mini-index-stone-layer';

    function hash32(str) {
        let h = 2166136261 >>> 0;
        for (let i = 0; i < str.length; i++) {
            h ^= str.charCodeAt(i);
            h = Math.imul(h, 16777619);
        }
        return h >>> 0;
    }

    function mulberry32(seed) {
        let a = seed >>> 0;
        return function () {
            a |= 0;
            a = (a + 0x6D2B79F5) | 0;
            let t = Math.imul(a ^ (a >>> 15), 1 | a);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    function pageSeed(forceNew = false) {
        if (!forceNew && Number.isFinite(window.__indexStoneFragmentSeed)) return window.__indexStoneFragmentSeed >>> 0;
        try {
            const params = new URLSearchParams(location.search);
            // v268 · IMPORTANT: URLSearchParams#get() returns null when the key
            // is absent, and Number(null) === 0. v267 therefore accidentally
            // interpreted every normal URL as ?stone-seed=0, freezing the same
            // fracture on every reload. Only honor an explicit, non-empty seed.
            if (params.has('stone-seed')) {
                const rawSeed = (params.get('stone-seed') || '').trim();
                if (rawSeed !== '') {
                    const querySeed = Number(rawSeed);
                    if (Number.isFinite(querySeed) && querySeed >= 0) {
                        window.__indexStoneFragmentSeed = querySeed >>> 0;
                        return window.__indexStoneFragmentSeed;
                    }
                }
            }
        } catch (_) {}
        let seed = (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;
        try {
            const u = new Uint32Array(2);
            crypto.getRandomValues(u);
            seed ^= u[0];
            seed ^= ((u[1] << 7) | (u[1] >>> 25)) >>> 0;
        } catch (_) {}
        seed ^= (Math.floor((performance.timeOrigin || 0)) >>> 0);
        seed ^= ((Math.floor((performance.now() || 0) * 1000) * 2654435761) >>> 0);
        window.__indexStoneFragmentSeed = seed >>> 0;
        return window.__indexStoneFragmentSeed;
    }

    let seed = pageSeed(true);

    function svgEl(tag, attrs = {}) {
        const el = document.createElementNS(NS, tag);
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
        return el;
    }

    function cssNumber(name, fallback) {
        const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        const n = parseFloat(value);
        return Number.isFinite(n) ? n : fallback;
    }

    function v(x, y, outer = false) { return { x, y, outer }; }
    function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
    function lerp(a, b, t) { return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }; }
    function distance(a, b) { return Math.hypot(b.x - a.x, b.y - a.y); }
    function toward(a, b, dist) {
        const dx = b.x - a.x, dy = b.y - a.y;
        const l = Math.hypot(dx, dy) || 1;
        return { x: a.x + dx / l * dist, y: a.y + dy / l * dist };
    }
    function centroid(points) {
        let x = 0, y = 0;
        points.forEach(p => { x += p.x; y += p.y; });
        return { x: x / points.length, y: y / points.length };
    }
    function polygonArea(points) {
        let area = 0;
        for (let i = 0; i < points.length; i++) {
            const a = points[i], b = points[(i + 1) % points.length];
            area += a.x * b.y - b.x * a.y;
        }
        return area * 0.5;
    }
    function absArea(points) { return Math.abs(polygonArea(points)); }
    function cross(ax, ay, bx, by) { return ax * by - ay * bx; }
    function unitVec(a) {
        const l = Math.hypot(a.x, a.y) || 1;
        return { x: a.x / l, y: a.y / l };
    }
    function dotVec(a, b) { return a.x * b.x + a.y * b.y; }
    function blendDir(a, b, t) {
        return unitVec({ x: a.x * (1 - t) + b.x * t, y: a.y * (1 - t) + b.y * t });
    }
    function smoothstep01(x) {
        x = clamp(x, 0, 1);
        return x * x * (3 - 2 * x);
    }
    function projectAlong(origin, dir, p) {
        return (p.x - origin.x) * dir.x + (p.y - origin.y) * dir.y;
    }
    function smoothChainInterior(points, passes = 1, blend = 0.20) {
        const out = points.map(p => ({ ...p }));
        for (let pass = 0; pass < passes; pass++) {
            for (let i = 1; i < out.length - 1; i++) {
                const prev = out[i - 1], cur = out[i], next = out[i + 1];
                out[i] = {
                    ...cur,
                    x: cur.x * (1 - blend * 2) + (prev.x + next.x) * blend,
                    y: cur.y * (1 - blend * 2) + (prev.y + next.y) * blend
                };
            }
        }
        return out;
    }

    function pathD(points) {
        // v258 · only INTERNAL fracture vertices can be softly rounded.
        // The true outer silhouette remains literal / faceted.  A tiny quadratic
        // radius on seam vertices suggests abrasion after broken slabs rubbed
        // against one another, without turning the stone into a soft blob.
        const n = points.length;
        if (n < 3) return '';

        const rounded = points.map((cur, i) => {
            const prev = points[(i - 1 + n) % n];
            const next = points[(i + 1) % n];
            const requested = ((cur.mouth && cur.rimWear) || (!cur.outer && (cur.seam || cur.mouth)))
                ? (cur.wear || 0)
                : 0;
            if (requested <= 0.05) return { round: false, cur };

            const lenPrev = distance(prev, cur);
            const lenNext = distance(cur, next);
            // v265 · rounded mouths and rubbed contact nodes need slightly more
            // local radius than ordinary seam points, otherwise the geometry is
            // technically worn but still reads as a kink. Keep the outer frame
            // literal, but allow mouth/junction/contact points to consume more
            // edge length and reveal the intended eroded trajectory.
            const roundLimit = cur.junction
                ? (cur.mouth ? 0.56 : 0.38)
                : cur.contact
                    ? 0.38
                    : cur.mouth
                        ? 0.44
                        : 0.22;
            const roundBias = cur.roundBias ?? 1;
            const r = Math.min(requested * roundBias, lenPrev * roundLimit, lenNext * roundLimit);
            if (r < 0.18) return { round: false, cur };

            return {
                round: true,
                cur,
                entry: toward(cur, prev, r),
                exit: toward(cur, next, r)
            };
        });

        const first = rounded[0];
        let d;
        if (first.round) {
            d = `M ${first.entry.x.toFixed(2)} ${first.entry.y.toFixed(2)} `;
            d += `Q ${first.cur.x.toFixed(2)} ${first.cur.y.toFixed(2)} ${first.exit.x.toFixed(2)} ${first.exit.y.toFixed(2)} `;
        } else {
            d = `M ${first.cur.x.toFixed(2)} ${first.cur.y.toFixed(2)} `;
        }

        for (let i = 1; i < n; i++) {
            const item = rounded[i];
            if (item.round) {
                d += `L ${item.entry.x.toFixed(2)} ${item.entry.y.toFixed(2)} `;
                d += `Q ${item.cur.x.toFixed(2)} ${item.cur.y.toFixed(2)} ${item.exit.x.toFixed(2)} ${item.exit.y.toFixed(2)} `;
            } else {
                d += `L ${item.cur.x.toFixed(2)} ${item.cur.y.toFixed(2)} `;
            }
        }
        return d + 'Z';
    }

    function lineSegmentIntersection(linePoint, dir, p, q) {
        const sx = q.x - p.x, sy = q.y - p.y;
        const denom = cross(dir.x, dir.y, sx, sy);
        if (Math.abs(denom) < 1e-8) return null;
        const rx = p.x - linePoint.x, ry = p.y - linePoint.y;
        const t = cross(rx, ry, sx, sy) / denom;
        const u = cross(rx, ry, dir.x, dir.y) / denom;
        if (u < -1e-6 || u > 1 + 1e-6) return null;
        return { x: linePoint.x + dir.x * t, y: linePoint.y + dir.y * t, t, u };
    }

    function linePolygonIntersections(poly, linePoint, dir) {
        const hits = [];
        for (let i = 0; i < poly.length; i++) {
            const a = poly[i], b = poly[(i + 1) % poly.length];
            const hit = lineSegmentIntersection(linePoint, dir, a, b);
            if (!hit) continue;
            const outerEdge = !!(a.outer && b.outer);
            // v264 · a later fracture can terminate on an older fracture face.
            // Keep that information: those junctions need their own rounded /
            // rubbed opening instead of behaving like an anonymous polygon edge.
            const seamEdge = !!((a.seam || a.mouth) && (b.seam || b.mouth));
            const existing = hits.find(h => Math.hypot(h.x - hit.x, h.y - hit.y) < 0.45);
            if (existing) {
                existing.outer = existing.outer && outerEdge;
                existing.seamEdge = existing.seamEdge || seamEdge;
                existing.edgeIndex = i;
                existing.u = hit.u;
                if (Math.abs(hit.t) < Math.abs(existing.t)) existing.t = hit.t;
                continue;
            }
            hits.push({
                x: hit.x, y: hit.y, t: hit.t, u: hit.u,
                edgeIndex: i,
                outer: outerEdge,
                seamEdge
            });
        }
        hits.sort((a, b) => a.t - b.t);
        return hits;
    }

    function buildArc(poly, startEdge, endEdge, startPoint, endPoint) {
        const out = [{ ...startPoint }];
        let i = (startEdge + 1) % poly.length;
        const stop = (endEdge + 1) % poly.length;
        let guard = 0;
        while (i !== stop && guard++ < poly.length + 2) {
            out.push({ ...poly[i] });
            i = (i + 1) % poly.length;
        }
        out.push({ ...endPoint });
        return out;
    }

    function edgeFrame(poly, hit) {
        const a = poly[hit.edgeIndex];
        const b = poly[(hit.edgeIndex + 1) % poly.length];
        const dx = b.x - a.x, dy = b.y - a.y;
        const edgeLen = Math.hypot(dx, dy) || 1;
        const tangent = { x: dx / edgeLen, y: dy / edgeLen };
        const n1 = { x: -tangent.y, y: tangent.x };
        const n2 = { x: tangent.y, y: -tangent.x };
        const c = centroid(poly);
        const p1 = { x: hit.x + n1.x * 10, y: hit.y + n1.y * 10 };
        const p2 = { x: hit.x + n2.x * 10, y: hit.y + n2.y * 10 };
        const d1 = Math.hypot(p1.x - c.x, p1.y - c.y);
        const d2 = Math.hypot(p2.x - c.x, p2.y - c.y);
        return { tangent, inward: d1 < d2 ? n1 : n2, edgeLen, a, b };
    }

    function pointOnHitEdge(poly, hit, u, flags = null) {
        const a = poly[hit.edgeIndex];
        const b = poly[(hit.edgeIndex + 1) % poly.length];
        const t = clamp(u, 0.018, 0.982);
        const result = {
            x: a.x + (b.x - a.x) * t,
            y: a.y + (b.y - a.y) * t,
            outer: !!hit.outer,
            edgeIndex: hit.edgeIndex,
            edgeU: t
        };
        if (flags) Object.assign(result, flags);
        return result;
    }

    // v261 · angle-aware, size-varied, eroded edge mouths.
    // The reference is not a repeated notch. Some mouths are tiny and almost
    // closed, some are medium scoops, and a minority are broader worn bays. The
    // two sides are allowed to weather differently, while every mouth still
    // turns into the actual fracture direction rather than the rim normal.
    function chooseMouthProfile(rand) {
        const r = rand();
        if (r < 0.46) {
            return {
                name: 'small',
                widthScale: 0.90 + rand() * 0.18,
                depthScale: 0.90 + rand() * 0.16,
                wearScale: 0.92 + rand() * 0.18,
                throatScale: 0.96 + rand() * 0.12,
                heavyChance: 0.18
            };
        }
        if (r < 0.82) {
            return {
                name: 'medium',
                widthScale: 1.18 + rand() * 0.28,
                depthScale: 1.02 + rand() * 0.22,
                wearScale: 1.12 + rand() * 0.24,
                throatScale: 1.10 + rand() * 0.18,
                heavyChance: 0.42
            };
        }
        return {
            name: 'large',
            widthScale: 1.58 + rand() * 0.42,
            depthScale: 1.18 + rand() * 0.30,
            wearScale: 1.34 + rand() * 0.34,
            throatScale: 1.24 + rand() * 0.24,
            heavyChance: 0.68
        };
    }

    function chooseMouthShape(rand, heavy) {
        const r = rand();
        if (heavy && r < 0.34) return 'worn-bay';
        if (r < 0.30) return 'soft-scoop';
        if (r < 0.58) return 'rounded-ledge';
        if (r < 0.82) return 'worn-bay';
        return 'plain-bevel';
    }

    function mouthSideChain(shoulder, throat, frame, entryDir, rand, opts = {}) {
        const sign = opts.sign || 1;
        const slowTaper = !!opts.slowTaper;
        const weathered = !!opts.weathered;
        const profile = opts.profile || { wearScale: 1, name: 'small' };
        const shape = opts.shape || 'soft-scoop';
        const wearScale = profile.wearScale || 1;
        const heavy = weathered && (profile.name === 'large' || rand() < (profile.heavyChance || 0));

        const pts = [{
            ...shoulder,
            mouth: true,
            rimWear: true,
            roundBias: 1.52 + rand() * 0.32,
            wear: (2.45 + rand() * 2.10) * wearScale
        }];

        const direct = unitVec({ x: throat.x - shoulder.x, y: throat.y - shoulder.y });
        const seamPull = blendDir(direct, entryDir, 0.66 + rand() * 0.14);
        const sideNormal = unitVec({ x: -entryDir.y, y: entryDir.x });
        const sidePolarity = dotVec(sideNormal, frame.tangent) * sign >= 0 ? 1 : -1;

        let baseTs;
        let scoopScale;
        if (shape === 'rounded-ledge') {
            baseTs = slowTaper ? [0.05, 0.11, 0.20, 0.33, 0.49, 0.66, 0.82] : [0.07, 0.15, 0.28, 0.46, 0.69, 0.84];
            scoopScale = heavy ? 1.74 : 1.26;
        } else if (shape === 'worn-bay') {
            baseTs = slowTaper ? [0.05, 0.12, 0.22, 0.37, 0.53, 0.69, 0.84] : [0.08, 0.18, 0.33, 0.52, 0.72, 0.86];
            scoopScale = heavy ? 2.32 : 1.64;
        } else if (shape === 'plain-bevel') {
            baseTs = slowTaper ? [0.08, 0.17, 0.31, 0.50, 0.72, 0.88] : [0.10, 0.23, 0.42, 0.66, 0.86];
            scoopScale = 0.84;
        } else {
            baseTs = slowTaper ? [0.06, 0.14, 0.25, 0.40, 0.58, 0.77, 0.88] : [0.08, 0.18, 0.32, 0.52, 0.74, 0.88];
            scoopScale = heavy ? 1.58 : 1.12;
        }

        const ts = baseTs
            .map((t, idx) => {
                const jitter = (shape === 'worn-bay' ? 0.052 : 0.036) * (idx === 0 || idx === baseTs.length - 1 ? 0.42 : 1);
                return clamp(t + (rand() - 0.5) * jitter, 0.045, 0.92);
            })
            .sort((a, b) => a - b);

        const interior = [];
        const primaryBend = rand() < 0.5 ? -1 : 1;
        const secondaryBend = rand() < 0.5 ? -primaryBend : primaryBend;
        ts.forEach((t, i) => {
            const easedT = smoothstep01(t);
            const base = lerp(shoulder, throat, t);
            const envelope = Math.sin(Math.PI * easedT);
            const shoulderEase = smoothstep01(clamp(t / 0.26, 0, 1));
            const throatEase = smoothstep01(clamp((1 - t) / 0.26, 0, 1));
            const neckBell = cosineBell(t, 0.17 + rand() * 0.03, 0.11 + rand() * 0.03);
            const bayBell = cosineBell(t, 0.42 + rand() * 0.07, 0.17 + rand() * 0.07);
            const lateBell = cosineBell(t, 0.65 + rand() * 0.06, 0.12 + rand() * 0.05);

            let scoop = envelope * (0.38 + rand() * 0.66) * scoopScale * wearScale;
            if (shape === 'rounded-ledge' && i <= 1) scoop *= 0.18 + rand() * 0.16;
            if (shape === 'worn-bay' && i === Math.floor(ts.length / 2)) scoop *= 1.18 + rand() * 0.22;
            scoop *= 0.52 + shoulderEase * 0.58;
            scoop *= 0.86 + (1 - throatEase) * 0.12;

            const neckPull = neckBell * (0.42 + rand() * (heavy ? 0.78 : 0.52)) * wearScale;
            const bayPush = bayBell * (0.28 + rand() * (heavy ? 1.08 : 0.74)) * wearScale;
            const latePush = lateBell * (0.10 + rand() * 0.42) * wearScale;
            scoop = Math.max(0.08, scoop - neckPull + bayPush + latePush);

            const roughnessGate = 0.16 + envelope * 0.84;
            const along = (rand() - 0.5) * (heavy ? 1.06 : 0.62) * wearScale * roughnessGate;
            const lateralAmplitude = (0.08 + bayBell * (heavy ? 0.42 : 0.28) + lateBell * 0.16) * (0.72 + rand() * 0.70);
            const lateral = sidePolarity * ((i % 2 === 0 ? primaryBend : secondaryBend) * lateralAmplitude + (rand() - 0.5) * 0.16) * (0.35 + envelope * 0.65);
            const tangentWave = ((i % 2 === 0 ? -1 : 1) * (0.05 + bayBell * 0.20) + (rand() - 0.5) * 0.08) * sign * sidePolarity;
            const tangentSlide = frame.tangent.x ? tangentWave : tangentWave;

            interior.push({
                x: base.x + frame.inward.x * scoop + seamPull.x * along + sideNormal.x * lateral + frame.tangent.x * tangentSlide,
                y: base.y + frame.inward.y * scoop + seamPull.y * along + sideNormal.y * lateral + frame.tangent.y * tangentSlide,
                outer: false,
                mouth: true,
                seam: true,
                rimWear: t < 0.18,
                roundBias: t < 0.22 || t > 0.70 ? 1.24 + rand() * 0.18 : 1.08 + rand() * 0.14,
                wear: (2.55 + rand() * 2.05 + (slowTaper ? 0.52 : 0) + (heavy ? 0.96 : 0) + bayBell * 0.85) * wearScale
            });
        });

        if ((shape === 'worn-bay' || heavy) && rand() < (heavy ? 0.82 : 0.48)) {
            const t = 0.48 + rand() * 0.20;
            const base = lerp(shoulder, throat, t);
            interior.push({
                x: base.x + frame.inward.x * (1.10 + rand() * (heavy ? 2.25 : 1.15)) * wearScale + frame.tangent.x * sign * (rand() - 0.5) * 0.50,
                y: base.y + frame.inward.y * (1.10 + rand() * (heavy ? 2.25 : 1.15)) * wearScale + frame.tangent.y * sign * (rand() - 0.5) * 0.50,
                outer: false,
                mouth: true,
                seam: true,
                roundBias: 1.18 + rand() * 0.14,
                wear: (3.10 + rand() * 2.20) * wearScale
            });
        }

        interior.sort((a, b) => projectAlong(shoulder, direct, a) - projectAlong(shoulder, direct, b));
        for (let i = 1; i < interior.length; i++) {
            const prevProj = projectAlong(shoulder, direct, interior[i - 1]);
            const proj = projectAlong(shoulder, direct, interior[i]);
            const minStep = 0.24 + Math.min(0.34, i * 0.024);
            if (proj < prevProj + minStep) {
                const push = prevProj + minStep - proj;
                interior[i].x += direct.x * push;
                interior[i].y += direct.y * push;
            }
        }
        const smoothed = smoothChainInterior(interior, heavy ? 2 : 1, heavy ? 0.16 : 0.13);
        pts.push(...smoothed);

        pts.push({
            ...throat,
            outer: false,
            mouth: true,
            seam: true,
            roundBias: 1.34 + rand() * 0.22,
            wear: (3.10 + rand() * 1.85 + (heavy ? 0.72 : 0)) * wearScale
        });
        return pts;
    }


    function chooseJunctionWearProfile(rand) {
        const r = rand();
        if (r < 0.46) return { name: 'small', side: 5.4 + rand() * 3.6, run: 6.6 + rand() * 4.2, throat: 1.30 + rand() * 0.92, wear: 1.08 + rand() * 0.30 };
        if (r < 0.84) return { name: 'medium', side: 7.8 + rand() * 4.6, run: 9.2 + rand() * 5.5, throat: 1.82 + rand() * 1.36, wear: 1.28 + rand() * 0.40 };
        return { name: 'large', side: 10.8 + rand() * 6.0, run: 12.6 + rand() * 6.5, throat: 2.30 + rand() * 1.76, wear: 1.50 + rand() * 0.56 };
    }

    function buildJunctionMouth(poly, hit, rand, approachDir) {
        // A secondary crack meeting an existing fracture is a rubbed stone
        // junction, not a mathematically sharp T/Y node. We shave a short,
        // unequal section from the older seam and let the new fracture emerge
        // from a rounded pocket. Size varies per junction so the wear reads as
        // accumulated handling / rocking rather than a repeated UI motif.
        const frame = edgeFrame(poly, hit);
        const profile = chooseJunctionWearProfile(rand);
        let incoming = unitVec(approachDir || frame.inward);
        if (dotVec(incoming, frame.inward) < 0) incoming = { x: -incoming.x, y: -incoming.y };
        // v265 · contact nodes should look rubbed, not snapped. Blend a little
        // more toward the host seam's inward normal so the new branch peels out
        // of a shallow worn pocket instead of leaving a hard angular hinge.
        const entryDir = blendDir(incoming, frame.inward, 0.22 + rand() * 0.16);

        const edgeAvailBefore = hit.u * frame.edgeLen;
        const edgeAvailAfter = (1 - hit.u) * frame.edgeLen;
        if (edgeAvailBefore < 4.0 || edgeAvailAfter < 4.0) return null;

        let beforePx = profile.side * (0.82 + rand() * 0.54);
        let afterPx = profile.side * (0.82 + rand() * 0.54);
        // Unequal wear is important: one fragment often rounds farther than its
        // neighbour after repeated contact.
        if (rand() < 0.5) beforePx *= 1.15 + rand() * 0.32;
        else afterPx *= 1.15 + rand() * 0.32;
        beforePx = Math.min(beforePx, edgeAvailBefore * 0.58);
        afterPx = Math.min(afterPx, edgeAvailAfter * 0.58);

        const beforeU = hit.u - beforePx / frame.edgeLen;
        const afterU = hit.u + afterPx / frame.edgeLen;
        const shoulderBefore = pointOnHitEdge(poly, hit, beforeU, {
            outer: false, seam: true, mouth: true, junction: true,
            roundBias: 1.50 + rand() * 0.26,
            wear: (3.15 + rand() * 2.75) * profile.wear
        });
        const shoulderAfter = pointOnHitEdge(poly, hit, afterU, {
            outer: false, seam: true, mouth: true, junction: true,
            roundBias: 1.50 + rand() * 0.26,
            wear: (3.15 + rand() * 2.75) * profile.wear
        });

        const run = profile.run * (0.96 + rand() * 0.30);
        const throatCenter = {
            x: hit.x + entryDir.x * run,
            y: hit.y + entryDir.y * run,
            outer: false, seam: true, mouth: true, junction: true,
            roundBias: 1.34 + rand() * 0.20,
            wear: (3.65 + rand() * 2.85) * profile.wear
        };
        let seamNormal = unitVec({ x: -entryDir.y, y: entryDir.x });
        if (dotVec(seamNormal, frame.tangent) < 0) seamNormal = { x: -seamNormal.x, y: -seamNormal.y };
        const throatHalf = profile.throat * (1.08 + rand() * 0.18);
        const throatBefore = {
            x: throatCenter.x - seamNormal.x * throatHalf,
            y: throatCenter.y - seamNormal.y * throatHalf,
            outer: false, seam: true, mouth: true, junction: true,
            roundBias: 1.34 + rand() * 0.22,
            wear: (3.85 + rand() * 2.95) * profile.wear
        };
        const throatAfter = {
            x: throatCenter.x + seamNormal.x * throatHalf,
            y: throatCenter.y + seamNormal.y * throatHalf,
            outer: false, seam: true, mouth: true, junction: true,
            roundBias: 1.34 + rand() * 0.22,
            wear: (3.85 + rand() * 2.95) * profile.wear
        };

        // Use the existing mouth curve builder, but with a compact custom
        // profile. One side can be visibly more worn than the other.
        const pseudoProfile = {
            name: profile.name === 'large' ? 'large' : 'medium',
            widthScale: 1,
            depthScale: 1,
            throatScale: 1,
            wearScale: profile.wear * (1.02 + rand() * 0.10),
            heavyChance: profile.name === 'large' ? 0.66 : 0.36
        };
        const weatheredSide = rand() < 0.5 ? 'before' : 'after';
        const beforeChain = mouthSideChain(shoulderBefore, throatBefore, frame, entryDir, rand, {
            sign: -1,
            slowTaper: profile.name !== 'small' && rand() < 0.56,
            weathered: weatheredSide === 'before',
            profile: pseudoProfile,
            shape: weatheredSide === 'before' && rand() < 0.58 ? 'worn-bay' : 'soft-scoop'
        }).map(p => ({ ...p, junction: true }));
        const afterChain = mouthSideChain(shoulderAfter, throatAfter, frame, entryDir, rand, {
            sign: 1,
            slowTaper: profile.name === 'large' || rand() < 0.42,
            weathered: weatheredSide === 'after',
            profile: pseudoProfile,
            shape: weatheredSide === 'after' && rand() < 0.58 ? 'worn-bay' : 'rounded-ledge'
        }).map(p => ({ ...p, junction: true }));

        return {
            hasMouth: true,
            isJunction: true,
            shoulderBefore, shoulderAfter,
            throatBefore, throatAfter, throatCenter,
            beforeChain, afterChain,
            entryDir,
            junctionProfile: profile.name
        };
    }

    function buildEdgeMouth(poly, hit, rand, approachDir) {
        const rawApproach = unitVec(approachDir || { x: 0, y: 1 });
        if (!hit.outer) {
            // v264 · when a new branch lands on an older seam, carve a rounded
            // variable-size contact pocket at the junction. Only fall back to a
            // point hit for non-seam internal edges.
            if (hit.seamEdge) {
                const junction = buildJunctionMouth(poly, hit, rand, rawApproach);
                if (junction) return junction;
            }
            const p = { x: hit.x, y: hit.y, outer: false, seam: true, mouth: false, wear: 1.9 };
            return {
                hasMouth: false,
                shoulderBefore: p,
                shoulderAfter: p,
                throatBefore: p,
                throatAfter: p,
                throatCenter: p,
                beforeChain: [p],
                afterChain: [p],
                entryDir: rawApproach
            };
        }

        const frame = edgeFrame(poly, hit);
        if (hit.u < 0.075 || hit.u > 0.925) return null;

        let incoming = rawApproach;
        if (dotVec(incoming, frame.inward) < 0) incoming = { x: -incoming.x, y: -incoming.y };
        const incidence = clamp(dotVec(incoming, frame.inward), 0.16, 1);
        const entryDir = blendDir(incoming, frame.inward, incidence < 0.34 ? 0.18 : 0.035);
        const tangentIncidence = dotVec(entryDir, frame.tangent);

        const profile = chooseMouthProfile(rand);
        const slowTaper = rand() < (profile.name === 'large' ? 0.72 : profile.name === 'medium' ? 0.60 : 0.48);
        const weatheredSide = rand() < 0.5 ? 'before' : 'after';
        const heavyBefore = weatheredSide === 'before' && rand() < profile.heavyChance;
        const heavyAfter = weatheredSide === 'after' && rand() < profile.heavyChance;
        const beforeShape = chooseMouthShape(rand, heavyBefore);
        let afterShape = chooseMouthShape(rand, heavyAfter);
        if (afterShape === beforeShape && rand() < 0.62) afterShape = chooseMouthShape(rand, heavyAfter);

        // Variable mouth scale: most are modest; some refreshes contain one of
        // the broader, more weathered openings visible in the reference.
        const glancing = 1 - incidence;
        const base = (4.2 + glancing * 2.3 + rand() * 1.8) * profile.widthScale;
        let beforePx = base * (0.80 + rand() * 0.34);
        let afterPx = base * (0.80 + rand() * 0.34);
        if (tangentIncidence > 0.08) afterPx *= 1 + Math.min(0.34, tangentIncidence * 0.42);
        if (tangentIncidence < -0.08) beforePx *= 1 + Math.min(0.34, -tangentIncidence * 0.42);
        if (weatheredSide === 'before') beforePx *= 1.10 + rand() * 0.22;
        else afterPx *= 1.10 + rand() * 0.22;

        const maxMouthSide = profile.name === 'large' ? 19.5 : profile.name === 'medium' ? 15.2 : 11.0;
        beforePx = clamp(beforePx, 3.6, maxMouthSide);
        afterPx = clamp(afterPx, 3.6, maxMouthSide);

        const beforeU = hit.u - beforePx / frame.edgeLen;
        const afterU = hit.u + afterPx / frame.edgeLen;
        if (beforeU <= 0.025 || afterU >= 0.975) return null;

        const shoulderBefore = pointOnHitEdge(poly, hit, beforeU);
        const shoulderAfter = pointOnHitEdge(poly, hit, afterU);

        const baseDepth = slowTaper ? (12.6 + rand() * 8.8) : (9.4 + rand() * 6.4);
        const desiredInwardDepth = baseDepth * profile.depthScale;
        const run = clamp(
            desiredInwardDepth / Math.max(0.38, dotVec(entryDir, frame.inward)),
            8.0,
            (slowTaper ? 29.0 : 21.8) * profile.depthScale
        );
        const throatCenter = {
            x: hit.x + entryDir.x * run + frame.tangent.x * (rand() - 0.5) * (profile.name === 'large' ? 1.6 : 1.0),
            y: hit.y + entryDir.y * run + frame.tangent.y * (rand() - 0.5) * (profile.name === 'large' ? 1.6 : 1.0),
            outer: false,
            mouth: true,
            seam: true,
            wear: 2.7 * profile.wearScale
        };

        let seamNormal = unitVec({ x: -entryDir.y, y: entryDir.x });
        if (dotVec(seamNormal, frame.tangent) < 0) seamNormal = { x: -seamNormal.x, y: -seamNormal.y };

        // Wider throat than v260. Large mouths also feed a visibly broader seam,
        // giving the quadratic abrasion enough physical space to show.
        const throatBase = slowTaper ? (1.58 + rand() * 1.02) : (1.34 + rand() * 0.88);
        const throatHalf = throatBase * profile.throatScale;
        const throatBefore = {
            x: throatCenter.x - seamNormal.x * throatHalf,
            y: throatCenter.y - seamNormal.y * throatHalf,
            outer: false, mouth: true, seam: true, wear: 2.8 * profile.wearScale
        };
        const throatAfter = {
            x: throatCenter.x + seamNormal.x * throatHalf,
            y: throatCenter.y + seamNormal.y * throatHalf,
            outer: false, mouth: true, seam: true, wear: 2.8 * profile.wearScale
        };

        const beforeChain = mouthSideChain(shoulderBefore, throatBefore, frame, entryDir, rand, {
            sign: -1,
            slowTaper,
            weathered: weatheredSide === 'before',
            profile,
            shape: beforeShape
        });
        const afterChain = mouthSideChain(shoulderAfter, throatAfter, frame, entryDir, rand, {
            sign: 1,
            slowTaper,
            weathered: weatheredSide === 'after',
            profile,
            shape: afterShape
        });

        return {
            hasMouth: true,
            shoulderBefore, shoulderAfter,
            throatBefore, throatAfter, throatCenter,
            beforeChain, afterChain,
            weatheredSide,
            slowTaper,
            entryDir,
            incidence,
            mouthProfile: profile.name,
            beforeShape,
            afterShape
        };
    }


    function buildFractureCenterline(start, end, rand, startEntryDir, endEntryDir) {
        const dx = end.x - start.x, dy = end.y - start.y;
        const l = Math.hypot(dx, dy) || 1;
        const ux = dx / l, uy = dy / l;
        const nx = -uy, ny = ux;
        const segments = clamp(Math.round(l / 72), 7, 14);
        const pts = [{ ...start, seam: true }];

        const startHint = unitVec(startEntryDir || { x: ux, y: uy });
        const endHintInward = unitVec(endEntryDir || { x: -ux, y: -uy });
        const mouthGuide = Math.min(24, Math.max(12, l * 0.055));

        if (segments >= 5) {
            pts.push({
                x: start.x + startHint.x * mouthGuide + nx * (rand() - 0.5) * 1.2,
                y: start.y + startHint.y * mouthGuide + ny * (rand() - 0.5) * 1.2,
                outer: false,
                seam: true
            });
        }

        let drift = 0;
        const firstI = segments >= 5 ? 2 : 1;
        for (let i = firstI; i < segments - 1; i++) {
            const t = i / segments;
            drift += (rand() - 0.5) * 4.2;
            const maxDrift = Math.min(10.5, 3.0 + l * 0.0105);
            drift = clamp(drift, -maxDrift, maxDrift);
            let kink = 0;
            if (rand() < 0.30) kink = (rand() < 0.5 ? -1 : 1) * (1.1 + rand() * 3.5);
            pts.push({
                x: start.x + dx * t + nx * (drift + kink),
                y: start.y + dy * t + ny * (drift + kink),
                outer: false,
                seam: true
            });
        }

        if (segments >= 5) {
            pts.push({
                x: end.x + endHintInward.x * mouthGuide + nx * (rand() - 0.5) * 1.2,
                y: end.y + endHintInward.y * mouthGuide + ny * (rand() - 0.5) * 1.2,
                outer: false,
                seam: true
            });
        }
        pts.push({ ...end, seam: true });
        return pts;
    }


    function localNormal(points, i) {
        const a = points[Math.max(0, i - 1)];
        const b = points[Math.min(points.length - 1, i + 1)];
        const dx = b.x - a.x, dy = b.y - a.y;
        const l = Math.hypot(dx, dy) || 1;
        return { x: -dy / l, y: dx / l, tx: dx / l, ty: dy / l };
    }

    function seamSideSignFromEndpoint(centerline, endpoint, atStart = true) {
        // v263 · derive the retreat side from the ACTUAL mouth throat geometry.
        // v261 hard-coded +1/-1 here. That assumption fails when a fracture's
        // line direction is reversed by the intersection ordering: both slab
        // boundaries can then be displaced toward the same side and visually
        // overlap, leaving only a faint doubled line instead of negative space.
        const i = atStart ? 0 : centerline.length - 1;
        const c = centerline[i];
        const n = localNormal(centerline, i);
        const vx = endpoint.x - c.x;
        const vy = endpoint.y - c.y;
        const d = vx * n.x + vy * n.y;
        if (Math.abs(d) > 0.05) return d >= 0 ? 1 : -1;

        // Extremely narrow mouths can be numerically almost centered. Sample
        // the neighbouring centerline segment as a fallback rather than making
        // the old global-direction assumption again.
        const j = atStart ? Math.min(1, centerline.length - 1) : Math.max(0, centerline.length - 2);
        const c2 = centerline[j];
        const n2 = localNormal(centerline, j);
        const d2 = (endpoint.x - c2.x) * n2.x + (endpoint.y - c2.y) * n2.y;
        return d2 >= 0 ? 1 : -1;
    }

    function seamSidesAreSeparated(centerline, sideA, sideB) {
        if (!centerline.length || !sideA.length || !sideB.length) return false;
        const probes = [
            Math.max(1, Math.floor((centerline.length - 1) * 0.30)),
            Math.max(1, Math.floor((centerline.length - 1) * 0.50)),
            Math.max(1, Math.floor((centerline.length - 1) * 0.70))
        ];
        let opposite = 0;
        let tested = 0;
        for (const i0 of probes) {
            const i = Math.min(centerline.length - 2, i0);
            if (i <= 0 || i >= sideA.length - 1 || i >= sideB.length - 1) continue;
            const c = centerline[i];
            const n = localNormal(centerline, i);
            const da = (sideA[i].x - c.x) * n.x + (sideA[i].y - c.y) * n.y;
            const db = (sideB[i].x - c.x) * n.x + (sideB[i].y - c.y) * n.y;
            if (Math.abs(da) < 0.03 || Math.abs(db) < 0.03) continue;
            tested++;
            if (da * db < 0) opposite++;
        }
        return tested === 0 || opposite >= Math.ceil(tested * 0.67);
    }

    function cosineBell(t, center, radius) {
        const d = Math.abs(t - center);
        if (d >= radius) return 0;
        const x = d / radius;
        return 0.5 + 0.5 * Math.cos(Math.PI * x);
    }

    function buildSeamGapPlan(count, rand) {
        const widths = new Array(count).fill(0);
        const contact = new Array(count).fill(0);
        const openBoost = new Array(count).fill(0);
        const n = Math.max(1, count - 1);

        let state = 1.00 + rand() * 0.92;
        for (let i = 0; i < count; i++) {
            state = clamp(state * 0.60 + (0.70 + rand() * 1.95) * 0.40, 0.60, 2.9);
            widths[i] = state;
        }

        const bayCount = rand() < 0.56 ? 2 : 1;
        for (let b = 0; b < bayCount; b++) {
            const center = 0.22 + rand() * 0.56;
            const radius = 0.10 + rand() * 0.14;
            const amp = 0.92 + rand() * 1.85;
            for (let i = 1; i < count - 1; i++) {
                const t = i / n;
                const bell = cosineBell(t, center, radius);
                openBoost[i] += bell * amp;
                widths[i] += bell * amp;
            }
        }

        const mouthPinchSeeds = [];
        if (count >= 7) {
            mouthPinchSeeds.push(clamp(1 + Math.round(rand() * 2), 1, count - 3));
            if (count >= 9) mouthPinchSeeds.push(clamp(count - 2 - Math.round(rand() * 2), 2, count - 2));
        }
        mouthPinchSeeds.forEach((idx, order) => {
            const shouldApply = order === 0 ? true : rand() < 0.78;
            if (!shouldApply) return;
            contact[idx] = Math.max(contact[idx], 0.94);
            widths[idx] = Math.min(widths[idx], 0.055 + rand() * 0.11);
            const shoulder = idx + (idx < count / 2 ? 1 : -1);
            if (shoulder > 0 && shoulder < count - 1) {
                contact[shoulder] = Math.max(contact[shoulder], 0.52);
                widths[shoulder] = Math.min(widths[shoulder], 0.22 + rand() * 0.18);
            }
            const openIdx = idx + (idx < count / 2 ? 2 : -2);
            if (openIdx > 0 && openIdx < count - 1) {
                const openAmp = 0.72 + rand() * 1.18;
                widths[openIdx] += openAmp;
                openBoost[openIdx] += openAmp;
            }
        });

        const maxContacts = count >= 12 ? 3 : count >= 8 ? 2 : 1;
        const contactCount = 1 + Math.floor(rand() * maxContacts);
        const chosen = [];
        let guard = 0;
        while (chosen.length < contactCount && guard++ < 30) {
            const idx = clamp(Math.round((0.22 + rand() * 0.56) * n), 2, count - 3);
            if (chosen.every(v => Math.abs(v - idx) >= 2)) chosen.push(idx);
        }
        if (!chosen.length && count > 4) chosen.push(Math.floor(count / 2));

        chosen.forEach(idx => {
            contact[idx] = Math.max(contact[idx], 1);
            widths[idx] = Math.min(widths[idx], 0.030 + rand() * 0.075);
            if (idx - 1 > 0) {
                contact[idx - 1] = Math.max(contact[idx - 1], 0.68);
                widths[idx - 1] = Math.min(widths[idx - 1], 0.22 + rand() * 0.22);
            }
            if (idx + 1 < count - 1) {
                contact[idx + 1] = Math.max(contact[idx + 1], 0.68);
                widths[idx + 1] = Math.min(widths[idx + 1], 0.22 + rand() * 0.22);
            }
            if (idx - 2 > 0 && rand() < 0.72) {
                contact[idx - 2] = Math.max(contact[idx - 2], 0.32);
                widths[idx - 2] *= 0.44 + rand() * 0.18;
            }
            if (idx + 2 < count - 1 && rand() < 0.72) {
                contact[idx + 2] = Math.max(contact[idx + 2], 0.32);
                widths[idx + 2] *= 0.44 + rand() * 0.18;
            }
        });

        if (count) {
            widths[0] *= 0.48;
            widths[count - 1] *= 0.48;
        }
        return { widths, contact, openBoost, contactIndices: chosen };
    }


    function buildSeamSide(centerline, sideSign, rand, startPoint, endPoint, gapPlan, sideIdentity = 0) {
        const plan = gapPlan || buildSeamGapPlan(centerline.length, rand);
        const widths = plan.widths;
        const contacts = plan.contact || [];
        const out = [];
        const abrasionMode = rand() < 0.90;
        const abrasionStrength = 0.58 + rand() * 0.78;
        const nCount = Math.max(1, centerline.length - 1);
        // Keep each face independent, but only modestly so shared contact points
        // actually meet rather than being destroyed by unrelated randomness.
        const faceBias = sideIdentity === 0 ? (0.90 + rand() * 0.18) : (0.86 + rand() * 0.24);

        for (let i = 0; i < centerline.length; i++) {
            if (i === 0) {
                out.push({ ...startPoint, outer: false, seam: true, wear: 1.65 + rand() * 1.15 });
                continue;
            }
            if (i === centerline.length - 1) {
                out.push({ ...endPoint, outer: false, seam: true, wear: 1.65 + rand() * 1.15 });
                continue;
            }

            const p = centerline[i];
            const n = localNormal(centerline, i);
            const t = i / nCount;
            const edgeProximity = Math.pow(clamp(1 - Math.min(t, 1 - t) / 0.34, 0, 1), 1.35);
            const contactness = contacts[i] || 0;
            const contactGuard = 1 - contactness * 0.965;
            const localWear = abrasionMode
                ? edgeProximity * abrasionStrength * (0.82 + rand() * 0.74) * contactGuard
                : 0;

            let asym = faceBias * (0.86 + rand() * 0.24);
            if (contactness > 0.55) asym = 0.95 + rand() * 0.06;
            const rubbed = contactness > 0.22;
            const off = Math.min(6.1, widths[i] * asym + localWear);
            const tangential = (rand() - 0.5) * (0.34 + edgeProximity * 0.24) * (1 - contactness * 0.78);
            out.push({
                x: p.x + n.x * off * sideSign + n.tx * tangential,
                y: p.y + n.y * off * sideSign + n.ty * tangential,
                outer: false,
                seam: true,
                contact: rubbed,
                roundBias: rubbed ? (1.12 + rand() * 0.18) : undefined,
                wear: contactness > 0.55
                    ? (1.24 + rand() * 1.02)
                    : rubbed
                        ? (1.58 + rand() * 1.18 + (plan.openBoost?.[i] || 0) * 0.18)
                        : (1.75 + rand() * 1.32 + edgeProximity * (1.36 + rand() * 1.66) + (plan.openBoost?.[i] || 0) * 0.54)
            });
        }
        return out;
    }


    function splitPolygonByFracture(poly, linePoint, dir, rand) {
        const hits = linePolygonIntersections(poly, linePoint, dir);
        if (hits.length < 2) return null;
        const first = hits[0], last = hits[hits.length - 1];
        if (distance(first, last) < 110) return null;

        const firstApproach = unitVec(dir);
        const lastApproach = { x: -firstApproach.x, y: -firstApproach.y };
        const firstMouth = buildEdgeMouth(poly, first, rand, firstApproach);
        const lastMouth = buildEdgeMouth(poly, last, rand, lastApproach);
        if (!firstMouth || !lastMouth) return null;

        const center = buildFractureCenterline(
            firstMouth.throatCenter,
            lastMouth.throatCenter,
            rand,
            firstMouth.entryDir,
            lastMouth.entryDir
        );

        // v263 · IMPORTANT: retreat each stone face toward its own side of the
        // fracture. Do not assume that localNormal(+1) always corresponds to the
        // `after` mouth and localNormal(-1) to `before`; intersection ordering can
        // reverse that relationship. Derive it from the actual throat points.
        const sideASign = seamSideSignFromEndpoint(center, firstMouth.throatAfter, true);
        let sideBSign = seamSideSignFromEndpoint(center, firstMouth.throatBefore, true);
        if (sideBSign === sideASign) sideBSign = -sideASign;

        const gapPlan = buildSeamGapPlan(center.length, rand);
        let sideA = buildSeamSide(center, sideASign, rand, firstMouth.throatAfter, lastMouth.throatBefore, gapPlan, 0);
        let sideB = buildSeamSide(center, sideBSign, rand, firstMouth.throatBefore, lastMouth.throatAfter, gapPlan, 1);

        // Safety check for the exact regression visible in the user's screenshot:
        // if the two generated fracture faces still land on the same side at
        // most interior probes, rebuild B on the opposite side. This preserves
        // all v261 mouth/wear parameters while guaranteeing a real gap.
        if (!seamSidesAreSeparated(center, sideA, sideB)) {
            sideBSign = -sideASign;
            sideB = buildSeamSide(center, sideBSign, rand, firstMouth.throatBefore, lastMouth.throatAfter, gapPlan, 1);
        }

        const arcA = buildArc(poly, first.edgeIndex, last.edgeIndex, firstMouth.shoulderAfter, lastMouth.shoulderBefore);
        const arcB = buildArc(poly, last.edgeIndex, first.edgeIndex, lastMouth.shoulderAfter, firstMouth.shoulderBefore);

        const polyA = [
            ...arcA,
            ...lastMouth.beforeChain.slice(1),
            ...sideA.slice(0, -1).reverse(),
            ...firstMouth.afterChain.slice(0, -1).reverse()
        ];
        const polyB = [
            ...arcB,
            ...firstMouth.beforeChain.slice(1),
            ...sideB.slice(1),
            ...lastMouth.afterChain.slice(0, -1).reverse()
        ];

        if (polyA.length < 5 || polyB.length < 5) return null;
        if (absArea(polyA) < 9000 || absArea(polyB) < 9000) return null;
        return [polyA, polyB];
    }

    function cornerAngle(prev, cur, next) {
        const ax = prev.x - cur.x, ay = prev.y - cur.y;
        const bx = next.x - cur.x, by = next.y - cur.y;
        const al = Math.hypot(ax, ay) || 1, bl = Math.hypot(bx, by) || 1;
        const dot = clamp((ax * bx + ay * by) / (al * bl), -1, 1);
        return Math.acos(dot) * 180 / Math.PI;
    }

    function chamferAndRoughen(points, rand) {
        const base = [];
        for (let i = 0; i < points.length; i++) {
            const prev = points[(i - 1 + points.length) % points.length];
            const cur = points[i];
            const next = points[(i + 1) % points.length];

            // fracture edges and mouths are already purpose-built; don't apply
            // generic noise that would turn them into busy saw-teeth.
            if (cur.outer || cur.seam || cur.mouth) {
                base.push({ ...cur });
                continue;
            }

            const angle = cornerAngle(prev, cur, next);
            const chance = angle < 112 ? 0.52 : angle < 132 ? 0.28 : 0.12;
            if (rand() < chance) {
                const cut = 3.4 + rand() * 6.0;
                base.push(
                    { ...toward(cur, prev, Math.min(cut, distance(cur, prev) * 0.18)), outer: false },
                    { ...toward(cur, next, Math.min(cut * (0.76 + rand() * 0.30), distance(cur, next) * 0.18)), outer: false }
                );
            } else base.push({ ...cur });
        }
        return base;
    }

    // v291-opt31 · REAL desktop Index Drawer outer-rim pits.
    // Desktop V291 does not render #index-drawer::before/::after; the visible
    // shell is the generated stone-fragment silhouette itself. Therefore the
    // pit must become part of this polygon BEFORE fracture partitioning.
    function buildOuterRimPitEdge(a, b, pit = null) {
        if (!pit) return [{ ...a }, { ...b }];

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const centerT = clamp(pit.centerT, 0.06, 0.94);
        const halfT = clamp(pit.halfT, 0.025, 0.18);
        const depth = clamp(pit.depth, 1.8, 8.8);
        const variant = pit.variant || 'shallow';
        const bias = clamp(pit.bias ?? 0, -0.85, 0.85);
        const profile = variant === 'deep'
            ? [
                [-1.38, 0.00], [-1.08, 0.02], [-0.84, 0.10], [-0.62, 0.26],
                [-0.46, 0.56], [-0.28, 0.90], [-0.12, 1.16], [0.05, 1.30],
                [0.18, 1.12], [0.34, 0.78], [0.54, 0.54], [0.76, 0.30],
                [1.00, 0.10], [1.26, 0.02], [1.42, 0.00]
            ]
            : [
                [-1.28, 0.00], [-0.96, 0.10], [-0.62, 0.34], [-0.30, 0.68],
                [-0.08, 0.94], [0.00, 1.00], [0.18, 0.82], [0.46, 0.48],
                [0.82, 0.17], [1.24, 0.00]
            ];
        const edgeReach = variant === 'deep' ? 1.42 : 1.30;
        const startT = clamp(centerT - halfT * edgeReach, 0, 1);
        const endT = clamp(centerT + halfT * edgeReach, 0, 1);
        const out = [{ ...a }];
        const makeBase = (t) => ({ x: a.x + dx * t, y: a.y + dy * t });
        if (startT > 0.002) out.push({ ...makeBase(startT), outer: true, pitShoulder: true });
        profile.forEach(([offset, weight]) => {
            const side = offset < 0 ? -1 : 1;
            const sideScale = variant === 'deep'
                ? 1 + bias * side * 0.24
                : 1 + bias * side * 0.14;
            const shiftedOffset = offset * sideScale;
            const t = clamp(centerT + shiftedOffset * halfT, startT, endT);
            const base = makeBase(t);
            const lip = variant === 'deep'
                ? (Math.abs(offset) < 0.24 ? 1.08 : 1.0)
                : 1.0;
            out.push({
                x: base.x + nx * depth * weight * lip,
                y: base.y + ny * depth * weight * lip,
                outer: true,
                pit: weight > 0.001,
                pitShoulder: weight <= 0.001,
                pitVariant: variant
            });
        });
        if (endT < 0.998) out.push({ ...makeBase(endT), outer: true, pitShoulder: true });
        out.push({ ...b });
        return out.filter((point, index, arr) => {
            if (index === 0) return true;
            const prev = arr[index - 1];
            return Math.hypot(point.x - prev.x, point.y - prev.y) > 0.12;
        });
    }

    function makeOuterRimPitPlan(w, h) {
        const pitRand = mulberry32(seed ^ hash32(`${Math.round(w)}x${Math.round(h)}-outer-rim-pits-v291-opt32-r1`));
        const plan = { left: null, top: null, right: null };
        const makePit = (segment) => {
            const isDeep = pitRand() < 0.32;
            if (segment === 'top') {
                const safe = [[0.090, 0.155], [0.845, 0.910]];
                const range = safe[Math.floor(pitRand() * safe.length)] || safe[0];
                return {
                    centerT: range[0] + pitRand() * (range[1] - range[0]),
                    halfT: isDeep ? (0.040 + pitRand() * 0.014) : (0.040 + pitRand() * 0.018),
                    depth: isDeep ? (5.6 + pitRand() * 2.6) : (2.3 + pitRand() * 1.10),
                    variant: isDeep ? 'deep' : 'shallow',
                    bias: (pitRand() - 0.5) * 1.45
                };
            }
            const safe = segment === 'left'
                ? [[0.16, 0.28], [0.74, 0.86]]
                : [[0.14, 0.26], [0.72, 0.84]];
            const range = safe[Math.floor(pitRand() * safe.length)] || safe[0];
            return {
                centerT: range[0] + pitRand() * (range[1] - range[0]),
                halfT: isDeep ? (0.070 + pitRand() * 0.022) : (0.082 + pitRand() * 0.026),
                depth: isDeep ? (5.8 + pitRand() * 2.8) : (2.5 + pitRand() * 1.20),
                variant: isDeep ? 'deep' : 'shallow',
                bias: (pitRand() - 0.5) * 1.35
            };
        };
        const roll = pitRand();
        const primary = roll < 0.50 ? 'top' : (roll < 0.75 ? 'left' : 'right');
        plan[primary] = makePit(primary);
        return plan;
    }

    function protectedTitleCrossing(points, w, h) {
        // Keep the central title bands readable for the future text-fracture pass.
        const zones = [
            { x1: w * 0.34, x2: w * 0.66, y1: h * 0.025, y2: h * 0.16 },
            { x1: w * 0.34, x2: w * 0.66, y1: h * 0.73, y2: h * 0.84 }
        ];
        return points.some(p => zones.some(z => p.x >= z.x1 && p.x <= z.x2 && p.y >= z.y1 && p.y <= z.y2));
    }

    function topMouthHitAllowed(poly, hit, w) {
        if (!hit.outer) return true;
        const a = poly[hit.edgeIndex];
        const b = poly[(hit.edgeIndex + 1) % poly.length];
        if (!a || !b) return true;
        if (hit.outer && (a.pit || b.pit)) return false;

        // Only police the long horizontal top rim. The user's marked preferred
        // regions correspond roughly to these two bands; the central title gap
        // and the far corners are kept free of edge mouths.
        const isTopHorizontal = Math.abs(a.y - b.y) < 1.2 && Math.max(Math.abs(a.y), Math.abs(b.y)) < 2.5;
        if (!isTopHorizontal) return true;
        const x = hit.x / Math.max(1, w);
        return (x >= 0.21 && x <= 0.47) || (x >= 0.57 && x <= 0.82);
    }

    function splitCell(cells, index, point, angleDeg, rand, w, h) {
        if (index < 0 || index >= cells.length) return false;
        const theta = angleDeg * Math.PI / 180;
        const dir = { x: Math.cos(theta), y: Math.sin(theta) };

        // Preview the entire candidate, not only its midpoint. Top-edge mouths
        // are accepted only in the two side bands marked by the user, and the
        // crack itself must not run through the title zones.
        const hits = linePolygonIntersections(cells[index].points, point, dir);
        if (hits.length < 2) return false;
        const firstHit = hits[0];
        const lastHit = hits[hits.length - 1];
        if (!topMouthHitAllowed(cells[index].points, firstHit, w)
            || !topMouthHitAllowed(cells[index].points, lastHit, w)) return false;

        const preview = [];
        for (let i = 0; i <= 10; i++) preview.push(lerp(firstHit, lastHit, i / 10));
        if (protectedTitleCrossing(preview, w, h)) return false;

        const result = splitPolygonByFracture(cells[index].points, point, dir, rand);
        if (!result) return false;
        const original = cells[index];
        cells.splice(index, 1,
            { id: `${original.id}-a`, points: result[0] },
            { id: `${original.id}-b`, points: result[1] }
        );
        return true;
    }

    function weightedCellIndex(cells, rand) {
        const weights = cells.map(c => Math.max(0, absArea(c.points) - 12000));
        const total = weights.reduce((a, b) => a + b, 0);
        if (total <= 0) return -1;
        let r = rand() * total;
        for (let i = 0; i < cells.length; i++) {
            r -= weights[i];
            if (r <= 0) return i;
        }
        return cells.length - 1;
    }

    function buildPartition(w, h, rand) {
        const miniDrawer = document.getElementById('ruin-mini-index-drawer');
        let leftInset = w * 0.195;
        let rightInset = w * 0.115;
        let handleH = parseFloat(
            getComputedStyle(miniDrawer || document.documentElement)
                .getPropertyValue('--mini-index-handle-h')
        ) || Math.max(28, h * 0.12);

        // v377 · Preserve the desktop fracture algorithm, but feed it the
        // authored MOBILE outer silhouette on compact screens. The previous
        // shared renderer could occasionally resolve the desktop 230/168px
        // shoulder values during startup, producing the giant X-like diagonals
        // seen across the phone drawer. Mobile now derives both shoulders from
        // the real viewport frame and the real handle height.
        const compact = false;
        if (compact) {
            const drawer = document.getElementById('ruin-mini-index-drawer');
            const frame = document.querySelector('.ruin-mini-cabinet-frame');
            const handle = document.getElementById('ruin-mini-index-handle');
            const drawerRect = drawer?.getBoundingClientRect?.();
            const frameRect = frame?.getBoundingClientRect?.();
            const handleRect = handle?.getBoundingClientRect?.();
            const maxMobileInset = Math.min(32, w * 0.12);

            const liveLeft = Number(frameRect?.left) - Number(drawerRect?.left);
            const liveRight = Number(drawerRect?.right) - Number(frameRect?.right);
            const liveHandleH = Number(handleRect?.height);

            leftInset = Number.isFinite(liveLeft) && liveLeft > 0
                ? clamp(liveLeft, 10, maxMobileInset)
                : clamp(cssNumber('--frame-left', 14), 10, maxMobileInset);

            rightInset = Number.isFinite(liveRight) && liveRight > 0
                ? clamp(liveRight, 10, maxMobileInset)
                : clamp(cssNumber('--frame-right', 14), 10, maxMobileInset);

            if (Number.isFinite(liveHandleH) && liveHandleH > 8) {
                handleH = liveHandleH;
            } else {
                handleH = clamp(handleH, 44, 60);
            }
        }

        const pitPlan = makeOuterRimPitPlan(w, h);
        const leftStart = v(0, handleH, true);
        const leftTop = v(leftInset, 0, true);
        const rightTop = v(w - rightInset, 0, true);
        const rightEnd = v(w, handleH, true);
        const leftEdge = buildOuterRimPitEdge(leftStart, leftTop, pitPlan.left);
        const topEdge = buildOuterRimPitEdge(leftTop, rightTop, pitPlan.top);
        const rightEdge = buildOuterRimPitEdge(rightTop, rightEnd, pitPlan.right);
        const silhouette = [
            ...leftEdge.slice(0, -1),
            ...topEdge.slice(0, -1),
            ...rightEdge,
            v(w, h, true),
            v(0, h, true)
        ];

        const cells = [{ id: 'slab-0', points: silhouette }];
        // v393 · Phone-sized stone rubbings keep the desktop split logic, but
        // reduce density to suit the much smaller slab: usually 1–2 seams, rarely 3.
        // Desktop keeps the original 1–4 fracture range unchanged.
        const compactFractureRoll = compact ? rand() : 0;
        const target = compact
            ? (compactFractureRoll < 0.56 ? 1 : (compactFractureRoll < 0.92 ? 2 : 3))
            : 1 + Math.floor(rand() * 4);
        let made = 0;
        let attempts = 0;

        // avoid low-angle horizontal cuts. Most stone breaks are diagonal or
        // near-vertical, with secondary cuts attaching to existing seams.
        const anglePools = [
            [42, 68], [112, 138], [78, 101],
            [36, 48], [132, 145]
        ];

        const maxAttempts = 34 + target * 12;
        while (made < target && attempts++ < maxAttempts) {
            const index = weightedCellIndex(cells, rand);
            if (index < 0) break;
            const cell = cells[index];
            const c = centroid(cell.points);
            const pool = anglePools[Math.floor(rand() * anglePools.length)];
            let angle = pool[0] + rand() * (pool[1] - pool[0]);
            if (rand() < 0.5) angle += (rand() - 0.5) * 5;

            const p = {
                x: c.x + (rand() - 0.5) * w * 0.18,
                y: clamp(c.y + (rand() - 0.5) * h * 0.18, h * 0.18, h * 0.90)
            };

            if (splitCell(cells, index, p, angle, rand, w, h)) made++;
        }

        return {
            crackCount: made,
            outerPits: pitPlan,
            cells: cells
                .filter(cell => absArea(cell.points) > 5000)
                .sort((a, b) => centroid(a.points).y - centroid(b.points).y || centroid(a.points).x - centroid(b.points).x)
                .map((cell, i) => ({ id: `stone-${i + 1}`, points: cell.points }))
        };
    }

    // v291-opt01-r1 · single frosted surface, minimal-diff edition.
    // Important: no Index Drawer layout CSS is changed. The original V291
    // .index-stone-frost-face rule is reused verbatim; only the N fragment
    // surfaces are replaced by one full-size surface carrying a union SVG mask.
    function buildFrostMaskUrl(refinedCells, w, h) {
        const polygons = refinedCells.map(cell => {
            const points = cell.points
                .map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`)
                .join(' ');
            return `<polygon points="${points}" fill="white"/>`;
        }).join('');
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w.toFixed(2)} ${h.toFixed(2)}" preserveAspectRatio="none">${polygons}</svg>`;
        return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`;
    }

    function buildFrostHost(refinedCells, w, h) {
        const host = document.createElement('div');
        host.className = 'index-stone-frost-host';
        host.setAttribute('aria-hidden', 'true');

        const face = document.createElement('div');
        face.className = 'index-stone-frost-face';
        face.dataset.stoneFrostSurface = 'union';
        const mask = buildFrostMaskUrl(refinedCells, w, h);
        face.style.maskImage = mask;
        face.style.webkitMaskImage = mask;
        face.style.maskSize = '100% 100%';
        face.style.webkitMaskSize = '100% 100%';
        face.style.maskPosition = '0 0';
        face.style.webkitMaskPosition = '0 0';
        face.style.maskRepeat = 'no-repeat';
        face.style.webkitMaskRepeat = 'no-repeat';
        host.appendChild(face);
        return host;
    }

    function buildIndexImmuneFrost(drawer, drawerRect) {
        const stable = document.getElementById('ruin-mini-index-stable-zone');
        if (!stable) return null;
        const sr = stable.getBoundingClientRect();
        if (sr.width < 10 || sr.height < 10) return null;

        // v271 · Treat the lexicology area as one calm lower inscription field,
        // not merely a padded box around #index-stable-zone. The immunity veil
        // starts above the heading and feathers in vertically, then spans almost
        // the full slab width and continues to the bottom rim. This prevents a
        // diagonal seam from reappearing beside or below the last tag while the
        // 3px guard still leaves the physical outer contour visible.
        const fade = Math.max(64, Math.min(108, drawerRect.height * 0.135));
        const rimGuard = 3;
        const upperLift = Math.max(18, Math.min(34, drawerRect.height * 0.032));
        const top = Math.max(0, sr.top - drawerRect.top - fade - upperLift);
        const left = rimGuard;
        const right = rimGuard;

        // opt57 · seal the lexicology immunity field all the way to the lower
        // edge.  The old 3px bottom rim guard could expose the terminal few
        // pixels of a random stone seam, so a crack occasionally leaked out
        // beneath the last index row.  The drawer's authored outer contour is
        // rendered by its own SVG layer, therefore the immunity veil can safely
        // reach bottom:0 without erasing the physical frame line.
        const bottom = 0;

        const veil = document.createElement('div');
        veil.className = 'index-stone-crack-immunity';
        veil.setAttribute('aria-hidden', 'true');
        veil.style.top = `${top.toFixed(2)}px`;
        veil.style.left = `${left.toFixed(2)}px`;
        veil.style.right = `${right.toFixed(2)}px`;
        veil.style.bottom = `${bottom.toFixed(2)}px`;
        veil.style.setProperty('--index-immune-fade-px', `${fade.toFixed(1)}px`);
        return veil;
    }

    function ensureLayer(drawer) {
        let layer = document.getElementById(LAYER_ID);
        if (!layer) {
            layer = document.createElement('div');
            layer.id = LAYER_ID;
            layer.setAttribute('aria-hidden', 'true');
            drawer.prepend(layer);
        }
        return layer;
    }

    function render() {
        const drawer = document.getElementById('ruin-mini-index-drawer');
        if (!drawer) return;
        const compact = window.innerWidth <= 760;
        const rect = drawer.getBoundingClientRect();
        const w = rect.width, h = rect.height;
        // v393 · mobile keeps the desktop stone-partition METHOD and silhouette logic,
        // but uses a sparse fracture-count rule sized for a phone slab.
        if (w < (compact ? 260 : 400) || h < (compact ? 140 : 180)) return;

        const rand = mulberry32(seed ^ hash32(`${Math.round(w)}x${Math.round(h)}-v268`));
        const layer = ensureLayer(drawer);
        const svg = svgEl('svg', {
            viewBox: `0 0 ${w} ${h}`,
            preserveAspectRatio: 'none',
            class: 'index-stone-fragment-svg'
        });

        const partition = buildPartition(w, h, rand);
        const refinedCells = [];
        partition.cells.forEach((cell, index) => {
            const localRand = mulberry32(seed ^ hash32(cell.id) ^ (index * 0x9E3779B9));
            const refined = chamferAndRoughen(cell.points, localRand);
            refinedCells.push({
                id: cell.id,
                points: refined.map(pt => ({ ...pt }))
            });
            const path = svgEl('path', {
                d: pathD(refined),
                class: `index-stone-fragment-face index-stone-fragment-${cell.id}`,
                'data-stone-fragment': cell.id,
                'vector-effect': 'non-scaling-stroke'
            });
            path.style.setProperty('--stone-alpha', (0.84 + localRand() * 0.065).toFixed(3));
            // tiny per-face stroke variation lets near-coincident seams create
            // natural dark/light depth without a fake shadow.
            path.style.setProperty('--stone-stroke-alpha', (0.72 + localRand() * 0.15).toFixed(3));
            path.style.setProperty('--stone-stroke-width', (0.72 + localRand() * 0.16).toFixed(3));
            svg.appendChild(path);
        });

        const frostHost = buildFrostHost(refinedCells, w, h);
        const immuneVeil = compact ? null : buildIndexImmuneFrost(drawer, rect);
        if (compact) layer.replaceChildren(frostHost, svg);
        else if (immuneVeil) layer.replaceChildren(frostHost, svg, immuneVeil);
        else layer.replaceChildren(frostHost, svg);
        drawer.classList.add('index-stone-fragments-ready', 'index-stone-frosted-ready');
        drawer.dataset.stoneFragmentCount = String(partition.cells.length);
        drawer.dataset.stoneCrackCount = String(partition.crackCount);
        drawer.dataset.stoneFragmentSeed = String(seed >>> 0);
        drawer.dataset.outerRimPits = JSON.stringify(partition.outerPits || {});

        // v266 · expose the actual rendered stone polygons. The text rubbing
        // engine consumes these slab faces directly: text is allowed only where
        // a scanline intersects stone, so the complement becomes the crack mask.
        // This avoids trying to reconstruct a centerline from variable-width,
        // rounded negative seams.
        window.__indexStoneFragmentGeometry = {
            width: w,
            height: h,
            seed: seed >>> 0,
            crackCount: partition.crackCount,
            outerPits: partition.outerPits,
            cells: refinedCells,
            renderedAt: performance.now(),
            crackImmunity: immuneVeil ? {
                top: parseFloat(immuneVeil.style.top) || 0,
                left: parseFloat(immuneVeil.style.left) || 0,
                right: parseFloat(immuneVeil.style.right) || 0,
                bottom: parseFloat(immuneVeil.style.bottom) || 0
            } : null
        };
        window.dispatchEvent(new CustomEvent('index-stone-geometry-ready', {
            detail: window.__indexStoneFragmentGeometry
        }));
    }

    let raf = 0;
    let initialRenderComplete = false;
    function schedule() {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => requestAnimationFrame(() => {
            render();
            if (window.__indexStoneFragmentGeometry) initialRenderComplete = true;
        }));
    }

    function scheduleInitialIdle() {
        if (initialRenderComplete || window.__indexStoneFragmentGeometry) {
            initialRenderComplete = true;
            return;
        }
        // opt16 · historical name retained to keep call sites stable, but this is
        // no longer an idle task. Index stone geometry belongs to critical startup.
        window.StartupIdleQueue?.cancel?.('index-stone-initial');
        schedule();
    }

    function ensureReady() {
        if (window.__indexStoneFragmentGeometry) {
            initialRenderComplete = true;
            return;
        }
        window.StartupIdleQueue?.cancel?.('index-stone-initial');
        schedule();
    }

    function install() {
        const drawer = document.getElementById('ruin-mini-index-drawer');
        if (!drawer) return;
        if (drawer.dataset.ruinMiniStoneInstalled === 'true') {
            schedule();
            return;
        }
        drawer.dataset.ruinMiniStoneInstalled = 'true';
        window.__indexStoneFragmentGeometry = null;
        // v268 · if this preview shell preserves the page context between opens,
        // force a fresh random seed unless the user explicitly supplied ?stone-seed=.
        let queryHasSeed = false;
        try {
            queryHasSeed = new URLSearchParams(location.search).has('stone-seed');
        } catch (_) {}
        if (!queryHasSeed) seed = pageSeed(true);
        window.rerollIndexStoneFragments = () => {
            seed = pageSeed(true);
            initialRenderComplete = true;
            schedule();
        };
        window.ensureIndexStoneFragmentsReady = ensureReady;
        ensureLayer(drawer);
        if ('ResizeObserver' in window) {
            const ro = new ResizeObserver(() => {
                if (initialRenderComplete || window.__indexStoneFragmentGeometry) schedule();
                else scheduleInitialIdle();
            });
            ro.observe(drawer);
        } else {
            window.addEventListener('resize', () => {
                if (initialRenderComplete || window.__indexStoneFragmentGeometry) schedule();
                else scheduleInitialIdle();
            }, { passive: true });
        }
        window.addEventListener('pageshow', (event) => {
            if (event.persisted && !queryHasSeed) {
                seed = pageSeed(true);
                schedule();
            }
        });
        document.fonts?.ready?.then(() => {
            if (initialRenderComplete || window.__indexStoneFragmentGeometry) schedule();
            else scheduleInitialIdle();
        }).catch(() => {});
        scheduleInitialIdle();
    }

    window.installRuinMiniStoneFragments = install;
    if (document.getElementById('ruin-mini-index-drawer')) install();
})();
// === RUIN MINI SOURCE STONE PORT END ===
