const tableBody = document.querySelector("#covidTable tbody");
const searchInput = document.getElementById("#searchInput");
const searchBtn = document.getElementById("#searchBtn");

let stateData = [];

fetch("https://api.rootnet.in/covid19-in/stats/latest")
  .then(response => response.json())
  .then(data => {
    stateData = data.data.regional;
    displayData(stateData);
  })
 

function displayData(dataArray) {
  tableBody.innerHTML = "";
  dataArray.forEach((state, index) => {
    const row = document.createElement("tr");
    row.innerHTML = 
       "<td>" + (index + 1) + "</td>" +
       "<td>" + state.loc + "</td>" +
       "<td>" + state.confirmedCasesIndian + "</td>" +
       "<td>" + state.confirmedCasesForeign + "</td>" +
       "<td>" + state.discharged + "</td>" +
       "<td>" + state.deaths + "</td>" +
       "<td>" + state.totalConfirmed + "</td>";
    tableBody.appendChild(row);
  });
}

searchBtn.addEventListener("click", () => {
  const keyword = searchInput.value.toLowerCase().trim();
  if (keyword === "") {
    displayData(stateData);
  } else {
    const filtered = stateData.filter(state =>
      state.loc.toLowerCase().includes(keyword)
    );
    displayData(filtered);
  }
});
