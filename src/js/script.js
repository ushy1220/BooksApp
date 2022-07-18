/* eslint-disable no-undef */
/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars/


'use strict';

/*  
1. Utworzenie i wywołanie funkcji, która przejdzie po wszystkich książkach z "dataSource.books" i wyrenderuje dla nich reprezentacje HTML w liście "".books-list". Należy wykorzystać w tym celu dostarczony w "index.html" szablon (#template-book). 
*/

render() { // nowa funkcja render
    const thisBookList = this;

     //Wewnątrz niej przejdź po każdym elemencie z dataSource.books. Pamiętaj, że plik script.js ma do tego obiektu bezpośredni dostęp.
    for(const elem of dataSource.books){

        //Wewnątrz tej pętli zadbaj o wygenerowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce.
        const generatedHTML = templates.bookTemplate(elem);

        //Na postawie tego kodu HTML wygeneruj element DOM.
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);    //funkcja w functions.js

        //Wygenerowany element DOM dołącz jako nowe dziecko DOM do listy .books-list.
        thisBookList.appendChild(generatedDOM);
    };   
};

