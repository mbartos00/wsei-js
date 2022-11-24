class Note {
  constructor(id, title, content, color = '#f7e1a8', isPinned = false) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.color = color;
    this.isPinned = isPinned;
    this.date = new Date().toDateString();
    this.tag = null;
  }

  addTag(tagName) {
    this.tag = tagName;
  }
}

class Todo {
  constructor(content, isCompleted = false) {
    this.content = content;
    this.isCompleted = isCompleted;
  }
}

const buildNote = ({ title, content, color, date, tag }) => {
  const noteWrapper = document.querySelector('.note-wrapper');
  const noteDiv = document.createElement('div');
  const noteTag = document.createElement('p');
  const notePinDiv = document.createElement('div');
  const notePinLabel = document.createElement('label');
  const notePinCheckbox = document.createElement('input');
  const noteTitle = document.createElement('h1');
  const noteContent = document.createElement('p');
  const noteDate = document.createElement('p');

  noteDiv.classList.add('note');

  // notePinDiv.classList.add('note-pin');
  // notePinLabel.setAttribute('for', 'pin-checkbox');
  // notePinLabel.textContent = 'Pin note';
  // notePinCheckbox.id = 'pin-checkbox';
  // notePinCheckbox.type = 'checkbox';
  noteTag.classList.add('tag');
  noteTitle.classList.add('title');
  noteContent.classList.add('content');
  noteDate.classList.add('date');

  noteDiv.style.backgroundColor = color;
  noteTitle.textContent = title;
  noteContent.textContent = `Tag${content}`;
  noteDate.textContent = date;
  noteTag.textContent = `Tag${tag}`;
  // notePinDiv.appendChild(notePinLabel);
  // notePinDiv.appendChild(notePinCheckbox);
  // noteDiv.appendChild(notePinDiv);
  noteDiv.appendChild(noteTitle);
  noteDiv.appendChild(noteContent);
  noteDiv.appendChild(noteTag);
  noteDiv.appendChild(noteDate);
  noteWrapper.append(noteDiv);
};

const saveToLocalStorage = (item) => {
  localStorage.setItem('Note', JSON.stringify(item));
};

const noteForm = document.getElementById('note-form');
const title = document.getElementById('note-title');
const content = document.getElementById('note-content');
const colorPicker = document.getElementById('note-color--picker');
const tag = document.getElementById('note-tag');
const colorCheckbox = document.getElementById('note-colorCheckbox');
const tagCheckbox = document.getElementById('note-tagCheckbox');

const searchForm = document.querySelector('.search-wrapper');
const searchInput = document.getElementById('search-note');

const reminderDate = document.getElementById('note-reminder');

let noteArray = [];
let storedNoteArray = [];
const getStoredNotes = () => {
  let obj = JSON.parse(localStorage.getItem('Note'));
  if (obj) {
    obj.forEach((item) => {
      let newNote = JSON.parse(item);
      storedNoteArray.push(newNote);
    });
  }
};

noteForm.addEventListener('submit', (e) => {
  let note;
  e.preventDefault();
  if (title.value === '' || content.value === '') throw 'enter values';
  if (tagCheckbox.checked) {
    note = new Note(
      (Math.random() + 1).toString(36).substring(7),
      title.value,
      content.value,
      colorPicker.value
    );
    note.addTag(tag.value);
  } else {
    note = new Note(
      (Math.random() + 1).toString(36).substring(7),
      title.value,
      content.value,
      colorPicker.value
    );
  }
  let storedNote = JSON.parse(localStorage.getItem('Note'));
  if (storedNote !== null) {
    noteArray.push(JSON.stringify(note), ...storedNote);
  } else {
    noteArray.push(JSON.stringify(note));
  }
  saveToLocalStorage(noteArray);
});

searchForm.addEventListener('keyup', (e) => {
  e.preventDefault();
  const notes = document.querySelectorAll('.note');

  notes.forEach((note) => {
    if (searchInput.value !== '') {
      let splitted = note.textContent.toLowerCase().split('');
      let splittedInput = searchInput.value.split('');
      splitted.some((item) => splittedInput.includes(item))
        ? (note.style.display = 'flex')
        : (note.style.display = 'none');
    } else {
      note.style.display = 'flex';
    }
  });
});

getStoredNotes();

storedNoteArray.forEach((item) => {
  console.log(item);
  buildNote(item);
});
