---
layout: documentation
title: Housel Bay File Server 
---

<script>
  window.R2_CONFIG = {
    WORKER:       "https://list-files-dyski.tom-whitwell.workers.dev",
    START_PREFIX: ""
  };
</script>

<style>
/* ===== Tokens ===== */
:root{
  --bg:#fafbff; --panel:#fff; --text:#121521; --muted:#5c5f72;
  --line:#e3e7f1; --line-soft:#edf0f6; --btn-border:#d0d7e0; --btn-hov:#f6f7ff;
  --brand:#6b4ce0; --brand-bg:#ece9ff; --brand-border:#d9d6f8;
}
@media (prefers-color-scheme: dark){
  :root{
    --bg:#0f1116; --panel:#151821; --text:#e6eaf2; --muted:#a4acbf;
    --line:#2a2f3a; --line-soft:#2a2f3a; --btn-border:#2a2f3a; --btn-hov:#262a37;
    --brand:#9eaaff; --brand-bg:#2a2f4d; --brand-border:#3943a3;
  }
}

/* ===== Layout & basics ===== */
html,body{margin:0}
body{
  font-family: "Inter", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  background: var(--bg); color: var(--text); padding: 2rem;
}
.wrap{
  max-width: 960px; margin: 0 auto; background: var(--panel);
  border:1px solid var(--line); border-radius:1rem; padding:2rem; box-shadow:0 2px 4px rgba(0,0,0,.02);
}
.topbar{
  display:grid; grid-template-columns:1fr auto; align-items:start; position:sticky; top:0; background:var(--panel);
  z-index:10; padding-top:.75rem;
}
.topbar h1{ margin:0; font-size:1.9rem; font-weight:800; color:#0b1222; }
.btn-cta{
  background:var(--brand-bg); color:var(--brand); font-weight:700; border:1px solid var(--brand-border);
  border-radius:.8rem; padding:.5rem 1.2rem; cursor:pointer; transition:background .15s ease;
}
.btn-cta:hover{ filter:brightness(.98) }

/* ===== Nav + sort ===== */
.navrow{ display:flex; align-items:center; gap:.6rem; margin:.4rem 0 .8rem; }
.pillnav{ flex:1; display:flex; flex-wrap:wrap; gap:.4rem; }
.pillnav .pill{
  display:inline-flex; align-items:center; gap:.35rem; font-weight:600;
  padding:.4rem .9rem; border-radius:1.5rem; border:1px solid #e6eaf2; background:#f7f8fc; color:#4a4e6b; text-decoration:none;
}
.pillnav .pill:hover{ background:#eef0ff }
.pillnav .pill-current{ background:#eaf0ff; border-color:#c7d2fe; color:#1e3a8a }
.pillnav .dash{ opacity:.5 }
.rule{ height:1px; background:linear-gradient(90deg,#eaeef7,transparent); margin:.5rem 0 .75rem }

.sortbar{ display:flex; gap:.4rem; align-items:center; justify-content:flex-end; margin:.4rem 0 1rem; }
.btn{
  border:1px solid var(--btn-border); background:var(--panel); color:#111; font-weight:600; border-radius:.6rem;
  padding:.4rem .9rem; cursor:pointer; transition:background .15s ease, transform .06s;
}
.btn:hover{ background:var(--btn-hov) }
.btn:active{ transform: translateY(1px) }
.btn:focus-visible{ outline:2px solid #94a8ff; outline-offset:2px }
.btn-sm{ padding:.3rem .65rem; font-size:.92rem; border-radius:.5rem }
.btn-active{ background:#e0e7ff; color:#1e3a8a; border-color:#c7d2fe }
.btn-download{ color:var(--brand); border-color:#c8bdf7 }
.btn-download:hover{ background:#f3f0ff }


/* make <a class="btn"> behave like the <button class="btn"> siblings */
.actions a.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  line-height: 1;          /* avoid taller inline line box */
}

/* don't let :visited change the color */
.actions a.btn:visited { color: inherit; }
.actions a.btn.btn-download:visited { color: var(--brand); }

/* optional: keep brand text but use the same neutral border as others */
.btn-download { border-color: var(--btn-border); }        /* was purple */
.btn-download:hover { background: var(--btn-hov); }       /* keep hover consistent */



/* drop-in: make the note sit below the title across both columns */
.topbar .topnote{
  grid-column: 1 / -1;   /* span under the title and the Upload button */
  margin: .4rem 0 0;
  line-height: 1.4;
  }
  
  /* put the pill and the title on the same line */
.headline{
  display: flex;
  align-items: center;   /* or baseline if you prefer */
  gap: .5rem;
  flex-wrap: nowrap;     /* keep pill on the first line */
}

.headline .pill{
  flex: 0 0 auto;        /* don’t let it stretch */
  white-space: nowrap;
  line-height: 1;        /* tighter badge box */
}

.headline .title{
  flex: 1 1 auto;
  min-width: 0;          /* allow wrapping/truncation */
  /* keep your existing clamp settings */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}


  
}


/* ===== Items ===== */
.items{ list-style:none; padding:0; margin:0 }
.item{
  display:grid; grid-template-columns:minmax(0,1fr) auto; align-items:start;
  padding:1rem 0; border-bottom:1px solid var(--line-soft);
}
.item:last-child{ border-bottom:none }
.title{
  font-weight:800; font-size:1.25rem; line-height:1.2; margin:0;
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
}
@media (max-width:740px){ .title{ font-size:1.1rem } }
.meta{ color:#555a6a; font-size:.9rem; margin-top:.4rem }
.pill{ margin-right:.5rem; background:#f1f3f9; border-radius:1rem; font-size:.8rem; font-weight:700; color:#4c5060; padding:.1rem .6rem; border:1px solid #e0e3ee }
.actions{ display:flex; align-self:start; gap:.5rem }

/* Play chip */
[data-play]{
  width:44px; height:44px; border:1px solid var(--btn-border); border-radius:12px;
  display:flex; align-items:center; justify-content:center; background:var(--panel); cursor:pointer;
}
[data-play]:hover{ background:#eef2ff }

/* ===== Upload (always to incoming/) ===== */
.upload{ margin-top:2rem }
.upload .box{
  border:2px dashed #e2e6f2; border-radius:1rem; padding:1.25rem 1.5rem; background:#fafaff;
}
.muted{ color:var(--muted); font-size:.95rem }
.upload .muted{ display:block; margin:0 0 .75rem }
.upload .row{ display:flex; flex-wrap:wrap; align-items:center; gap:.6rem 1rem }
.upload .row label{ display:flex; flex-direction:column; gap:.25rem; font-weight:600; color:#2e3348 }
.upload .row label > input, .upload .row label > textarea{
  border:1px solid #d4d8e2; border-radius:.5rem; padding:.5rem .6rem; font:inherit; min-width:220px; max-width:100%
}
#desc{ width:100%; min-height:72px }
#fileName{ color:#6b6f85; margin-left:.25rem }
.progress{ display:none; height:8px; background:#eef2ff; border-radius:6px; overflow:hidden; margin-top:.75rem }
.progress .bar{ height:100%; width:0%; background:#6b4ce0; transition: width .2s ease }
/* Mobile/portrait tweaks */
@media (max-width: 600px){

  /* comfy margins + notches */
  body{
    padding: 1rem;
    padding-left:  max(1rem, env(safe-area-inset-left));
    padding-right: max(1rem, env(safe-area-inset-right));
  }
  .wrap{ padding: 1rem; }

  /* smaller, tighter H1 + Upload */
  .topbar h1{ font-size: clamp(1.4rem, 7vw, 1.8rem); line-height: 1.05; }
  .btn-cta{ padding:.4rem .9rem; }

  /* pill nav should scroll instead of clipping */
  .pillnav{
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: .25rem;
  }
  .pillnav .pill{ white-space: nowrap; padding:.35rem .7rem; }

  /* stack each file item; actions below text, wrap nicely */
  .item{ grid-template-columns: 1fr; padding:.9rem 0; }
  .actions{
    margin-top:.6rem;
    flex-wrap: wrap;
    gap:.5rem;
  }
  .actions .btn, .actions [data-play]{
    flex: 1 1 calc(50% - .25rem);
    min-height: 44px;       /* thumb-friendly */
  }

  /* force pill + headline onto one row */
  .wrap .item > div > .headline{
    display: flex !important;
    align-items: baseline;
    gap: .4rem;
    min-width: 0;
  }
  .wrap .item > div > .headline .pill{
    flex: 0 0 auto;
    white-space: nowrap;
    line-height: 1;
    margin-top: .1rem;
  }
  .wrap .item > div > .headline .title{
    flex: 1 1 auto;
    min-width: 0;
    font-size: 1.05rem;
    /* keep clamp but allow a bit more text on small screens */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
  }
}
</style>

<div class="wrap">
  <div class="topbar">
    <h1>Housel Bay File Server</h1>
    <a href="#upload" class="btn-cta">UPLOAD</a>
    <p class="meta topnote">
  The files on the SD card on the radios are in <strong>SD/</strong><br>Your uploads go into <strong>incoming/</strong><br> You can use <strong>Replace</strong> to update an existing file.
</p>

  </div>

  <div class="navrow">
    <div id="pillnav" class="pillnav"></div>
    <div class="sortbar">
      <button id="sortLatest" class="btn btn-active">Latest</button>
      <button id="sortRandom" class="btn">Shuffle</button>
    </div>
  </div>
  <div class="rule"></div>

  <ul id="items" class="items"></ul>
  <div class="pager"><button id="more" class="btn">More</button></div>

  <div id="upload" class="upload">
    <h3>Upload</h3>
    <div class="box">
      <p class="muted">Drop your file here or choose one.<br>All uploads go to <strong>incoming/</strong>. <br>Please add your name and a description. <br>Use <strong>replace</strong> to change a file after you've uploaded it (it works but doesn't give any feedback).</p>
      <form id="up" enctype="multipart/form-data" class="row">
        <label class="btn">Choose file <input type="file" name="file" required hidden></label>
        <span id="fileName" class="muted">No file chosen</span>

        <label>Your name:
          <input type="text" id="uploader" placeholder="e.g. Alex">
        </label>

        <label class="muted" style="flex:1 1 100%">Description:
          <textarea id="desc" rows="2" placeholder="Shown as the headline"></textarea>
        </label>

        <button class="btn" type="submit">Upload</button>
      </form>
      <div id="progress" class="progress"><div id="bar" class="bar"></div></div>
      <div id="status" class="muted" style="margin-top:.4rem"></div>
    </div>
  </div>
</div>

<form action="https://list-files-dyski.tom-whitwell.workers.dev/manifest/rebuild" method="post" target="_blank">
  <button type="submit">Rebuild</button>
</form>



<script>
(() => {
  const cfg = window.R2_CONFIG || {};
  const API = cfg.WORKER;
  const FILE = API + "/file";
  const META = API + "/meta/set";
  const REPLACE = API + "/replace";

  // Only allow editing/replacing for files under these prefixes
const EDITABLE_PREFIXES = ["incoming/"];



  let currentPrefix = cfg.START_PREFIX || "";
  let buffer = [];        // raw items from server (concat pages)
  let ordered = [];       // stable view of buffer (latest or shuffled)
  let cursor = null;      // server pagination cursor
  let sortMode = "latest";
  let displayCount = 20;  // how many to show locally per click

  const qs = s => document.querySelector(s);
  const qsa = s => Array.from(document.querySelectorAll(s));
  const setStatus = m => { const el = qs("#status"); if (el) el.textContent = m || ""; };

  // Utils
  function humanSize(bytes){ const u=["B","KB","MB","GB","TB"]; let i=0,n=bytes||0; while(n>=1024&&i<u.length-1){ n/=1024;i++; } return `${n.toFixed(n<10&&i>0?1:0)} ${u[i]}`; }
  function kindFor(k){ const s=k.toLowerCase(); if(/\.(wav|aif|aiff|mp3|flac|ogg|m4a)$/.test(s))return"AUDIO"; if(/\.(jpg|jpeg|png|gif|tif|tiff|webp)$/.test(s))return"IMAGE"; if(/\.(zip|rar|7z|tar|gz)$/.test(s))return"ARCHIVE"; return"FILE"; }
  function fmtDatePretty(iso){ if(!iso) return ""; const d=new Date(iso); return d.toLocaleString("en-GB",{day:"numeric",month:"long",year:"numeric",hour:"numeric",minute:"2-digit",hour12:true}).replace(","," at"); }
  function esc(s){ return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"); }

  // UI helpers
  function pill(label, pref, cls=""){ return `<a href="#" class="pill ${cls}" data-prefix="${pref}">${label}</a>`; }

  function renderPillNav(prefix, folders){
    const nav = qs("#pillnav"); if (!nav) return;
    const parts = prefix.split("/").filter(Boolean);
    let acc = "";
    const ancestors = parts.slice(0, -1).map(seg => { acc += seg + "/"; return { label: seg + "/", prefix: acc }; });
    const currentLabel = parts.length ? parts[parts.length-1] + "/" : "Home";
    let html = "";
    html += pill("Home", "", parts.length ? "pill-home" : "pill-home pill-current");
    ancestors.forEach(a => { html += pill(a.label, a.prefix); });
    if (parts.length) html += pill(currentLabel, prefix, "pill-current");
    // children
    const kids = (folders||[]);
    if (kids.length) html += `<span class="dash">—</span>`;
    kids.forEach(f => { html += pill(f.prefix, f.prefix); });
    nav.innerHTML = html;
    nav.querySelectorAll('[data-prefix]').forEach(a => a.onclick = (e)=>{ e.preventDefault(); load(a.dataset.prefix || ""); });
  }

function itemHTML(f){
  const pillKind = kindFor(f.key);
  const headline = f.description ? f.description : f.key.split("/").pop();
  const meta = [ humanSize(f.size||0), (f.uploader ? `Uploaded by ${f.uploader}` : "Uploaded"), fmtDatePretty(f.uploaded||f.updated) ].join(" | ");
  const v = encodeURIComponent(f.rev || f.updated || f.uploaded || "1");
  const playUrl = `${FILE}?key=${encodeURIComponent(f.key)}&v=${v}`;
  const dlUrl   = `${f.url}${f.url.includes("?") ? "&" : "?"}v=${v}`;

  // 👇 Only incoming/ files are editable
  const isEditable = EDITABLE_PREFIXES.some(p => f.key.startsWith(p));

  return `
    <li class="item" data-key="${esc(f.key)}">
      <div>
        <div class="headline" title="${esc(headline)}">
          <span class="pill">${pillKind}</span>
          <span class="title">${esc(headline)}</span>
        </div>
        <div class="meta">${esc(meta)}</div>
      </div>
      <div class="actions">
        ${pillKind==="AUDIO" ? `<button class="btn btn-sm" data-play="${playUrl}">▶</button>` : ""}
        <a class="btn btn-sm btn-download" href="${dlUrl}" download>Download</a>
        ${isEditable ? `<button class="btn btn-sm" data-edit="${f.key}">Edit</button>` : ""}
        ${isEditable ? `<button class="btn btn-sm" data-replace="${f.key}">Replace</button>` : ""}
      </div>
    </li>
  `;
}


  function shuffleInPlace(arr){
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor((crypto.getRandomValues(new Uint32Array(1))[0] / 2**32) * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function recomputeOrder(){
    ordered = buffer.slice();
    if (sortMode === "random") {
      shuffleInPlace(ordered);           // one-time shuffle; keep stable until mode changes
    } else {
      ordered.sort((a,b) => (b.uploaded||"").localeCompare(a.uploaded||""));
    }
  }

  function renderList(){
    const ul = qs("#items");
    const visible = ordered.slice(0, displayCount);
    ul.innerHTML = visible.map(itemHTML).join("");
    const hasMoreLocally = displayCount < ordered.length;
    qs("#more").style.display = (hasMoreLocally || !!cursor) ? "inline-block" : "none";
    wireRowEvents();
  }

  function wireRowEvents(){
    // Singleton player
    const player = wireRowEvents._player || new Audio();
    wireRowEvents._player = player;
    let currentBtn = null;

    qsa('[data-play]').forEach(btn=>{
      btn.onclick = ()=>{
        const url = btn.getAttribute('data-play');
        if (!player.paused && player.src === url) { player.pause(); return; }
        if (!player.paused) player.pause();
        if (currentBtn && currentBtn !== btn) currentBtn.textContent = "▶";
        currentBtn = btn; btn.textContent = "…";
        player.src = url; player.load();
        player.play().then(()=>{ btn.textContent = "⏸"; }).catch(()=>{ btn.textContent = "▶"; });
      };
    });
    player.addEventListener("pause", ()=>{ if (currentBtn) currentBtn.textContent = "▶"; });
    player.addEventListener("ended", ()=>{ if (currentBtn) currentBtn.textContent = "▶"; });

    // Inline edit (uploader/description)
    qsa('[data-edit]').forEach(btn=>{
      btn.onclick = ()=>{
        const key = btn.getAttribute('data-edit');
        const li = btn.closest('.item');
        const titleEl = li.querySelector('.title');
        const metaEl  = li.querySelector('.meta');
        const currentDesc = titleEl.textContent.trim();
        const parts = metaEl.textContent.split("|").map(s=>s.trim());
        const uploaderPart = parts[1] || "Uploaded";
        const currentUploader = uploaderPart.startsWith("Uploaded by") ? uploaderPart.replace("Uploaded by","").trim() : "";

        const editor = document.createElement("div");
        editor.className="row"; editor.style.marginTop=".4rem";
        editor.innerHTML = `
          <input id="editUploader" placeholder="Your name" value="${esc(currentUploader)}">
          <input id="editDesc" style="min-width:280px;flex:1" placeholder="Description" value="${esc(currentDesc)}">
          <button class="btn btn-sm" id="saveMeta">Save</button>
          <button class="btn btn-sm" id="cancelMeta">Cancel</button>
        `;
        titleEl.replaceWith(editor);

        editor.querySelector("#cancelMeta").onclick = ()=>{ editor.replaceWith(makeSpan('title', currentDesc)); };
        editor.querySelector("#saveMeta").onclick = async ()=>{
          const description = editor.querySelector("#editDesc").value.trim();
          const uploader    = editor.querySelector("#editUploader").value.trim();
          try{
            const res = await fetch(META, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ key, description, uploader }) });
            const data = await res.json(); if(!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
            editor.replaceWith(makeSpan('title', description || currentDesc));
            parts[1] = uploader ? `Uploaded by ${uploader}` : "Uploaded";
            metaEl.textContent = parts.join(" | ");
            setStatus("Saved");
          }catch(e){ setStatus(`Save error: ${e.message}`); }
        };
      };
    });

    // Replace (archive old -> write new -> keep/merge meta)
    qsa('[data-replace]').forEach(btn=>{
      btn.onclick = ()=>{
        const key = btn.getAttribute('data-replace');
        const picker = document.createElement('input');
        picker.type = 'file';
        picker.onchange = async ()=>{
          const file = picker.files?.[0];
          if(!file) return;
          const fd = new FormData();
          fd.append('key', key);
          fd.append('file', file, file.name);
          setStatus("Replacing…");
          btn.disabled = true;
          try{
            const res = await fetch(REPLACE, { method:'POST', body: fd });
            const data = await res.json();
            if(!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
            setStatus("Replaced");
            await reloadCurrent();
          }catch(e){ setStatus(`Replace error: ${e.message}`); }
          finally{ btn.disabled = false; }
        };
        picker.click();
      };
    });
  }

  function makeSpan(cls, text){ const s=document.createElement('span'); s.className=cls; s.textContent=text||"(no description)"; return s; }

  // Data
  async function fetchList(prefix, cur){
    const p = new URLSearchParams(); if (prefix) p.set("prefix", prefix); if (cur) p.set("cursor", cur);
    const res = await fetch(`${API}/?${p.toString()}`, { headers:{ accept:"application/json" }});
    if(!res.ok) throw new Error(res.statusText);
    return await res.json();
  }

  async function load(prefix){
    currentPrefix = prefix || "";
    buffer = []; cursor = null; displayCount = 20;
    const page = await fetchList(currentPrefix);
    buffer = page.files || [];
    cursor = page.cursor || null;
    recomputeOrder();
    renderPillNav(page.prefix || "", page.folders || []);
    renderList();
  }

  async function loadMoreOrExpand(){
    // Show more from what we already have
    if (displayCount < ordered.length) {
      displayCount += 20;
      renderList();
      return;
    }
    // Need another page from server
    if (!cursor) return;
    const page = await fetchList(currentPrefix, cursor);
    buffer = buffer.concat(page.files || []);
    cursor = page.cursor || null;
    recomputeOrder();        // keep order stable (shuffle once)
    displayCount += 20;      // reveal next chunk
    renderList();
  }

  async function reloadCurrent(){ await load(currentPrefix); }

  // Upload (always into incoming/)
  function wireUpload(){
    const form = qs("#up"), fileInput = form.querySelector('input[name="file"]');
    form.addEventListener("change", e=>{ if(e.target.name==="file") qs("#fileName").textContent = fileInput.files[0]?.name || "No file chosen"; });

    form.addEventListener("submit", e=>{
      e.preventDefault();
      if(!fileInput.files[0]) return setStatus("Please choose a file.");

      const uploader = qs("#uploader").value.trim();
      const desc = qs("#desc").value.trim();
      const file = fileInput.files[0];
      const name = "incoming/" + file.name.replace(/^\/+/, "");
      const renamed = new File([file], name, { type: file.type });

      const prog=qs("#progress"), bar=qs("#bar"); prog.style.display="block"; bar.style.width="0%"; setStatus("Uploading…");
      const xhr=new XMLHttpRequest(); xhr.open("POST", `${API}/upload`, true);
      xhr.upload.onprogress = ev => { if(ev.lengthComputable) bar.style.width = Math.round((ev.loaded/ev.total)*100)+"%"; };

      const fd = new FormData(); fd.append("file", renamed); fd.append("description", desc); fd.append("uploader", uploader);
      xhr.onload = async ()=>{
        try{
          const ok = xhr.status >= 200 && xhr.status < 300;
          const data = JSON.parse(xhr.responseText || "{}");
          if (!ok || !data.ok) throw new Error(data.error || `HTTP ${xhr.status}`);
          setStatus(`Uploaded → ${data.key}`);
          form.reset(); qs("#fileName").textContent = "No file chosen"; prog.style.display = "none";
          await reloadCurrent();
        }catch(e){ setStatus(`Upload error: ${e.message}`); prog.style.display="none"; }
      };
      xhr.onerror = ()=>{ setStatus("Network error during upload."); prog.style.display="none"; };
      xhr.send(fd);
    });
  }

  // Init
  (async function(){
    await load("");
    document.getElementById("sortLatest").addEventListener("click", ()=>{
      sortMode="latest";
      qs("#sortLatest").classList.add("btn-active");
      qs("#sortRandom").classList.remove("btn-active");
      recomputeOrder();
      displayCount = Math.min(displayCount, ordered.length);
      renderList();
    });
    document.getElementById("sortRandom").addEventListener("click", ()=>{
      sortMode="random";
      qs("#sortRandom").classList.add("btn-active");
      qs("#sortLatest").classList.remove("btn-active");
      recomputeOrder();
      displayCount = Math.min(displayCount, ordered.length);
      renderList();
    });
    document.getElementById("more").addEventListener("click", loadMoreOrExpand);
    wireUpload();
  })();
})();
</script>
