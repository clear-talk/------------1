
const allStories = [{ "id": "1", "stories": [{ "startDate": "2022-10-01", "endDate": "2022-10-02", "city": "ירושלים", "location": "קניון רמות" }, { "startDate": "2023-10-01", "endDate": "2023-10-02", "city": "באר שבע", "location": "מלון רימונים" }] }
    , { "id": "2", "stories": [{ "startDate": "2021-10-01", "endDate": "2021-10-02", "city": "תל אביב", "location": "מגדלי עזריאלי" }, { "startDate": "2024-10-01", "endDate": "2023-10-02", "city": "בית שמש", "location": "BIG CENTER" }] }
, {"id": "3", "stories": [{ "startDate": "2022-10-01", "endDate": "2022-10-02", "city": "ירושלים", "location": "קניון הפסגה" }, { "startDate": "2023-10-01", "endDate": "2023-10-02", "city": "ירושלים", "location": "מלון ממילא" }] }]

window.onpageshow = () =>{
    //adding an event to the search input
    var input = document.getElementById('search');
    input.addEventListener("focusout", search);
    sortByDate();
}

function search() {
    let searchStories = [];
    var input = document.getElementById('search');
    var searchData = input.value.toLowerCase();
    allStories.forEach(patient => {
        patient.stories.filter(report => {
            if (report.city.toLowerCase().includes(searchData)) {
                searchStories.push(report);
            }
        })
    });
    cleanTable();
    uploadData(searchStories);
}

function cleanTable() {
    //finding the table
    var table = document.querySelector('table');
    //finding all the rows in the table
    var trs = document.querySelectorAll('tr');
    //delete all the rows from the table
    trs.forEach((tr, i) => {
        if (i != 0) {
            table.removeChild(tr);
        }
    })
}

function uploadData(allStories) {
    //finding the table
    if (allStories[0]) {
        var table = document.querySelector('table');
        //loop to load all the stories
        allStories.forEach(report => {
            //adding a row
            var row = document.createElement('tr');
            // adding a column startDate
            var startDate = document.createElement('td');
            var startDateNode = document.createTextNode(report.startDate);
            startDate.appendChild(startDateNode)
            row.appendChild(startDate);
            // adding a column endDate
            var endDate = document.createElement('td');
            var endDateNode = document.createTextNode(report.endDate);
            endDate.appendChild(endDateNode)
            row.appendChild(endDate);
            // adding a column location
            var location = document.createElement('td');
            var locationNode = document.createTextNode(report.location);
            location.appendChild(locationNode)
            row.appendChild(location);
            //adding the new row to the table
            table.appendChild(row);
        })
    }
    else {
        alert('אין עדין דווחים על חולי קורונה')
    }
};
function sortByDate() {
    let storiesToSort = []
    allStories.forEach(patient => {
        patient.stories.forEach(report => {
            storiesToSort.push(report)
        })
    })
    storiesToSort.sort(function (a, b) {
        return ((new Date(b.startDate).getTime() - new Date(a.startDate).getTime()))
    });
    console.log(storiesToSort);
    uploadData(storiesToSort);
}
function viewLocations() {
    window.location.href = "./viewPath.html"
}