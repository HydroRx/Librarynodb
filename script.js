const myLibrary = [];

// Constructor function for Book
function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

// Function to add a book to the library
function addBookToLibrary(author, title, pages, read) {
  const newBook = new Book(author, title, pages, read);
  myLibrary.push(newBook);
  updateBookGrid();
}

// Function to update the book grid in the UI
function updateBookGrid() {
  const bookGrid = document.querySelector(".bookgrid");
  bookGrid.innerHTML = ""; // Clear existing books

  myLibrary.forEach((book, index) => {
    const bookElement = document.createElement("div");
    bookElement.className = "book";
    bookElement.dataset.index = index; // Store the index for deletion

    bookElement.innerHTML = `
      <h2>${book.author}</h2>
      <p>${book.title}</p>
      <p>${book.pages} pages</p>
      <button class="${book.read ? "read" : "notread"}">
        ${book.read ? "Read" : "Mark as Read"}
      </button>
      <button class="delete">Delete</button>
    `;

    bookGrid.appendChild(bookElement);
  });

  // Attach event listeners to dynamically created elements
  document.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", handleDelete);
  });

  document.querySelectorAll(".book button:not(.delete)").forEach((button) => {
    // Not happy about the selector, but it will do for this very small "project"
    button.addEventListener("click", handleToggleRead);
  });
}

// Function to handle form submission
document.getElementById("add-book-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting the traditional way, meaning it won't refresh the page on  submit

  const author = document.getElementById("author").value;
  const title = document.getElementById("title").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(author, title, pages, read);

  document.getElementById("form-overlay").style.display = "none"; // Hide the form
  event.target.reset(); // Reset form fields
});

// Show the form when the "Add book" button is clicked
document.getElementById("addbook").addEventListener("click", () => {
  document.getElementById("form-overlay").style.display = "flex";
});

// Hide the form when the "Close" button is clicked
document.getElementById("close-form").addEventListener("click", () => {
  document.getElementById("form-overlay").style.display = "none";
});

// Function to handle deleting a book
function handleDelete(event) {
  const index = event.target.closest(".book").dataset.index;
  myLibrary.splice(index, 1); //delete the book with the index selected
  updateBookGrid();
}

// Function to handle toggling the read status
function handleToggleRead(event) {
  const index = event.target.closest(".book").dataset.index;
  const book = myLibrary[index];
  book.read = !book.read; // Toggle the read status
  updateBookGrid();
}
