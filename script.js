/* eslint-disable no-plusplus */
// eslint-disable-next-line max-classes-per-file
const bookForm = document.querySelector('.book-form');
const form = document.querySelector('form');

const addBookButton = document.querySelector('.add-book-button');

const titleInput = document.querySelector('.form-title');
const authorInput = document.querySelector('.form-author');
const pagesInput = document.querySelector('.form-page-number');
const isReadCheckbox = document.querySelector('#read');
const closeForm = document.querySelector('.close');

const bookCardsSection = document.querySelector('.book-cards-section');

// Book object class
class Book {
  constructor(title, author, pagesNum, isRead) {
    this.title = title;
    this.author = author;
    this.pagesNum = pagesNum;
    this.isRead = isRead;
    this.bookNumber = 0;
  }

  getNumber() {
    return this.bookNumber;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, pagesNum, isRead) {
    const newBook = new Book(title, author, pagesNum, isRead);
    this.books.push(newBook);
  }

  removeBook(book) {
    const bookIndex = this.books.indexOf(book);
    if (bookIndex > -1) {
      this.books.splice(bookIndex, 1);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  toogleReadStatus(book) {
    // eslint-disable-next-line no-param-reassign
    book.isRead = !book.isRead;
  }

  displayBooks() {
    bookCardsSection.innerHTML = '';
    this.books.forEach((book) => {
      const bookCardEl = document.createElement('div');
      bookCardEl.classList.add('book-card');
      bookCardsSection.appendChild(bookCardEl);

      const infoContainerEl = document.createElement('div');
      infoContainerEl.classList.add('info-container');
      bookCardEl.appendChild(infoContainerEl);

      const bookTitleEl = document.createElement('div');
      bookTitleEl.textContent = `${book.title}`;
      bookTitleEl.classList.add('book-title');
      infoContainerEl.appendChild(bookTitleEl);

      const bookAuthorEl = document.createElement('div');
      bookAuthorEl.textContent = `by ${book.author}`;
      bookAuthorEl.classList.add('book-author');
      infoContainerEl.appendChild(bookAuthorEl);

      const bookPagesEl = document.createElement('div');
      bookPagesEl.textContent = `${book.pagesNum} pages`;
      bookPagesEl.classList.add('book-page-number');
      infoContainerEl.appendChild(bookPagesEl);

      const buttonContainerEl = document.createElement('div');
      buttonContainerEl.classList.add('button-container');
      infoContainerEl.appendChild(buttonContainerEl);

      const readButtonEl = document.createElement('button');
      if (book.isRead) {
        readButtonEl.textContent = 'Read';
        readButtonEl.classList.add('book-is-read');
      } else {
        readButtonEl.textContent = 'Not read';
        readButtonEl.classList.add('book-not-read');
      }
      readButtonEl.addEventListener('click', () => {
        this.toogleReadStatus(book);
        this.displayBooks();
      });
      buttonContainerEl.appendChild(readButtonEl);

      const removeButtonEl = document.createElement('button');
      removeButtonEl.textContent = 'Remove';
      removeButtonEl.classList.add('remove-button');
      removeButtonEl.addEventListener('click', () => {
        this.removeBook(book);
        this.displayBooks();
      });
      buttonContainerEl.appendChild(removeButtonEl);
    });
  }
}

const myLibrary = new Library();

// Changes the form status
function changeFormStatus() {
  form.reset();
  if (bookForm.style.display === 'none') {
    bookForm.style.display = 'block';
  } else {
    bookForm.style.display = 'none';
  }
}

// Calls the form for book adding
addBookButton.addEventListener('click', () => {
  changeFormStatus();
});

// Collects user's input about the book, creates a new book object,
// passes it into the library array, and displays the books
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const checkIsRead = () => {
    if (isReadCheckbox.checked) {
      return true;
    }
    return false;
  };
  myLibrary.addBook(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    checkIsRead()
  );
  changeFormStatus();
  myLibrary.displayBooks();
});

// Closes form when clicked
closeForm.addEventListener('click', () => {
  bookForm.style.display = 'none';
});
