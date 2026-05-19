MODULES_DATA = [
    {
        "id": "html",
        "title": "HTML",
        "level": "Beginner",
        "estimated_time": "4-6 jam",
        "summary": "Struktur dasar, semantic tags, forms, tables, media, dan accessibility dasar.",
    },
    {
        "id": "css",
        "title": "CSS",
        "level": "Beginner",
        "estimated_time": "5-7 jam",
        "summary": "Selector, box model, flexbox, grid, variables, animation, dan responsive design.",
    },
    {
        "id": "javascript",
        "title": "JavaScript",
        "level": "Intermediate",
        "estimated_time": "6-8 jam",
        "summary": "Variable, function, array, object, DOM, event, fetch API, async/await, localStorage, error handling.",
    },
    {
        "id": "python",
        "title": "Python",
        "level": "Beginner",
        "estimated_time": "6-8 jam",
        "summary": "Variable, data type, condition, loop, function, file handling, OOP, module, Flask/FastAPI intro.",
    },
    {
        "id": "cpp",
        "title": "C++",
        "level": "Beginner",
        "estimated_time": "6-8 jam",
        "summary": "Variable, data type, loop, function, array, pointer dasar, class, OOP, STL vector/map.",
    },
]

QUIZ_DATA = {
    "html": [
        {
            "question": "Apa fungsi `<!doctype html>`?",
            "options": [
                "Mode standar HTML5",
                "Menghubungkan file CSS",
                "Membuat heading utama",
                "Menambahkan JavaScript",
            ],
            "answer_index": 0,
        },
        {
            "question": "Tag utama untuk konten utama halaman adalah...",
            "options": ["<main>", "<div>", "<aside>", "<small>"],
            "answer_index": 0,
        },
    ],
    "css": [
        {
            "question": "Properti mana yang paling tepat untuk jarak antar item grid?",
            "options": ["margin-left", "gap", "padding", "transform"],
            "answer_index": 1,
        },
        {
            "question": "Grid paling cocok untuk layout...",
            "options": ["dua dimensi", "teks inline", "meta tag", "request API"],
            "answer_index": 0,
        },
    ],
    "javascript": [
        {
            "question": "Method array untuk transform data adalah...",
            "options": ["map()", "push()", "shift()", "join()"],
            "answer_index": 0,
        },
        {
            "question": "Mengapa `response.ok` perlu dicek setelah fetch?",
            "options": [
                "Karena fetch auto-throw semua error HTTP",
                "Karena status 4xx/5xx tetap bisa resolve",
                "Karena JSON.parse butuh itu",
                "Karena await tidak bisa tanpa itu",
            ],
            "answer_index": 1,
        },
    ],
    "python": [
        {
            "question": "Struktur data key-value di Python adalah...",
            "options": ["list", "tuple", "dictionary", "set"],
            "answer_index": 2,
        },
        {
            "question": "Kegunaan `with open(...)` adalah...",
            "options": [
                "Membuat file terenkripsi",
                "Menutup file otomatis",
                "Mengubah file jadi JSON",
                "Menjalankan Flask",
            ],
            "answer_index": 1,
        },
    ],
    "cpp": [
        {
            "question": "Container dinamis yang umum dipakai di STL adalah...",
            "options": ["std::vector", "int[5]", "char*", "std::cout"],
            "answer_index": 0,
        },
        {
            "question": "Apa arti `int* ptr`?",
            "options": ["array int", "pointer ke int", "function int", "class int"],
            "answer_index": 1,
        },
    ],
}
