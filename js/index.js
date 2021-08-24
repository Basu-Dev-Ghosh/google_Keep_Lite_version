

// selectors                
const note_input = document.querySelector(".note-input");
const title_input = document.querySelector(".title-input");
const add_btn = document.querySelector(".add-btn");
const note_container = document.querySelector(".note-container")
const input_container = document.querySelector(".input-container")
const delete_btn = document.querySelector(".fa-trash")

//  functions

//Set note Function
const setNote = () => {
    if(note_input.value==="" && title_input.value==="" || note_input.value==="")
    {
        alert("Please Enter Some Note")
    }
    else{
        // creating note div
    const note_div = document.createElement("div");
    note_div.classList.add("note");
    const note_title = document.createElement("h3");
    note_title.innerText = title_input.value;
    const note_para = document.createElement("p");
    note_para.innerText = note_input.value
    const delete_icon = document.createElement("i");
    delete_icon.classList.add("fas");
    delete_icon.classList.add("fa-trash");
    delete_icon.setAttribute("onClick", "deleteNote(this)")
    note_div.appendChild(note_title);
    note_div.appendChild(note_para);
    note_div.appendChild(delete_icon);
    note_container.appendChild(note_div)
    title_input.classList.remove("display-block")
    setLocal(title_input.value,note_input.value); // setiing to localstorage
    note_input.value = "";
    title_input.value = "";
    }
}
// note deleting function
const deleteNote = (e) => {
    note_container.removeChild(e.parentNode);
    deletLocal(e.parentNode.children[0].innerText,e.parentNode.children[1].innerText); // deleting from local storage
}

// set note to local storage function 
const setLocal = (title,para)=>
{
    let notes;
    if (localStorage.getItem("notes") === null) {
        notes = [];
    }
    else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }
    let note = {
        title: title,
        para: para  // creating object for handling checked note in refresh
    }
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes)); 
   
}
// Take data from local storage function
const getLocal=()=>
{
    let notes;
    if(localStorage.getItem("notes")===null)
    {
        notes=[];
    }
    else{
        notes=JSON.parse(localStorage.getItem("notes"));
    }
    notes.map((note)=>{

    console.log("hi");
    const note_div = document.createElement("div");
    note_div.classList.add("note");
    const note_title = document.createElement("h3");
    note_title.innerText = note.title;
    const note_para = document.createElement("p");
    note_para.innerText = note.para;
    const delete_icon = document.createElement("i");
    delete_icon.classList.add("fas");
    delete_icon.classList.add("fa-trash");
    delete_icon.setAttribute("onClick", "deleteNote(this)")
    note_div.appendChild(note_title);
    note_div.appendChild(note_para);
    note_div.appendChild(delete_icon);
    note_container.appendChild(note_div)
    title_input.classList.remove("display-block")
    note_input.value = "";
    title_input.value = "";   
    });

}
// deleting from local storage function
const deletLocal=(title,para)=>
{
    let notes;
    if(localStorage.getItem("notes")===null)
    {
        notes=[];
    }
    else{
        notes=JSON.parse(localStorage.getItem("notes"));
    }
    notes=notes.filter((note)=>{
        return(
            note.title!==title || note.para !==para
        )
    })
    localStorage.setItem("notes", JSON.stringify(notes)); 

}

// event listners 
// creating toogle thing............   
let a = false;
note_input.addEventListener('focus', () => {
    title_input.classList.add("display-block")
    a = true;
})
title_input.addEventListener('focus', () => {
    title_input.classList.add("display-block")
    a = true;
})
document.addEventListener('click', () => {
    if (!a) {
        title_input.classList.remove("display-block")
    }
    else {
        a = false;
    }
})

add_btn.addEventListener('click', setNote);
window.addEventListener('load',getLocal); // calling getLocal function when refresh



