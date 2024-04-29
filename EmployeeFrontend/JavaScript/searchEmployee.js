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
                const tableBody = document.querySelector("#employeeList tbody"); 
                tableBody.innerHTML = ""; 
                const row = tableBody.insertRow();
                row.innerHTML = "<td colspan='4'>No Employee Found.</td>";
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