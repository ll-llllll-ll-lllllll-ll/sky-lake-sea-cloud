/* Calendar · uninterrupted ambient playback and quiet title-side entry.
   Loaded after script.js, keeping the large core script unchanged. */
(function () {
  "use strict";

  if (typeof window.render !== "function" ||
      typeof renderHome !== "function" ||
      typeof ambientEntryForDate !== "function") return;

  var baseRender = window.render;
  var host = document.querySelector("#app");
  if (!host) return;

  function clipIdentity(video) {
    if (!video) return "";
    var source = video.querySelector('source[type="video/webm"]');
    if (source) return source.getAttribute("src") || "";
    return video.dataset.originalWebm || video.getAttribute("src") || "";
  }

  function setCalendarEntry(home) {
    if (!home) return;
    var group = home.querySelector(".home-day-calligraphy");
    var former = home.querySelector(".calendar-toggle");
    var title = group && group.querySelector(".home-day-calligraphy-title");
    if (!group || !title) return;

    // Turn the day name into a native, keyboard-accessible calendar button.
    if (title.tagName.toLowerCase() !== "button") {
      var titleButton = document.createElement("button");
      titleButton.type = "button";
      titleButton.className = title.className;
      titleButton.textContent = title.textContent;
      titleButton.dataset.action = "toggle-calendar";
      titleButton.setAttribute("aria-label", title.textContent.trim() + " · " + labels[state.lang].calendar);
      title.replaceWith(titleButton);
      title = titleButton;
    }

    // The four landscapes are a daily cycle, not a permanent site title.
    var cycleNames = {
      zh: "天－湖－海－云 日历",
      en: "sky · lake · sea · clouds calendar",
      ja: "空・湖・海・雲 の暦"
    };
    var cycleName = cycleNames[state.lang] || cycleNames.zh;

    // Physically move the existing link so the former top-left entry disappears.
    if (former) {
      former.textContent = cycleName;
      former.setAttribute("aria-label", cycleName);
      former.classList.remove("calendar-toggle");
      former.classList.add("home-day-calendar-link");
      group.insertBefore(former, title.nextSibling);
    }

    group.classList.add("has-calendar-trigger");
  }

  function setMotion(home) {
    if (!home) return;
    var isBlurred = state.calendarOpen || state.indexOpen;
    home.classList.toggle("is-ambient-obscured", isBlurred);
    var video = home.querySelector(".ambient-video");
    if (!video) return;
    var speed = isBlurred ? 0.5 : 1;
    try {
      if (Math.abs(video.playbackRate - speed) > 0.01) video.playbackRate = speed;
    } catch (_) {}
  }

  function refreshHome() {
    var home = host.querySelector(".home-view");
    if (!home || typeof parseRoute !== "function" || parseRoute()) {
      baseRender();
      var rendered = host.querySelector(".home-view");
      setCalendarEntry(rendered);
      setMotion(rendered);
      return;
    }

    var date = selectedDate();
    var type = ambientTypeForDate(date);
    var item = ambientEntryForDate(date, type);
    var video = home.querySelector(".ambient-video");
    var field = home.querySelector(".ambient-field");
    var sameClip = Boolean(item && item.src && video && field &&
      clipIdentity(video) === item.src);

    if (!sameClip) {
      // A genuinely different day's clip should load normally.
      baseRender();
      var fresh = host.querySelector(".home-view");
      setCalendarEntry(fresh);
      setMotion(fresh);
      return;
    }

    // renderHome() creates the next interface only in an inert template.
    // The current .ambient-field (and actual video node) stays attached.
    var template = document.createElement("template");
    template.innerHTML = renderHome().trim();
    var upcoming = template.content.firstElementChild;
    var upcomingField = upcoming && upcoming.querySelector(".ambient-field");
    if (!upcoming || !upcomingField) {
      baseRender();
      setCalendarEntry(host.querySelector(".home-view"));
      setMotion(host.querySelector(".home-view"));
      return;
    }

    Array.prototype.slice.call(home.children).forEach(function (child) {
      if (child !== field) child.remove();
    });
    Array.prototype.slice.call(upcoming.children).forEach(function (child) {
      if (child !== upcomingField) home.appendChild(child);
    });

    // Keep existing ambient-day-* class and grading rather than resetting it.
    document.documentElement.lang = state.lang === "zh" ? "zh-Hans" : state.lang;
    document.title = "sky-sea-lake-cloud";
    setCalendarEntry(home);
    setMotion(home);
  }

  // The core app's delegated actions call render() by name.
  // Replacing the global function makes month navigation, overlay toggles and
  // language changes preserve the same in-memory video element.
  window.render = refreshHome;

  // The title is deliberately a day-title, never a permanent site name.
  // If the page stays open across local midnight, quietly replace yesterday's
  // date and scene without requiring a reload. Browsers may suspend timers
  // while hidden, so pageshow / visibilitychange also reconcile the date.
  var lastLocalDay = dateKey(todayAtNoon());
  var midnightTimer = 0;

  function updateDayIfNeeded() {
    var currentDay = dateKey(todayAtNoon());
    if (currentDay === lastLocalDay) return;
    lastLocalDay = currentDay;
    // Leave a visitor's chosen historical date alone.
    if (state.previewDate || parseRoute()) return;
    refreshHome();
  }

  function scheduleNextDay() {
    if (midnightTimer) clearTimeout(midnightTimer);
    var now = new Date();
    var nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 2);
    midnightTimer = setTimeout(function () {
      updateDayIfNeeded();
      scheduleNextDay();
    }, Math.max(1000, nextDay.getTime() - now.getTime()));
  }

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
      updateDayIfNeeded();
      scheduleNextDay();
    }
  });
  window.addEventListener("pageshow", function () {
    updateDayIfNeeded();
    scheduleNextDay();
  });

  scheduleNextDay();

  // First installation is decorative only: do not re-render the playing clip.
  var initial = host.querySelector(".home-view");
  setCalendarEntry(initial);
  setMotion(initial);
})();