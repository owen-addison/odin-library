const myLibrary = [];

const library = document.querySelector(".library");
const bookForm = document.getElementById("book-form");

// Book object constructor
function Book(name, author, pages, read, index) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = index;
}

// Manually entered books to start library
myLibrary.push(
  new Book("How to change your mind", "Michael Pollan", 469, true, 0)
);
myLibrary.push(new Book("Drug use for grown ups", "Carl Hart", 304, false, 1));
myLibrary.push(new Book("Dopamine Nation", "Anna Lembke", 266, false, 2));

// Function for removing book from library array and display
function removeBook(index) {
  //   const book = document.getElementById(`book${index}`);
  //   book.remove();
  myLibrary.splice(index, 1);

  myLibrary.forEach((item) => {
    const number = myLibrary.indexOf(item);
    const bookObj = item;
    bookObj.index = number;
  });

  displayBooks();
}

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

    // Add delete button for removing book
    const delButton = document.createElement("button");
    delButton.setAttribute("id", `button${book.index}`);
    delButton.textContent = "Delete Book";
    delButton.addEventListener("click", removeBook.bind(this, book.index));

    // Append the elements to the card element
    card.appendChild(name);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(delButton);

    // Append the card element to the library
    library.appendChild(card);
  });
}

// Function for showing form for entering new book details
function showForm() {
  document.getElementById("book-form").style.display = "block";
}

// Function for adding book to library
function addBookToLibrary(name, author, pages, read, index) {
  const boolOutput = read.toLowerCase() === "true";
  const data = myLibrary.length;

  const newBook = new Book(name, author, pages, boolOutput, index);

  myLibrary.push(newBook);
  displayBooks();
}

// Event listener for submit button, for adding new book to library
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newBookName = document.getElementById("book-name").value;
  const newBookAuthor = document.getElementById("book-author").value;
  const newBookPages = document.getElementById("book-pages").value;
  const newBookRead = document.getElementById("book-read").value.toLowerCase();

  if (newBookRead !== "true" && newBookRead !== "false") {
    // throw error
  } else {
    // handle submit
    addBookToLibrary(newBookName, newBookAuthor, newBookPages, newBookRead);
    bookForm.style.display = "none";
  }
});

// Loop for initially displaying books in library when loading pag;
myLibrary.forEach((book) => {
  displayBooks();
});
