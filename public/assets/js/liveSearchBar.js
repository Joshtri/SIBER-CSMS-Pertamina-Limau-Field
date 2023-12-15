const searchBar = document.querySelector('#search-bar');
const tableRows = document.querySelectorAll('#data-table-view tbody tr');

searchBar.addEventListener('input', () => {
  const searchTerm = searchBar.value.toLowerCase(); // get the search query
  tableRows.forEach((row) => {
    const name = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
    const age = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const city = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
    if (name.includes(searchTerm) || age.includes(searchTerm) || city.includes(searchTerm)) {
      row.style.display = ''; // show the row if it matches the search query
    } else {
      row.style.display = 'none'; // hide the row if it doesn't match the search query
    }
  });
});
