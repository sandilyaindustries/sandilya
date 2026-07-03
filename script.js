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
        if (!el.classList.contains('product-card--clickable')) {
            el.classList.add('fade-in');
            observer.observe(el);
        } else {
            el.classList.add('visible');
        }
    });

    // Staggered animation for product cards (non-clickable only)
    document.querySelectorAll('.product-card:not(.product-card--clickable)').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.benefit').forEach((benefit, index) => {
        benefit.style.transitionDelay = `${index * 0.08}s`;
    });

    // Product galleries (loaded from assets/products.json)
    const productGallery = document.getElementById('productGallery');
    const productGalleryTitle = document.getElementById('productGalleryTitle');
    const productGalleryGrid = document.getElementById('productGalleryGrid');
    const productGalleryClose = document.getElementById('productGalleryClose');
    const productCards = document.querySelectorAll('.product-card--clickable[data-category]');
    const productsManifest = window.PRODUCTS_MANIFEST || {};
    const manifestReady = Object.keys(productsManifest).length > 0;
    let activeCategory = null;

    if (!manifestReady) {
        console.error('Product manifest not loaded. Run: python3 scripts/generate-products-manifest.py');
        productCards.forEach(card => card.classList.add('product-card--disabled'));
    }

    const buildImagePath = (folder, file) => `assets/${folder}/${encodeURIComponent(file)}`;

    const renderGallery = (category) => {
        const config = productsManifest[category];
        if (!config || !config.files.length) return false;

        productGalleryTitle.textContent = config.title;
        productGalleryGrid.innerHTML = '';

        config.files.forEach((file, index) => {
            const item = document.createElement('div');
            item.className = 'product-gallery-item';
            const img = document.createElement('img');
            img.src = buildImagePath(config.folder, file);
            img.alt = `${config.title} ${index + 1}`;
            img.loading = 'lazy';
            item.appendChild(img);
            productGalleryGrid.appendChild(item);
        });

        return true;
    };

    const closeGallery = () => {
        productGallery.hidden = true;
        activeCategory = null;
        productCards.forEach(card => card.setAttribute('aria-expanded', 'false'));
    };

    const openGallery = (category) => {
        if (!manifestReady) return;

        const rendered = renderGallery(category);
        if (!rendered) return;

        productGallery.hidden = false;
        activeCategory = category;
        productCards.forEach(card => {
            card.setAttribute('aria-expanded', card.dataset.category === category ? 'true' : 'false');
        });
        productGallery.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    const handleCardActivate = (card) => {
        if (!manifestReady) return;

        const category = card.dataset.category;

        if (activeCategory === category && !productGallery.hidden) {
            closeGallery();
        } else {
            openGallery(category);
        }
    };

    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            handleCardActivate(card);
        });
    });

    productGalleryClose.addEventListener('click', closeGallery);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !productGallery.hidden) {
            closeGallery();
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
