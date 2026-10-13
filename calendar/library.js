"use strict";

/*
  Ambient calendar media library

  calendar/ocean/ -> 海之日 / day of the sea
  calendar/cloud/ -> 云之日 / day of clouds
  calendar/lake/  -> 湖之日 / day of the lake
  calendar/sky/   -> 天之日 / day of the sky

  The four day categories appear in a balanced but shuffled rhythm, regardless
  of how many clips happen to be in each folder. Within a category, clips are
  chosen from a deterministic no-repeat bag; every available clip is used
  before one repeats. The UI displays the day name, never a "record 01" title.

  Files are numbered 1.webm, 2.webm, etc. When new clips are added,
  update only the corresponding counts below.
*/

(function () {
  function numberedSeries(folder, count) {
    var entries = [];
    for (var i = 1; i <= count; i++) {
      entries.push({ src: "./calendar/" + folder + "/" + i + ".webm" });
    }
    return entries;
  }

  window.AMBIENT_LIBRARY = {
    sea: numberedSeries("ocean", 3),
    cloud: numberedSeries("cloud", 1),
    lake: numberedSeries("lake", 10),
    sky: numberedSeries("sky", 7)
  };
})();