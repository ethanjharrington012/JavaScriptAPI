// Get references to the HTML elements
const form = document.querySelector('form');
const seasonInput = document.querySelector('#season-input');
const roundInput = document.querySelector('#round-input');
const tableBody = document.querySelector('#table-body');

// Add an event listener to the form submit event
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the values of the season and round inputs
  const season = seasonInput.value;
  const round = roundInput.value;

  // Make an API request
  axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    .then((response) => {
      // Clear the table body
      tableBody.innerHTML = '';

      // data from the API response
      const driverStandings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

      // Loop through the driver 
      driverStandings.forEach((driverStanding) => {
        const driver = driverStanding.Driver;
        const constructor = driverStanding.Constructors[0];

        // Create a new row in the table
        const row = document.createElement('tr');

        // column in the row
        const positionCell = document.createElement('td');
        positionCell.textContent = driverStanding.position;
        const nameCell = document.createElement('td');
        nameCell.textContent = `${driver.givenName} ${driver.familyName}`;
        const nationalityCell = document.createElement('td');
        nationalityCell.textContent = driver.nationality;
        const constructorCell = document.createElement('td');
        constructorCell.textContent = constructor.name;
        const pointsCell = document.createElement('td');
        pointsCell.textContent = driverStanding.points;
        const winsCell = document.createElement('td');
        winsCell.textContent = driverStanding.wins;
        const dobCell = document.createElement('td');
        dobCell.textContent = driver.dateOfBirth;

        // Append the cells to the row
        row.appendChild(positionCell);
        row.appendChild(nameCell);
        row.appendChild(nationalityCell);
        row.appendChild(constructorCell);
        row.appendChild(pointsCell);
        row.appendChild(winsCell);
        row.appendChild(dobCell);

        // Append the row to the table body
        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
