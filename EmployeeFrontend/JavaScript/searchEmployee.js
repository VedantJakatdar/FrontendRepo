//For searching an employee by empId, departmentName & positionName
document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton");

    searchButton.addEventListener("click", function(event) {
        event.preventDefault();

        const empId = document.getElementById("empId").value.trim();
        const department = document.getElementById("department").value.trim();
        const position = document.getElementById("position").value.trim();

        let url;
        if (empId !== "") {
            url = `http://localhost:8080/employees/${empId}`;
        } else if (department !== "") {
            url = `http://localhost:8080/employees/search/department/${department}`;
        } else if (position !== "") {
            url = `http://localhost:8080/employees/search/position/${position}`;
        } else {
            console.error('No search parameters provided.');
            return;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); 
            })
            .then(data => {
                console.log(data);
                if (Array.isArray(data)) {
                    populateTable(data);
                } else {
                    populateTable([data]);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    });

    function populateTable(employees) {
        const tableBody = document.querySelector("#employeeList tbody");
        tableBody.innerHTML = ""; 
    
        if (employees.length === 0) {
            const row = tableBody.insertRow();
            row.innerHTML = "<td colspan='4'>No Employees Found.</td>";
        } else {
            employees.forEach(employee => {
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${employee.empId}</td>
                    <td>${employee.firstName} ${employee.lastName}</td>
                    <td>${employee.department.name}</td>
                    <td>${employee.position.title}</td>
                `;
            });
        }
    }
    
});

//Below code is for setting the departmentNames & positionNames into dropdownlist
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
