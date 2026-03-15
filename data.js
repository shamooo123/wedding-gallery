// ════════════════════════════════════════════════════
//  SARA & SHAN — WEDDING GALLERY  ·  data.js
//  Edit this file to add your videos and photos.
// ════════════════════════════════════════════════════
//
//  ── HOW TO ADD VIDEOS ──────────────────────────────
//
//  OPTION A: YouTube (BEST — free, HD, no size limits)
//    1. Upload your video to YouTube.com
//    2. Set visibility to "Unlisted" (so only people with the link can see)
//    3. Copy the video URL, e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ
//    4. Paste it as the "url" below. The site handles the rest automatically.
//
//  OPTION B: Google Drive (also works)
//    1. Upload your .mp4 to Google Drive
//    2. Right-click → Share → "Anyone with the link" → Copy link
//    3. Paste the link (e.g. https://drive.google.com/file/d/XXXXX/view?usp=sharing)
//    4. Paste it as the "url" below.
//    NOTE: Google Drive may block playback for large files with many views.
//
//  OPTION C: Vimeo (paid, but best quality)
//    Just paste the Vimeo URL (https://vimeo.com/123456789)
//
//  OPTION D: Direct MP4 link (from any hosting — e.g. Cloudflare R2, AWS S3)
//    Paste the direct .mp4 URL.
//
//  ── HOW TO ADD PHOTOS ──────────────────────────────
//
//  OPTION A: Host on GitHub (free & simple)
//    1. Create a free GitHub account at github.com
//    2. Create a repository called "wedding-photos"
//    3. Upload your .jpg/.webp photos directly in the browser
//    4. Click each photo → click "Raw" → copy the URL
//    5. Paste those URLs in the "photos" arrays below.
//
//  OPTION B: Use Google Photos shareable links
//    Right-click a Google Photos image → Copy image address → paste below.
//    (These can expire — GitHub is more reliable)
//
//  OPTION C: Place photos in the same folder as index.html
//    Just type the filename: "my-photo.jpg"
//    Then open your photos folder and drag the files next to this file.
//
// ════════════════════════════════════════════════════

const weddingData = {
    couple: {
        name1: "Sara Shehnaz Abbasi",
        name2: "Muhammed Shan Ahmed",
        year: "2024"
    },

    events: [
        // ── EVENT 1: NIKAH ────────────────────────────
        {
            id:          "nikah",
            title:       "The Nikah",
            date:        "January 10, 2024",
            description: "The beginning of their forever. The signing ceremony and exchange of vows.",

            // Paste video URLs here (YouTube, Google Drive, Vimeo, or direct MP4)
            videos: [
                // { label: "Cinematic Trailer", url: "PASTE_YOUR_URL_HERE" },
                // { label: "Full Ceremony", url: "PASTE_YOUR_URL_HERE" },
            ],

            // Paste photo URLs here (see instructions above)
            photos: [
                // "https://your-github-raw-url.jpg",
                // "photo-in-same-folder.jpg",
            ],

            // Link to full album (Google Drive folder, Google Photos, etc.)
            albumLink: ""  // e.g. "https://drive.google.com/drive/folders/YOUR_ID"
        },

        // ── EVENT 2: MEHNDI ───────────────────────────
        {
            id:          "mehndi",
            title:       "The Mehndi",
            date:        "January 12, 2024",
            description: "A night of colour, dance, and henna. Surrounded by those they love most.",

            videos: [
                // { label: "Mehndi Highlights", url: "PASTE_YOUR_URL_HERE" },
            ],

            photos: [
                // "mehndi1.jpg",
                // "mehndi2.jpg",
            ],

            albumLink: ""
        },

        // ── EVENT 3: SHAADI ───────────────────────────
        {
            id:          "shaadi",
            title:       "Shaadi & Walima",
            date:        "January 14, 2024",
            description: "The grand celebration. The reception, the feast, and the first chapter of their life together.",

            videos: [
                // { label: "Wedding Film", url: "PASTE_YOUR_URL_HERE" },
                // { label: "Reception Highlights", url: "PASTE_YOUR_URL_HERE" },
            ],

            photos: [
                // "shaadi1.jpg",
                // "shaadi2.jpg",
            ],

            albumLink: ""
        },

        // ── ADD MORE EVENTS ───────────────────────────
        // To add a new event (e.g. Baraat), copy one of the blocks above
        // and paste it here, editing the details.
    ]
};
