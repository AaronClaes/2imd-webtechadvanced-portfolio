"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Note = /*#__PURE__*/function () {
  function Note(title) {
    _classCallCheck(this, Note);

    this.title = title;
    this.element = this.createElement(title);
  }

  _createClass(Note, [{
    key: "createElement",
    value: function createElement(title) {
      var newNote = document.createElement("li");
      newNote.innerHTML = title;
      newNote.addEventListener("click", this.remove.bind(newNote));
      return newNote;
    }
  }, {
    key: "add",
    value: function add(note) {
      var list = document.querySelector("#taskList");
      list.appendChild(note);
    }
  }, {
    key: "saveToStorage",
    value: function saveToStorage(note) {
      var storage = window.localStorage;
      var notes = [];

      if (storage.length === 0) {
        notes.push(note);
        storage.setItem("notes", JSON.stringify(notes));
      } else {
        notes = JSON.parse(storage.getItem("notes"));
        notes.push(note);
        storage.setItem("notes", JSON.stringify(notes));
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      var list = document.querySelector("#taskList");
      list.removeChild(this);
      var storage = window.localStorage;
      var notes = JSON.parse(storage.getItem("notes"));
      var index = notes.indexOf(this.innerHTML);
      notes.splice(index, 1);
      storage.setItem("notes", JSON.stringify(notes));
    }
  }]);

  return Note;
}();

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    console.log("👊🏼 The Constructor!");
    this.txtTodo = document.querySelector("#taskInput");
    this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
    this.loadNotesFromStorage();
  }

  _createClass(App, [{
    key: "loadNotesFromStorage",
    value: function loadNotesFromStorage() {
      var storage = window.localStorage;
      var notes = JSON.parse(storage.getItem("notes"));
      notes.forEach(function (note) {
        var loadNote = new Note(note);
        loadNote.add(loadNote.element);
      });
    }
  }, {
    key: "createNote",
    value: function createNote(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        var value = this.txtTodo.value;
        this.reset();
        var note = new Note(value);
        note.add(note.element);
        note.saveToStorage(note.title);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.txtTodo.value = "";
    }
  }]);

  return App;
}();

var app = new App();