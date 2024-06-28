'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

///////////////////////////

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
 m
///////////////////////////////////////
// Button scrolling\
btnScrollTo.addEventListener('click', function(e){
const s1coords = section1.getBoundingClientRect();
console.log(s1coords);

console.log(e.target.getBoundingClientRect);

console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

console.log(
  'jeght/whidt viewport',
  document.documentElement.clientHeight,
  document.documentElement.clientWidth,
)

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({behavior: 'smooth'});
});

///////////////////////////////////////

/*
// **Paginazione**
// Seleziona tutti gli elementi con la classe 'nav__link' e li processa individualmente
document.querySelectorAll('.nav__link').forEach(function (el) {
  // Aggiunge un event listener 'click' ad ogni elemento
  el.addEventListener('click', function (e) {
    // Previene il comportamento di default del link (evita che la pagina salti)
    e.preventDefault();

    // Recupera l'ID della sezione target dall'attributo 'href' del link
    const id = this.getAttribute('href');

    // Debug: stampa l'ID ottenuto (console) del browser
    console.log(id);

    // Scorri dolcemente alla sezione con l'ID corrispondente
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

// Paginazione (Navigation)
// Seleziona l'elemento con la classe 'nav__links' (assume che ci sia solo uno)
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // Previene il comportamento di default del click (evita che la pagina salti)
  e.preventDefault();

  // Strategia di selezione target (Matching strategy). se quello che ho cliccato ha tra le ckassi quella cerecata...
  if (e.target.classList.contains('nav__link')) {
    // Verifica se l'elemento cliccato ha la classe 'nav__link'
    const id = e.target.getAttribute('href');
    // Recupera l'ID della sezione target dall'attributo 'href' del link cliccato

    // Scorri dolcemente alla sezione con l'ID corrispondente
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////
// **Componente schede a tab (Tabbed component)**

// Aggiunge un event listener 'click' al contenitore delle schede
tabsContainer.addEventListener('click', function (e) {

  // Recupera l'elemento cliccato più vicino con la classe 'operations__tab'
  const clicked = e.target.closest('.operations__tab');

  // Clausola di guardia (Guard clause)
  if (!clicked) return; // Se non è stato cliccato un elemento valido, esci dalla funzione

  // Rimuovi le classi 'active' da tutte le schede e contenuti
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Attiva la scheda cliccata
  clicked.classList.add('operations__tab--active');

   /*
  // Recupera il contenuto associato alla scheda cliccata tramite dataset.tab
  const contentId = `operations__content--${clicked.dataset.tab}`;
  const content = document.querySelector(contentId);

  // Attiva il contenuto associato alla scheda cliccata
 
  if (content) {
    content.classList.add('operations__content--active');
  } else {
    // Debug: messaggio di avviso se non viene trovato il contenuto associato
    console.error("Contenuto associato alla scheda non trovato:", contentId);
  }
  */

  document
  .querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');
});

// **Animazione fade del menu** (Menu fade animation)

// Funzione per gestire l'effetto hover sui link di navigazione
const handleHover = function (e) {
  // Controlla se l'elemento su cui si passa sopra ha la classe 'nav__link'
  if (e.target.classList.contains('nav__link')) {
    // Recupera l'elemento del link cliccato
    const link = e.target;

    // Recupera tutti i link fratelli all'interno dello stesso elemento .nav
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    // Recupera l'immagine del logo (se presente) all'interno dello stesso elemento .nav
    const logo = link.closest('.nav').querySelector('img');

    // Scorri ogni elemento fratello del link cliccato
    siblings.forEach(el => {
      // Imposta l'opacità degli elementi fratelli (diversi dal link cliccato) al valore specificato nell'argomento "this" (da definire)
      if (el !== link) el.style.opacity = this;
    });

    // Imposta l'opacità del logo (se presente) al valore specificato nell'argomento "this" (da definire)
    logo.style.opacity = this;
  }
};

// **Passaggio dell'argomento alla funzione handleHover** (Passing "argument" into handler)

// Aggiunge event listener 'mouseover' al contenitore del menu (nav)
nav.addEventListener('mouseover', handleHover.bind(0.5)); // Attendiamo a 'mouseover', passiamo 0.5 come argomento

// Aggiunge event listener 'mouseout' al contenitore del menu (nav)
nav.addEventListener('mouseout', handleHover.bind(1)); // Attendiamo a 'mouseout', passiamo 1 come argomento
 
// **Navigazione adesiva: Intersection Observer API** (Sticky navigation: Intersection Observer API)

// Recupera l'elemento dell'header
const header = document.querySelector('.header');

// Ottieni l'altezza della navigazione
const navHeight = nav.getBoundingClientRect().height;

// Funzione per gestire la navigazione adesiva
const stickyNav = function (entries) {
  // Recupera il primo elemento dall'array entries
  const [entry] = entries;

  // Debug: rimuovi il commento per visualizzare i dettagli dell'intersezione nella console
  // console.log(entry);

  // Aggiungi la classe 'sticky' alla navigazione se non è più intersecante con il root
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    // Rimuovi la classe 'sticky' alla navigazione se è intersecante con il root
    nav.classList.remove('sticky');
  }
};

// Crea un nuovo Intersection Observer per la navigazione adesiva
const headerObserver = new IntersectionObserver(stickyNav, {
  // Imposta il root a null (intera finestra del viewport)
  root: null,
  // Soglia di intersezione: considera la navigazione adesiva quando è completamente fuori (threshold: 0)
  threshold: 0,
  // Aggiunge un margine negativo all'elemento root pari all'altezza della navigazione
  rootMargin: `-${navHeight}px`,
});

// Osserva l'header con l'Intersection Observer per la navigazione adesiva
headerObserver.observe(header);


///////////////////////////////////////
// Rivela le sezioni (Reveal sections)

// Recupera tutte le sezioni con la classe 'section'
const allSections = document.querySelectorAll('.section');

// Funzione per rivelare una sezione
const revealSection = function (entries, observer) {
  // Recupera il primo elemento dall'array entries
  const [entry] = entries;

  // Se la sezione non è intersecante con il root, esci dalla funzione
  if (!entry.isIntersecting) return;

  // Rimuovi la classe 'section--hidden' dalla sezione intersecante
  entry.target.classList.remove('section--hidden');

  // Smetti di osservare la sezione rivelata per evitare controlli ridondanti
  observer.unobserve(entry.target);
};

// Crea un nuovo Intersection Observer per rivelare le sezioni
const sectionObserver = new IntersectionObserver(revealSection, {
  // Imposta il root a null (intera finestra del viewport)
  root: null,
  // Soglia di intersezione: rivela la sezione quando è almeno al 15% visibile (threshold: 0.15)
  threshold: 0.15,
});

// Aggiungi la classe 'section--hidden' a tutte le sezioni e inizia a osservarle
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////


