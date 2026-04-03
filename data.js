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
        {
            id:          "nikah",
            title:       "The Nikah",
            date:        "January 10, 2024",
            description: "The beginning of their forever. The signing ceremony and exchange of vows.",

            videos: [
                { label: "Wedding Film - Part 1", url: "https://youtu.be/cbupxKxRPmY" },
                { label: "Wedding Film - Part 2", url: "https://youtu.be/CB5GKzRlL8o" },
            ],

            // ⚠️ NEW STRUCTURE: Group photos by your folders
            photoCategories: [
                {
                    title: "Editor's Cut",
                    // Put the full file paths here
                    photos: [
                        "Photo/Nikkah/Nikkah Editor's Cut Compressed/img1.jpg",
                        "Photo/Nikkah/Nikkah Editor's Cut Compressed/img2.jpg"
                    ]
                },
                {
                    title: "Gallery 1",
                    photos: [
                        "Photo/Nikkah/Nikkah Photo 1 Compressed/img1.jpg",
                        "Photo/Nikkah/Nikkah Photo 1 Compressed/img2.jpg"
                    ]
                },
                {
                    title: "Gallery 2",
                    photos: [
                        // ... your paths for Photo 2 Compressed
                    ]
                }
            ],

            albumLink: "https://drive.google.com/drive/folders/YOUR_GOOGLE_DRIVE_ID_HERE"
        },
        
        {
            id:          "wedding",
            title:       "The Wedding",
            date:        "January 14, 2024",
            description: "The grand celebration. The reception, the feast, and the first chapter.",
            videos: [
                 { label: "Highlights", url: "https://youtu.be/7g5fs2yoBxI" },
                 { label: "Ceremony Video", url: "https://youtu.be/YJwImmFsrRQ" }
            ],
            photoCategories: [
                {
                    title: "Editor's Cut",
                    photos: [
                        "Photo/Wedding/Wedding Editor's Cut Compressed/img1.jpg",
                    ]
                },
                // ... add Gallery 1 and Gallery 2 here
            ],
            albumLink: ""
        }
    ]
};
