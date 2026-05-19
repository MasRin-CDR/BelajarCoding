window.CodingHubData = (() => {
  const modules = [
    {
      id: "html",
      title: "HTML",
      tagline: "Markup fundamentals untuk membangun struktur halaman web.",
      level: "Beginner",
      estimatedTime: "4-6 jam",
      icon: "<>",
      description:
        "Pelajari cara menyusun konten web yang semantik, terstruktur, dan accessible sebagai fondasi semua project frontend.",
      intro: {
        overview:
          "HTML adalah bahasa markup yang menyusun struktur halaman web. Fokus utamanya bukan membuat tampilan cantik, tetapi memastikan informasi, navigasi, media, dan form disusun dengan makna yang tepat.",
        whyItMatters:
          "Struktur HTML yang baik mempermudah styling CSS, interaksi JavaScript, indexing SEO, serta aksesibilitas untuk screen reader dan keyboard navigation.",
        goals: [
          "Memahami kerangka dokumen HTML modern dengan doctype, head, dan body.",
          "Menggunakan semantic tags untuk membangun layout yang lebih jelas.",
          "Membuat form, table, media, dan atribut accessibility dasar dengan benar."
        ]
      },
      concepts: [
        {
          id: "html-structure",
          title: "Struktur Dasar HTML",
          level: "Beginner",
          summary:
            "Dokumen HTML minimal terdiri dari doctype, elemen root <html>, area metadata di <head>, dan konten utama di <body>.",
          syntax: "<!doctype html>\n<html lang=\"id\">\n  <head>...</head>\n  <body>...</body>\n</html>",
          code: "<!doctype html>\n<html lang=\"id\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Belajar HTML</title>\n  </head>\n  <body>\n    <h1>Hello, world!</h1>\n    <p>Ini halaman pertama saya.</p>\n  </body>\n</html>",
          explanation: [
            "`<!doctype html>` memberitahu browser untuk memakai mode standar HTML5.",
            "`lang=\"id\"` membantu mesin pencari dan screen reader memahami bahasa konten.",
            "Metadata penting seperti `charset` dan `viewport` sebaiknya selalu disiapkan sejak awal."
          ],
          notes: [
            "Gunakan hanya satu `<h1>` utama untuk menjaga hierarki heading tetap rapi.",
            "Jangan menaruh konten yang terlihat pengguna di dalam `<head>`."
          ]
        },
        {
          id: "html-semantic",
          title: "Semantic Tags & Accessibility",
          level: "Beginner",
          summary:
            "Semantic tags memberi arti pada bagian halaman sehingga struktur lebih mudah dipahami manusia, browser, dan assistive technology.",
          syntax: "<header>...</header>\n<main>...</main>\n<section>...</section>\n<footer>...</footer>",
          code: "<header>\n  <nav aria-label=\"Navigasi utama\">\n    <a href=\"#materi\">Materi</a>\n    <a href=\"#quiz\">Quiz</a>\n  </nav>\n</header>\n<main>\n  <section aria-labelledby=\"intro-title\">\n    <h2 id=\"intro-title\">Pengantar</h2>\n    <p>Belajar HTML lebih terarah dengan semantic structure.</p>\n  </section>\n</main>",
          explanation: [
            "Gunakan `<main>` untuk area konten utama agar screen reader bisa lompat langsung ke inti halaman.",
            "`aria-label` pada `nav` membantu menjelaskan fungsi navigasi ketika ada lebih dari satu menu.",
            "Heading yang jelas membantu pengguna membaca struktur informasi dengan cepat."
          ],
          notes: [
            "Jangan gunakan `<div>` untuk semua hal jika sebenarnya ada tag semantik yang lebih tepat.",
            "Tambahkan teks alternatif pada gambar agar tetap informatif saat gambar tidak terbaca."
          ]
        },
        {
          id: "html-forms",
          title: "Forms & Input Validation",
          level: "Beginner",
          summary:
            "Form dipakai untuk mengumpulkan data dari pengguna, seperti login, pendaftaran, pencarian, atau feedback.",
          syntax: "<form action=\"/submit\" method=\"post\">\n  <label for=\"email\">Email</label>\n  <input id=\"email\" type=\"email\" required>\n</form>",
          code: "<form>\n  <label for=\"name\">Nama</label>\n  <input id=\"name\" name=\"name\" type=\"text\" minlength=\"3\" required>\n\n  <label for=\"email\">Email</label>\n  <input id=\"email\" name=\"email\" type=\"email\" required>\n\n  <button type=\"submit\">Kirim</button>\n</form>",
          explanation: [
            "Hubungkan `label` dan `input` dengan atribut `for` dan `id` agar area klik lebih nyaman.",
            "Validasi bawaan HTML seperti `required`, `type=\"email\"`, dan `minlength` membantu menyaring input dasar.",
            "Gunakan `name` ketika data perlu dikirim ke backend."
          ],
          notes: [
            "Jangan menggunakan placeholder sebagai pengganti label.",
            "Tentukan `type=\"button\"` untuk tombol non-submit agar form tidak terkirim tanpa sengaja."
          ]
        },
        {
          id: "html-table-media",
          title: "Table & Media",
          level: "Beginner",
          summary:
            "Table cocok untuk data tabular, sedangkan tag media dipakai menampilkan gambar, audio, dan video dengan struktur yang jelas.",
          syntax: "<table>...</table>\n<img src=\"...\" alt=\"...\">\n<video controls>...</video>",
          code: "<table>\n  <caption>Jadwal Belajar</caption>\n  <thead>\n    <tr><th>Hari</th><th>Topik</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Senin</td><td>Semantic HTML</td></tr>\n    <tr><td>Rabu</td><td>Forms</td></tr>\n  </tbody>\n</table>\n\n<figure>\n  <img src=\"profile.jpg\" alt=\"Ilustrasi belajar coding\">\n  <figcaption>Belajar konsisten setiap minggu.</figcaption>\n</figure>",
          explanation: [
            "Gunakan `caption`, `thead`, dan `tbody` untuk membuat table lebih mudah dibaca.",
            "`alt` pada gambar harus mendeskripsikan makna gambar, bukan nama file.",
            "`figure` dan `figcaption` membantu media memiliki konteks tambahan."
          ],
          notes: [
            "Jangan gunakan table untuk layout halaman.",
            "Hindari `alt=\"image\"` karena tidak memberi makna apa pun."
          ]
        },
        {
          id: "html-accessibility",
          title: "Accessibility Dasar",
          level: "Intermediate",
          summary:
            "Accessibility memastikan halaman tetap usable untuk keyboard, screen reader, dan kondisi visual atau motorik yang berbeda.",
          syntax: "<button aria-expanded=\"false\">Menu</button>\n<a class=\"skip-link\" href=\"#content\">Skip</a>",
          code: "<a class=\"skip-link\" href=\"#content\">Lewati ke konten</a>\n\n<button aria-expanded=\"false\" aria-controls=\"menu\">\n  Buka menu\n</button>\n\n<main id=\"content\">\n  <h1>Dashboard Belajar</h1>\n</main>",
          explanation: [
            "Skip link mempercepat navigasi keyboard karena pengguna tidak harus melewati menu berulang.",
            "Gunakan atribut ARIA hanya ketika elemen HTML bawaan belum cukup menjelaskan perilaku komponen.",
            "Pastikan urutan tab logis dan fokus terlihat jelas."
          ],
          notes: [
            "Jangan menghapus outline fokus tanpa menggantinya dengan style fokus yang setara.",
            "Teks link seperti `klik di sini` tidak informatif untuk screen reader."
          ]
        }
      ],
      exercises: [
        {
          id: "html-ex-profile",
          title: "Buat Personal Profile Page",
          level: "Beginner",
          instructions:
            "Buat halaman profil sederhana berisi foto, bio singkat, daftar skill, dan tautan sosial menggunakan semantic tags.",
          deliverable:
            "Gunakan minimal `header`, `main`, `section`, `ul`, dan `footer` agar struktur rapi.",
          hint: "Mulai dari wireframe teks dulu, lalu lengkapi dengan heading dan list."
        },
        {
          id: "html-ex-form",
          title: "Bangun Contact Form",
          level: "Beginner",
          instructions:
            "Susun form kontak dengan field nama, email, topik, dan pesan. Terapkan validasi dasar HTML.",
          deliverable:
            "Semua field harus memiliki label yang terhubung dan tombol submit yang jelas.",
          hint: "Tambahkan `required`, `type=\"email\"`, dan `maxlength` pada field yang relevan."
        },
        {
          id: "html-ex-table",
          title: "Tabel Jadwal Belajar",
          level: "Intermediate",
          instructions:
            "Buat table mingguan untuk jadwal belajar coding lengkap dengan caption dan heading kolom.",
          deliverable:
            "Gunakan `thead`, `tbody`, dan `caption`, lalu tambahkan satu gambar ilustrasi dengan `figure`.",
          hint: "Pikirkan apakah data benar-benar tabular sebelum memilih `<table>`."
        }
      ],
      quiz: [
        {
          question: "Apa fungsi utama `<!doctype html>`?",
          options: [
            "Menentukan warna tema website",
            "Memberi tahu browser agar memakai mode standar HTML5",
            "Menampilkan judul halaman di browser",
            "Menghubungkan file JavaScript"
          ],
          answerIndex: 1,
          explanation: "Doctype mencegah browser masuk ke quirks mode dan memastikan parsing HTML modern."
        },
        {
          question: "Tag mana yang paling tepat untuk konten utama halaman?",
          options: ["<section>", "<main>", "<article>", "<aside>"],
          answerIndex: 1,
          explanation: "`<main>` mewakili area utama dokumen dan sebaiknya hanya ada satu per halaman."
        },
        {
          question: "Mengapa `label` penting di form?",
          options: [
            "Agar input otomatis tersimpan ke database",
            "Agar teks placeholder lebih besar",
            "Agar field lebih mudah diakses dan bisa diklik melalui teks label",
            "Agar browser selalu menampilkan keyboard numerik"
          ],
          answerIndex: 2,
          explanation: "Label meningkatkan usability dan accessibility dengan menjelaskan tujuan setiap field."
        },
        {
          question: "Kapan table sebaiknya digunakan?",
          options: [
            "Untuk semua layout dua kolom",
            "Untuk data yang berbentuk baris dan kolom",
            "Untuk membuat navbar responsif",
            "Untuk mengganti list agar lebih rapi"
          ],
          answerIndex: 1,
          explanation: "Table ideal untuk data tabular seperti jadwal, nilai, atau laporan."
        },
        {
          question: "Atribut apa yang paling penting pada `<img>` untuk accessibility?",
          options: ["src", "height", "alt", "loading"],
          answerIndex: 2,
          explanation: "`alt` mendeskripsikan makna gambar bagi pengguna yang tidak dapat melihatnya."
        }
      ],
      miniProject: {
        title: "Landing Page Event Belajar Coding",
        summary:
          "Gabungkan semantic layout, hero section, agenda table, form registrasi, dan media pendukung menjadi satu halaman event belajar coding.",
        deliverables: [
          "Hero dengan heading, deskripsi, dan tombol daftar.",
          "Section agenda menggunakan list atau table sesuai kebutuhan.",
          "Form registrasi lengkap dengan label dan validasi dasar.",
          "Footer dengan informasi kontak dan link navigasi."
        ],
        stretchGoals: [
          "Tambahkan section FAQ dengan struktur heading yang jelas.",
          "Pastikan halaman tetap nyaman dibaca hanya dengan keyboard."
        ],
        starterTips: [
          "Rancang hierarchy heading dulu sebelum menulis konten lengkap.",
          "Cek apakah setiap gambar punya alt text yang benar-benar informatif."
        ]
      }
    },
    {
      id: "css",
      title: "CSS",
      tagline: "Styling modern untuk layout, responsivitas, dan visual identity.",
      level: "Beginner",
      estimatedTime: "5-7 jam",
      icon: "#",
      description:
        "Pelajari selector, box model, flexbox, grid, animation, dan CSS variables untuk membangun antarmuka yang rapi dan adaptif.",
      intro: {
        overview:
          "CSS bertugas mengatur bagaimana elemen HTML ditampilkan. Selain warna dan font, CSS modern juga sangat kuat untuk layout, spacing, motion, theme system, dan responsive design.",
        whyItMatters:
          "Dengan CSS yang terstruktur, UI jadi lebih mudah dirawat, konsisten lintas halaman, dan siap berkembang ke design system yang lebih matang.",
        goals: [
          "Memahami cara selector bekerja dan bagaimana cascade memengaruhi style akhir.",
          "Membangun layout dengan flexbox dan grid sesuai kebutuhan komponen.",
          "Membuat halaman responsif dengan media queries dan CSS variables."
        ]
      },
      concepts: [
        {
          id: "css-selectors",
          title: "Selectors & Cascade",
          level: "Beginner",
          summary:
            "Selector menentukan elemen mana yang akan diberi style, sementara cascade menentukan style mana yang menang ketika ada konflik.",
          syntax: "selector {\n  property: value;\n}",
          code: "body {\n  font-family: 'Space Grotesk', sans-serif;\n}\n\n.card {\n  background: #0f172a;\n}\n\n.card p {\n  color: #cbd5e1;\n}",
          explanation: [
            "Selector tag seperti `body` menarget semua elemen dengan nama tag tersebut.",
            "Class selector seperti `.card` lebih fleksibel untuk komponen yang bisa dipakai ulang.",
            "Selector bertingkat seperti `.card p` menarget paragraf di dalam `.card`."
          ],
          notes: [
            "Hindari selector yang terlalu panjang karena membuat CSS sulit dipelihara.",
            "Gunakan class untuk styling komponen, bukan inline style."
          ]
        },
        {
          id: "css-box-model",
          title: "Box Model",
          level: "Beginner",
          summary:
            "Setiap elemen dianggap sebagai kotak yang terdiri dari content, padding, border, dan margin.",
          syntax: "width: 320px;\npadding: 1rem;\nborder: 1px solid #ccc;\nmargin: 0 auto;",
          code: ".card {\n  width: 320px;\n  padding: 1.25rem;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 20px;\n  margin: 0 auto;\n  box-sizing: border-box;\n}",
          explanation: [
            "`padding` memberi ruang di dalam border.",
            "`margin` memberi jarak di luar elemen terhadap elemen lain.",
            "`box-sizing: border-box` membuat perhitungan ukuran lebih mudah karena padding dan border masuk ke total width."
          ],
          notes: [
            "Tanpa `box-sizing: border-box`, elemen bisa tampak lebih lebar dari yang diperkirakan.",
            "Margin vertikal antar elemen block bisa saling collapse."
          ]
        },
        {
          id: "css-flexbox",
          title: "Flexbox",
          level: "Beginner",
          summary:
            "Flexbox ideal untuk menyusun komponen dalam satu dimensi, baik horizontal maupun vertikal.",
          syntax: "display: flex;\njustify-content: space-between;\nalign-items: center;",
          code: ".toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n}\n\n.toolbar-actions {\n  display: flex;\n  gap: 0.75rem;\n}",
          explanation: [
            "`justify-content` mengatur distribusi pada main axis.",
            "`align-items` mengatur alignment pada cross axis.",
            "`gap` lebih aman dan konsisten dibanding margin manual antar item."
          ],
          notes: [
            "Flexbox sangat cocok untuk navbar, toolbar, card actions, dan alignment sederhana.",
            "Untuk layout dua dimensi yang kompleks, grid biasanya lebih tepat."
          ]
        },
        {
          id: "css-grid",
          title: "Grid Layout",
          level: "Intermediate",
          summary:
            "CSS Grid memudahkan penyusunan layout dua dimensi dengan kolom dan baris yang lebih eksplisit.",
          syntax: "display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 1rem;",
          code: ".dashboard {\n  display: grid;\n  grid-template-columns: 240px minmax(0, 1fr);\n  gap: 1.5rem;\n}\n\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1rem;\n}",
          explanation: [
            "Grid sangat kuat untuk page layout dan card layout yang perlu adaptif.",
            "`minmax(0, 1fr)` membantu mencegah kolom overflow karena konten panjang.",
            "`auto-fit` atau `auto-fill` berguna untuk responsive card grid."
          ],
          notes: [
            "Jangan pakai grid hanya untuk menyelaraskan dua item sederhana jika flexbox sudah cukup.",
            "Selalu uji layout grid di ukuran mobile."
          ]
        },
        {
          id: "css-responsive",
          title: "Responsive Design, Variables & Animation",
          level: "Intermediate",
          summary:
            "Responsive design memastikan tampilan tetap nyaman pada berbagai ukuran layar. CSS variables dan animation membantu membangun sistem visual yang konsisten.",
          syntax: ":root { --primary: #1766ff; }\n@media (max-width: 768px) { ... }\ntransition: all 180ms ease;",
          code: ":root {\n  --surface: #0f172a;\n  --accent: #18d7a4;\n}\n\n.button {\n  background: var(--accent);\n  transition: transform 180ms ease, box-shadow 180ms ease;\n}\n\n.button:hover {\n  transform: translateY(-2px);\n}\n\n@media (max-width: 768px) {\n  .layout {\n    grid-template-columns: 1fr;\n  }\n}",
          explanation: [
            "CSS variables memudahkan pengelolaan warna, spacing, dan theme secara global.",
            "Media queries mengubah layout, ukuran teks, atau spacing pada breakpoint tertentu.",
            "Gunakan animation dan transition secukupnya agar UI terasa hidup tanpa mengganggu."
          ],
          notes: [
            "Jangan animasikan terlalu banyak properti berat seperti `width` atau `box-shadow` secara berlebihan.",
            "Pastikan kontras warna tetap baik pada dark mode maupun light mode."
          ]
        }
      ],
      exercises: [
        {
          id: "css-ex-card",
          title: "Responsive Card Component",
          level: "Beginner",
          instructions:
            "Style satu card berisi gambar, judul, deskripsi, dan tombol. Pastikan tampil rapi di mobile maupun desktop.",
          deliverable:
            "Gunakan spacing konsisten, shadow halus, dan hover state yang jelas.",
          hint: "Mulai dari box model dulu, lalu rapikan typografi dan state interaktif."
        },
        {
          id: "css-ex-flex",
          title: "Navbar dengan Flexbox",
          level: "Beginner",
          instructions:
            "Buat navbar yang menempatkan brand di kiri dan kumpulan link di kanan menggunakan flexbox.",
          deliverable:
            "Tambahkan gap yang rapi dan alignment vertikal yang konsisten.",
          hint: "Gunakan `justify-content: space-between` dan `align-items: center`."
        },
        {
          id: "css-ex-grid",
          title: "Grid Layout Dashboard",
          level: "Intermediate",
          instructions:
            "Bangun layout dashboard dua kolom dengan sidebar tetap dan area konten card grid yang adaptif.",
          deliverable:
            "Gunakan CSS Grid utama dan media query agar mobile menjadi satu kolom.",
          hint: "Padukan `grid-template-columns` untuk layout besar dan `auto-fit` untuk card di area konten."
        }
      ],
      quiz: [
        {
          question: "Selector mana yang menarget elemen dengan class `card`?",
          options: ["#card", ".card", "card", "*card"],
          answerIndex: 1,
          explanation: "Class selector selalu diawali titik, misalnya `.card`."
        },
        {
          question: "Apa manfaat utama `box-sizing: border-box`?",
          options: [
            "Menghapus margin default browser",
            "Membuat width sudah mencakup padding dan border",
            "Mengaktifkan dark mode otomatis",
            "Memaksa elemen menjadi inline"
          ],
          answerIndex: 1,
          explanation: "Dengan `border-box`, ukuran elemen lebih mudah dikontrol."
        },
        {
          question: "Layout mana yang paling cocok untuk menyusun card dalam banyak kolom responsif?",
          options: ["Float", "Flexbox saja", "CSS Grid", "Position absolute"],
          answerIndex: 2,
          explanation: "Grid unggul untuk layout dua dimensi seperti card gallery atau dashboard."
        },
        {
          question: "Apa fungsi CSS variables?",
          options: [
            "Menjalankan JavaScript dari CSS",
            "Menyimpan nilai reusable seperti warna dan spacing",
            "Mengganti HTML menjadi dynamic",
            "Menghapus kebutuhan media query"
          ],
          answerIndex: 1,
          explanation: "Variables memudahkan konsistensi dan pengelolaan theme."
        },
        {
          question: "Kenapa media query penting?",
          options: [
            "Agar CSS bisa dijalankan di backend",
            "Agar layout dapat beradaptasi dengan ukuran layar",
            "Agar semua elemen menjadi flex container",
            "Agar browser mem-cache font"
          ],
          answerIndex: 1,
          explanation: "Responsive design sangat bergantung pada media query untuk breakpoint penting."
        }
      ],
      miniProject: {
        title: "Landing Page Styling System",
        summary:
          "Ambil satu halaman HTML sederhana lalu ubah menjadi landing page modern dengan typography hierarchy, card layout, hero gradient, dan dark/light mode.",
        deliverables: [
          "Gunakan CSS variables untuk warna, radius, dan spacing.",
          "Buat section hero, feature cards, dan CTA yang konsisten.",
          "Tambahkan layout responsive dengan breakpoint mobile dan tablet.",
          "Sediakan hover, focus, dan active state untuk komponen interaktif."
        ],
        stretchGoals: [
          "Tambahkan animasi ringan untuk card reveal atau button hover.",
          "Rancang utility classes kecil untuk spacing atau text alignment."
        ],
        starterTips: [
          "Tentukan token desain di `:root` sebelum menulis style komponen.",
          "Uji layout dari desktop ke mobile, bukan hanya sebaliknya."
        ]
      }
    },
    {
      id: "javascript",
      title: "JavaScript",
      tagline: "Logic, interactivity, asynchronous flow, dan state di browser.",
      level: "Intermediate",
      estimatedTime: "6-8 jam",
      icon: "JS",
      description:
        "Pelajari dasar JavaScript modern untuk manipulasi data, DOM, event, asynchronous programming, localStorage, dan error handling.",
      intro: {
        overview:
          "JavaScript adalah bahasa utama untuk membuat halaman web menjadi interaktif. Dengan JavaScript, kita bisa memproses data, merespons event, memanipulasi DOM, dan berkomunikasi dengan API.",
        whyItMatters:
          "Sebagian besar pengalaman pengguna di web modern bergantung pada JavaScript, mulai dari validasi form hingga dashboard real-time.",
        goals: [
          "Memahami variable, function, array, dan object sebagai fondasi logika program.",
          "Menguasai DOM manipulation dan event handling untuk interaksi UI.",
          "Belajar fetch API, async/await, localStorage, dan error handling dasar."
        ]
      },
      concepts: [
        {
          id: "js-variables",
          title: "Variable & Data Basics",
          level: "Beginner",
          summary:
            "Variable menyimpan data yang akan dipakai ulang. JavaScript modern biasanya menggunakan `const` dan `let`.",
          syntax: "const total = 3;\nlet currentModule = 'html';",
          code: "const userName = 'Alya';\nlet completedTopics = 0;\nconst isPremium = false;\n\ncompletedTopics += 1;\nconsole.log(`${userName} sudah menyelesaikan ${completedTopics} topik.`);",
          explanation: [
            "`const` dipakai ketika nilai tidak perlu di-assign ulang.",
            "`let` dipakai jika nilai bisa berubah selama program berjalan.",
            "Template literal dengan backtick memudahkan interpolasi string."
          ],
          notes: [
            "Hindari `var` untuk project modern kecuali ada alasan kompatibilitas khusus.",
            "Nama variable sebaiknya jelas dan menjelaskan isi datanya."
          ]
        },
        {
          id: "js-functions",
          title: "Function, Array & Object",
          level: "Beginner",
          summary:
            "Function membungkus logika agar reusable, sedangkan array dan object membantu menyusun kumpulan data.",
          syntax: "function greet(name) { ... }\nconst items = [];\nconst user = {};",
          code: "const modules = [\n  { id: 'html', level: 'Beginner' },\n  { id: 'css', level: 'Beginner' }\n];\n\nfunction getModuleTitles(list) {\n  return list.map((module) => module.id.toUpperCase());\n}\n\nconsole.log(getModuleTitles(modules));",
          explanation: [
            "Array cocok untuk data berurutan, object cocok untuk data dengan pasangan key-value.",
            "`map()` membuat array baru tanpa mengubah array asli.",
            "Function membantu memisahkan satu tanggung jawab logika."
          ],
          notes: [
            "Jangan menaruh terlalu banyak tanggung jawab dalam satu function.",
            "Gunakan method array seperti `map`, `filter`, dan `find` untuk kode yang lebih deklaratif."
          ]
        },
        {
          id: "js-dom",
          title: "DOM & Event",
          level: "Intermediate",
          summary:
            "DOM adalah representasi halaman HTML di browser. JavaScript dapat membaca dan mengubah DOM sebagai respons terhadap event pengguna.",
          syntax: "document.querySelector('.button')\nbutton.addEventListener('click', handler)",
          code: "const button = document.querySelector('#saveButton');\nconst message = document.querySelector('#message');\n\nbutton.addEventListener('click', () => {\n  message.textContent = 'Progress berhasil disimpan.';\n  message.classList.add('is-visible');\n});",
          explanation: [
            "`querySelector` memilih elemen pertama yang sesuai selector.",
            "`addEventListener` menghubungkan event seperti klik, input, atau submit ke handler function.",
            "Perubahan kecil pada `textContent`, class, atau attribute bisa langsung mengubah tampilan UI."
          ],
          notes: [
            "Gunakan `textContent` untuk output teks agar lebih aman dibanding `innerHTML`.",
            "Pastikan elemen yang dicari memang ada sebelum dipakai."
          ]
        },
        {
          id: "js-fetch",
          title: "Fetch API & Async/Await",
          level: "Intermediate",
          summary:
            "Fetch API digunakan untuk mengambil data dari server atau API. Async/await membuat alur asynchronous terasa lebih mudah dibaca.",
          syntax: "const response = await fetch('/api/modules');\nconst data = await response.json();",
          code: "async function loadModules() {\n  try {\n    const response = await fetch('/api/modules');\n    if (!response.ok) {\n      throw new Error('Gagal mengambil data modul.');\n    }\n\n    const payload = await response.json();\n    return payload.data;\n  } catch (error) {\n    console.error(error.message);\n    return [];\n  }\n}",
          explanation: [
            "`await` menunggu Promise selesai sebelum lanjut ke baris berikutnya.",
            "Selalu cek `response.ok` agar status error HTTP tidak dianggap sukses.",
            "`try...catch` membantu menangani error jaringan atau parsing."
          ],
          notes: [
            "Jangan lupa menambahkan feedback loading jika permintaan butuh waktu.",
            "Pisahkan logic fetching dari logic rendering agar lebih mudah dirawat."
          ]
        },
        {
          id: "js-storage",
          title: "localStorage & Error Handling",
          level: "Intermediate",
          summary:
            "localStorage menyimpan data kecil di browser agar state tetap ada setelah halaman direfresh. Error handling mencegah aplikasi gagal diam-diam.",
          syntax: "localStorage.setItem('key', 'value')\ntry { ... } catch (error) { ... }",
          code: "function saveProgress(moduleId, completed) {\n  try {\n    const key = 'coding-learning-progress';\n    const raw = localStorage.getItem(key);\n    const data = raw ? JSON.parse(raw) : {};\n\n    data[moduleId] = completed;\n    localStorage.setItem(key, JSON.stringify(data));\n  } catch (error) {\n    console.error('Tidak bisa menyimpan progress:', error.message);\n  }\n}",
          explanation: [
            "Data di localStorage hanya bisa disimpan sebagai string, jadi object perlu diubah dengan `JSON.stringify`.",
            "Saat membaca kembali, gunakan `JSON.parse` di dalam `try...catch` untuk berjaga jika data rusak.",
            "Simpan hanya data non-sensitif dan berukuran kecil di localStorage."
          ],
          notes: [
            "Jangan simpan access token atau secret sensitif di localStorage.",
            "Selalu siapkan fallback ketika data localStorage kosong atau invalid."
          ]
        }
      ],
      exercises: [
        {
          id: "js-ex-dom",
          title: "Counter Interaktif",
          level: "Beginner",
          instructions:
            "Buat counter dengan tombol tambah, kurang, dan reset. Tampilkan angka saat ini di layar.",
          deliverable:
            "Pisahkan logic update state dan logic update tampilan agar mudah dipahami.",
          hint: "Simpan nilai counter di variable, lalu render ulang setiap perubahan."
        },
        {
          id: "js-ex-form",
          title: "Form Validation Sederhana",
          level: "Intermediate",
          instructions:
            "Tangkap event submit pada form, validasi field kosong, dan tampilkan pesan error yang ramah.",
          deliverable:
            "Gunakan `preventDefault()` dan `textContent` untuk menampilkan feedback.",
          hint: "Buat function kecil untuk memvalidasi satu field agar kode lebih rapi."
        },
        {
          id: "js-ex-fetch",
          title: "Ambil Data API",
          level: "Intermediate",
          instructions:
            "Fetch daftar modul dari endpoint backend lalu tampilkan judul dan levelnya ke halaman.",
          deliverable:
            "Siapkan state loading, sukses, dan error minimal dalam bentuk teks atau badge.",
          hint: "Mulai dari `fetch('/api/modules')` lalu cek `response.ok` sebelum parse JSON."
        }
      ],
      quiz: [
        {
          question: "Kapan `const` lebih tepat digunakan daripada `let`?",
          options: [
            "Ketika nilai tidak akan di-assign ulang",
            "Ketika variable harus global",
            "Ketika ingin menyimpan array saja",
            "Ketika ingin menghindari function"
          ],
          answerIndex: 0,
          explanation: "`const` cocok untuk binding yang tetap, walaupun isi object atau array masih bisa diubah."
        },
        {
          question: "Method array mana yang membuat array baru berdasarkan hasil transformasi tiap item?",
          options: ["find()", "map()", "some()", "push()"],
          answerIndex: 1,
          explanation: "`map()` mengembalikan array baru dengan panjang yang sama."
        },
        {
          question: "Apa keuntungan utama `textContent` dibanding `innerHTML` untuk output teks?",
          options: [
            "Lebih aman karena tidak mem-parsing HTML",
            "Bisa menjalankan script otomatis",
            "Selalu lebih cepat dari semua kasus lain",
            "Bisa memodifikasi CSS langsung"
          ],
          answerIndex: 0,
          explanation: "`textContent` mencegah injeksi markup ketika yang dibutuhkan hanya teks."
        },
        {
          question: "Mengapa perlu mengecek `response.ok` setelah `fetch()`?",
          options: [
            "Karena fetch akan melempar error untuk semua status non-200 secara otomatis",
            "Karena status HTTP error tetap menghasilkan Promise resolve",
            "Karena tanpa itu browser akan crash",
            "Karena `await` tidak bisa dipakai tanpa `response.ok`"
          ],
          answerIndex: 1,
          explanation: "Fetch hanya reject pada error jaringan, bukan pada status HTTP error seperti 404 atau 500."
        },
        {
          question: "Data seperti progress belajar paling aman disimpan di localStorage bila...",
          options: [
            "Datanya sensitif dan rahasia",
            "Datanya kecil dan tidak sensitif",
            "Datanya berupa file biner besar",
            "Datanya harus selalu terenkripsi oleh browser"
          ],
          answerIndex: 1,
          explanation: "localStorage cocok untuk state kecil non-sensitif seperti preferensi tema atau checklist."
        }
      ],
      miniProject: {
        title: "Todo List dengan Penyimpanan Browser",
        summary:
          "Buat aplikasi todo list yang bisa menambah, menandai selesai, menghapus item, dan menyimpan daftar ke localStorage.",
        deliverables: [
          "Form input untuk menambah task baru.",
          "Daftar todo yang dirender dari array state.",
          "Checkbox atau tombol untuk mengubah status selesai.",
          "Persistensi data menggunakan localStorage."
        ],
        stretchGoals: [
          "Tambahkan filter all, active, completed.",
          "Tambahkan validasi agar task kosong tidak bisa disimpan."
        ],
        starterTips: [
          "Pisahkan function `renderTodos`, `saveTodos`, dan `bindEvents`.",
          "Jangan langsung menyimpan HTML ke localStorage, simpan data mentahnya."
        ]
      }
    },
    {
      id: "python",
      title: "Python",
      tagline: "Bahasa serbaguna untuk scripting, backend, dan automasi.",
      level: "Beginner",
      estimatedTime: "6-8 jam",
      icon: "Py",
      description:
        "Pelajari sintaks Python yang bersih untuk data processing, file handling, OOP dasar, module, dan pengantar framework web.",
      intro: {
        overview:
          "Python terkenal karena sintaksnya mudah dibaca dan ekosistemnya luas. Bahasa ini sering dipakai untuk automasi, backend API, data analysis, hingga machine learning.",
        whyItMatters:
          "Dengan fondasi Python yang baik, kamu bisa bergerak cepat ke scripting sehari-hari maupun pengembangan backend web.",
        goals: [
          "Memahami variable, tipe data, condition, loop, dan function di Python.",
          "Menggunakan list, dictionary, file handling, dan module untuk menyusun program yang lebih berguna.",
          "Mengenal OOP dasar serta gambaran penggunaan Flask atau FastAPI."
        ]
      },
      concepts: [
        {
          id: "python-basics",
          title: "Variable & Data Type",
          level: "Beginner",
          summary:
            "Python memakai assignment sederhana tanpa deklarasi tipe eksplisit. Tipe umum meliputi string, integer, float, dan boolean.",
          syntax: "name = 'Alya'\nage = 21\nis_active = True",
          code: "name = 'Alya'\nlevel = 'Beginner'\ncompleted_topics = 4\nprogress = 72.5\nis_active = True\n\nprint(f'{name} berada di level {level}')",
          explanation: [
            "Python membaca tipe data dari nilai yang diberikan.",
            "f-string memudahkan interpolasi string dengan sintaks yang ringkas.",
            "Nama variable sebaiknya menggunakan snake_case."
          ],
          notes: [
            "Hindari nama variable seperti `list` atau `str` yang menimpa built-in Python.",
            "Konsistensi penamaan sangat membantu ketika file mulai membesar."
          ]
        },
        {
          id: "python-control-flow",
          title: "Condition & Loop",
          level: "Beginner",
          summary:
            "Condition dan loop mengatur alur logika program berdasarkan kondisi tertentu atau pengulangan.",
          syntax: "if condition:\n    ...\nfor item in items:\n    ...",
          code: "score = 82\n\nif score >= 80:\n    print('Lulus dengan baik')\nelse:\n    print('Perlu latihan lagi')\n\nmodules = ['html', 'css', 'javascript']\nfor module in modules:\n    print(f'Belajar {module}')",
          explanation: [
            "Indentasi di Python menentukan blok kode, jadi wajib konsisten.",
            "`for` di Python nyaman dipakai untuk iterasi list, tuple, string, atau hasil `range()`.",
            "`if`, `elif`, dan `else` dipakai untuk percabangan bertingkat."
          ],
          notes: [
            "Jangan campur tab dan spasi.",
            "Gunakan kondisi yang sederhana dan mudah dibaca, hindari nested terlalu dalam."
          ]
        },
        {
          id: "python-functions",
          title: "Function, List & Dictionary",
          level: "Beginner",
          summary:
            "Function membantu memecah program, sedangkan list dan dictionary menjadi struktur data dasar yang paling sering digunakan.",
          syntax: "def function_name(param):\n    return result",
          code: "def calculate_completion(completed, total):\n    if total == 0:\n        return 0\n    return round((completed / total) * 100)\n\nmodules = ['html', 'css', 'python']\nprofile = {'name': 'Alya', 'track': 'Backend'}\n\nprint(calculate_completion(7, 10))",
          explanation: [
            "Function sebaiknya melakukan satu tugas yang jelas.",
            "List cocok untuk data berurutan, dictionary cocok untuk pasangan key-value.",
            "`return` mengembalikan hasil agar bisa dipakai di tempat lain."
          ],
          notes: [
            "Hati-hati memakai mutable default argument seperti `[]` di parameter function.",
            "Gunakan nama key dictionary yang konsisten untuk menghindari bug kecil."
          ]
        },
        {
          id: "python-files",
          title: "File Handling & Module",
          level: "Intermediate",
          summary:
            "Python bisa membaca dan menulis file dengan mudah, serta membagi kode ke beberapa module agar project lebih rapi.",
          syntax: "with open('file.txt', 'r', encoding='utf-8') as file:\n    data = file.read()",
          code: "from pathlib import Path\n\nnotes_path = Path('notes.txt')\nnotes_path.write_text('Belajar Python hari ini', encoding='utf-8')\n\ncontent = notes_path.read_text(encoding='utf-8')\nprint(content)",
          explanation: [
            "Context manager `with` memastikan file ditutup otomatis.",
            "`pathlib` memberikan API path yang lebih modern dan mudah dibaca.",
            "Module membantu memisahkan utilitas, model, dan logic aplikasi."
          ],
          notes: [
            "Selalu tentukan encoding saat membaca atau menulis teks.",
            "Tangani error file tidak ditemukan atau permission ketika aplikasinya lebih serius."
          ]
        },
        {
          id: "python-oop-web",
          title: "OOP Dasar & Flask/FastAPI Introduction",
          level: "Intermediate",
          summary:
            "Class berguna untuk memodelkan objek, sedangkan framework web seperti Flask atau FastAPI memudahkan pembuatan API.",
          syntax: "class Student:\n    def __init__(self, name):\n        self.name = name",
          code: "class LessonTracker:\n    def __init__(self, student_name):\n        self.student_name = student_name\n        self.completed = []\n\n    def mark_done(self, lesson):\n        self.completed.append(lesson)\n\ntracker = LessonTracker('Alya')\ntracker.mark_done('python-basics')\nprint(tracker.completed)\n\n# Flask example\n# @app.get('/api/modules')\n# def get_modules():\n#     return {'data': []}",
          explanation: [
            "Method `__init__` dipakai untuk inisialisasi atribut objek.",
            "Class cocok saat data dan perilakunya memang saling terkait.",
            "Framework web biasanya membungkus request, response, routing, dan validasi dalam pola yang konsisten."
          ],
          notes: [
            "Jangan memaksa semua kode menjadi class; function biasa sering cukup untuk tugas kecil.",
            "Pisahkan layer route, validation, dan business logic pada backend sungguhan."
          ]
        }
      ],
      exercises: [
        {
          id: "python-ex-cli",
          title: "CLI Calculator",
          level: "Beginner",
          instructions:
            "Buat kalkulator command line yang menerima dua angka dan operator lalu menampilkan hasilnya.",
          deliverable:
            "Tangani operator dasar `+`, `-`, `*`, `/` dan kondisi pembagian dengan nol.",
          hint: "Mulai dari function `calculate(a, b, operator)`."
        },
        {
          id: "python-ex-file",
          title: "File Manager Sederhana",
          level: "Intermediate",
          instructions:
            "Buat script untuk membuat, membaca, dan menghapus file catatan sederhana dari terminal.",
          deliverable:
            "Gunakan `pathlib` dan tampilkan pesan error yang jelas ketika file tidak ada.",
          hint: "Pisahkan command menjadi function `create_note`, `read_note`, dan `delete_note`."
        },
        {
          id: "python-ex-api",
          title: "Web API Modules",
          level: "Intermediate",
          instructions:
            "Buat endpoint GET sederhana yang mengembalikan daftar modul belajar dalam format JSON.",
          deliverable:
            "Kembalikan response JSON dengan status code yang sesuai dan struktur rapi.",
          hint: "Mulai dari list dictionary lalu kembalikan melalui Flask `jsonify`."
        }
      ],
      quiz: [
        {
          question: "Kenapa f-string sering disukai di Python modern?",
          options: [
            "Karena hanya f-string yang bisa menampilkan angka",
            "Karena sintaksnya ringkas dan mudah dibaca untuk interpolasi string",
            "Karena otomatis mengubah semua data menjadi JSON",
            "Karena hanya bekerja di backend web"
          ],
          answerIndex: 1,
          explanation: "f-string membuat format string lebih jelas dibanding concatenation manual."
        },
        {
          question: "Apa fungsi `with open(...) as file:`?",
          options: [
            "Membuat file selalu read-only",
            "Menutup file otomatis setelah blok selesai",
            "Mengubah file menjadi dictionary",
            "Membuat file terenkripsi"
          ],
          answerIndex: 1,
          explanation: "Context manager membantu resource management agar file tidak lupa ditutup."
        },
        {
          question: "Struktur data mana yang paling cocok untuk menyimpan pasangan key-value?",
          options: ["list", "tuple", "dictionary", "set"],
          answerIndex: 2,
          explanation: "Dictionary dirancang untuk pemetaan key ke value."
        },
        {
          question: "Apa keuntungan memakai `pathlib`?",
          options: [
            "Hanya bisa dipakai di Linux",
            "Memberi API path yang lebih modern dan readable",
            "Menggantikan seluruh kebutuhan file I/O",
            "Membuat Python lebih cepat 10x otomatis"
          ],
          answerIndex: 1,
          explanation: "`pathlib` menyederhanakan operasi path dan lintas platform."
        },
        {
          question: "Kapan class paling masuk akal digunakan?",
          options: [
            "Saat semua script sekecil apa pun wajib OOP",
            "Saat data dan perilaku objek saling terkait dan perlu dimodelkan",
            "Saat hanya ingin mencetak satu angka",
            "Saat ingin menghindari function"
          ],
          answerIndex: 1,
          explanation: "Class berguna ketika memang ada entitas dengan state dan method yang jelas."
        }
      ],
      miniProject: {
        title: "Learning Tracker CLI",
        summary:
          "Bangun aplikasi terminal untuk menambahkan modul selesai, melihat progress, dan menyimpan data ke file JSON lokal.",
        deliverables: [
          "Menu sederhana berbasis input terminal.",
          "Penyimpanan progress ke file JSON lokal.",
          "Ringkasan jumlah modul selesai dan target berikutnya.",
          "Struktur kode dipisah ke function atau module kecil."
        ],
        stretchGoals: [
          "Tambahkan filter progress berdasarkan kategori.",
          "Buat versi API sederhana yang membaca file progress yang sama."
        ],
        starterTips: [
          "Gunakan dictionary untuk menyimpan status tiap modul.",
          "Tulis helper untuk load/save JSON agar tidak duplikasi kode."
        ]
      }
    },
    {
      id: "cpp",
      title: "C++",
      tagline: "Dasar logika terstruktur, memori, OOP, dan STL.",
      level: "Beginner",
      estimatedTime: "6-8 jam",
      icon: "C++",
      description:
        "Pelajari dasar C++ untuk memahami tipe data, loop, function, pointer dasar, class, dan STL vector/map.",
      intro: {
        overview:
          "C++ banyak dipakai untuk system programming, game development, competitive programming, dan aplikasi yang butuh performa tinggi. Bahasa ini memberi kontrol lebih dekat ke memori dibanding bahasa level tinggi seperti Python.",
        whyItMatters:
          "Belajar C++ membantu memperkuat logika pemrograman, pemahaman memori, dan struktur data yang efisien.",
        goals: [
          "Memahami variable, data type, condition, loop, dan function dalam sintaks C++.",
          "Mengenal array, pointer dasar, struct, class, dan OOP dasar.",
          "Menggunakan STL vector dan map untuk struktur data yang lebih fleksibel."
        ]
      },
      concepts: [
        {
          id: "cpp-basics",
          title: "Variable & Data Type",
          level: "Beginner",
          summary:
            "C++ menggunakan deklarasi tipe eksplisit sehingga compiler mengetahui ukuran dan jenis data sejak awal.",
          syntax: "int age = 21;\ndouble score = 82.5;\nstd::string name = \"Alya\";",
          code: "#include <iostream>\n#include <string>\n\nint main() {\n    std::string name = \"Alya\";\n    int completedTopics = 4;\n    double progress = 72.5;\n\n    std::cout << name << \" - \" << completedTopics << \" topics\" << std::endl;\n    return 0;\n}",
          explanation: [
            "Tipe seperti `int`, `double`, dan `bool` menentukan bentuk data yang disimpan.",
            "`std::string` berasal dari standard library untuk mempermudah manipulasi teks.",
            "`std::cout` digunakan untuk output ke console."
          ],
          notes: [
            "Selalu akhiri statement dengan titik koma.",
            "Gunakan nama variable yang deskriptif, bukan singkatan yang membingungkan."
          ]
        },
        {
          id: "cpp-control",
          title: "Condition, Loop & Function",
          level: "Beginner",
          summary:
            "Control flow di C++ menggunakan `if`, `else`, `for`, `while`, dan function untuk menyusun logic program.",
          syntax: "if (condition) { ... }\nfor (int i = 0; i < n; ++i) { ... }",
          code: "#include <iostream>\n\nint square(int value) {\n    return value * value;\n}\n\nint main() {\n    for (int i = 1; i <= 3; ++i) {\n        std::cout << square(i) << std::endl;\n    }\n    return 0;\n}",
          explanation: [
            "Function di C++ memiliki tipe return yang ditulis di depan nama function.",
            "`++i` meningkatkan nilai variable `i` satu per satu.",
            "Loop memungkinkan tugas berulang dikerjakan tanpa menulis kode berkali-kali."
          ],
          notes: [
            "Periksa kondisi loop dengan teliti untuk menghindari off-by-one.",
            "Jangan menulis function terlalu panjang jika bisa dipecah."
          ]
        },
        {
          id: "cpp-array-pointer",
          title: "Array & Pointer Dasar",
          level: "Intermediate",
          summary:
            "Array menyimpan banyak nilai dengan tipe sama, sedangkan pointer menyimpan alamat memori dari data lain.",
          syntax: "int numbers[3] = {1, 2, 3};\nint* ptr = &numbers[0];",
          code: "#include <iostream>\n\nint main() {\n    int values[3] = {10, 20, 30};\n    int* ptr = values;\n\n    std::cout << \"Nilai pertama: \" << *ptr << std::endl;\n    std::cout << \"Nilai kedua: \" << *(ptr + 1) << std::endl;\n    return 0;\n}",
          explanation: [
            "`ptr` menyimpan alamat elemen pertama array.",
            "`*ptr` melakukan dereference untuk membaca nilai pada alamat tersebut.",
            "Pointer memberi fleksibilitas tinggi, tetapi perlu kehati-hatian agar tidak mengakses memori yang salah."
          ],
          notes: [
            "Belajar pointer perlahan; fokus dulu pada hubungan antara alamat dan nilai.",
            "Jika belum perlu, gunakan container modern seperti `std::vector` untuk mengurangi kompleksitas."
          ]
        },
        {
          id: "cpp-struct-class",
          title: "Struct, Class & OOP Dasar",
          level: "Intermediate",
          summary:
            "Struct dan class membantu mengelompokkan data serta method dalam satu entitas.",
          syntax: "class Student {\npublic:\n    std::string name;\n};",
          code: "#include <iostream>\n#include <string>\n\nclass LessonTracker {\npublic:\n    LessonTracker(std::string studentName) : name(studentName), completed(0) {}\n\n    void markDone() {\n        completed++;\n    }\n\n    void printStatus() const {\n        std::cout << name << \" menyelesaikan \" << completed << \" topik\" << std::endl;\n    }\n\nprivate:\n    std::string name;\n    int completed;\n};\n\nint main() {\n    LessonTracker tracker(\"Alya\");\n    tracker.markDone();\n    tracker.printStatus();\n}",
          explanation: [
            "Constructor menginisialisasi object ketika dibuat.",
            "`private` menyembunyikan detail implementasi agar state lebih aman.",
            "Method `const` menandakan method tersebut tidak mengubah state object."
          ],
          notes: [
            "Gunakan class ketika ada data dan perilaku yang masuk akal untuk digabung.",
            "Pelajari encapsulation sebelum masuk ke inheritance."
          ]
        },
        {
          id: "cpp-stl",
          title: "STL Vector & Map",
          level: "Intermediate",
          summary:
            "STL menyediakan container dan algoritma siap pakai. `vector` cocok untuk list dinamis, `map` cocok untuk data key-value terurut.",
          syntax: "std::vector<int> values;\nstd::map<std::string, int> scores;",
          code: "#include <iostream>\n#include <map>\n#include <vector>\n\nint main() {\n    std::vector<std::string> modules = {\"html\", \"css\", \"cpp\"};\n    std::map<std::string, int> progress = {{\"html\", 100}, {\"css\", 80}};\n\n    modules.push_back(\"python\");\n\n    for (const auto& module : modules) {\n        std::cout << module << std::endl;\n    }\n\n    std::cout << progress[\"css\"] << std::endl;\n}",
          explanation: [
            "`vector` lebih fleksibel daripada array statis karena ukuran dapat bertambah.",
            "`map` menyimpan pasangan key-value dan memudahkan pencarian berdasarkan key.",
            "`const auto&` menghindari copy yang tidak perlu saat iterasi."
          ],
          notes: [
            "Jika tidak ingin key baru tercipta otomatis, gunakan `find()` sebelum mengakses map.",
            "STL adalah alat utama yang sangat membantu sebelum menulis struktur data sendiri."
          ]
        }
      ],
      exercises: [
        {
          id: "cpp-ex-calculator",
          title: "Console Calculator",
          level: "Beginner",
          instructions:
            "Buat kalkulator sederhana di terminal yang menerima dua angka dan operator aritmetika dasar.",
          deliverable:
            "Pisahkan operasi ke function kecil dan tangani pembagian dengan nol.",
          hint: "Gunakan switch-case untuk memilih operator."
        },
        {
          id: "cpp-ex-array",
          title: "Array Manager",
          level: "Intermediate",
          instructions:
            "Buat program yang menyimpan angka ke array atau vector, lalu hitung total dan nilai terbesar.",
          deliverable:
            "Tampilkan hasil perhitungan secara rapi lewat `std::cout`.",
          hint: "Coba mulai dari `std::vector<int>` agar input lebih fleksibel."
        },
        {
          id: "cpp-ex-oop",
          title: "Class Progress Tracker",
          level: "Intermediate",
          instructions:
            "Buat class yang menyimpan nama siswa dan jumlah materi selesai, lalu tampilkan statusnya.",
          deliverable:
            "Gunakan constructor, method update, dan method cetak status.",
          hint: "Tentukan atribut `private` dan method `public` sejak awal."
        }
      ],
      quiz: [
        {
          question: "Apa perbedaan utama C++ dibanding Python terkait tipe data?",
          options: [
            "C++ selalu dinamis, Python selalu statis",
            "C++ umumnya memakai deklarasi tipe eksplisit, Python tidak",
            "Python tidak punya tipe data",
            "C++ tidak bisa menyimpan string"
          ],
          answerIndex: 1,
          explanation: "Di C++, tipe biasanya ditentukan saat deklarasi variable."
        },
        {
          question: "Apa arti `int* ptr`?",
          options: [
            "ptr adalah integer biasa",
            "ptr adalah pointer ke integer",
            "ptr adalah function yang mengembalikan integer",
            "ptr adalah array integer"
          ],
          answerIndex: 1,
          explanation: "Tanda `*` pada deklarasi menunjukkan pointer ke tipe tersebut."
        },
        {
          question: "Container STL mana yang paling cocok untuk daftar data yang bisa bertambah dinamis?",
          options: ["std::vector", "int[10]", "char*", "std::cout"],
          answerIndex: 0,
          explanation: "`std::vector` dirancang untuk array dinamis yang mudah digunakan."
        },
        {
          question: "Kegunaan `private` pada class adalah...",
          options: [
            "Agar method hanya bisa dipanggil oleh compiler",
            "Untuk menyembunyikan detail implementasi dari luar class",
            "Agar semua file bisa mengakses atribut langsung",
            "Untuk mempercepat program otomatis"
          ],
          answerIndex: 1,
          explanation: "`private` membantu encapsulation agar data tidak diubah sembarangan dari luar."
        },
        {
          question: "Mengapa `const auto& item` sering dipakai saat iterasi collection?",
          options: [
            "Agar item selalu bisa diubah",
            "Agar tidak ada kebutuhan include header",
            "Agar menghindari copy data yang tidak perlu",
            "Agar hanya bekerja pada angka"
          ],
          answerIndex: 2,
          explanation: "Reference menghindari copy, dan `const` menjaga item tidak berubah."
        }
      ],
      miniProject: {
        title: "Student Grade & Progress Tracker",
        summary:
          "Buat program terminal C++ untuk menyimpan daftar nilai atau progress siswa menggunakan class dan STL container.",
        deliverables: [
          "Class untuk menyimpan identitas siswa.",
          "Vector atau map untuk data progress atau nilai.",
          "Function untuk menambah data dan menampilkan ringkasan.",
          "Output console yang rapi dan mudah dibaca."
        ],
        stretchGoals: [
          "Tambahkan perhitungan rata-rata atau status lulus.",
          "Pisahkan deklarasi class ke file header ketika siap melangkah lebih lanjut."
        ],
        starterTips: [
          "Mulai dari satu class sederhana sebelum menambah banyak fitur.",
          "Gunakan STL lebih dulu, lalu pelajari optimasi setelah logika dasar selesai."
        ]
      }
    }
  ];

  const referenceCategories = [
    {
      id: "html-tags",
      title: "HTML Tags",
      language: "html",
      items: [
        {
          name: "<main>",
          description: "Menandai konten utama halaman yang unik untuk dokumen tersebut.",
          syntax: "<main>...</main>",
          example: "<main>\n  <h1>Dashboard Belajar</h1>\n</main>",
          notes: "Biasanya hanya ada satu `<main>` dalam satu halaman.",
          mistakes: "Menggunakan `<main>` di dalam `<article>` atau diulang beberapa kali."
        },
        {
          name: "<section>",
          description: "Mengelompokkan konten bertema yang biasanya memiliki heading.",
          syntax: "<section aria-labelledby=\"id-heading\">...</section>",
          example: "<section aria-labelledby=\"module-title\">\n  <h2 id=\"module-title\">Modul HTML</h2>\n</section>",
          notes: "Cocok untuk blok konten yang memang punya konteks sendiri.",
          mistakes: "Menggunakan `<section>` sebagai pembungkus umum tanpa heading atau konteks."
        },
        {
          name: "<form>",
          description: "Membungkus kumpulan kontrol input untuk mengirim data.",
          syntax: "<form action=\"/submit\" method=\"post\">...</form>",
          example: "<form>\n  <input type=\"email\" required>\n  <button type=\"submit\">Kirim</button>\n</form>",
          notes: "Gunakan label dan validasi dasar agar form lebih usable.",
          mistakes: "Mengandalkan placeholder sebagai satu-satunya penjelasan field."
        },
        {
          name: "<img>",
          description: "Menampilkan gambar pada halaman.",
          syntax: "<img src=\"path.jpg\" alt=\"Deskripsi gambar\">",
          example: "<img src=\"hero.jpg\" alt=\"Ilustrasi developer belajar coding\">",
          notes: "Atribut `alt` wajib untuk aksesibilitas kecuali gambar dekoratif murni.",
          mistakes: "Mengosongkan `alt` pada gambar yang sebenarnya penting."
        },
        {
          name: "<table>",
          description: "Menampilkan data dalam format baris dan kolom.",
          syntax: "<table>\n  <thead>...</thead>\n  <tbody>...</tbody>\n</table>",
          example: "<table>\n  <caption>Progress Mingguan</caption>\n  <tbody>\n    <tr><td>HTML</td><td>80%</td></tr>\n  </tbody>\n</table>",
          notes: "Tambahkan `caption` dan header kolom agar lebih jelas.",
          mistakes: "Menggunakan table untuk layout card atau layout halaman."
        }
      ]
    },
    {
      id: "css-properties",
      title: "CSS Properties",
      language: "css",
      items: [
        {
          name: "display",
          description: "Menentukan jenis layout box sebuah elemen.",
          syntax: "display: block | inline | flex | grid;",
          example: ".toolbar {\n  display: flex;\n}",
          notes: "Gunakan `flex` untuk layout satu dimensi dan `grid` untuk dua dimensi.",
          mistakes: "Mengganti `display` tanpa memahami efek samping pada layout dan child elements."
        },
        {
          name: "gap",
          description: "Memberi jarak antar item pada flex atau grid container.",
          syntax: "gap: 1rem;",
          example: ".card-grid {\n  display: grid;\n  gap: 1rem;\n}",
          notes: "Lebih konsisten dibanding memberi margin manual pada setiap item.",
          mistakes: "Masih menambah margin rumit di setiap child padahal gap sudah cukup."
        },
        {
          name: "grid-template-columns",
          description: "Menentukan struktur kolom pada grid container.",
          syntax: "grid-template-columns: repeat(3, 1fr);",
          example: ".layout {\n  display: grid;\n  grid-template-columns: 260px minmax(0, 1fr);\n}",
          notes: "Gunakan `minmax(0, 1fr)` untuk membantu mencegah overflow.",
          mistakes: "Menulis ukuran tetap terlalu banyak tanpa memikirkan layar kecil."
        },
        {
          name: "@media",
          description: "Mengubah style berdasarkan kondisi seperti lebar layar.",
          syntax: "@media (max-width: 768px) { ... }",
          example: "@media (max-width: 768px) {\n  .layout { grid-template-columns: 1fr; }\n}",
          notes: "Fokus pada breakpoint yang relevan terhadap konten, bukan device tertentu saja.",
          mistakes: "Membuat terlalu banyak breakpoint acak yang sulit dirawat."
        },
        {
          name: "--custom-property",
          description: "CSS variable untuk menyimpan nilai reusable.",
          syntax: ":root { --primary: #1766ff; }",
          example: ".button {\n  background: var(--primary);\n}",
          notes: "Sangat membantu untuk theming dan design tokens.",
          mistakes: "Memberi nama variable yang terlalu generik seperti `--blue1` tanpa konteks."
        }
      ]
    },
    {
      id: "js-builtins",
      title: "JavaScript Built-in Functions",
      language: "javascript",
      items: [
        {
          name: "Array.prototype.map()",
          description: "Membuat array baru dari hasil transformasi tiap item.",
          syntax: "array.map((item) => transformedItem)",
          example: "const names = modules.map((module) => module.title);",
          notes: "Cocok untuk merender data atau mengubah bentuk object.",
          mistakes: "Memakai `map()` padahal ingin mencari satu item atau filtering."
        },
        {
          name: "Array.prototype.find()",
          description: "Mengambil item pertama yang memenuhi kondisi.",
          syntax: "array.find((item) => condition)",
          example: "const current = modules.find((module) => module.id === 'python');",
          notes: "Return-nya bisa `undefined` jika tidak ada yang cocok.",
          mistakes: "Tidak mengecek hasil `undefined` sebelum memakai data."
        },
        {
          name: "fetch()",
          description: "Mengirim request HTTP dari browser.",
          syntax: "fetch('/api/modules')",
          example: "const response = await fetch('/api/modules');",
          notes: "Selalu cek `response.ok` sebelum membaca JSON.",
          mistakes: "Menganggap fetch otomatis gagal untuk semua status 4xx/5xx."
        },
        {
          name: "JSON.parse()",
          description: "Mengubah string JSON menjadi object JavaScript.",
          syntax: "JSON.parse(text)",
          example: "const state = JSON.parse(localStorage.getItem('state'));",
          notes: "Taruh di `try...catch` jika sumber datanya tidak pasti valid.",
          mistakes: "Memanggil `JSON.parse` pada nilai `null` atau string biasa."
        },
        {
          name: "addEventListener()",
          description: "Mendaftarkan event handler ke elemen atau objek tertentu.",
          syntax: "element.addEventListener('click', handler)",
          example: "button.addEventListener('click', saveProgress);",
          notes: "Pisahkan handler ke function tersendiri jika logic mulai panjang.",
          mistakes: "Menambahkan listener berulang kali tanpa perlu sehingga event terpanggil berkali-kali."
        }
      ]
    },
    {
      id: "python-builtins",
      title: "Python Built-in Functions",
      language: "python",
      items: [
        {
          name: "len()",
          description: "Menghitung jumlah item pada string, list, tuple, dan container lain.",
          syntax: "len(value)",
          example: "total_modules = len(modules)",
          notes: "Sangat sering dipakai untuk validasi input atau iterasi.",
          mistakes: "Menggunakan `len` pada integer yang bukan iterable."
        },
        {
          name: "range()",
          description: "Menghasilkan deret angka untuk iterasi.",
          syntax: "range(start, stop, step)",
          example: "for index in range(3):\n    print(index)",
          notes: "`stop` tidak termasuk dalam hasil akhir.",
          mistakes: "Mengira `range(3)` menghasilkan 1,2,3 padahal hasilnya 0,1,2."
        },
        {
          name: "enumerate()",
          description: "Memberi indeks sekaligus nilai saat iterasi.",
          syntax: "enumerate(iterable, start=0)",
          example: "for index, module in enumerate(modules, start=1):\n    print(index, module)",
          notes: "Lebih rapi daripada mengelola counter manual.",
          mistakes: "Masih membuat variable index manual padahal enumerate sudah cukup."
        },
        {
          name: "sum()",
          description: "Menjumlahkan item numerik dalam iterable.",
          syntax: "sum(iterable)",
          example: "total_score = sum(scores)",
          notes: "Bisa dipadukan dengan generator expression.",
          mistakes: "Menggunakan pada list string atau object yang bukan numerik."
        },
        {
          name: "open()",
          description: "Membuka file untuk dibaca atau ditulis.",
          syntax: "open(path, mode, encoding='utf-8')",
          example: "with open('notes.txt', 'r', encoding='utf-8') as file:\n    content = file.read()",
          notes: "Gunakan dengan `with` agar file tertutup otomatis.",
          mistakes: "Tidak menentukan encoding pada file teks."
        }
      ]
    },
    {
      id: "python-stdlib",
      title: "Python Standard Library Dasar",
      language: "python",
      items: [
        {
          name: "pathlib",
          description: "Modul modern untuk bekerja dengan path dan file system.",
          syntax: "from pathlib import Path",
          example: "notes = Path('notes.txt')\nnotes.write_text('Halo', encoding='utf-8')",
          notes: "API lebih bersih dan lintas platform dibanding manipulasi string path manual.",
          mistakes: "Masih menggabungkan path dengan string `\"/\"` secara manual."
        },
        {
          name: "json",
          description: "Membaca dan menulis data JSON.",
          syntax: "import json",
          example: "payload = json.loads(text)\ntext = json.dumps(payload)",
          notes: "Cocok untuk config, API response, atau penyimpanan sederhana.",
          mistakes: "Menganggap semua object Python langsung kompatibel dengan JSON."
        },
        {
          name: "datetime",
          description: "Bekerja dengan tanggal dan waktu.",
          syntax: "from datetime import datetime",
          example: "timestamp = datetime.utcnow().isoformat()",
          notes: "Gunakan format ISO untuk penyimpanan dan transfer data yang konsisten.",
          mistakes: "Mencampur timezone-aware dan naive datetime tanpa pertimbangan."
        },
        {
          name: "collections.Counter",
          description: "Menghitung frekuensi item dengan cepat.",
          syntax: "from collections import Counter",
          example: "language_count = Counter(['html', 'css', 'html'])",
          notes: "Sangat membantu untuk summary data dan statistik sederhana.",
          mistakes: "Menulis loop manual panjang untuk menghitung frekuensi item."
        }
      ]
    },
    {
      id: "cpp-syntax",
      title: "C++ Basic Syntax",
      language: "cpp",
      items: [
        {
          name: "#include",
          description: "Memasukkan deklarasi dari header library yang dibutuhkan.",
          syntax: "#include <iostream>",
          example: "#include <iostream>\n#include <vector>",
          notes: "Header menentukan fitur library apa yang tersedia untuk file tersebut.",
          mistakes: "Menggunakan `std::vector` tanpa meng-include `<vector>`."
        },
        {
          name: "if / else",
          description: "Percabangan untuk menjalankan blok kode berdasarkan kondisi.",
          syntax: "if (condition) { ... } else { ... }",
          example: "if (score >= 80) {\n    std::cout << \"Lulus\";\n}",
          notes: "Gunakan tanda kurung kurawal agar blok lebih aman dan jelas.",
          mistakes: "Lupa memakai `==` ketika membandingkan nilai."
        },
        {
          name: "for loop",
          description: "Loop terstruktur untuk iterasi yang jumlahnya diketahui atau terkontrol.",
          syntax: "for (int i = 0; i < total; ++i) { ... }",
          example: "for (int i = 0; i < 5; ++i) {\n    std::cout << i;\n}",
          notes: "Perhatikan inisialisasi, kondisi berhenti, dan increment.",
          mistakes: "Salah batas iterasi sehingga terjadi off-by-one."
        },
        {
          name: "function",
          description: "Blok kode reusable dengan parameter dan return type.",
          syntax: "int add(int a, int b) { return a + b; }",
          example: "double average(double total, int count) {\n    return total / count;\n}",
          notes: "Tuliskan return type yang sesuai dengan hasil function.",
          mistakes: "Lupa mengembalikan nilai pada function non-void."
        },
        {
          name: "pointer",
          description: "Variable yang menyimpan alamat memori.",
          syntax: "int* ptr = &value;",
          example: "int value = 10;\nint* ptr = &value;\nstd::cout << *ptr;",
          notes: "Gunakan pointer dengan hati-hati dan pahami dereference.",
          mistakes: "Melakukan dereference pointer yang belum valid."
        }
      ]
    },
    {
      id: "cpp-stl",
      title: "C++ STL Dasar",
      language: "cpp",
      items: [
        {
          name: "std::vector",
          description: "Container array dinamis yang paling sering dipakai.",
          syntax: "std::vector<int> values;",
          example: "std::vector<int> scores = {80, 90, 75};\nscores.push_back(88);",
          notes: "Cocok untuk data berurutan yang ukurannya bisa berubah.",
          mistakes: "Masih memakai array statis untuk semua kasus padahal vector lebih aman."
        },
        {
          name: "std::map",
          description: "Container key-value terurut berdasarkan key.",
          syntax: "std::map<std::string, int> progress;",
          example: "std::map<std::string, int> progress;\nprogress[\"html\"] = 100;",
          notes: "Gunakan `find()` jika tidak ingin key baru terbentuk otomatis saat akses.",
          mistakes: "Mengakses key dengan operator `[]` tanpa sadar menambah entry baru."
        },
        {
          name: "std::sort",
          description: "Algoritma STL untuk mengurutkan range data.",
          syntax: "std::sort(values.begin(), values.end());",
          example: "std::sort(scores.begin(), scores.end());",
          notes: "Butuh header `<algorithm>`.",
          mistakes: "Lupa include `<algorithm>` atau memberi iterator yang salah."
        },
        {
          name: "std::string",
          description: "Representasi string modern di C++.",
          syntax: "std::string name = \"Alya\";",
          example: "std::string title = \"Coding Hub\";\nstd::cout << title.size();",
          notes: "Lebih nyaman dibanding C-style string untuk kebanyakan kasus dasar.",
          mistakes: "Mencampur C-string dan std::string tanpa memahami konversinya."
        }
      ]
    }
  ];

  const practiceProjects = {
    html: [
      {
        title: "Personal Profile Page",
        level: "Beginner",
        outcome: "Menyusun struktur profil diri dengan semantic HTML, heading hierarchy, dan tautan sosial.",
        focus: "Semantic tags, lists, image alt, sectioning."
      },
      {
        title: "Landing Page",
        level: "Beginner",
        outcome: "Membuat satu halaman promosi dengan hero, feature section, CTA, dan form.",
        focus: "Page structure, forms, table/media opsional."
      }
    ],
    css: [
      {
        title: "Responsive Card",
        level: "Beginner",
        outcome: "Membuat card komponen yang rapi di berbagai ukuran layar.",
        focus: "Box model, spacing, hover, responsive tweaks."
      },
      {
        title: "Layout Grid",
        level: "Intermediate",
        outcome: "Membangun dashboard sederhana dengan sidebar dan grid konten.",
        focus: "Grid layout, media query, card system."
      }
    ],
    javascript: [
      {
        title: "Todo List",
        level: "Intermediate",
        outcome: "Aplikasi task manager kecil dengan state, DOM rendering, dan localStorage.",
        focus: "Array, events, rendering, localStorage."
      },
      {
        title: "Calculator",
        level: "Beginner",
        outcome: "Kalkulator interaktif untuk melatih event handling dan logic branching.",
        focus: "Functions, condition, input parsing."
      },
      {
        title: "Form Validation",
        level: "Intermediate",
        outcome: "Validasi field input sebelum dikirim agar UX lebih baik.",
        focus: "DOM, events, condition, feedback UI."
      }
    ],
    python: [
      {
        title: "CLI Calculator",
        level: "Beginner",
        outcome: "Script terminal untuk operasi aritmetika dasar dengan error handling sederhana.",
        focus: "Function, condition, input parsing."
      },
      {
        title: "File Manager Sederhana",
        level: "Intermediate",
        outcome: "Program untuk membuat, membaca, dan menghapus file teks lokal.",
        focus: "Pathlib, file handling, validation."
      },
      {
        title: "Web API Sederhana",
        level: "Intermediate",
        outcome: "Endpoint JSON kecil untuk daftar modul atau progress.",
        focus: "Flask route, JSON response, request validation."
      }
    ],
    cpp: [
      {
        title: "Calculator",
        level: "Beginner",
        outcome: "Program terminal kalkulator untuk melatih operator dan function.",
        focus: "Condition, switch, function."
      },
      {
        title: "Array Manager",
        level: "Intermediate",
        outcome: "Mengelola kumpulan angka lalu menghitung statistik sederhana.",
        focus: "Vector, loop, aggregation."
      },
      {
        title: "OOP Class Example",
        level: "Intermediate",
        outcome: "Memodelkan object sederhana dengan class dan method.",
        focus: "Constructor, method, encapsulation."
      }
    ]
  };

  const roadmaps = [
    {
      id: "frontend",
      title: "Frontend Developer",
      level: "Beginner to Advanced",
      summary: "Fokus pada UI, UX, responsivitas, aksesibilitas, dan integrasi data di browser.",
      phases: [
        {
          phase: "Phase 1",
          title: "Structure & Style",
          details: [
            "Kuasai HTML semantic, forms, dan accessibility dasar.",
            "Pelajari CSS layout, responsive design, dan design tokens."
          ]
        },
        {
          phase: "Phase 2",
          title: "Interactivity",
          details: [
            "Gunakan JavaScript untuk DOM, events, dan local state.",
            "Bangun mini project seperti todo list dan calculator."
          ]
        },
        {
          phase: "Phase 3",
          title: "Production UI",
          details: [
            "Belajar API integration, performance, testing dasar, dan component thinking.",
            "Mulai dokumentasi komponen dan style system."
          ]
        }
      ],
      milestones: ["Portfolio landing page", "Dashboard UI", "Accessible form flow"]
    },
    {
      id: "backend",
      title: "Backend Developer",
      level: "Beginner to Advanced",
      summary: "Bangun API, validasi data, business logic, storage, logging, dan deployment server-side.",
      phases: [
        {
          phase: "Phase 1",
          title: "Python Basics",
          details: [
            "Kuasai syntax Python, function, file handling, dan data structure.",
            "Biasakan error handling dan penulisan script modular."
          ]
        },
        {
          phase: "Phase 2",
          title: "API Fundamentals",
          details: [
            "Bangun endpoint GET dan POST dengan Flask atau FastAPI.",
            "Pelajari request validation, JSON response, dan status code."
          ]
        },
        {
          phase: "Phase 3",
          title: "Deployment & Security",
          details: [
            "Kelola environment variable, logging aman, dan konfigurasi production.",
            "Pahami autentikasi, database, dan observability dasar."
          ]
        }
      ],
      milestones: ["Simple REST API", "Progress tracking service", "Deployable backend app"]
    },
    {
      id: "fullstack",
      title: "Full Stack Developer",
      level: "Beginner to Advanced",
      summary: "Gabungkan kemampuan frontend dan backend agar bisa membangun produk end-to-end.",
      phases: [
        {
          phase: "Phase 1",
          title: "Frontend Core",
          details: [
            "Bangun halaman statis yang rapi dan responsif.",
            "Pahami state, events, dan reusable UI patterns."
          ]
        },
        {
          phase: "Phase 2",
          title: "Backend Integration",
          details: [
            "Hubungkan frontend ke API untuk membaca dan mengirim data.",
            "Tangani loading, error, dan validation secara konsisten."
          ]
        },
        {
          phase: "Phase 3",
          title: "Scalable Product Thinking",
          details: [
            "Rancang struktur folder, deployment, security, dan maintainability.",
            "Tambahkan analytics, auth, dan persistence ketika produk bertumbuh."
          ]
        }
      ],
      milestones: ["Interactive learning app", "Integrated API flow", "Deployable portfolio project"]
    },
    {
      id: "python-dev",
      title: "Python Developer",
      level: "Beginner to Intermediate",
      summary: "Cocok untuk jalur scripting, automation, backend sederhana, dan fondasi data tooling.",
      phases: [
        {
          phase: "Phase 1",
          title: "Syntax & Data",
          details: [
            "Fokus pada variable, list/dict, loop, dan function.",
            "Biasakan menulis script kecil yang langsung berguna."
          ]
        },
        {
          phase: "Phase 2",
          title: "Files & Modules",
          details: [
            "Kelola file lokal, config, dan struktur project modular.",
            "Bangun tools CLI sederhana untuk latihan."
          ]
        },
        {
          phase: "Phase 3",
          title: "Web Introduction",
          details: [
            "Kenali Flask/FastAPI dan dasar pembuatan endpoint JSON.",
            "Pelajari validasi request, logging, dan deployment ringan."
          ]
        }
      ],
      milestones: ["CLI utility", "File-based tracker", "Minimal JSON API"]
    },
    {
      id: "cpp-basic",
      title: "C++ Basic Programmer",
      level: "Beginner to Intermediate",
      summary: "Menguatkan logika, memory awareness, OOP dasar, dan struktur data melalui C++.",
      phases: [
        {
          phase: "Phase 1",
          title: "Core Syntax",
          details: [
            "Pelajari variable, input/output, condition, dan loop.",
            "Biasakan compile-run-debug di terminal."
          ]
        },
        {
          phase: "Phase 2",
          title: "Functions & Memory Basics",
          details: [
            "Kuasai function, array, dan pointer dasar.",
            "Pahami hubungan nilai, alamat, dan reference sederhana."
          ]
        },
        {
          phase: "Phase 3",
          title: "OOP & STL",
          details: [
            "Bangun class kecil dan gunakan vector/map untuk data.",
            "Mulai berpikir soal struktur data dan performa."
          ]
        }
      ],
      milestones: ["Console calculator", "Array/vector manager", "Progress tracker class"]
    }
  ];

  const playgroundTemplates = {
    web: {
      html: "<main class=\"playground-app\">\n  <section class=\"hero-card\">\n    <p class=\"eyebrow\">Playground Demo</p>\n    <h1>Belajar coding sambil mencoba langsung</h1>\n    <p>Edit HTML, CSS, dan JavaScript di panel kiri, lalu jalankan preview.</p>\n    <button id=\"demoButton\">Klik untuk interaksi</button>\n    <p id=\"demoOutput\">Belum ada interaksi.</p>\n  </section>\n</main>",
      css: "body {\n  margin: 0;\n  font-family: 'Segoe UI', sans-serif;\n  background: linear-gradient(135deg, #08101f, #12213f);\n  color: #f8fbff;\n}\n\n.playground-app {\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  padding: 2rem;\n}\n\n.hero-card {\n  width: min(100%, 720px);\n  padding: 2rem;\n  border-radius: 24px;\n  background: rgba(255, 255, 255, 0.08);\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n\nbutton {\n  border: 0;\n  border-radius: 999px;\n  padding: 0.85rem 1.1rem;\n  background: #18d7a4;\n  color: #052222;\n  font-weight: 700;\n}",
      js: "const button = document.querySelector('#demoButton');\nconst output = document.querySelector('#demoOutput');\n\nbutton.addEventListener('click', () => {\n  output.textContent = 'JavaScript berhasil dijalankan. Coba ubah teks ini!';\n});"
    },
    python: {
      code: "def calculate_progress(completed, total):\n    if total == 0:\n        return 0\n    return round((completed / total) * 100)\n\nmodules_done = 7\ntotal_modules = 10\n\nprint(f'Progress: {calculate_progress(modules_done, total_modules)}%')",
      output: "Progress: 70%",
      explanation:
        "Template ini menunjukkan function sederhana, condition, dan f-string. Di browser ini hanya disimulasikan, jadi gunakan terminal Python untuk eksekusi nyata."
    },
    cpp: {
      code: "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> scores = {80, 90, 75};\n    int total = 0;\n\n    for (int score : scores) {\n        total += score;\n    }\n\n    std::cout << \"Total score: \" << total << std::endl;\n    return 0;\n}",
      output: "Total score: 245",
      explanation:
        "Template ini menunjukkan penggunaan vector, range-based loop, dan output console. Untuk menjalankan kode asli, compile dengan g++ di terminal."
    }
  };

  const languageOrder = ["html", "css", "javascript", "python", "cpp"];

  const moduleLookup = Object.fromEntries(modules.map((module) => [module.id, module]));

  const catalogItems = modules.flatMap((module) => {
    const topicItems = module.concepts.map((concept) => ({
      id: concept.id,
      language: module.id,
      level: concept.level,
      type: "Topic",
      title: `${module.title}: ${concept.title}`,
      description: concept.summary,
      destination: module.id
    }));

    const exerciseItems = module.exercises.map((exercise) => ({
      id: exercise.id,
      language: module.id,
      level: exercise.level,
      type: "Exercise",
      title: `${module.title}: ${exercise.title}`,
      description: exercise.instructions,
      destination: module.id
    }));

    const projectItem = {
      id: `${module.id}-mini-project`,
      language: module.id,
      level: module.level,
      type: "Mini Project",
      title: `${module.title}: ${module.miniProject.title}`,
      description: module.miniProject.summary,
      destination: module.id
    };

    return [...topicItems, ...exerciseItems, projectItem];
  }).concat(
    languageOrder.flatMap((language) =>
      (practiceProjects[language] || []).map((project, index) => ({
        id: `${language}-practice-${index + 1}`,
        language,
        level: project.level,
        type: "Practice Project",
        title: `${moduleLookup[language].title}: ${project.title}`,
        description: project.outcome,
        destination: language
      }))
    )
  );

  modules.forEach((module) => {
    module.checklist = [
      ...module.concepts.map((concept) => ({
        id: `${module.id}:${concept.id}`,
        label: concept.title,
        section: "Konsep"
      })),
      ...module.exercises.map((exercise) => ({
        id: `${module.id}:${exercise.id}`,
        label: exercise.title,
        section: "Latihan"
      })),
      {
        id: `${module.id}:mini-project`,
        label: module.miniProject.title,
        section: "Mini Project"
      }
    ];
  });

  return {
    modules,
    moduleLookup,
    referenceCategories,
    roadmaps,
    practiceProjects,
    playgroundTemplates,
    catalogItems,
    languageOrder
  };
})();
