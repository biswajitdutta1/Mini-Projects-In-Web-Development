console.log("testing");
//Display.showBook();
class Book {
    constructor (name, author, type){
        this.name = name;
    this.author = author;
    this.type = type;
    }
}

class Display
{
    add (book) {
        //console.log("adding to UI");
        //let tableBody = document.getElementById("tableBody");
        let bookObj;
        let books = localStorage.getItem("books");
        if(books==null)
        {
            bookObj = [];
        }
        else
        {
            bookObj = JSON.parse(books);
        }
        bookObj.push(book);
        localStorage.setItem("books",JSON.stringify(bookObj));
        //showBook();
    }

    clear () {
        let librayForm = document.getElementById("libraryForm");
        librayForm.reset();
    }

    validate (book) {
        if (book.name.length <= 2 || book.author.length <= 2) {
            return false;
        }
        else {
            return true;
        }
    }

    show (type, dismsg) {
        let message = document.getElementById("message");
        let boldText;
        if(type==='success')
        boldText = "Success";
        else
        boldText="Error";
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>${boldText} </strong> ${dismsg}
    <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close">
    <span area-hidden ="true">&times;</span>
    </button>
    </div>`;
        setTimeout(function () {
            message.innerHTML = ""
        }, 4000);
    }

  static  showBook()
{
    let tableBody = document.getElementById("tableBody");
    let books = localStorage.getItem("books");
    let bookObj;
    if(books==null)
    {
        bookObj = [];
    }
    else
    {
        bookObj = JSON.parse(books);
    }
    let uiString = "";
    bookObj.forEach(function(element,index) {
         uiString += `<tr>
         <td>${index+1}</td>
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
        <td><button id = ${index} onclick="Display.deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
        </tr>`
    });

    if(bookObj.length!=0)
tableBody.innerHTML = uiString;
else
tableBody.innerHTML = `Nothing to show here!! please add any book in library`;
}

static  deleteBook(index)
{
    //console.log("delete book",index);
    let books = localStorage.getItem("books");
    let bookObj;
    if( books == null)
    {
     bookObj = [];
    }
    else
    {
         bookObj = JSON.parse(books);
    }
    bookObj.splice(index,1);
    //console.log(bookObj);
    localStorage.setItem("books",JSON.stringify(bookObj));
    let display2 =  new Display();
    display2.show("success","Book deleted successfully");
    Display.showBook();
}
}

Display.showBook();

let librayForm = document.getElementById("libraryForm");
librayForm.addEventListener("submit", librayFormSubmit);

function librayFormSubmit(e) {
    e.preventDefault();
    //console.log("you have submitted library form");
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let type;
    let fiction = document.getElementById("fiction");
    let horror = document.getElementById("horror");
    let programming = document.getElementById("programming");
    if (fiction.checked)
        type = fiction.value;
    else if (horror.checked)
        type = horror.value;
    else if (programming.checked)
        type = programming.value;
    let book = new Book(name, author, type);
    //console.log(book);
    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success", "Book inserted successfully");
        Display.showBook();
    }
    else {
        display.show("danger", "Book insertion failed, check Book/Author name");
    }
    e.preventDefault();

}

 /*function showBook()
{
    let tableBody = document.getElementById("tableBody");
    let books = localStorage.getItem("books");
    if(books==null)
    {
        bookObj = [];
    }
    else
    {
        bookObj = JSON.parse(books);
    }
    let uiString = "";
    bookObj.forEach(function(element,index) {
         uiString += `<tr>
         <td>${index+1}</td>
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
        <td><button id = ${index} onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
        </tr>`
    });

    if(bookObj.length!=0)
tableBody.innerHTML = uiString;
else
tableBody.innerHTML = `Nothing to show here!! please add any book in library`;
}*/

 /*  deleteBook(index)
{
    //console.log("delete book",index);
    let books = localStorage.getItem("books");
    if( books == null)
    {
     bookObj = [];
    }
    else
    {
         bookObj = JSON.parse(books);
    }
    bookObj.splice(index,1);
    //console.log(bookObj);
    localStorage.setItem("books",JSON.stringify(bookObj));
    let display2 =  new Display();
    display2.show("success","Book deleted successfully");
    showBook();
}*/