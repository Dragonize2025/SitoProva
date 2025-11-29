// ==================== HORIZONTAL SLIDESHOW ====================
let currentSlide = 0;
const totalSlides = 3;
const slideshowWrapper = document.querySelector('.slideshow-wrapper');

function moveToSlide(index) {
    const percentage = -(index * 33.333);
    slideshowWrapper.style.transform = `translateX(${percentage}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    moveToSlide(currentSlide);
}

// Change slide every 4 seconds
setInterval(nextSlide, 4000);

// ==================== NAVBAR BACKGROUND ON SCROLL ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});