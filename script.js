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
            images: Array.from({ length: 22 }, (_, i) => `assets/spices/spice${i + 1}.jpeg`)
        },
        {
            cardId: 'snacksCard',
            galleryId: 'snacksGallery',
            gridId: 'snacksGrid',
            altPrefix: 'Sandilya Snack',
            images: [
                'WhatsApp Image 2026-06-23 at 7.51.49 PM.jpeg',
                'WhatsApp Image 2026-06-23 at 7.51.50 PM (1).jpeg',
                'WhatsApp Image 2026-06-23 at 7.51.50 PM (2).jpeg',
                'WhatsApp Image 2026-06-23 at 7.51.50 PM.jpeg',
                'WhatsApp Image 2026-06-23 at 7.51.51 PM (1).jpeg',
                'WhatsApp Image 2026-06-23 at 7.51.51 PM (2).jpeg',
                'WhatsApp Image 2026-06-23 at 7.51.51 PM.jpeg',
                'WhatsApp Image 2026-06-23 at 7.51.52 PM (1).jpeg',
                'WhatsApp Image 2026-06-23 at 7.51.52 PM.jpeg'
            ].map(file => `assets/snacks/${encodeURIComponent(file)}`)
        },
        {
            cardId: 'coffeeCard',
            galleryId: 'coffeeGallery',
            gridId: 'coffeeGrid',
            altPrefix: 'Sandilya Coffee',
            images: [
                'WhatsApp Image 2026-06-23 at 6.09.22 AM.jpeg',
                'WhatsApp Image 2026-06-23 at 6.09.23 AM (1).jpeg',
                'WhatsApp Image 2026-06-23 at 6.09.23 AM (2).jpeg',
                'WhatsApp Image 2026-06-23 at 6.09.23 AM.jpeg',
                'WhatsApp Image 2026-06-23 at 6.09.24 AM.jpeg'
            ].map(file => `assets/coffee/${encodeURIComponent(file)}`)
        },
        {
            cardId: 'teaCard',
            galleryId: 'teaGallery',
            gridId: 'teaGrid',
            altPrefix: 'Sandilya Tea',
            images: [
                'WhatsApp Image 2026-06-23 at 7.21.08 PM (1).jpeg',
                'WhatsApp Image 2026-06-23 at 7.21.08 PM.jpeg',
                'WhatsApp Image 2026-06-23 at 7.21.09 PM (1).jpeg',
                'WhatsApp Image 2026-06-23 at 7.21.09 PM.jpeg',
                'WhatsApp Image 2026-06-23 at 7.21.20 PM (1).jpeg',
                'WhatsApp Image 2026-06-23 at 7.21.20 PM.jpeg',
                'WhatsApp Image 2026-06-23 at 7.21.21 PM (1).jpeg',
                'WhatsApp Image 2026-06-23 at 7.21.21 PM (2).jpeg',
                'WhatsApp Image 2026-06-23 at 7.21.21 PM.jpeg',
                'WhatsApp Image 2026-06-23 at 7.21.22 PM.jpeg'
            ].map(file => `assets/tea/${encodeURIComponent(file)}`)
        }
    ];

    const galleryInstances = productGalleries.map(({ cardId, galleryId, gridId, altPrefix, images }) => {
        const card = document.getElementById(cardId);
        const gallery = document.getElementById(galleryId);
        const grid = document.getElementById(gridId);

        images.forEach((src, index) => {
            const item = document.createElement('div');
            item.className = 'product-gallery-item fade-in';
            item.innerHTML = `<img src="${src}" alt="${altPrefix} ${index + 1}" loading="lazy">`;
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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllGalleries();
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
