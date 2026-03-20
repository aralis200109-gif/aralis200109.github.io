// ===== MENÚ HAMBURGUESA =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== ANIMACIONES AL HACER SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos los elementos con clase fade-in-on-scroll
document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
    observer.observe(element);
});

// ===== EFECTO NAVBAR AL SCROLL =====
let lastScrollPosition = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    
    if (currentScrollPosition > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollPosition = currentScrollPosition;
});

// ===== SUAVIDAD EN DESPLAZAMIENTO DE ANCLAS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            const element = document.querySelector(href);
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== VALIDACIÓN DEL FORMULARIO DE CONTACTO =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff6b6b';
                input.setAttribute('placeholder', 'Este campo es requerido');
            } else {
                input.style.borderColor = '#e0e0e0';
            }
        });
        
        if (isValid) {
            // Mostrar mensaje de éxito
            alert('¡Mensaje enviado correctamente! Pronto me pondré en contacto contigo.');
            this.reset();
            inputs.forEach(input => {
                input.style.borderColor = '#e0e0e0';
            });
        }
    });
    
    // Limpiar estilos de error al escribir
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#e0e0e0';
        });
    });
}

// ===== ANIMACIÓN DE NÚMEROS DE ESTADÍSTICAS =====
const stats = document.querySelectorAll('.stat h3');
let hasBeenCounted = false;

const countUpAnimation = () => {
    if (hasBeenCounted) return;
    
    stats.forEach(stat => {
        const text = stat.innerText;
        
        // Manejar casos especiales como "100%" e "∞"
        if (text.includes('%')) {
            const finalValue = 100;
            const duration = 1500;
            const startTime = Date.now();
            
            const updateCount = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentValue = Math.floor(progress * finalValue);
                
                stat.innerText = currentValue + '%';
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                }
            };
            
            updateCount();
        } else if (text.includes('∞') || text.includes('+')) {
            // Para infinito o valores con +, no animar
            stat.innerText = text;
        }
    });
    
    hasBeenCounted = true;
};

// Ejecutar animación cuando se hace scroll a la sección de estadísticas
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasBeenCounted) {
                countUpAnimation();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(aboutSection);
}

// ===== CARGAR ANIMACIONES DE PROGRESO =====
const progressBars = document.querySelectorAll('.progress');
let hasAnimated = false;

const animateProgressBars = () => {
    if (hasAnimated) return;
    
    progressBars.forEach((bar, index) => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.animation = 'none';
            bar.style.width = targetWidth;
        }, 50 + index * 100);
    });
    
    hasAnimated = true;
};

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateProgressBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillsObserver.observe(skillsSection);
}

// ===== EFECTO HOVER EN TARJETAS DE PROYECTOS =====
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== AL CARGAR LA PÁGINA =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log('✨ ¡Portafolio de Liz Araceli cargado correctamente!');
});

console.log('💻 Ingeniera en Sistemas Informáticos | Desarrolladora Full Stack');
