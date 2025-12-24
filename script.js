// ============================================
// ROBOTS AT WORK - Interactive Features
// ============================================

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Observe stat items
document.querySelectorAll('.stat-item').forEach(stat => {
    observer.observe(stat);
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate form
        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все поля формы.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Пожалуйста, введите корректный адрес электронной почты.');
            return;
        }

        // Success message (in production, this would send data to server)
        alert(`Спасибо, ${name}! Ваше сообщение отправлено.\n\nМы свяжемся с вами в ближайшее время на ${email}.`);

        // Reset form
        contactForm.reset();
    });
}

// Add active state to navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;

            // Extract number from text (e.g., "100+" -> 100)
            const number = parseInt(text.replace(/\D/g, ''));

            if (!isNaN(number)) {
                statNumber.textContent = '0';
                animateCounter(statNumber, number);

                // Add back any suffix (like "+")
                setTimeout(() => {
                    statNumber.textContent = text;
                }, 2000);
            }

            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const scrollPosition = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-bg');

        if (heroBackground && scrollPosition < heroSection.offsetHeight) {
            heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    }
});

// Easter egg: Konami code for Soviet anthem
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'sovietGlow 2s ease-in-out';
        alert('🌟 СЛАВА РОБОТАМ! ЗА СВЕТЛОЕ БУДУЩЕЕ! 🌟');

        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// Console message
console.log('%c🤖 ROBOTS AT WORK 🤖', 'color: #CC0000; font-size: 24px; font-weight: bold;');
console.log('%cВперёд, к автоматизированному будущему!', 'color: #FFD700; font-size: 16px;');
