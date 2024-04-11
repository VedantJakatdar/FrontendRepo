const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Function to perform search by employee ID
async function performSearch() {
    const searchText = searchInput.value.trim();
    
    // if (searchText === '') {
    //     searchResults.innerHTML = '<p>Please enter an employee empId</p>';
    //     return;
    // }

    try {
        const response = await fetch(`http://localhost:8080/employees/${searchText}`);
        

        // if (data.lenght === 0) {
        //     searchResults.innerHTML = '<p>No results found</p>';
        // } else {
        //     displayResults(data);
        // }

        if (response.ok) {
            const data = await response.json();
            if (data.length === 0) {
                searchResults.innerHTML = '<p>No employee found</p>';
            } else {
                displayResults(data);
            }
        } else {
            searchResults.innerHTML = '<p>No employee found</p>';
        }
    } 
    catch (error) {
        console.error('Error fetching data:', error);
        searchResults.innerHTML = '<p>No employee found</p>';
    }
}

// Function to display search results
function displayResults(results) {
    searchResults.innerHTML = ''; // Clear previous results

    // results.forEach(result => {
    //     const resultItem = document.createElement('div');
    //     resultItem.classList.add('result-item');
    //     resultItem.textContent = `EmpID: ${result.empId} - Name: ${result.firstName}`;
    //     searchResults.appendChild(resultItem);
    // });
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');
    resultItem.textContent = `EmpID: ${results.empId} , Name: ${results.firstName} ${results.lastName} , Department: ${results.department.name}, Position: ${results.position.title}`;
    searchResults.appendChild(resultItem);
 
}

// Event listener for input change (search)
searchInput.addEventListener('input', performSearch);