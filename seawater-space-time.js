/* Seawater Collection — scroll-linked spatial perspective / time spacing. */
(function () {
  "use strict";
  var installed = new WeakSet();
  var active = null;
  var unmount = function () {};
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function ease(n) { n=clamp(n,0,1); return n*n*(3-2*n); }
  function fix(n) { return Number(n).toFixed(2); }
  function esc(s) {
    return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;")
      .replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }
  function parseDate(date) {
    var n=Date.parse(String(date||"")+"T12:00:00Z");
    return Number.isFinite(n) ? n : 0;
  }
  function nameOf(record,lang) {
    var n=record.name;
    return typeof n==="string"?n:((n&&(n[lang]||n.zh||n.en))||"");
  }
  function pointStr(p) { return fix(p.x)+" "+fix(p.y); }
  function line(a,b,klass) {
    return '<path class="'+klass+'" d="M'+pointStr(a)+' L'+pointStr(b)+'"/>';
  }
  function roundedPolygon(v,f) {
    var out=[];
    v.forEach(function(p,i) {
      var a=v[(i+v.length-1)%v.length],b=v[(i+1)%v.length];
      var u={x:p.x+(a.x-p.x)*f,y:p.y+(a.y-p.y)*f};
      var w={x:p.x+(b.x-p.x)*f,y:p.y+(b.y-p.y)*f};
      out.push((i?" L":"M")+pointStr(u)+" Q"+pointStr(p)+" "+pointStr(w));
    });
    return out.join("")+" Z";
  }
  function geometry(scrollValue,timeValue) {
    var perspective=ease(scrollValue),spread=ease(timeValue);
    var extent=465+360*spread;
    var longitudeX=189-101*perspective,longitudeY=-162+128*perspective;
    var latitudeY=-268-8*perspective;
    function project(t,y,z) {
      return {x:128+t*extent+y*longitudeX,y:484+y*longitudeY+z*latitudeY};
    }
    return {project:project,extent:extent,spread:spread};
  }
  function draw(root,records,lang,scrollValue,timeValue) {
    var g=geometry(scrollValue,timeValue),p=g.project;
    var s=['<g class="seawater-mesh" aria-hidden="true">'];
    // The near-left YZ plane is the equirectangular lat/lon localization surface.
    for(var y=0;y<=8;y++)s.push(line(p(0,y/8,0),p(0,y/8,1),"seawater-map-guide"));
    for(var z=0;z<=6;z++)s.push(line(p(0,0,z/6),p(0,1,z/6),"seawater-map-guide"));
    // Continuous rails along time, kept separate from the coordinate records.
    for(var r=0;r<=6;r++)s.push(line(p(0,0,r/6),p(1,0,r/6),"seawater-rail"));
    for(var q=1;q<=8;q++)s.push(line(p(0,q/8,0),p(1,q/8,0),"seawater-rail"));
    // Diagrammatic rounded elbows in the time-slice lattice.
    for(var i=0;i<=15;i++) {
      var t=i/15,top=p(t,0,1),a=p(t,0,.12),b=p(t,.14,0),corner=p(t,0,0),end=p(t,1,0);
      var c1={x:a.x,y:a.y+(corner.y-a.y)*.82};
      var c2={x:b.x-(b.x-corner.x)*.60,y:b.y-(b.y-corner.y)*.10};
      s.push('<path class="seawater-slice" d="M'+pointStr(top)+' L'+pointStr(a)+
        ' C'+pointStr(c1)+' '+pointStr(c2)+' '+pointStr(b)+' L'+pointStr(end)+'"/>');
    }
    s.push('</g>');
    var valid=records.filter(function(r){
      return parseDate(r.date)&&Number.isFinite(Number(r.lat))&&Number.isFinite(Number(r.lng));
    });
    if(valid.length) {
      var ts=valid.map(function(r){return parseDate(r.date);});
      var min=Math.min.apply(null,ts),span=Math.max(1,Math.max.apply(null,ts)-min);
      valid.forEach(function(record){
        var t=(parseDate(record.date)-min)/span;
        var u=clamp((Number(record.lng)+180)/360,0,1),v=clamp((Number(record.lat)+90)/180,0,1);
        // The sample's X half-depth is measured in projected pixels, not scaled time:
        // expanding X changes the gaps, never stretches the cubes themselves.
        var dt=7/g.extent,du=.068,dv=.060;
        function vertex(dx,dy,dz){return p(t+dx*dt,u+dy*du,v+dz*dv);}
        var a=vertex(-1,-1,-1),b=vertex(-1,1,-1),c=vertex(-1,1,1),d=vertex(-1,-1,1);
        var e=vertex(1,-1,-1),f=vertex(1,1,-1),h=vertex(1,1,1),j=vertex(1,-1,1);
        var center=p(t,u,v),label=nameOf(record,lang);
        var detail=label+" · "+record.date+" · "+Math.abs(Number(record.lat)).toFixed(2)+"°"+(record.lat>=0?"N":"S")+
          " / "+Math.abs(Number(record.lng)).toFixed(2)+"°"+(record.lng>=0?"E":"W");
        var flip=center.x>940,tx=center.x+(flip?-22:22);
        s.push('<g class="seawater-water-block" tabindex="0" role="img" aria-label="'+esc(detail)+'">'+
          '<title>'+esc(detail)+'</title>'+
          '<path class="seawater-water-top" d="'+roundedPolygon([d,c,h,j],.19)+'"/>'+
          '<path class="seawater-water-side" d="'+roundedPolygon([b,f,h,c],.19)+'"/>'+
          '<path class="seawater-water-face" d="'+roundedPolygon([a,b,c,d],.19)+'"/>'+
          '<text class="seawater-water-label" text-anchor="'+(flip?"end":"start")+
          '" x="'+fix(tx)+'" y="'+fix(center.y-14)+'">'+esc(label)+'</text></g>');
      });
    }
    s.push('<g class="seawater-coord-key" aria-hidden="true">'+
      '<text x="'+fix(p(0,0,1).x-9)+'" y="'+fix(p(0,0,1).y-17)+'">Z · φ</text>'+
      '<text x="'+fix(p(0,1,0).x+15)+'" y="'+fix(p(0,1,0).y+22)+'">Y · λ</text>'+
      '<text x="'+fix(p(1,0,0).x+11)+'" y="'+fix(p(1,0,0).y+26)+'">X · t</text></g>');
    var svg=root.querySelector(".seawater-space-time-svg");
    if(svg)svg.innerHTML=s.join("");
    var readout=root.querySelector("[data-seawater-time-readout]");
    if(readout)readout.textContent="×"+(1+g.spread*360/465).toFixed(2);
  }
  function install() {
    var chart=document.querySelector("[data-seawater-space-time]");
    if(!chart) { if(active){unmount();active=null;}return; }
    if(installed.has(chart))return;
    unmount();installed.add(chart);active=chart;
    var room=chart.closest(".room-view");
    var scroll=room&&room.querySelector(".room-scroll");
    var slider=chart.querySelector("[data-seawater-time-slider]");
    var stage=chart.querySelector(".seawater-space-time-stage");
    if(!scroll||!slider||!stage)return;
    var records;
    try{records=JSON.parse(chart.dataset.chartRecords||"[]");}catch(_){records=[];}
    var lang=chart.dataset.chartLang||"zh",frame=0,oldScroll=-1,oldTime=-1;
    function scrollValue() {
      var view=scroll.getBoundingClientRect(),rect=stage.getBoundingClientRect();
      return clamp((view.bottom-rect.top)/(view.height+rect.height),0,1);
    }
    function paint() {
      frame=0;if(!chart.isConnected)return;
      var a=scrollValue(),b=clamp(Number(slider.value)/100,0,1);
      if(Math.abs(a-oldScroll)<.003&&Math.abs(b-oldTime)<.0005)return;
      oldScroll=a;oldTime=b;draw(chart,records,lang,a,b);
    }
    function schedule(){if(!frame)frame=requestAnimationFrame(paint);}
    scroll.addEventListener("scroll",schedule,{passive:true});
    slider.addEventListener("input",schedule,{passive:true});
    window.addEventListener("resize",schedule,{passive:true});
    var ro=null;
    if("ResizeObserver" in window){ro=new ResizeObserver(schedule);ro.observe(scroll);}
    schedule();
    unmount=function(){
      if(frame)cancelAnimationFrame(frame);
      scroll.removeEventListener("scroll",schedule);
      slider.removeEventListener("input",schedule);
      window.removeEventListener("resize",schedule);
      if(ro)ro.disconnect();
    };
  }
  var app=document.querySelector("#app");
  if(app&&"MutationObserver" in window){
    new MutationObserver(install).observe(app,{childList:true,subtree:false});
  }
  install();
})();