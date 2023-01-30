const myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
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
  new Book("How to change your mind", "Michael Pollan", 469, true)
);
myLibrary.push(new Book("Drug use for grown ups", "Carl Hart", 304, false));
myLibrary.push(new Book("Dopamine Nation", "Anna Lembke", 266, false));

function addBookToLibrary() {
  const name = prompt("What is the name of the book?");
  const author = prompt("Who is the book's author?");
  const pages = prompt("How many pages is the book?");
  const read = prompt("You have read the book: true or false?");
  const boolOutput = read.toLowerCase() === "true";

  myLibrary.push(new Book(name, author, pages, boolOutput));
}
