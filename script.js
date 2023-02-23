const myLibrary = [];

const library = document.querySelector(".library");
const bookForm = document.getElementById("book-form");
const formBg = document.getElementById("form-bg");

const bookTitle = document.getElementById("book-name");
const bookAuthor = document.getElementById("book-author");

const titleError = document.getElementById("title-error");
const authorError = document.getElementById("author-error");

// document.removeChild(formBg);

/*
________________BOOK CLASS________________
*/
// Book class
class Book {
  // Constructor method for new object
  constructor(name, author, pages, read, index) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index;
  }

  // Method for setting read status on object
  toggleRead() {
    if (this.read === true) {
      this.read = false;
    } else if (this.read === false) {
      this.read = true;
    }
  }
}

/*
________________INIT LIBRARY________________
*/
// Manually entered books to start library
myLibrary.push(
  new Book("How to change your mind", "Michael Pollan", 469, true, 0)
);
myLibrary.push(new Book("Drug use for grown ups", "Carl Hart", 304, false, 1));
myLibrary.push(new Book("Dopamine Nation", "Anna Lembke", 266, false, 2));

/*
________________DOM MANIPULATION________________
*/
// DISPLAY BOOKS
function displayBooks() {
  // Delete all existing books
  const oldBooks = document.querySelectorAll(".card");
  oldBooks.forEach((book) => book.remove());

  // Display new books
  myLibrary.forEach((book) => {
    // Create new div with class "card" and add unique id
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", `book${book.index}`);

    // Display book name
    const name = document.createElement("p");
    name.textContent = `Title: ${book.name}`;

    // Display book author
    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    // Display number of pages
    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    // Display whether or not it has been read
    const read = document.createElement("p");
    read.textContent = `Read: ${book.read}`;

    // Add checkbox for toggling read
    const toggle = document.createElement("input");
    toggle.classList.add("toggle");
    toggle.setAttribute("id", `toggle${book.index}`);
    toggle.setAttribute("type", "checkbox");
    // Check or uncheck checkbox depending on read value for object
    if (book.read === true) {
      toggle.checked = true;
    } else if (book.read === false) {
      toggle.read = false;
    }
    // Add event listener for change of toggle
    toggle.addEventListener("change", () => {
      book.toggleRead();
      displayBooks();
    });

    // Add delete button for removing book
    const delButton = document.createElement("button");
    delButton.setAttribute("id", `button${book.index}`);
    delButton.textContent = "Delete Book";

    // Add function on click of button to remove book from library
    delButton.addEventListener("click", () => {
      const { index } = book;

      // Remove book object from array
      myLibrary.splice(index, 1);

      // Renumber the index property of each book item for each library item
      myLibrary.forEach((item) => {
        const number = myLibrary.indexOf(item);
        const bookObj = item;
        bookObj.index = number;
      });

      displayBooks();
    });

    // Append the elements to the card element
    card.appendChild(name);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(toggle);
    card.appendChild(delButton);

    // Append the card element to the library
    library.appendChild(card);
  });
}

// Function for showing form for entering new book details
function showForm() {
  formBg.className = "formBg";
}

// Function for adding book to library
function addBookToLibrary(name, author, pages, read, index) {
  const data = myLibrary.length;

  const newBook = new Book(name, author, pages, read, data);

  myLibrary.push(newBook);
  displayBooks();
}

/*
________________ERROR LOGIC________________
*/
function showError() {
  if (bookTitle.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    titleError.textContent = "Please enter the book title";
    // Set the styling appropriately
    titleError.className = "error active";
  }

  if (bookAuthor.validity.valueMissing) {
    authorError.textContent = "Please enter the book author";
    // Set the styling appropriately
    authorError.className = "error active";
  }
}

/*
________________FORM LOGIC________________
*/
bookTitle.addEventListener("input", (e) => {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (bookTitle.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    titleError.textContent = ""; // Reset the content of the message
    titleError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

bookAuthor.addEventListener("input", (e) => {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (bookTitle.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    titleError.textContent = ""; // Reset the content of the message
    titleError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }

  if (bookAuthor.validity.valid) {
    authorError.textContent = ""; // Reset the content of the message
    authorError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

// Event listener for submit button, for adding new book to library
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // if the email field is valid, we let the form submit
  if (!bookTitle.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    e.preventDefault();
  } else if (!bookAuthor.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    e.preventDefault();
  } else {
    const newBookName = document.getElementById("book-name").value;
    const newBookAuthor = document.getElementById("book-author").value;
    const newBookPages = document.getElementById("book-pages").value;
    const newBookRead = document.getElementById("book-read").checked;

    addBookToLibrary(newBookName, newBookAuthor, newBookPages, newBookRead);
    formBg.className = "formBg hidden";
  }
});

// Loop for initially displaying books in library when loading pag;
myLibrary.forEach((book) => {
  displayBooks();
});
