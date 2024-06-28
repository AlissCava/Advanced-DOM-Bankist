'use strict'; // Modalità stretta per prevenire errori

// Selezione degli elementi HTML
const modal = document.querySelector('.modal'); // Seleziona l'elemento con la classe "modal"
const overlay = document.querySelector('.overlay'); // Seleziona l'elemento con la classe "overlay"
const btnCloseModal = document.querySelector('.btn--close-modal'); // Seleziona il bottone con la classe "btn--close-modal"
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); // Seleziona tutti i bottoni con la classe "btn--show-modal"
const btnScrollTo = document.querySelector('.btn--scroll-to'); // Seleziona il bottone con la classe "btn--scroll-to" (non utilizzato in questo codice)
const section1 = document.querySelector('#section--1'); // Seleziona l'elemento con l'id "section--1" (non utilizzato in questo codice)
const nav = document.querySelector('.nav'); // Seleziona l'elemento con la classe "nav" (non utilizzato in questo codice)
const tabs = document.querySelectorAll('.operations__tab'); // Seleziona tutti gli elementi con la classe "operations__tab" (non utilizzato in questo codice)
const tabsContainer = document.querySelector('.operations__tab-container'); // Seleziona l'elemento con la classe "operations__tab-container" (non utilizzato in questo codice)
const tabsContent = document.querySelectorAll('.operations__content'); // Seleziona tutti gli elementi con la classe "operations__content" (non utilizzato in questo codice)

///////////////////////////////////////
// Finestra modale

const openModal = function (e) {
  e.preventDefault(); // Previene l'azione di default del bottone (es. invio di un form)
  modal.classList.remove('hidden'); // Rimuove la classe "hidden" dall'elemento modale, rendendolo visibile
  overlay.classList.remove('hidden'); // Rimuove la classe "hidden" dall'elemento overlay, rendendolo visibile
};

const closeModal = function () {
  modal.classList.add('hidden'); // Aggiunge la classe "hidden" all'elemento modale, nascondendolo
  overlay.classList.add('hidden'); // Aggiunge la classe "hidden" all'elemento overlay, nascondendolo
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal)); // Aggiunge un event listener "click" a tutti i bottoni per aprire la modale

btnCloseModal.addEventListener('click', closeModal); // Aggiunge un event listener "click" al bottone di chiusura della modale
overlay.addEventListener('click', closeModal); // Aggiunge un event listener "click" all'overlay per chiudere la modale cliccandoci sopra

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) { // Controlla se viene premuto il tasto "Escape" e se la modale è visibile
    closeModal(); // Chiude la modale se sono soddisfatte entrambe le condizioni
  }
});



///////////////////////////////////////
// Button scrolling\
///////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords); // Stampa le coordinate rettangolari rispetto al viewport dell'elemento con id "section--1"

  console.log(e.target.getBoundingClientRect()); // Stampa le coordinate rettangolari rispetto al viewport del bottone cliccato

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); // Stampa lo scorrimento corrente della pagina (posizioni orizzontale e verticale)

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); // Stampa l'altezza e la larghezza della finestra del browser

  section1.scrollIntoView({ behavior: 'smooth' }); // Scorri alla sezione 1 con animazione fluida
});

///////////////////////////////////////

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault(); // Previene l'azione di default del link (es. caricamento di una nuova pagina)

  // Strategia di selezione
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); // Scorri alla sezione con id preso dall'href del link cliccato, con animazione fluida
  }
});

////////////////////////////////////////
// **Componente schede a tab (Tabbed component)**
// Seleziona il contenitore delle schede operative
const tabsContainer = document.querySelector('.operations__tabs');

tabsContainer.addEventListener('click', function (e) {
  // Trova la scheda cliccata più vicina con la classe '.operations__tab'
  const clicked = e.target.closest('.operations__tab');

  // Controlla se è stata cliccata una scheda valida
  if (!clicked) return;

  // Rimuovi la classe di attivazione da tutte le schede
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Aggiungi la classe di attivazione alla scheda cliccata
  clicked.classList.add('operations__tab--active');

  // Recupera il contenuto associato alla scheda cliccata
  const targetContent = document
    .querySelector(`.operations__content--${clicked.dataset.tab}`);

  // Controlla se è stato trovato il contenuto associato
  if (targetContent) {
    // Aggiungi la classe di attivazione al contenuto associato
    targetContent.classList.add('operations__content--active');
  } else {
    // Sezione opzionale per gestire il caso in cui non venga trovato il contenuto
    console.error('Contenuto associato alla scheda non trovato');
  }
});

///////////////////////////////////////
// Animazione dissolvenza del menu

const handleHover = function (e) {
  // Controlla se l'elemento cliccato ha la classe 'nav__link'
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    // Attenua l'opacità di tutti i link tranne quello cliccato
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // valore dell'opacità verrà assegnato successivamente
    });

    // Attenua l'opacità del logo del menu
    logo.style.opacity = this; // valore dell'opacità verrà assegnato successivamente
  }
};

// Assegna il valore dell'opacità alla funzione handleHover (modifica per personalizzare l'effetto)
handleHover.call(this, 0.5); // Esempio: Imposta l'opacità a 0.5 per un leggero effetto dissolvenza
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Navigazione fissa: Intersection Observer API

const header = document.querySelector('.header'); // Seleziona l'elemento header
const navHeight = nav.getBoundingClientRect().height; // Ottieni l'altezza dell'elemento nav

const stickyNav = function (entries) {
  const [entry] = entries; // Destruttura l'array entries per accedere al primo elemento (entry)
  // console.log(entry); // Puoi usare questo per visualizzare i dettagli dell'intersezione durante lo sviluppo

  if (!entry.isIntersecting) { // Se l'header non è più visibile nel viewport
    nav.classList.add('sticky'); // Aggiungi la classe "sticky" alla navigazione
  } else {
    nav.classList.remove('sticky'); // Rimuovi la classe "sticky" alla navigazione
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,  // Usa il viewport del documento come elemento radice (intera pagina)
  threshold: 0,  // Controlla l'intersezione al 100% (tutta l'header deve uscire dal viewport)
  rootMargin: `-${navHeight}px`,  // Sposta la soglia di intersezione verso l'alto dell'altezza della nav
});

headerObserver.observe(header); // Inizia a osservare l'elemento header
                                 // per rilevare i cambiamenti di intersezione

///////////////////////////////////////
// Rivela le sezioni
const allSections = document.querySelectorAll('.section'); // Seleziona tutti gli elementi con classe "section"

const revealSection = function (entries, observer) {
  const [entry] = entries; // Destruttura l'array entries per accedere al primo elemento (entry)

  if (!entry.isIntersecting) return; // Se la sezione non è ancora intersecata con il viewport, interrompi

  entry.target.classList.remove('section--hidden'); // Rimuovi la classe "section--hidden" dalla sezione
  observer.unobserve(entry.target); // Smetti di osservare la sezione rivelata per ottimizzare le prestazioni
};

const sectionObserver = new Intersection Observer(revealSection, {
  root: null,  // Usa il viewport del documento come elemento radice (intera pagina)
  threshold: 0.15, // Controlla l'intersezione quando il 15% della sezione entra nel viewport
});

allSections.forEach(function (section) {
  sectionObserver.observe(section); // Inizia a osservare ogni sezione
  section.classList.add('section--hidden'); // Aggiungi inizialmente la classe "section--hidden" per nascondere le sezioni
});

///////////////////////////////////////
// Lazy loading images
// Caricamento lazy delle immagini (lazy loading)
const imgTargets = document.querySelectorAll('img[data-src]');

const caricaImmagine = function (entries, observer) {
  // Prendi il primo elemento dall'array entries
  const [entry] = entries;

  // Se l'immagine non è intersezionale (cioè non è ancora visibile), ritorna
  if (!entry.isIntersecting) return;

  // Sostituisci l'attributo src con il valore di data-src
  entry.target.src = entry.target.dataset.src;

  // Aggiungi un event listener 'load' all'immagine
  entry.target.addEventListener('load', function () {
    // Rimuovi la classe 'lazy-img' dall'immagine caricata
    entry.target.classList.remove('lazy-img');
  });

  // Smetti di osservare l'immagine caricata
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(caricaImmagine, {
  // Imposta la radice dell'osservatore a null (tutto il viewport)
  root: null,
  // Soglia di intersezione: l'immagine viene caricata quando è completamente visibile
  threshold: 0,
  // Margine della radice: aggiungi un margine di 200px per caricare le immagini leggermente prima che entrino nel viewport
  rootMargin: '200px',
});

// Aggiungi ogni immagine target all'osservatore
imgTargets.forEach(img => imgObserver.observe(img));

////////////////////////////////////////
//slider
///////////////////////////////////////
// Slider con Commenti in Italiano

const slider = function () {
  // Seleziona tutti gli elementi slider con classe "slide"
  const slides = document.querySelectorAll('.slide');

  // Seleziona i pulsanti di navigazione sinistra e destra dello slider
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  // Seleziona il contenitore per i pallini dello slider
  const dotContainer = document.querySelector('.dots');

  // Indice slide corrente (inizia da 0)
  let curSlide = 0;

  // Numero totale di slide
  const maxSlide = slides.length;

  // Funzioni

  // Crea pallini per ogni slide
  const createDots = function () {
    slides.forEach(function (_, i) {
      // Inserisci HTML per un elemento pallino con attributo data-slide impostato sull'indice slide
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Attiva il pallino corrispondente alla slide corrente
  const activateDot = function (slide) {
    // Rimuove la classe "dots__dot--active" da tutti i pallini
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    // Aggiungi la classe "dots__dot--active" al pallino per la slide corrente
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  };

  // Sposta lo slider a una slide specifica
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      // Imposta lo stile trasformazione per ogni slide per tradurla orizzontalmente in base al suo indice relativo alla slide corrente
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  // Passa alla slide successiva
  const nextSlide = function () {
    // Gestisce il loop alla prima slide se si trova sull'ultima
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Passa alla slide precedente
  const prevSlide = function () {
    // Gestisce il loop all'ultima slide se si trova sulla prima
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Inizializza lo slider
  const init = function () {
    goToSlide(0); // Inizia dalla prima slide
    createDots();
    activateDot(0); // Attiva il primo pallino
  };

  init(); // Chiama la funzione di inizializzazione

  // Gestori eventi

  // Aggiungi un gestore eventi click per il pulsante di navigazione a destra
  btnRight.addEventListener('click', nextSlide);

  // Aggiungi un gestore eventi click per il pulsante di navigazione a sinistra
  btnLeft.addEventListener('click', prevSlide);

  // Aggiungi un gestore eventi tastiera per i tasti freccia
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Aggiungi un gestore eventi click per il contenitore dei pallini
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // Ottieni l'indice slide dall'attributo data-slide del pallino cliccato
      const slide = e.target.dataset.slide;

      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider(); // Chiama la funzione slider per creare lo slider
