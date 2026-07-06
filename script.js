document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const contactForm = document.getElementById('contactForm');

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        navbar.classList.toggle('scrolled', currentScroll > 50);
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

    // Scroll-triggered fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .partner-type, .benefit, .contact-item, .stat').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Staggered animation for product cards
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.benefit').forEach((benefit, index) => {
        benefit.style.transitionDelay = `${index * 0.08}s`;
    });

    // Product galleries
    const productGalleries = [
        {
            cardId: 'spicesCard',
            galleryId: 'spicesGallery',
            gridId: 'spicesGrid',
            altPrefix: 'Sandilya Spice',
            images: [
                'spice-1.jpeg',
                'spice-2.jpeg',
                'spice-3.jpeg',
                'spice-4.jpeg',
                'spice-5.jpeg',
                'spice-6.jpeg',
                'spice-7.jpeg',
                'spice-8.jpeg',
                'spice-9.jpeg',
                'spice-10.jpeg',
                'spice-11.jpeg',
                'spice-12.jpeg',
                'spice-13.jpeg',
                'spice-14.jpeg',
                'spice-15.jpeg',
                'spice-16.jpeg',
                'spice-17.jpeg',
                'spice-18.jpeg',
                'spice-19.jpeg',
                'spice-20.jpeg',
                'spice-21.jpeg',
                'spice-22.jpeg'
            ].map(file => `assets/spices/${encodeURIComponent(file)}`)
        },
        {
            cardId: 'snacksCard',
            galleryId: 'snacksGallery',
            gridId: 'snacksGrid',
            altPrefix: 'Sandilya Snack',
            images: [
                'snacks-1.jpeg',
                'snacks-2.jpeg',
                'snacks-3.jpeg',
                'snacks-4.jpeg',
                'snacks-5.jpeg',
                'snacks-6.jpeg',
                'snacks-7.jpeg',
                'snacks-8.jpeg',
                'snacks-9.jpeg'
            ].map(file => `assets/snacks/${encodeURIComponent(file)}`)
        },
        {
            cardId: 'coffeeCard',
            galleryId: 'coffeeGallery',
            gridId: 'coffeeGrid',
            altPrefix: 'Sandilya Coffee',
            images: [
                'coffee-1.jpeg',
                'coffee-2.jpeg',
                'coffee-3.jpeg',
                'coffee-4.jpeg',
                'coffee-5.jpeg'
            ].map(file => `assets/coffee/${encodeURIComponent(file)}`)
        },
        {
            cardId: 'teaCard',
            galleryId: 'teaGallery',
            gridId: 'teaGrid',
            altPrefix: 'Sandilya Tea',
            images: [
                'tea-1.jpeg',
                'tea-2.jpeg',
                'tea-3.jpeg',
                'tea-4.jpeg',
                'tea-5.jpeg',
                'tea-6.jpeg',
                'tea-7.jpeg',
                'tea-8.jpeg',
                'tea-9.jpeg',
                'tea-10.jpeg'
            ].map(file => `assets/tea/${encodeURIComponent(file)}`)
        },
        {
            cardId: 'proteinCard',
            galleryId: 'proteinGallery',
            gridId: 'proteinGrid',
            altPrefix: 'Sandilya Protein Food',
            images: [
                'protein-food-1.png',
                'protein-food-2.png',
                'protein-food-3.png',
                'protein-food-4.png',
                'protein-food-5.png',
                'protein-food-6.png'
            ].map(file => `assets/protein-food/${encodeURIComponent(file)}`)
        },
        {
            cardId: 'attaCard',
            galleryId: 'attaGallery',
            gridId: 'attaGrid',
            altPrefix: 'Sandilya Protein Atta',
            images: [
                'protein-atta-1.png',
                'protein-atta-2.png',
                'protein-atta-3.png',
                'protein-atta-4.png',
                'protein-atta-5.png',
                'protein-atta-6.png',
                'protein-atta-7.png',
                'protein-atta-8.png'
            ].map(file => `assets/protein-atta/${encodeURIComponent(file)}`)
        },
        {
            cardId: 'gourmetCard',
            galleryId: 'gourmetGallery',
            gridId: 'gourmetGrid',
            altPrefix: 'Sandilya Gourmet Food',
            images: [
                'gourmet-food-1.png',
                'gourmet-food-2.png',
                'gourmet-food-3.png',
                'gourmet-food-4.png',
                'gourmet-food-5.png',
                'gourmet-food-6.png',
                'gourmet-food-7.png',
                'gourmet-food-8.png',
                'gourmet-food-9.png',
                'gourmet-food-10.png'
            ].map(file => `assets/gourmet-food/${encodeURIComponent(file)}`)
        },
        {
            cardId: 'herbalCard',
            galleryId: 'herbalGallery',
            gridId: 'herbalGrid',
            altPrefix: 'Sandilya Ayurvedic Herbal Product',
            images: [
                'ayurvedic-herbal-1.png',
                'ayurvedic-herbal-2.png',
                'ayurvedic-herbal-3.png',
                'ayurvedic-herbal-4.png',
                'ayurvedic-herbal-5.png',
                'ayurvedic-herbal-6.png',
                'ayurvedic-herbal-7.png',
                'ayurvedic-herbal-8.png',
                'ayurvedic-herbal-9.png',
                'ayurvedic-herbal-10.png',
                'ayurvedic-herbal-11.png',
                'ayurvedic-herbal-12.png',
                'ayurvedic-herbal-13.png',
                'ayurvedic-herbal-14.png',
                'ayurvedic-herbal-15.png',
                'ayurvedic-herbal-16.png',
                'ayurvedic-herbal-17.png',
                'ayurvedic-herbal-18.png',
                'ayurvedic-herbal-19.png',
                'ayurvedic-herbal-20.png',
                'ayurvedic-herbal-21.png',
                'ayurvedic-herbal-22.png',
                'ayurvedic-herbal-23.png',
                'ayurvedic-herbal-24.png',
                'ayurvedic-herbal-25.png',
                'ayurvedic-herbal-26.png',
                'ayurvedic-herbal-27.png'
            ].map(file => `assets/ayurvedic-herbal/${encodeURIComponent(file)}`)
        }
    ];

    const galleryInstances = productGalleries.map(({ cardId, galleryId, gridId, altPrefix, images }) => {
        const card = document.getElementById(cardId);
        const gallery = document.getElementById(galleryId);
        const grid = document.getElementById(gridId);

        images.forEach((src, index) => {
            const item = document.createElement('button');
            const imageAlt = `${altPrefix} ${index + 1}`;
            item.type = 'button';
            item.className = 'product-gallery-item fade-in';
            item.setAttribute('aria-label', `Open ${imageAlt} image`);
            item.innerHTML = `<img src="${src}" alt="${imageAlt}" loading="lazy">`;
            item.addEventListener('click', () => openImageLightbox(images, index, altPrefix));
            grid.appendChild(item);
            observer.observe(item);
        });

        return { card, gallery };
    });

    const closeAllGalleries = (exceptGallery = null) => {
        galleryInstances.forEach(({ card, gallery }) => {
            if (gallery !== exceptGallery) {
                gallery.hidden = true;
                card.setAttribute('aria-expanded', 'false');
            }
        });
    };

    galleryInstances.forEach(({ card, gallery }) => {
        card.addEventListener('click', () => {
            const isOpen = !gallery.hidden;
            closeAllGalleries();

            if (isOpen) {
                gallery.hidden = true;
                card.setAttribute('aria-expanded', 'false');
            } else {
                gallery.hidden = false;
                card.setAttribute('aria-expanded', 'true');
                gallery.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    document.querySelectorAll('[data-gallery-close]').forEach(button => {
        button.addEventListener('click', () => {
            closeAllGalleries();
        });
    });

    // Product image lightbox with collection slider
    const imageLightbox = document.getElementById('imageLightbox');
    const imageLightboxImg = document.getElementById('imageLightboxImg');
    const imageLightboxClose = document.getElementById('imageLightboxClose');
    const imageLightboxPrev = document.getElementById('imageLightboxPrev');
    const imageLightboxNext = document.getElementById('imageLightboxNext');
    const imageLightboxCounter = document.getElementById('imageLightboxCounter');
    let activeLightboxImages = [];
    let activeLightboxIndex = 0;
    let activeLightboxAltPrefix = '';

    const updateImageLightbox = () => {
        if (!activeLightboxImages.length) return;

        const src = activeLightboxImages[activeLightboxIndex];
        const alt = `${activeLightboxAltPrefix} ${activeLightboxIndex + 1}`;
        const hasMultipleImages = activeLightboxImages.length > 1;

        imageLightboxImg.src = src;
        imageLightboxImg.alt = alt;
        imageLightboxCounter.textContent = `${activeLightboxIndex + 1} / ${activeLightboxImages.length}`;
        imageLightboxPrev.hidden = !hasMultipleImages;
        imageLightboxNext.hidden = !hasMultipleImages;
    };

    const openImageLightbox = (images, index, altPrefix) => {
        activeLightboxImages = images;
        activeLightboxIndex = index;
        activeLightboxAltPrefix = altPrefix;
        updateImageLightbox();
        imageLightbox.classList.add('active');
        imageLightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-open');
    };

    const closeImageLightbox = () => {
        imageLightbox.classList.remove('active');
        imageLightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');
        imageLightboxImg.src = '';
        imageLightboxImg.alt = '';
        imageLightboxCounter.textContent = '';
        activeLightboxImages = [];
        activeLightboxIndex = 0;
        activeLightboxAltPrefix = '';
    };

    const showPreviousLightboxImage = () => {
        if (!activeLightboxImages.length) return;
        activeLightboxIndex = (activeLightboxIndex - 1 + activeLightboxImages.length) % activeLightboxImages.length;
        updateImageLightbox();
    };

    const showNextLightboxImage = () => {
        if (!activeLightboxImages.length) return;
        activeLightboxIndex = (activeLightboxIndex + 1) % activeLightboxImages.length;
        updateImageLightbox();
    };

    imageLightboxClose.addEventListener('click', closeImageLightbox);
    imageLightboxPrev.addEventListener('click', showPreviousLightboxImage);
    imageLightboxNext.addEventListener('click', showNextLightboxImage);

    imageLightbox.addEventListener('click', (e) => {
        if (e.target === imageLightbox) {
            closeImageLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        const isLightboxOpen = imageLightbox.classList.contains('active');

        if (e.key === 'Escape') {
            closeAllGalleries();
            closeImageLightbox();
        }

        if (isLightboxOpen && e.key === 'ArrowLeft') {
            showPreviousLightboxImage();
        }

        if (isLightboxOpen && e.key === 'ArrowRight') {
            showNextLightboxImage();
        }
    });

    // Contact form handling
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        const formData = new FormData(contactForm);
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                btn.textContent = 'Sent Successfully!';
                btn.style.background = 'linear-gradient(135deg, #27ae60, #1a6b3c)';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(() => {
            // Fallback: open mailto with form data
            const name = formData.get('name') || '';
            const email = formData.get('_replyto') || '';
            const interest = formData.get('interest') || '';
            const message = formData.get('message') || '';
            const subject = encodeURIComponent('New Enquiry from Sandilya Website');
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\nMessage:\n${message}`
            );
            window.location.href = `mailto:sales@sandilyaindustries.com?subject=${subject}&body=${body}`;
            btn.textContent = 'Opening Email...';
        })
        .finally(() => {
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
    });

    // Smooth counter animation for stats
    const animateCounter = (el, target) => {
        const isNumber = !isNaN(parseInt(target));
        if (!isNumber) return;

        const num = parseInt(target);
        const suffix = target.replace(num.toString(), '');
        let current = 0;
        const step = Math.ceil(num / 40);
        const interval = setInterval(() => {
            current += step;
            if (current >= num) {
                current = num;
                clearInterval(interval);
            }
            el.textContent = current + suffix;
        }, 30);
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target.textContent;
                if (target.includes('+') || target.includes('%')) {
                    animateCounter(entry.target, target);
                }
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => {
        statObserver.observe(el);
    });
});
