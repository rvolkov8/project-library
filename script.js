const bookForm = document.querySelector('.book-form');
const form = document.querySelector('form');

const addBookButton = document.querySelector('.add-book-button');

const titleInput = document.querySelector('.form-title');
const authorInput = document.querySelector('.form-author');
const pagesInput = document.querySelector('.form-page-number');
const isReadCheckbox = document.querySelector('#read');

const bookCardsSection = document.querySelector('.book-cards-section');

let lastTitle;
let lastAuthor;
let lastPagesNum;
let lastIsRead;
const myLibrary = [];

// Book object constructor
function Book(title, author, pagesNum, isRead) {
  this.title = title;
  this.author = author;
  this.pagesNum = pagesNum;
  this.isRead = isRead;
}

// Loops through the myLibrary array and displays each book on the page
function showBooks() {
  bookCardsSection.innerHTML = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const bookTitle = book.title;
    const bookAuthor = book.author;
    const bookPages = book.pagesNum;
    const bookIsRead = book.isRead;

    const bookCardEl = document.createElement('div');
    bookCardEl.classList.add('book-card');
    bookCardsSection.appendChild(bookCardEl);

    const infoContainerEl = document.createElement('div');
    infoContainerEl.classList.add('info-container');
    bookCardEl.appendChild(infoContainerEl);

    const bookTitleEl = document.createElement('div');
    bookTitleEl.textContent = `${bookTitle}`;
    bookTitleEl.classList.add('book-title');
    infoContainerEl.appendChild(bookTitleEl);

    const bookAuthorEl = document.createElement('div');
    bookAuthorEl.textContent = `by ${bookAuthor}`;
    bookAuthorEl.classList.add('book-author');
    infoContainerEl.appendChild(bookAuthorEl);

    const bookPagesEl = document.createElement('div');
    bookPagesEl.textContent = `${bookPages} pages`;
    bookPagesEl.classList.add('book-page-number');
    infoContainerEl.appendChild(bookPagesEl);

    const readButtonEl = document.createElement('button');
    if (bookIsRead) {
      readButtonEl.textContent = 'Read';
      readButtonEl.classList.add('book-is-read');
    } else {
      readButtonEl.textContent = 'Not read';
      readButtonEl.classList.add('book-not-read');
    }
    infoContainerEl.appendChild(readButtonEl);

    const removeButtonEl = document.createElement('button');
    removeButtonEl.textContent = 'Remove';
    removeButtonEl.classList.add('remove-button');
    infoContainerEl.appendChild(removeButtonEl);
  }
}

// Adds new book object to the library array based on the users input
function addBookToLibrary(title, author, pagesNum, isRead) {
  myLibrary.push(new Book(title, author, pagesNum, isRead));
}

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

// Collects user's input about the book and passes it into the library array
form.addEventListener('submit', (e) => {
  e.preventDefault();
  lastTitle = titleInput.value;
  lastAuthor = authorInput.value;
  lastPagesNum = pagesInput.value;
  if (isReadCheckbox.checked) {
    lastIsRead = true;
  } else {
    lastIsRead = false;
  }
  addBookToLibrary(lastTitle, lastAuthor, lastPagesNum, lastIsRead);
  changeFormStatus();
  showBooks();
});
