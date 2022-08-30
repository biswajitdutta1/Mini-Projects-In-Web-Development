console.log("connection check");
showNote();
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click",function(e)
{
    let addText = document.getElementById("addTxt");
   let addTitle = document.getElementById("addTitel");
let notes = localStorage.getItem("notes");
if( notes == null)
{
 notesObj = [];
}
else
{
     notesObj = JSON.parse(notes);
}
let myObj = {
    title :addTitle.value,
    text : addText.value
};
notesObj.push(myObj);
localStorage.setItem("notes",JSON.stringify(notesObj));
addText.value = "";
addTitle.value = "";
//console.log(notesObj);
showNote();
});

function showNote()
{
    let notes = localStorage.getItem("notes");
    if( notes == null)
    {
     notesObj = [];
    }
    else
    {
         notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index) {
        
        html += `
                <div class="my-2 mx-2 noteCard" style="width: 18rem;">

                    <div class="card-body">
                        <h5 class="card-title"> ${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <button id = ${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>
           
        `;
    });
    let noteElm = document.getElementById("notes");
    if(notesObj.length != 0)
    {
        noteElm.innerHTML = html;
    }
    else
    {
        noteElm.innerHTML = `Nothing to show! please use "Write a note" section above to add notes `;
    }
}

function deleteNote(index)
{
    let notes = localStorage.getItem("notes",index);
    if( notes == null)
    {
     notesObj = [];
    }
    else
    {
         notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNote();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input",function()
{
let inputVal = search.value.toLowerCase();
//console.log("input search fierd!!!",inputVal);
let noteCard = document.getElementsByClassName("noteCard");
Array.from(noteCard).forEach(function(element)
{
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if(cardTxt.includes(inputVal))
    {
        element.style.display = "block";
    }
    else{
        element.style.display = "none";
    }
}
);
});