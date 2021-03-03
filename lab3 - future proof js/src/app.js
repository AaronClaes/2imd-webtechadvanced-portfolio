class Note {
  constructor(title) {
    this.title = title;
    // HINT🤩
    this.element = this.createElement(title);
  }

  createElement(title) {
    let newNote = document.createElement("li");
    newNote.innerHTML = title;
    // HINT🤩
    newNote.addEventListener("click", this.remove.bind(newNote));
    return newNote;
  }

  add(note) {
    const list = document.querySelector("#taskList");
    list.appendChild(note);
    // HINT🤩
    // this function should append the note to the screen somehow
  }

  saveToStorage(note) {
    const storage = window.localStorage;
    let notes = [];
    if (storage.length === 0) {
      notes.push(note);
      storage.setItem("notes", JSON.stringify(notes));
    } else {
      notes = JSON.parse(storage.getItem("notes"));
      notes.push(note);
      storage.setItem("notes", JSON.stringify(notes));
    }
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
  }

  remove() {
    const list = document.querySelector("#taskList");
    list.removeChild(this);

    const storage = window.localStorage;
    let notes = JSON.parse(storage.getItem("notes"));
    const index = notes.indexOf(this.innerHTML);

    notes.splice(index, 1);

    storage.setItem("notes", JSON.stringify(notes));
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    // .removeChild(this)
    // remove the item from screen and from localstorage
  }
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");

    // HINT🤩
    // pressing the enter key in the text field triggers the createNote function
    this.txtTodo = document.querySelector("#taskInput");
    this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
    // read up on .bind() -> we need to pass the current meaning of this to the eventListener
    // when the app loads, we can show previously saved noted from localstorage
    this.loadNotesFromStorage();
  }

  loadNotesFromStorage() {
    const storage = window.localStorage;
    const notes = JSON.parse(storage.getItem("notes"));

    notes.forEach((note) => {
      let loadNote = new Note(note);
      loadNote.add(loadNote.element);
    });
    // HINT🤩
    // load all notes from storage here and add them to the screen
  }

  createNote(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = this.txtTodo.value;
      this.reset();
      let note = new Note(value);
      note.add(note.element);
      note.saveToStorage(note.title);
    }
    // this function should create a new note by using the Note() class
    // HINT🤩

    // note.saveToStorage();
    // clear the text field with .reset in this class
    // if (e.key === "Enter")
  }

  reset() {
    // this function should reset the form / clear the text field
    this.txtTodo.value = "";
  }
}

let app = new App();
