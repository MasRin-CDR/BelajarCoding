(function () {
  const data = window.CodingHubData;
  const progress = window.CodingHubProgress;
  const app = window.CodingHubApp;

  if (!data || !progress || !app || document.body.dataset.page !== "quiz") {
    return;
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderQuizPage();
  });

  function renderQuizPage() {
    const selector = document.getElementById("quizSelector");
    const container = document.getElementById("quizContainer");
    const results = document.getElementById("quizResults");
    const params = new URLSearchParams(window.location.search);
    const initialModule = data.moduleLookup[params.get("module")] ? params.get("module") : data.modules[0].id;

    if (!selector || !container || !results) {
      return;
    }

    selector.innerHTML = `
      <h2>Pilih Quiz</h2>
      <div class="pill-group" id="quizModuleButtons"></div>
    `;

    const buttonGroup = document.getElementById("quizModuleButtons");
    let activeModule = initialModule;

    const renderButtons = () => {
      buttonGroup.innerHTML = data.modules
        .map((module) => {
          const isActive = activeModule === module.id ? "is-active" : "";
          const score = progress.getState().quizScores[module.id];
          const label = score ? `${module.title} (${Math.round((score.score / score.total) * 100)}%)` : module.title;
          return `
            <button class="pill-button ${isActive}" type="button" data-module-switch="${app.escapeHtml(module.id)}">
              ${app.escapeHtml(label)}
            </button>
          `;
        })
        .join("");

      buttonGroup.querySelectorAll("[data-module-switch]").forEach((button) => {
        button.addEventListener("click", () => {
          activeModule = button.dataset.moduleSwitch;
          window.history.replaceState({}, "", `?module=${activeModule}`);
          renderButtons();
          renderQuizForm(activeModule, container, results);
        });
      });
    };

    renderButtons();
    renderQuizForm(activeModule, container, results);
  }

  function renderQuizForm(moduleId, container, results) {
    const module = data.moduleLookup[moduleId];
    if (!module) {
      return;
    }

    results.innerHTML = "";

    container.innerHTML = `
      <h2>${app.escapeHtml(module.title)} Quiz</h2>
      <p>${app.escapeHtml(module.tagline)}</p>
      <form id="quizForm" novalidate>
        <div class="quiz-grid">
          ${module.quiz
            .map(
              (item, index) => `
                <article class="quiz-card" data-question-card="${index}">
                  <h3>${index + 1}. ${app.escapeHtml(item.question)}</h3>
                  <div class="section-stack">
                    ${item.options
                      .map(
                        (option, optionIndex) => `
                          <label class="quiz-option">
                            <input type="radio" name="question-${index}" value="${optionIndex}">
                            <span>${app.escapeHtml(option)}</span>
                          </label>
                        `
                      )
                      .join("")}
                  </div>
                  <div class="quiz-feedback" data-feedback="${index}" hidden></div>
                </article>
              `
            )
            .join("")}
        </div>
        <div class="quiz-toolbar">
          <button class="button button-primary" type="submit">Hitung Skor</button>
          <button class="button button-ghost" type="button" id="resetQuizButton">Reset Jawaban</button>
          <a class="button button-secondary" href="${app.getModuleLink(moduleId)}">Kembali ke Modul</a>
        </div>
      </form>
    `;

    const form = document.getElementById("quizForm");
    const resetButton = document.getElementById("resetQuizButton");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const answers = new FormData(form);
      let score = 0;

      module.quiz.forEach((item, index) => {
        const selectedValue = answers.get(`question-${index}`);
        const selectedIndex = selectedValue === null ? -1 : Number(selectedValue);
        const card = container.querySelector(`[data-question-card="${index}"]`);
        const feedback = container.querySelector(`[data-feedback="${index}"]`);

        card.querySelectorAll(".quiz-option").forEach((optionNode, optionIndex) => {
          optionNode.classList.remove("correct", "incorrect");

          if (optionIndex === item.answerIndex) {
            optionNode.classList.add("correct");
          }

          if (selectedIndex === optionIndex && selectedIndex !== item.answerIndex) {
            optionNode.classList.add("incorrect");
          }
        });

        const isCorrect = selectedIndex === item.answerIndex;
        if (isCorrect) {
          score += 1;
        }

        feedback.hidden = false;
        feedback.innerHTML = `
          <strong>${isCorrect ? "Benar." : "Belum tepat."}</strong>
          ${app.escapeHtml(item.explanation)}
        `;
      });

      progress.saveQuizScore(moduleId, score, module.quiz.length);
      renderResults(moduleId, score, module.quiz.length, results);
    });

    resetButton.addEventListener("click", () => {
      form.reset();
      container.querySelectorAll(".quiz-option").forEach((node) => node.classList.remove("correct", "incorrect"));
      container.querySelectorAll("[data-feedback]").forEach((node) => {
        node.hidden = true;
        node.textContent = "";
      });
      results.innerHTML = "";
    });
  }

  function renderResults(moduleId, score, total, results) {
    const percentage = Math.round((score / total) * 100);
    const best = progress.getState().quizScores[moduleId];
    const module = data.moduleLookup[moduleId];
    const message =
      percentage >= 80
        ? "Fondasinya sudah kuat. Lanjutkan ke mini project dan practice project."
        : percentage >= 60
          ? "Pemahamanmu mulai terbentuk. Review lagi bagian yang salah lalu ulangi quiz."
          : "Masih ada konsep inti yang perlu diulang. Buka lagi modul dan coba latihan kecil dulu.";

    results.innerHTML = `
      <h2>Hasil Quiz</h2>
      <div class="panel">
        <div class="tag-row">
          <span class="status-pill">Skor Saat Ini</span>
          <span class="badge">${percentage}%</span>
          <span class="badge">Best: ${best ? Math.round((best.score / best.total) * 100) : percentage}%</span>
        </div>
        <h3>${score} dari ${total} jawaban benar pada quiz ${app.escapeHtml(module.title)}</h3>
        <p>${app.escapeHtml(message)}</p>
        <div class="progress-bar"><span style="width: ${percentage}%"></span></div>
      </div>
    `;
  }
})();
