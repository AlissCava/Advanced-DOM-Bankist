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

///////////////////////////////////////