let myLibrary;

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
  displayLibrary();
  updateSavedLibrary();
}

function clearFrom() {
  formTitle.value = '';
  formAuthor.value = '';
  formPages.value = '';
  formRead.checked = false;
}

function deleteBook(e) {
  myLibrary.splice(e.target.dataset.index, 1);
  displayLibrary();
  updateSavedLibrary();
}

function changeRead(e) {
  myLibrary[e.target.dataset.index].read = !myLibrary[e.target.dataset.index].read;
  displayLibrary();
  updateSavedLibrary();
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

    //Read Button
    let readBtn = document.createElement("button");
    readBtn.addEventListener("click", (e) => {
      changeRead(e);
    });
    readBtn.classList.add("read-btn");
    readBtn.dataset.index = index;
    if (myBook.read) {
      readBtn.textContent = "✔";
    }
    else {
      readBtn.textContent = "🛇"
    }
    let readContainer = document.createElement("td")
    readContainer.append(readBtn);

    //Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.addEventListener("click", (e) => {
      deleteBook(e);
    });
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.index = index;
    deleteBtn.textContent = "✘";
    let deleteContainer = document.createElement("td");
    deleteContainer.append(deleteBtn);

    let tr = document.createElement("tr");
    tr.append(title, author, pages, readContainer, deleteContainer);
    tableBody.append(tr);
  });
}

//Local Storage
function updateSavedLibrary() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function getSavedLibrary() {
  if (localStorage.getItem("library")) {
    myLibrary = JSON.parse(localStorage.getItem("library"));
  } 
  else {
    myLibrary = [];
  }
}

//Initial load
getSavedLibrary();
displayLibrary();