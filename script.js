document.addEventListener('DOMContentLoaded', function() {
    const cameraMotions = {
        "Common": {
            "Static Shot": "Gambar Diam",
            "Pan Left": "Geser Kiri",
            "Pan Right": "Geser Kanan",
            "Tilt Up": "Miring ke Atas",
            "Tilt Down": "Miring ke Bawah",
            "Dolly In": "Maju",
            "Dolly Out": "Mundur",
            "Zoom In": "Perbesar",
            "Zoom Out": "Perkecil",
            "Tracking Shot": "Gambar Mengikuti",
            "Handheld": "Kamera Genggam"
        },
        "Higgsfield.ai": {
            "3D Rotation": "Rotasi 3D",
            "360 Orbit": "Orbit 360",
            "Action Run": "Lari Aksi",
            "Agent Reveal": "Penampakan Agen",
            "Angel Wings": "Sayap Malaikat",
            "Arc Left": "Lengkung ke Kiri",
            "Arc Right": "Lengkung ke Kanan",
            "Bloom Mouth": "Mulut Mekar",
            "Buckle Up": "Kencangkan Sabuk",
            "Bullet Time": "Waktu Peluru",
            "Car Chasing": "Pengejaran Mobil",
            "Car Explosion": "Ledakan Mobil",
            "Car Grip": "Cengkeraman Mobil",
            "Crane Down": "Derek Turun",
            "Crane Over The Head": "Derek di Atas Kepala",
            "Crash Zoom In": "Zoom Cepat Masuk",
            "Crash Zoom Out": "Zoom Cepat Keluar",
            "Datamosh": "Datamosh",
            "Dirty Lens": "Lensa Kotor",
            "Disintegration": "Disintegrasi",
            "Dolly Left": "Geser ke Kiri",
            "Dolly Right": "Geser ke Kanan",
            "Dolly Zoom In": "Dolly Zoom Masuk",
            "Dolly Zoom Out": "Dolly Zoom Keluar",
            "Double Dolly": "Dolly Ganda",
            "Dutch Angle": "Sudut Belanda",
            "Eyes In": "Mata Masuk",
            "Face Punch": "Pukulan Wajah",
            "Fisheye": "Mata Ikan",
            "Floating Fish": "Ikan Melayang",
            "Flood": "Banjir",
            "Floral Eyes": "Mata Bunga",
            "Flying": "Terbang",
            "Focus Change": "Perubahan Fokus",
            "FPV Drone": "Drone FPV",
            "Garden Bloom": "Taman Mekar",
            "General": "Umum",
            "Glam": "Glamor",
            "Glowshift": "Pergeseran Cahaya",
            "Head Explosion": "Ledakan Kepala",
            "Head Tracking": "Pelacakan Kepala",
            "Hyperlapse": "Hyperlapse",
            "Incline": "Miring",
            "Invisible": "Tak Terlihat",
            "Jelly Drift": "Jelly Drift",
            "Jib Down": "Jib Turun",
            "Jib Up": "Jib Naik",
            "Kiss": "Ciuman",
            "Lazy Susan": "Lazy Susan",
            "Lens Crack": "Lensa Retak",
            "Lens Flare": "Suar Lensa",
            "Levitation": "Levitasi",
            "Low Shutter": "Shutter Rendah",
            "Medusa Gorgona": "Medusa Gorgona",
            "Melting": "Meleleh",
            "Morphskin": "Kulit Berubah",
            "Mouth In": "Mulut Masuk",
            "Push To Glass": "Dorong ke Kaca",
            "Rap Flex": "Gaya Rap",
            "Robo Arm": "Lengan Robot",
            "Set on Fire": "Terbakar",
            "Skin Surge": "Gelombang Kulit",
            "Snorricam": "Snorricam",
            "Soul Jump": "Lompatan Jiwa",
            "Static": "Statis",
            "Super Dolly In": "Super Dolly Masuk",
            "Super Dolly Out": "Super Dolly Keluar",
            "Symbiote": "Simbiosis",
            "Tentacles": "Tentakel",
            "Thunder God": "Dewa Petir",
            "Timelapse Human": "Timelapse Manusia",
            "Timelapse Landscape": "Timelapse Lanskap",
            "Turning Metal": "Logam Berputar",
            "Whip Pan": "Whip Pan",
            "Wiggle": "Goyangan",
            "Wind to Face": "Angin ke Wajah",
            "YoYo Zoom": "YoYo Zoom"
        }
    };

    const cameraSelect = document.getElementById('kamera');

    for (const category in cameraMotions) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category === "Common" ? "Gerakan Umum" : "Gerakan Higgsfield.ai";
        for (const [en, id] of Object.entries(cameraMotions[category])) {
            const option = document.createElement('option');
            option.value = en;
            option.textContent = `${en} (${id})`;
            optgroup.appendChild(option);
        }
        cameraSelect.appendChild(optgroup);
    }

    document.getElementById('generate-btn').addEventListener('click', function() {
        const getVal = (id) => document.getElementById(id).value;

        const fields = {
            judul: getVal('judul'),
            karakter: getVal('karakter'),
            suara: getVal('suara'),
            aksi: getVal('aksi'),
            ekspresi: getVal('ekspresi'),
            latar: getVal('latar'),
            visual: getVal('visual'),
            kamera: getVal('kamera'),
            suasana: getVal('suasana'),
            ambience: getVal('ambience'),
            dialog: getVal('dialog'),
            negatif: getVal('negatif')
        };

        // --- Indonesian Prompt Generation (Detailed & Narrative) ---
        let promptID = `Sebuah video sinematik dengan judul "${fields.judul}".\n\n`;
        promptID += `**Karakter Konsisten:**\n${fields.karakter}\n\n`;
        promptID += `**Detail Suara Karakter:**\n${fields.suara}\n\n`;
        promptID += `**Deskripsi Adegan:**\nKarakter utama sedang ${fields.aksi} dengan ekspresi ${fields.ekspresi}. Adegan berlatar di ${fields.latar}, menciptakan suasana keseluruhan yang ${fields.suasana}. Detail visual penting lainnya termasuk ${fields.visual}. Gerakan kamera yang digunakan adalah ${fields.kamera} untuk menambah kesan sinematik.\n\n`;
        promptID += `**Audio:**\nSuara lingkungan yang terdengar adalah ${fields.ambience}. Karakter mengucapkan dialog berikut dalam Bahasa Indonesia: "${fields.dialog}".\n\n`;
        promptID += `**Hindari (Negative Prompt):**\n${fields.negatif}`;
        
        document.getElementById('output-id').value = promptID;
        
        // --- English Prompt Generation (Detailed & Narrative) ---
        let promptEN = `A cinematic, photorealistic 4K video titled "${fields.judul}".\n\n`;
        promptEN += `**Consistent Character:**\n${fields.karakter}\n\n`;
        promptEN += `**Character Voice Details:**\n${fields.suara}\n\n`;
        promptEN += `**Scene Description:**\nThe main character is ${fields.aksi}, showing an expression of ${fields.ekspresi}. The scene is set in/at ${fields.latar}, creating an overall atmosphere that is ${fields.suasana}. Other key visual details include ${fields.visual}. A ${fields.kamera} camera movement is used for a cinematic feel.\n\n`;
        promptEN += `**Audio:**\nThe ambient sound consists of ${fields.ambience}. The character speaks the following dialogue in Indonesian (ensure the voice is natural and matches the character's description): "${fields.dialog}".\n\n`;
        promptEN += `**Avoid (Negative Prompt):**\n${fields.negatif}`;

        document.getElementById('output-en').textContent = promptEN;
    });

    document.getElementById('reset-btn').addEventListener('click', function() {
        const formElements = document.querySelectorAll('.form-container input, .form-container textarea, .form-container select');
        formElements.forEach(el => {
            if (el.tagName === 'SELECT') {
                el.selectedIndex = 0;
            } else {
                el.value = '';
            }
        });

        document.getElementById('output-id').value = '';
        document.getElementById('output-en').textContent = '';
    });
}); 
