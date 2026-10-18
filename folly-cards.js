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
     assets:{structure:['structure-1.jpg','structure-2.jpg','structure-3.jpg'].map(function(f){return LOCAL_VIDEO+'folly-1-assets/'+f;}),detail:['instrument-1.jpg','instrument-2.jpg','instrument-3.jpg'].map(function(f){return LOCAL_VIDEO+'folly-1-assets/'+f;}),film:LOCAL_VIDEO+'folly-1-assets/instrument-1.mp4'},
     year:2025,kind:'linear',endTime:150,
     stages:[
       {start:0, end:20, zh:'滞岸',en:'Stranded',ja:'滞岸'},
       {start:20,end:42,zh:'维系',en:'Holding',ja:'維持'},
       {start:42,end:56,zh:'蚀变',en:'Erosion',ja:'侵食'},
       {start:56,end:84,zh:'挣动',en:'Struggle',ja:'抗い'},
       {start:84,end:124,zh:'空撑',en:'Futile Support',ja:'空支'},
       {start:124,end:150,zh:'余响',en:'Afterecho',ja:'余韻'}
     ]},
    {id:'folly-2',roman:'II',title:{zh:'朽塔焦土',en:'Aether Scorched-Earth',ja:'朽塔の焦土'},
     media:LOCAL_VIDEO+'folly-2/',poster:PHOTOS+'aether-scorched-earth.webp',
     assets:{structure:['structure-1.jpeg','structure-2.JPG','structure-3.JPG','structure-4.jpeg'].map(function(f){return LOCAL_VIDEO+'folly-2-assets/'+f;}),detail:['instrument-1.jpg','instrument-2.jpeg','instrument-3.jpeg'].map(function(f){return LOCAL_VIDEO+'folly-2-assets/'+f;}),film:LOCAL_VIDEO+'folly-2-assets/instrument-2.mp4'},
     year:2026,kind:'radial',endTime:255,
     stages:[
       {start:0,end:28,zh:'狭间',en:'Interval',ja:'狭間'},
       {start:28,end:67,zh:'构合',en:'Assembly',ja:'構合'},
       {start:67,end:105,zh:'震颤',en:'Tremor',ja:'震動'},
       {start:105,end:142,zh:'风蚀',en:'Weathering',ja:'風食'},
       {start:142,end:198,zh:'共振',en:'Resonance',ja:'共振'},
       {start:198,end:231,zh:'余鸣',en:'Reverberation',ja:'残響'},
       {start:231,end:255,zh:'虚基',en:'Absent Base',ja:'虚基'}
     ]}
  ];
  var COPY = {
    zh:{group:'废墟园林 / 图景',instruction:'向右翻阅散落的瞬间',seek:'滑动阶段',open:'观看这一瞬间',close:'回到图景',prev:'上一阶段',next:'下一阶段',sound:'打开声音',mute:'静音',play:'继续',pause:'暂停',score:'检视图谱',reset:'复位',loading:'影像就位中',missing:'这一阶段的影像尚未就位',allEnd:'本卷已至尾声',hintI:'图谱随时间逆行 · 悬停校准指针',hintII:'三角翼可折叠 · 悬停校准指针',loadingPoster:'',zoom:'放大'},
    en:{group:'FOLLY / TABLEAUX',instruction:'Move right through scattered moments.',seek:'Move through stages',open:'Open this moment',close:'Return to the tableaux',prev:'Previous stage',next:'Next stage',sound:'Sound on',mute:'Mute',play:'Resume',pause:'Pause',score:'Inspect the score',reset:'Reset',loading:'Preparing the moving image',missing:'This fragment is not available yet',allEnd:'The sequence has ended',hintI:'Score runs in reverse · Hover to calibrate',hintII:'Three folding wings · Hover to calibrate',loadingPoster:'',zoom:'Zoom'},
    ja:{group:'フォリー / 風景の断片',instruction:'右へ進み、散らばった瞬間をたどる。',seek:'段階を移動',open:'この瞬間を見る',close:'風景に戻る',prev:'前の段階',next:'次の段階',sound:'音声オン',mute:'消音',play:'再開',pause:'一時停止',score:'楽譜を検視',reset:'リセット',loading:'映像を準備中',missing:'この断片はまだありません',allEnd:'この巻は終わりました',hintI:'楽譜は逆行 · ホバーで校正',hintII:'三つの翼を折る · ホバーで校正',loadingPoster:'',zoom:'拡大'}
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
    zh:{front:'正面 / 全貌',back:'背面',instrument:'仪器',body:'主体细部',moving:'影像卡片',movement:'废墟剧场',score:'废墟乐谱',scoreOpen:'展开图谱',scoreClose:'返回图谱',scoreFold:'折叠 / 展开',scoreReset:'复位',frame:'记谱帧'},
    en:{front:'Full view',back:'Back view',instrument:'Instrument',body:'Body detail',moving:'Film Card',movement:'Ruin Theatre',score:'Ruin Score',scoreOpen:'Enlarge score',scoreClose:'Return to score',scoreFold:'Fold / unfold',scoreReset:'Reset',frame:'Score frame'},
    ja:{front:'全景',back:'背面',instrument:'器械',body:'本体細部',moving:'映像カード',movement:'廃墟劇場',score:'廃墟の楽譜',scoreOpen:'譜面を拡大',scoreClose:'譜面に戻る',scoreFold:'折る / 開く',scoreReset:'リセット',frame:'譜面フレーム'}
  };
  function term(key){return (SECTION_TERMS[state.lang]||SECTION_TERMS.zh)[key];}
  function essay(si,key){return label(SERIES_COPY[si][key]);}
  // Exhibition reading texts: sourced from the two authored site statements
  // and the manifesto's chapters on postdramatic space, the collapsible
  // instrument and the final self-destroying note. Editable by series/phase.
  var GARDEN_READING={
    zh:{
      heads:['坍塌结构','废墟乐器','废墟剧场'],
      stage:{structure:[['建造','下垂','坍缩'],['垂立','松动','失衡','倒塌']],detail:[['置放','搏动','熔毁'],['悬挂','感应','摔碎']]},
      works:[
        {garden:'死水心室的构造取自沉墟中失去流动的水域：爆裂的储水形态、残余的心室结构与一潭死水彼此牵连。水体缓慢流失，承托随之消退；原本依靠内部平衡维系的材料在自重中挤压、碎裂、向内收缩，最后仍留在死水里继续腐蚀。',
         instrument:'「锈血心脏」由锈蚀金属碎片与玻璃罩构成，嵌在心室的钢筋与钢索连接之中。心室的下沉牵动滑轮与泵片，将缓慢的坍塌转为急促的敲击；每一次搏动都借来园林衰败的力量，同时耗损维持自身运作的结构。',
         theatre:'死水心室的下沉与锈血心脏的搏动在同一段时间内相互牵动。声音从承重、牵引、碰撞和材料失效中发生，越接近最后一次敲击，乐器便越难继续维持原有形态。',
         score:'这份图谱由「坍塌构造：死水心室」的钢筋残片结构设计图与「废墟乐器：锈血心脏」循环开关的电路图叠合而成。两套图线在同一平面交错：随着钢筋锈蚀、应力衰减，图谱记录着心室坍缩时构件的位移与机械联动，而坍塌的进程又经感应装置传入电子线路，转化为不断加速的敲击与搏动。位移、断裂与发声逐渐加重「锈血心脏」的运行负荷，使它在愈发急促的跳动中最终熔毁；原本用于设计与记录的图纸，也由此成为心室坍缩的变奏曲。',
         phases:{
           structure:[
             [
               "由储水外壳、心室残构与死水潭形成的初始园林。",
               "构件以预设的连接与承托关系暂时维持形态，水的重量与被围困的空隙共同组成建造后的静止状态。"
             ],
             [
               "承托退去，心室构件开始下垂。",
               "水体流失以后，受重力牵引的构件逐渐改变方向，原先维持距离的部分彼此靠近，坍缩从内部开始。"
             ],
             [
               "心室向内坍缩，残部留在死水之中。",
               "挤压、碎裂与下沉使初始结构失去轮廓；园林的毁坏没有随这次坍缩结束，材料仍继续浸泡和腐蚀。"
             ]
           ],
           detail:[
             [
               "锈血心脏被置放在心室的传力路径末端。",
               "锈蚀金属碎片封存在玻璃罩内，与钢索、滑轮和泵片相连，等待园林传来的牵引。"
             ],
             [
               "心室的沉降被转成一次次搏动。",
               "金属摩擦、泵片运动和渐密的敲击共同构成声音，乐器在运作中不断耗损维持自身的连接。"
             ],
             [
               "锈血心脏在终末运动中熔毁。",
               "由园林传来的力量和持续的过载终于破坏其发声构造；这场执意的销毁使原先的运作秩序无法恢复。"
             ]
           ]
         }},
        {garden:'朽塔由三组向外牵引的钢缆与中央悬垂的重物勉强维持垂立，底部的玻璃轴球承受着微小的偏移。钢缆逐渐疲劳，张力和重心开始改变；地面的「塌别塔」又反复旋转碾磨，使支撑塔身的结构在持续扰动中走向坍落。',
         instrument:'「以太狭间」把摆动天线、以太琴的干涉场和砂盘连接为一条回路：电磁变化转为频率、声音与振动，再由砂粒留下短暂图形。不断掉落的黑砂与积累的静电噪声，使这套努力维持秩序的装置逐渐逼近自身的负荷极限。',
         theatre:'朽塔、以太狭间与地面旋转的塌别塔共同参与这场演奏。砂粒聚散，塔身摇摆，磨盘反复碾压地表与钢缆；一种秩序持续制造声音，又以自己的运作削弱另一种秩序。',
         score:'折翼与双指针把这些运动的先后、偏移与关联保存在同一张图面上。它随剧场进度改变，也可以被独立折叠与检视；当传力关系松开，记谱留下的便是声响发生过的痕迹。',
         phases:{
           structure:[
             [
               "钢缆与悬垂重物将朽塔维持在垂立状态。",
               "三点锚固和底部轴球承受着细微的偏移，塔身暂时停留在近乎失衡的张拉关系之中。"
             ],
             [
               "连接与牵引开始松动。",
               "钢缆逐渐疲劳，地面磨盘的反复扰动传入支撑部位，原本紧绷的关系出现间隙。"
             ],
             [
               "重心偏移，朽塔进入失衡。",
               "承重与牵引不再彼此抵消，底部的倾斜逐渐扩大，维系直立的力量反过来推动倾倒。"
             ],
             [
               "张拉结构失效，朽塔最终倒塌。",
               "塔身越过底部轴球允许的角度并撞向地面，残余钢缆与磨盘继续搅动散落的材料。"
             ]
           ],
           detail:[
             [
               "以太狭间的感应部件被悬挂起来。",
               "天线、线缆与砂盘建立起尚未运作的联系，乐器暂时维持着等待感应的姿态。"
             ],
             [
               "电磁干涉被感应并转成声音与振动。",
               "砂盘留下短暂的图形；静电、砂粒的散落与不断积累的噪声，使这一回路始终处于扰动之中。"
             ],
             [
               "乐器在传来的冲击中摔碎。",
               "园林失衡的力量沿连接传至以太狭间，感应与发声的构件遭到破坏，原有回路随之终止。"
             ]
           ]
         }}
      ]
    },
    en:{
      heads:['Collapsing Structure','Ruin Instrument','Ruin Theatre'],
      stage:{structure:[['Construction','Sagging','Inward Collapse'],['Upright','Loosening','Imbalance','Collapse']],detail:[['Placement','Pulsation','Meltdown'],['Suspension','Sensing','Shattering']]},
      works:[
        {garden:'The stagnant-heart structure grows from a reservoir shell, the remains of a heart chamber and a pool of still water. As the water drains, internal support gives way. Under its own weight the construction compresses, fractures and contracts, leaving parts immersed and exposed to further corrosion.',
         instrument:'The Rust-Blood Heart encloses pieces of corroded metal in glass, connected to the ruined chamber by steel cables, pulleys and a pump blade. The chamber’s slow descent is transmitted as increasingly rapid knocks: each beat borrows energy from the garden’s collapse while consuming the instrument itself.',
         theatre:'The sinking chamber and the beating heart move through the same time. Sound arises from load, tension, collision and structural failure; as the final blow approaches, the instrument loses the conditions that held it together.',
         score:'This score overlays the structural drawing of the rebar fragments in “Collapsing Structure: Stagnant Heart Chamber” with the circuit diagram of the cycling switch in “Ruin Instrument: Rust-Blood Heart.” Their lines intersect on a single plane: as the steel corrodes and its stresses diminish, the drawing records the shifting components and mechanical linkages of the chamber’s collapse, while sensors carry the progress of that collapse into an electronic circuit, turning it into increasingly rapid knocks and pulses. Each displacement, fracture and sound adds to the load on Rust-Blood Heart, driving its beat faster until it finally melts down. What began as a drawing for design and documentation thus becomes a set of variations on the chamber’s collapse.',
         phases:{
           structure:[
             [
               "The reservoir shell, chamber remnants and still water form the garden’s initial construction.",
               "Connections and supports hold the elements in place. Water and the spaces enclosed by the structure remain momentarily still."
             ],
             [
               "As support recedes, the chamber’s components begin to sag.",
               "With the loss of water, gravity draws the members out of alignment. Previously separated parts move closer as collapse begins within."
             ],
             [
               "The chamber collapses inward, leaving remnants in still water.",
               "Compression, fractures and subsidence undo its initial outline; immersion and corrosion continue after the collapse."
             ]
           ],
           detail:[
             [
               "The Rust-Blood Heart is placed at the end of the chamber’s force-transmission path.",
               "Rusted fragments are sealed in glass and connected to cables, pulleys and a pump blade, awaiting the pull of the garden."
             ],
             [
               "The chamber’s descent becomes a succession of pulses.",
               "Friction, the pump blade and increasingly frequent impacts make sound while wearing away the connections that sustain the instrument."
             ],
             [
               "The Rust-Blood Heart melts apart in its final motion.",
               "Force transmitted from the garden and continuing overload destroy its sounding structure; this deliberate destruction ends its former order of operation."
             ]
           ]
         }},
        {garden:'Three outward cable anchors and a suspended weight hold the Ruined Tower upright around a glass pivot. As cable tension weakens, its centre of gravity shifts. The ground-level grinding structure repeatedly wears at its supports until the tower can no longer keep its precarious balance.',
         instrument:'Aether Interval links moving antennas, a theremin-like interference field and a sand plate. Electromagnetic changes become frequency, sound and vibration before briefly appearing in the sand. Falling grains, static charge and electronic noise gradually burden the apparatus.',
         theatre:'The tower, the aether interval and the ground-level grinder perform together. Sand gathers and disperses, cables tremble and the wheel abrades the ground. One order produces sound through the very motions that undermine another.',
         score:'Folding wings and paired pointers hold movements, deviations and their relationships in one plane. The score follows the film but may also be folded and examined independently; once the mechanism fails, its marks remain.',
         phases:{
           structure:[
             [
               "Cables and a suspended weight hold the tower upright.",
               "Three anchors and the glass pivot accommodate minute deviations; the tower stands only through a precarious balance of tension."
             ],
             [
               "Connections and restraints begin to loosen.",
               "Cable fatigue and repeated disturbance from the ground-level grinder open gaps in what had been a taut arrangement."
             ],
             [
               "The centre of gravity shifts and the tower loses balance.",
               "Load and counter-tension no longer cancel one another; the tilt at the base grows as the original supports begin to drive the fall."
             ],
             [
               "The tensile order fails and the tower collapses.",
               "It passes the pivot’s permissible angle and strikes the ground while the cables and grinder continue to disturb the debris."
             ]
           ],
           detail:[
             [
               "The sensing parts of Aether Interval are suspended.",
               "Antennas, cables and a sand plate are connected but still at rest, holding the instrument in readiness."
             ],
             [
               "Electromagnetic interference is sensed and converted into sound and vibration.",
               "The sand briefly retains its patterns while static, falling grains and accumulating noise disturb the circuit."
             ],
             [
               "The instrument shatters under the transmitted impact.",
               "The garden’s loss of balance reaches Aether Interval through its connections, breaking the components of sensing and sound."
             ]
           ]
         }}
      ]
    },
    ja:{
      heads:['崩壊する構造','廃墟の楽器','廃墟劇場'],
      stage:{structure:[['構築','垂下','圧潰'],['直立','緩み','均衡喪失','倒壊']],detail:[['設置','鼓動','溶融崩壊'],['懸架','感応','落下破砕']]},
      works:[
        {garden:'「死水心室」は破裂した貯水槽の形態、心室の残存構造、淀んだ水から組み立てられる。水が失われるにつれ内部の支持も消え、構造は自重で押し潰され、割れ、内側へと縮む。残った部分は水に浸されたまま腐食を続ける。',
         instrument:'錆びた金属片をガラスに封じた「錆血の心臓」は、鋼索と滑車、ポンプ片を通じて心室につながる。ゆっくりした沈下が急速な打撃へと変わり、一度の鼓動ごとに園林の崩壊から力を借りながら、自らの構造も消耗する。',
         theatre:'沈む心室と鼓動する心臓は同じ時間を生きる。音は荷重、張力、衝突、構造の失効から生まれ、最後の一打に近づくほど、楽器は元の姿を維持できなくなる。',
         score:'この譜面は、「崩壊構造：死水の心室」の鉄筋残片の構造設計図と、「廃墟の楽器：錆血の心臓」の循環スイッチの回路図を重ね合わせて生まれた。二つの図面の線は同じ平面で交わり、鉄筋の腐食と応力の低下に伴って心室が圧潰していく過程で、部材の変位と機械的な連動を記録する。同時に、崩壊の進行は感知装置から電子回路へと伝えられ、次第に速まる打撃と鼓動の音へと変わっていく。変位と断裂、発声を重ねるほど「錆血の心臓」にかかる負荷は増し、鼓動を速めながら、ついには溶け崩れる。こうして設計と記録のために引かれた線は、心室の圧潰をめぐる変奏曲の譜面となる。',
         phases:{
           structure:[
             [
               "貯水槽の殻と心室の残構、淀んだ水によって園林が組み上がる。",
               "部材はあらかじめ配置された接続と支持によって形を保ち、水の重みと囲い込まれた空隙が静止した姿をつくる。"
             ],
             [
               "支えを失った心室の部材が垂れ下がり始める。",
               "水が減るにつれ、重力に引かれた部材の向きが変わり、離れていた部分が近づいて内部から崩れ始める。"
             ],
             [
               "心室が内側へ圧潰し、残部が淀んだ水に残る。",
               "圧縮、亀裂、沈下によって当初の輪郭が失われる。崩壊のあとも浸水と腐食は続いていく。"
             ]
           ],
           detail:[
             [
               "錆血の心臓が心室の力の伝達経路の末端に置かれる。",
               "錆びた金属片はガラスに封じられ、鋼索、滑車、ポンプ片を通じて園林からの牽引を待つ。"
             ],
             [
               "心室の沈下が繰り返す鼓動へと変わる。",
               "摩擦、ポンプ片の運動、密度を増す打撃が音を生み、楽器は発声しながら自らの接続をすり減らす。"
             ],
             [
               "錆血の心臓は最後の運動のなかで溶融し、壊れていく。",
               "園林から届く力と過負荷が発声の構造を破壊し、意図された終結によって元の運作秩序は失われる。"
             ]
           ]
         }},
        {garden:'「朽塔」は外側へ伸びる三本の鋼索と吊り下げた重りによって、ガラスの軸球の上で辛うじて直立する。張力が衰え、重心が揺らぎ、地上の磨盤が支持部を繰り返し削ることで、塔はついに均衡を失う。',
         instrument:'「エーテルの狭間」は揺れるアンテナ、テルミンに似た干渉場、砂盤を一つの回路につなぐ。電磁的な変化は周波数、音、振動となり、砂に短い模様を残す。砂の流出と静電気、電子雑音は装置への負荷を増していく。',
         theatre:'朽塔、エーテルの狭間、地上の磨盤が一つの演奏に加わる。砂は集まり散り、鋼索は揺れ、磨盤は地表を削る。一つの秩序が音を生みながら、別の秩序の足場を失わせていく。',
         score:'折り畳まれる翼と二本の指針が、運動とずれ、そのつながりを平面に留める。映像と連動しながら独立して折り畳み、検分することもできる。機構が壊れたあとにも痕跡は残る。',
         phases:{
           structure:[
             [
               "鋼索と吊り重りが朽塔を直立させている。",
               "三点の錨と底部のガラスの軸球がわずかなずれを受け止め、塔は危うい張力の均衡によって立っている。"
             ],
             [
               "接続部と鋼索の緊張が緩み始める。",
               "鋼索の疲労と地上の磨盤による反復した揺さぶりが、張り詰めていた支持関係に隙間を生む。"
             ],
             [
               "重心が移動し、朽塔は均衡を失う。",
               "荷重と牽引が釣り合わなくなり、基部の傾きが増して、支える力そのものが転倒を促す。"
             ],
             [
               "張力による支持が破綻し、朽塔は倒壊する。",
               "塔は軸球の許容角を越えて地面に落ち、鋼索と磨盤が散らばった部材をなお動かし続ける。"
             ]
           ],
           detail:[
             [
               "エーテルの狭間の感応部が宙に吊られる。",
               "アンテナ、鋼索、砂盤が接続され、まだ動き出さない楽器は感応を待つ姿勢を保つ。"
             ],
             [
               "電磁的な干渉が感知され、音と振動に変わる。",
               "砂盤には一時的な模様が残り、静電気と落ちる砂、増していく雑音が回路を揺さぶる。"
             ],
             [
               "伝わってきた衝撃によって楽器が落下し、砕ける。",
               "園林の均衡喪失が接続を通じてエーテルの狭間に及び、感応と発声を担う部材を破壊する。"
             ]
           ]
         }}
      ]
    }
  };
  function reading(si){return (GARDEN_READING[state.lang]||GARDEN_READING.zh).works[si];}
  function readingHead(i){return (GARDEN_READING[state.lang]||GARDEN_READING.zh).heads[i];}
  function phaseName(si,kind,i){return (GARDEN_READING[state.lang]||GARDEN_READING.zh).stage[kind][si][i];}
  var i18n=function(k){return (COPY[state.lang]||COPY.zh)[k]||'';};
  var label=function(obj){return obj[state.lang]||obj.zh||'';};
  var esc=function(v){return escapeHtml(v == null?'':String(v));};
  var pad=function(n){return String(n).padStart(2,'0');};
  var clamp=function(x,min,max){return Math.max(min,Math.min(max,Number(x)||0));};
  var source=function(s,i){return s.media+String(i+1)+'.mp4';};
  // Artist's newly uploaded fifteen-frame Folly I stop-motion score.
  // Use the real local frames on both desktop and mobile until a distinct
  // authored mobile sequence exists; do not silently fall back to Ruin Archive.
  var FILES_I=Array.from({length:15},function(_,i){return LOCAL_VIDEO+'score-1/score-1-'+(i+1)+'.webp';});
  var FILES_I_MOBILE=FILES_I;
  var FOLD_BASE=ARCHIVE+'attachments/aether-scorched-earth/';
  var selection={series:0,index:0,focus:[0,0],open:false,muted:true,paused:false,scoreInspect:false,scoreZoom:1,scorePanX:0,scorePanY:0,folds:[0,0,0],lastTime:0,manualFrame:null,instrument:false};
  var scene=null,player=null,serial=0,queue=[],previewInFlight=0,previewComplete=new Set(),mountedToken=0;
  // Only one in-card film is allowed to play. The still-image extraction uses
  // a different off-screen video so hovering cannot disturb decoding.
  var hoverFilm={
    card:null,video:null,si:-1,index:-1,kind:'film',timer:0,leaveTimer:0,
    request:0,active:false,scrubbing:false,sliderHover:false,seekFraction:null,followRail:false
  };
  var hoverRailMotion=0;
  function stopHoverRailMotion(){if(hoverRailMotion){cancelAnimationFrame(hoverRailMotion);hoverRailMotion=0;}}
  // A time-driven travelling film strip. A single RAF follows media time;
  // each frame advances the *real* horizontal scroll position, not a fake transform.
  function followHoverFilm(){
    if(hoverRailMotion)return;
    var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function tick(){
      hoverRailMotion=0;
      if(!isLive()||!hoverFilm.active||!hoverFilm.followRail||
         hoverFilm.kind!=='film'||selection.open)return;
      var si=hoverFilm.si,rail=railFor(si),video=hoverFilm.video;
      if(!rail||!video)return;
      if(!hoverFilm.scrubbing){
        var stage=SERIES[si].stages[hoverFilm.index];
        var frac=video.duration>0?clamp(video.currentTime/video.duration,0,1):0;
        var absolute=stage.start+(stage.end-stage.start)*frac;
        var max=Math.max(0,rail.scrollWidth-rail.clientWidth);
        var target=max*clamp(absolute/SERIES[si].endTime,0,1);
        // Set the lock through the following scroll event; otherwise its
        // ordinary gallery logic would overwrite the film-driven slider.
        railOriginLocks[si]=true;
        var diff=target-rail.scrollLeft;
        if(Math.abs(diff)>.4)rail.scrollLeft+=diff*(reduced?1:.095);
        hoverFilm.card?.style.setProperty('--fc-card-progress',Math.round(frac*100)+'%');
      }
      hoverRailMotion=requestAnimationFrame(tick);
    }
    hoverRailMotion=requestAnimationFrame(tick);
  }
  function stopHoverFilm(){
    stopHoverRailMotion();
    hoverFilm.request++;
    clearTimeout(hoverFilm.timer);
    clearTimeout(hoverFilm.leaveTimer);
    hoverFilm.timer=0;hoverFilm.leaveTimer=0;
    if(hoverFilm.video){
      try{
        hoverFilm.video.ontimeupdate=null;
        hoverFilm.video.onended=null;
        hoverFilm.video.pause();
        hoverFilm.video.removeAttribute('src');
        hoverFilm.video.load();
      }catch(_){}
    }
    hoverFilm.card?.classList.remove('is-hovering','is-previewing');
    hoverFilm.card?.style.removeProperty('--fc-card-progress');
    if(hoverFilm.si>=0)block(hoverFilm.si)?.querySelector('[data-fc-slider]')?.classList.remove('is-hover-progress');
    var previousSeries=hoverFilm.si;
    if(previousSeries>=0)railOriginLocks[previousSeries]=false;
    hoverFilm.card=null;hoverFilm.video=null;
    hoverFilm.si=-1;hoverFilm.index=-1;hoverFilm.kind='film';
    hoverFilm.active=false;hoverFilm.scrubbing=false;hoverFilm.sliderHover=false;
    hoverFilm.followRail=false;hoverFilm.seekFraction=null;
    if(previousSeries>=0&&scene&&!selection.open){
      var rail=railFor(previousSeries),range=block(previousSeries)?.querySelector('[data-fc-slider]');
      if(rail&&range){
        var max=Math.max(1,rail.scrollWidth-rail.clientWidth);
        range.value=String(Math.round(1000*rail.scrollLeft/max));
        range.style.setProperty('--fc-preview-progress',range.value/10+'%');
      }
    }
  }
  // Allow the pointer to travel from a card to the slider below it
  // without erasing the playing preview at the first pixel of empty space.
  function scheduleHoverStop(delay){
    clearTimeout(hoverFilm.leaveTimer);
    hoverFilm.leaveTimer=window.setTimeout(function(){
      hoverFilm.leaveTimer=0;
      if(!hoverFilm.scrubbing&&!hoverFilm.sliderHover)stopHoverFilm();
    },delay||750);
  }
  function seekPreviewFraction(video,fraction){
    if(!video||!Number.isFinite(video.duration)||video.duration<=0)return;
    var target=Math.min(video.duration-.06,video.duration*clamp(fraction,0,1));
    try{video.currentTime=Math.max(0,target);}catch(_){}
  }
  function startHoverFilm(card,si,index,delay,options){
    if(!card?.isConnected||selection.open||!isLive())return;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    var opts=options||{};
    var fraction=Number.isFinite(opts.fraction)?clamp(opts.fraction,0,1):null;
    if(hoverFilm.card===card&&(hoverFilm.active||hoverFilm.timer||hoverFilm.video)){
      clearTimeout(hoverFilm.leaveTimer);hoverFilm.leaveTimer=0;
      if(fraction!==null){
        hoverFilm.seekFraction=fraction;
        if(hoverFilm.video)seekPreviewFraction(hoverFilm.video,fraction);
      }
      return;
    }
    stopHoverFilm();
    var rail=railFor(si);
    if(!rail||rail.classList.contains('is-dragging'))return;
    var isInstrument=card.hasAttribute('data-fc-instrument-card');
    hoverFilm.card=card;hoverFilm.si=si;hoverFilm.index=index;
    hoverFilm.kind=isInstrument?'instrument':'film';
    hoverFilm.scrubbing=!!opts.scrubbing;
    hoverFilm.sliderHover=!!opts.fromSlider;
    hoverFilm.followRail=!isInstrument;
    hoverFilm.seekFraction=fraction;
    card.classList.add('is-hovering');
    var ticket=hoverFilm.request;
    hoverFilm.timer=window.setTimeout(function(){
      hoverFilm.timer=0;
      if(ticket!==hoverFilm.request||selection.open||!card.isConnected)return;
      var film=card.querySelector('.fc-hover-video');
      if(!film)return;
      hoverFilm.video=film;
      film.loop=isInstrument;film.muted=true;film.preload='metadata';
      film.src=isInstrument?SERIES[si].assets.film:source(SERIES[si],index);
      film.onended=function(){
        if(ticket!==hoverFilm.request||selection.open||isInstrument)return;
        var next=index+1;
        if(next>=SERIES[si].stages.length){
          stopHoverRailMotion();
          hoverFilm.followRail=false;
          return;
        }
        var nextCard=block(si)?.querySelector('[data-fc-card="'+next+'"]');
        if(nextCard)startHoverFilm(nextCard,si,next,0,{fraction:0});
      };
      film.ontimeupdate=function(){
        if(hoverFilm.video!==film||selection.open||hoverFilm.scrubbing)return;
        var duration=Number.isFinite(film.duration)&&film.duration>0?film.duration:1;
        var fraction=clamp(film.currentTime/duration,0,1);
        var stage=SERIES[si].stages[index];
        var t=isInstrument?SERIES[si].endTime*fraction:stage.start+(stage.end-stage.start)*fraction;
        updateInlineScore(si,t);
        var range=block(si)?.querySelector('[data-fc-slider]');
        if(range){
          range.value=String(Math.round(1000*clamp(t/SERIES[si].endTime,0,1)));
          range.style.setProperty('--fc-preview-progress',range.value/10+'%');
          range.classList.add('is-hover-progress');
        }
        card.style.setProperty('--fc-card-progress',Math.round(fraction*100)+'%');
      };
      function begin(){
        if(ticket!==hoverFilm.request||selection.open||!card.isConnected)return;
        if(hoverFilm.seekFraction!==null)seekPreviewFraction(film,hoverFilm.seekFraction);
        else{
          try{film.currentTime=Math.min(2,Math.max(0,film.duration-.3));}catch(_){}
        }
        var promise=film.play();
        if(promise?.then)promise.then(function(){
          if(ticket!==hoverFilm.request){film.pause();return;}
          hoverFilm.active=true;
          card.classList.add('is-previewing');
          if(hoverFilm.scrubbing)film.pause();
          else if(!isInstrument)followHoverFilm();
        }).catch(function(){/* A browser may restrict muted preview autoplay. */});
      }
      if(film.readyState>=1)begin();
      else film.addEventListener('loadedmetadata',begin,{once:true});
      film.load();
    },delay);
  }
  // The rail's range input is a gallery navigator at rest. During a
  // hover preview it becomes a *time* scrubber, including across clips.
  function seekHoverFilmByTime(si,absolute){
    if(hoverFilm.si!==si||hoverFilm.kind!=='film'||!hoverFilm.card)return false;
    var series=SERIES[si],at=clamp(absolute,0,series.endTime);
    var idx=stageByTime(series,at),stage=series.stages[idx];
    var fraction=clamp((at-stage.start)/Math.max(.001,stage.end-stage.start),0,1);
    if(idx!==hoverFilm.index){
      var target=block(si)?.querySelector('[data-fc-card="'+idx+'"]');
      if(!target)return false;
      startHoverFilm(target,si,idx,0,{fraction:fraction,scrubbing:true,fromSlider:true});
      // A manually moved time line positions the real card rail directly.
      var rail=railFor(si);
      if(rail){
        railOriginLocks[si]=true;
        rail.scrollLeft=Math.max(0,rail.scrollWidth-rail.clientWidth)*at/series.endTime;
      }
    }else{
      hoverFilm.scrubbing=true;hoverFilm.sliderHover=true;
      hoverFilm.seekFraction=fraction;
      if(hoverFilm.video){
        hoverFilm.video.pause();
        seekPreviewFraction(hoverFilm.video,fraction);
      }
      var rail=railFor(si);
      if(rail){
        railOriginLocks[si]=true;
        rail.scrollLeft=Math.max(0,rail.scrollWidth-rail.clientWidth)*at/series.endTime;
      }
    }
    hoverFilm.card?.style.setProperty('--fc-card-progress',Math.round(fraction*100)+'%');
    var range=block(si)?.querySelector('[data-fc-slider]');
    if(range){
      range.value=String(Math.round(1000*at/series.endTime));
      range.style.setProperty('--fc-preview-progress',range.value/10+'%');
      range.classList.add('is-hover-progress');
    }
    focusCard(si,idx,false);
    updateInlineScore(si,at);
    return true;
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
  /* Ruin Archive / Folly I · calibrated two-stage stop-motion apparatus.
     Its static print is available at once; the 15 decoded frames share one
     frame cache between inline notation and the projection score. */
  var mechanicalFrames=[],mechanicalReady=null,mechanicalDecodeToken=0;
  var MECHANICAL_CFG={
    stage1Frames:7,knobBottom:14.55,knobTop:6.80,
    ringBottom:14.35,ringTop:9.70,centerX:49.85,
    guideTop:6.45,guideHeight:9.15,engageStart:.10,engageEnd:.95
  };
  function mechanicalStageForFilm(fraction){
    var videoProgress=clamp(fraction,0,1),p=1-videoProgress;
    var frameIndex=clamp(Math.round(p*14),0,14),split=6/14;
    var stage2=p<=split?0:clamp((p-split)/(1-split),0,1);
    var engagement=clamp((stage2-MECHANICAL_CFG.engageStart)/
      (MECHANICAL_CFG.engageEnd-MECHANICAL_CFG.engageStart),0,1);
    return {progress:p,frame:frameIndex+1,stage:frameIndex<7?1:2,
      engagement:engagement,
      knobTop:MECHANICAL_CFG.knobBottom+(MECHANICAL_CFG.knobTop-MECHANICAL_CFG.knobBottom)*p,
      ringTop:MECHANICAL_CFG.ringBottom+(MECHANICAL_CFG.ringTop-MECHANICAL_CFG.ringBottom)*engagement};
  }
  function paintMechanicalCanvas(cluster,frame){
    var canvas=cluster?.querySelector('[data-fc-mechanical-canvas]');
    var image=mechanicalFrames[frame-1];
    if(!canvas||!image||!image.naturalWidth||!image.naturalHeight)return false;
    var w=canvas.clientWidth,h=canvas.clientHeight;
    if(w<12||h<12)return false;
    var dpr=Math.min(window.devicePixelRatio||1,window.innerWidth<=700?1.25:1.6);
    var pw=Math.max(1,Math.round(w*dpr)),ph=Math.max(1,Math.round(h*dpr));
    if(canvas.dataset.frame===String(frame)&&canvas.width===pw&&canvas.height===ph&&
       cluster.classList.contains('is-mechanical-decoded'))return true;
    if(canvas.width!==pw)canvas.width=pw;
    if(canvas.height!==ph)canvas.height=ph;
    var ctx=canvas.getContext('2d',{alpha:true});
    if(!ctx)return false;
    var scale=Math.min(pw/image.naturalWidth,ph/image.naturalHeight);
    var dw=image.naturalWidth*scale,dh=image.naturalHeight*scale;
    ctx.clearRect(0,0,pw,ph);
    ctx.drawImage(image,(pw-dw)/2,(ph-dh)/2,dw,dh);
    cluster.classList.add('is-mechanical-decoded');
    canvas.dataset.frame=String(frame);
    return true;
  }
  function ensureMechanicalFrames(){
    if(mechanicalReady)return mechanicalReady;
    var token=++mechanicalDecodeToken,urls=FILES_I;
    var frames=new Array(urls.length).fill(null),cursor=0;
    function worker(){
      if(cursor>=urls.length)return Promise.resolve();
      var i=cursor++;
      return new Promise(function(resolve){
        var img=new Image();
        img.decoding='async';
        img.onload=function(){
          Promise.resolve(img.decode?img.decode():null).catch(function(){}).then(function(){
            frames[i]=img;resolve();
          });
        };
        img.onerror=function(){resolve();};
        img.src=urls[i];
      }).then(worker);
    }
    var concurrency=window.innerWidth<=700?2:4;
    mechanicalReady=Promise.all(Array.from({length:concurrency},worker)).then(function(){
      if(token!==mechanicalDecodeToken)return false;
      mechanicalFrames=frames;
      if(scene?.isConnected){
        scene.querySelectorAll('.fc-score-linear.fc-mechanical-v2').forEach(function(cluster){
          var frame=Number(cluster.dataset.fcFrame)||15;
          paintMechanicalCanvas(cluster,frame);
        });
      }
      return frames.some(Boolean);
    });
    return mechanicalReady;
  }
  var mechanicalCanvasObserver=null;
  function watchMechanicalScoreSizes(){
    if(mechanicalCanvasObserver){mechanicalCanvasObserver.disconnect();mechanicalCanvasObserver=null;}
    if(!scene||!('ResizeObserver' in window))return;
    mechanicalCanvasObserver=new ResizeObserver(function(entries){
      entries.forEach(function(entry){
        var cluster=entry.target.closest('.fc-mechanical-v2');
        if(!cluster||!cluster.isConnected)return;
        var frame=Number(cluster.dataset.fcFrame)||15;
        paintMechanicalCanvas(cluster,frame);
      });
    });
    scene.querySelectorAll('[data-fc-mechanical-canvas]').forEach(function(canvas){
      mechanicalCanvasObserver.observe(canvas);
    });
  }
  function releaseMechanicalScoreAssets(){
    if(mechanicalCanvasObserver){mechanicalCanvasObserver.disconnect();mechanicalCanvasObserver=null;}
    // Keep the decoded score only while the visitor is within this page.
    mechanicalDecodeToken++;
    mechanicalFrames=[];
    mechanicalReady=null;
  }
  function mechanicalLeverMarkup(interactive){
    return '<div class="fc-mechanical-v2-lever" data-fc-stage="1" '+
      'style="--fc-m2-knob:6.8%;--fc-m2-ring:9.7%;--fc-m2-engage:1">'+
      '<i class="fc-mechanical-v2-guide" aria-hidden="true"></i>'+
      '<i class="fc-mechanical-v2-ring" aria-hidden="true"></i>'+
      (interactive?
        '<button type="button" class="fc-mechanical-v2-knob" role="slider" '+
          'aria-label="Ruin Score · mechanical lever" aria-valuemin="1" aria-valuemax="15" aria-valuenow="15" '+
          'aria-orientation="vertical" title="拖动中央圆环 · 15 / 01"></button>':
        '<i class="fc-mechanical-v2-knob" aria-hidden="true"></i>')+
      '</div>';
  }
  function scoreMarkup(s){
    var mechanical=s.kind==='linear';
    if(mechanical){
      var sheet='<div class="fc-shadow-scan fc-mechanical-v2-sheet" data-fc-mechanical-sheet>'+
        '<img data-fc-score-shadow-img src="'+mechanicalImage(15)+'" loading="lazy" decoding="async" alt="">'+
        '<canvas data-fc-mechanical-canvas class="fc-mechanical-v2-canvas" aria-hidden="true"></canvas>'+
        mechanicalLeverMarkup(true)+'</div>';
      var arcs='<svg class="fc-mechanical-v2-arcs" viewBox="-100 -100 200 200" aria-hidden="true" '+
        'xmlns="http://www.w3.org/2000/svg"><g data-fc-arcs>'+
        '<path transform="translate(-10,-50) rotate(160)" d="M -7.07,-7.07 A 10,10 0 0,1 7.07,-7.07"/>'+
        '<path transform="translate(-15,-55) rotate(-150)" d="M -14.14,-14.14 A 20,20 0 0,1 14.14,-14.14"/>'+
        '<path transform="translate(-10,-55) rotate(160)" d="M -21.21,-21.21 A 30,30 0 0,1 21.21,-21.21"/>'+
        '</g></svg>';
      return '<div class="fc-score-cluster fc-score-linear fc-mechanical-v2" data-fc-frame="15">'+
        '<div class="fc-score-shadow" data-fc-score-shadow>'+sheet+'</div>'+
        '<div class="fc-score-hud" data-fc-score-hud>'+
          '<div class="fc-score-notation fc-mechanical-notation">'+
            '<div class="fc-mechanical-v2-graphics">'+arcs+
              '<i class="fc-scan-line" data-fc-line></i>'+
              '<i class="fc-scan-pulse" data-fc-pulse></i>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<p class="fc-score-manual">'+esc(i18n('hintI'))+'</p>'+
        '<button class="fc-score-expand" type="button" data-fc-action="inspect">'+esc(i18n('score'))+' ↗</button>'+
      '</div>';
    }
    var notation='<div class="fc-score-notation fc-fold-notation">'+foldMarkup(false)+
      '<div class="fc-radial-needles" aria-hidden="true"><i data-fc-needle="0"></i><i data-fc-needle="1"></i></div></div>';
    return '<div class="fc-score-cluster fc-score-radial">'+
      '<div class="fc-score-shadow" data-fc-score-shadow aria-hidden="true">'+foldMarkup(true)+'</div>'+
      '<div class="fc-score-hud" data-fc-score-hud>'+
        '<p class="fc-score-mark">SCORE / '+s.roman+'</p>'+notation+
        '<div class="fc-score-indicator"><i class="fc-score-light"></i><span>SYNC / '+s.roman+'</span></div>'+
      '</div>'+
      '<p class="fc-score-manual">'+esc(i18n('hintII'))+'</p>'+
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
    // Every phase has a dedicated, artist-supplied photograph; the number
    // of structure phases may differ from one Folly to another.
    var items=s.assets[kind];
    var names=items.map(function(_,i){return phaseName(si,kind,i);});
    var notes=reading(si).phases[kind];
    var faces=items.map(function(image,index){
      return '<figure class="fc-artifact fc-swap-face'+(index===0?' is-current':'')+
        '" data-fc-swap-face="'+index+'" aria-hidden="'+(index===0?'false':'true')+'">'+
        '<div class="fc-artifact-image"><img src="'+esc(image)+'" loading="lazy" decoding="async" alt="'+esc(label(s.title)+' — '+names[index])+'"></div>'+
      '</figure>';
    }).join('');
    var options=items.map(function(k,index){
      return '<button type="button" class="fc-swap-option'+(index===0?' is-active':'')+
        '" data-fc-action="swap-option" data-fc-index="'+index+
        '" aria-pressed="'+(index===0?'true':'false')+'">'+esc(names[index])+'</button>';
    }).join('<span class="fc-swap-separator" aria-hidden="true">/</span>');
    var metadata=items.map(function(k,index){
      return '<div class="fc-photo-meta-panel" data-fc-meta-face="'+index+'" '+(index?'hidden':'')+'>'+

        '<p class="fc-photo-meta-note">'+esc(notes[index][0])+'</p>'+
      '</div>';
    }).join('');
    return '<div class="fc-asset-pair fc-asset-pair-'+kind+'" data-fc-swap data-fc-series="'+si+
      '" data-fc-active="0" aria-label="'+esc(names.join(' / '))+'">'+
      '<div class="fc-photo-column">'+
        '<div class="fc-swap-stage">'+faces+'</div>'+
        '<div class="fc-swap-controls" role="group" aria-label="'+esc(names.join(' / '))+'">'+
          '<div class="fc-swap-options">'+options+'</div>'+
        '</div>'+
        '<div class="fc-photo-meta">'+metadata+'</div>'+
      '</div>'+

    '</div>';
  }
  function instrumentMarkup(s,si){
    return '<section class="fc-instrument-wrap">'+
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
      '</div>'+
      '<p class="fc-instrument-lead">'+esc(instrumentLead(si))+'</p>'+
    '</section>';
  }
  function inlineScoreMarkup(s,si){
    var pointerLabel={
      zh:['显示指针','隐藏指针'],en:['Show pointers','Hide pointers'],
      ja:['指針を表示','指針を非表示']
    }[state.lang]||['显示指针','隐藏指针'];
    return '<section class="fc-inline-score" data-fc-inline-score="'+si+'" data-fc-pointers="off">'+
      '<div class="fc-inline-score-main">'+
        '<div class="fc-inline-score-device">'+scoreMarkup(s)+'</div>'+
        '<h3 class="fc-score-caption">'+esc(term('score'))+'</h3>'+
        '<div class="fc-score-controls-bottom">'+
          (s.kind==='radial'?'<div class="fc-score-minimal-actions"><button type="button" data-fc-action="score-fold" data-fc-series="'+si+'">'+esc(term('scoreFold'))+' ↕</button></div>':'')+
          '<button type="button" class="fc-pointer-switch" data-fc-action="score-pointer" data-fc-series="'+si+'" role="switch" aria-checked="false" data-fc-label-off="'+esc(pointerLabel[0])+'" data-fc-label-on="'+esc(pointerLabel[1])+'">'+
            '<span class="fc-pointer-switch-track" aria-hidden="true"><i></i></span>'+
            '<span class="fc-pointer-switch-text">'+esc(pointerLabel[0])+'</span>'+
          '</button>'+
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
          '<div class="fc-film-wrap"><video class="fc-film" data-fc-film playsinline webkit-playsinline preload="metadata" tabindex="0" aria-label="'+esc(i18n('open')+' / '+label(s.title))+'" muted></video>'+
            '<div class="fc-film-vignette"></div><span class="fc-film-status" data-fc-film-status aria-live="polite"></span>'+
            '<button class="fc-film-pause-sign" type="button" data-fc-action="play" aria-label="'+esc(i18n('pause'))+'">Ⅱ</button></div>'+
          '<button type="button" class="fc-projection-arrow fc-arrow-next" data-fc-action="next" aria-label="'+esc(i18n('next'))+'">→</button>'+
        '</div>'+
        scoreMarkup(s)+
        '<div class="fc-projection-bottom"><span class="fc-time-index"><strong data-fc-time-index>01</strong><small data-fc-total> / '+pad(s.stages.length)+'</small></span>'+
          '<span class="fc-now-title" data-fc-now-title>'+esc(label(s.stages[0]))+'</span>'+
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
  // Each Folly is a self-contained page surface. The reader can scroll
  // through either entire page and pass between them without wheel locks,
  // synthetic momentum, or DOM replacement.
  function chapterBodyMarkup(){
    return '<section class="fc-chapter-page fc-chapter-page-one" data-fc-chapter-page="0" '+
        'aria-label="'+esc(chapterPart(0)+' · '+label(SERIES[0].title))+'">'+
        '<div class="fc-page-shadow" data-fc-page-shadow="0" aria-hidden="true"></div>'+
        sectionMarkup(SERIES[0],0)+
        '<div class="fc-chapter-threshold" data-fc-chapter-threshold="0"><div class="fc-threshold-sticky"><button type="button" class="fc-threshold-link" data-fc-action="chapter-next" data-fc-series="1">'+esc(folioIntro('next'))+' · '+esc(workChapterLabel(1))+' <span>↗</span></button><div class="fc-threshold-progress" aria-hidden="true"><i></i></div></div></div>'+
      '</section>'+
      '<section class="fc-chapter-page fc-chapter-page-two" data-fc-chapter-page="1" '+
        'aria-label="'+esc(chapterPart(1)+' · '+label(SERIES[1].title))+'">'+
        '<div class="fc-page-shadow" data-fc-page-shadow="1" aria-hidden="true"></div>'+
        sectionMarkup(SERIES[1],1)+
        '<section class="fc-essay" aria-label="Folly notes"><div class="fc-essay-rule"></div>'+
          '<p class="fc-essay-intro">'+esc(lastFollyIntro)+'</p>'+
          '<div class="fc-essay-space" aria-hidden="true"></div>'+
        '</section>'+
      '</section>';
  }
  var FOLLY_INTRO={
    zh:{lead:'一座废墟园林，从建成之时便开始排练自己的消失。它借用废墟中已有的重力、风化与断裂，把结构、乐器和观看者放进同一场不可重演的演出；当材料终于松手，建筑的终点便在眼前短暂显形。',about:'关于废墟园林',contents:'作品目录',next:'继续阅读'},
    en:{lead:'A Folly rehearses its own disappearance from the moment it is built. Working with the gravity, weathering and fractures already present in a ruin, it gathers structure, instrument and observer into an unrepeatable performance. When matter finally lets go, the endpoint of architecture appears for a moment.',about:'About Folly',contents:'Works',next:'Continue reading'},
    ja:{lead:'フォリーは、建てられた瞬間から自らの消滅を稽古し始める。廃墟にすでにある重力、風化、亀裂を借りて、構造と楽器と見る者を一度かぎりの上演に置く。材料がついに手を放すとき、建築の終点が一瞬だけ姿を現す。',about:'フォリーについて',contents:'作品目次',next:'続きを読む'}
  };
  var INSTRUMENT_TITLES={
    zh:['锈血心脏','以太狭间'],
    en:['Rust-Blood Heart','Aether Interval'],
    ja:['錆血の心臓','エーテルの狭間']
  };
  function folioIntro(key){return (FOLLY_INTRO[state.lang]||FOLLY_INTRO.zh)[key];}
  function instrumentLead(si){return (INSTRUMENT_TITLES[state.lang]||INSTRUMENT_TITLES.zh)[si];}
  function workChapterLabel(si){return chapterPart(si)+' · '+label(SERIES[si].title);}
  // Site-specific names for the three successive parts of each Folly.
  // The overall theatre title may differ from the structure's name.
  var READING_PART_NAMES={
    zh:[['死水心室','锈血心脏','沉墟心室'],['朽塔','以太狭间','朽塔焦土']],
    en:[['Stagnant Heart Chamber','Rust-Blood Heart','Effluent Sedimentation'],['Ruined Tower','Aether Interval','Aether Scorched-Earth']],
    ja:[['死水の心室','錆血の心臓','沈墟の心室'],['朽塔','エーテルの狭間','朽塔の焦土']]
  };
  function readingSectionName(si,i){
    return (READING_PART_NAMES[state.lang]||READING_PART_NAMES.zh)[si][i];
  }
  function readingSectionLabel(si,i){
    return readingHead(i)+('｜')+readingSectionName(si,i);
  }
  function readingPartHeading(i,si){
    return '<div class="fc-reading-part-head"><h3>'+
      '<span class="fc-reading-part-kind">'+esc(readingHead(i))+'</span>'+
      '<span class="fc-reading-part-divider">'+esc('｜')+'</span>'+
      '<span class="fc-reading-part-title">'+esc(readingSectionName(si,i))+'</span>'+
      '</h3></div>';
  }
  function sectionMarkup(s, si) {
    return '<section class="fc-series-block" data-fc-series-block="'+si+
      '" id="fc-chapter-'+(si+1)+'" style="--fc-video-aspect:16 / 9;--fc-ratio-number:1.77778">'+
      '<div class="fc-series-heading">'+
        '<h2>'+esc(workChapterLabel(si))+'</h2>'+
        '<span class="fc-series-year">'+s.year+'</span>'+
      '</div>'+
      '<div class="fc-series-composition">'+
        '<section class="fc-reading-part fc-reading-garden" aria-label="'+esc(readingSectionLabel(si,0))+'">'+
          readingPartHeading(0,si)+
          assetPairMarkup(s,si,'structure')+
          '<p class="fc-reading-copy fc-garden-copy">'+esc(reading(si).garden)+'</p>'+
        '</section>'+
        '<section class="fc-reading-part fc-reading-instrument" aria-label="'+esc(readingSectionLabel(si,1))+'">'+
          readingPartHeading(1,si)+
          instrumentMarkup(s,si)+
          assetPairMarkup(s,si,'detail')+
          '<p class="fc-reading-copy fc-instrument-full">'+esc(reading(si).instrument)+'</p>'+
        '</section>'+
      '</div>'+
      '<section class="fc-reading-part fc-reading-theatre" aria-label="'+esc(readingSectionLabel(si,2))+'">'+
        '<div class="fc-film-head">'+
          '<div class="fc-reading-film-title">'+readingPartHeading(2,si)+'</div>'+

        '</div>'+
        '<p class="fc-reading-copy fc-theatre-copy">'+esc(reading(si).theatre)+'</p>'+
        '<div class="fc-gallery-area"><div class="fc-gallery-hint" data-fc-gallery-hint="'+si+'" tabindex="0"><p>'+esc(i18n('instruction'))+'</p></div><div class="fc-rail" data-fc-rail="'+si+
        '" tabindex="0" aria-label="'+esc(i18n('seek')+' / '+label(s.title))+'">'+
          '<ol class="fc-strip">'+s.stages.map(function(stage,index){return cardMarkup(stage,index,s);}).join('')+'</ol>'+
        '</div></div>'+
        '<div class="fc-navigation">'+
          '<input class="fc-slider" data-fc-slider="'+si+
          '" type="range" min="0" max="1000" value="0" step="1" aria-label="'+
          esc(i18n('seek')+' / '+label(s.title))+'"></div>'+
        inlineScoreMarkup(s,si)+
        '<p class="fc-reading-copy fc-score-reading">'+esc(reading(si).score)+'</p>'+
      '</section>'+
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
        '<div class="fc-scroll-content" data-fc-chapter-body>'+
        '<section class="fc-about" aria-label="'+esc(folioIntro('about'))+'">'+
          '<h2>'+esc(folioIntro('about'))+'</h2><p>'+esc(folioIntro('lead'))+'</p>'+
          '<nav class="fc-about-index" aria-label="'+esc(folioIntro('contents'))+'">'+
            '<ol class="fc-about-list">'+SERIES.map(function(series,i){return '<li><a href="#fc-chapter-'+(i+1)+'" data-fc-chapter-link="'+i+'"><span>'+esc(workChapterLabel(i))+'</span><span class="fc-about-year">（'+series.year+'）</span></a></li>';}).join('')+'</ol>'+
          '</nav></section>'+chapterBodyMarkup()+'</div>'+
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
    if(slider&&document.activeElement!==slider&&!(hoverFilm.followRail&&hoverFilm.si===si))slider.value=String(max?Math.round(rail.scrollLeft/max*1000):0);
    if(scroll)align(si,i,true);
    if(nearViewport(root))prioritizePreviews(si,i);
    if(selection.open&&selection.series===si){
      var overlay=activeOverlay();
      overlay.querySelector('[data-fc-now-title]').textContent=label(s.stages[i]);
      overlay.querySelector('[data-fc-time-index]').textContent=pad(i+1);
      overlay.querySelector('[data-fc-total]').textContent=' / '+pad(s.stages.length);
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
      // Original Ruin Archive relation: moving image 0→100% corresponds to
      // stop-motion 15→01, with the first seven score frames forming stage I.
      var state=mechanicalStageForFilm(ratio);
      overlay.querySelectorAll('.fc-mechanical-v2').forEach(function(cluster){
        cluster.dataset.fcFrame=String(state.frame);
        cluster.dataset.fcStage=String(state.stage);
        cluster.querySelectorAll('.fc-mechanical-v2-lever').forEach(function(lever){
          lever.dataset.fcStage=String(state.stage);
          lever.style.setProperty('--fc-m2-knob',state.knobTop.toFixed(3)+'%');
          lever.style.setProperty('--fc-m2-ring',state.ringTop.toFixed(3)+'%');
          lever.style.setProperty('--fc-m2-engage',state.engagement.toFixed(4));
        });
        var knob=cluster.querySelector('.fc-mechanical-v2-knob');
        if(knob)knob.setAttribute('aria-valuenow',String(state.frame));
        // Once decoded, a single canvas draw replaces repeated img.src churn.
        if(!paintMechanicalCanvas(cluster,state.frame)){
          var fallback=cluster.querySelector('[data-fc-score-shadow-img]');
          if(fallback && fallback.dataset.frame!==String(state.frame)){
            fallback.dataset.frame=String(state.frame);
            fallback.src=mechanicalImage(state.frame);
          }
        }
        var arcs=cluster.querySelector('[data-fc-arcs]');
        if(arcs)arcs.style.transform='scale('+(1+3.5*ratio).toFixed(3)+')';
      });
      overlay.querySelectorAll('[data-fc-line]').forEach(function(line){
        line.style.left=(12+76*ratio).toFixed(3)+'%';
      });
      var pulse=overlay.querySelector('[data-fc-pulse]');
      if(pulse){
        // The pulse leaves after 1:53 of the authored Folly I moving image.
        var x=12+76*ratio,y=94-22*ratio;
        var freq=.8+2.2*ratio;
        var beat=Math.sin(performance.now()*.001*freq*Math.PI);
        pulse.style.left=x.toFixed(3)+'%';
        pulse.style.top=y.toFixed(3)+'%';
        pulse.style.opacity=absolute>=113?'0':(beat>0?'1':'.12');
        pulse.style.transform='translate(-50%,-50%) scale('+(beat>0?(1-Math.pow(beat,2)*.4):1).toFixed(3)+')';
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
    // The single progress slider is now positioned between the films and
    // the score. Its state is maintained by the rail and score seek handlers.
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
    if(!overlay)return;
    overlay.hidden=false;
    scene.classList.add('is-projected');
    if(!selection.instrument)block(si)?.querySelector('[data-fc-card="'+selection.index+'"]')?.classList.add('is-playing');
    else block(si)?.querySelector('[data-fc-instrument-card]')?.classList.add('is-playing');
    document.body.classList.add('fc-modal-open');
    scene.querySelectorAll('.fc-page-heading,.fc-scroll-content').forEach(function(node){node.inert=true;});
    if(!selection.instrument)focusCard(si,index,false);
    else {
      overlay.querySelector('[data-fc-now-title]').textContent=term('moving');
      overlay.querySelector('[data-fc-time-index]').textContent='01';
      overlay.querySelector('[data-fc-total]').textContent=' / 01';
      overlay.querySelector('[data-fc-projection-count]').textContent='INSTRUMENT / 01';
    }
    overlay.querySelector('[data-fc-film]')?.focus({preventScroll:true});
    loadSelected(resume);
  }
  function loadSelected(startAt){
    if(!isLive()||!selection.open)return;
    stopMedia();
    var token=serial,s=current(),i=selection.index,overlay=activeOverlay();
    if(!overlay)return;
    player=overlay.querySelector('[data-fc-film]');
    var video=player,status=overlay.querySelector('[data-fc-film-status]');
    var frame=overlay.querySelector('.fc-film-wrap');
    frame.classList.remove('has-error','has-started');
    status.textContent=i18n('loading');
    selection.lastTime=selection.instrument?0:s.stages[i].start;
    selection.paused=false;syncPlayButton();updateScore(selection.lastTime);
    video.muted=selection.muted;video.loop=false;video.controls=false;
    video.preload='auto';video.playsInline=true;
    video.removeAttribute('poster');
    // Match the film's actual encoded aspect ratio. The projection frame
    // and its two-part caption both follow this ratio, so no unused black
    // margins appear beside portrait or landscape footage.
    overlay.style.setProperty('--fc-projection-ratio','1.77778');
    video.addEventListener('loadedmetadata',function(){
      if(token!==serial||!isLive()||!selection.open||player!==video)return;
      if(video.videoWidth>0&&video.videoHeight>0){
        overlay.style.setProperty('--fc-projection-ratio',
          (video.videoWidth/video.videoHeight).toFixed(6));
      }
    },{once:true});
    var initialTime=clamp(Number(startAt)||0,0,1e7),started=false;
    var sourceUrl=selection.instrument?s.assets.film:source(s,i);
    function isCurrent(){return token===serial&&isLive()&&selection.open&&player===video;}
    function startedPlayback(){
      if(!isCurrent()||started)return;
      started=true;frame.classList.add('has-started');
      frame.classList.remove('has-error');status.textContent='';
      selection.paused=false;syncPlayButton();warmFollowing();
    }
    function unsuccessful(){
      if(!isCurrent()||started)return;
      selection.paused=true;syncPlayButton();
      status.textContent=i18n('play')+' ▶';
      video.controls=true; // direct native recovery even when autoplay is blocked
      frame.classList.add('has-started');
    }
    function attemptPlay(){
      if(!isCurrent()||started)return;
      try{
        var playAttempt=video.play();
        if(playAttempt&&typeof playAttempt.then==='function')
          playAttempt.then(startedPlayback).catch(unsuccessful);
        else if(!video.paused)startedPlayback();
      }catch(_){unsuccessful();}
    }
    video.addEventListener('playing',startedPlayback,{once:true});
    if(initialTime>.08){
      video.addEventListener('loadedmetadata',function(){
        if(!isCurrent())return;
        if(Number.isFinite(video.duration)&&video.duration>0){
          try{video.currentTime=Math.min(initialTime,Math.max(0,video.duration-.12));}catch(_){}
        }
      },{once:true});
    }
    video.addEventListener('loadeddata',function(){
      if(isCurrent()&&!started&&video.paused)attemptPlay();
    },{once:true});
    // Start under the click's user activation, rather than waiting for
    // loadedmetadata / canplay, which can be deferred on Safari and Chrome.
    video.src=sourceUrl;
    video.load();
    attemptPlay();
    // An already-active player or a delayed frame both remain recoverable.
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
    var drag=null,scrollRaf=0,manualMode=false;
    var slider=root.querySelector('[data-fc-slider]');
    function syncRange(){
      if(!slider||document.activeElement===slider||(hoverFilm.followRail&&hoverFilm.si===si))return;
      var max=Math.max(0,rail.scrollWidth-rail.clientWidth);
      slider.value=String(max?Math.round(1000*rail.scrollLeft/max):0);
    }
    // Manual exploration wins over auto-follow until the pointer has
    // completely left the gallery. This prevents hover-enter events from
    // stealing control while the strip is being dragged.
    function claimManualControl(preserveFrame){
      manualMode=true;
      if(hoverFilm.si!==si||hoverFilm.kind!=='film')return;
      // A pending dwell timer or video metadata load must not resume
      // playback underneath a held pointer. Only an already-playing
      // preview can be preserved as a paused frame for click-to-open.
      if(!preserveFrame||!hoverFilm.active){
        stopHoverFilm();
        return;
      }
      stopHoverRailMotion();
      hoverFilm.followRail=false;
      hoverFilm.video?.pause();
    }
    // Trackpad horizontal deltas and touch swipes belong entirely to the
    // browser's native inertial scroller. Vertical mouse wheel stays vertical.
    rail.addEventListener('wheel',function(event){
      if(selection.open)return;
      if(Math.abs(event.deltaX)+Math.abs(event.deltaY)>1)claimManualControl(false);
      if(!event.shiftKey||Math.abs(event.deltaX)>Math.abs(event.deltaY))return;
      event.preventDefault();
      rail.scrollLeft+=event.deltaY*(event.deltaMode===1?22:event.deltaMode===2?rail.clientWidth:1);
    },{passive:false});
    // Mouse drag is a free pixel-wise translation, with no release centring.
    rail.addEventListener('pointerdown',function(event){
      if(event.pointerType==='touch'||event.pointerType==='pen'){
        claimManualControl(false);
        return;
      }
      if(event.pointerType!=='mouse'||event.button!==0)return;
      // Stop the moving rail on *press*, before the six-pixel drag threshold.
      // Keep the paused video frame until click vs drag is resolved, so a
      // simple click can still open the full film at the preview timestamp.
      claimManualControl(true);
      drag={pointerId:event.pointerId,x:event.clientX,left:rail.scrollLeft,moved:false};
    });
    rail.addEventListener('pointermove',function(event){
      if(!drag||drag.pointerId!==event.pointerId)return;
      var dx=event.clientX-drag.x;
      if(Math.abs(dx)>6&&!drag.moved){
        drag.moved=true;
        if(hoverFilm.si===si)stopHoverFilm();
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
      // Leave manualMode active while the pointer remains over the rail.
      // A fresh pointer exit and re-entry is needed to restart autoplay.
      if(!rail.matches(':hover'))manualMode=false;
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
        if(event.pointerType!=='mouse'||drag||manualMode||selection.open||
           (hoverFilm.followRail&&hoverFilm.si===si))return;
        // Intentional dwell: no instant play when a moving gallery passes
        // beneath the pointer. Pressing anywhere always takes control.
        startHoverFilm(card,si,index,980);
      });
      card.addEventListener('pointerleave',function(){
        if(hoverFilm.card!==card)return;
        // Dwell is valid only while this particular card is still hovered.
        // Once playback is active, allow the moving film to drift freely.
        if(!hoverFilm.active){stopHoverFilm();return;}
        if(!hoverFilm.followRail)scheduleHoverStop(600);
      });
      card.addEventListener('focusin',function(event){
        if(!manualMode&&event.target.matches('.fc-card-button'))startHoverFilm(card,si,index,1000);
      });
      card.addEventListener('focusout',function(){
        if(hoverFilm.card===card)stopHoverFilm();
      });
    });
    rail.addEventListener('scroll',function(){
      if(hoverFilm.card?.closest('.fc-rail')===rail&&!hoverFilm.followRail&&!hoverFilm.scrubbing&&!hoverFilm.sliderHover&&!(manualMode&&drag&&!drag.moved))stopHoverFilm();
      if(hoverFilm.followRail&&hoverFilm.si===si)return;
      if(!scrollRaf)scrollRaf=requestAnimationFrame(function(){
        scrollRaf=0;
        syncRange();
        var closest=nearest(si);
        if(selection.focus[si]!==closest)focusCard(si,closest,false);
        scoreFromRail(si);
      });
      // Manual scrolling does not re-trigger autoplay on idle. A fresh
      // hover after exiting the rail is required to resume the sequence.
    },{passive:true});
    rail.addEventListener('pointerleave',function(){
      if(!drag)manualMode=false;
      if(hoverFilm.si===si&&!hoverFilm.sliderHover&&!hoverFilm.scrubbing)
        scheduleHoverStop(380);
    });
    if(slider){
      function finishPreviewScrub(){
        if(hoverFilm.si!==si||hoverFilm.kind!=='film'||!hoverFilm.scrubbing)return;
        hoverFilm.scrubbing=false;
        if(hoverFilm.followRail)followHoverFilm();
        // Continue the silent inline film from the exact sought frame.
        var film=hoverFilm.video;
        if(film?.paused && film.readyState>=1){
          var promise=film.play();
          if(promise?.catch)promise.catch(function(){});
        }
        if(!hoverFilm.sliderHover)scheduleHoverStop(550);
      }
      slider.addEventListener('pointerenter',function(){
        if(hoverFilm.si!==si||hoverFilm.kind!=='film'||!hoverFilm.card)return;
        clearTimeout(hoverFilm.leaveTimer);hoverFilm.leaveTimer=0;
        hoverFilm.sliderHover=true;
      });
      slider.addEventListener('pointerleave',function(){
        if(hoverFilm.si!==si||hoverFilm.kind!=='film'||!hoverFilm.card)return;
        hoverFilm.sliderHover=false;
        if(!hoverFilm.scrubbing)scheduleHoverStop(550);
      });
      slider.addEventListener('pointerdown',function(){
        if(hoverFilm.si!==si||hoverFilm.kind!=='film'||!hoverFilm.card)return;
        clearTimeout(hoverFilm.leaveTimer);hoverFilm.leaveTimer=0;
        hoverFilm.scrubbing=true;hoverFilm.sliderHover=true;
        hoverFilm.video?.pause();
      });
      slider.addEventListener('pointerup',finishPreviewScrub);
      slider.addEventListener('pointercancel',finishPreviewScrub);
      slider.addEventListener('input',function(event){
        var at=SERIES[si].endTime*clamp(Number(event.target.value)/1000,0,1);
        if(seekHoverFilmByTime(si,at))return;
        // No active preview: preserve the freely scrolling card gallery.
        if(hoverFilm.card?.closest('.fc-rail')===rail)stopHoverFilm();
        var max=Math.max(0,rail.scrollWidth-rail.clientWidth);
        rail.scrollLeft=max*Number(event.target.value)/1000;
        scoreFromRail(si);
      });
      slider.addEventListener('change',function(){
        if(hoverFilm.si===si&&hoverFilm.kind==='film'){
          finishPreviewScrub();
          return;
        }
        syncRange();
      });
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
      overlay.querySelector('.fc-film-wrap').classList.add('has-error','has-started');
      video.controls=true;
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
    if(si===0){
      var knob=score.querySelector('.fc-mechanical-v2-knob');
      var sheet=score.querySelector('[data-fc-mechanical-sheet]');
      if(knob&&sheet){
        var activePointer=null,dragBounds=null,pendingY=null,dragFrame=0;
        var syncKnob=function(y){
          if(!dragBounds)return;
          // Geometry matches Ruin Archive's authored 14.55%→6.80%,
          // with the film mapped in reverse (frame 15→frame 01).
          var bottom=dragBounds.top+dragBounds.height*MECHANICAL_CFG.knobBottom/100;
          var top=dragBounds.top+dragBounds.height*MECHANICAL_CFG.knobTop/100;
          var stageProgress=clamp((bottom-y)/Math.max(1,bottom-top),0,1);
          seekFilmFromScore(0,SERIES[0].endTime*(1-stageProgress));
        };
        var flushKnob=function(){dragFrame=0;if(pendingY!==null){syncKnob(pendingY);pendingY=null;}};
        knob.addEventListener('pointerdown',function(ev){
          if(ev.pointerType==='mouse'&&ev.button!==0)return;
          activePointer=ev.pointerId;
          dragBounds=sheet.getBoundingClientRect();
          pendingY=ev.clientY;
          try{knob.setPointerCapture(ev.pointerId);}catch(_){}
          knob.classList.add('is-dragging');
          flushKnob();ev.preventDefault();ev.stopPropagation();
        });
        knob.addEventListener('pointermove',function(ev){
          if(ev.pointerId!==activePointer)return;
          pendingY=ev.clientY;
          if(!dragFrame)dragFrame=requestAnimationFrame(flushKnob);
          ev.preventDefault();ev.stopPropagation();
        });
        var endKnob=function(ev){
          if(ev.pointerId!==activePointer)return;
          if(dragFrame){cancelAnimationFrame(dragFrame);dragFrame=0;}
          flushKnob();
          activePointer=null;dragBounds=null;
          knob.classList.remove('is-dragging');
          ev.stopPropagation();
        };
        knob.addEventListener('pointerup',endKnob);
        knob.addEventListener('pointercancel',endKnob);
        knob.addEventListener('lostpointercapture',function(){activePointer=null;dragBounds=null;knob.classList.remove('is-dragging');});
        knob.addEventListener('keydown',function(ev){
          var delta={ArrowUp:1,ArrowRight:1,ArrowDown:-1,ArrowLeft:-1}[ev.key];
          var frame=sourceScoreFrame(inlineTime[0]/SERIES[0].endTime);
          if(delta!=null)frame=clamp(frame+delta,1,15);
          else if(ev.key==='Home')frame=1;
          else if(ev.key==='End')frame=15;
          else return;
          seekFilmFromScore(0,SERIES[0].endTime*(15-frame)/14);
          ev.preventDefault();ev.stopPropagation();
        });
      }
    }
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
    // The entire mechanical score is a tactile fifteen-frame index even with
    // the HUD pointer switched off. Drag downward to advance the Folly film.
    // In Folly I the small central ring is the authored input, as in
    // Ruin Archive; the rest of the printed score does not act as a giant
    // invisible scrub surface. Folly II keeps its existing interactions.
    var notationSurface=si===0?null:score.querySelector('.fc-score-shadow .fc-shadow-scan');
    if(notationSurface){
      var scoreGesture=null;
      function scrubArtwork(ev){
        var rect=notationSurface.getBoundingClientRect();
        var y=clamp((ev.clientY-rect.top)/Math.max(1,rect.height),0,1);
        var ratio=clamp((y-.12)/.76,0,1);
        seekFilmFromScore(si,SERIES[si].endTime*ratio);
      }
      notationSurface.addEventListener('pointerdown',function(ev){
        if(ev.target.closest('.fc-mechanical-v2-knob'))return;
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
    var count=state.root.querySelectorAll('[data-fc-swap-face]').length;
    var next=((state.active+step)%count+count)%count;
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
  // v27 · A single vertical hand-off, like advancing a short video.
  // Normal scrolling remains native everywhere except the short boundary.
  // The two works stay mounted in ONE document: nothing is replaced.
  // Page shadows follow native scrolling only. There is deliberately NO
  // preventDefault, scrollTo, lock timer, artificial inertia or snap logic.
  var pageShadeCleanup=null;
  function wireChapterShadows(){
    if(pageShadeCleanup){pageShadeCleanup();pageShadeCleanup=null;}
    if(!scene)return;
    var first=scene.querySelector('[data-fc-chapter-page="0"]');
    var second=scene.querySelector('[data-fc-chapter-page="1"]');
    var shadowA=first?.querySelector('[data-fc-page-shadow="0"]');
    var shadowB=second?.querySelector('[data-fc-page-shadow="1"]');
    if(!first||!second||!shadowA||!shadowB)return;
    var frame=0,closed=false;
    function paint(){
      frame=0;
      if(closed||!isLive())return;
      var viewport=window.innerHeight||document.documentElement.clientHeight||1;
      var edge=second.getBoundingClientRect().top;
      // 0 = next page is still below the screen, deep in shadow.
      // 1 = next page has arrived; its shadow leaves it and settles
      // gently onto the preceding page.
      var start=viewport*.94,end=viewport*.08;
      var progress=clamp((start-edge)/Math.max(1,start-end),0,1);
      shadowA.style.opacity=(.37*progress).toFixed(3);
      shadowB.style.opacity=(.46*(1-progress)).toFixed(3);
      scene.style.setProperty('--fc-page-turn-progress',progress.toFixed(4));
      var showing=progress>.5?1:0;
      scene.dataset.fcReadingPage=String(showing);
    }
    function schedule(){if(!closed&&!frame)frame=requestAnimationFrame(paint);}
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule,{passive:true});
    pageShadeCleanup=function(){
      closed=true;
      if(frame)cancelAnimationFrame(frame);
      window.removeEventListener('scroll',schedule);
      window.removeEventListener('resize',schedule);
    };
    schedule();
  }
  // A restrained, two-gesture elastic boundary: an inertial first pass
  // cannot silently carry the reader into Folly II. A second intentional
  // gesture, or clicking the invitation, releases the next reading page.
  var chapterThresholdCleanup=null,chapterThresholdRelease=false;
  function enterNextFolly(){
    chapterThresholdRelease=true;
    var next=scene?.querySelector('[data-fc-chapter-page="1"]');
    if(next){
      next.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    }
  }
  function wireChapterThreshold(){
    if(chapterThresholdCleanup){chapterThresholdCleanup();chapterThresholdCleanup=null;}
    var gate=scene?.querySelector('[data-fc-chapter-threshold]');
    if(!gate)return;
    // Native page momentum and proximity scroll-snap now provide the pause.
    // No wheel interception, no forced scrollTo, no vertical position reset.
    // The elastic feeling belongs to the invitation only; it never takes
    // ownership of the browser's native scroll position.
    var raf=0,quiet=0,closed=false,wasVisible=false,lastTop=null;
    chapterThresholdRelease=false;
    function paint(){
      raf=0;
      if(closed||!isLive())return;
      var rect=gate.getBoundingClientRect();
      var vh=window.innerHeight||700;
      var visible=rect.bottom>vh*.10&&rect.top<vh*.94;
      if(!visible){
        if(wasVisible){gate.classList.remove('is-pulling');gate.style.setProperty('--fc-gate-pull','0');}
        wasVisible=false;lastTop=null;
        return;
      }
      wasVisible=true;
      // A soft elastic displacement only while the native scroller moves.
      // High-velocity input is capped so the artwork cannot shake or stutter.
      var dy=lastTop===null?0:lastTop-rect.top;
      lastTop=rect.top;
      var progress=clamp((vh*.78-rect.top)/Math.max(1,rect.height-vh*.16),0,1);
      var travel=Math.sin(progress*Math.PI);
      var pull=clamp(travel*.66+Math.abs(dy)*.012,0,.90);
      gate.style.setProperty('--fc-gate-pull',pull.toFixed(3));
      gate.classList.add('is-pulling');
      gate.classList.toggle('is-armed',progress>.55);
      clearTimeout(quiet);
      quiet=window.setTimeout(function(){
        if(closed)return;
        gate.classList.remove('is-pulling');
        gate.style.setProperty('--fc-gate-pull','0');
        lastTop=null;
      },125);
    }
    function schedule(){if(!closed&&!raf)raf=requestAnimationFrame(paint);}
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule,{passive:true});
    chapterThresholdCleanup=function(){
      closed=true;clearTimeout(quiet);if(raf)cancelAnimationFrame(raf);
      window.removeEventListener('scroll',schedule);
      window.removeEventListener('resize',schedule);
    };
    schedule();
  }
  var filmHintCleanup=null;
  function wireFilmHints(){
    if(filmHintCleanup){filmHintCleanup();filmHintCleanup=null;}
    if(!isLive())return;
    var entries=SERIES.map(function(_,si){
      return {rail:railFor(si),hint:block(si)?.querySelector('[data-fc-gallery-hint]'),seen:false,timer:0};
    }).filter(function(a){return a.rail&&a.hint;});
    var frame=0,disposed=false;
    function test(){
      frame=0;
      if(disposed||!isLive())return;
      entries.forEach(function(x){
        if(x.seen)return;
        var r=x.rail.getBoundingClientRect(),vh=window.innerHeight||700;
        if(r.top<vh*.73 && r.bottom>vh*.34){
          x.seen=true;x.hint.classList.add('is-introduced');
          x.timer=window.setTimeout(function(){x.hint.classList.remove('is-introduced');},2600);
        }
      });
    }
    function schedule(){if(!frame)frame=requestAnimationFrame(test);}
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule,{passive:true});
    filmHintCleanup=function(){
      disposed=true;if(frame)cancelAnimationFrame(frame);
      entries.forEach(function(x){clearTimeout(x.timer);});
      window.removeEventListener('scroll',schedule);
      window.removeEventListener('resize',schedule);
    };
    schedule();
  }
  function setupFollyChapters(){
    SERIES.forEach(function(_,si){
      wireRail(si);
      wireInstrument(si);
      wireInlineScore(si);
      wireOverlay(si);
      focusCard(si,0,false);
      updateInlineScore(si,0);
    });
    wireChapterShadows();
    wireFilmHints();
    wireChapterThreshold();
    initializeImageSwaps();
    setupPhotoReadingLayout();
    watchMechanicalScoreSizes();
    // Existing 2-second MP4 stills and instrument videos remain deferred;
    // no new HTTP request is issued until a particular chapter is nearby.
    if('IntersectionObserver' in window){
      io=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(!entry.isIntersecting)return;
          var si=Number(entry.target.dataset.fcSeriesBlock);
          prioritizePreviews(si,selection.focus[si]);
          if(si===0)ensureMechanicalFrames();
        });
      },{rootMargin:'320px 0px'});
      SERIES.forEach(function(_,si){
        var el=block(si);
        if(el)io.observe(el);
      });
    }else{
      prioritizePreviews(0,0);
      ensureMechanicalFrames();
    }
  }
  function wireEvents(){
    if(!isLive())return;
    // Individual chapter nodes are wired by setupFollyChapter() after mount.
    scene.addEventListener('click',function(event){
      var chapterLink=event.target.closest('[data-fc-chapter-link]');
      if(chapterLink){
        event.preventDefault();
        var wanted=Number(chapterLink.dataset.fcChapterLink);
        if(wanted===1)enterNextFolly();
        else block(0)?.scrollIntoView({behavior:'smooth',block:'start'});
        return;
      }
      // The image itself is the only visible playback surface. A tap or
      // click toggles motion; the empty black surround closes the viewer.
      if(selection.open&&event.target.matches('[data-fc-film]')&&player){
        if(player.paused){
          var attempt=player.play();
          if(attempt?.catch)attempt.catch(function(){});
          selection.paused=false;
        }else{
          player.pause();
          selection.paused=true;
        }
        syncPlayButton();
        return;
      }
      var node=event.target.closest('[data-fc-action]');
      if(!node)return;
      var action=node.dataset.fcAction;
      var si=Number(node.dataset.fcSeries);
      if(action==='chapter-next'){
        enterNextFolly();return;
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
    if(pageShadeCleanup){pageShadeCleanup();pageShadeCleanup=null;}
    if(filmHintCleanup){filmHintCleanup();filmHintCleanup=null;}
    if(chapterThresholdCleanup){chapterThresholdCleanup();chapterThresholdCleanup=null;}
    if(photoReadingCleanup){photoReadingCleanup();photoReadingCleanup=null;}
    if(scene){clearImageSwaps();clearPreviews();stopMedia();releaseMechanicalScoreAssets();}
    releaseUpcoming();
    document.body.classList.remove('fc-modal-open','fc-score-expanded');
    scene=next;player=null;
    chapterChanging=false;activeChapter=0;
    if(!scene)return;
    selection.open=false;selection.instrument=false;selection.scoreInspect=false;
    selection.series=0;selection.index=0;selection.focus=[0,0];
    manualWings=[null,null];inlineTime=[0,0];expandedScore=-1;
    scoreScale=[1,1];scorePan=[[0,0],[0,0]];railOriginLocks=[false,false];
    // A stable two-chapter document: no node replacement during scrolling.
    // The delegated action listener survives all intra-page movement.
    wireEvents();
    setupFollyChapters();
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
