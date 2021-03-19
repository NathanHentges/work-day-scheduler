
var timeContainer = $("#timeblock-container");
var dayDisplay = $("#currentDay");
var dateToday = moment();

// for converting current hour to index of timeContainer children
const currHourIndx = dateToday.format("HH") - 9;

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
}

// Compare index to hour to see if its class should be past, present, future
function formatHours() {
  for (let i = 0; i < 9; i++) {
    if (i < currHourIndx) {
      timeContainer.children().eq(i).addClass("past");
    } else if (currHourIndx === i) {
      timeContainer.children().eq(i).addClass("present");
    } else {
      timeContainer.children().eq(i).addClass("future");
    }
  }
}


// Event listener for save buttons
timeContainer.on("click", ".saveBtn", (event) => {
  // Clicked on button, access data from there
  const hrRow = $(event.currentTarget).parent();
  const note = hrRow.children().closest("textarea").val();
  const hour = hrRow.attr("id");
  savedNotes[hour] = note;
  saveNotes();
});


// Display date
dayDisplay.text(dateToday.format("dddd, MMMM Do"));


fillNotes();
formatHours();
