
var timeContainer = $("#timeblock-container");
var dateToday = moment();
// dateToday.format("dddd, MMMM Do")

// default object format for the data
const noteObj = {
  "9am": "",
  "10am": "",
  "11am": "",
  "12pm": "",
  "1pm": "",
  "2pm": "",
  "3pm": "",
  "4pm": "",
  "5pm": ""
};

// SSOT for notes
var savedNotes = JSON.parse(localStorage.getItem("notes")) || noteObj;


// fill in the note fields for each hour based on savedNotes
function fillNotes() {
  // Iterate through each key/value pair in savedNotes
  Object.entries(savedNotes).forEach(([hour, note]) => {
    // select corresponding textarea to fill in
    $(`#${hour} textarea`).text(note);
    $(`#${hour} textarea`).val(note);
  });
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(savedNotes));
  console.log(localStorage.getItem("notes"));
}

timeContainer.on("click", ".saveBtn", (event) => {
  // Clicked on button, access data from there
  const hrRow = $(event.currentTarget).parent();
  const note = hrRow.children().closest("textarea").val();
  const hour = hrRow.attr("id");
  savedNotes[hour] = note;
  saveNotes();
});


fillNotes();
