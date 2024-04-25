//Below code is for setting the current data of an employee into updateEmpoyee form
window.onload = function() {
  const params = new URLSearchParams(window.location.search);
  const empId = params.get('empId');

  function fetchEmployeeData(empId) {
      return fetch(`http://localhost:8080/employees/${empId}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              return data; 
          })
          .catch(error => {
              console.error('Error:', error);
              return null; 
          });
  }

  function populateFormFields(employee) {
      document.getElementById('employee-id').value = employee.empId;
      document.getElementById('first-name').value = employee.firstName;
      document.getElementById('last-name').value = employee.lastName;
      document.getElementById('email').value = employee.emailId;
      document.getElementById('department-name').value = employee.department.name;
      document.getElementById('position-name').value = employee.position.title;
  }

  fetchEmployeeData(empId)
      .then(employee => {
          if (employee) {
              populateFormFields(employee);
          } else {
              console.error('Employee data not found');
          }
      });
};