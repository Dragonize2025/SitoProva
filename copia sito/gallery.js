// Array of images - modify this for each gallery page
const images = [
    'img/ritratto1.jpg',
    'img/ritratto2.jpg',
    'img/ritratto3.jpg',
    'img/ritratto4.jpg',
    'img/ritratto5.jpg',
    'img/ritratto6.jpg'
];

let currentIndex = 0;

// Update main image and background
function updateImage(index) {
    const mainImage = document.getElementById('mainImage');
    const imageBackground = document.querySelector('.image-background');
    
    mainImage.style.opacity = '0';
    
    setTimeout(() => {
        mainImage.src = images[index];
        imageBackground.style.backgroundImage = `url(${images[index]})`;
        mainImage.style.opacity = '1';
    }, 150);
    
    updateThumbnails(index);
}

// Update thumbnail active state
function updateThumbnails(index) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Select image from thumbnail click
function selectImage(index) {
    currentIndex = index;
    updateImage(currentIndex);
}

// Navigate with arrows
function changeImage(direction) {
    currentIndex += direction;
    
    // Loop around
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    
    updateImage(currentIndex);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (e.key === 'ArrowRight') {
        changeImage(1);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const imageBackground = document.querySelector('.image-background');
    imageBackground.style.backgroundImage = `url(${images[0]})`;
});