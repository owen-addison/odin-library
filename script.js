const myLibrary = [];

const library = document.querySelector(".library");
const bookForm = document.getElementById("book-form");

function Book(name, author, pages, read, index) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = index;
}

Book.prototype.info = function () {
  let text;
  if (this.read === true) {
    text = "have read.";
  } else if (this.read === false) {
    text = "not read yet.";
  }
  console.log(`${this.name} by ${this.author}, pages, ${text}`);
};

myLibrary.push(
  new Book("How to change your mind", "Michael Pollan", 469, true, 0)
);
myLibrary.push(new Book("Drug use for grown ups", "Carl Hart", 304, false, 1));
myLibrary.push(new Book("Dopamine Nation", "Anna Lembke", 266, false, 2));

function removeBook(index) {
  const book = document.getElementById(`book${index}`);
  book.remove();
  myLibrary.splice(index, 1);
}

function displayBook(book) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("id", `book${book.index}`);

  const name = document.createElement("p");
  name.textContent = `Title: ${book.name}`;

  const author = document.createElement("p");
  author.textContent = `Author: ${book.author}`;

  const pages = document.createElement("p");
  pages.textContent = `Pages: ${book.pages}`;

  const read = document.createElement("p");
  read.textContent = `Read: ${book.read}`;

  const delButton = document.createElement("button");
  delButton.setAttribute("id", `button${book.index}`);
  delButton.textContent = "Delete Book";
  delButton.addEventListener("click", removeBook.bind(this, book.index));

  card.appendChild(name);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);
  card.appendChild(delButton);

  library.appendChild(card);
}

function showForm() {
  document.getElementById("book-form").style.display = "block";
}

function addBookToLibrary(name, author, pages, read, index) {
  const boolOutput = read.toLowerCase() === "true";
  const data = myLibrary.length;

  const newBook = new Book(name, author, pages, boolOutput, index);

  myLibrary.push(newBook);
  displayBook(newBook);
}

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
  }
});

myLibrary.forEach((book) => {
  displayBook(book);
});
