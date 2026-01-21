// script.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('events-container');
    const navContainer = document.getElementById('nav-links');

    weddingEvents.forEach((event, index) => {
        // 1. Build Navigation Links
        const navLink = document.createElement('a');
        navLink.href = `#${event.id}`;
        navLink.className = "hover:text-stone-900 transition-colors";
        navLink.innerText = event.title;
        navContainer.appendChild(navLink);

        // 2. Build Event Section
        const section = document.createElement('section');
        section.id = event.id;
        section.className = "py-16 scroll-mt-20 border-b border-stone-200 last:border-0";

        let videosHTML = '';
        if (event.videos.length > 0) {
            const videoCards = event.videos.map(vid => `
                <div class="bg-black rounded-lg overflow-hidden shadow-lg">
                    <div class="aspect-w-16 aspect-h-9">
                        <iframe src="${vid.url}" class="w-full h-96" title="${vid.label}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div class="p-3 bg-white">
                        <p class="font-semibold text-sm text-stone-800">${vid.label}</p>
                    </div>
                </div>
            `).join('');
            
            videosHTML = `
                <div class="mb-12">
                    <h3 className="text-xl font-serif mb-6 flex items-center gap-2">🎥 Videos</h3>
                    <div class="grid gap-8 md:grid-cols-2 mt-4">
                        ${videoCards}
                    </div>
                </div>
            `;
        }

        let photosHTML = '';
        if (event.photos.length > 0) {
            const photoCards = event.photos.map(photo => `
                <div class="group relative overflow-hidden rounded-lg shadow-md aspect-[3/4]">
                    <img src="${photo}" alt="Wedding photo" class="object-cover w-full h-full transform transition duration-500 group-hover:scale-105" loading="lazy">
                </div>
            `).join('');

            photosHTML = `
                <div>
                    <h3 className="text-xl font-serif mb-6 flex items-center gap-2">📸 Gallery</h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        ${photoCards}
                    </div>
                </div>
            `;
        }

        section.innerHTML = `
            <div class="text-center mb-12">
                <span class="text-stone-500 uppercase tracking-widest text-xs font-bold">${event.date}</span>
                <h2 class="text-4xl md:text-5xl font-serif mt-2 mb-4 text-stone-800">${event.title}</h2>
                <p class="text-stone-600 max-w-xl mx-auto">${event.description}</p>
            </div>
            ${videosHTML}
            ${photosHTML}
        `;

        container.appendChild(section);
    });
});
