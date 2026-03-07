document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Premium Counter Animation (60FPS Smooth Ease-Out) ---
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds animation
            let startTime = null;

            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                
                // Professional ease-out math
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                
                counter.innerText = Math.ceil(easeProgress * target);
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    counter.innerText = target; 
                }
            };
            window.requestAnimationFrame(step);
        });
    };

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // --- 2. Optimized Navbar & Logo Scroll ---
    const header = document.getElementById('main-header');
    const headerInner = document.getElementById('header-inner');
    const logo = document.getElementById('main-logo'); // Targeting the logo
    let isScrolled = false;

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(() => {
            const currentScroll = window.scrollY > 40;
            if (currentScroll !== isScrolled) {
                isScrolled = currentScroll;
                if (isScrolled) {
                    // Navbar Glassy & Dark (Premium Minimal Apple-Style)
                    header?.classList.remove('bg-transparent', 'border-white/20');
                    header?.classList.add('bg-slate-950/65', 'backdrop-blur-2xl', 'border-slate-800/60', 'shadow-[0_10px_40px_rgba(0,0,0,0.15)]');
                    headerInner?.classList.replace('py-5', 'py-3');
                    
                    // Logo Colorful (remove white filter)
                    if (logo) {
                        logo.classList.remove('brightness-0', 'invert', 'opacity-90');
                    }
                } else {
                    // Navbar Transparent
                    header?.classList.add('bg-transparent', 'border-white/20');
                    header?.classList.remove('bg-slate-950/65', 'backdrop-blur-2xl', 'border-slate-800/60', 'shadow-[0_10px_40px_rgba(0,0,0,0.15)]');
                    headerInner?.classList.replace('py-3', 'py-5');
                    
                    // Logo White (add filter back)
                    if (logo) {
                        logo.classList.add('brightness-0', 'invert', 'opacity-90');
                    }
                }
            }
        });
    });

    // --- 3. Hero Slideshow ---
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.replace('opacity-100', 'opacity-0');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.replace('opacity-0', 'opacity-100');
        }, 5000); 
    }

    // --- 4. Smooth Accordion Interaction ---
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetContent = btn.nextElementSibling;
            const targetIcon = btn.querySelector('.accordion-icon');
            const isOpening = targetContent?.classList.contains('hidden');

            document.querySelectorAll('.accordion-content').forEach(c => {
                c.classList.add('hidden');
                c.classList.remove('block', 'animate-fade-in-down');
            });
            document.querySelectorAll('.accordion-icon').forEach(i => i.textContent = '+');

            if (isOpening) {
                targetContent?.classList.remove('hidden');
                targetContent?.classList.add('block', 'animate-fade-in-down');
                if (targetIcon) targetIcon.textContent = '−';
            }
        });
    });

    // --- 5. Mobile Menu Toggle ---
    const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', () => {
            document.getElementById('mobile-menu')?.classList.toggle('hidden');
            document.getElementById('mobile-menu')?.classList.toggle('flex');
            document.getElementById('icon-menu')?.classList.toggle('hidden');
            document.getElementById('icon-close')?.classList.toggle('hidden');
        });
    }
});

// --- 6. Global Language Switcher ---
window.changeLanguage = (lang) => {
    const body = document.body;
    const displayPill = document.getElementById('current-lang-display');
    
    body.classList.add('opacity-0');
    
    setTimeout(() => {
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        if (displayPill) displayPill.textContent = lang.toUpperCase();

        document.querySelectorAll('.lang-text').forEach(el => {
            const newText = el.getAttribute(`data-${lang}`);
            if (newText) el.textContent = newText;
        });

        ['en', 'ar', 'zh', 'pt'].forEach(l => {
            const btn = document.getElementById(`mob-lang-${l}`);
            if (btn) {
                btn.className = l === lang 
                    ? "font-bold text-white underline hover:opacity-75 transition-opacity" 
                    : "font-bold text-slate-500 hover:text-white transition-colors";
            }
        });

        body.classList.remove('opacity-0');
    }, 300);
};