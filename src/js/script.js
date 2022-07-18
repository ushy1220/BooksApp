/* eslint-disable no-undef */
/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars/


'use strict';

// Utworzenie referencji do szablonu (do zad. 1)
const templates = {
  bookTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML),
};

/*  
1. Utworzenie i wywołanie funkcji, która przejdzie po wszystkich książkach z "dataSource.books" i wyrenderuje dla nich reprezentacje HTML w liście "".books-list". Należy wykorzystać w tym celu dostarczony w "index.html" szablon (#template-book). 
*/
render();
initActions();


function render() { // nowa funkcja render
  const thisBookList = this;

  //Wewnątrz niej przejdź po każdym elemencie z dataSource.books. Pamiętaj, że plik script.js ma do tego obiektu bezpośredni dostęp.
  for(let book of dataSource.books){

    //Wewnątrz tej pętli zadbaj o wygenerowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce.
    const generatedHTML = templates.bookTemplate(book);

    //Na postawie tego kodu HTML wygeneruj element DOM.
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);    //funkcja w functions.js

    //Wygenerowany element DOM dołącz jako nowe dziecko DOM do listy .books-list.
    thisBookList.appendChild(generatedDOM);
  }   
}

/* 
2. Dodaj do JS-a pustą tablicę "favoriteBooks" oraz odpowiedni kod, który zadba o to, aby przy dwukliku na okładkę dowolnej książki, jej id było dodawane do tej tablicy, a do samego elementu HTML została dodana klasa favorite. 

3. Zmodyfikuj swoją funkcję przypiętą do nasłuchiwacza, aby najpierw sprawdzała, czy książka nie jest już w "ulubionych". Jeśli nie jest, to funkcja ma dodać klasę favorite i zapisać id książki w tablicy favoriteBooks. Jeśli jednak jest, to skrypt powinien usuwać id takiej książki z tablicy favoriteBooks oraz zabierać takiemu elementowi klasę favorite.
*/

// Dodanie nowej tablicy (2)
const favouriteBooks = [];

// Utowrzenie nowej funkcji "initActions" (2)
function initActions(){

  // referencję do listy wszystkich elementów .book__image w liście .booksList. (2)
  const allElems = document.querySelectorAll(select.containerOf.image);

  // przejdź po każdym elemencie z tej listy. (2)
  for(let elem of allElems){

    // Dla każdego z nich dodaj nasłuchiwacz, który po wykryciu uruchomi funkcję, która... (2)
    elem.addEventListener('dbclick', function(event){

      // ...zatrzyma domyślne zachowanie przeglądarki (2)
      event.preventDefault();
    });

    // Sprawdź, czy element zawiera klasę .favorite. Jeśli ma, to również oznacza to, że tak dana książka musi być już w "ulubionych". (3)
    if(clickedElement.classlist.contains('favorire')){
        
      // jeśli tak, to usunie z kilkniętego elementu klase favorite (3)
      clickedElement.classlist.remove('favorite');
    } else {

      // doda do klikniętego elementu klasę favorite, (2)
      clickedElement.classlist.add('favorite');
    }
    
    // pobierze z jego data-id identyfikator książki, (2)
    const bookId = clickedElement.getAttribute('data-id');

    // i doda ten identyfikator do favoriteBooks (2)
    favouriteBooks.push(bookId);
  }
}
