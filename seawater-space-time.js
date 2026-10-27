/* Sea water collection · rounded inner-basin coordinate lattice.
   X = collection time; Y/Z = longitude/latitude.
   Scroll changes ONLY the spatial projection. The slider changes ONLY X spacing.
   The source of sample coordinates remains the portfolio's record list. */
(function () {
  "use strict";

  var mounted = null;
  var cleanup = function () {};

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
  function smooth(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function mix(a, b, t) { return a + (b - a) * t; }
  function fix(n) { return Number(n).toFixed(2); }
  function xy(p) { return fix(p.x) + " " + fix(p.y); }
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
  function dateValue(date) {
    var recorded = String(date || "");
    // Month-only ledger entries stay month-only in the tooltip; the 1st is
    // used internally solely to give them a position along the time axis.
    var forPlot = /^\d{4}-\d{2}$/.test(recorded) ? recorded + "-01" : recorded;
    var n = Date.parse(forPlot + "T12:00:00Z");
    return Number.isFinite(n) ? n : 0;
  }
  function nameFor(record, lang) {
    var name = record.name;
    return typeof name === "string" ? name : ((name && (name[lang] || name.zh || name.en)) || "");
  }
  function line(a, b, kind) {
    return '<path class="' + kind + '" d="M ' + xy(a) + ' L ' + xy(b) + '"/>';
  }
  function polygon(points) {
    return "M " + points.map(xy).join(" L ") + " Z";
  }
  function roundedPolygon(points, radius) {
    var pieces = [], n = points.length;
    points.forEach(function (p, i) {
      var prev = points[(i + n - 1) % n], next = points[(i + 1) % n];
      var a = {x: mix(p.x, prev.x, radius), y: mix(p.y, prev.y, radius)};
      var b = {x: mix(p.x, next.x, radius), y: mix(p.y, next.y, radius)};
      pieces.push((i ? " L " : "M ") + xy(a) + " Q " + xy(p) + " " + xy(b));
    });
    return pieces.join("") + " Z";
  }

  // Outline of the projection of a real cube; used as a single rounded clip.
  // Rounding each individual face would leave false gaps along shared seams.
  function hull(points) {
    var sorted = points.slice().sort(function (a, b) { return a.x - b.x || a.y - b.y; });
    function cross(a, b, c) {
      return (b.x-a.x)*(c.y-a.y) - (b.y-a.y)*(c.x-a.x);
    }
    var lower = [], upper = [];
    sorted.forEach(function (point) {
      while (lower.length >= 2 && cross(lower[lower.length-2], lower[lower.length-1], point) <= 0) lower.pop();
      lower.push(point);
    });
    sorted.reverse().forEach(function (point) {
      while (upper.length >= 2 && cross(upper[upper.length-2], upper[upper.length-1], point) <= 0) upper.pop();
      upper.push(point);
    });
    lower.pop(); upper.pop();
    return lower.concat(upper);
  }

  function geometry(scrollProgress, timeProgress) {
    var s = smooth(scrollProgress);
    var width = 345 + 355 * smooth(timeProgress);
    // The old longitude vector (+X,-Y) made the rear appear in front.
    // It now points LEFT and DOWN: the inside of the basin opens toward us.
    var longitude = {x: mix(-148, -185, s), y: mix(133, 29, s)};
    var latitude  = {x: mix(-7, -1, s),   y: mix(-250, -238, s)};
    var origin = {x: 389, y: 387};
    function project(t, lng, lat) {
      return {
        x: origin.x + width * t + longitude.x * lng + latitude.x * lat,
        y: origin.y + longitude.y * lng + latitude.y * lat
      };
    }
    return {
      project: project,
      width: width,
      spread: smooth(timeProgress),
      // Eight YZ sections total, instead of sixteen.
      slices: 7,
      wallToFloorRadius: .15,
      sideToWallRadius: .15
    };
  }

  function basinSlice(g, time) {
    var p = g.project, r = g.wallToFloorRadius;
    // Vertical wall -> rounded inner corner -> projected basin floor.
    return '<path class="seawater-slice" d="M ' + xy(p(time,0,1)) +
      ' L ' + xy(p(time,0,r)) + ' Q ' + xy(p(time,0,0)) +
      ' ' + xy(p(time,r,0)) + ' L ' + xy(p(time,1,0)) + '"/>';
  }
  function sideWallRail(g, latitude) {
    var p = g.project, r = g.sideToWallRadius;
    var t = 30 / g.width;
    // Longitude face -> rounded left corner -> time-facing wall.
    return '<path class="seawater-wall-rail" d="M ' + xy(p(0,1,latitude)) +
      ' L ' + xy(p(0,r,latitude)) + ' Q ' + xy(p(0,0,latitude)) +
      ' ' + xy(p(t,0,latitude)) + ' L ' + xy(p(1,0,latitude)) + '"/>';
  }
  function leftFloorRail(g, longitude) {
    var p = g.project, radius = .15, timeBend = 30 / g.width;
    // The third rounded junction: left geographic face -> time/floor rail.
    return '<path class="seawater-floor-rail" d="M ' + xy(p(0,longitude,1)) +
      ' L ' + xy(p(0,longitude,radius)) + ' Q ' + xy(p(0,longitude,0)) +
      ' ' + xy(p(timeBend,longitude,0)) + ' L ' + xy(p(1,longitude,0)) + '"/>';
  }
  function cube(g, record, time, longitude, latitude, index, lang) {
    var p = g.project, dt = 15 / g.width, dy = .074, dz = .062;
    function v(x, y, z) { return p(time + x*dt, longitude + y*dy, latitude + z*dz); }
    var a=v(-1,-1,-1), b=v(1,-1,-1), c=v(1,-1,1), d=v(-1,-1,1);
    var e=v(-1,1,-1),  f=v(1,1,-1),  h=v(1,1,1),  j=v(-1,1,1);
    var border = roundedPolygon(hull([a,b,c,d,e,f,h,j]), .13);
    var uid = "sea-water-cube-" + index;
    var label = nameFor(record, lang);
    var lat = Number(record.lat), lon = Number(record.lng);
    var detail = label + " · " + record.date + " · " + Math.abs(lat).toFixed(6) +
      "°" + (lat >= 0 ? "N" : "S") + " / " + Math.abs(lon).toFixed(6) +
      "°" + (lon >= 0 ? "E" : "W");
    var center = p(time, longitude, latitude), right = center.x <= 930;
    return '<g class="seawater-water-block" tabindex="0" role="img" aria-label="' + esc(detail) + '">' +
      '<title>' + esc(detail) + '</title>' +
      '<defs><clipPath id="' + uid + '"><path d="' + border + '"/></clipPath></defs>' +
      '<path class="seawater-water-body" d="' + border + '"/>' +
      '<g clip-path="url(#' + uid + ')">' +
        '<path class="seawater-water-side" d="' + polygon([b,f,h,c]) + '"/>' +
        '<path class="seawater-water-top" d="' + polygon([d,c,h,j]) + '"/>' +
        '<path class="seawater-water-face" d="' + polygon([e,f,h,j]) + '"/>' +
      '</g>' +
      '<path class="seawater-water-outline" d="' + border + '"/>' +
      '<text class="seawater-water-label" text-anchor="' + (right ? "start" : "end") +
        '" x="' + fix(center.x+(right?27:-27)) + '" y="' + fix(center.y-15) + '">' +
        esc(label) + '</text>' +
    '</g>';
  }

  function draw(chart, records, lang, spatial, temporal) {
    var g = geometry(spatial, temporal), p = g.project;
    var lines = ['<g class="seawater-mesh" aria-hidden="true">'];

    // YZ positioning remains implicit in the sparse left-hand coordinate face.
    // All three changes of direction use quadratic bends. The outermost
    // t=0 basin slice is intentionally omitted: it is the unwanted left edge.
    for (var t=1; t<=g.slices; t++) lines.push(basinSlice(g,t/g.slices));
    for (var z=1; z<=6; z++) lines.push(sideWallRail(g,z/6));
    for (var y=1; y<=6; y++) lines.push(leftFloorRail(g,y/7));
    lines.push("</g>");

    var valid = records.filter(function (r) {
      return dateValue(r.date) && Number.isFinite(Number(r.lat)) && Number.isFinite(Number(r.lng));
    });
    if (valid.length) {
      var times = valid.map(function (r) { return dateValue(r.date); });
      var min = Math.min.apply(null,times), span = Math.max(1,Math.max.apply(null,times)-min);
      var placed = valid.map(function (record,index) {
        return {
          record: record,
          index: index,
          time: (dateValue(record.date)-min)/span,
          longitude: clamp((Number(record.lng)+180)/360,0,1),
          latitude: clamp((Number(record.lat)+90)/180,0,1)
        };
      });
      // Rear samples first; nearby longitude samples remain legible in front.
      placed.sort(function (a,b) { return a.longitude-b.longitude || a.time-b.time; });
      placed.forEach(function (r) {
        lines.push(cube(g,r.record,r.time,r.longitude,r.latitude,r.index,lang));
      });
    }
    lines.push('<g class="seawater-coord-key" aria-hidden="true">' +
      '<text x="' + fix(p(0,0,1).x-11) + '" y="' + fix(p(0,0,1).y-18) + '">Z · φ</text>' +
      '<text x="' + fix(p(0,1,0).x-6) + '" y="' + fix(p(0,1,0).y+24) + '">Y · λ</text>' +
      '<text x="' + fix(p(1,0,0).x+12) + '" y="' + fix(p(1,0,0).y+25) + '">X · t</text>' +
      '</g>');
    var svg = chart.querySelector(".seawater-space-time-svg");
    if (svg) svg.innerHTML = lines.join("");
    var readout = chart.querySelector("[data-seawater-time-readout]");
    if (readout) readout.textContent = "×" + (g.width/345).toFixed(2);
  }

  function install() {
    var chart = document.querySelector("[data-seawater-space-time]");
    if (chart === mounted) return;
    cleanup();
    mounted = chart;
    cleanup = function () {};
    if (!chart) return;

    var room = chart.closest(".room-view");
    var scroll = room && room.querySelector(".room-scroll");
    var stage = chart.querySelector(".seawater-space-time-stage");
    var slider = chart.querySelector("[data-seawater-time-slider]");
    if (!scroll || !stage || !slider) return;
    var records = [];
    try { records=JSON.parse(chart.dataset.chartRecords||"[]"); } catch (_) {}
    var lang=chart.dataset.chartLang||"zh";
    var frame=0, priorSpatial=-1,priorTime=-1;

    function spatialProgress() {
      var view=scroll.getBoundingClientRect(), rect=stage.getBoundingClientRect();
      return clamp((view.bottom-rect.top)/(view.height+rect.height),0,1);
    }
    function paint() {
      frame=0;
      if (!chart.isConnected) return;
      var s=spatialProgress(), t=clamp((Number(slider.value)||0)/100,0,1);
      if (Math.abs(s-priorSpatial)<.002 && Math.abs(t-priorTime)<.0005) return;
      priorSpatial=s;priorTime=t;
      draw(chart,records,lang,s,t);
    }
    function schedule() { if (!frame) frame=requestAnimationFrame(paint); }
    scroll.addEventListener("scroll",schedule,{passive:true});
    slider.addEventListener("input",schedule,{passive:true});
    window.addEventListener("resize",schedule,{passive:true});
    var resizeObserver=null;
    if ("ResizeObserver" in window) {
      resizeObserver=new ResizeObserver(schedule);
      resizeObserver.observe(stage);
      resizeObserver.observe(scroll);
    }
    schedule();
    cleanup=function () {
      if (frame) cancelAnimationFrame(frame);
      scroll.removeEventListener("scroll",schedule);
      slider.removeEventListener("input",schedule);
      window.removeEventListener("resize",schedule);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }
  var app=document.querySelector("#app");
  if (app && "MutationObserver" in window) {
    new MutationObserver(install).observe(app,{childList:true,subtree:false});
  }
  install();
})();