/* eslint-disable no-undef */
/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars/

{
  'use strict';

  // Utworzenie referencji do szablonu (do zad. 1)

  /* 

const templates = {
  bookTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML),
};

*/
  const select = {
    templateOf: {
      books: '#template-book',
    },

    listOf: {
      booklist: '.books-list',
      filters: '.filters',
    },

    containerOf: {
      image: '.book_image',
    },

    imageParams: {
      id: '.book-id',
    },


  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };


  /*  
1. Utworzenie i wywołanie funkcji, która przejdzie po wszystkich książkach z "dataSource.books" i wyrenderuje dla nich reprezentacje HTML w liście "".books-list". Należy wykorzystać w tym celu dostarczony w "index.html" szablon (#template-book). 
*/

  class Booklist {
    constructor(){
      const thisBookList = this;

      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
      thisBookList.filteredBooks();
      thisBookList.determineRatingBgc();
    }

    initData(){
      const thisBookList = this;
        
      thisBookList.data = dataSource.books; //ułatwienie nawigacji do danych książek
    }

    getElements(){
      const thisBookList = this;

      thisBookList.bookListContainer = document.querySelector(select.listOf.booklist);
      thisBookList.imageListContainer = document.querySelector(select.containerOf.image); 
      thisBookList.filtersContainer = document.querySelector(select.listOf.filters); 
      thisBookList.paramsContainer = document.querySelector(select.imageParams.id);

      // Dodanie nowej tablicy ulubionych książek (2)
      thisBookList.favouriteBooks = [];

      // Dodanie nowej tablicy "filters" do przechowywania informacji, jakie aktualnie filtry są wybrane (5)
      thisBookList.filters = [];
    }

    render() { // nowa funkcja render
      const thisBookList = this;

      //Wewnątrz niej przejdź po każdym elemencie z dataSource.books. Pamiętaj, że plik script.js ma do tego obiektu bezpośredni dostęp.
      for(let book of dataSource.books){

        //Wewnątrz tej pętli zadbaj o wygenerowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce.
        const generatedHTML = select.templateOf.books(book);

        //Na postawie tego kodu HTML wygeneruj element DOM.
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);    //funkcja w functions.js

        //Wygenerowany element DOM dołącz jako nowe dziecko DOM do listy .books-list.
        thisBookList.bookListContainer.appendChild(generatedDOM);
      }   
    }

    /* 
2. Dodaj do JS-a pustą tablicę "favoriteBooks" oraz odpowiedni kod, który zadba o to, aby przy dwukliku na okładkę dowolnej książki, jej id było dodawane do tej tablicy, a do samego elementu HTML została dodana klasa favorite. 

3. Zmodyfikuj swoją funkcję przypiętą do nasłuchiwacza, aby najpierw sprawdzała, czy książka nie jest już w "ulubionych". Jeśli nie jest, to funkcja ma dodać klasę favorite i zapisać id książki w tablicy favoriteBooks. Jeśli jednak jest, to skrypt powinien usuwać id takiej książki z tablicy favoriteBooks oraz zabierać takiemu elementowi klasę favorite.

4. Zmodyfikuj funkcję initActions, aby zamiast nadawać nasłuchwiacze na wszystkie okładki książek z osobna, dodawała tylko jeden na całą listę. Sama funkcja w środku nasłuchiwacza (callback) powinna być prawie identyczna. Z tym, że teraz dostęp do elementu klikniętego będzie możliwy tylko przez event.target, a zanim funkcja zacznie wykonywać dalsze operacje, powinna sprawdzić, czy event.target jest odpowiednim elementem, a więc, czy posiada klasę .book__image (event.target.classList.contains('.book__image')).
*/



    // Utowrzenie nowej funkcji "initActions" (2)
    initActions(){
      const thisBookList = this;

      // referencję do listy wszystkich elementów .book__image w liście .booksList. (2)
      const allElems = document.querySelectorAll(select.containerOf.image);

      // przejdź po każdym elemencie z tej listy. (2)
      //for(let elem of allElems){

      // Dla każdego z nich dodaj nasłuchiwacz, który po wykryciu uruchomi funkcję, która... (2 na 4(na całą listę))
      /* elem.addEventListener('dbclick', function(event){ */

      // Nasłuchiwacz na całą listę zamiast na każdy plik osobno (4)
      allElems.addEventListener('dbclick', function(event){

        // ...zatrzyma domyślne zachowanie przeglądarki (2)
        event.preventDefault();
   
        // Sprawdź, czy element zawiera klasę .favorite. Jeśli ma, to również oznacza to, że tak dana książka musi być już w "ulubionych". (3)
        /* if(!clickedElement.classlist('favorire')){ 
        
        // jeśli tak, to usunie z kilkniętego elementu klase favorite (3)
        clickedElement.classlist.add('favorite');
      } else {

        // doda do klikniętego elementu klasę favorite, (2)
        clickedElement.classlist.remove('favorite');
      } */

        // Sprawdź czy offsetParent dla image posiada klasę .book_image
        if(event.target.offsetParent.classlist.contains('book_image')){

          // Znajdź kliknięty element
          const clickedElement = event.target.offsetParent;
      
    
          // pobierz z jego data-id identyfikator książki, (2)
          const bookId = clickedElement.getAttribute('data-id');

          // jeśli klikniętego elementu (bookId) niema w "favoriteBooks" (4)
          if(!thisBookList.favouriteBooks.includes(bookId)){

            // dodaj mi klasę "favorite" (4)
            clickedElement.classlist.add('favorite');

            // umieść w katologu "favorite books" (4)
            thisBookList.favouriteBooks.push(bookId);

          // w przeciwnym wypadku (4)
          } else {

            // zabierz mu klasę "favorite" (4)
            clickedElement.classlist.remove('favorite');

            // i usuń z katalogu ulubionych książek (4)
            thisBookList.favouriteBooks.splice(bookId);
          }
        }
      
      });

      /* 5. filtrowanie książek przy użyciu formularza.  */

      // nasłuchiwacz, obserwujący nasz formularz. Kiedy wykryje kliknięcie, uruchomi funkcję callback (5)
      thisBookList.filtersContainer.addEventListener('click', function(event){

        // czy kliknięto na element, który faktycznie jest naszym checkboxem (5)
        // czy jego tagName to INPUT, type to checkbox, a name to filter
        if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){

          // a jeśli tak, to dodaj jego value do filters (5)
          if (event.target.checked == 'true') {
            thisBookList.filtersContainer.push(event.target.value);

            // jeśli nie to  
          } else {
            thisBookList.filtersContainer.splice(event.target.value);
          }
        }
      });
    }

    /* 6. Przygotuj funkcję, która przejdzie po wszystkich książkach z dataSource.books i dla tych, które nie pasują do filtrów, doda klasę hidden. Z kolei dla tych, które pasują do filtrów, upewni się, że tej klasy nie mają.*/

    filteredBooks(){
      const thisBookList = this;

      //iteracja po wszystkich elementach datasource.books
      for(let book of thisBookList.data){

        // stała równa temu co zwróci determineRatingBgc dla rating danej książki
        const ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingBgc = ratingBgc;

        // stała która ustala długość paska
        const ratingWidth = book.ratingBgc*10;
        book.ratingWidth = ratingWidth;

        // zmienna shouldbehidden, która domyślnie ma być "false"
        let shouldBeHidden = false;

        // iteracja po elementach w kontenerze z filtrami
        for(let filter of thisBookList.filters){

          // jeśli element nie pasuje do filtrów
          if(!book.details[filter]){

            // zmienna "shouldBeHidden" = true
            shouldBeHidden = 'true';

            // przerwanie szukania zgodności z innymi filtrami
            break;
          }
        }
        // Jeśli dla elementu "shouldBeHidden"= true
        if(shouldBeHidden = 'true'){

          // dodaj klasę "hidden", która wyszarzy okładkę
          thisBookList.imageListContainer.classlist.add('hidden');

        // jeśli false
        } else {

          // zabierz klasę "hidden"
          thisBookList.imageListContainer.classlist.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){

      if(rating < 6){
        return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8){
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if(rating > 8 && rating <= 9){
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9){
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }

    }
  }

  /* CO TO JEST I DLACZEGO? */  
  const app = new Booklist();
  app();

}