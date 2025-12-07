// ==================== SLIDESHOW CONFIGURATION ====================
const heroImages = [
    'img/foto1.jpg', 
    'img/foto2.jpg', 
    'img/foto3.jpg'
];

const ritrattiImages = [
    "img/ritratti/01.jpg", "img/ritratti/02.jpg", "img/ritratti/03.jpg"
];

const paesaggiImages = [
    "img/paesaggi/01.jpg", "img/paesaggi/02.jpg", "img/paesaggi/03.jpg"
];

// ==================== REUSABLE SLIDESHOW LOGIC ====================
function createSlideshow(containerId, imageList) {
    const container = document.getElementById(containerId);
    if(!container) {
        console.log('Container not found:', containerId);
        return;
    }

    // Shuffle images randomly
    const shuffled = [...imageList].sort(() => 0.5 - Math.random());
    
    // Add first image at the end for seamless infinite loop
    const imagesWithDuplicate = [...shuffled, shuffled[0]];

    // Create IMG elements dynamically
    const slides = imagesWithDuplicate.map((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'fading-slide';
        // Set first image to visible immediately
        if (i === 0) img.classList.add('visible');
        container.appendChild(img);
        return img;
    });

    console.log(`Slideshow created for ${containerId} with ${slides.length} images`);

    // If less than 2 images, no need to fade
    if(slides.length < 2) return;

    let currentIndex = 0;
    const duration = 4000; // Time between changes (4 seconds)
    const fadeTime = 2000; // Fade transition time

    // Start slideshow interval
    setInterval(() => {
        const activeSlide = slides[currentIndex];
        currentIndex++;
        
        // If we've reached the end (the duplicate), prepare to loop
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        
        const nextSlide = slides[currentIndex];

        // Make next slide visible (cross-fade begins)
        nextSlide.classList.add('visible');

        // After fade completes, hide the previous slide
        setTimeout(() => {
            activeSlide.classList.remove('visible');
            
            // If we just faded TO the duplicate (last index), instantly reset to real first
            if (currentIndex === slides.length - 1) {
                // Wait a moment, then silently switch the duplicate for the real first image
                // This happens while the duplicate is visible, so user sees no change
                setTimeout(() => {
                    slides[slides.length - 1].classList.remove('visible');
                    currentIndex = 0;
                    slides[0].classList.add('visible');
                }, duration - fadeTime - 100);
            }
        }, fadeTime);

    }, duration);
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
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            const menu = document.querySelector('.menu');
            if (window.innerWidth <= 768 && menu) {
                menu.style.display = 'none';
            }
        }
    });
});

// ==================== INITIALIZE EVERYTHING ON PAGE LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Initialize slideshows
    createSlideshow('hero-slideshow', heroImages);
    createSlideshow('ritratti-slideshow', ritrattiImages);
    createSlideshow('paesaggi-slideshow', paesaggiImages);
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            if (menu.style.display === 'flex') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'flex';
            }
        });
    }
});