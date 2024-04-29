 //Updating an Employee
document.getElementById('update-btn').addEventListener('click', async () => {
  const employeeData = getFormData();
  if (
      employeeData.empId === "" ||
      employeeData.firstName === "" ||
      employeeData.lastName === "" ||
      employeeData.emailId === "" ||
      employeeData.department.name === "" ||
      employeeData.position.title === ""
  ) {
      alert("All fields must be filled out");
      return false;
  }
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(employeeData.emailId)) {
      alert("Invalid email format");
      return false;
  }
    const params = new URLSearchParams(window.location.search);
    const employeeId = params.get('empId');
    try {
      const response = await fetch(`http://localhost:8080/employees/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      const data = await response.json();
      console.log('Employee updated:', data);
      window.location.href = "homePage.html";
    } catch (error) {
      console.error('Error updating employee:', error);
    }  
  });

  function getFormData() {
    const employeeId = document.getElementById('employee-id').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const departmentName = document.getElementById('department-name').value;
    const positionName = document.getElementById('position-name').value;
    return {
        empId: employeeId,
        firstName: firstName,
        lastName: lastName,
        emailId: email,
        department: {
            name: departmentName
        },
        position: {
            title: positionName
        }
    };
  }