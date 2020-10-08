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
    var bookList = document.querySelector('#book-list');
    var row = document.createElement('tr');
    row.innerHTML = `<td> ${book.title} </td><td> ${book.author} </td><td> ${book.isbn} </td><td><a href="#" class="delete">X</a></td>`;
    bookList.appendChild(row);
  }

  /**
   * @todo clearFields function
   * Clears the title, author and isbn once the book is added to list
   */
  clearFields() {
    document.getElementById('title').value="";
    document.getElementById('author').value="";
    document.getElementById('isbn').value="";
  }

  /**
   * @todo deleteBook function
   * takes in a target book and removes it from the list
   */
  deleteBook(target) {
    if(target.className == 'delete'){
      target.parentElement.parentElement.remove();
    }
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
/*Task D*/
 document.querySelector('#bookList').addEventListener('submit', function(e){
    var list = document.querySelector('#book-list');
    
     while(list.firstChild){
       list.removeChild(list.firstChild);
     }
   e.preventDefault();
 })