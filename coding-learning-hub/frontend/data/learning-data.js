window.EngineeringLearningData = (() => {
  const coreTracks = [
    {
      id: "html",
      title: "HTML",
      category: "Core Web",
      levels: {
        Pemula: ["Struktur dokumen", "Tag & elemen", "Form & input", "Semantic HTML5", "Media & embed"],
        Menengah: ["Accessibility", "SEO dasar", "Meta tag", "Favicon", "Lazy loading", "data-* attribute"],
        Lanjut: ["Web APIs", "Canvas", "SVG", "Storage API", "Web Workers"]
      },
      quiz: "html",
      miniProject: "Landing page accessible dengan form, meta SEO, lazy image, dan structured content."
    },
    {
      id: "css",
      title: "CSS",
      category: "Core Web",
      levels: {
        Pemula: ["Selector & property", "Box model", "Display", "Position & z-index", "Margin/padding"],
        Menengah: ["Flexbox", "CSS Grid", "Responsive design", "Media query", "Animation & transition", "CSS Variables"],
        Lanjut: ["Pseudo class", "Pseudo element", "Specificity", "Optimization", "Accessibility", "Tailwind intro", "CSS architecture"]
      },
      quiz: "css",
      miniProject: "Responsive dashboard UI dengan grid, sidebar, cards, animation, dan design tokens."
    },
    {
      id: "javascript",
      title: "JavaScript",
      category: "Programming",
      levels: {
        Pemula: ["Variables & data types", "Functions", "Arrays & objects", "DOM manipulation", "Event handling"],
        Menengah: ["Event bubbling", "Event delegation", "Async & Promise", "Fetch API", "AJAX", "JSON", "ES6+", "Modules"],
        Lanjut: ["OOP", "Typed arrays", "Error handling", "State management concept", "REST API", "JWT auth", "Node.js", "npm", "React intro", "Vite/Webpack", "TypeScript intro", "Jest testing"]
      },
      quiz: "javascript",
      miniProject: "Todo app production-style dengan localStorage, validation, state module, dan test plan."
    },
    {
      id: "python",
      title: "Python",
      category: "Backend",
      levels: {
        Pemula: ["Syntax & variables", "Flow control", "Functions", "Data structures", "OOP"],
        Menengah: ["File handling", "Exception handling", "Virtual environment", "pip", "requirements.txt", "FastAPI/Flask intro", "ORM", "API auth", "Docker intro"],
        Lanjut: ["NumPy", "Pandas", "Requests", "Multiprocessing", "Type hints", "MySQL", "MongoDB", "DSA dasar", "Machine Learning intro"]
      },
      quiz: "python",
      miniProject: "REST API CRUD dengan auth, validation, SQLite/PostgreSQL, logging, dan Docker."
    },
    {
      id: "cpp",
      title: "C++",
      category: "Systems",
      levels: {
        Pemula: ["Basic syntax", "Flow control", "Functions", "Arrays & strings", "References"],
        Menengah: ["Pointers", "Stack vs Heap", "Memory management", "OOP", "STL", "Template"],
        Lanjut: ["File handling", "Debugging", "Exception handling", "Multithreading", "Socket/network basic", "Modern C++17/20"]
      },
      quiz: "cpp",
      miniProject: "Telemetry packet parser C++ dengan checksum, timeout handling, dan unit test plan."
    }
  ];

  const extraTracks = [
    {
      id: "fullstack",
      title: "Full Stack Development",
      category: "Architecture",
      levels: {
        Pemula: ["Frontend foundation", "Backend foundation", "HTTP request-response"],
        Menengah: ["API design", "Database", "Authentication", "CRUD app"],
        Lanjut: ["Docker", "Deployment", "Observability", "Scalable folder structure"]
      },
      quiz: "fullstack",
      miniProject: "CRUD learning platform dengan role user/admin dan protected API."
    },
    {
      id: "security",
      title: "Security Engineering",
      category: "Security",
      levels: {
        Pemula: ["HTTP/HTTPS", "Authentication", "Session vs JWT"],
        Menengah: ["OWASP Top 10", "XSS", "SQL Injection", "CSRF", "CORS"],
        Lanjut: ["API Security", "Rate limiting", "Secure logging", "CSP header", "Secure deployment", "Dependency audit", "RBAC"]
      },
      quiz: "security",
      miniProject: "Secure REST API dengan validation, auth, RBAC, rate limit, dan security headers."
    },
    {
      id: "devops",
      title: "DevOps",
      category: "Operations",
      levels: {
        Pemula: ["Linux dasar", "Bash dasar", "Git & GitHub"],
        Menengah: ["Docker", "Docker Compose", "Nginx", "VPS"],
        Lanjut: ["Cloudflare", "SSL", "CI/CD intro", "Backup strategy", "Release checklist"]
      },
      quiz: "devops",
      miniProject: "Deploy frontend + backend memakai Docker Compose dan Nginx reverse proxy."
    },
    {
      id: "embedded-ecu",
      title: "Embedded & ECU Communication",
      category: "IoT",
      levels: {
        Pemula: ["ESP32 dasar", "UART", "I2C", "SPI", "Bluetooth serial"],
        Menengah: ["CAN Bus", "K-Line", "ECU communication concept", "Packet parsing", "Checksum validation"],
        Lanjut: ["Android communication", "Realtime telemetry", "Retry & timeout handling", "Dashboard realtime", "Bluetooth telemetry"]
      },
      quiz: "embedded",
      miniProject: "ESP32 telemetry dashboard dengan packet parser, checksum, retry, timeout, dan WebSocket bridge."
    },
    {
      id: "mobile",
      title: "Mobile Development",
      category: "Mobile",
      levels: {
        Pemula: ["Kotlin dasar", "Android Studio", "Jetpack Compose"],
        Menengah: ["USB Serial Android", "Bluetooth communication", "REST API integration", "Local storage"],
        Lanjut: ["APK build process", "React Native intro", "Background telemetry", "Offline-first sync"]
      },
      quiz: "mobile",
      miniProject: "Android telemetry client untuk membaca USB OTG/Bluetooth dan sinkronisasi REST API."
    }
  ];

  const references = [
    ["HTML", "<form>", "<form method=\"post\">...</form>", "Mengirim input pengguna.", "Selalu pakai label, validasi, dan method yang tepat.", "Mengandalkan placeholder sebagai label."],
    ["HTML", "data-*", "<button data-id=\"42\">", "Menyimpan metadata non-visual di elemen.", "Gunakan dataset untuk state kecil di DOM.", "Menyimpan data sensitif di atribut HTML."],
    ["CSS", "display: grid", "display: grid; grid-template-columns: repeat(3, 1fr);", "Membuat layout dua dimensi.", "Gunakan minmax untuk konten responsif.", "Mengunci semua kolom dengan pixel tetap."],
    ["CSS", "var()", "color: var(--primary);", "Menggunakan CSS custom property.", "Simpan token warna, spacing, radius di :root.", "Nama token terlalu generik dan tidak bermakna."],
    ["JavaScript", "fetch()", "const r = await fetch('/api/modules');", "Melakukan HTTP request.", "Cek response.ok dan tangani error.", "Menganggap status 404 otomatis masuk catch."],
    ["JavaScript", "addEventListener()", "node.addEventListener('click', handler);", "Mendaftarkan handler event.", "Gunakan event delegation untuk list dinamis.", "Mendaftarkan listener berulang tanpa cleanup."],
    ["Python", "len()", "len(items)", "Menghitung jumlah item.", "Cocok untuk validasi panjang input.", "Memakai len pada integer."],
    ["Python", "pathlib", "Path('data.json').read_text()", "API modern untuk file path.", "Lebih aman daripada concat string path manual.", "Tidak menangani file yang tidak ada."],
    ["C++", "std::vector", "std::vector<int> values;", "Array dinamis dari STL.", "Gunakan size() dan range-based loop.", "Mengakses index tanpa validasi."],
    ["C++", "std::map", "std::map<std::string, int> scores;", "Container key-value terurut.", "Gunakan find jika tidak ingin insert otomatis.", "Menggunakan [] dan tidak sadar membuat key baru."],
    ["Security", "CSP", "Content-Security-Policy: default-src 'self'", "Membatasi sumber script/style/resource.", "Mulai strict lalu whitelist kebutuhan nyata.", "Membuka script-src * tanpa alasan."],
    ["ECU", "Checksum", "sum(bytes) & 0xFF", "Validasi integritas packet telemetry.", "Tolak packet sebelum parse detail jika checksum gagal.", "Memproses payload sebelum validasi."]
  ].map(([track, name, syntax, description, bestPractice, commonMistake], index) => ({
    id: `ref-${index + 1}`,
    track,
    name,
    syntax,
    description,
    bestPractice,
    commonMistake
  }));

  const quizzes = {
    html: { question: "Tag mana yang paling tepat untuk konten utama halaman?", options: ["main", "div", "span", "small"], answer: 0, explanation: "`main` memberi landmark utama yang membantu aksesibilitas." },
    css: { question: "Apa fungsi CSS specificity?", options: ["Mengatur prioritas selector", "Menghapus margin", "Menjalankan JS", "Membuat API"], answer: 0, explanation: "Specificity menentukan rule mana yang menang saat selector konflik." },
    javascript: { question: "Mengapa event delegation berguna?", options: ["Untuk menangani item dinamis lewat parent", "Untuk menghapus CSS", "Untuk compile C++", "Untuk mengganti HTTP"], answer: 0, explanation: "Parent dapat menangani event dari child yang dibuat setelah halaman load." },
    python: { question: "Apa manfaat virtual environment?", options: ["Mengisolasi dependency project", "Mempercepat CPU otomatis", "Mengubah Python menjadi C++", "Menghapus kebutuhan testing"], answer: 0, explanation: "Virtual environment mencegah konflik dependency antar project." },
    cpp: { question: "Apa perbedaan stack dan heap secara umum?", options: ["Stack otomatis, heap perlu dikelola lebih sadar", "Heap selalu lebih kecil", "Stack hanya untuk string", "Tidak ada bedanya"], answer: 0, explanation: "Stack cocok untuk scope otomatis, heap untuk alokasi dinamis yang perlu lifecycle jelas." },
    fullstack: { question: "Komponen inti full stack app adalah...", options: ["Frontend, backend, API, database", "CSS saja", "Compiler saja", "DNS saja"], answer: 0, explanation: "Full stack menyatukan UI, server logic, kontrak API, dan persistence." },
    security: { question: "SQL Injection dicegah terutama dengan...", options: ["Parameterized query", "String concat query", "Menyembunyikan tombol", "CSS minify"], answer: 0, explanation: "Parameterized query memisahkan data dari instruksi SQL." },
    devops: { question: "Nginx sering dipakai sebagai...", options: ["Reverse proxy", "Database document", "Mobile IDE", "CAN transceiver"], answer: 0, explanation: "Nginx umum dipakai untuk reverse proxy, TLS termination, dan static serving." },
    embedded: { question: "Checksum packet telemetry dipakai untuk...", options: ["Validasi integritas data", "Mengubah baud rate", "Menghapus timeout", "Membuat JWT"], answer: 0, explanation: "Checksum membantu mendeteksi packet rusak sebelum dipakai." },
    mobile: { question: "USB OTG Android berguna untuk...", options: ["Komunikasi perangkat serial eksternal", "Membuat CSS Grid", "Compile SQL", "Menghapus API"], answer: 0, explanation: "USB OTG memungkinkan Android membaca device seperti serial adapter atau ECU bridge." }
  };

  const projects = [
    ["landing-page", "Landing Page", "HTML/CSS", "Halaman marketing accessible dengan SEO, form, lazy loading, dan responsive layout."],
    ["todo-app", "Todo App", "JavaScript", "State management kecil dengan localStorage, validation, filter, dan error state."],
    ["calculator", "Calculator", "JavaScript/C++", "Kalkulator UI dan console app untuk melatih parsing input dan branching."],
    ["dashboard", "Dashboard", "CSS/JS", "Dashboard progress dengan charts sederhana, filter, dan responsive grid."],
    ["rest-api", "REST API", "Python", "API CRUD dengan validation, auth, rate limiting, logging, dan SQLite/PostgreSQL."],
    ["crud-app", "CRUD App", "Full Stack", "Frontend static yang terhubung backend API dan database."],
    ["esp32-dashboard", "ESP32 Dashboard", "Embedded", "ESP32 mengirim telemetry serial/Bluetooth ke dashboard realtime."],
    ["ecu-telemetry", "ECU Telemetry Dashboard", "ECU", "Parser packet ECU dengan checksum, retry, timeout, dan visualisasi realtime."]
  ].map(([id, title, stack, summary]) => ({ id, title, stack, summary }));

  const securityChecklist = [
    "Validasi semua input request dan form.",
    "Escape output untuk mencegah XSS.",
    "Gunakan parameterized query untuk anti SQL Injection.",
    "Terapkan CSRF token untuk form/session mutating request.",
    "Simpan secret di environment variable.",
    "Gunakan JWT/session dengan expiry, issuer, audience, dan secure cookie jika berbasis browser.",
    "Terapkan RBAC untuk endpoint sensitif.",
    "Aktifkan rate limiting dan secure logging.",
    "Tambahkan CSP, HSTS, X-Content-Type-Options, dan Referrer-Policy.",
    "Jalankan dependency audit sebelum deploy."
  ];

  const productionChecklist = [
    "Pisahkan config development, staging, dan production.",
    "Gunakan Docker image non-root dan dependency pinned.",
    "Aktifkan reverse proxy Nginx dengan SSL.",
    "Siapkan backup database dan migration strategy.",
    "Pantau logs, healthcheck, error rate, dan latency.",
    "Gunakan CI/CD untuk lint, test, build, dan deploy.",
    "Dokumentasikan runbook maintenance dan rollback.",
    "Review CORS, CSP, cookie policy, dan API keys sebelum go-live."
  ];

  const playgroundTemplate = {
    html: "<main class=\"app\"><h1>Telemetry Card</h1><p id=\"status\">Menunggu data...</p><button id=\"simulate\">Simulasi packet</button></main>",
    css: "body{font-family:system-ui;margin:0;background:#101820;color:#f6f8fb}.app{min-height:100vh;display:grid;place-content:center;gap:12px;text-align:center}button{padding:10px 14px;border:0;border-radius:8px;background:#28c2a0;font-weight:800}",
    js: "document.querySelector('#simulate').addEventListener('click',()=>{document.querySelector('#status').textContent='RPM 2480 | TPS 18% | Temp 86C';});"
  };

  return {
    tracks: [...coreTracks, ...extraTracks],
    references,
    quizzes,
    projects,
    securityChecklist,
    productionChecklist,
    playgroundTemplate
  };
})();
