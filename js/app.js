const addbox = document.querySelector(".add-box"), popupbox = document.querySelector(".popup-box"),
    popupTitle = popupbox.querySelector("header p"),
    closeIcon = popupbox.querySelector("header i"),
    titleTag = popupbox.querySelector("input"),
    descTag = popupbox.querySelector("textarea"),
    addbtn = popupbox.querySelector("button");

//array of the months names
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//retrieve notes from local storage
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
//flags and ID for notes updates
let isUpdate = false, updateId;
//open the popup box to add new notes
addbox.addEventListener("click", () => {
    popupTitle.innerHTML = "Add a new Notes";
    addbtn.innerHTML = "Add Note";
    popupbox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if (window.innerWidth > 660) titleTag.focus();
});
//close the popup box and reset fields
closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupbox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});
//display exiting notes from local storage
function showNotes() {
    if (!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        let filterDesc = note.desciption.replaceAll("\n", '<br/>');
        let litag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleleNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addbox.insertAdjacentHTML("afterend", litag);
    });
}
showNotes();

//show menu options for each note
function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}


//delete a spacific note
function deleleNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if (!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

//update a spacific note
function updateNote(noteId, title, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = noteId;
    isUpdate = true;
    addbox.click();
    titleTag.value = description;
    popupTitle.innerText = "Update a note";
    addbtn.innerText = "Update note";
}

//add or delete a note on button click
addbtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(), description = descTag.value.trim();
    if (title || description) {
        let currentDate = new Date(),
            month = months[currentDate.getMonth()],
            day = currentDate.getDate(),
            year = currentDate.getFullYear();
        let noteInfo = { title, description, date: `${month} ${day}, ${year}` }

        if (!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});



//button toggle action
const btn = document.getElementById("toggle");

if (localStorage.getItem("them") === "dark") {
    document.body.classList.add("dark");
    btn.firstElementChild.classList.replace("uil-moon", "uil-sun");
} else {
    btn.firstElementChild.classList.replace("uil-sun", "uil-moon");
}

btn.onclick = () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("them", "dark");
        btn.firstElementChild.classList.replace("uil-moon", "uil-sun");
    } else {
        localStorage.setItem("them", "light");
        btn.firstElementChild.classList.replace("uil-sun", "uil-moon");
    }
};


// loading animation
window.addEventListener("load", () => {

    const name = document.querySelector(".name");
    const intro = document.querySelector(".intro-loader");

    setTimeout(() => {
        name.style.opacity = "1";
        name.style.transform = "translateY(0)";
    }, 300);

    setTimeout(() => {
        intro.style.top = "-100%";
    }, 2000);

});

//loader
// window.addEventListener("load", () => {
//     document.querySelector(".loader").style.display = "none";
// });