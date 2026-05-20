(function () {
  const data = window.EngineeringLearningData;
  const storageKey = "engineering-learning-hub-state";

  if (!data) {
    return;
  }

  const state = readState();

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme();
    bindThemeToggle();
    renderTrackOptions();
    renderAll();
    bindFilters();
    bindModal();
    initPlayground();
  });

  function readState() {
    try {
      return {
        theme: "dark",
        completed: {},
        quizScores: {},
        playground: {},
        ...JSON.parse(localStorage.getItem(storageKey) || "{}")
      };
    } catch (_error) {
      return { theme: "dark", completed: {}, quizScores: {}, playground: {} };
    }
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function applyTheme() {
    document.documentElement.dataset.theme = state.theme === "light" ? "light" : "dark";
  }

  function bindThemeToggle() {
    const button = document.getElementById("themeToggle");
    button.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      saveState();
      applyTheme();
    });
  }

  function renderTrackOptions() {
    const select = document.getElementById("trackFilter");
    select.innerHTML = [
      "<option value=\"all\">Semua track</option>",
      ...data.tracks.map((track) => `<option value="${escapeHtml(track.id)}">${escapeHtml(track.title)}</option>`)
    ].join("");
  }

  function bindFilters() {
    ["searchInput", "trackFilter", "levelFilter"].forEach((id) => {
      document.getElementById(id).addEventListener("input", renderAll);
    });
  }

  function renderAll() {
    renderStats();
    renderRoadmaps();
    renderReferences();
    renderQuiz();
    renderProjects();
    renderChecklist("securityChecklist", data.securityChecklist);
    renderChecklist("productionChecklist", data.productionChecklist);
  }

  function getFilters() {
    return {
      query: sanitizeQuery(document.getElementById("searchInput").value),
      track: document.getElementById("trackFilter").value,
      level: document.getElementById("levelFilter").value
    };
  }

  function getVisibleTracks() {
    const filters = getFilters();
    return data.tracks.filter((track) => {
      const haystack = `${track.title} ${track.category} ${Object.values(track.levels).flat().join(" ")} ${track.miniProject}`.toLowerCase();
      const matchQuery = filters.query ? haystack.includes(filters.query) : true;
      const matchTrack = filters.track === "all" ? true : track.id === filters.track;
      const matchLevel = filters.level === "all" ? true : Boolean(track.levels[filters.level]);
      return matchQuery && matchTrack && matchLevel;
    });
  }

  function renderStats() {
    const allTasks = data.tracks.flatMap((track) => Object.values(track.levels).flat().map((topic) => `${track.id}:${topic}`));
    const done = allTasks.filter((task) => state.completed[task]).length;
    const quizCount = Object.keys(state.quizScores).length;
    const quizAvg = quizCount
      ? Math.round(Object.values(state.quizScores).reduce((total, item) => total + item.percent, 0) / quizCount)
      : 0;
    const stats = [
      ["Track", data.tracks.length, "Core, security, DevOps, embedded, mobile"],
      ["Materi", allTasks.length, "Checklist lintas level"],
      ["Progress", `${allTasks.length ? Math.round((done / allTasks.length) * 100) : 0}%`, `${done} materi selesai`],
      ["Quiz", `${quizAvg}%`, `${quizCount} quiz tersimpan`]
    ];

    document.getElementById("stats").innerHTML = stats.map(([label, value, description]) => `
      <article class="stat-card">
        <p class="eyebrow">${escapeHtml(label)}</p>
        <div class="stat-value">${escapeHtml(value)}</div>
        <p class="muted">${escapeHtml(description)}</p>
      </article>
    `).join("");
  }

  function renderRoadmaps() {
    const filters = getFilters();
    const tracks = getVisibleTracks();
    const grid = document.getElementById("roadmapGrid");

    if (!tracks.length) {
      grid.innerHTML = "<p class=\"muted\">Materi tidak ditemukan. Coba ubah filter atau kata kunci.</p>";
      return;
    }

    grid.innerHTML = tracks.map((track) => {
      const levels = Object.entries(track.levels)
        .filter(([level]) => filters.level === "all" || filters.level === level)
        .map(([level, topics]) => ({ level, topics }));
      const total = Object.values(track.levels).flat().length;
      const done = Object.values(track.levels).flat().filter((topic) => state.completed[`${track.id}:${topic}`]).length;
      const percent = total ? Math.round((done / total) * 100) : 0;

      return `
        <article class="roadmap-card">
          <div class="badge-row">
            <span class="badge">${escapeHtml(track.category)}</span>
            <span class="badge">${done}/${total} selesai</span>
          </div>
          <h3>${escapeHtml(track.title)}</h3>
          <p class="muted">${escapeHtml(track.miniProject)}</p>
          <div class="progress" aria-label="Progress ${escapeHtml(track.title)}"><span style="width:${percent}%"></span></div>
          ${levels.map(({ level, topics }) => `
            <div>
              <p class="eyebrow">${escapeHtml(level)}</p>
              <ul class="topic-list">
                ${topics.map((topic) => renderTopic(track.id, topic)).join("")}
              </ul>
            </div>
          `).join("")}
          <div class="button-row">
            <button class="button secondary" type="button" data-detail="${escapeHtml(track.id)}">Detail</button>
            <button class="button primary" type="button" data-quiz="${escapeHtml(track.quiz)}">Quiz</button>
          </div>
        </article>
      `;
    }).join("");

    grid.querySelectorAll("[data-topic]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        state.completed[checkbox.dataset.topic] = checkbox.checked;
        if (!checkbox.checked) {
          delete state.completed[checkbox.dataset.topic];
        }
        saveState();
        renderAll();
      });
    });

    grid.querySelectorAll("[data-detail]").forEach((button) => {
      button.addEventListener("click", () => openTrackModal(button.dataset.detail));
    });

    grid.querySelectorAll("[data-quiz]").forEach((button) => {
      button.addEventListener("click", () => {
        document.getElementById("quizTrack").value = button.dataset.quiz;
        renderQuiz();
        document.getElementById("quiz").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function renderTopic(trackId, topic) {
    const id = `${trackId}:${topic}`;
    const checked = state.completed[id] ? "checked" : "";
    return `
      <li>
        <input type="checkbox" data-topic="${escapeHtml(id)}" ${checked}>
        <span>${escapeHtml(topic)}</span>
      </li>
    `;
  }

  function renderReferences() {
    const filters = getFilters();
    const selectedTrack = filters.track === "all" ? "" : data.tracks.find((track) => track.id === filters.track)?.title || "";
    const references = data.references.filter((item) => {
      const haystack = `${item.track} ${item.name} ${item.syntax} ${item.description} ${item.bestPractice} ${item.commonMistake}`.toLowerCase();
      const matchQuery = filters.query ? haystack.includes(filters.query) : true;
      const matchTrack = selectedTrack ? item.track.toLowerCase().includes(selectedTrack.toLowerCase().split(" ")[0]) : true;
      return matchQuery && matchTrack;
    });

    document.getElementById("referenceList").innerHTML = references.map((item) => `
      <article class="reference-item">
        <div class="badge-row">
          <span class="badge">${escapeHtml(item.track)}</span>
          <span class="badge">Best practice</span>
        </div>
        <h3>${escapeHtml(item.name)}</h3>
        <p class="muted">${escapeHtml(item.description)}</p>
        <pre><code>${escapeHtml(item.syntax)}</code></pre>
        <p><strong>Best practice:</strong> ${escapeHtml(item.bestPractice)}</p>
        <p><strong>Kesalahan umum:</strong> ${escapeHtml(item.commonMistake)}</p>
      </article>
    `).join("") || "<p class=\"muted\">Reference tidak ditemukan.</p>";
  }

  function renderQuiz() {
    const container = document.getElementById("quizApp");
    const existing = document.getElementById("quizTrack")?.value || Object.keys(data.quizzes)[0];
    const selectedKey = data.quizzes[existing] ? existing : Object.keys(data.quizzes)[0];
    const quiz = data.quizzes[selectedKey];
    const lastScore = state.quizScores[selectedKey]?.percent;

    container.innerHTML = `
      <label>
        <span>Pilih quiz</span>
        <select id="quizTrack">
          ${Object.keys(data.quizzes).map((key) => `<option value="${escapeHtml(key)}" ${key === selectedKey ? "selected" : ""}>${escapeHtml(key)}</option>`).join("")}
        </select>
      </label>
      <article class="quiz-card">
        <h3>${escapeHtml(quiz.question)}</h3>
        <div class="quiz-options">
          ${quiz.options.map((option, index) => `
            <label>
              <input type="radio" name="quizOption" value="${index}">
              <span>${escapeHtml(option)}</span>
            </label>
          `).join("")}
        </div>
        <div class="button-row">
          <button class="button primary" id="submitQuiz" type="button">Cek jawaban</button>
          <span class="badge">Skor terakhir: ${lastScore ?? 0}%</span>
        </div>
        <div class="feedback" id="quizFeedback" hidden></div>
      </article>
    `;

    document.getElementById("quizTrack").addEventListener("change", renderQuiz);
    document.getElementById("submitQuiz").addEventListener("click", () => {
      const selected = Number(document.querySelector("input[name='quizOption']:checked")?.value ?? -1);
      const correct = selected === quiz.answer;
      state.quizScores[selectedKey] = { percent: correct ? 100 : 0, updatedAt: new Date().toISOString() };
      saveState();
      const feedback = document.getElementById("quizFeedback");
      feedback.hidden = false;
      feedback.innerHTML = `<strong>${correct ? "Benar." : "Belum tepat."}</strong> ${escapeHtml(quiz.explanation)}`;
      renderStats();
    });
  }

  function renderProjects() {
    document.getElementById("projectGrid").innerHTML = data.projects.map((project) => `
      <article class="project-card">
        <div class="badge-row">
          <span class="badge">${escapeHtml(project.stack)}</span>
          <span class="badge">Portfolio</span>
        </div>
        <h3>${escapeHtml(project.title)}</h3>
        <p class="muted">${escapeHtml(project.summary)}</p>
      </article>
    `).join("");
  }

  function renderChecklist(id, items) {
    document.getElementById(id).innerHTML = items.map((item) => `<li><span>✓</span><span>${escapeHtml(item)}</span></li>`).join("");
  }

  function bindModal() {
    const modal = document.getElementById("detailModal");
    document.getElementById("closeModal").addEventListener("click", () => modal.close());
  }

  function openTrackModal(trackId) {
    const track = data.tracks.find((item) => item.id === trackId);
    if (!track) {
      return;
    }

    document.getElementById("modalContent").innerHTML = `
      <p class="eyebrow">${escapeHtml(track.category)}</p>
      <h2>${escapeHtml(track.title)}</h2>
      <p class="muted">${escapeHtml(track.miniProject)}</p>
      ${Object.entries(track.levels).map(([level, topics]) => `
        <h3>${escapeHtml(level)}</h3>
        <ul class="topic-list">${topics.map((topic) => `<li><span>•</span><span>${escapeHtml(topic)}</span></li>`).join("")}</ul>
      `).join("")}
    `;
    document.getElementById("detailModal").showModal();
  }

  function initPlayground() {
    const template = data.playgroundTemplate;
    const htmlEditor = document.getElementById("htmlEditor");
    const cssEditor = document.getElementById("cssEditor");
    const jsEditor = document.getElementById("jsEditor");

    htmlEditor.value = state.playground.html || template.html;
    cssEditor.value = state.playground.css || template.css;
    jsEditor.value = state.playground.js || template.js;

    const run = () => {
      state.playground = { html: htmlEditor.value, css: cssEditor.value, js: jsEditor.value };
      saveState();
      const safeScript = jsEditor.value.replace(/<\/script>/gi, "<\\/script>");
      document.getElementById("previewFrame").srcdoc = `
        <!doctype html>
        <html lang="id">
          <head><meta charset="UTF-8"><style>${cssEditor.value}</style></head>
          <body>${htmlEditor.value}<script>try{${safeScript}}catch(error){document.body.insertAdjacentHTML('beforeend','<pre>'+error.message+'</pre>')}<\/script></body>
        </html>
      `;
    };

    document.getElementById("runCode").addEventListener("click", run);
    document.getElementById("resetCode").addEventListener("click", () => {
      htmlEditor.value = template.html;
      cssEditor.value = template.css;
      jsEditor.value = template.js;
      run();
    });
    [htmlEditor, cssEditor, jsEditor].forEach((editor) => editor.addEventListener("input", run));
    run();
  }

  function sanitizeQuery(value) {
    return String(value || "").replace(/[^\w\s+\-./#]/g, "").trim().toLowerCase().slice(0, 80);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
