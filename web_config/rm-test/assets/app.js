const DOCS = [
  {
    id: "home",
    title: "Documentation Hub",
    group: "Overview",
    path: "../docs/radio-music-docs-home.md",
  },
  {
    id: "quick-start",
    title: "Quick Start",
    group: "Overview",
    path: "../docs/radio-music-quick-start.md",
  },
  {
    id: "user-manual",
    title: "User Manual",
    group: "Overview",
    path: "../docs/radio-music-user-manual.md",
  },
  {
    id: "module-reference",
    title: "Module Reference",
    group: "Overview",
    path: "../docs/radio-music-module-reference.md",
  },
  {
    id: "panel-reference",
    title: "Panel Reference",
    group: "Overview",
    path: "../docs/radio-music-panel-reference.md",
  },
  {
    id: "test-script-core",
    title: "Test Script: Core",
    group: "Testing",
    path: "../docs/radio-music-test-script-core.md",
  },
  {
    id: "test-script-standard",
    title: "Test Script: Standard",
    group: "Testing",
    path: "../docs/radio-music-test-script-standard.md",
  },
  {
    id: "test-script-full",
    title: "Test Script: Full",
    group: "Testing",
    path: "../docs/radio-music-test-script-full.md",
  },
  {
    id: "tester-spec",
    title: "Tester Setup",
    group: "Testing",
    path: "../docs/radio-music-tester-spec.md",
  },
  {
    id: "tier-traceability",
    title: "Tier Traceability",
    group: "Testing",
    path: "../docs/radio-music-tier-traceability.md",
  },
  {
    id: "test-media-generation",
    title: "Test Media Plan",
    group: "Testing",
    path: "../docs/radio-music-test-media-generation.md",
  },
  {
    id: "test-media-download",
    title: "Download Test Media ZIP",
    group: "Testing",
    path: "../docs/radio-music-test-media-download.md",
  },
  {
    id: "analysis",
    title: "Firmware Analysis",
    group: "Technical",
    path: "../docs/radio-music-analysis.md",
  },
  {
    id: "github-templates",
    title: "GitHub Templates Guide",
    group: "Reporting",
    path: "../docs/radio-music-github-templates.md",
  },
  {
    id: "template-bug-report",
    title: "Template: Bug Report",
    group: "Reporting",
    path: "../docs/templates/radio-music-bug-report.md.txt",
    raw: true,
  },
  {
    id: "template-test-finding",
    title: "Template: Test Finding",
    group: "Reporting",
    path: "../docs/templates/radio-music-test-finding.md.txt",
    raw: true,
  },
];

const docMap = Object.fromEntries(DOCS.map((d) => [d.id, d]));

const navEl = document.getElementById("doc-nav");
const contentEl = document.getElementById("doc-content");
const rawLinkEl = document.getElementById("raw-link");

function buildNav() {
  const grouped = {};
  for (const doc of DOCS) {
    if (!grouped[doc.group]) grouped[doc.group] = [];
    grouped[doc.group].push(doc);
  }

  navEl.innerHTML = "";

  for (const [groupName, docs] of Object.entries(grouped)) {
    const group = document.createElement("section");
    group.className = "nav-group";

    const title = document.createElement("div");
    title.className = "nav-group-title";
    title.textContent = groupName;
    group.appendChild(title);

    for (const doc of docs) {
      const link = document.createElement("a");
      link.className = "doc-link";
      link.href = `#${doc.id}`;
      link.dataset.docId = doc.id;
      link.textContent = doc.title;
      group.appendChild(link);
    }

    navEl.appendChild(group);
  }
}

function setActiveNav(docId) {
  document.querySelectorAll(".doc-link").forEach((el) => {
    el.classList.toggle("active", el.dataset.docId === docId);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderLink(url, label) {
  const safeUrl = escapeHtml(url);
  const safeLabel = escapeHtml(label);
  const external = /^https?:\/\//i.test(url);
  const target = external ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a href="${safeUrl}"${target}>${safeLabel}</a>`;
}

function parseInline(rawText) {
  const parts = rawText.split(/(`[^`]*`)/g);

  return parts
    .map((part) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return `<code>${escapeHtml(part.slice(1, -1))}</code>`;
      }

      let s = escapeHtml(part);

      s = s.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (_, label, url) =>
        renderLink(url, label)
      );

      s = s.replace(
        /(^|[\s(])(https?:\/\/[^\s<)]+)(?=$|[\s),])/g,
        (_, prefix, url) => `${prefix}${renderLink(url, url)}`
      );

      s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");

      return s;
    })
    .join("");
}

function stripFrontMatter(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  if (lines.length > 2 && lines[0].trim() === "---") {
    for (let i = 1; i < lines.length; i += 1) {
      if (lines[i].trim() === "---") {
        return lines.slice(i + 1).join("\n");
      }
    }
  }
  return md;
}

function isTableSeparator(line) {
  return /^\s*\|?[\s:-]+\|[\s|:-]*$/.test(line || "");
}

function parseTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

function isSpecialLine(line, nextLine) {
  if (!line) return false;
  return (
    /^\s*```/.test(line) ||
    /^(#{1,6})\s+/.test(line) ||
    /^\s*[-*]\s+/.test(line) ||
    /^\s*\d+\.\s+/.test(line) ||
    /^>\s?/.test(line) ||
    (line.includes("|") && isTableSeparator(nextLine))
  );
}

function markdownToHtml(markdownText) {
  const md = stripFrontMatter(markdownText).replace(/\r\n/g, "\n");
  const lines = md.split("\n");

  let i = 0;
  let html = [];
  let listType = null;
  let inCode = false;
  let codeLang = "";
  let codeLines = [];

  function closeList() {
    if (listType === "ul") html.push("</ul>");
    if (listType === "ol") html.push("</ol>");
    listType = null;
  }

  while (i < lines.length) {
    const line = lines[i];
    const next = lines[i + 1] || "";

    if (inCode) {
      if (/^\s*```/.test(line)) {
        const langClass = codeLang ? ` class="language-${escapeHtml(codeLang)}"` : "";
        html.push(`<pre><code${langClass}>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        inCode = false;
        codeLang = "";
        codeLines = [];
      } else {
        codeLines.push(line);
      }
      i += 1;
      continue;
    }

    if (/^\s*```/.test(line)) {
      closeList();
      inCode = true;
      codeLang = line.replace(/^\s*```/, "").trim();
      codeLines = [];
      i += 1;
      continue;
    }

    if (!line.trim()) {
      closeList();
      i += 1;
      continue;
    }

    if (line.includes("|") && isTableSeparator(next)) {
      closeList();
      const head = parseTableRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim() && lines[i].includes("|")) {
        rows.push(parseTableRow(lines[i]));
        i += 1;
      }
      const thead = `<thead><tr>${head
        .map((c) => `<th>${parseInline(c)}</th>`)
        .join("")}</tr></thead>`;
      const tbody = rows.length
        ? `<tbody>${rows
            .map(
              (r) =>
                `<tr>${r.map((c) => `<td>${parseInline(c)}</td>`).join("")}</tr>`
            )
            .join("")}</tbody>`
        : "";
      html.push(`<table>${thead}${tbody}</table>`);
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${parseInline(headingMatch[2])}</h${level}>`);
      i += 1;
      continue;
    }

    const blockQuoteMatch = line.match(/^>\s?(.*)$/);
    if (blockQuoteMatch) {
      closeList();
      html.push(`<blockquote><p>${parseInline(blockQuoteMatch[1])}</p></blockquote>`);
      i += 1;
      continue;
    }

    const ulMatch = line.match(/^\s*[-*]\s+(.*)$/);
    if (ulMatch) {
      if (listType !== "ul") {
        closeList();
        html.push("<ul>");
        listType = "ul";
      }
      html.push(`<li>${parseInline(ulMatch[1])}</li>`);
      i += 1;
      continue;
    }

    const olMatch = line.match(/^\s*\d+\.\s+(.*)$/);
    if (olMatch) {
      if (listType !== "ol") {
        closeList();
        html.push("<ol>");
        listType = "ol";
      }
      html.push(`<li>${parseInline(olMatch[1])}</li>`);
      i += 1;
      continue;
    }

    closeList();
    const para = [line.trim()];
    i += 1;

    while (i < lines.length && lines[i].trim() && !isSpecialLine(lines[i], lines[i + 1] || "")) {
      para.push(lines[i].trim());
      i += 1;
    }

    html.push(`<p>${parseInline(para.join(" "))}</p>`);
  }

  closeList();

  if (inCode) {
    const langClass = codeLang ? ` class="language-${escapeHtml(codeLang)}"` : "";
    html.push(`<pre><code${langClass}>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
  }

  return html.join("\n");
}

function loadMarkdownViaIframe(path) {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = path;

    iframe.onload = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        const text = doc?.body?.innerText || doc?.body?.textContent || "";
        iframe.remove();

        if (!text.trim()) {
          reject(new Error("Empty response"));
          return;
        }

        resolve(text);
      } catch (err) {
        iframe.remove();
        reject(err);
      }
    };

    iframe.onerror = () => {
      iframe.remove();
      reject(new Error("Iframe markdown load failed"));
    };

    document.body.appendChild(iframe);
  });
}

async function loadMarkdown(path) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } catch (fetchErr) {
    return loadMarkdownViaIframe(path);
  }
}

function renderLoading(doc) {
  contentEl.innerHTML = `
    <div class="loading">
      <strong>Loading:</strong> ${escapeHtml(doc.title)}
    </div>
  `;
}

function renderError(doc, err) {
  const details = err?.message ? escapeHtml(err.message) : "Unknown markdown loading error.";
  contentEl.innerHTML = `
    <div class="error">
      <h2>Could not load markdown source</h2>
      <p><strong>Document:</strong> ${escapeHtml(doc.title)}</p>
      <p><strong>Error:</strong> ${details}</p>
      <p>If you opened this page directly via <code>file://</code> and your browser blocks local fetch/iframe reads, run a local static server from the repository root:</p>
      <pre><code>python3 -m http.server 8000</code></pre>
      <p>Then open <code>http://127.0.0.1:8000/site/index.html</code>.</p>
    </div>
  `;
}

async function openDoc(docId) {
  const doc = docMap[docId] || DOCS[0];
  setActiveNav(doc.id);

  rawLinkEl.href = doc.path;
  rawLinkEl.textContent = "Open Raw Markdown";

  renderLoading(doc);

  try {
    const markdown = await loadMarkdown(doc.path);
    if (doc.raw) {
      contentEl.innerHTML = `
        <h1>${escapeHtml(doc.title)}</h1>
        <p>Raw markdown source (copy/paste ready):</p>
        <pre class="raw-markdown"><code>${escapeHtml(markdown)}</code></pre>
      `;
    } else {
      const html = markdownToHtml(markdown);
      contentEl.innerHTML = html;
    }
  } catch (err) {
    renderError(doc, err);
  }
}

function getDocIdFromHash() {
  const hash = window.location.hash.replace(/^#/, "").trim();
  if (!hash || !docMap[hash]) {
    return DOCS[0].id;
  }
  return hash;
}

function route() {
  const docId = getDocIdFromHash();
  openDoc(docId);
}

buildNav();
window.addEventListener("hashchange", route);
route();
