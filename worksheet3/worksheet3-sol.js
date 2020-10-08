/**
 * Book Class
 * Each book instance has a title, author and ISBN
 */
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

/**
 * User Interface Class
 * methods: add, delete, showAlert, clearFields
 */
class UI {
  /**
   * @todo addBookToList function
   * Takes in a book parameter and adds it to the book list
   */
  addBookToList(book) {
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
    list.appendChild(row);
  }

  /**
   * showAlert function
   */
  showAlert(msg, className) {
    //create div
    const div = document.createElement('div');
    //add classes
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(msg));
    //get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);
    //timeout alert after 3s
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  /**
   * @todo deleteBook function
   * takes in a target book and removes it from the list
   */
  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  /**
   * clearFields function
   * Clears all books from list
   */
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Event listener for submit
document.querySelector('#book-form').addEventListener('submit', function(e) {
  //Get Form Values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;
  //Instantiate a book
  const book = new Book(title, author, isbn);
  //Instantiate UI object
  const ui = new UI();

  //Validate
  if (title === '' || author === '' || isbn === '') {
    //error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    //Add book to list
    ui.addBookToList(book);
    //Show success
    ui.showAlert('Book Added!', 'success');
    //Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete
document.querySelector('#book-list').addEventListener('click', function(e) {
  //Instantiate ui
  const ui = new UI();
  ui.deleteBook(e.target);

  //show message
  ui.showAlert('Book removed!', 'success');
  e.preventDefault();
});

/**
 * @todo EventListener for Clear All button
 * select the booklist and remove all books inside it.
 */
// Event listener for clearAll button
document.querySelector('#bookList').addEventListener('submit', function(e) {
  //remove all TRs from ui
  const bookList = document.querySelector('#book-list');
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }

  e.preventDefault();
});
