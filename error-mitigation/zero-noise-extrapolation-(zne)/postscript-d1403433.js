await Promise.all([
  import("./static/scripts/script-0-f7c52b6a.js"),
  import("./static/scripts/script-1-0e41d61b.js"),
  import("./static/scripts/script-2-ec880d15.js"),
  import("./static/scripts/script-3-1f9394e6.js"),
  import("./static/scripts/script-4-2a102aaa.js"),
  import("./static/scripts/script-5-cc8afa9d.js"),
  import("./static/scripts/script-6-7e107d7e.js"),
  import("./static/scripts/script-7-5ef560a8.js"),
  import("./static/scripts/script-8-632b2822.js"),
  import("./static/scripts/script-9-296b30c3.js"),
  import("./static/scripts/script-10-be15df42.js"),
  import("./static/scripts/script-11-3faff93b.js")
]);
await import("./static/scripts/script-12-d93af9ba.js");

// Dispatch nav & render events so all module scripts initialize after async load
document.dispatchEvent(new CustomEvent("nav"));
document.dispatchEvent(new CustomEvent("render"));

// Fallback global graph exploded view handler
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".global-graph-icon");
  if (btn) {
    const outer = document.querySelector(".global-graph-outer");
    if (outer) outer.classList.toggle("active");
  }
  const closeBtn = e.target.closest(".global-graph-outer");
  if (closeBtn && (e.target === closeBtn || e.target.classList.contains("global-graph-outer"))) {
    closeBtn.classList.remove("active");
  }
});