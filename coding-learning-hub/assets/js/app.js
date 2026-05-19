(function () {
  const data = window.CodingHubData;
  const progress = window.CodingHubProgress;

  if (!data || !progress) {
    return;
  }

  const page = document.body.dataset.page || "home";

  document.addEventListener("DOMContentLoaded", () => {
    applySavedTheme();
    syncThemeToggle();
    setupMobileNavigation();
    markActiveNavigation();
    setCurrentYear();
    renderBreadcrumbs();
    renderPage(page);
  });

  function applySavedTheme() {
    const state = progress.getState();
    document.documentElement.dataset.theme = state.theme === "light" ? "light" : "dark";
  }

  function syncThemeToggle() {
    const toggle = document.querySelector(".theme-toggle");
    if (!toggle) {
      return;
    }

    updateThemeToggleLabel(toggle);
    toggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = progress.setTheme(nextTheme);
      updateThemeToggleLabel(toggle);
    });
  }

  function updateThemeToggleLabel(toggle) {
    const isLight = document.documentElement.dataset.theme === "light";
    toggle.textContent = isLight ? "Light" : "Dark";
  }

  function setupMobileNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".primary-nav");

    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  function markActiveNavigation() {
    const navKey = page === "module" ? "home" : page;
    document.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === navKey) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function setCurrentYear() {
    const year = String(new Date().getFullYear());
    document.querySelectorAll(".current-year").forEach((node) => {
      node.textContent = year;
    });
  }

  function renderBreadcrumbs() {
    const trail = document.getElementById("breadcrumbTrail");
    if (!trail) {
      return;
    }

    const crumbs = [{ label: "Home", href: getHomeLink() }];

    if (page === "module") {
      const module = data.moduleLookup[document.body.dataset.module];
      crumbs.push({ label: "Modul", href: getModuleLink(module.id) });
      crumbs.push({ label: module.title });
    } else if (page === "roadmap") {
      crumbs.push({ label: "Roadmap" });
    } else if (page === "reference") {
      crumbs.push({ label: "Reference" });
    } else if (page === "quiz") {
      crumbs.push({ label: "Quiz" });
    } else if (page === "playground") {
      crumbs.push({ label: "Playground" });
    }

    trail.innerHTML = crumbs
      .map((crumb) => {
        if (crumb.href) {
          return `<span><a href="${crumb.href}">${escapeHtml(crumb.label)}</a></span>`;
        }
        return `<span>${escapeHtml(crumb.label)}</span>`;
      })
      .join("");
  }

  function renderPage(currentPage) {
    if (currentPage === "home") {
      renderHomePage();
    }

    if (currentPage === "module") {
      renderModulePage(document.body.dataset.module);
    }

    if (currentPage === "roadmap") {
      renderRoadmapPage();
    }

    if (currentPage === "reference") {
      renderReferencePage();
    }

    if (currentPage === "quiz") {
      renderQuizHero();
    }

    if (currentPage === "playground") {
      renderPlaygroundHero();
    }
  }

  function renderHomePage() {
    renderHomeHero();
    renderFeatureGrid();
    renderModuleGrid(document.getElementById("moduleGrid"));
    renderProgressStats(document.getElementById("progressStats"));
    renderCatalog();
    renderPracticeGroups(document.getElementById("practiceGroups"));
    renderRoadmapPreview(document.getElementById("roadmapPreview"));
  }

  function renderHomeHero() {
    const heroContent = document.getElementById("heroContent");
    const heroPanel = document.getElementById("heroPanel");
    const summary = progress.getSummary();
    const moduleCount = data.modules.length;

    if (heroContent) {
      heroContent.innerHTML = `
        <span class="eyebrow">Belajar Coding Bertahap</span>
        <h1>Bangun skill coding dari dasar sampai siap naik level</h1>
        <p>Coding Learning Hub menyatukan materi, referensi cepat, quiz, roadmap, project practice, dan playground dalam satu alur belajar yang modern dan mudah dikembangkan.</p>
        <div class="meta-row">
          ${renderBadge("5 Bahasa")}
          ${renderBadge("Static Friendly")}
          ${renderBadge("Backend Optional")}
        </div>
        <div class="hero-actions">
          <a class="button button-primary" href="${getModuleLink("html")}">Mulai dari HTML</a>
          <a class="button button-secondary" href="${getPageLink("playground")}">Coba Playground</a>
        </div>
      `;
    }

    if (heroPanel) {
      heroPanel.innerHTML = `
        <div class="panel">
          <p class="eyebrow">Snapshot Progress</p>
          <div class="stat-value">${summary.overallPercentage}%</div>
          <p class="muted">Total progress belajar dari ${summary.totalTasks} checklist lintas modul.</p>
          <div class="progress-bar" aria-label="Overall progress">
            <span style="width: ${summary.overallPercentage}%"></span>
          </div>
        </div>
        <div class="mini-grid">
          <article class="stat-card">
            <span class="stat-icon">◎</span>
            <h3>${moduleCount}</h3>
            <p class="muted">Bahasa dan modul utama</p>
          </article>
          <article class="stat-card">
            <span class="stat-icon">✓</span>
            <h3>${summary.completedTasks}</h3>
            <p class="muted">Checklist selesai</p>
          </article>
          <article class="stat-card">
            <span class="stat-icon">Q</span>
            <h3>${summary.quizAverage}%</h3>
            <p class="muted">Rata-rata quiz</p>
          </article>
        </div>
      `;
    }
  }

  function renderFeatureGrid() {
    const target = document.getElementById("featureGrid");
    if (!target) {
      return;
    }

    const features = [
      {
        icon: "⌘",
        title: "Modul Nyata",
        description: "Setiap bahasa punya pengantar, konsep, syntax, contoh kode, latihan, quiz, dan mini project."
      },
      {
        icon: "⌗",
        title: "Reference Library",
        description: "Cari tag, property, built-in function, standard library, sampai syntax dasar C++ dalam satu halaman."
      },
      {
        icon: "↺",
        title: "Progress Tracking",
        description: "Checklist materi dan skor quiz tersimpan otomatis di localStorage tanpa bergantung pada backend."
      }
    ];

    target.innerHTML = features
      .map(
        (feature) => `
          <article class="card feature-card">
            <span class="feature-icon">${escapeHtml(feature.icon)}</span>
            <h3>${escapeHtml(feature.title)}</h3>
            <p>${escapeHtml(feature.description)}</p>
          </article>
        `
      )
      .join("");
  }

  function renderModuleGrid(target) {
    if (!target) {
      return;
    }

    target.innerHTML = data.modules
      .map((module) => {
        const moduleProgress = progress.getModuleProgress(module.id);
        return `
          <article class="module-card" data-language="${escapeHtml(module.id)}">
            <div class="module-card-header">
              <div>
                <span class="module-icon">${escapeHtml(module.icon)}</span>
                <h3>${escapeHtml(module.title)}</h3>
              </div>
              ${renderLevelBadge(module.level)}
            </div>
            <p>${escapeHtml(module.description)}</p>
            <div class="meta-row">
              ${renderBadge(module.estimatedTime)}
              ${renderBadge(`${module.concepts.length} konsep`)}
              ${renderBadge(`${module.quiz.length} quiz`)}
            </div>
            <div class="progress-bar" aria-label="Progress ${escapeHtml(module.title)}">
              <span style="width: ${moduleProgress.percentage}%"></span>
            </div>
            <div class="stat-row">
              <span class="muted">${moduleProgress.completed}/${moduleProgress.total} selesai</span>
              <strong>${moduleProgress.percentage}%</strong>
            </div>
            <div class="card-actions">
              <a class="button button-primary" href="${getModuleLink(module.id)}">Buka Modul</a>
              <a class="button button-ghost" href="${getPageLink("quiz", `module=${module.id}`)}">Quiz</a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderProgressStats(target) {
    if (!target) {
      return;
    }

    const summary = progress.getSummary();
    const stats = [
      {
        label: "Overall Progress",
        value: `${summary.overallPercentage}%`,
        description: "Persentase checklist materi yang sudah selesai.",
        progressValue: summary.overallPercentage
      },
      {
        label: "Tasks Completed",
        value: `${summary.completedTasks}/${summary.totalTasks}`,
        description: "Jumlah topik, latihan, dan mini project yang sudah ditandai selesai.",
        progressValue: summary.totalTasks ? Math.round((summary.completedTasks / summary.totalTasks) * 100) : 0
      },
      {
        label: "Modules Started",
        value: `${summary.modulesStarted}`,
        description: "Jumlah modul yang sudah mulai dipelajari.",
        progressValue: data.modules.length ? Math.round((summary.modulesStarted / data.modules.length) * 100) : 0
      },
      {
        label: "Quiz Average",
        value: `${summary.quizAverage}%`,
        description: "Rata-rata skor quiz dari modul yang sudah dicoba.",
        progressValue: summary.quizAverage
      }
    ];

    target.innerHTML = stats
      .map(
        (stat) => `
          <article class="stat-card">
            <span class="stat-icon">▣</span>
            <h3>${escapeHtml(stat.label)}</h3>
            <div class="stat-value">${escapeHtml(stat.value)}</div>
            <p>${escapeHtml(stat.description)}</p>
            <div class="progress-bar"><span style="width: ${stat.progressValue}%"></span></div>
          </article>
        `
      )
      .join("");
  }

  function renderCatalog() {
    const container = document.getElementById("catalogGrid");
    const searchInput = document.getElementById("catalogSearch");
    const languageFilter = document.getElementById("catalogLanguageFilter");
    const levelFilter = document.getElementById("catalogLevelFilter");

    if (!container || !searchInput || !languageFilter || !levelFilter) {
      return;
    }

    languageFilter.innerHTML += data.languageOrder
      .map((language) => {
        const module = data.moduleLookup[language];
        return `<option value="${escapeHtml(language)}">${escapeHtml(module.title)}</option>`;
      })
      .join("");

    const render = () => {
      const query = normalizeQuery(searchInput.value);
      const language = languageFilter.value;
      const level = levelFilter.value;

      const filtered = data.catalogItems.filter((item) => {
        const matchesQuery = !query
          ? true
          : `${item.title} ${item.description} ${item.type}`.toLowerCase().includes(query);
        const matchesLanguage = language === "all" ? true : item.language === language;
        const matchesLevel = level === "all" ? true : item.level === level;
        return matchesQuery && matchesLanguage && matchesLevel;
      });

      if (!filtered.length) {
        container.innerHTML = `<div class="empty-state">Tidak ada materi yang cocok. Coba kata kunci atau filter lain.</div>`;
        return;
      }

      container.innerHTML = filtered
        .map((item) => `
          <article class="catalog-card">
            <div class="tag-row">
              ${renderBadge(item.type)}
              ${renderLevelBadge(item.level)}
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <div class="card-actions">
              <a class="button button-secondary" href="${getModuleLink(item.destination)}">Buka Materi</a>
            </div>
          </article>
        `)
        .join("");
    };

    render();
    searchInput.addEventListener("input", render);
    languageFilter.addEventListener("change", render);
    levelFilter.addEventListener("change", render);
  }

  function renderPracticeGroups(target) {
    if (!target) {
      return;
    }

    target.innerHTML = data.languageOrder
      .map((language) => {
        const module = data.moduleLookup[language];
        const items = data.practiceProjects[language] || [];

        return `
          <section class="card">
            <div class="module-card-header">
              <div>
                <span class="eyebrow">${escapeHtml(module.title)}</span>
                <h3>${escapeHtml(module.title)} Practice</h3>
              </div>
              ${renderBadge(`${items.length} project`)}
            </div>
            <div class="section-stack">
              ${items
                .map(
                  (project) => `
                    <article class="project-card">
                      <div class="tag-row">
                        ${renderLevelBadge(project.level)}
                        ${renderBadge(project.focus)}
                      </div>
                      <h3>${escapeHtml(project.title)}</h3>
                      <p>${escapeHtml(project.outcome)}</p>
                    </article>
                  `
                )
                .join("")}
            </div>
          </section>
        `;
      })
      .join("");
  }

  function renderRoadmapPreview(target) {
    if (!target) {
      return;
    }

    target.innerHTML = data.roadmaps
      .map(
        (roadmap) => `
          <article class="roadmap-card">
            <div class="tag-row">
              ${renderLevelBadge(roadmap.level)}
            </div>
            <h3>${escapeHtml(roadmap.title)}</h3>
            <p>${escapeHtml(roadmap.summary)}</p>
            <ul class="bullet-list">
              ${roadmap.milestones.map((milestone) => `<li>${escapeHtml(milestone)}</li>`).join("")}
            </ul>
            <a class="button button-secondary" href="${getPageLink("roadmap")}">Lihat Roadmap</a>
          </article>
        `
      )
      .join("");
  }

  function renderModulePage(moduleId) {
    const module = data.moduleLookup[moduleId];
    if (!module) {
      return;
    }

    const moduleProgress = progress.getModuleProgress(moduleId);
    const quizScore = progress.getState().quizScores[moduleId];

    setDocumentTitle(`${module.title} Module`);

    const heroMeta = document.getElementById("moduleHeroMeta");
    const heroPanel = document.getElementById("moduleHeroPanel");
    const sidebar = document.getElementById("moduleSidebar");
    const overview = document.getElementById("moduleOverview");
    const concepts = document.getElementById("moduleConcepts");
    const exercises = document.getElementById("moduleExercises");
    const quizTeaser = document.getElementById("moduleQuizTeaser");
    const miniProject = document.getElementById("moduleMiniProject");
    const checklist = document.getElementById("moduleChecklist");

    if (heroMeta) {
      heroMeta.innerHTML = `
        <span class="eyebrow">Module ${escapeHtml(module.title)}</span>
        <h1>${escapeHtml(module.title)} Learning Track</h1>
        <p>${escapeHtml(module.tagline)} ${escapeHtml(module.description)}</p>
        <div class="meta-row">
          ${renderLevelBadge(module.level)}
          ${renderBadge(module.estimatedTime)}
          ${renderBadge(`${module.concepts.length} konsep`)}
        </div>
        <div class="hero-actions">
          <a class="button button-primary" href="${getPageLink("quiz", `module=${module.id}`)}">Kerjakan Quiz</a>
          <a class="button button-secondary" href="${getPageLink("reference")}">Buka Reference</a>
        </div>
      `;
    }

    if (heroPanel) {
      heroPanel.innerHTML = `
        <p class="eyebrow">Progress Modul</p>
        <div class="stat-value">${moduleProgress.percentage}%</div>
        <p class="muted">${moduleProgress.completed} dari ${moduleProgress.total} checklist selesai.</p>
        <div class="progress-bar"><span style="width: ${moduleProgress.percentage}%"></span></div>
        <div class="mini-grid">
          <article class="stat-card">
            <h3>${module.exercises.length}</h3>
            <p class="muted">Latihan</p>
          </article>
          <article class="stat-card">
            <h3>${module.quiz.length}</h3>
            <p class="muted">Quiz</p>
          </article>
          <article class="stat-card">
            <h3>${quizScore ? Math.round((quizScore.score / quizScore.total) * 100) : 0}%</h3>
            <p class="muted">Best score</p>
          </article>
        </div>
      `;
    }

    if (sidebar) {
      sidebar.innerHTML = `
        <h3>Navigasi Materi</h3>
        <div class="sidebar-links">
          <a href="#moduleOverview">Overview</a>
          <a href="#moduleConcepts">Konsep</a>
          <a href="#moduleExercises">Latihan</a>
          <a href="#moduleQuizTeaser">Quiz</a>
          <a href="#moduleMiniProject">Mini Project</a>
          <a href="#moduleChecklist">Checklist</a>
        </div>
        <div class="sidebar-panel">
          <h3>Modul Lain</h3>
          <div class="sidebar-links">
            ${data.modules
              .filter((item) => item.id !== module.id)
              .map((item) => `<a href="${getModuleLink(item.id)}">${escapeHtml(item.title)}</a>`)
              .join("")}
          </div>
        </div>
      `;
    }

    if (overview) {
      overview.innerHTML = `
        <h2>Overview</h2>
        <p>${escapeHtml(module.intro.overview)}</p>
        <div class="info-grid">
          <article class="panel">
            <h3>Kenapa Penting</h3>
            <p>${escapeHtml(module.intro.whyItMatters)}</p>
          </article>
          <article class="panel">
            <h3>Target Belajar</h3>
            <ul class="bullet-list">${module.intro.goals.map((goal) => `<li>${escapeHtml(goal)}</li>`).join("")}</ul>
          </article>
          <article class="panel">
            <h3>Hasil Akhir</h3>
            <p>Setelah modul ini, kamu siap lanjut ke practice project dan quiz untuk mengukur pemahaman secara mandiri.</p>
          </article>
        </div>
      `;
    }

    if (concepts) {
      concepts.innerHTML = `
        <h2>Konsep Inti</h2>
        <p>Pelajari setiap konsep secara berurutan, lalu coba ulangi contoh kodenya di playground atau editor pilihanmu.</p>
        <div class="concept-grid">
          ${module.concepts
            .map(
              (concept) => `
                <article class="concept-card" id="${escapeHtml(concept.id)}">
                  <div class="concept-card-header">
                    <div>
                      <h3>${escapeHtml(concept.title)}</h3>
                      <p>${escapeHtml(concept.summary)}</p>
                    </div>
                    ${renderLevelBadge(concept.level)}
                  </div>
                  <div class="code-block"><pre><code>${escapeHtml(concept.syntax)}</code></pre></div>
                  <div class="code-block"><pre><code>${escapeHtml(concept.code)}</code></pre></div>
                  <ul class="bullet-list">${concept.explanation.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                  <div class="helper-note">
                    <strong>Catatan penting:</strong>
                    <ul class="bullet-list">${concept.notes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      `;
    }

    if (exercises) {
      exercises.innerHTML = `
        <h2>Latihan</h2>
        <p>Gunakan latihan ini untuk memindahkan teori ke implementasi kecil yang fokus dan terukur.</p>
        <div class="exercise-grid">
          ${module.exercises
            .map(
              (exercise) => `
                <article class="exercise-card">
                  <div class="tag-row">
                    ${renderLevelBadge(exercise.level)}
                  </div>
                  <h3>${escapeHtml(exercise.title)}</h3>
                  <p>${escapeHtml(exercise.instructions)}</p>
                  <div class="helper-note">
                    <strong>Deliverable:</strong> ${escapeHtml(exercise.deliverable)}
                  </div>
                  <p class="text-soft"><strong>Hint:</strong> ${escapeHtml(exercise.hint)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      `;
    }

    if (quizTeaser) {
      quizTeaser.innerHTML = `
        <h2>Quiz</h2>
        <p>Uji pemahamanmu dengan ${module.quiz.length} soal pilihan ganda lengkap dengan feedback dan penjelasan.</p>
        <div class="panel">
          <div class="tag-row">
            ${renderBadge(`${module.quiz.length} pertanyaan`)}
            ${renderBadge(`Best score: ${quizScore ? Math.round((quizScore.score / quizScore.total) * 100) : 0}%`)}
          </div>
          <ul class="bullet-list">
            ${module.quiz.slice(0, 3).map((item) => `<li>${escapeHtml(item.question)}</li>`).join("")}
          </ul>
          <a class="button button-primary" href="${getPageLink("quiz", `module=${module.id}`)}">Mulai Quiz ${escapeHtml(module.title)}</a>
        </div>
      `;
    }

    if (miniProject) {
      miniProject.innerHTML = `
        <h2>Mini Project</h2>
        <div class="section-stack">
          <div class="panel">
            <div class="tag-row">
              ${renderBadge("Portfolio-ready")}
              ${renderLevelBadge(module.level)}
            </div>
            <h3>${escapeHtml(module.miniProject.title)}</h3>
            <p>${escapeHtml(module.miniProject.summary)}</p>
          </div>
          <div class="info-grid">
            <article class="panel">
              <h3>Deliverables</h3>
              <ul class="bullet-list">${module.miniProject.deliverables.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </article>
            <article class="panel">
              <h3>Stretch Goals</h3>
              <ul class="bullet-list">${module.miniProject.stretchGoals.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </article>
            <article class="panel">
              <h3>Starter Tips</h3>
              <ul class="bullet-list">${module.miniProject.starterTips.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </article>
          </div>
        </div>
      `;
    }

    if (checklist) {
      checklist.innerHTML = `
        <h2>Checklist Progress</h2>
        <p>Tandai item yang sudah selesai. Progress tersimpan otomatis di browser.</p>
        <div class="progress-bar"><span style="width: ${moduleProgress.percentage}%"></span></div>
        <div class="checklist">
          ${module.checklist
            .map((item) => {
              const checked = progress.getState().completedItems[item.id] ? "checked" : "";
              return `
                <label class="checklist-item">
                  <input type="checkbox" data-progress-item="${escapeHtml(item.id)}" ${checked}>
                  <span>
                    <strong>${escapeHtml(item.label)}</strong>
                    <span class="text-soft">${escapeHtml(item.section)}</span>
                  </span>
                </label>
              `;
            })
            .join("")}
        </div>
      `;

      bindProgressCheckboxes();
    }
  }

  function bindProgressCheckboxes() {
    document.querySelectorAll("[data-progress-item]").forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        const input = event.currentTarget;
        progress.toggleCompletedItem(input.dataset.progressItem, input.checked);
        renderModulePage(document.body.dataset.module);
      });
    });
  }

  function renderRoadmapPage() {
    const hero = document.getElementById("roadmapHero");
    const heroPanel = document.getElementById("roadmapHeroPanel");
    const overview = document.getElementById("roadmapOverview");
    const grid = document.getElementById("roadmapGrid");

    if (hero) {
      hero.innerHTML = `
        <span class="eyebrow">Roadmap Belajar</span>
        <h1>Pilih jalur belajar yang selaras dengan tujuanmu</h1>
        <p>Gunakan roadmap ini sebagai panduan mingguan agar progres belajarmu lebih fokus, terukur, dan punya output yang jelas.</p>
      `;
    }

    if (heroPanel) {
      heroPanel.innerHTML = `
        <p class="eyebrow">Track Tersedia</p>
        <div class="stat-value">${data.roadmaps.length}</div>
        <p class="muted">Frontend, backend, full stack, Python, dan C++ basic programmer.</p>
        <div class="mini-grid">
          <article class="stat-card">
            <h3>Project-first</h3>
            <p class="muted">Belajar sambil membangun hasil nyata.</p>
          </article>
          <article class="stat-card">
            <h3>Milestone</h3>
            <p class="muted">Setiap fase punya output yang bisa diukur.</p>
          </article>
        </div>
      `;
    }

    if (overview) {
      overview.innerHTML = `
        <h2>Cara Menggunakan Roadmap</h2>
        <div class="info-grid">
          <article class="panel">
            <h3>1. Pilih track utama</h3>
            <p>Mulai dari satu jalur yang paling dekat dengan tujuanmu agar fokus tidak terpecah.</p>
          </article>
          <article class="panel">
            <h3>2. Tetapkan target mingguan</h3>
            <p>Satu fase tidak harus selesai dalam satu hari. Pecah menjadi target kecil dengan mini project dan quiz.</p>
          </article>
          <article class="panel">
            <h3>3. Review hasil</h3>
            <p>Gunakan progress checklist, catatan, dan project practice sebagai alat evaluasi rutin.</p>
          </article>
        </div>
      `;
    }

    if (grid) {
      grid.innerHTML = `
        <h2>Semua Roadmap</h2>
        <div class="timeline-grid">
          ${data.roadmaps
            .map(
              (roadmap) => `
                <article class="timeline-card">
                  <div class="tag-row">
                    ${renderLevelBadge(roadmap.level)}
                  </div>
                  <h3>${escapeHtml(roadmap.title)}</h3>
                  <p>${escapeHtml(roadmap.summary)}</p>
                  <div class="section-stack">
                    ${roadmap.phases
                      .map(
                        (phase) => `
                          <div class="panel">
                            <span class="timeline-phase">${escapeHtml(phase.phase)}</span>
                            <h4>${escapeHtml(phase.title)}</h4>
                            <ul class="bullet-list">${phase.details.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                          </div>
                        `
                      )
                      .join("")}
                  </div>
                  <div class="helper-note">
                    <strong>Milestone:</strong>
                    <ul class="bullet-list">${roadmap.milestones.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      `;
    }
  }

  function renderReferencePage() {
    const hero = document.getElementById("referenceHero");
    const heroPanel = document.getElementById("referenceHeroPanel");
    const filters = document.getElementById("referenceFilters");
    const groups = document.getElementById("referenceGroups");

    if (hero) {
      hero.innerHTML = `
        <span class="eyebrow">Reference Library</span>
        <h1>Lookup cepat untuk syntax dan common mistakes</h1>
        <p>Gunakan halaman ini untuk mencari tag, property, built-in function, standard library, dan syntax dasar saat sedang belajar atau debugging.</p>
      `;
    }

    if (heroPanel) {
      const totalItems = data.referenceCategories.reduce((total, category) => total + category.items.length, 0);
      heroPanel.innerHTML = `
        <p class="eyebrow">Reference Coverage</p>
        <div class="stat-value">${totalItems}</div>
        <p class="muted">Entry referensi lintas HTML, CSS, JavaScript, Python, dan C++.</p>
        <div class="mini-grid">
          <article class="stat-card">
            <h3>${data.referenceCategories.length}</h3>
            <p class="muted">Kelompok referensi</p>
          </article>
          <article class="stat-card">
            <h3>Searchable</h3>
            <p class="muted">Filter bahasa dan kata kunci.</p>
          </article>
        </div>
      `;
    }

    if (!filters || !groups) {
      return;
    }

    filters.innerHTML = `
      <h2>Filter Reference</h2>
      <div class="filter-panel">
        <label class="field">
          <span>Cari item</span>
          <input id="referenceSearch" type="search" maxlength="60" placeholder="Contoh: map, form, gap, pointer">
        </label>
        <label class="field">
          <span>Bahasa</span>
          <select id="referenceLanguage">
            <option value="all">Semua bahasa</option>
            ${data.languageOrder
              .map((language) => `<option value="${escapeHtml(language)}">${escapeHtml(data.moduleLookup[language].title)}</option>`)
              .join("")}
          </select>
        </label>
        <label class="field">
          <span>Kategori</span>
          <select id="referenceCategory">
            <option value="all">Semua kategori</option>
            ${data.referenceCategories
              .map((category) => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.title)}</option>`)
              .join("")}
          </select>
        </label>
      </div>
    `;

    const searchInput = document.getElementById("referenceSearch");
    const languageFilter = document.getElementById("referenceLanguage");
    const categoryFilter = document.getElementById("referenceCategory");

    const render = () => {
      const query = normalizeQuery(searchInput.value);
      const language = languageFilter.value;
      const categoryId = categoryFilter.value;

      const filteredGroups = data.referenceCategories
        .filter((category) => (language === "all" ? true : category.language === language))
        .filter((category) => (categoryId === "all" ? true : category.id === categoryId))
        .map((category) => ({
          ...category,
          items: category.items.filter((item) => {
            if (!query) {
              return true;
            }
            return `${item.name} ${item.description} ${item.notes} ${item.mistakes}`.toLowerCase().includes(query);
          })
        }))
        .filter((category) => category.items.length > 0);

      if (!filteredGroups.length) {
        groups.innerHTML = `<div class="empty-state">Reference tidak ditemukan. Coba ubah kata kunci atau filter.</div>`;
        return;
      }

      groups.innerHTML = filteredGroups
        .map(
          (category) => `
            <section class="section-stack">
              <div class="module-card-header">
                <div>
                  <span class="eyebrow">${escapeHtml(data.moduleLookup[category.language].title)}</span>
                  <h2>${escapeHtml(category.title)}</h2>
                </div>
                ${renderBadge(`${category.items.length} item`)}
              </div>
              <div class="reference-grid">
                ${category.items
                  .map(
                    (item) => `
                      <article class="reference-card">
                        <div class="reference-card-header">
                          <div>
                            <h3>${escapeHtml(item.name)}</h3>
                            <p>${escapeHtml(item.description)}</p>
                          </div>
                          ${renderBadge(data.moduleLookup[category.language].title)}
                        </div>
                        <div class="code-block"><pre><code>${escapeHtml(item.syntax)}</code></pre></div>
                        <div class="code-block"><pre><code>${escapeHtml(item.example)}</code></pre></div>
                        <p><strong>Catatan:</strong> ${escapeHtml(item.notes)}</p>
                        <p><strong>Kesalahan umum:</strong> ${escapeHtml(item.mistakes)}</p>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </section>
          `
        )
        .join("");
    };

    render();
    searchInput.addEventListener("input", render);
    languageFilter.addEventListener("change", render);
    categoryFilter.addEventListener("change", render);
  }

  function renderQuizHero() {
    const hero = document.getElementById("quizHero");
    const heroPanel = document.getElementById("quizHeroPanel");
    const summary = progress.getSummary();

    if (hero) {
      hero.innerHTML = `
        <span class="eyebrow">Quiz Interaktif</span>
        <h1>Ukur pemahamanmu dan dapatkan feedback instan</h1>
        <p>Pilih bahasa, jawab pertanyaan pilihan ganda, lalu pelajari penjelasan setiap jawaban agar konsep makin melekat.</p>
      `;
    }

    if (heroPanel) {
      heroPanel.innerHTML = `
        <p class="eyebrow">Quiz Snapshot</p>
        <div class="stat-value">${summary.quizAverage}%</div>
        <p class="muted">Rata-rata quiz dari ${summary.quizCount} modul yang sudah dikerjakan.</p>
        <div class="mini-grid">
          <article class="stat-card">
            <h3>${data.modules.length}</h3>
            <p class="muted">Quiz bahasa tersedia</p>
          </article>
          <article class="stat-card">
            <h3>Feedback</h3>
            <p class="muted">Penjelasan untuk setiap jawaban.</p>
          </article>
        </div>
      `;
    }
  }

  function renderPlaygroundHero() {
    const hero = document.getElementById("playgroundHero");
    const heroPanel = document.getElementById("playgroundHeroPanel");

    if (hero) {
      hero.innerHTML = `
        <span class="eyebrow">Code Playground</span>
        <h1>Coba ide langsung tanpa setup rumit</h1>
        <p>Latih HTML, CSS, dan JavaScript dengan preview live, lalu gunakan editor simulasi untuk Python dan C++ sebagai ruang eksplorasi syntax.</p>
      `;
    }

    if (heroPanel) {
      heroPanel.innerHTML = `
        <p class="eyebrow">Mode Playground</p>
        <div class="stat-value">2</div>
        <p class="muted">Web preview live dan simulasi editor native untuk Python/C++.</p>
        <div class="mini-grid">
          <article class="stat-card">
            <h3>Run</h3>
            <p class="muted">HTML/CSS/JS langsung di browser.</p>
          </article>
          <article class="stat-card">
            <h3>Drafts</h3>
            <p class="muted">Editor menyimpan draft ke localStorage.</p>
          </article>
        </div>
      `;
    }
  }

  function getHomeLink() {
    return page === "home" ? "index.html" : "../index.html";
  }

  function getModuleFilename(moduleId) {
    const map = {
      html: "html.html",
      css: "css.html",
      javascript: "javascript.html",
      python: "python.html",
      cpp: "cpp.html"
    };
    return map[moduleId];
  }

  function getModuleLink(moduleId) {
    const filename = getModuleFilename(moduleId);
    return page === "home" ? `pages/${filename}` : filename;
  }

  function getPageLink(targetPage, query) {
    const fileMap = {
      roadmap: "roadmap.html",
      reference: "reference.html",
      quiz: "quiz.html",
      playground: "playground.html"
    };

    const base = page === "home" ? `pages/${fileMap[targetPage]}` : fileMap[targetPage];
    return query ? `${base}?${query}` : base;
  }

  function renderBadge(text) {
    return `<span class="badge">${escapeHtml(text)}</span>`;
  }

  function renderLevelBadge(level) {
    const className = `badge badge-level-${String(level).toLowerCase().replace(/\s+/g, "-")}`;
    return `<span class="${className}">${escapeHtml(level)}</span>`;
  }

  function normalizeQuery(value) {
    return String(value || "")
      .replace(/[^\p{L}\p{N}\s\-+.#/]/gu, "")
      .trim()
      .toLowerCase()
      .slice(0, 60);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function setDocumentTitle(label) {
    if (!label) {
      return;
    }

    document.title = `${label} | Coding Learning Hub`;
  }

  window.CodingHubApp = {
    escapeHtml,
    getModuleLink,
    getPageLink
  };
})();
