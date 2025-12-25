// ============================================
// ROBOTS AT WORK - Terminal Interface
// Soviet NII Cyberpunk Theme
// ============================================

// Terminal Boot Sequence
window.addEventListener('load', () => {
    console.log('%c╔════════════════════════════════════════════════════════╗', 'color: #00ff41');
    console.log('%c║  ROBOTS AT WORK - NII TERMINAL v1.984                 ║', 'color: #00ff41');
    console.log('%c║  SYSTEM STATUS: ONLINE                                ║', 'color: #00ff41');
    console.log('%c║  AI AUTOMATION PROTOCOLS: ACTIVE                      ║', 'color: #00ff41');
    console.log('%c╚════════════════════════════════════════════════════════╝', 'color: #00ff41');
    console.log('%c> Initiating connection...', 'color: #ffb000');
    console.log('%c> Terminal ready', 'color: #33ff33');
});

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

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect on hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    // Remove the ::before content text from the typing
    const textToType = originalText.replace('SYS_ONLINE // ', '');

    // Wait a bit before starting typing
    setTimeout(() => {
        const textNode = Array.from(heroTitle.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if (textNode) {
            typeWriter(textNode, textToType, 80);
        }
    }, 500);
}

// Glitch effect on random elements
function triggerGlitch(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'glitch 0.3s ease';
    }, 10);
}

// Random glitch on service cards
setInterval(() => {
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0 && Math.random() > 0.7) {
        const randomCard = serviceCards[Math.floor(Math.random() * serviceCards.length)];
        triggerGlitch(randomCard);
    }
}, 5000);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Add terminal-style reveal effect
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';

            setTimeout(() => {
                entry.target.style.transition = 'all 0.5s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
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

// Form validation and submission with terminal feedback
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
            showTerminalAlert('ERROR: All fields required', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showTerminalAlert('ERROR: Invalid email format', 'error');
            return;
        }

        // Success message
        showTerminalAlert(`> Connection established\n> Message queued for transmission\n> Recipient: ${name}\n> Status: SUCCESS`, 'success');

        // Reset form
        contactForm.reset();
    });
}

// Terminal-style alert
function showTerminalAlert(message, type = 'info') {
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.95);
        border: 2px solid ${type === 'error' ? '#ff0000' : '#00ff41'};
        color: ${type === 'error' ? '#ff0000' : '#00ff41'};
        padding: 30px 40px;
        font-family: 'Courier New', monospace;
        font-size: 1rem;
        z-index: 10000;
        box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
        white-space: pre-line;
        text-shadow: 0 0 5px currentColor;
        animation: fadeIn 0.3s ease;
    `;

    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    // Add close button
    const closeBtn = document.createElement('div');
    closeBtn.textContent = '[ PRESS ANY KEY TO CONTINUE ]';
    closeBtn.style.cssText = `
        margin-top: 20px;
        text-align: center;
        opacity: 0.7;
        font-size: 0.8rem;
        animation: blink 1s infinite;
    `;
    alertBox.appendChild(closeBtn);

    // Close on any key press or click
    const closeAlert = () => {
        alertBox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 300);
        document.removeEventListener('keydown', closeAlert);
        alertBox.removeEventListener('click', closeAlert);
    };

    document.addEventListener('keydown', closeAlert);
    alertBox.addEventListener('click', closeAlert);
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
            link.style.borderColor = 'var(--color-terminal-green)';
            link.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
        } else {
            link.style.borderColor = 'transparent';
            link.style.backgroundColor = 'transparent';
        }
    });
});

// Counter animation for stats (terminal style)
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 30);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;

            // Extract number from text
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

// Matrix rain effect (easter egg)
let matrixActive = false;

function createMatrixRain() {
    if (matrixActive) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9997;
        opacity: 0.3;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    matrixActive = true;

    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    const interval = setInterval(draw, 33);

    // Stop after 10 seconds
    setTimeout(() => {
        clearInterval(interval);
        document.body.removeChild(canvas);
        matrixActive = false;
    }, 10000);
}

// Konami code for Matrix rain
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        createMatrixRain();
        showTerminalAlert('> MATRIX MODE ACTIVATED\n> За светлое будущее автоматизации!', 'success');
    }
});

// Random terminal messages in console
const terminalMessages = [
    '> Analyzing automation protocols...',
    '> Optimizing AI algorithms...',
    '> Scanning for inefficiencies...',
    '> Robot workforce status: OPTIMAL',
    '> Future progress index: 98.4%',
    '> Comrade, the machines are ready'
];

setInterval(() => {
    const msg = terminalMessages[Math.floor(Math.random() * terminalMessages.length)];
    console.log('%c' + msg, 'color: #33ff33; font-family: monospace;');
}, 15000);

// Cursor blink effect for inputs
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.3)';
    });

    input.addEventListener('blur', function() {
        this.style.boxShadow = 'none';
    });
});

// System time display (optional - can be added to footer)
function updateSystemTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU', { hour12: false });
    console.log(`%c[${timeString}] System operational`, 'color: #ffb000; font-family: monospace;');
}

// Update time every minute
setInterval(updateSystemTime, 60000);
