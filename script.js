// script.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('events-container');
    const navContainer = document.getElementById('nav-links');

    // Helper to convert Drive Share Link to Embed Link
    const getDriveEmbed = (link) => {
        // Extracts the ID and adds /preview
        const idMatch = link.match(/\/d\/(.+?)\//);
        if (idMatch && idMatch[1]) {
            return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
        }
        return link; 
    };

    weddingEvents.forEach((event, index) => {
        // 1. Build Navigation
        const navLink = document.createElement('a');
        navLink.href = `#${event.id}`;
        navLink.className = "hover:text-stone-900 transition-colors";
        navLink.innerText = event.title;
        navContainer.appendChild(navLink);

        // 2. Build Section
        const section = document.createElement('section');
        section.id = event.id;
        section.className = "py-16 scroll-mt-20 border-b border-stone-200 last:border-0";

        // Handle Videos (Google Drive Friendly)
        let videosHTML = '';
        if (event.videos.length > 0) {
            const videoCards = event.videos.map(vid => `
                <div class="bg-black rounded-lg overflow-hidden shadow-lg mb-6">
                    <div class="relative pb-[56.25%] h-0">
                        <iframe 
                            src="${getDriveEmbed(vid.url)}" 
                            class="absolute top-0 left-0 w-full h-full" 
                            style="border:0"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div class="p-4 bg-white border-t border-stone-100">
                        <p class="font-bold text-stone-800 flex items-center gap-2">
                           ▶ ${vid.label}
                        </p>
                    </div>
                </div>
            `).join('');
            
            videosHTML = `
                <div class="mb-12">
                    <h3 class="text-2xl font-serif mb-6 text-stone-800">Films</h3>
                    <div class="grid gap-8 md:grid-cols-2">
                        ${videoCards}
                    </div>
                </div>
            `;
        }

        // Handle Photos & Full Album Link
        let photosHTML = '';
        let albumButtonHTML = '';

        if (event.fullAlbumLink) {
            albumButtonHTML = `
                <div class="mt-8 text-center">
                    <a href="${event.fullAlbumLink}" target="_blank" rel="noopener noreferrer" 
                       class="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-700 transition shadow-lg text-sm font-semibold tracking-wider uppercase">
                       View All Photos on Google Drive ↗
                    </a>
                </div>
            `;
        }

        if (event.photos.length > 0) {
            const photoCards = event.photos.map(photo => `
                <div class="group relative overflow-hidden rounded-lg shadow-md aspect-[3/4] bg-stone-200">
                    <img src="${photo}" alt="Wedding highlight" class="object-cover w-full h-full transform transition duration-700 group-hover:scale-105" loading="lazy">
                </div>
            `).join('');

            photosHTML = `
                <div>
                    <h3 class="text-2xl font-serif mb-6 text-stone-800">Highlights Gallery</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        ${photoCards}
                    </div>
                    ${albumButtonHTML}
                </div>
            `;
        } else if (event.fullAlbumLink) {
             // If no highlight photos, just show the button
             photosHTML = `<div class="mt-8">${albumButtonHTML}</div>`;
        }

        section.innerHTML = `
            <div class="text-center mb-16">
                <span class="text-stone-500 uppercase tracking-widest text-xs font-bold border-b border-stone-300 pb-1">${event.date}</span>
                <h2 class="text-4xl md:text-6xl font-serif mt-6 mb-4 text-stone-800">${event.title}</h2>
                <p class="text-stone-600 max-w-xl mx-auto leading-relaxed">${event.description}</p>
            </div>
            ${videosHTML}
            ${photosHTML}
        `;

        container.appendChild(section);
    });
});
