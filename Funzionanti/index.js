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

const matrimoniImages = [
    "img/matrimoni/a.jpg", "img/matrimoni/b.jpg", "img/matrimoni/c.jpg"
];

const eventiImages = [
    "img/eventi/01.jpg", "img/eventi/02.jpg", "img/eventi/03.jpg"
];

const compleanniImages = [
    "img/compleanni/a.jpg", "img/compleanni/b.jpg", "img/compleanni/c.jpg"
];

const dettagliImages = [
    "img/dettagli/01.jpg", "img/dettagli/02.jpg", "img/dettagli/03.jpg"
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

document.addEventListener("DOMContentLoaded", function() {
    // --- CONTROLLO DATA TEMPORALE ---
    const oggi = new Date();
    const mese = oggi.getMonth(); // 0 = Gennaio, 11 = Dicembre
    const giorno = oggi.getDate();

    // Definiamo il periodo: Dicembre (mese 11) oppure Gennaio (mese 0) fino al giorno 6
    // In questa:
    const periodoNatalizio = (mese === 11) || (mese === 0 && giorno <= 6);

    if (!periodoNatalizio) {
        console.log("Luci di Natale disattivate: torneranno il 1 Dicembre!");
        return; // Esce dalla funzione e non crea le lucine
    }
    // --------------------------------

    // Se siamo nel periodo giusto, il codice prosegue qui sotto:
    const sectionHeaders = document.querySelectorAll('section > h2');

    sectionHeaders.forEach(header => {
        header.style.position = 'relative';

        const lightsContainer = document.createElement('ul');
        lightsContainer.className = 'xmas-lights-container';

        const bulbsPerLine = 12; 

        for (let i = 0; i < bulbsPerLine; i++) {
            const bulb = document.createElement('li');
            bulb.className = 'xmas-bulb';
            
            const randomDelay = Math.random() * 1.5;
            // Calcolo del delay basato sullo stile calcolato o default a 0
            const currentDelayStr = window.getComputedStyle(bulb).animationDelay;
            const currentDelayNum = parseFloat(currentDelayStr) || 0;
            bulb.style.animationDelay = `${currentDelayNum + randomDelay}s`;

            lightsContainer.appendChild(bulb);
        }

        header.appendChild(lightsContainer);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Selettore specifico per gli H2 che sono figli diretti delle section
    // Questo prenderà: Biografia, Lavori, Mostre, Varie, Contatti
    const sectionHeaders = document.querySelectorAll('section > h2');

    sectionHeaders.forEach(header => {
        // Assicura che l'header abbia posizione relativa per contenere le luci assolute
        header.style.position = 'relative';

        // Crea il contenitore per questo header
        const lightsContainer = document.createElement('ul');
        lightsContainer.className = 'xmas-lights-container';

        // Numero di lampadine per riga (aumenta o diminuisci a piacere)
        const bulbsPerLine = 12; 

        for (let i = 0; i < bulbsPerLine; i++) {
            const bulb = document.createElement('li');
            bulb.className = 'xmas-bulb';
            
            // Aggiunge un piccolo ritardo casuale extra per rendere l'animazione meno "meccanica"
            const randomDelay = Math.random() * 1.5;
            // Somma il ritardo casuale a quello definito nel CSS (delay esistente + random)
             const currentDelayStr = window.getComputedStyle(bulb).animationDelay;
             const currentDelayNum = parseFloat(currentDelayStr) || 0;
            bulb.style.animationDelay = `${currentDelayNum + randomDelay}s`;

            lightsContainer.appendChild(bulb);
        }

        // Inserisce il contenitore DELLE LUCI DENTRO l'H2
        header.appendChild(lightsContainer);
    });
});

// ==================== INITIALIZE EVERYTHING ON PAGE LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Initialize ALL slideshows
    createSlideshow('hero-slideshow', heroImages);
    createSlideshow('ritratti-slideshow', ritrattiImages);
    createSlideshow('paesaggi-slideshow', paesaggiImages);
    createSlideshow('matrimoni-slideshow', matrimoniImages);
    createSlideshow('eventi-slideshow', eventiImages);
    createSlideshow('compleanni-slideshow', compleanniImages);
    createSlideshow('dettagli-slideshow', dettagliImages);
    
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