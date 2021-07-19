let myLibrary = [
  book1 = {
    title: "tuVieja",
    author: "tuvieja2",
    pages: 56,
    read: true,
  }
];

//Selectors and eventListeners
const tableBody = document.querySelector(".table-body");
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");
const form = document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  clearFrom();
  displayLibrary();
});


//Constructor
function book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
book.prototype.info = function name(params) {
  return `${title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`;
}


//Functions
function addBookToLibrary() {
  if (formTitle.value == '' || formAuthor.value == '' || formPages.value == '') {
    alert("Complete all the fields to add a new book");
    return;
  }
  const newBook = new book(formTitle.value, formAuthor.value, formPages.value, formRead.checked);
  myLibrary.push(newBook);
}

function clearFrom() {
  formTitle.value = '';
  formAuthor.value = '';
  formPages.value = '';
  formRead.checked = false;
}

function deleteBook(e) {
  myLibrary.splice(e.target.dataset.index, 1);
}

function displayLibrary() {
  tableBody.innerHTML = '';
  myLibrary.forEach((myBook, index) => {
    let title = document.createElement("td");
    title.textContent = myBook.title;

    let author = document.createElement("td");
    author.textContent = myBook.author;

    let pages = document.createElement("td");
    pages.textContent = myBook.pages;

    let read = document.createElement("td");
    if (myBook.read) {
      read.textContent = "✔";
    }
    else {
      read.textContent = "✘"
    }

    let deleteBtn = document.createElement("button");
    deleteBtn.addEventListener("click", (e) => {
      deleteBook(e);
      displayLibrary();
    });

    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.index = index;
    deleteBtn.textContent = "🛇";
    let deleteContainer = document.createElement("td");
    deleteContainer.append(deleteBtn);

    let tr = document.createElement("tr");
    tr.append(title, author, pages, read, deleteContainer);
    tableBody.append(tr);
  });
}

displayLibrary();