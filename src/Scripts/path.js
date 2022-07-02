const patients = [new Patient({ id: 11 })];

function addNewStory() {
  let startDate = document.getElementById("start-date-input").value;
  let endDate = document.getElementById("end-date-input").value;
  let city = document.getElementById("city-input").value;
  let location = document.getElementById("location-input").value;

  let newStory = new Story(startDate, endDate, city, location);
  let patientId = document.getElementById("patient-id-input").value;
  if (patientId.length > 0) {
    let patient = patients.filter((patient) => patientId == patient.id)[0];
    if (patient) {
      let patientIndex = patients.findIndex((p) => p.id == patient.id);
      patients[patientIndex].stories.push(newStory);
    }
    // if we didn't find the id, create a new patient and add the new story;
    else {
      patients.push(new Patient(patientId, [newStory]));
    }
    drawPatientStories(patientId);
    console.log(patients);
  } else {
    alert("הכנס תעודת זהות תקינה ");
  }
}

function drawPatientStories(id) {
  let index = patients.findIndex((p) => p.id == id);
  let table = document.getElementById("table-content");
  table.innerHTML = "";
  for (let i = 0; i < patients[index].stories.length; i++) {
    let story = patients[index].stories[i];
    let tr = document.createElement("tr");
    for (let key in patients[index].stories[i]) {
      let td = document.createElement("td");
      td.innerText = story[key];
      tr.appendChild(td);
    }
    let td = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", (event) => {
      let tr = event.target.parentNode.parentNode;
      tr.parentNode.removeChild(tr);
      deleteStory(index, i);
    });
    td.appendChild(deleteButton);
    tr.appendChild(td);
    table.appendChild(tr);
  }
}

function deleteStory(patientIndex, storyIndex) {
  patients[patientIndex].stories.splice(storyIndex, 1);
}

document
  .getElementById("add-new-story-button")
  .addEventListener("click", addNewStory);