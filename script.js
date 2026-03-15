// ════════════════════════════════════════════════════
//  SARA & SHAN — script.js
// ════════════════════════════════════════════════════

(function () {
    'use strict';

    // ── VIDEO URL HELPERS ────────────────────────────

    /**
     * Detects video type and returns { type, embedUrl, thumbUrl }
     */
    function parseVideoUrl(rawUrl) {
        if (!rawUrl || rawUrl.includes('PASTE_YOUR_URL')) return null;

        // YouTube
        const ytMatch = rawUrl.match(
            /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
        );
        if (ytMatch) {
            return {
                type: 'iframe',
                embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
                thumbUrl: `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`
            };
        }

        // Vimeo
        const vimeoMatch = rawUrl.match(/vimeo\.com\/(\d+)/);
        if (vimeoMatch) {
            return {
                type: 'iframe',
                embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
                thumbUrl: null  // fetched async below if needed
            };
        }

        // Google Drive
        const driveMatch = rawUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (driveMatch) {
            return {
                type: 'iframe',
                embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview`,
                thumbUrl: null
            };
        }

        // Direct MP4 / video file
        if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(rawUrl)) {
            return { type: 'video', embedUrl: rawUrl, thumbUrl: null };
        }

        // Unknown — try as iframe
        return { type: 'iframe', embedUrl: rawUrl, thumbUrl: null };
    }

    // ── VIDEO MODAL ──────────────────────────────────

    const videoModal    = document.getElementById('video-modal');
    const videoBackdrop = document.getElementById('video-backdrop');
    const vmIframe      = document.getElementById('vm-iframe');
    const vmVideo       = document.getElementById('vm-video');
    const vmLabel       = document.getElementById('vm-label');
    const vmClose       = document.getElementById('vm-close');

    function openVideo(parsed, label) {
        if (!parsed) return;

        vmIframe.style.display = 'none';
        vmVideo.style.display  = 'none';
        vmIframe.src = '';
        vmVideo.src  = '';

        if (parsed.type === 'video') {
            vmVideo.src = parsed.embedUrl;
            vmVideo.style.display = 'block';
        } else {
            vmIframe.src = parsed.embedUrl;
            vmIframe.style.display = 'block';
        }

        vmLabel.textContent = label || '';
        videoModal.classList.add('active');
        videoModal.setAttribute('aria-hidden', 'false');

        // Backdrop fade-in
        videoBackdrop.style.display = 'block';
        requestAnimationFrame(() => videoBackdrop.classList.add('active'));

        document.body.style.overflow = 'hidden';
    }

    function closeVideo() {
        videoModal.classList.remove('active');
        videoModal.setAttribute('aria-hidden', 'true');
        videoBackdrop.classList.remove('active');
        setTimeout(() => { videoBackdrop.style.display = 'none'; }, 350);
        vmIframe.src = '';
        vmVideo.pause?.();
        vmVideo.src = '';
        document.body.style.overflow = '';
    }

    vmClose.addEventListener('click', closeVideo);
    videoBackdrop.addEventListener('click', closeVideo);

    // ── LIGHTBOX ─────────────────────────────────────

    const lightbox  = document.getElementById('lightbox');
    const lbBdrop   = document.getElementById('lightbox-backdrop');
    const lbImg     = document.getElementById('lb-img');
    const lbCaption = document.getElementById('lb-caption');
    const lbCounter = document.getElementById('lb-counter');
    const lbClose   = document.getElementById('lb-close');
    const lbPrev    = document.getElementById('lb-prev');
    const lbNext    = document.getElementById('lb-next');

    let lbPhotos = [];  // flat array of { src, caption }
    let lbIndex  = 0;

    function openLightbox(photos, startIndex) {
        lbPhotos = photos;
        showLbPhoto(startIndex);

        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        lbBdrop.style.display = 'block';
        requestAnimationFrame(() => lbBdrop.classList.add('active'));
        document.body.style.overflow = 'hidden';
    }

    function showLbPhoto(index) {
        lbIndex = (index + lbPhotos.length) % lbPhotos.length;
        const p = lbPhotos[lbIndex];
        lbImg.src       = p.src;
        lbImg.alt       = p.caption || 'Wedding photo';
        lbCaption.textContent = p.caption || '';
        lbCounter.textContent = `${lbIndex + 1} / ${lbPhotos.length}`;

        // Hide arrows if only one photo
        lbPrev.style.display = lbPhotos.length > 1 ? '' : 'none';
        lbNext.style.display = lbPhotos.length > 1 ? '' : 'none';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        lbBdrop.classList.remove('active');
        setTimeout(() => { lbBdrop.style.display = 'none'; }, 350);
        document.body.style.overflow = '';
    }

    lbClose.addEventListener('click', closeLightbox);
    lbBdrop.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => showLbPhoto(lbIndex - 1));
    lbNext.addEventListener('click', () => showLbPhoto(lbIndex + 1));

    // Keyboard nav
    document.addEventListener('keydown', e => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft')  showLbPhoto(lbIndex - 1);
            if (e.key === 'ArrowRight') showLbPhoto(lbIndex + 1);
            if (e.key === 'Escape')     closeLightbox();
        }
        if (videoModal.classList.contains('active')) {
            if (e.key === 'Escape') closeVideo();
        }
    });

    // Touch swipe for lightbox
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
    lightbox.addEventListener('touchend',   e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) showLbPhoto(lbIndex + (dx < 0 ? 1 : -1));
    });

    // ── NAV SCROLL EFFECT ────────────────────────────

    const nav = document.getElementById('site-nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // ── SCROLL REVEAL ────────────────────────────────

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.07 });

    // ── BUILD PAGE ───────────────────────────────────

    document.addEventListener('DOMContentLoaded', () => {
        const { couple, events } = weddingData;
        const navLinks = document.getElementById('nav-links');
        const eventsEl = document.getElementById('events');

        // Update hero names
        document.querySelector('.hero-title').innerHTML =
            `<em>${couple.name1}</em>
             <span class="hero-amp">&amp;</span>
             <em>${couple.name2}</em>`;
        document.querySelector('.hero-date').textContent =
            events[0]?.date.split(' ').slice(-1)[0] + ' – ' +
            events[events.length-1]?.date || couple.year;

        // Track all photos across events for global lightbox
        const allPhotos = {};

        events.forEach((event, eIdx) => {
            // Nav link
            const li = document.createElement('li');
            const a  = document.createElement('a');
            a.href        = `#${event.id}`;
            a.textContent = event.title;
            li.appendChild(a);
            navLinks.appendChild(li);

            // Build valid videos
            const validVideos = (event.videos || [])
                .map(v => ({ ...v, parsed: parseVideoUrl(v.url) }))
                .filter(v => v.parsed);

            // Build valid photos
            const validPhotos = (event.photos || []).filter(p => p && !p.includes('your-github'));

            // Store for lightbox
            allPhotos[event.id] = validPhotos.map(p => ({ src: p, caption: event.title }));

            // ── Section HTML ─────────────────────────
            const section = document.createElement('section');
            section.className = 'event-section';
            section.id        = event.id;
            section.style.cssText = `transition-delay: ${eIdx * 0.08}s`;

            // Films
            let filmsHTML = '';
            if (validVideos.length > 0) {
                const cards = validVideos.map((v, i) => {
                    const thumb = v.parsed.thumbUrl;
                    const thumbContent = thumb
                        ? `<div class="film-thumb-img-wrap" style="position:absolute;inset:0">
                              <img src="${thumb}" alt="${v.label}" loading="lazy" 
                                   onerror="this.parentElement.parentElement.querySelector('.film-thumb-placeholder').style.display='flex';this.parentElement.remove()">
                           </div>`
                        : '';
                    return `
                        <div class="film-card" 
                             data-event="${event.id}"
                             data-vidx="${i}"
                             role="button" tabindex="0"
                             aria-label="Play ${v.label}">
                          <div class="film-thumb">
                            <div class="film-thumb-placeholder">
                              <div class="film-play-icon">▶</div>
                            </div>
                            ${thumbContent}
                          </div>
                          <div class="film-info">
                            <p class="film-label">${v.label}</p>
                          </div>
                        </div>`;
                }).join('');

                filmsHTML = `
                    <div class="films-block">
                        <h3 class="section-heading">Films</h3>
                        <div class="films-grid">${cards}</div>
                    </div>`;
            } else {
                filmsHTML = `
                    <div class="films-block">
                        <h3 class="section-heading">Films</h3>
                        <div class="empty-state">
                            Videos will appear here once added to data.js
                        </div>
                    </div>`;
            }

            // Photos
            let photosHTML = '';
            let albumBtnHTML = event.albumLink
                ? `<div class="album-btn-wrap">
                       <a href="${event.albumLink}" target="_blank" rel="noopener" class="album-btn">
                           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                               <path d="M4 16l4-4 4 4 4-8 4 8M3 3h18v14a2 2 0 01-2 2H5a2 2 0 01-2-2V3z"/>
                           </svg>
                           View Full Album
                       </a>
                   </div>` : '';

            if (validPhotos.length > 0) {
                const photoItems = validPhotos.map((p, i) => `
                    <div class="photo-item" 
                         data-event="${event.id}"
                         data-pidx="${i}"
                         role="button" tabindex="0"
                         aria-label="Open photo ${i + 1}">
                        <img src="${p}" alt="Wedding photo ${i+1}" loading="lazy"
                             onerror="this.closest('.photo-item').querySelector('.photo-placeholder').style.display='flex';this.remove()">
                        <div class="photo-placeholder" style="display:none">✦</div>
                        <div class="photo-overlay"></div>
                    </div>`).join('');

                photosHTML = `
                    <div class="gallery-section">
                        <h3 class="section-heading">Gallery</h3>
                        <div class="gallery-grid">${photoItems}</div>
                        ${albumBtnHTML}
                    </div>`;
            } else {
                photosHTML = `
                    <div class="gallery-section">
                        <h3 class="section-heading">Gallery</h3>
                        <div class="empty-state">
                            Photos will appear here once added to data.js
                        </div>
                        ${albumBtnHTML}
                    </div>`;
            }

            section.innerHTML = `
                <div class="event-header">
                    <span class="event-tag">${event.date}</span>
                    <h2 class="event-title">${event.title}</h2>
                    <p class="event-desc">${event.description}</p>
                </div>
                ${filmsHTML}
                ${photosHTML}
            `;

            eventsEl.appendChild(section);
            revealObserver.observe(section);
        });

        // ── Event delegation for clicks ──────────────

        document.getElementById('events').addEventListener('click', e => {
            // Video card
            const filmCard = e.target.closest('.film-card');
            if (filmCard) {
                const eventId = filmCard.dataset.event;
                const vIdx    = parseInt(filmCard.dataset.vidx, 10);
                const evData  = events.find(ev => ev.id === eventId);
                if (!evData) return;
                const v = evData.videos.map(v => ({ ...v, parsed: parseVideoUrl(v.url) }))
                                        .filter(v => v.parsed)[vIdx];
                if (v) openVideo(v.parsed, v.label);
                return;
            }

            // Photo item
            const photoItem = e.target.closest('.photo-item');
            if (photoItem) {
                const eventId = photoItem.dataset.event;
                const pIdx    = parseInt(photoItem.dataset.pidx, 10);
                const photos  = allPhotos[eventId];
                if (photos && photos.length) openLightbox(photos, pIdx);
                return;
            }
        });

        // Keyboard support for cards
        document.getElementById('events').addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.target.click();
            }
        });
    });

})();
