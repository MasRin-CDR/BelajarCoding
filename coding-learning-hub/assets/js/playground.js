(function () {
  const data = window.CodingHubData;
  const progress = window.CodingHubProgress;

  if (!data || !progress || document.body.dataset.page !== "playground") {
    return;
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderPlaygroundPage();
  });

  function renderPlaygroundPage() {
    renderWebPlayground();
    renderNativePlayground();
  }

  function renderWebPlayground() {
    const target = document.getElementById("webPlayground");
    const templates = data.playgroundTemplates.web;
    const state = progress.getState();

    if (!target) {
      return;
    }

    target.innerHTML = `
      <h2>HTML / CSS / JavaScript Playground</h2>
      <p>Editor ini cocok untuk eksperimen cepat. Kamu bisa mengubah struktur HTML, style, dan interaksi JavaScript lalu langsung melihat hasilnya.</p>
      <div class="playground-layout">
        <div class="playground-toolbar">
          <button class="button button-primary" type="button" id="runPlayground">Run</button>
          <button class="button button-secondary" type="button" id="loadWebExample">Load Contoh</button>
          <button class="button button-ghost" type="button" id="resetPlayground">Reset</button>
        </div>
        <div class="editor-grid">
          <label class="editor-card">
            <span>HTML</span>
            <textarea id="htmlEditor">${escapeTextarea(state.playgroundDrafts.webHtml || templates.html)}</textarea>
          </label>
          <label class="editor-card">
            <span>CSS</span>
            <textarea id="cssEditor">${escapeTextarea(state.playgroundDrafts.webCss || templates.css)}</textarea>
          </label>
          <label class="editor-card">
            <span>JavaScript</span>
            <textarea id="jsEditor">${escapeTextarea(state.playgroundDrafts.webJs || templates.js)}</textarea>
          </label>
        </div>
        <iframe class="preview-frame" id="playgroundPreview" title="Preview playground"></iframe>
      </div>
    `;

    const htmlEditor = document.getElementById("htmlEditor");
    const cssEditor = document.getElementById("cssEditor");
    const jsEditor = document.getElementById("jsEditor");
    const preview = document.getElementById("playgroundPreview");

    const runPreview = () => {
      const html = htmlEditor.value;
      const css = cssEditor.value;
      const js = jsEditor.value.replace(/<\/script>/gi, "<\\/script>");
      const srcdoc = `
        <!doctype html>
        <html lang="id">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>
              try {
                ${js}
              } catch (error) {
                document.body.insertAdjacentHTML('beforeend', '<pre style="padding:1rem;color:#b91c1c;background:#fee2e2;border-radius:12px;">' + error.message + '</pre>');
              }
            <\/script>
          </body>
        </html>
      `;

      preview.srcdoc = srcdoc;
      progress.savePlaygroundDraft("webHtml", html);
      progress.savePlaygroundDraft("webCss", css);
      progress.savePlaygroundDraft("webJs", jsEditor.value);
    };

    document.getElementById("runPlayground").addEventListener("click", runPreview);
    document.getElementById("loadWebExample").addEventListener("click", () => {
      htmlEditor.value = templates.html;
      cssEditor.value = templates.css;
      jsEditor.value = templates.js;
      runPreview();
    });
    document.getElementById("resetPlayground").addEventListener("click", () => {
      htmlEditor.value = "";
      cssEditor.value = "";
      jsEditor.value = "";
      preview.srcdoc = "";
      progress.clearPlaygroundDraft("webHtml");
      progress.clearPlaygroundDraft("webCss");
      progress.clearPlaygroundDraft("webJs");
    });

    [htmlEditor, cssEditor, jsEditor].forEach((editor, index) => {
      const key = index === 0 ? "webHtml" : index === 1 ? "webCss" : "webJs";
      editor.addEventListener("input", () => progress.savePlaygroundDraft(key, editor.value));
    });

    runPreview();
  }

  function renderNativePlayground() {
    const target = document.getElementById("nativePlayground");
    const state = progress.getState();
    const pythonTemplate = data.playgroundTemplates.python;
    const cppTemplate = data.playgroundTemplates.cpp;

    if (!target) {
      return;
    }

    target.innerHTML = `
      <h2>Python & C++ Simulation Editor</h2>
      <p>Karena eksekusi Python dan C++ tidak dilakukan langsung di browser pada versi ini, editor berikut berfungsi sebagai tempat latihan syntax, draft code, dan simulasi output.</p>
      <div class="playground-layout">
        <div class="playground-toolbar">
          <label class="field">
            <span>Pilih bahasa</span>
            <select id="nativeLanguage">
              <option value="python">Python</option>
              <option value="cpp">C++</option>
            </select>
          </label>
          <button class="button button-primary" type="button" id="simulateNativeRun">Simulasi Output</button>
          <button class="button button-secondary" type="button" id="loadNativeExample">Load Contoh</button>
          <button class="button button-ghost" type="button" id="resetNativeEditor">Reset</button>
        </div>
        <div class="native-editor-grid">
          <label class="editor-card">
            <span>Kode</span>
            <textarea id="nativeEditor">${escapeTextarea(state.playgroundDrafts.python || pythonTemplate.code)}</textarea>
          </label>
          <div class="section-stack">
            <article class="panel">
              <h3>Output Simulasi</h3>
              <div class="output-block"><pre id="nativeOutput">${escapeTextarea(pythonTemplate.output)}</pre></div>
            </article>
            <article class="panel">
              <h3>Catatan Belajar</h3>
              <p id="nativeExplanation">${escapeTextarea(pythonTemplate.explanation)}</p>
            </article>
          </div>
        </div>
      </div>
    `;

    const selector = document.getElementById("nativeLanguage");
    const editor = document.getElementById("nativeEditor");
    const output = document.getElementById("nativeOutput");
    const explanation = document.getElementById("nativeExplanation");

    const getTemplate = (language) => (language === "cpp" ? cppTemplate : pythonTemplate);

    const syncTemplate = (language) => {
      const draft = progress.getState().playgroundDrafts[language];
      const template = getTemplate(language);
      editor.value = draft || template.code;
      output.textContent = template.output;
      explanation.textContent = template.explanation;
    };

    selector.addEventListener("change", () => {
      syncTemplate(selector.value);
    });

    editor.addEventListener("input", () => {
      progress.savePlaygroundDraft(selector.value, editor.value);
    });

    document.getElementById("loadNativeExample").addEventListener("click", () => {
      const template = getTemplate(selector.value);
      editor.value = template.code;
      output.textContent = template.output;
      explanation.textContent = template.explanation;
      progress.savePlaygroundDraft(selector.value, editor.value);
    });

    document.getElementById("resetNativeEditor").addEventListener("click", () => {
      editor.value = "";
      output.textContent = "Belum ada simulasi.";
      explanation.textContent = "Tulis atau tempel kode, lalu klik Simulasi Output untuk melihat catatan struktur.";
      progress.clearPlaygroundDraft(selector.value);
    });

    document.getElementById("simulateNativeRun").addEventListener("click", () => {
      const language = selector.value;
      const source = editor.value.trim();

      if (!source) {
        output.textContent = "Editor kosong. Tambahkan kode terlebih dulu.";
        explanation.textContent = "Mulai dari template contoh agar lebih cepat memahami pola sintaks.";
        return;
      }

      const lines = source.split(/\r?\n/).length;
      const hasLoop = /\bfor\b|\bwhile\b/.test(source);
      const hasFunction = /\bdef\b|\bint\s+\w+\s*\(|\bvoid\s+\w+\s*\(/.test(source);
      const hasClass = /\bclass\b/.test(source);

      output.textContent = [
        `Mode simulasi: ${language.toUpperCase()}`,
        `Jumlah baris: ${lines}`,
        hasLoop ? "Terdeteksi loop atau iterasi." : "Belum ada loop terdeteksi.",
        hasFunction ? "Terdeteksi function atau method." : "Belum ada function terdeteksi.",
        hasClass ? "Terdeteksi class." : "Belum ada class terdeteksi."
      ].join("\n");

      explanation.textContent =
        language === "python"
          ? "Untuk menjalankan Python sungguhan, gunakan terminal dengan `python nama_file.py`. Fokus editor ini adalah mengecek struktur dasar seperti function, loop, dan class."
          : "Untuk menjalankan C++ sungguhan, compile dengan `g++ nama_file.cpp -o app && ./app` atau padanan di Windows. Editor ini membantu mengecek struktur logika sebelum compile.";
    });

    syncTemplate("python");
  }

  function escapeTextarea(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
})();
