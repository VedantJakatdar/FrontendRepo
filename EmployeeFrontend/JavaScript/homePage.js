//Auto-Populating data into table after adding, updating & deleting
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
          <button onclick="editEmployee('${employee.empId}','${employee.firstName}','${employee.lastName}','${employee.emailId}','${employee.department.name}','${employee.position.title}')">Update</button>
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
function editEmployee(empId, firstName, lastName, email, depName, posName) {
  // window.location.href = 'updateEmployee.html?id=' + empId;
  window.location.href = "updateEmployee.html?empId=" + encodeURIComponent(empId) + "&firstName=" + encodeURIComponent(firstName) + "&lastName=" + encodeURIComponent(lastName) + "&email=" + encodeURIComponent(email) + "&departmentName=" + encodeURIComponent(depName) + "&positionName=" + encodeURIComponent(posName);
}


//deleting an employee
async function deleteEmployee(empId) {
  if (confirm('Are you sure you want to delete this employee?')) {
    try {
      const response = await fetch(`http://localhost:8080/employees/${empId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Employee deleted successfully');
        location.reload();
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee. Please try again.');
    }
  }
}
