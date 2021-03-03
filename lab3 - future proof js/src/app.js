class Note {
  constructor(title) {
    this.title = title;
    this.element = this.createElement(title);
  }

  createElement(title) {
    const newNote = document.createElement("li");
    newNote.innerHTML = title;
    newNote.addEventListener("click", this.remove.bind(newNote));
    return newNote;
  }

  add(note) {
    const list = document.querySelector("#taskList");
    list.appendChild(note);
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
  }

  remove() {
    const list = document.querySelector("#taskList");
    list.removeChild(this);

    const storage = window.localStorage;
    let notes = JSON.parse(storage.getItem("notes"));
    const index = notes.indexOf(this.innerHTML);

    notes.splice(index, 1);

    storage.setItem("notes", JSON.stringify(notes));
  }
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
    this.txtTodo = document.querySelector("#taskInput");
    this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
    this.loadNotesFromStorage();
  }

  loadNotesFromStorage() {
    const storage = window.localStorage;
    const notes = JSON.parse(storage.getItem("notes"));
    if (notes != null) {
      notes.forEach((note) => {
        const loadNote = new Note(note);
        loadNote.add(loadNote.element);
      });
    }
  }

  createNote(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = this.txtTodo.value;
      this.reset();
      const note = new Note(value);
      note.add(note.element);
      note.saveToStorage(note.title);
    }
  }

  reset() {
    this.txtTodo.value = "";
  }
}

const app = new App();
