//Auto-Populating data into table of homePage after adding, updating & deleting
document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('http://localhost:8080/employees');
      const employees = await response.json();
      const tableBody = document.getElementById('employee-table-body');
      tableBody.innerHTML = ''; 
      employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${employee.empId}</td>
          <td>${employee.firstName}</td>
          <td>${employee.lastName}</td>
          <td>${employee.emailId}</td>
          <td>${employee.department.name}</td>
          <td>${employee.position.title}</td>
          <td>
            <button onclick="editEmployee('${employee.empId}')">Update</button>
            <button onclick="deleteEmployee(${employee.empId})">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  });
  
  //Redirecting to the updateEmployee page
  function editEmployee(empId) {
    window.location.href = `updateEmployee.html?empId=${empId}`;
  }


  //deleting an employee
  async function deleteEmployee(empId) {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await fetch(`http://localhost:8080/employees/${empId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          location.reload();
        } else {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  }