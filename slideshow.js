// Logica per lo Slideshow gestita interamente da JavaScript per un ciclo fluido e pause precise.

// --- CONFIGURAZIONE ---
const track = document.getElementById('slideshow-track');
        if (track) { // Controllo per evitare errori se l'elemento non è trovato
            // Seleziona tutte le slide all'interno del track
            const slides = document.querySelectorAll('#slideshow-track .slide'); 
            // Il numero di slide originali è 3, ma il track ne contiene 4 (inclusa la copia)
            const totalOriginalSlides = slides.length - 1; 
            // La larghezza di una singola slide in percentuale (100% / 4 slide = 25%)
            const slideWidthPercent = 100 / slides.length; 
            const pauseDuration = 4000; // 4 secondi di pausa (millisecondi)
            const transitionDuration = 1500; // 1.5 secondi di scorrimento (millisecondi)

            let currentSlideIndex = 0; // Inizia dalla slide 0

            function moveNext() {
                // 1. Aumenta l'indice della slide (0 -> 1 -> 2 -> 3)
                currentSlideIndex++;

                // Calcola il valore di spostamento (es: 0%, -25%, -50%, -75%)
                const translateXValue = currentSlideIndex * slideWidthPercent;

                // 2. Applica la transizione (scorrimento fluido)
                track.style.transform = `translateX(-${translateXValue}%)`;

                // 3. Gestire la ciclicità (il salto nascosto)
                // Se l'indice raggiunge l'ultima slide (la copia della prima, indice 3)
                if (currentSlideIndex === totalOriginalSlides) {
                    
                    // Aspetta che lo scorrimento fluido (1.5s) sia terminato
                    setTimeout(() => {
                        
                        // a) Disattiva la transizione per il salto istantaneo
                        track.style.transition = 'none'; 
                        
                        // b) Esegui il salto istantaneo al punto di partenza (slide 0)
                        track.style.transform = 'translateX(0)';
                        
                        // c) Resetta l'indice logico
                        currentSlideIndex = 0; 

                        // d) Riattiva la transizione CSS subito dopo il salto
                        setTimeout(() => {
                            // Riattiva la transizione CSS per il prossimo ciclo
                            track.style.transition = `transform ${transitionDuration / 1000}s ease-in-out`;
                        }, 50); // Piccolo ritardo (50ms) per garantire il reset visivo
                        
                    }, transitionDuration); // Usa la durata della transizione
                }
            }

        // Avvia l'intervallo principale: Pausa (4s) + Durata Scorrimento (1.5s)
        // L'intervallo totale è 5.5 secondi
        setInterval(moveNext, pauseDuration + transitionDuration);
    }