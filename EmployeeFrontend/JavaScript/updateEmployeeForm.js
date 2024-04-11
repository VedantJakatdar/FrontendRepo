// Function to extract URL parameters
function getURLParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Extract URL parameters
var empId = getURLParameter('empId');
var firstName = getURLParameter('firstName');
var lastName = getURLParameter('lastName');
var email = getURLParameter('email');
// var depId = getURLParameter('departmentId');
var depName = getURLParameter('departmentName');
// var posId = getURLParameter('positionId');
var posName = getURLParameter('positionName');

// Autopopulate form fields with extracted parameters
document.getElementById("employee-id").value = empId;
document.getElementById("first-name").value = firstName;
document.getElementById("last-name").value = lastName;
document.getElementById("email").value = email;
// document.getElementById("department-id").value = depId;
document.getElementById("department-name").value = depName;
// document.getElementById("position-id").value = posId;
document.getElementById("position-name").value = posName;