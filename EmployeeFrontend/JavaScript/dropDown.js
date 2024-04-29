//Below code is for setting the departmentNames & positionNames into dataList & dropDown
function fetchAndPopulateDepartments() {
    fetch('http://localhost:8080/employees/departments')
        .then(response => response.json())
        .then(data => populateDropdown('department', data))
        .catch(error => console.error('Error fetching departments:', error));
}

function fetchAndPopulatePositions() {
    fetch('http://localhost:8080/employees/positions')
        .then(response => response.json())
        .then(data => populateDropdown('position', data))
        .catch(error => console.error('Error fetching positions:', error));
}

function populateDropdown(selectId, data) {
    var select = document.getElementById(selectId);
    select.innerHTML = '<option value="">Select ' + selectId.charAt(0).toUpperCase() + selectId.slice(1) + '</option>';
    
    data.forEach(function(item) {
        var option = document.createElement('option');
        option.value = item; 
        option.text = item;
        select.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    fetchAndPopulateDepartments();
    fetchAndPopulatePositions();
});