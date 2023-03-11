const form = document.querySelector('form');

const addBookButton = document.querySelector('.add-book-button');

const titleInput = document.querySelector('.form-title');
const authorInput = document.querySelector('.form-author');
const pagesInput = document.querySelector('.form-page-number');
const isReadCheckbox = document.querySelector('#read');

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

// Adds new book object to the library array based on the users input
function addBookToLibrary(title, author, pagesNum, isRead) {
  myLibrary.push(new Book(title, author, pagesNum, isRead));
  console.log(myLibrary);
}

// Changes the form status
function changeFormStatus() {
  form.reset();
  if (form.classList.contains('active')) {
    form.classList.remove('active');
  } else {
    form.classList.add('active');
  }
}

// Call the form for book adding
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
});
