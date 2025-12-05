// ==================== SLIDESHOW CONFIGURATION ====================
// !!! CRITICAL: Ensure these paths match your folder structure !!!
const heroImages = [
    'img/foto1.jpg', 
    'img/foto2.jpg', 
    'img/foto3.jpg'
];

const ritrattiImages = [
    "img/ritratti/01.jpg", "img/ritratti/02.jpg", "img/ritratti/03.jpg", 
    "img/ritratti/04.jpg", "img/ritratti/05.jpg", "img/ritratti/06.jpg",
    "img/ritratti/07.jpg", "img/ritratti/08.jpg", "img/ritratti/09.jpg",
    "img/ritratti/10.jpg", "img/ritratti/11.jpg", "img/ritratti/12.jpg"
];

const paesaggiImages = [
    "img/paesaggi/01.jpg", "img/paesaggi/02.jpg", "img/paesaggi/03.jpg", 
    "img/paesaggi/04.jpg", "img/paesaggi/05.jpg", "img/paesaggi/06.jpg",
    "img/paesaggi/07.jpg", "img/paesaggi/08.jpg", "img/paesaggi/09.jpg",
    "img/paesaggi/10.jpg", "img/paesaggi/11.jpg", "img/paesaggi/12.jpg"
];

// ==================== REUSABLE SLIDESHOW LOGIC ====================
function createSlideshow(containerId, imageList) {
    const container = document.getElementById(containerId);
    if(!container || imageList.length === 0) return;

    // Shuffle images randomly
    const shuffled = [...imageList].sort(() => 0.5 - Math.random());

    // Create IMG elements dynamically
    const slides = shuffled.map((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'fading-slide';
        // Set first image to visible immediately
        if (i === 0) img.classList.add('visible');
        container.appendChild(img);
        return img;
    });

    // If less than 2 images, no need to fade
    if(slides.length < 2) return;

    let currentIndex = 0;
    
    // Time the slide is fully displayed (4000ms)
    const displayDuration = 4000; 
    // Time it takes to fade (2000ms from CSS variable)
    const fadeDuration = 2000; 
    // Total interval = display time + fade time (4000ms + 2000ms = 6000ms)
    const totalDuration = displayDuration + fadeDuration; 

    // Start slideshow interval
    setInterval(() => {
        const activeSlide = slides[currentIndex];
        
        // 1. Calculate the next index
        currentIndex = (currentIndex + 1) % slides.length;
        const nextSlide = slides[currentIndex];
        
        // 2. Hide the currently visible slide. 
        // This is done BEFORE the next slide is made visible for a true cross-fade.
        // It triggers the fade-out from z-index: 2 (visible) to z-index: 1 (hidden)
        activeSlide.classList.remove('visible');

        // 3. Make the next slide visible.
        // This triggers the fade-in (opacity: 0 to 1) and sets z-index: 2
        // Since the previous slide is also fading out, this creates the cross-fade effect.
        nextSlide.classList.add('visible');

    }, totalDuration);
}

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
            // Subtract navbar height (approx 80px) for smooth scroll destination
            window.scrollTo({
                top: targetSection.offsetTop - 80, 
                behavior: 'smooth'
            });
        }
    });
});

// ==================== INITIALIZE SLIDESHOWS ====================
document.addEventListener('DOMContentLoaded', () => {
    createSlideshow('hero-slideshow', heroImages);
    createSlideshow('ritratti-slideshow', ritrattiImages);
    createSlideshow('paesaggi-slideshow', paesaggiImages);
});