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
            window.location.href = `mailto:sandilyaindustriespvtltd@gmail.com?subject=${subject}&body=${body}`;
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
