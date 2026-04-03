// ════════════════════════════════════════════════════
//  SARA & SHAN — script.js
// ════════════════════════════════════════════════════

(function () {
    'use strict';

    // ── VIDEO URL HELPERS ────────────────────────────

    function parseVideoUrl(rawUrl) {
        if (!rawUrl || rawUrl.includes('PASTE_YOUR_URL')) return null;

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

        const vimeoMatch = rawUrl.match(/vimeo\.com\/(\d+)/);
        if (vimeoMatch) {
            return {
                type: 'iframe',
                embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
                thumbUrl: null
            };
        }

        const driveMatch = rawUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (driveMatch) {
            return {
                type: 'iframe',
                embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview`,
                thumbUrl: null
            };
        }

        if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(rawUrl)) {
            return { type: 'video', embedUrl: rawUrl, thumbUrl: null };
        }

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

    let lbPhotos = [];
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
    }, { threshold: 0.02, rootMargin: '50px' });

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

        // Store category data for lazy rendering
        const categoryData = {};

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

            // Initialize lightbox array for this event
            allPhotos[event.id] = [];

            // ── Section element ──────────────────────
            const section = document.createElement('section');
            section.className = 'event-section';
            section.id        = event.id;

            // Films HTML
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
            }

            // Photos — build collapsible category headers only (no photo DOM yet)
            let photosHTML = '';
            let albumBtnHTML = event.albumLink
                ? `<div class="album-btn-wrap">
                       <a href="${event.albumLink}" target="_blank" rel="noopener" class="album-btn">
                           View Full Album
                       </a>
                   </div>` : '';

            if (event.photoCategories && event.photoCategories.length > 0) {
                let categoryBlocks = '';
                
                event.photoCategories.forEach((cat, cIdx) => {
                    const validCatPhotos = (cat.photos || []).filter(p => p && !p.includes('your-github'));
                    if (validCatPhotos.length === 0) return;

                    const catKey = `${event.id}_cat_${cIdx}`;

                    // Store photo data for lazy rendering
                    categoryData[catKey] = {
                        eventId: event.id,
                        catTitle: cat.title,
                        photos: validCatPhotos,
                        rendered: false
                    };

                    categoryBlocks += `
                        <div class="gallery-category" data-catkey="${catKey}">
                            <div class="category-toggle" role="button" tabindex="0" aria-expanded="false">
                                <h4 class="category-heading">${cat.title}</h4>
                                <span class="category-meta">${validCatPhotos.length} photos</span>
                                <span class="category-arrow">›</span>
                            </div>
                            <div class="gallery-grid-wrap" style="display:none;">
                                <div class="gallery-grid"></div>
                            </div>
                        </div>`;
                });

                if (categoryBlocks) {
                    photosHTML = `
                        <div class="gallery-section">
                            <h3 class="section-heading">Gallery</h3>
                            ${categoryBlocks}
                            ${albumBtnHTML}
                        </div>`;
                }
            }

            // Fallback empty state
            if (!photosHTML && !filmsHTML) {
                photosHTML = `
                    <div class="gallery-section">
                        <h3 class="section-heading">Gallery</h3>
                        <div class="empty-state">Photos will appear here once added to data.js</div>
                    </div>`;
            }

            // ── Assemble and append the section ──────
            section.innerHTML = `
                <div class="event-header">
                    <h2 class="event-title">${event.title}</h2>
                    <p class="event-date">${event.date}</p>
                    <p class="event-desc">${event.description}</p>
                </div>
                ${filmsHTML}
                ${photosHTML}
            `;

            eventsEl.appendChild(section);
            revealObserver.observe(section);
        });

        // ── Lazy-render photos when a category is toggled open ──

        function renderCategory(catKey, gridEl) {
            const data = categoryData[catKey];
            if (!data || data.rendered) return;

            // Build photo items and track for lightbox
            // First, compute the starting index for this category's photos
            const startIdx = allPhotos[data.eventId].length;

            data.photos.forEach(p => {
                allPhotos[data.eventId].push({ src: p, caption: `${data.catTitle}` });
            });

            const html = data.photos.map((p, i) => {
                const pIdx = startIdx + i;
                return `
                    <div class="photo-item" 
                         data-event="${data.eventId}"
                         data-pidx="${pIdx}"
                         role="button" tabindex="0">
                        <img src="${p}" loading="lazy"
                             onerror="this.closest('.photo-item').querySelector('.photo-placeholder').style.display='flex';this.remove()">
                        <div class="photo-placeholder" style="display:none">✦</div>
                        <div class="photo-overlay"></div>
                    </div>`;
            }).join('');

            gridEl.innerHTML = html;
            data.rendered = true;
        }

        // ── Category toggle click handler ────────────

        eventsEl.addEventListener('click', e => {
            // Category toggle
            const toggle = e.target.closest('.category-toggle');
            if (toggle) {
                const category = toggle.closest('.gallery-category');
                const wrap = category.querySelector('.gallery-grid-wrap');
                const grid = category.querySelector('.gallery-grid');
                const isOpen = toggle.getAttribute('aria-expanded') === 'true';

                if (isOpen) {
                    wrap.style.display = 'none';
                    toggle.setAttribute('aria-expanded', 'false');
                    category.classList.remove('expanded');
                } else {
                    // Lazy render on first open
                    const catKey = category.dataset.catkey;
                    renderCategory(catKey, grid);

                    wrap.style.display = 'block';
                    toggle.setAttribute('aria-expanded', 'true');
                    category.classList.add('expanded');
                }
                return;
            }

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

        // Keyboard support
        eventsEl.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.target.click();
            }
        });
    });

})();
