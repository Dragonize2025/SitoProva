// ==================== HORIZONTAL SLIDESHOW WITH LOOP ====================
let currentSlide = 0;
const totalSlides = 3;
const slideshowWrapper = document.querySelector('.slideshow-wrapper');
const slideshowBackground = document.querySelector('.slideshow-background');
const slides = document.querySelectorAll('.slide');

// Set initial background
updateBackground(0);

function updateBackground(index) {
    const img = slides[index].querySelector('img');
    if (img) {
        slideshowBackground.style.backgroundImage = `url(${img.src})`;
    }
}

function moveToSlide(index) {
    const percentage = -(index * 25);
    slideshowWrapper.style.transform = `translateX(${percentage}%)`;
    updateBackground(index);
}

function nextSlide() {
    currentSlide++;
    
    if (currentSlide < totalSlides) {
        moveToSlide(currentSlide);
    } else {
        // Move to duplicate first slide (index 3)
        slideshowWrapper.style.transition = 'transform 1s ease-in-out';
        moveToSlide(3);
        
        // After transition, reset to actual first slide without animation
        setTimeout(() => {
            slideshowWrapper.style.transition = 'none';
            currentSlide = 0;
            moveToSlide(0);
            
            // Re-enable transition after reset
            setTimeout(() => {
                slideshowWrapper.style.transition = 'transform 1s ease-in-out';
            }, 50);
        }, 1000);
    }
}

// Change slide every 4 seconds
setInterval(nextSlide, 4000);

// ==================== NAVBAR OPACITY ON SCROLL ====================
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